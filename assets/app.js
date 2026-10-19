(function () {
  "use strict";

  const P = window.LERNPORTAL;
  const ANZAHL = 15;
  const SPEICHER = "lernportal:fortschritt:v1";
  const THEMA = "lernportal:theme";
  const ZULETZT = "lernportal:zuletzt";
  const SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
  const TABS = [
    {
      id: "lernstoff",
      name: "Lernstoff",
      kurz: "Lernstoff",
      feld: "kapitel",
      icon: `${SVG}<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2zM22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/></svg>`,
    },
    {
      id: "buchen",
      name: "Buchungssätze",
      kurz: "Buchen",
      feld: "buchungen", // nur sichtbar, wenn Buchungssätze eingetragen sind
      icon: `${SVG}<path d="M4 6h16M4 12h9M4 18h6"/><path d="m15 17 2 2 4-4"/></svg>`,
    },
    {
      id: "karten",
      name: "Karteikarten",
      kurz: "Karten",
      feld: "karteikarten",
      icon: `${SVG}<rect x="2" y="7" width="16" height="13" rx="2"/><path d="M6 3h14a2 2 0 0 1 2 2v11"/></svg>`,
    },
    {
      id: "quiz",
      name: "Quiz",
      kurz: "Quiz",
      feld: "quiz",
      icon: `${SVG}<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/></svg>`,
    },
    {
      id: "spiel",
      name: "Blitzrunde",
      kurz: "Blitzrunde",
      feld: null, // Fragen kommen aus Karteikarten und Quiz
      icon: `${SVG}<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    },
  ];
  const ICON_BLITZ = TABS.find((t) => t.id === "spiel").icon;
  const ICON_UEBERSICHT = `${SVG}<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`;
  const BUCHSTABEN = "ABCDEFGHIJ";

  const ICON_MOND =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  const ICON_SONNE =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';

  const app = document.getElementById("app");
  let aktuell = null; // { nr, tab } auf einer Lernfeld-Seite, sonst null
  let deck = null; // laufender Karteikarten-Stapel
  let quiz = null; // laufendes Quiz
  let spiel = null; // laufende Blitzrunde
  let buchen = null; // laufende Runde „Buchungssätze üben“
  let spielTimer = null;
  let loeschTimer = null;
  let wisch = null; // laufende Wischgeste auf einer Karteikarte
  let klickSperreBis = 0; // verhindert, dass nach dem Wischen die Karte umgedreht wird

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

  // Lernfelder haben eine Zahl als nr, Tests ihre id (Text).
  function lernfeld(nr) {
    const istTest = typeof nr === "string";
    const d = (istTest ? (P.tests || {})[nr] : P.lernfelder[nr]) || {};
    return {
      nr,
      test: istTest,
      datum: istTest ? String(d.datum || "") : "",
      titel: String(d.titel || "").trim(),
      jahr: Number(d.jahr) || 0,
      beschreibung: String(d.beschreibung || "").trim(),
      kapitel: d.kapitel || [],
      karteikarten: d.karteikarten || [],
      quiz: d.quiz || [],
      buchungen: d.buchungen || [],
      konten: { aktiv: [], passiv: [], ...(d.konten || {}) },
    };
  }

  function alleLernfelder() {
    return Array.from({ length: ANZAHL }, (_, i) => lernfeld(i + 1));
  }

  // Anstehende Tests zuerst (nächster oben), vergangene danach.
  function alleTests() {
    const tests = Object.keys(P.tests || {}).map(lernfeld);
    const tage = (t) => (t.datum ? tageBis(t.datum) : 9999);
    return tests.sort((a, b) => {
      const ta = tage(a);
      const tb = tage(b);
      if (ta < 0 !== tb < 0) return ta < 0 ? 1 : -1;
      return ta < 0 ? tb - ta : ta - tb;
    });
  }

  function seitenHash(lf) {
    return lf.test ? `#test-${lf.nr}` : `#lf${lf.nr}`;
  }

  function datumObjekt(datum) {
    const [jahr, monat, tag] = datum.split("-").map(Number);
    return new Date(jahr, monat - 1, tag);
  }

  function tageBis(datum) {
    const heute = new Date();
    heute.setHours(0, 0, 0, 0);
    return Math.round((datumObjekt(datum) - heute) / 86400000);
  }

  function wannText(datum) {
    if (!datum) return "Test";
    const tag = datumObjekt(datum).toLocaleDateString("de-DE", { weekday: "short", day: "numeric", month: "numeric" });
    const tage = tageBis(datum);
    if (tage === 0) return `Test heute · ${tag}`;
    if (tage === 1) return `Test morgen · ${tag}`;
    if (tage > 1) return `Test in ${tage} Tagen · ${tag}`;
    return `Test war am ${tag}`;
  }

  function hatInhalt(lf) {
    return lf.kapitel.length + lf.karteikarten.length + lf.quiz.length + lf.buchungen.length > 0;
  }

  function titelVon(lf) {
    return lf.titel || (lf.test ? "Test" : `Lernfeld ${lf.nr}`);
  }

  function zaehler(lf) {
    const teile = [];
    if (lf.kapitel.length) teile.push(anzahlText(lf.kapitel.length, "Kapitel", "Kapitel"));
    if (lf.buchungen.length) teile.push(anzahlText(lf.buchungen.length, "Buchungssatz", "Buchungssätze"));
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
    if (lf.buchungen.length) teile.push(s.buchenBest || 0);
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
    setzeBrowserFarbe();
  }

  // Färbt die Browserleiste auf dem Handy passend zum gewählten Design.
  function setzeBrowserFarbe() {
    const farbe = getComputedStyle(document.documentElement).getPropertyValue("--papier").trim();
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) => (m.content = farbe));
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
    try {
      localStorage.removeItem(ZULETZT);
    } catch (e) {
      /* egal */
    }
    aktuell = null;
    deck = null;
    quiz = null;
    spiel = null;
    buchen = null;
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
      <span class="lf-fuss"><span class="lf-meta">${voll ? zaehler(lf) : "Inhalt folgt"}</span>${balken(anteil)}</span>
      <span class="sr-only">${voll ? `Fortschritt ${prozent(anteil)}` : ""}</span>
    </a></li>`;
  }

  // "1, 2, 3, 14" → "1–3, 14"
  function nummernText(nummern) {
    const teile = [];
    for (let i = 0; i < nummern.length; i++) {
      let j = i;
      while (j + 1 < nummern.length && nummern[j + 1] === nummern[j] + 1) j++;
      teile.push(j > i + 1 ? `${nummern[i]}–${nummern[j]}` : nummern.slice(i, j + 1).join(", "));
      i = j;
    }
    return teile.join(", ");
  }

  // Gruppiert die Kacheln nach Lehrjahr, sobald welche eingetragen sind; ohne Jahr landen sie am Ende.
  function jahrgaenge(lfs) {
    if (lfs.every((lf) => !lf.jahr)) return `<ol class="lf-raster">${lfs.map(kachel).join("")}</ol>`;
    const jahre = [...new Set(lfs.map((lf) => lf.jahr))].sort((a, b) => (a || 99) - (b || 99));
    return jahre
      .map((jahr) => {
        const gruppe = lfs.filter((lf) => lf.jahr === jahr);
        const titel = jahr ? `LJ ${jahr}` : "Noch nicht eingeteilt";
        return `<section class="jahrgang" aria-labelledby="jahr-${jahr}">
          <h2 class="jahr-titel" id="jahr-${jahr}">${titel}<small>LF ${nummernText(gruppe.map((lf) => lf.nr))}</small></h2>
          <ol class="lf-raster">${gruppe.map(kachel).join("")}</ol>
        </section>`;
      })
      .join("");
  }

  function testBereich() {
    const tests = alleTests();
    if (!tests.length) return "";
    const karten = tests
      .map((t) => {
        const vorbei = t.datum && tageBis(t.datum) < 0;
        return `<a class="test-karte${vorbei ? " vorbei" : ""}" href="${seitenHash(t)}" data-nr="${t.nr}">
          <span class="test-wann">${esc(wannText(t.datum))}</span>
          <span class="test-titel">${esc(titelVon(t))}</span>
          <span class="lf-fuss"><span class="lf-meta">${zaehler(t)}</span>${balken(fortschritt(t))}</span>
        </a>`;
      })
      .join("");
    return `<section class="tests" aria-label="Tests">${karten}</section>`;
  }

  function zuletztGelernt() {
    try {
      const z = JSON.parse(localStorage.getItem(ZULETZT));
      const lfOk = typeof z?.nr === "number" && z.nr >= 1 && z.nr <= ANZAHL;
      const testOk = typeof z?.nr === "string" && (P.tests || {})[z.nr];
      if (lfOk || testOk) return z;
    } catch (e) {
      /* nichts gespeichert */
    }
    return null;
  }

  function weiterlernen() {
    const z = zuletztGelernt();
    const lf = z && lernfeld(z.nr);
    if (!lf || !hatInhalt(lf)) return "";
    const tabs = sichtbareTabs(lf);
    const tab = tabs.find((t) => t.id === z.tab && tabHatInhalt(lf, t)) || tabs.find((t) => tabHatInhalt(lf, t));
    return `<a class="weiterlernen" href="${seitenHash(lf)}-${tab.id}">
      <span class="eyebrow">Weiterlernen</span>
      <span class="wl-titel">${lf.test ? "Test" : `LF ${lf.nr}`} · ${esc(titelVon(lf))}</span>
      <span class="wl-meta">${tab.name} · ${prozent(fortschritt(lf))} gelernt</span>
    </a>`;
  }

  function zeigeStart(vonNr) {
    aktuell = null;
    deck = null;
    quiz = null;
    spiel = null;
    buchen = null;
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
        ${testBereich()}
        <section class="intro">
          <p class="eyebrow">${esc(unterzeile)}</p>
          <h1>Lernfelder</h1>
          <p class="lead">Such dir ein Lernfeld aus. Zu jedem gibt es Lernstoff zum Nachlesen, Karteikarten, ein Quiz und die Blitzrunde als schnelles Spiel.</p>
          <p class="stand">${standText}</p>
          ${weiterlernen()}
        </section>
        ${jahrgaenge(lfs)}
      </main>
      ${fusszeile()}
    </div>`;

    const ziel = vonNr && app.querySelector(`.lf-kachel[data-nr="${vonNr}"], .test-karte[data-nr="${vonNr}"]`);
    if (ziel) {
      ziel.scrollIntoView({ block: "center" });
      ziel.focus({ preventScroll: true });
    } else {
      window.scrollTo(0, 0);
    }
  }

  // ---------- Lernfeld-Seite ----------

  function tabHatInhalt(lf, t) {
    return t.feld ? lf[t.feld].length > 0 : hatSpiel(lf);
  }

  function sichtbareTabs(lf) {
    return TABS.filter((t) => t.id !== "buchen" || lf.buchungen.length > 0);
  }

  function standardTab(lf) {
    const mitInhalt = sichtbareTabs(lf).find((t) => tabHatInhalt(lf, t));
    return mitInhalt ? mitInhalt.id : "lernstoff";
  }

  function nachbarLink(nr, klasse, beschriftung) {
    if (nr < 1 || nr > ANZAHL) return "";
    return `<a class="${klasse}" href="#lf${nr}"><small>${beschriftung}</small><span>${esc(titelVon(lernfeld(nr)))}</span></a>`;
  }

  function zeigeLernfeld(nr, tab) {
    const lf = lernfeld(nr);
    const tabs = sichtbareTabs(lf);
    tab = tab || standardTab(lf);
    const neu = !aktuell || aktuell.nr !== nr;
    aktuell = { nr, tab };
    document.title = `${titelVon(lf)} · ${P.name}`;

    if (neu) {
      deck = null;
      quiz = null;
      spiel = null;
      buchen = null;
      const eyebrow = lf.test ? esc(wannText(lf.datum)) : `LF ${nr} von ${ANZAHL}${lf.jahr ? ` · LJ ${lf.jahr}` : ""}`;
      app.innerHTML = `<div class="seite mit-leiste">
        ${kopfzeile()}
        <main class="lf-seite">
          <a class="zurueck" href="#start">${lf.test ? "← Übersicht" : "← Alle Lernfelder"}</a>
          <header class="lf-kopf">
            <p class="eyebrow">${eyebrow}</p>
            <h1>${esc(titelVon(lf))}</h1>
            ${lf.beschreibung ? `<p class="lead">${esc(lf.beschreibung)}</p>` : ""}
            <div class="lf-fortschritt" id="lf-fortschritt"></div>
            ${hatSpiel(lf) ? `<button type="button" class="knopf blitz-start" data-tab="spiel">${ICON_BLITZ}<span>Blitzrunde spielen</span></button>` : ""}
          </header>
          <div class="tabs" role="tablist" aria-label="Lernbereiche">
            ${tabs.map(
              (t) =>
                `<button type="button" role="tab" id="tab-${t.id}" aria-controls="panel" data-tab="${t.id}">${t.name}${t.feld ? `<span class="anzahl">${lf[t.feld].length}</span>` : ""}</button>`,
            ).join("")}
          </div>
          <section class="panel" id="panel" role="tabpanel"></section>
          ${
            lf.test
              ? ""
              : `<nav class="nachbarn" aria-label="Weitere Lernfelder">
            ${nachbarLink(nr - 1, "zurueck-lf", `← Lernfeld ${nr - 1}`)}
            ${nachbarLink(nr + 1, "weiter", `Lernfeld ${nr + 1} →`)}
          </nav>`
          }
        </main>
        ${fusszeile()}
        <nav class="unten-leiste" aria-label="Lernbereiche" data-spalten="${tabs.length + 1}" style="--spalten:${tabs.length + 1}">
          <a class="unten-knopf" href="#start">${ICON_UEBERSICHT}<span>Übersicht</span></a>
          ${tabs.map((t) => `<button type="button" class="unten-knopf" data-tab="${t.id}">${t.icon}<span>${t.kurz}</span></button>`).join("")}
        </nav>
      </div>`;
      window.scrollTo(0, 0);
    }

    app.querySelectorAll('[role="tab"]').forEach((b) => {
      const an = b.dataset.tab === tab;
      b.setAttribute("aria-selected", String(an));
      b.tabIndex = an ? 0 : -1;
    });
    app.querySelectorAll(".unten-knopf[data-tab]").forEach((b) => {
      if (b.dataset.tab === tab) b.setAttribute("aria-current", "page");
      else b.removeAttribute("aria-current");
    });
    try {
      localStorage.setItem(ZULETZT, JSON.stringify({ nr, tab }));
    } catch (e) {
      /* egal */
    }
    zeigePanel();
    zeigeFortschritt(lf);
  }

  // scrollen: "immer" (Leiste unten) oder "wenn-verdeckt" (klebende Reiter oben)
  function wechsleTab(tab, fokus, scrollen) {
    if (!aktuell) return;
    const hash = `${seitenHash(lernfeld(aktuell.nr))}-${tab}`;
    try {
      history.replaceState(null, "", hash);
    } catch (e) {
      location.hash = hash;
      return;
    }
    zeigeLernfeld(aktuell.nr, tab);
    if (fokus) document.getElementById(`tab-${tab}`).focus();
    const panel = document.getElementById("panel");
    const reiter = app.querySelector(".tabs");
    const verdeckt = reiter && panel.getBoundingClientRect().top < reiter.getBoundingClientRect().bottom;
    if (scrollen === "immer" || (scrollen === "wenn-verdeckt" && verdeckt)) panel.scrollIntoView({ block: "start" });
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
    app.querySelector(".seite").classList.remove("fokus");
    if (aktuell.tab === "karten") panelKarten(lf, panel, opt || {});
    else if (aktuell.tab === "quiz") panelQuiz(lf, panel);
    else if (aktuell.tab === "spiel") panelSpiel(lf, panel);
    else if (aktuell.tab === "buchen") panelBuchen(lf, panel);
    else panelLernstoff(lf, panel);
  }

  function leer(art, lf) {
    const texte = {
      lernstoff: [
        "Noch kein Lernstoff",
        `Für ${lf.test ? "diesen Test" : `Lernfeld ${lf.nr}`} ist noch kein Lernstoff da. Sobald er eingetragen ist, findest du ihn hier in Kapiteln zum Nachlesen.`,
      ],
      karten: [
        "Noch keine Karteikarten",
        "Hier fragst du dich später selbst ab: Frage lesen, Karte umdrehen, ehrlich sagen, ob du es wusstest.",
      ],
      buchen: [
        "Noch keine Buchungssätze",
        "Hier übst du Buchungssätze (Soll an Haben), sobald welche eingetragen sind.",
      ],
      spiel: [
        "Noch keine Blitzrunde",
        "Die Blitzrunde mischt schnelle Fragen aus den Karteikarten und dem Quiz dieses Lernfelds. Sobald dort etwas eingetragen ist, kannst du hier spielen.",
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
      <p class="tastenhinweis"><kbd>Leertaste</kbd> umdrehen · <kbd>←</kbd> nochmal · <kbd>→</kbd> gewusst</p>
      <p class="wischhinweis">${hinten ? "Nach rechts wischen = gewusst · nach links = nochmal" : "Tippe auf die Karte, um sie umzudrehen"}</p>`;
    if (opt.fokus) el.querySelector(".karteikarte").focus({ preventScroll: true });
    if (opt.aktionenZeigen) el.querySelector(".karte-aktionen .knopf").scrollIntoView({ block: "nearest" });
  }

  function umdrehen() {
    if (!deck || !deck.karten.length) return;
    const karte = app.querySelector(".karteikarte");
    deck.umgedreht = !deck.umgedreht;
    if (!karte || bewegungReduziert()) {
      zeigePanel({ fokus: true, aktionenZeigen: true });
      return;
    }
    karte.classList.add("kippt-weg");
    setTimeout(() => zeigePanel({ fokus: true, animation: "kippt-her", aktionenZeigen: true }), 150);
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
    if (weiter) {
      weiter.focus({ preventScroll: true });
      weiter.scrollIntoView({ block: "nearest" });
    }
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
    panelNachOben();
  }

  // Holt die Frage nach oben, damit sie auf dem Handy nicht unter dem Lernfeld-Kopf startet.
  function panelNachOben() {
    const panel = document.getElementById("panel");
    if (!panel) return;
    const oben = panel.getBoundingClientRect().top;
    if (oben < 0 || oben > window.innerHeight * 0.25) panel.scrollIntoView({ block: "start" });
  }

  // ---------- Buchungssätze üben ----------

  function kontenListe(lf) {
    return [...lf.konten.aktiv, ...lf.konten.passiv].sort((a, b) => a.localeCompare(b, "de"));
  }

  function kontoArt(lf, konto) {
    return lf.konten.passiv.includes(konto) ? "Passivkonto" : "Aktivkonto";
  }

  // Aktivkonto im Soll oder Passivkonto im Haben = Zugang, sonst Abgang.
  function zugangOderAbgang(lf, konto, seite) {
    return (kontoArt(lf, konto) === "Aktivkonto") === (seite === "Soll") ? "Zugang" : "Abgang";
  }

  function euro(betrag) {
    return `${Number(betrag).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
  }

  function istEinfach(b) {
    return b.soll.length === 1 && b.haben.length === 1;
  }

  function buchungssatzText(b) {
    return `${b.soll.map((z) => z[0]).join(", ")} an ${b.haben.map((z) => z[0]).join(", ")}`;
  }

  function herleitungText(lf, b) {
    const teil = (konto, seite) => `${konto} (${kontoArt(lf, konto)}, ${zugangOderAbgang(lf, konto, seite)}) im ${seite}`;
    return `${teil(b.soll[0][0], "Soll")} an ${teil(b.haben[0][0], "Haben")}.`;
  }

  function starteBuchen(lf, art) {
    const alle = lf.buchungen.map((_, i) => i);
    const einfach = mischen(alle.filter((i) => istEinfach(lf.buchungen[i])));
    const zusammen = mischen(alle.filter((i) => !istEinfach(lf.buchungen[i])));
    let aufgaben;
    if (art === "einfach") aufgaben = einfach.slice(0, 10);
    else if (art === "zusammen") aufgaben = zusammen.slice(0, 10);
    else if (art === "falsche") aufgaben = mischen(buchen.ergebnisse.filter((e) => !e.richtig).map((e) => e.i));
    else aufgaben = mischen([...einfach.slice(0, 6), ...zusammen.slice(0, 4)]);
    buchen = { nr: lf.nr, phase: "aufgabe", art, aufgaben, pos: 0, wahl: { soll: [""], haben: [""] }, pruefung: null, ergebnisse: [] };
  }

  function panelBuchen(lf, el) {
    if (!lf.buchungen.length) {
      el.innerHTML = leer("buchen", lf);
      return;
    }
    if (!buchen || buchen.nr !== lf.nr) buchen = { nr: lf.nr, phase: "start" };
    const s = standVon(lf.nr);

    if (buchen.phase === "start") {
      const einfach = lf.buchungen.filter(istEinfach).length;
      const zusammen = lf.buchungen.length - einfach;
      el.innerHTML = `<div class="block">
        <h2>Buchungssätze üben</h2>
        <p>Du bekommst einen Geschäftsfall und bildest den Buchungssatz: zuerst das Konto im <strong>Soll</strong>, dann <strong>an</strong> das Konto im <strong>Haben</strong>. Werden mehr als zwei Konten berührt, nimmst du mit „+ Konto“ weitere dazu.</p>
        ${s.buchenBest != null ? `<p>Dein bestes Ergebnis bisher: <strong>${prozent(s.buchenBest)}</strong></p>` : ""}
        <div class="knopfreihe">
          ${einfach && zusammen ? '<button type="button" class="knopf primaer" data-aktion="buchen-start" data-art="gemischt">Gemischt · 10 Fälle</button>' : ""}
          ${einfach ? `<button type="button" class="knopf${zusammen ? "" : " primaer"}" data-aktion="buchen-start" data-art="einfach">Einfache · ${Math.min(10, einfach)} Fälle</button>` : ""}
          ${zusammen ? `<button type="button" class="knopf${einfach ? "" : " primaer"}" data-aktion="buchen-start" data-art="zusammen">Zusammengesetzte · ${Math.min(10, zusammen)} Fälle</button>` : ""}
        </div>
      </div>`;
      return;
    }

    if (buchen.phase === "ende") {
      el.innerHTML = buchenAuswertung(lf, s);
      return;
    }

    const b = lf.buchungen[buchen.aufgaben[buchen.pos]];
    const p = buchen.pruefung;
    const konten = kontenListe(lf);
    const loesung = { soll: b.soll.map((z) => z[0]), haben: b.haben.map((z) => z[0]) };
    const anzahl = buchen.aufgaben.length;
    const richtigBisher = buchen.ergebnisse.filter((e) => e.richtig).length;

    const seite = (name) => {
      const zeilen = buchen.wahl[name]
        .map((wert, j) => {
          let klasse = "konto-wahl";
          if (p && wert) klasse += loesung[name].includes(wert) ? " richtig" : " falsch";
          const label = `${name === "soll" ? "Konto im Soll" : "Konto im Haben"}${j ? ` ${j + 1}` : ""}`;
          return `<div class="konto-zeile">
            <select class="${klasse}" id="bs-${name}-${j}" data-seite="${name}" data-i="${j}" aria-label="${label}"${p ? " disabled" : ""}>
              <option value="">Konto wählen …</option>
              ${konten.map((k) => `<option value="${esc(k)}"${k === wert ? " selected" : ""}>${esc(k)}</option>`).join("")}
            </select>
            ${j > 0 && !p ? `<button type="button" class="konto-weg" data-aktion="buchen-minus" data-seite="${name}" data-i="${j}" aria-label="${label} entfernen">×</button>` : ""}
          </div>`;
        })
        .join("");
      const plus = p ? "" : `<button type="button" class="bs-plus" data-aktion="buchen-plus" data-seite="${name}">+ Konto</button>`;
      return `<div class="bs-seite"><span class="bs-label">${name === "soll" ? "Soll" : "Haben"}</span>${zeilen}${plus}</div>`;
    };

    let unten;
    if (!p) {
      const bereit = buchen.wahl.soll.some(Boolean) && buchen.wahl.haben.some(Boolean);
      unten = `<button type="button" class="knopf primaer" data-aktion="buchen-pruefen"${bereit ? "" : " disabled"}>Prüfen</button>`;
    } else {
      let titel = "Richtig!";
      let text = "";
      if (!p.richtig && p.vertauscht) {
        titel = "Soll und Haben sind vertauscht.";
        text = "Frag dich bei jedem Konto: Aktiv oder Passiv? Zugang oder Abgang?";
      } else if (!p.richtig) {
        titel = "Nicht ganz.";
        text = `${p.sollOk ? "Das Soll stimmt." : "Das Soll stimmt nicht."} ${p.habenOk ? "Das Haben stimmt." : "Das Haben stimmt nicht."}`;
      }
      unten = `<div class="rueckmeldung ${p.richtig ? "gut" : "schlecht"}" role="status"><strong>${titel}</strong>${text ? `<p>${text}</p>` : ""}</div>
        ${loesungHtml(b)}
        ${herleitungHtml(lf, b, !p.richtig)}
        <button type="button" class="knopf primaer" data-aktion="buchen-weiter">${buchen.pos === anzahl - 1 ? "Zur Auswertung" : "Nächster Geschäftsfall"}</button>`;
    }

    el.innerHTML = `<div class="leiste">
        <span class="leiste-info">Geschäftsfall <strong>${buchen.pos + 1}</strong> von ${anzahl}</span>
        <span class="leiste-info">${richtigBisher} richtig</span>
      </div>
      ${balken(buchen.pos / anzahl)}
      <div class="block">
        <p class="eyebrow">Geschäftsfall</p>
        <p class="fall">${esc(b.fall)}</p>
        <div class="buchungssatz">
          ${seite("soll")}
          <div class="bs-an" aria-hidden="true">an</div>
          ${seite("haben")}
        </div>
        ${unten}
      </div>`;
  }

  function loesungHtml(b) {
    const zeilen = (liste) =>
      liste.map(([konto, betrag]) => `<div class="bs-zeile"><span>${esc(konto)}</span><span class="betrag">${euro(betrag)}</span></div>`).join("");
    return `<div class="loesung">
      <p class="eyebrow">Lösung</p>
      <div class="bs-loesung">
        <div class="bs-block">${zeilen(b.soll)}</div>
        <div class="bs-an">an</div>
        <div class="bs-block">${zeilen(b.haben)}</div>
      </div>
      ${b.hinweis ? `<p class="hinweis">${esc(b.hinweis)}</p>` : ""}
    </div>`;
  }

  function herleitungHtml(lf, b, offen) {
    const zeile = (konto, seite) =>
      `<tr><td>${esc(konto)}</td><td>${kontoArt(lf, konto).replace("konto", "")}</td><td>${zugangOderAbgang(lf, konto, seite)}</td><td>${seite}</td></tr>`;
    return `<details class="herleitung"${offen ? " open" : ""}>
      <summary>So kommst du drauf</summary>
      <div class="inhalt"><div class="tabelle"><table>
        <thead><tr><th>Konto</th><th>Aktiv/ Passiv</th><th>Zu-/ Abgang</th><th>Seite</th></tr></thead>
        <tbody>${b.soll.map((z) => zeile(z[0], "Soll")).join("")}${b.haben.map((z) => zeile(z[0], "Haben")).join("")}</tbody>
      </table></div></div>
    </details>`;
  }

  function buchenAuswertung(lf, s) {
    const anzahl = buchen.ergebnisse.length;
    const richtig = buchen.ergebnisse.filter((e) => e.richtig).length;
    const falsche = buchen.ergebnisse.filter((e) => !e.richtig).map((e) => lf.buchungen[e.i]);
    let zusatz;
    if (buchen.art === "falsche") zusatz = "Wiederholung der falschen Fälle, zählt nicht als Bestwert.";
    else if (buchen.neuerBest) zusatz = "Neuer Bestwert!";
    else zusatz = `Dein Bestwert: ${prozent(s.buchenBest)}`;
    const liste = falsche
      .map((b) => `<li><div>${esc(b.fall)}</div><div class="richtige-antwort">✓ ${esc(buchungssatzText(b))}</div></li>`)
      .join("");
    return `<div class="block">
      <p class="eyebrow">Auswertung</p>
      <p class="ergebnis-zahl">${richtig} <small>von ${anzahl} richtig</small></p>
      <p>${prozent(anzahl ? richtig / anzahl : 0)} · ${zusatz}</p>
      ${falsche.length ? `<h3>Diese Buchungssätze solltest du dir nochmal ansehen</h3><ol class="fehlerliste">${liste}</ol>` : "<p>Alles richtig gebucht. Stark!</p>"}
      <div class="knopfreihe">
        <button type="button" class="knopf primaer" data-aktion="buchen-neu">Neue Runde</button>
        ${falsche.length ? '<button type="button" class="knopf" data-aktion="buchen-start" data-art="falsche">Nur die falschen wiederholen</button>' : ""}
      </div>
    </div>`;
  }

  function buchenKontoPlus(seite) {
    if (!buchen || buchen.phase !== "aufgabe" || buchen.pruefung || buchen.wahl[seite].length >= 5) return;
    buchen.wahl[seite].push("");
    zeigePanel();
    const neu = document.getElementById(`bs-${seite}-${buchen.wahl[seite].length - 1}`);
    if (neu) neu.focus();
  }

  function buchenKontoWeg(seite, j) {
    if (!buchen || buchen.pruefung || j < 1) return;
    buchen.wahl[seite].splice(j, 1);
    zeigePanel();
  }

  function buchenPruefen() {
    if (!buchen || buchen.phase !== "aufgabe" || buchen.pruefung) return;
    const i = buchen.aufgaben[buchen.pos];
    const b = lernfeld(buchen.nr).buchungen[i];
    const menge = (liste) => new Set(liste.filter(Boolean));
    const gleich = (a, c) => a.size === c.size && [...a].every((x) => c.has(x));
    const soll = menge(b.soll.map((z) => z[0]));
    const haben = menge(b.haben.map((z) => z[0]));
    const wahlSoll = menge(buchen.wahl.soll);
    const wahlHaben = menge(buchen.wahl.haben);
    if (!wahlSoll.size || !wahlHaben.size) return;
    const sollOk = gleich(wahlSoll, soll);
    const habenOk = gleich(wahlHaben, haben);
    const vertauscht = !sollOk && !habenOk && gleich(wahlSoll, haben) && gleich(wahlHaben, soll);
    buchen.pruefung = { sollOk, habenOk, vertauscht, richtig: sollOk && habenOk };
    buchen.ergebnisse.push({ i, richtig: sollOk && habenOk });
    zeigePanel();
    const weiter = app.querySelector('[data-aktion="buchen-weiter"]');
    const meldung = app.querySelector(".panel .rueckmeldung");
    if (meldung) meldung.scrollIntoView({ block: "nearest" });
    if (weiter) weiter.focus({ preventScroll: true });
  }

  function buchenWeiter() {
    if (!buchen || !buchen.pruefung) return;
    buchen.pos += 1;
    buchen.pruefung = null;
    buchen.wahl = { soll: [""], haben: [""] };
    if (buchen.pos >= buchen.aufgaben.length) {
      const lf = lernfeld(buchen.nr);
      const s = standVon(lf.nr);
      const anteil = buchen.ergebnisse.filter((e) => e.richtig).length / buchen.ergebnisse.length;
      buchen.neuerBest = buchen.art !== "falsche" && (s.buchenBest == null || anteil > s.buchenBest);
      if (buchen.neuerBest) s.buchenBest = anteil;
      buchen.phase = "ende";
      speichern();
      zeigeFortschritt(lf);
    }
    zeigePanel();
    panelNachOben();
  }

  // ---------- Blitzrunde ----------

  // Spielfragen aus dem Quiz (nur mit einer richtigen Antwort) und aus den Karteikarten („Was passt?“).
  function spielFragen(lf) {
    const fragen = [];
    lf.quiz.forEach((q) => {
      if (!Array.isArray(q.richtig) && (q.antworten || []).length >= 2) {
        fragen.push({ art: "Quiz", frage: q.frage, optionen: q.antworten, richtig: q.richtig, erklaerung: q.erklaerung || "" });
      }
    });
    const karten = lf.karteikarten;
    if (karten.length >= 2) {
      karten.forEach((karte) => {
        const andere = mischen(karten.filter((k) => k.hinten !== karte.hinten))
          .slice(0, 3)
          .map((k) => k.hinten);
        const optionen = mischen([karte.hinten, ...andere]);
        fragen.push({ art: "Was passt?", frage: karte.vorne, optionen, richtig: optionen.indexOf(karte.hinten), erklaerung: "" });
      });
    }
    const konten = kontenListe(lf);
    lf.buchungen.filter(istEinfach).forEach((b) => {
      const soll = b.soll[0][0];
      const haben = b.haben[0][0];
      const richtig = `${soll} an ${haben}`;
      const falsch = new Set([`${haben} an ${soll}`]);
      for (const k of mischen(konten)) {
        if (falsch.size >= 3) break;
        if (k !== soll && k !== haben) falsch.add(falsch.size % 2 ? `${soll} an ${k}` : `${k} an ${haben}`);
      }
      const optionen = mischen([richtig, ...falsch]);
      fragen.push({ art: "Buchungssatz", frage: b.fall, optionen, richtig: optionen.indexOf(richtig), erklaerung: herleitungText(lf, b) });
    });
    return fragen;
  }

  function hatSpiel(lf) {
    return spielFragen(lf).length >= 2;
  }

  // Mehrzeilige Kartenrückseiten als eine Zeile, damit sie in einen Antwortknopf passen.
  function einzeilig(text) {
    return String(text ?? "")
      .split("\n")
      .map((z) => z.replace(/^\s*[-*]\s+/, "").trim())
      .filter(Boolean)
      .join(" · ");
  }

  function antwortText(frage, j) {
    return mdZeile(frage.art === "Quiz" ? frage.optionen[j] : einzeilig(frage.optionen[j]));
  }

  function zahl(n) {
    return Number(n || 0).toLocaleString("de-DE");
  }

  function starteSpiel(lf, anzahl) {
    clearTimeout(spielTimer);
    spiel = {
      nr: lf.nr,
      phase: "frage",
      fragen: mischen(spielFragen(lf)).slice(0, anzahl),
      pos: 0,
      gewaehlt: null,
      ergebnisse: [],
      punkte: 0,
      plus: null,
      serie: 0,
      besteSerie: 0,
      fehler: [],
      seit: Date.now(),
    };
  }

  function panelSpiel(lf, el) {
    if (!hatSpiel(lf)) {
      el.innerHTML = leer("spiel", lf);
      return;
    }
    if (!spiel || spiel.nr !== lf.nr) spiel = { nr: lf.nr, phase: "start" };
    const s = standVon(lf.nr);

    if (spiel.phase === "start") {
      const vorrat = spielFragen(lf).length;
      const runden = vorrat <= 5 ? [vorrat] : [5, Math.min(10, vorrat)];
      el.innerHTML = `<div class="block spiel-start">
        <h2>Blitzrunde</h2>
        <p>Schnelle Fragen aus diesem Lernfeld, bunt gemischt. Richtig gibt Punkte, schnell antworten gibt Bonus, mehrere richtig am Stück geben eine Serie.</p>
        <p class="hinweis">Während der Runde siehst du nur die Frage, alles andere ist ausgeblendet.</p>
        ${s.spielBest ? `<p>Dein Rekord: <strong>${zahl(s.spielBest)} Punkte</strong></p>` : ""}
        <div class="knopfreihe">
          ${runden
            .map(
              (n, i) =>
                `<button type="button" class="knopf${i === 0 ? " primaer" : ""}" data-aktion="spiel-start" data-anzahl="${n}">${n} Fragen · ca. ${Math.max(1, Math.round(n / 5))} Min.</button>`,
            )
            .join("")}
        </div>
      </div>`;
      return;
    }

    app.querySelector(".seite").classList.add("fokus");
    const anzahl = spiel.fragen.length;

    if (spiel.phase === "ende") {
      const richtig = spiel.ergebnisse.filter(Boolean).length;
      let rekord = "";
      if (spiel.neuerRekord) rekord = " · <strong>Neuer Rekord!</strong>";
      else if (s.spielBest) rekord = ` · Rekord: ${zahl(s.spielBest)}`;
      const fehler = spiel.fehler
        .map((f) => `<li><div class="inhalt">${md(f.frage)}</div><div class="richtige-antwort">✓ ${antwortText(f, f.richtig)}</div></li>`)
        .join("");
      el.innerHTML = `<div class="block">
        <p class="eyebrow">Blitzrunde geschafft</p>
        <p class="ergebnis-zahl">${zahl(spiel.punkte)} <small>Punkte</small></p>
        <p>${richtig} von ${anzahl} richtig · beste Serie: ${spiel.besteSerie}${rekord}</p>
        ${fehler ? `<h3>Das schaust du dir am besten nochmal an</h3><ol class="fehlerliste">${fehler}</ol>` : "<p>Alles richtig. Stark!</p>"}
        <div class="knopfreihe">
          <button type="button" class="knopf primaer" data-aktion="spiel-start" data-anzahl="${anzahl}">Nochmal spielen</button>
          <button type="button" class="knopf" data-aktion="spiel-ende">Fertig</button>
        </div>
      </div>`;
      return;
    }

    const frage = spiel.fragen[spiel.pos];
    const beantwortet = spiel.gewaehlt !== null;
    const getroffen = beantwortet && spiel.gewaehlt === frage.richtig;
    const optionen = frage.optionen
      .map((_, j) => {
        let klasse = "option";
        if (beantwortet && j === frage.richtig) klasse += " richtig";
        else if (beantwortet && j === spiel.gewaehlt) klasse += " falsch";
        return `<li><button type="button" class="${klasse}" data-aktion="spiel-wahl" data-j="${j}"${beantwortet ? " disabled" : ""}>
          <span class="option-buchstabe">${BUCHSTABEN[j]}</span><span class="option-text">${antwortText(frage, j)}</span>
        </button></li>`;
      })
      .join("");

    let unten = "";
    if (getroffen) {
      const extra = [];
      if (spiel.plus.tempo) extra.push(`schnell +${spiel.plus.tempo}`);
      if (spiel.plus.serie) extra.push(`Serie +${spiel.plus.serie}`);
      unten = `<div class="spiel-plus" role="status"><strong>Richtig! +${spiel.plus.gesamt}</strong>${extra.length ? `<span>${extra.join(" · ")}</span>` : ""}</div>`;
    } else if (beantwortet) {
      unten = `<div class="rueckmeldung schlecht" role="status">
          <strong>Nicht ganz.</strong>
          ${frage.erklaerung ? `<div class="inhalt">${md(frage.erklaerung)}</div>` : "<p>Die richtige Antwort ist grün markiert.</p>"}
        </div>
        <button type="button" class="knopf primaer" data-aktion="spiel-weiter">${spiel.pos === anzahl - 1 ? "Zum Ergebnis" : "Weiter"}</button>`;
    }

    const schritte = spiel.fragen
      .map((_, i) => {
        if (i < spiel.ergebnisse.length) return `<li class="${spiel.ergebnisse[i] ? "gut" : "schlecht"}"></li>`;
        return `<li class="${i === spiel.pos ? "jetzt" : ""}"></li>`;
      })
      .join("");

    el.innerHTML = `<div class="spiel-kopf">
        <button type="button" class="knopf klein" data-aktion="spiel-ende">Beenden</button>
        <div class="spiel-werte">
          <span class="spiel-wert"><small>Punkte</small><strong>${zahl(spiel.punkte)}</strong></span>
          <span class="spiel-wert${spiel.serie >= 3 ? " heiss" : ""}"><small>Serie</small><strong>${spiel.serie}</strong></span>
        </div>
      </div>
      <ol class="spiel-schritte" aria-label="Frage ${spiel.pos + 1} von ${anzahl}">${schritte}</ol>
      <div class="block${beantwortet && !getroffen ? " wackelt" : ""}">
        <p class="eyebrow">${frage.art} · ${spiel.pos + 1} von ${anzahl}</p>
        <div class="spiel-frage inhalt">${md(frage.frage)}</div>
        <ul class="optionen">${optionen}</ul>
        ${unten}
      </div>`;
  }

  function spielWahl(j) {
    if (!spiel || spiel.phase !== "frage" || spiel.gewaehlt !== null) return;
    const frage = spiel.fragen[spiel.pos];
    if (j < 0 || j >= frage.optionen.length) return;
    spiel.gewaehlt = j;
    const getroffen = j === frage.richtig;
    spiel.ergebnisse.push(getroffen);
    if (getroffen) {
      const sekunden = (Date.now() - spiel.seit) / 1000;
      const tempo = sekunden <= 6 ? 50 : sekunden <= 12 ? 20 : 0;
      spiel.serie += 1;
      spiel.besteSerie = Math.max(spiel.besteSerie, spiel.serie);
      const serie = Math.min(spiel.serie - 1, 5) * 20;
      spiel.plus = { gesamt: 100 + tempo + serie, tempo, serie };
      spiel.punkte += spiel.plus.gesamt;
    } else {
      spiel.serie = 0;
      spiel.fehler.push(frage);
    }
    zeigePanel();
    if (getroffen) {
      // Richtige Antworten gehen von allein weiter, damit der Fluss nicht abreißt.
      const pos = spiel.pos;
      clearTimeout(spielTimer);
      spielTimer = setTimeout(() => {
        if (spiel && spiel.phase === "frage" && spiel.pos === pos && aktuell && aktuell.tab === "spiel") spielWeiter();
      }, 1100);
    } else {
      const weiter = app.querySelector('[data-aktion="spiel-weiter"]');
      if (weiter) {
        weiter.focus({ preventScroll: true });
        weiter.scrollIntoView({ block: "nearest" });
      }
    }
  }

  function spielWeiter() {
    if (!spiel || spiel.phase !== "frage" || spiel.gewaehlt === null) return;
    clearTimeout(spielTimer);
    spiel.pos += 1;
    spiel.gewaehlt = null;
    spiel.plus = null;
    spiel.seit = Date.now();
    if (spiel.pos >= spiel.fragen.length) {
      const s = standVon(spiel.nr);
      spiel.neuerRekord = spiel.punkte > (s.spielBest || 0);
      if (spiel.neuerRekord) s.spielBest = spiel.punkte;
      spiel.phase = "ende";
      speichern();
    }
    zeigePanel();
    window.scrollTo(0, 0);
  }

  function spielBeenden() {
    if (!spiel) return;
    clearTimeout(spielTimer);
    spiel = { nr: spiel.nr, phase: "start" };
    zeigePanel();
    const panel = document.getElementById("panel");
    if (panel) panel.scrollIntoView({ block: "start" });
  }

  // ---------- Steuerung ----------

  app.addEventListener("click", (e) => {
    const tabKnopf = e.target.closest("[data-tab]");
    if (tabKnopf) {
      const immer = tabKnopf.closest(".unten-leiste, .blitz-start");
      wechsleTab(tabKnopf.dataset.tab, false, immer ? "immer" : "wenn-verdeckt");
      return;
    }
    const el = e.target.closest("[data-aktion]");
    if (!el || el.disabled) return;
    if (el.dataset.aktion === "umdrehen" && Date.now() < klickSperreBis) return;
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
        panelNachOben();
        break;
      case "quiz-falsche":
        starteQuiz(lf, true);
        zeigePanel();
        panelNachOben();
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
      case "spiel-start":
        starteSpiel(lf, Number(el.dataset.anzahl));
        zeigePanel();
        window.scrollTo(0, 0);
        break;
      case "spiel-wahl":
        spielWahl(Number(el.dataset.j));
        break;
      case "spiel-weiter":
        spielWeiter();
        break;
      case "spiel-ende":
        spielBeenden();
        break;
      case "buchen-start":
        starteBuchen(lf, el.dataset.art);
        zeigePanel();
        panelNachOben();
        break;
      case "buchen-neu":
        buchen = { nr: lf.nr, phase: "start" };
        zeigePanel();
        break;
      case "buchen-plus":
        buchenKontoPlus(el.dataset.seite);
        break;
      case "buchen-minus":
        buchenKontoWeg(el.dataset.seite, Number(el.dataset.i));
        break;
      case "buchen-pruefen":
        buchenPruefen();
        break;
      case "buchen-weiter":
        buchenWeiter();
        break;
    }
  });

  // Kontenauswahl im Buchungssatz-Trainer
  app.addEventListener("change", (e) => {
    const wahl = e.target.closest(".konto-wahl");
    if (!wahl || !buchen || buchen.pruefung) return;
    buchen.wahl[wahl.dataset.seite][Number(wahl.dataset.i)] = wahl.value;
    const knopf = app.querySelector('[data-aktion="buchen-pruefen"]');
    if (knopf) knopf.disabled = !(buchen.wahl.soll.some(Boolean) && buchen.wahl.haben.some(Boolean));
  });

  document.addEventListener("keydown", (e) => {
    if (!aktuell || e.altKey || e.ctrlKey || e.metaKey) return;
    const ziel = e.target;

    // Pfeiltasten wechseln auf der Reiterleiste den Reiter; alle anderen Tasten gelten der Seite.
    const aufReiter = ziel.getAttribute && ziel.getAttribute("role") === "tab";
    if (aufReiter) {
      const tabs = sichtbareTabs(lernfeld(aktuell.nr));
      const i = tabs.findIndex((t) => t.id === aktuell.tab);
      let neu = -1;
      if (e.key === "ArrowRight") neu = (i + 1) % tabs.length;
      else if (e.key === "ArrowLeft") neu = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === "Home") neu = 0;
      else if (e.key === "End") neu = tabs.length - 1;
      if (neu >= 0) {
        e.preventDefault();
        wechsleTab(tabs[neu].id, true);
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

    if (aktuell.tab === "buchen" && buchen && buchen.phase === "aufgabe") {
      if (e.key === "Enter" && !aufKnopf) {
        e.preventDefault();
        if (buchen.pruefung) buchenWeiter();
        else buchenPruefen();
      }
      return;
    }

    if (aktuell.tab === "spiel" && spiel && spiel.phase !== "start") {
      if (e.key === "Escape") {
        e.preventDefault();
        spielBeenden();
      } else if (spiel.phase === "frage" && /^[1-9]$/.test(e.key)) {
        e.preventDefault();
        spielWahl(Number(e.key) - 1);
      } else if (spiel.phase === "frage" && e.key === "Enter" && !aufKnopf) {
        e.preventDefault();
        spielWeiter();
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

  // ---------- Wischen auf Karteikarten (Touch) ----------

  app.addEventListener("pointerdown", (e) => {
    const karte = e.target.closest(".karteikarte");
    if (!karte || e.pointerType === "mouse" || !deck || !deck.umgedreht) return;
    wisch = { id: e.pointerId, x0: e.clientX, y0: e.clientY, dx: 0, karte, aktiv: false };
  });

  app.addEventListener("pointermove", (e) => {
    if (!wisch || e.pointerId !== wisch.id) return;
    const dx = e.clientX - wisch.x0;
    const dy = e.clientY - wisch.y0;
    if (!wisch.aktiv) {
      if (Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx)) {
        wisch = null; // senkrecht: die Seite scrollt
        return;
      }
      if (Math.abs(dx) < 12) return;
      wisch.aktiv = true;
      wisch.karte.classList.add("wischt");
      try {
        wisch.karte.setPointerCapture(e.pointerId);
      } catch (err) {
        /* egal */
      }
    }
    wisch.dx = dx;
    wisch.karte.style.transform = `translateX(${dx}px) rotate(${dx / 25}deg)`;
    wisch.karte.dataset.richtung = dx > 60 ? "gewusst" : dx < -60 ? "nochmal" : "";
  });

  function wischEnde(e) {
    if (!wisch || e.pointerId !== wisch.id) return;
    const { karte, dx, aktiv } = wisch;
    wisch = null;
    if (!aktiv) return;
    klickSperreBis = Date.now() + 400;
    karte.classList.remove("wischt");
    if (e.type === "pointerup" && Math.abs(dx) > 90) {
      const gewusst = dx > 0;
      if (bewegungReduziert()) {
        bewerte(gewusst);
        return;
      }
      karte.style.transition = "transform 0.2s ease-in, opacity 0.2s";
      karte.style.transform = `translateX(${gewusst ? 120 : -120}%) rotate(${gewusst ? 12 : -12}deg)`;
      karte.style.opacity = "0";
      setTimeout(() => bewerte(gewusst), 200);
    } else {
      karte.style.transition = "transform 0.2s";
      karte.style.transform = "";
      karte.dataset.richtung = "";
    }
  }

  app.addEventListener("pointerup", wischEnde);
  app.addEventListener("pointercancel", wischEnde);

  function route() {
    const tabs = "lernstoff|buchen|karten|quiz|spiel";
    const lf = new RegExp(`^#lf(\\d{1,2})(?:-(${tabs}))?$`).exec(location.hash);
    const nr = lf ? Number(lf[1]) : 0;
    if (nr >= 1 && nr <= ANZAHL) return zeigeLernfeld(nr, lf[2]);
    const t = new RegExp(`^#test-([a-z0-9]+)(?:-(${tabs}))?$`).exec(location.hash);
    if (t && (P.tests || {})[t[1]]) return zeigeLernfeld(t[1], t[2]);
    zeigeStart(aktuell && aktuell.nr);
  }

  window.addEventListener("hashchange", route);
  if (document.documentElement.dataset.theme) setzeBrowserFarbe();
  route();

  // Offline-Modus: nur in der veröffentlichten Seite (mit Web-App-Manifest), nicht lokal als Datei.
  const sicher = location.protocol === "https:" || location.hostname === "localhost";
  if ("serviceWorker" in navigator && sicher && document.querySelector('link[rel="manifest"]')) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
