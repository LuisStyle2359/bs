(function () {
  "use strict";

  const P = window.LERNPORTAL;
  const ANZAHL = 15;
  const SPEICHER = "lernportal:fortschritt:v1";
  const THEMA = "lernportal:theme";
  const TABS = [
    { id: "lernstoff", name: "Lernstoff", feld: "kapitel" },
    { id: "karten", name: "Karteikarten", feld: "karteikarten" },
    { id: "quiz", name: "Quiz", feld: "quiz" },
  ];
  const BUCHSTABEN = "ABCDEFGHIJ";

  const ICON_MOND =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  const ICON_SONNE =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';

  const app = document.getElementById("app");
  let aktuell = null; // { nr, tab } auf einer Lernfeld-Seite, sonst null
  let deck = null; // laufender Karteikarten-Stapel
  let quiz = null; // laufendes Quiz
  let loeschTimer = null;

  if (window.marked) window.marked.use({ gfm: true, breaks: true });

  // ---------- Hilfsfunktionen ----------

  function esc(text) {
    return String(text ?? "").replace(
      /[&<>"']/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
    );
  }

  // Entfernt den gemeinsamen Einzug, damit eingerückte Template-Strings nicht als Code gelten.
  function dedent(text) {
    const zeilen = String(text ?? "").replace(/\t/g, "  ").split("\n");
    while (zeilen.length && !zeilen[0].trim()) zeilen.shift();
    while (zeilen.length && !zeilen[zeilen.length - 1].trim()) zeilen.pop();
    const einzug = Math.min(...zeilen.filter((z) => z.trim()).map((z) => z.match(/^ */)[0].length));
    return zeilen.map((z) => z.slice(einzug)).join("\n");
  }

  function md(text) {
    const quelle = dedent(text);
    if (!quelle) return "";
    if (!window.marked) return `<p class="vorformatiert">${esc(quelle)}</p>`;
    return window.marked
      .parse(quelle)
      .replace(/<table>/g, '<div class="tabelle"><table>')
      .replace(/<\/table>/g, "</table></div>");
  }

  function mdZeile(text) {
    if (!window.marked) return esc(text);
    return window.marked.parseInline(String(text ?? ""));
  }

  function kennung(text) {
    let h = 5381;
    for (const zeichen of String(text)) h = ((h << 5) + h + zeichen.codePointAt(0)) | 0;
    return (h >>> 0).toString(36);
  }

  function prozent(anteil) {
    return `${Math.round((anteil || 0) * 100)} %`;
  }

  function anzahlText(n, einzahl, mehrzahl) {
    return `${n} ${n === 1 ? einzahl : mehrzahl}`;
  }

  function mischen(liste) {
    const a = liste.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function bewegungReduziert() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  // ---------- Fortschritt (nur in diesem Browser) ----------

  let stand = {};
  try {
    stand = JSON.parse(localStorage.getItem(SPEICHER)) || {};
  } catch (e) {
    stand = {};
  }

  function standVon(nr) {
    const s = stand[nr] || (stand[nr] = {});
    s.gelesen = s.gelesen || [];
    s.gewusst = s.gewusst || [];
    return s;
  }

  function speichern() {
    try {
      localStorage.setItem(SPEICHER, JSON.stringify(stand));
    } catch (e) {
      /* Speichern nicht möglich, z. B. im privaten Modus */
    }
  }

  // ---------- Daten ----------

  function lernfeld(nr) {
    const d = P.lernfelder[nr] || {};
    return {
      nr,
      titel: String(d.titel || "").trim(),
      jahr: Number(d.jahr) || 0,
      beschreibung: String(d.beschreibung || "").trim(),
      kapitel: d.kapitel || [],
      karteikarten: d.karteikarten || [],
      quiz: d.quiz || [],
    };
  }

  function alleLernfelder() {
    return Array.from({ length: ANZAHL }, (_, i) => lernfeld(i + 1));
  }

  function hatInhalt(lf) {
    return lf.kapitel.length + lf.karteikarten.length + lf.quiz.length > 0;
  }

  function titelVon(lf) {
    return lf.titel || `Lernfeld ${lf.nr}`;
  }

  function zaehler(lf) {
    const teile = [];
    if (lf.kapitel.length) teile.push(anzahlText(lf.kapitel.length, "Kapitel", "Kapitel"));
    if (lf.karteikarten.length) teile.push(anzahlText(lf.karteikarten.length, "Karte", "Karten"));
    if (lf.quiz.length) teile.push(anzahlText(lf.quiz.length, "Frage", "Fragen"));
    return teile.join(" · ");
  }

  const kapitelId = (k) => kennung(k.titel);
  const kartenId = (k) => kennung(k.vorne);

  function offeneKarten(lf) {
    const s = standVon(lf.nr);
    return lf.karteikarten.filter((k) => !s.gewusst.includes(kartenId(k))).length;
  }

  // Mittelwert aus gelesenen Kapiteln, gewussten Karten und bestem Quiz-Ergebnis.
  function fortschritt(lf) {
    const s = standVon(lf.nr);
    const teile = [];
    if (lf.kapitel.length) {
      teile.push(lf.kapitel.filter((k) => s.gelesen.includes(kapitelId(k))).length / lf.kapitel.length);
    }
    if (lf.karteikarten.length) {
      teile.push((lf.karteikarten.length - offeneKarten(lf)) / lf.karteikarten.length);
    }
    if (lf.quiz.length) teile.push(s.quizBest || 0);
    return teile.length ? teile.reduce((a, b) => a + b, 0) / teile.length : null;
  }

  function balken(anteil) {
    return `<span class="balken" aria-hidden="true"><span style="width:${Math.round((anteil || 0) * 100)}%"></span></span>`;
  }

  // ---------- Rahmen ----------

  function istDunkel() {
    const t = document.documentElement.dataset.theme;
    if (t) return t === "dark";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function themaInhalt() {
    return istDunkel() ? `${ICON_SONNE}<span>Hell</span>` : `${ICON_MOND}<span>Dunkel</span>`;
  }

  function themaLabel() {
    return istDunkel() ? "Helles Design einschalten" : "Dunkles Design einschalten";
  }

  function kopfzeile() {
    return `<header class="kopfzeile">
      <a class="marke" href="#start">${esc(P.name)}</a>
      <button type="button" class="thema-knopf" data-aktion="thema" aria-label="${themaLabel()}">${themaInhalt()}</button>
    </header>`;
  }

  function fusszeile() {
    return `<footer class="fusszeile">
      <p>Dein Lernfortschritt wird nur in diesem Browser gespeichert.</p>
      <button type="button" class="link-knopf" data-aktion="alles-loeschen">Fortschritt löschen</button>
    </footer>`;
  }

  function wechsleThema(knopf) {
    const neu = istDunkel() ? "light" : "dark";
    document.documentElement.dataset.theme = neu;
    try {
      localStorage.setItem(THEMA, neu);
    } catch (e) {
      /* egal */
    }
    knopf.innerHTML = themaInhalt();
    knopf.setAttribute("aria-label", themaLabel());
  }

  function allesLoeschen(knopf) {
    if (!knopf.classList.contains("warnung")) {
      knopf.classList.add("warnung");
      knopf.textContent = "Wirklich alles löschen? Nochmal klicken";
      loeschTimer = setTimeout(() => {
        knopf.classList.remove("warnung");
        knopf.textContent = "Fortschritt löschen";
      }, 4000);
      return;
    }
    clearTimeout(loeschTimer);
    stand = {};
    speichern();
    aktuell = null;
    deck = null;
    quiz = null;
    route();
    const hinweis = document.querySelector(".fusszeile p");
    if (hinweis) hinweis.textContent = "Dein Fortschritt wurde gelöscht.";
  }

  // ---------- Startseite ----------

  function kachel(lf) {
    const voll = hatInhalt(lf);
    const anteil = fortschritt(lf);
    return `<li><a class="lf-kachel" href="#lf${lf.nr}" data-nr="${lf.nr}">
      <span class="lf-nr"><small>Lernfeld</small>${lf.nr}</span>
      <span class="lf-titel${lf.titel ? "" : " platzhalter"}">${esc(lf.titel || "Titel folgt")}</span>
      <span class="lf-meta">${voll ? zaehler(lf) : "Inhalt folgt"}</span>
      ${balken(anteil)}
      <span class="sr-only">${voll ? `Fortschritt ${prozent(anteil)}` : ""}</span>
    </a></li>`;
  }

  // Gruppiert die Kacheln nach Ausbildungsjahr; Lernfelder ohne Jahr landen am Ende.
  function jahrgaenge(lfs) {
    const jahre = [...new Set(lfs.map((lf) => lf.jahr))].sort((a, b) => (a || 99) - (b || 99));
    return jahre
      .map((jahr) => {
        const gruppe = lfs.filter((lf) => lf.jahr === jahr);
        const von = gruppe[0].nr;
        const bis = gruppe[gruppe.length - 1].nr;
        const titel = jahr ? `${jahr}. Ausbildungsjahr` : "Weitere Lernfelder";
        return `<section class="jahrgang" aria-labelledby="jahr-${jahr}">
          <h2 class="jahr-titel" id="jahr-${jahr}">${titel}<small>LF ${von === bis ? von : `${von}–${bis}`}</small></h2>
          <ol class="lf-raster" start="${von}">${gruppe.map(kachel).join("")}</ol>
        </section>`;
      })
      .join("");
  }

  function zeigeStart(vonNr) {
    aktuell = null;
    deck = null;
    quiz = null;
    document.title = P.name;

    const lfs = alleLernfelder();
    const mitInhalt = lfs.filter(hatInhalt);
    const gesamt = mitInhalt.length
      ? mitInhalt.map(fortschritt).reduce((a, b) => a + b, 0) / mitInhalt.length
      : 0;
    const unterzeile = [P.beruf, P.klasse].filter(Boolean).join(" · ") || "Berufsschule";
    const standText = mitInhalt.length
      ? `<strong>${mitInhalt.length}</strong> von ${ANZAHL} Lernfeldern haben schon Inhalt · Dein Fortschritt dort: <strong>${prozent(gesamt)}</strong>`
      : `Die ${ANZAHL} Lernfelder sind angelegt. Der Lernstoff kommt nach und nach dazu.`;

    app.innerHTML = `<div class="seite">
      ${kopfzeile()}
      <main class="start">
        <section class="intro">
          <p class="eyebrow">${esc(unterzeile)}</p>
          <h1>Lernfelder</h1>
          <p class="lead">Such dir ein Lernfeld aus. Zu jedem gibt es Lernstoff zum Nachlesen, Karteikarten zum Abfragen und ein Quiz zum Testen.</p>
          <p class="stand">${standText}</p>
        </section>
        ${jahrgaenge(lfs)}
      </main>
      ${fusszeile()}
    </div>`;

    const ziel = vonNr && app.querySelector(`.lf-kachel[data-nr="${vonNr}"]`);
    if (ziel) {
      ziel.scrollIntoView({ block: "center" });
      ziel.focus({ preventScroll: true });
    } else {
      window.scrollTo(0, 0);
    }
  }

  // ---------- Lernfeld-Seite ----------

  function standardTab(lf) {
    const mitInhalt = TABS.find((t) => lf[t.feld].length);
    return mitInhalt ? mitInhalt.id : "lernstoff";
  }

  function nachbarLink(nr, klasse, beschriftung) {
    if (nr < 1 || nr > ANZAHL) return "";
    return `<a class="${klasse}" href="#lf${nr}"><small>${beschriftung}</small><span>${esc(titelVon(lernfeld(nr)))}</span></a>`;
  }

  function zeigeLernfeld(nr, tab) {
    const lf = lernfeld(nr);
    tab = tab || standardTab(lf);
    const neu = !aktuell || aktuell.nr !== nr;
    aktuell = { nr, tab };
    document.title = `${titelVon(lf)} · ${P.name}`;

    if (neu) {
      deck = null;
      quiz = null;
      app.innerHTML = `<div class="seite">
        ${kopfzeile()}
        <main class="lf-seite">
          <a class="zurueck" href="#start">← Alle Lernfelder</a>
          <header class="lf-kopf">
            <p class="eyebrow">LF ${nr} von ${ANZAHL}${lf.jahr ? ` · ${lf.jahr}. Ausbildungsjahr` : ""}</p>
            <h1>${esc(titelVon(lf))}</h1>
            ${lf.beschreibung ? `<p class="lead">${esc(lf.beschreibung)}</p>` : ""}
            <div class="lf-fortschritt" id="lf-fortschritt"></div>
          </header>
          <div class="tabs" role="tablist" aria-label="Lernbereiche">
            ${TABS.map(
              (t) =>
                `<button type="button" role="tab" id="tab-${t.id}" aria-controls="panel" data-tab="${t.id}">${t.name}<span class="anzahl">${lf[t.feld].length}</span></button>`,
            ).join("")}
          </div>
          <section class="panel" id="panel" role="tabpanel"></section>
          <nav class="nachbarn" aria-label="Weitere Lernfelder">
            ${nachbarLink(nr - 1, "zurueck-lf", `← Lernfeld ${nr - 1}`)}
            ${nachbarLink(nr + 1, "weiter", `Lernfeld ${nr + 1} →`)}
          </nav>
        </main>
        ${fusszeile()}
      </div>`;
      window.scrollTo(0, 0);
    }

    app.querySelectorAll('[role="tab"]').forEach((b) => {
      const an = b.dataset.tab === tab;
      b.setAttribute("aria-selected", String(an));
      b.tabIndex = an ? 0 : -1;
    });
    zeigePanel();
    zeigeFortschritt(lf);
  }

  function wechsleTab(tab, fokus) {
    if (!aktuell) return;
    const hash = `#lf${aktuell.nr}-${tab}`;
    try {
      history.replaceState(null, "", hash);
    } catch (e) {
      location.hash = hash;
      return;
    }
    zeigeLernfeld(aktuell.nr, tab);
    if (fokus) document.getElementById(`tab-${tab}`).focus();
  }

  function zeigeFortschritt(lf) {
    const el = document.getElementById("lf-fortschritt");
    if (!el) return;
    const anteil = fortschritt(lf);
    el.innerHTML =
      anteil === null ? "<span>Noch kein Inhalt</span>" : `${balken(anteil)}<span>${prozent(anteil)} gelernt</span>`;
  }

  function zeigePanel(opt) {
    const panel = document.getElementById("panel");
    if (!panel || !aktuell) return;
    const lf = lernfeld(aktuell.nr);
    panel.setAttribute("aria-labelledby", `tab-${aktuell.tab}`);
    if (aktuell.tab === "karten") panelKarten(lf, panel, opt || {});
    else if (aktuell.tab === "quiz") panelQuiz(lf, panel);
    else panelLernstoff(lf, panel);
  }

  function leer(art, lf) {
    const texte = {
      lernstoff: [
        "Noch kein Lernstoff",
        `Für Lernfeld ${lf.nr} ist noch kein Lernstoff da. Sobald er eingetragen ist, findest du ihn hier in Kapiteln zum Nachlesen.`,
      ],
      karten: [
        "Noch keine Karteikarten",
        "Hier fragst du dich später selbst ab: Frage lesen, Karte umdrehen, ehrlich sagen, ob du es wusstest.",
      ],
      quiz: [
        "Noch kein Quiz",
        "Hier kommen später Multiple-Choice-Fragen hin, mit denen du testen kannst, ob du für die Prüfung bereit bist.",
      ],
    };
    const [titel, text] = texte[art];
    return `<div class="leer"><h2>${titel}</h2><p>${text}</p></div>`;
  }

  // ---------- Lernstoff ----------

  function panelLernstoff(lf, el) {
    if (!lf.kapitel.length) {
      el.innerHTML = leer("lernstoff", lf);
      return;
    }
    const s = standVon(lf.nr);
    const toc = lf.kapitel
      .map((k) => {
        const id = kapitelId(k);
        return `<li><button type="button" data-aktion="springe" data-id="${id}" class="${s.gelesen.includes(id) ? "gelesen" : ""}">${esc(k.titel)}</button></li>`;
      })
      .join("");
    const kapitel = lf.kapitel
      .map((k, i) => {
        const id = kapitelId(k);
        const gelesen = s.gelesen.includes(id);
        return `<article class="kapitel" id="kap-${id}">
          <h2><span class="kap-nr">${i + 1}</span><span>${esc(k.titel)}</span></h2>
          <div class="inhalt">${md(k.text)}</div>
          <button type="button" class="knopf${gelesen ? " erledigt" : ""}" data-aktion="gelesen" data-id="${id}" aria-pressed="${gelesen}">${gelesen ? "✓ Gelesen" : "Als gelesen markieren"}</button>
        </article>`;
      })
      .join("");
    el.innerHTML = `${lf.kapitel.length > 1 ? `<nav class="toc" aria-label="Kapitel"><p class="eyebrow">Inhalt</p><ol>${toc}</ol></nav>` : ""}${kapitel}`;
  }

  function wechsleGelesen(knopf) {
    const id = knopf.dataset.id;
    const s = standVon(aktuell.nr);
    const pos = s.gelesen.indexOf(id);
    const an = pos < 0;
    if (an) s.gelesen.push(id);
    else s.gelesen.splice(pos, 1);
    speichern();
    knopf.classList.toggle("erledigt", an);
    knopf.setAttribute("aria-pressed", String(an));
    knopf.textContent = an ? "✓ Gelesen" : "Als gelesen markieren";
    const eintrag = app.querySelector(`.toc [data-id="${id}"]`);
    if (eintrag) eintrag.classList.toggle("gelesen", an);
    zeigeFortschritt(lernfeld(aktuell.nr));
  }

  // ---------- Karteikarten ----------

  function neuesDeck(lf, nurOffene) {
    const s = standVon(lf.nr);
    let karten = lf.karteikarten.map((_, i) => i);
    if (nurOffene) karten = karten.filter((i) => !s.gewusst.includes(kartenId(lf.karteikarten[i])));
    deck = { nr: lf.nr, nurOffene, karten, umgedreht: false };
  }

  function panelKarten(lf, el, opt) {
    if (!lf.karteikarten.length) {
      el.innerHTML = leer("karten", lf);
      return;
    }
    if (!deck || deck.nr !== lf.nr) neuesDeck(lf, offeneKarten(lf) > 0);

    const gesamt = lf.karteikarten.length;
    const offen = offeneKarten(lf);
    const leiste = `<div class="leiste">
      <span class="leiste-info"><strong>${gesamt - offen}</strong> von ${gesamt} gewusst</span>
      <div class="leiste-knoepfe">
        <button type="button" class="knopf klein" data-aktion="deck-neu" data-offen="1" aria-pressed="${deck.nurOffene}">Nur offene</button>
        <button type="button" class="knopf klein" data-aktion="deck-neu" data-offen="0" aria-pressed="${!deck.nurOffene}">Alle</button>
        <button type="button" class="knopf klein" data-aktion="mischen"${deck.karten.length > 1 ? "" : " disabled"}>Mischen</button>
      </div>
    </div>`;

    if (!deck.karten.length) {
      el.innerHTML = `${leiste}<div class="block">
        <h2>${offen ? "Stapel durch" : "Alle Karten gewusst"}</h2>
        <p>${offen ? `Noch ${anzahlText(offen, "Karte ist", "Karten sind")} offen.` : `Du hast alle ${gesamt} Karten dieses Lernfelds als gewusst markiert.`}</p>
        <div class="knopfreihe">
          ${offen ? '<button type="button" class="knopf primaer" data-aktion="deck-neu" data-offen="1">Offene Karten üben</button>' : ""}
          <button type="button" class="knopf${offen ? "" : " primaer"}" data-aktion="deck-neu" data-offen="0">Alle Karten nochmal</button>
          ${offen < gesamt ? '<button type="button" class="knopf" data-aktion="deck-reset">Markierungen zurücksetzen</button>' : ""}
        </div>
      </div>`;
      return;
    }

    const karte = lf.karteikarten[deck.karten[0]];
    const hinten = deck.umgedreht;
    el.innerHTML = `${leiste}
      <div class="karteikarte ${hinten ? "hinten" : "vorne"}${opt.animation ? ` ${opt.animation}` : ""}" tabindex="0" role="button" data-aktion="umdrehen" aria-label="${hinten ? "Antwort. Klicken zum Zurückdrehen" : "Frage. Klicken zum Umdrehen"}">
        <div class="karte-kopf"><span>${hinten ? "Antwort" : "Frage"}</span><span>noch ${deck.karten.length} im Stapel</span></div>
        <div class="karte-text" aria-live="polite">${md(hinten ? karte.hinten : karte.vorne)}</div>
      </div>
      <div class="karte-aktionen">${
        hinten
          ? '<button type="button" class="knopf nochmal" data-aktion="nochmal">Nochmal</button><button type="button" class="knopf gewusst" data-aktion="gewusst">Gewusst</button>'
          : '<button type="button" class="knopf primaer" data-aktion="umdrehen">Antwort zeigen</button>'
      }</div>
      <p class="tastenhinweis"><kbd>Leertaste</kbd> umdrehen · <kbd>←</kbd> nochmal · <kbd>→</kbd> gewusst</p>`;
    if (opt.fokus) el.querySelector(".karteikarte").focus({ preventScroll: true });
  }

  function umdrehen() {
    if (!deck || !deck.karten.length) return;
    const karte = app.querySelector(".karteikarte");
    deck.umgedreht = !deck.umgedreht;
    if (!karte || bewegungReduziert()) {
      zeigePanel({ fokus: true });
      return;
    }
    karte.classList.add("kippt-weg");
    setTimeout(() => zeigePanel({ fokus: true, animation: "kippt-her" }), 150);
  }

  function bewerte(gewusst) {
    if (!deck || !deck.umgedreht || !deck.karten.length) return;
    const lf = lernfeld(deck.nr);
    const i = deck.karten.shift();
    const id = kartenId(lf.karteikarten[i]);
    const s = standVon(lf.nr);
    const pos = s.gewusst.indexOf(id);
    if (gewusst && pos < 0) s.gewusst.push(id);
    if (!gewusst) {
      if (pos >= 0) s.gewusst.splice(pos, 1);
      deck.karten.push(i);
    }
    deck.umgedreht = false;
    speichern();
    zeigePanel({ fokus: true });
    zeigeFortschritt(lf);
  }

  // ---------- Quiz ----------

  function richtigeVon(frage) {
    return Array.isArray(frage.richtig) ? frage.richtig : [frage.richtig];
  }

  function starteQuiz(lf, nurFalsche) {
    const fragen = nurFalsche ? quiz.ergebnisse.filter((e) => !e.richtig).map((e) => e.fi) : lf.quiz.map((_, i) => i);
    quiz = {
      nr: lf.nr,
      phase: "frage",
      teilrunde: Boolean(nurFalsche),
      reihenfolge: mischen(fragen),
      pos: 0,
      auswahl: [],
      beantwortet: false,
      ergebnisse: [],
    };
  }

  function panelQuiz(lf, el) {
    if (!lf.quiz.length) {
      el.innerHTML = leer("quiz", lf);
      return;
    }
    if (!quiz || quiz.nr !== lf.nr) quiz = { nr: lf.nr, phase: "start" };
    const s = standVon(lf.nr);

    if (quiz.phase === "start") {
      el.innerHTML = `<div class="block">
        <h2>Quiz</h2>
        <p>${anzahlText(lf.quiz.length, "Frage", "Fragen")} in zufälliger Reihenfolge. ${
          s.quizBest != null
            ? `Dein bestes Ergebnis bisher: <strong>${prozent(s.quizBest)}</strong>.`
            : "Du hast dieses Quiz noch nicht gemacht."
        }</p>
        <button type="button" class="knopf primaer" data-aktion="quiz-start">Quiz starten</button>
      </div>`;
      return;
    }

    if (quiz.phase === "ende") {
      el.innerHTML = quizAuswertung(lf, s);
      return;
    }

    const fi = quiz.reihenfolge[quiz.pos];
    const frage = lf.quiz[fi];
    const richtige = richtigeVon(frage);
    const mehrfach = Array.isArray(frage.richtig);
    const ergebnis = quiz.beantwortet ? quiz.ergebnisse[quiz.ergebnisse.length - 1] : null;
    const richtigBisher = quiz.ergebnisse.filter((e) => e.richtig).length;
    const letzte = quiz.pos === quiz.reihenfolge.length - 1;

    const optionen = (frage.antworten || [])
      .map((antwort, j) => {
        let klasse = "option";
        if (ergebnis && richtige.includes(j)) klasse += " richtig";
        else if (ergebnis && quiz.auswahl.includes(j)) klasse += " falsch";
        return `<li><button type="button" class="${klasse}" data-aktion="quiz-wahl" data-j="${j}" aria-pressed="${quiz.auswahl.includes(j)}"${ergebnis ? " disabled" : ""}>
          <span class="option-buchstabe">${BUCHSTABEN[j]}</span><span class="option-text">${mdZeile(antwort)}</span>
        </button></li>`;
      })
      .join("");

    let unten;
    if (ergebnis) {
      unten = `<div class="rueckmeldung ${ergebnis.richtig ? "gut" : "schlecht"}" role="status">
          <strong>${ergebnis.richtig ? "Richtig!" : "Leider falsch."}</strong>
          ${frage.erklaerung ? `<div class="inhalt">${md(frage.erklaerung)}</div>` : ""}
        </div>
        <button type="button" class="knopf primaer" data-aktion="quiz-weiter">${letzte ? "Zur Auswertung" : "Nächste Frage"}</button>`;
    } else if (mehrfach) {
      unten = `<button type="button" class="knopf primaer" data-aktion="quiz-pruefen"${quiz.auswahl.length ? "" : " disabled"}>Antwort prüfen</button>`;
    } else {
      unten = "";
    }

    el.innerHTML = `<div class="leiste">
        <span class="leiste-info">Frage <strong>${quiz.pos + 1}</strong> von ${quiz.reihenfolge.length}</span>
        <span class="leiste-info">${richtigBisher} richtig</span>
      </div>
      ${balken(quiz.pos / quiz.reihenfolge.length)}
      <div class="block">
        <div class="frage-text inhalt">${md(frage.frage)}</div>
        ${mehrfach ? '<p class="hinweis">Mehrere Antworten können richtig sein.</p>' : ""}
        <ul class="optionen">${optionen}</ul>
        ${unten}
      </div>`;
  }

  function quizAuswertung(lf, s) {
    const anzahl = quiz.ergebnisse.length;
    const richtig = quiz.ergebnisse.filter((e) => e.richtig).length;
    const falsche = quiz.ergebnisse.filter((e) => !e.richtig);
    let zusatz;
    if (quiz.teilrunde) zusatz = "Wiederholung der falschen Fragen, zählt nicht als Bestwert.";
    else if (quiz.neuerBest) zusatz = "Neuer Bestwert!";
    else zusatz = `Dein Bestwert: ${prozent(s.quizBest)}`;

    const liste = falsche
      .map((e) => {
        const frage = lf.quiz[e.fi];
        const loesung = richtigeVon(frage)
          .map((j) => mdZeile(frage.antworten[j]))
          .join("<br>");
        return `<li><div class="inhalt">${md(frage.frage)}</div><div class="richtige-antwort">✓ ${loesung}</div></li>`;
      })
      .join("");

    return `<div class="block">
      <p class="eyebrow">Auswertung</p>
      <p class="ergebnis-zahl">${richtig} <small>von ${anzahl} richtig</small></p>
      <p>${prozent(anzahl ? richtig / anzahl : 0)} · ${zusatz}</p>
      ${falsche.length ? `<h3>Das solltest du dir nochmal ansehen</h3><ol class="fehlerliste">${liste}</ol>` : "<p>Alles richtig. Stark!</p>"}
      <div class="knopfreihe">
        <button type="button" class="knopf primaer" data-aktion="quiz-start">Neues Quiz</button>
        ${falsche.length ? '<button type="button" class="knopf" data-aktion="quiz-falsche">Nur die falschen wiederholen</button>' : ""}
      </div>
    </div>`;
  }

  function quizWahl(j) {
    if (!quiz || quiz.phase !== "frage" || quiz.beantwortet) return;
    const frage = lernfeld(quiz.nr).quiz[quiz.reihenfolge[quiz.pos]];
    if (j < 0 || j >= (frage.antworten || []).length) return;
    if (Array.isArray(frage.richtig)) {
      const pos = quiz.auswahl.indexOf(j);
      if (pos >= 0) quiz.auswahl.splice(pos, 1);
      else quiz.auswahl.push(j);
      zeigePanel();
      const knopf = app.querySelector(`.option[data-j="${j}"]`);
      if (knopf) knopf.focus({ preventScroll: true });
      return;
    }
    quiz.auswahl = [j];
    quizPruefen();
  }

  function quizPruefen() {
    if (!quiz || quiz.beantwortet || !quiz.auswahl.length) return;
    const fi = quiz.reihenfolge[quiz.pos];
    const richtige = richtigeVon(lernfeld(quiz.nr).quiz[fi]);
    const richtig = quiz.auswahl.length === richtige.length && richtige.every((j) => quiz.auswahl.includes(j));
    quiz.ergebnisse.push({ fi, richtig });
    quiz.beantwortet = true;
    zeigePanel();
    const weiter = app.querySelector('[data-aktion="quiz-weiter"]');
    if (weiter) weiter.focus({ preventScroll: true });
  }

  function quizWeiter() {
    if (!quiz || !quiz.beantwortet) return;
    quiz.pos += 1;
    quiz.auswahl = [];
    quiz.beantwortet = false;
    if (quiz.pos >= quiz.reihenfolge.length) {
      const lf = lernfeld(quiz.nr);
      const s = standVon(lf.nr);
      const anteil = quiz.ergebnisse.filter((e) => e.richtig).length / quiz.ergebnisse.length;
      quiz.neuerBest = !quiz.teilrunde && (s.quizBest == null || anteil > s.quizBest);
      if (quiz.neuerBest) s.quizBest = anteil;
      quiz.phase = "ende";
      speichern();
      zeigeFortschritt(lf);
    }
    zeigePanel();
    const panel = document.getElementById("panel");
    if (panel && panel.getBoundingClientRect().top < 0) panel.scrollIntoView({ block: "start" });
  }

  // ---------- Steuerung ----------

  app.addEventListener("click", (e) => {
    const tabKnopf = e.target.closest("[data-tab]");
    if (tabKnopf) {
      wechsleTab(tabKnopf.dataset.tab);
      return;
    }
    const el = e.target.closest("[data-aktion]");
    if (!el || el.disabled) return;
    const lf = aktuell ? lernfeld(aktuell.nr) : null;

    switch (el.dataset.aktion) {
      case "thema":
        wechsleThema(el);
        break;
      case "alles-loeschen":
        allesLoeschen(el);
        break;
      case "springe": {
        const ziel = document.getElementById(`kap-${el.dataset.id}`);
        if (ziel) ziel.scrollIntoView({ behavior: bewegungReduziert() ? "auto" : "smooth", block: "start" });
        break;
      }
      case "gelesen":
        wechsleGelesen(el);
        break;
      case "umdrehen":
        umdrehen();
        break;
      case "gewusst":
        bewerte(true);
        break;
      case "nochmal":
        bewerte(false);
        break;
      case "mischen":
        if (deck) {
          deck.karten = mischen(deck.karten);
          deck.umgedreht = false;
          zeigePanel();
        }
        break;
      case "deck-neu":
        neuesDeck(lf, el.dataset.offen === "1");
        zeigePanel();
        break;
      case "deck-reset":
        standVon(lf.nr).gewusst = [];
        speichern();
        neuesDeck(lf, true);
        zeigePanel();
        zeigeFortschritt(lf);
        break;
      case "quiz-start":
        starteQuiz(lf, false);
        zeigePanel();
        break;
      case "quiz-falsche":
        starteQuiz(lf, true);
        zeigePanel();
        break;
      case "quiz-wahl":
        quizWahl(Number(el.dataset.j));
        break;
      case "quiz-pruefen":
        quizPruefen();
        break;
      case "quiz-weiter":
        quizWeiter();
        break;
    }
  });

  document.addEventListener("keydown", (e) => {
    if (!aktuell || e.altKey || e.ctrlKey || e.metaKey) return;
    const ziel = e.target;

    // Pfeiltasten wechseln auf der Reiterleiste den Reiter; alle anderen Tasten gelten der Seite.
    const aufReiter = ziel.getAttribute && ziel.getAttribute("role") === "tab";
    if (aufReiter) {
      const i = TABS.findIndex((t) => t.id === aktuell.tab);
      let neu = -1;
      if (e.key === "ArrowRight") neu = (i + 1) % TABS.length;
      else if (e.key === "ArrowLeft") neu = (i - 1 + TABS.length) % TABS.length;
      else if (e.key === "Home") neu = 0;
      else if (e.key === "End") neu = TABS.length - 1;
      if (neu >= 0) {
        e.preventDefault();
        wechsleTab(TABS[neu].id, true);
        return;
      }
    }
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(ziel.tagName)) return;
    const aufKnopf = !aufReiter && (ziel.tagName === "BUTTON" || ziel.tagName === "A");

    if (aktuell.tab === "karten" && deck && deck.karten.length) {
      if ((e.key === " " || e.key === "Enter") && !aufKnopf) {
        e.preventDefault();
        umdrehen();
      } else if (e.key === "ArrowRight" && deck.umgedreht) {
        e.preventDefault();
        bewerte(true);
      } else if (e.key === "ArrowLeft" && deck.umgedreht) {
        e.preventDefault();
        bewerte(false);
      }
      return;
    }

    if (aktuell.tab === "quiz" && quiz && quiz.phase === "frage") {
      if (/^[1-9]$/.test(e.key)) {
        e.preventDefault();
        quizWahl(Number(e.key) - 1);
      } else if (e.key === "Enter" && !aufKnopf) {
        e.preventDefault();
        if (quiz.beantwortet) quizWeiter();
        else quizPruefen();
      }
    }
  });

  function route() {
    const treffer = /^#lf(\d{1,2})(?:-(lernstoff|karten|quiz))?$/.exec(location.hash);
    const nr = treffer ? Number(treffer[1]) : 0;
    if (nr >= 1 && nr <= ANZAHL) zeigeLernfeld(nr, treffer[2]);
    else zeigeStart(aktuell && aktuell.nr);
  }

  window.addEventListener("hashchange", route);
  route();
})();
