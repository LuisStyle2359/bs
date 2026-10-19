# Lernportal Berufsschule

Eine Lernseite für die Klasse 10KU, Kaufleute für Spedition und Logistikdienstleistung: 15 Lernfelder, nach Ausbildungsjahr sortiert und jedes einzeln anklickbar. Zu jedem Lernfeld gibt es drei Bereiche:

- **Lernstoff**: Kapitel zum Nachlesen, jedes Kapitel lässt sich als gelesen abhaken
- **Karteikarten**: Frage lesen, Karte umdrehen, dann „Gewusst“ oder „Nochmal“
- **Quiz**: Multiple-Choice-Fragen mit Erklärung und Auswertung am Ende

Der Lernfortschritt wird nur im eigenen Browser gespeichert (localStorage). Es gibt keine Anmeldung und keinen Server.

## Auf Handy und iPad

Die Seite ist fürs Handy gebaut:

- Auf dem Handy sitzt die Navigation unten (Übersicht, Lernstoff, Karten, Quiz), damit man sie mit dem Daumen erreicht.
- Karteikarten: antippen zum Umdrehen, dann nach rechts wischen = gewusst, nach links = nochmal.
- Auf der Startseite führt „Weiterlernen“ direkt zum zuletzt geöffneten Lernfeld.
- **Als App speichern:** Auf dem iPhone/iPad in Safari auf *Teilen → Zum Home-Bildschirm*, auf Android im Chrome-Menü *Zum Startbildschirm hinzufügen*. Dann öffnet sich die Seite wie eine App ohne Browserleiste.
- **Offline:** Nach dem ersten Öffnen über GitHub Pages funktioniert die Seite auch ohne Internet, mit dem Stand vom letzten Laden.

## Seite öffnen

- **Lokal:** `index.html` doppelklicken. Es wird nichts installiert und nichts gebaut.
- **Online für die Klasse (GitHub Pages):** Im Repository auf GitHub unter *Settings → Pages* bei *Build and deployment* die Quelle *Deploy from a branch* wählen, den Branch mit der Seite und den Ordner `/ (root)` auswählen und speichern. Nach ein bis zwei Minuten ist die Seite unter `https://<benutzername>.github.io/bs/` erreichbar. Diesen Link kannst du an die Klasse schicken.

## Aufbau

```
index.html          Seite (lädt alles Weitere)
manifest.webmanifest  Angaben für „Zum Home-Bildschirm“
sw.js               Offline-Modus
assets/style.css    Aussehen
assets/app.js       Logik: Startseite, Lernfeld-Seite, Karteikarten, Quiz
assets/icons/       App-Symbole
assets/vendor/      marked (Markdown → HTML), MIT-Lizenz
daten/config.js     Name der Seite, Beruf, Klasse
daten/lf01.js       Inhalt Lernfeld 1
…
daten/lf15.js       Inhalt Lernfeld 15
```

## Inhalt eintragen

Jedes Lernfeld hat eine eigene Datei in `daten/`. Die Titel und Ausbildungsjahre der 15 Lernfelder stehen schon drin (nach dem KMK-Rahmenlehrplan vom 30.04.2004). So sieht ein gefülltes Lernfeld aus (gekürztes Beispiel):

```js
lernfeld(4, {
  titel: "Verkehrsträger vergleichen und Frachtaufträge im Güterkraftverkehr bearbeiten",
  jahr: 1,
  beschreibung: "Frachtvertrag, Frachtbrief und Haftung im Straßengüterverkehr.",

  kapitel: [
    {
      titel: "Haftung des Frachtführers",
      text: `
        Der Frachtführer haftet für **Verlust und Beschädigung** des Gutes von der Übernahme bis zur Ablieferung (§ 425 HGB).

        - national: Handelsgesetzbuch (HGB)
        - grenzüberschreitend: CMR

        > **Merke:** Die Regelhaftung ist auf 8,33 Sonderziehungsrechte (SZR) je kg Rohgewicht begrenzt.

        | Rechtsgrundlage | Haftungshöchstbetrag |
        |---|---|
        | HGB (§ 431) | 8,33 SZR/kg |
        | CMR (Art. 23) | 8,33 SZR/kg |
      `,
    },
  ],

  karteikarten: [
    { vorne: "Wofür gilt die CMR?", hinten: "Für den grenzüberschreitenden Güterkraftverkehr." },
  ],

  quiz: [
    {
      frage: "Bis zu welchem Betrag haftet der Frachtführer nach HGB regulär je kg Rohgewicht?",
      antworten: ["2 SZR", "8,33 SZR", "22 SZR"],
      richtig: 1, // Zählung beginnt bei 0: 0 = erste Antwort
      erklaerung: "§ 431 HGB begrenzt die Haftung auf 8,33 SZR je kg.",
    },
    {
      frage: "Welche davon sind Verkehrsträger?",
      antworten: ["Straße", "Lager", "Schiene", "Luft"],
      richtig: [0, 2, 3], // mehrere richtige Antworten als Liste
    },
  ],
});
```

Hinweise:

- Texte in `text`, `vorne`, `hinten`, `frage` und `erklaerung` sind [Markdown](https://www.markdownguide.org/basic-syntax/): `**fett**`, Listen mit `-`, Tabellen, Zitate mit `>` (werden als Merke-Kasten angezeigt).
- Bilder in einen Ordner wie `bilder/lf03/` legen und im Text mit `![Beschreibung](bilder/lf03/bohrer.png)` einbinden.
- Der Fortschritt hängt am Kapiteltitel bzw. an der Vorderseite einer Karteikarte. Wenn du diese Texte änderst, gilt die Karte oder das Kapitel wieder als neu.
- `jahr` legt fest, unter welchem Ausbildungsjahr das Lernfeld auf der Startseite steht.
- Name, Beruf und Klasse stehen in `daten/config.js`.
