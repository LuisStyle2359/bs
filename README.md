# Lernportal Berufsschule

Eine Lernseite für die Klasse: 15 Lernfelder, jedes einzeln anklickbar. Zu jedem Lernfeld gibt es drei Bereiche:

- **Lernstoff**: Kapitel zum Nachlesen, jedes Kapitel lässt sich als gelesen abhaken
- **Karteikarten**: Frage lesen, Karte umdrehen, dann „Gewusst“ oder „Nochmal“
- **Quiz**: Multiple-Choice-Fragen mit Erklärung und Auswertung am Ende

Der Lernfortschritt wird nur im eigenen Browser gespeichert (localStorage). Es gibt keine Anmeldung und keinen Server.

## Seite öffnen

- **Lokal:** `index.html` doppelklicken. Es wird nichts installiert und nichts gebaut.
- **Online für die Klasse (GitHub Pages):** Im Repository auf GitHub unter *Settings → Pages* bei *Build and deployment* die Quelle *Deploy from a branch* wählen, den Branch mit der Seite und den Ordner `/ (root)` auswählen und speichern. Nach ein bis zwei Minuten ist die Seite unter `https://<benutzername>.github.io/bs/` erreichbar. Diesen Link kannst du an die Klasse schicken.

## Aufbau

```
index.html          Seite (lädt alles Weitere)
assets/style.css    Aussehen
assets/app.js       Logik: Startseite, Lernfeld-Seite, Karteikarten, Quiz
assets/vendor/      marked (Markdown → HTML), MIT-Lizenz
daten/config.js     Name der Seite, Beruf, Klasse
daten/lf01.js       Inhalt Lernfeld 1
…
daten/lf15.js       Inhalt Lernfeld 15
```

## Inhalt eintragen

Jedes Lernfeld hat eine eigene Datei in `daten/`. So sieht ein gefülltes Lernfeld aus:

```js
lernfeld(3, {
  titel: "Werkstücke mit Maschinen fertigen",
  beschreibung: "Bohren, Senken, Reiben und Gewindeschneiden.",

  kapitel: [
    {
      titel: "Bohren",
      text: `
        Beim Bohren entsteht durch eine **drehende Schnittbewegung** ein zylindrisches Loch.

        - Spiralbohrer Typ N: für Stahl
        - Spiralbohrer Typ H: für harte, spröde Werkstoffe

        > **Merke:** Je größer der Durchmesser, desto kleiner die Drehzahl.

        | Werkstoff | Schnittgeschwindigkeit |
        |---|---|
        | Baustahl | 25–35 m/min |
      `,
    },
  ],

  karteikarten: [
    { vorne: "Wofür steht Typ N beim Spiralbohrer?", hinten: "Normal: für Stahl und Stahlguss." },
  ],

  quiz: [
    {
      frage: "Wie verändert sich die Drehzahl, wenn der Bohrerdurchmesser größer wird?",
      antworten: ["Sie steigt", "Sie sinkt", "Sie bleibt gleich"],
      richtig: 1, // Zählung beginnt bei 0: 0 = erste Antwort
      erklaerung: "n = v / (π · d): Ein größeres d ergibt ein kleineres n.",
    },
    {
      frage: "Welche Werkzeuge sind Bohrwerkzeuge?",
      antworten: ["Spiralbohrer", "Feile", "Stufenbohrer"],
      richtig: [0, 2], // mehrere richtige Antworten als Liste
    },
  ],
});
```

Hinweise:

- Texte in `text`, `vorne`, `hinten`, `frage` und `erklaerung` sind [Markdown](https://www.markdownguide.org/basic-syntax/): `**fett**`, Listen mit `-`, Tabellen, Zitate mit `>` (werden als Merke-Kasten angezeigt).
- Bilder in einen Ordner wie `bilder/lf03/` legen und im Text mit `![Beschreibung](bilder/lf03/bohrer.png)` einbinden.
- Der Fortschritt hängt am Kapiteltitel bzw. an der Vorderseite einer Karteikarte. Wenn du diese Texte änderst, gilt die Karte oder das Kapitel wieder als neu.
- Name, Beruf und Klasse stehen in `daten/config.js`.
