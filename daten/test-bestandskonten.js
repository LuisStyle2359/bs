// Test „Buchen auf Bestandskonten“ – Grundlage: Buch Kapitel 5.2–5.3 (Seiten 31–37)
// buchungen: soll / haben sind Listen aus [Konto, Betrag]. Die Konten müssen in "konten" stehen.
test("bestandskonten", {
  titel: "Buchen auf Bestandskonten",
  datum: "2026-10-20",
  beschreibung: "Aktiv- und Passivkonten, T-Konten, einfacher und zusammengesetzter Buchungssatz (Soll an Haben).",

  konten: {
    aktiv: ["Grundstücke", "Gebäude", "Fuhrpark", "BGA", "Reifenvorrat", "Treibstoffvorrat", "Forderungen a. LL.", "Kasse", "Bank"],
    passiv: ["Eigenkapital", "Hypotheken", "Darlehen", "Verbindlichkeiten a. LL.", "Bankschulden"],
  },

  kapitel: [
    {
      titel: "Das kommt im Test dran",
      text: `
        Nach den Buchseiten 31–37 solltest du das können:

        - Aktiv- und Passivkonten unterscheiden
        - Wissen, auf welcher Seite Anfangsbestand, Zugänge, Abgänge und Schlussbestand stehen
        - Bestandskonten eröffnen, Geschäftsfälle buchen, Konten abschließen
        - Den **einfachen Buchungssatz** bilden: Soll **an** Haben
        - Den **zusammengesetzten Buchungssatz** bilden
        - Rückwärts: zu einem Buchungssatz den **Geschäftsfall** nennen

        > **Tipp:** Erst die Kapitel lesen, dann im Bereich **Buchen** üben, bis du die Buchungssätze sicher kannst. Die Blitzrunde fragt auch Buchungssätze ab.
      `,
    },
    {
      titel: "Bilanz und Bestandskonten",
      text: `
        Die **Bilanz** zeigt auf der linken Seite das Vermögen (**Aktiva**) und auf der rechten Seite, woher das Geld kommt (**Passiva**).

        | Aktiva | Passiva |
        |---|---|
        | **Anlagevermögen:** Grundstücke, Gebäude, Fuhrpark, BGA | **Eigenkapital** |
        | **Umlaufvermögen:** Reifen- und Treibstoffvorrat, Forderungen a. LL., Kasse, Bank | **Fremdkapital:** Hypotheken, Darlehen, Verbindlichkeiten a. LL., Bankschulden |

        In der Bilanz kann man nicht jeden einzelnen Geschäftsfall buchen. Deshalb bekommt jeder Bilanzposten ein eigenes Konto, ein **Bestandskonto**.

        - Aus der Aktivseite werden **Aktivkonten** (Vermögenskonten).
        - Aus der Passivseite werden **Passivkonten** (Kapitalkonten).

        ### Das T-Konto

        Jedes Konto hat zwei Seiten: links **Soll**, rechts **Haben**.

        | Soll | Haben |
        |---|---|
        | linke Seite | rechte Seite |

        ### Abkürzungen

        - **AB** = Anfangsbestand, **SB** = Schlussbestand
        - **BGA** = Betriebs- und Geschäftsausstattung (Büromöbel, Computer, Regale …)
        - **Forderungen a. LL.** = Forderungen aus Lieferungen und Leistungen: Kunden schulden **uns** Geld
        - **Verbindlichkeiten a. LL.** = Verbindlichkeiten aus Lieferungen und Leistungen: **wir** schulden Lieferanten Geld
      `,
    },
    {
      titel: "Buchungsregeln für Aktiv- und Passivkonten",
      text: `
        | | Aktivkonto | Passivkonto |
        |---|---|---|
        | Anfangsbestand (AB) | Soll | Haben |
        | Zugänge (+) | Soll | Haben |
        | Abgänge (−) | Haben | Soll |
        | Schlussbestand (SB) | Haben | Soll |

        > **Merke:** Aktivkonten stehen in der Bilanz **links**, deshalb stehen AB und Zugänge links im **Soll**. Passivkonten stehen **rechts**, deshalb stehen AB und Zugänge rechts im **Haben**.

        ### Den Schlussbestand berechnen

        Der Schlussbestand ist der Saldo, also der Ausgleich zwischen beiden Seiten. Er steht auf der **kleineren** Seite, damit beide Seiten am Ende gleich groß sind.

        - Aktivkonto: **SB = AB + Zugänge − Abgänge**
        - Passivkonto: **SB = AB + Zugänge − Abgänge** (nur stehen die Seiten andersherum)

        *Beispiel Kasse:* AB 10.000,00 € + 14.000,00 € − 5.000,00 € = **SB 19.000,00 €**
      `,
    },
    {
      titel: "Von der Eröffnungsbilanz zur Schlussbilanz",
      text: `
        1. Eröffnungsbilanz aufstellen
        2. Aktiv- und Passivkonten eröffnen
        3. Anfangsbestände übertragen
        4. Geschäftsfälle buchen
        5. Aktiv- und Passivkonten abschließen
        6. Salden (Schlussbestände) auf die Schlussbilanz übertragen

        ### Beispiel aus dem Buch (Seite 31)

        Vier Geschäftsfälle:

        1. Kauf eines Lkw auf Ziel: 40.000,00 € → Fuhrpark an Verbindlichkeiten a. LL.
        2. Barzahlung einer Verbindlichkeit: 5.000,00 € → Verbindlichkeiten a. LL. an Kasse
        3. Kunde zahlt eine offene Rechnung bar: 14.000,00 € → Kasse an Forderungen a. LL.
        4. Verkauf von Büromöbeln auf Ziel: 2.000,00 € → Forderungen a. LL. an BGA

        **Konto Kasse (Aktivkonto)**

        | Soll | € | Haben | € |
        |---|---|---|---|
        | AB | 10.000,00 | (2) Verbindlichkeiten | 5.000,00 |
        | (3) Forderungen | 14.000,00 | SB | 19.000,00 |
        | | **24.000,00** | | **24.000,00** |

        **Konto Verbindlichkeiten a. LL. (Passivkonto)**

        | Soll | € | Haben | € |
        |---|---|---|---|
        | (2) Kasse | 5.000,00 | AB | 120.000,00 |
        | SB | 155.000,00 | (1) Fuhrpark | 40.000,00 |
        | | **160.000,00** | | **160.000,00** |

        In der Spalte neben dem Betrag steht immer das **Gegenkonto**, also das andere Konto aus dem Buchungssatz.

        ### Schlussbilanz

        | Aktiva | € | Passiva | € |
        |---|---|---|---|
        | Fuhrpark | 440.000,00 | Eigenkapital | 410.000,00 |
        | BGA | 108.000,00 | Hypotheken | 80.000,00 |
        | Forderungen a. LL. | 98.000,00 | Verbindlichkeiten a. LL. | 155.000,00 |
        | Kasse | 19.000,00 | Bankschulden | 20.000,00 |
        | **Summe** | **665.000,00** | **Summe** | **665.000,00** |

        > **Merke:**
        > - Jeder Geschäftsfall wird auf **zwei verschiedenen Konten** gebucht, zuerst im Soll, danach im Haben.
        > - Die Buchungen im Soll müssen wertmäßig den Buchungen im Haben entsprechen.
        > - Bei der Buchung wird jeweils das **Gegenkonto** eingetragen.
        > - Die **Schlussbilanz** eines Geschäftsjahres ist gleichzeitig die **Eröffnungsbilanz** für das neue Jahr.
      `,
    },
    {
      titel: "Der einfache Buchungssatz: Soll an Haben",
      text: `
        Der **Buchungssatz** nennt kurz und eindeutig die Konten, auf denen ein Geschäftsfall gebucht wird.

        > **Soll-Konto** Betrag **an** **Haben-Konto** Betrag

        ### Die 5 Schritte

        1. Welche Konten werden berührt?
        2. Aktiv- oder Passivkonto?
        3. Zugang oder Abgang?
        4. Soll- oder Haben-Buchung?
        5. Buchungssatz: **zuerst** das Konto im Soll, **danach** das Konto im Haben, dazwischen steht **„an“**

        ### Musteraufgabe 1: Spedition Baumann kauft Reifen auf Ziel für 4.390,00 €

        | | Konto 1 | Konto 2 |
        |---|---|---|
        | 1. Konten | Reifenvorrat | Verbindlichkeiten a. LL. |
        | 2. Art | Aktivkonto | Passivkonto |
        | 3. | Zugang | Zugang |
        | 4. | Soll | Haben |

        > **Reifenvorrat 4.390,00 € an Verbindlichkeiten a. LL. 4.390,00 €**

        ### Musteraufgabe 2: Kunde überweist auf unser Bankkonto 1.460,00 €

        | | Konto 1 | Konto 2 |
        |---|---|---|
        | 1. Konten | Bank | Forderungen a. LL. |
        | 2. Art | Aktivkonto | Aktivkonto |
        | 3. | Zugang | Abgang |
        | 4. | Soll | Haben |

        > **Bank 1.460,00 € an Forderungen a. LL. 1.460,00 €**

        > **Merke:** Der einfache Buchungssatz besteht aus zwei Buchungen: eine im Soll, eine im Haben. Die erste Buchung ist immer im Soll, die zweite immer im Haben. Verbunden werden sie durch „an“.
      `,
    },
    {
      titel: "Der zusammengesetzte Buchungssatz",
      text: `
        Werden durch einen Geschäftsfall **mehr als zwei Konten** berührt, ist es ein **zusammengesetzter Buchungssatz**.

        > **Summe der Soll-Buchungen = Summe der Haben-Buchungen**

        ### Musteraufgabe 1: Kauf eines neuen Lkw gegen 10.000,00 € bar und 100.000,00 € Banküberweisung

        | Soll | € | | Haben | € |
        |---|---|---|---|---|
        | Fuhrpark | 110.000,00 | an | Kasse | 10.000,00 |
        | | | | Bank | 100.000,00 |

        ### Musteraufgabe 2: Verkauf eines Grundstücks für 300.000,00 €

        Der Käufer zahlt 5.000,00 € bar, überweist 20.000,00 € und zahlt den Rest in zwei Monaten.

        | Soll | € | | Haben | € |
        |---|---|---|---|---|
        | Kasse | 5.000,00 | an | Grundstücke | 300.000,00 |
        | Bank | 20.000,00 | | | |
        | Forderungen a. LL. | 275.000,00 | | | |

        Den Rest musst du selbst ausrechnen: 300.000 − 5.000 − 20.000 = **275.000 €**. „In zwei Monaten zahlen“ heißt: Der Käufer schuldet uns das Geld, also **Forderungen**.

        ### Musteraufgabe 3: Wir begleichen 18.000,00 € Schulden bei unserem Partnerspediteur

        800,00 € zahlen wir bar, 2.200,00 € per Banküberweisung, der Rest wird in ein Darlehen umgewandelt.

        | Soll | € | | Haben | € |
        |---|---|---|---|---|
        | Verbindlichkeiten a. LL. | 18.000,00 | an | Kasse | 800,00 |
        | | | | Bank | 2.200,00 |
        | | | | Darlehen | 15.000,00 |

        > **Merke:**
        > - Einfacher Buchungssatz → **zwei** Konten werden berührt
        > - Zusammengesetzter Buchungssatz → **mehr als zwei** Konten werden berührt
      `,
    },
    {
      titel: "Signalwörter: Welches Konto ist gemeint?",
      text: `
        | Im Geschäftsfall steht … | Konto |
        |---|---|
        | bar, Barzahlung, Barverkauf | **Kasse** |
        | Überweisung, Bankscheck, Gutschrift, Lastschrift | **Bank** |
        | **wir** kaufen auf Ziel / Eingangsrechnung | **Verbindlichkeiten a. LL.** (Haben) |
        | **wir** verkaufen auf Ziel / Rest zahlt der Käufer später | **Forderungen a. LL.** (Soll) |
        | Kunde / Auftraggeber zahlt eine offene Rechnung | **Forderungen a. LL.** (Haben) |
        | **wir** begleichen eine Rechnung | **Verbindlichkeiten a. LL.** (Soll) |
        | Darlehen aufnehmen | **Darlehen** (Haben) |
        | Darlehen / Hypothek tilgen | **Darlehen** / **Hypotheken** (Soll) |
        | Lkw, Pkw, Anhänger, Wechselbrücke | **Fuhrpark** |
        | Schreibtisch, Computer, EDV-Anlage, Faxgerät, Regal | **BGA** |
        | Reifen | **Reifenvorrat** |
        | Treibstoff, Diesel | **Treibstoffvorrat** |

        ### Typische Fehler

        - **Soll und Haben vertauscht:** Frag dich immer: Nimmt das Konto zu oder ab, und ist es ein Aktiv- oder Passivkonto?
        - **„Umwandlung“** einer Schuld in eine andere (z. B. Verbindlichkeit in ein Darlehen): Beide Konten sind Passivkonten. Die alte Schuld nimmt ab (Soll), die neue nimmt zu (Haben).
        - **Rest vergessen:** Beim zusammengesetzten Buchungssatz muss die Soll-Summe genau der Haben-Summe entsprechen.
      `,
    },
    {
      titel: "Rückwärts: Geschäftsfall zum Buchungssatz",
      text: `
        Manchmal ist der Buchungssatz gegeben, und du sollst sagen, was passiert ist. Geh die Konten einzeln durch:

        > **Bank an Kasse**
        > Bank (Aktivkonto) im Soll → nimmt **zu**. Kasse (Aktivkonto) im Haben → nimmt **ab**.
        > → Wir zahlen **Bargeld auf unser Bankkonto ein**.

        | Buchungssatz | Geschäftsfall |
        |---|---|
        | Bank an Kasse | Bareinzahlung auf das Bankkonto |
        | Kasse an Bank | Barabhebung vom Bankkonto |
        | Verbindlichkeiten a. LL. an Bank | Wir begleichen eine Rechnung per Überweisung |
        | Fuhrpark an Verbindlichkeiten a. LL. | Kauf eines Fahrzeugs auf Ziel |
        | Kasse an BGA | Barverkauf von Büroausstattung |
        | Bank an Forderungen a. LL. | Kunde überweist eine offene Rechnung |
        | Forderungen a. LL. an Fuhrpark | Verkauf eines Fahrzeugs auf Ziel |
        | Bank an Darlehen | Aufnahme eines Darlehens, Gutschrift auf dem Bankkonto |
        | Hypotheken an Bank | Tilgung einer Hypothek per Überweisung |
        | Verbindlichkeiten a. LL. an Darlehen | Umwandlung einer Verbindlichkeit in ein Darlehen |

        ### Zusammengesetzt rückwärts

        > **Verbindlichkeiten a. LL. 12.000 € an Bank 8.000 €, Kasse 4.000 €**
        > → Wir begleichen eine Verbindlichkeit über 12.000 €: 8.000 € per Überweisung und 4.000 € bar.
      `,
    },
    {
      titel: "Extra: Die vier Arten der Bilanzveränderung",
      text: `
        > Falls ihr das schon hattet: Jeder Buchungssatz verändert die Bilanz auf eine von vier Arten.

        | Art | Was passiert? | Bilanzsumme | Beispiel |
        |---|---|---|---|
        | **Aktivtausch** | ein Aktivkonto +, ein Aktivkonto − | bleibt gleich | Kasse an Bank (Barabhebung) |
        | **Passivtausch** | ein Passivkonto +, ein Passivkonto − | bleibt gleich | Verbindlichkeiten a. LL. an Darlehen |
        | **Aktiv-Passiv-Mehrung** | Aktivkonto + und Passivkonto + | steigt | Fuhrpark an Verbindlichkeiten a. LL. |
        | **Aktiv-Passiv-Minderung** | Aktivkonto − und Passivkonto − | sinkt | Verbindlichkeiten a. LL. an Bank |
      `,
    },
  ],

  buchungen: [
    // Einfache Buchungssätze
    { fall: "Kauf von Treibstoff auf Ziel: 8.750,00 €", soll: [["Treibstoffvorrat", 8750]], haben: [["Verbindlichkeiten a. LL.", 8750]] },
    { fall: "Barverkauf eines gebrauchten Schreibtisches: 500,00 €", soll: [["Kasse", 500]], haben: [["BGA", 500]] },
    { fall: "Eine Verbindlichkeit über 12.350,00 € wird in ein Darlehen umgewandelt.", soll: [["Verbindlichkeiten a. LL.", 12350]], haben: [["Darlehen", 12350]] },
    { fall: "Unser Auftraggeber Hock überweist eine offene Rechnung: 2.390,00 €", soll: [["Bank", 2390]], haben: [["Forderungen a. LL.", 2390]] },
    { fall: "Ein kurzfristiges Darlehen über 32.000,00 € wird in eine Hypothek umgewandelt.", soll: [["Darlehen", 32000]], haben: [["Hypotheken", 32000]] },
    { fall: "Verkauf von zwei Reifen auf Ziel: 220,00 €", soll: [["Forderungen a. LL.", 220]], haben: [["Reifenvorrat", 220]] },
    { fall: "Verkauf eines Grundstücks auf Ziel: 240.800,00 €", soll: [["Forderungen a. LL.", 240800]], haben: [["Grundstücke", 240800]] },
    { fall: "Kauf einer Wechselbrücke auf Ziel: 24.000,00 €", soll: [["Fuhrpark", 24000]], haben: [["Verbindlichkeiten a. LL.", 24000]] },
    { fall: "Wir begleichen die offene Rechnung eines Frachtführers per Banküberweisung: 1.650,00 €", soll: [["Verbindlichkeiten a. LL.", 1650]], haben: [["Bank", 1650]] },
    { fall: "Barabhebung vom Bankkonto: 600,00 €", soll: [["Kasse", 600]], haben: [["Bank", 600]] },
    { fall: "Barverkauf eines gebrauchten Faxgeräts: 120,00 €", soll: [["Kasse", 120]], haben: [["BGA", 120]] },
    { fall: "Kunde überweist eine offene Rechnung auf unser Bankkonto: 890,00 €", soll: [["Bank", 890]], haben: [["Forderungen a. LL.", 890]] },
    { fall: "Eingangsrechnung für Reifen: 1.240,00 €", soll: [["Reifenvorrat", 1240]], haben: [["Verbindlichkeiten a. LL.", 1240]] },
    { fall: "Kauf einer EDV-Anlage gegen Bankscheck: 6.000,00 €", soll: [["BGA", 6000]], haben: [["Bank", 6000]] },
    { fall: "Aufnahme eines Darlehens bei der Bank, Bankgutschrift: 40.000,00 €", soll: [["Bank", 40000]], haben: [["Darlehen", 40000]] },
    { fall: "Barverkauf eines gebrauchten Pkw: 2.800,00 €", soll: [["Kasse", 2800]], haben: [["Fuhrpark", 2800]] },
    { fall: "Tilgung eines Darlehens durch Banküberweisung: 8.000,00 €", soll: [["Darlehen", 8000]], haben: [["Bank", 8000]] },
    { fall: "Wir zahlen Bargeld auf unser Bankkonto ein: 3.000,00 €", soll: [["Bank", 3000]], haben: [["Kasse", 3000]] },
    { fall: "Barzahlung einer Verbindlichkeit: 5.000,00 €", soll: [["Verbindlichkeiten a. LL.", 5000]], haben: [["Kasse", 5000]] },
    { fall: "Ein Kunde zahlt eine offene Rechnung bar: 14.000,00 €", soll: [["Kasse", 14000]], haben: [["Forderungen a. LL.", 14000]] },
    { fall: "Tilgung einer Hypothek per Banküberweisung: 10.000,00 €", soll: [["Hypotheken", 10000]], haben: [["Bank", 10000]] },
    { fall: "Kauf eines Lkw auf Ziel: 40.000,00 €", soll: [["Fuhrpark", 40000]], haben: [["Verbindlichkeiten a. LL.", 40000]] },
    { fall: "Verkauf von Büromöbeln auf Ziel: 2.000,00 €", soll: [["Forderungen a. LL.", 2000]], haben: [["BGA", 2000]] },
    { fall: "Kauf eines Lagergebäudes auf Ziel: 250.000,00 €", soll: [["Gebäude", 250000]], haben: [["Verbindlichkeiten a. LL.", 250000]] },

    // Zusammengesetzte Buchungssätze
    {
      fall: "Kauf eines neuen Lkw gegen 10.000,00 € Barzahlung und 100.000,00 € Banküberweisung.",
      soll: [["Fuhrpark", 110000]],
      haben: [["Kasse", 10000], ["Bank", 100000]],
    },
    {
      fall: "Verkauf eines Grundstücks für 300.000,00 €. Der Käufer zahlt 5.000,00 € bar, überweist 20.000,00 € auf unser Bankkonto und zahlt den Rest in zwei Monaten.",
      soll: [["Kasse", 5000], ["Bank", 20000], ["Forderungen a. LL.", 275000]],
      haben: [["Grundstücke", 300000]],
      hinweis: "Rest: 300.000 − 5.000 − 20.000 = 275.000 €",
    },
    {
      fall: "Wir begleichen 18.000,00 € Schulden bei unserem Partnerspediteur: 800,00 € bar und 2.200,00 € per Banküberweisung. Der Rest wird in ein Darlehen umgewandelt.",
      soll: [["Verbindlichkeiten a. LL.", 18000]],
      haben: [["Kasse", 800], ["Bank", 2200], ["Darlehen", 15000]],
      hinweis: "Rest: 18.000 − 800 − 2.200 = 15.000 €",
    },
    {
      fall: "Wir begleichen eine Verbindlichkeit über 12.000,00 €: 8.000,00 € per Banküberweisung und 4.000,00 € bar.",
      soll: [["Verbindlichkeiten a. LL.", 12000]],
      haben: [["Bank", 8000], ["Kasse", 4000]],
    },
    {
      fall: "Kauf eines Lkw für 180.000,00 €: 140.000,00 € auf Ziel, 35.000,00 € per Banküberweisung, den Rest bar.",
      soll: [["Fuhrpark", 180000]],
      haben: [["Verbindlichkeiten a. LL.", 140000], ["Bank", 35000], ["Kasse", 5000]],
      hinweis: "Rest: 180.000 − 140.000 − 35.000 = 5.000 €",
    },
    {
      fall: "Barverkauf von Büroausstattung für 1.800,00 €, Reifen für 1.250,00 € und Treibstoff für 150,00 €.",
      soll: [["Kasse", 3200]],
      haben: [["BGA", 1800], ["Reifenvorrat", 1250], ["Treibstoffvorrat", 150]],
    },
    {
      fall: "Kauf von Treibstoff für 15.870,00 €: 370,00 € bar, 12.000,00 € per Banküberweisung, den Rest auf Ziel.",
      soll: [["Treibstoffvorrat", 15870]],
      haben: [["Kasse", 370], ["Bank", 12000], ["Verbindlichkeiten a. LL.", 3500]],
      hinweis: "Rest: 15.870 − 370 − 12.000 = 3.500 €",
    },
    {
      fall: "Ein Kunde begleicht eine Rechnung über 2.020,00 €: 1.300,00 € per Banküberweisung, 720,00 € bar.",
      soll: [["Bank", 1300], ["Kasse", 720]],
      haben: [["Forderungen a. LL.", 2020]],
    },
    {
      fall: "Verkauf eines gebrauchten Lkw für 23.800,00 €: 300,00 € bar, 5.000,00 € per Banküberweisung, den Rest auf Ziel.",
      soll: [["Forderungen a. LL.", 18500], ["Bank", 5000], ["Kasse", 300]],
      haben: [["Fuhrpark", 23800]],
      hinweis: "Rest: 23.800 − 300 − 5.000 = 18.500 €",
    },
    {
      fall: "Wir nehmen ein Darlehen über 30.000,00 € auf. 18.000,00 € werden unserem Bankkonto gutgeschrieben, mit 12.000,00 € wird direkt eine Verbindlichkeit beglichen.",
      soll: [["Bank", 18000], ["Verbindlichkeiten a. LL.", 12000]],
      haben: [["Darlehen", 30000]],
    },
    {
      fall: "Tilgung einer Hypothek über 60.000,00 €: 57.800,00 € per Banküberweisung, 2.200,00 € bar.",
      soll: [["Hypotheken", 60000]],
      haben: [["Bank", 57800], ["Kasse", 2200]],
    },
    {
      fall: "Verkauf von Reifen für 1.500,00 €, eines Fahrzeugs für 15.800,00 € und Treibstoff für 200,00 €, alles auf Ziel.",
      soll: [["Forderungen a. LL.", 17500]],
      haben: [["Reifenvorrat", 1500], ["Fuhrpark", 15800], ["Treibstoffvorrat", 200]],
    },
    {
      fall: "Kauf eines Gebäudes für 360.000,00 €: 8.000,00 € bar, 19.000,00 € per Banküberweisung, 250.000,00 € über ein neues Darlehen, den Rest auf Ziel.",
      soll: [["Gebäude", 360000]],
      haben: [["Kasse", 8000], ["Bank", 19000], ["Darlehen", 250000], ["Verbindlichkeiten a. LL.", 83000]],
      hinweis: "Rest: 360.000 − 8.000 − 19.000 − 250.000 = 83.000 €",
    },
  ],

  karteikarten: [
    { vorne: "Was ist ein **Bestandskonto**?", hinten: "Ein Konto für einen Bilanzposten. Aus der Aktivseite werden Aktivkonten, aus der Passivseite Passivkonten." },
    { vorne: "Welche Seite des T-Kontos ist **Soll**, welche **Haben**?", hinten: "Soll = links, Haben = rechts." },
    { vorne: "**Aktivkonto**: Wo stehen AB und Zugänge?", hinten: "Im **Soll** (links)." },
    { vorne: "**Aktivkonto**: Wo stehen Abgänge und SB?", hinten: "Im **Haben** (rechts)." },
    { vorne: "**Passivkonto**: Wo stehen AB und Zugänge?", hinten: "Im **Haben** (rechts)." },
    { vorne: "**Passivkonto**: Wo stehen Abgänge und SB?", hinten: "Im **Soll** (links)." },
    { vorne: "Wie berechnet man den **Schlussbestand**?", hinten: "SB = AB + Zugänge − Abgänge. Er steht auf der kleineren Seite, damit beide Seiten gleich groß sind." },
    { vorne: "Was trägt man im T-Konto neben dem Betrag ein?", hinten: "Das **Gegenkonto**, also das andere Konto aus dem Buchungssatz." },
    { vorne: "Was gilt für die **Schlussbilanz**?", hinten: "Sie ist gleichzeitig die **Eröffnungsbilanz** des neuen Geschäftsjahres." },
    {
      vorne: "Die 6 Schritte **von der Eröffnungsbilanz zur Schlussbilanz**?",
      hinten: "1. Eröffnungsbilanz aufstellen\n2. Konten eröffnen\n3. Anfangsbestände übertragen\n4. Geschäftsfälle buchen\n5. Konten abschließen\n6. Salden auf die Schlussbilanz übertragen",
    },
    { vorne: "Was ist ein **Buchungssatz**?", hinten: "Er nennt kurz und eindeutig die Konten, auf denen ein Geschäftsfall gebucht wird: **Soll an Haben**." },
    {
      vorne: "Die **5 Schritte** zum Buchungssatz?",
      hinten: "1. Welche Konten?\n2. Aktiv oder Passiv?\n3. Zugang oder Abgang?\n4. Soll oder Haben?\n5. Buchungssatz: zuerst Soll, dann „an“, dann Haben",
    },
    { vorne: "Was steht im Buchungssatz zwischen Soll und Haben?", hinten: "Das Wort **„an“**." },
    { vorne: "**Einfacher** Buchungssatz?", hinten: "Es werden genau **zwei** Konten berührt: eins im Soll, eins im Haben." },
    { vorne: "**Zusammengesetzter** Buchungssatz?", hinten: "Es werden **mehr als zwei** Konten berührt." },
    { vorne: "Was gilt beim zusammengesetzten Buchungssatz immer?", hinten: "Summe der Soll-Buchungen = Summe der Haben-Buchungen." },
    { vorne: "Was heißt **BGA**?", hinten: "Betriebs- und Geschäftsausstattung (Büromöbel, Computer, Regale …). Aktivkonto." },
    { vorne: "**Forderungen a. LL.**", hinten: "Forderungen aus Lieferungen und Leistungen: Kunden schulden **uns** Geld. Aktivkonto." },
    { vorne: "**Verbindlichkeiten a. LL.**", hinten: "Verbindlichkeiten aus Lieferungen und Leistungen: **wir** schulden Lieferanten Geld. Passivkonto." },
    { vorne: "Aktiv oder Passiv: **Darlehen**?", hinten: "Passivkonto (Fremdkapital)." },
    { vorne: "Aktiv oder Passiv: **Hypotheken**?", hinten: "Passivkonto (Fremdkapital)." },
    { vorne: "Aktiv oder Passiv: **Bank** (Guthaben)?", hinten: "Aktivkonto. Schulden bei der Bank stehen als **Bankschulden** auf der Passivseite." },
    { vorne: "Aktiv oder Passiv: **Eigenkapital**?", hinten: "Passivkonto." },
    { vorne: "Aktiv oder Passiv: **Fuhrpark**?", hinten: "Aktivkonto (Anlagevermögen)." },
    { vorne: "Aktiv oder Passiv: **Treibstoffvorrat**?", hinten: "Aktivkonto (Umlaufvermögen)." },
    { vorne: "„bar“ – welches Konto?", hinten: "**Kasse**" },
    { vorne: "„Überweisung“, „Bankscheck“, „Gutschrift“ – welches Konto?", hinten: "**Bank**" },
    { vorne: "„Wir kaufen auf Ziel“ – welches Konto im Haben?", hinten: "**Verbindlichkeiten a. LL.**" },
    { vorne: "„Wir verkaufen auf Ziel“ – welches Konto im Soll?", hinten: "**Forderungen a. LL.**" },
    { vorne: "Buchungssatz: **Kauf von Treibstoff auf Ziel**?", hinten: "Treibstoffvorrat **an** Verbindlichkeiten a. LL." },
    { vorne: "Buchungssatz: **Kunde überweist offene Rechnung**?", hinten: "Bank **an** Forderungen a. LL." },
    { vorne: "Buchungssatz: **Barabhebung vom Bankkonto**?", hinten: "Kasse **an** Bank" },
    { vorne: "Buchungssatz: **Tilgung eines Darlehens per Überweisung**?", hinten: "Darlehen **an** Bank" },
    { vorne: "Buchungssatz: **Umwandlung einer Verbindlichkeit in ein Darlehen**?", hinten: "Verbindlichkeiten a. LL. **an** Darlehen" },
    { vorne: "Geschäftsfall zu: **Bank an Kasse**?", hinten: "Wir zahlen Bargeld auf unser Bankkonto ein." },
    { vorne: "Geschäftsfall zu: **Forderungen a. LL. an Fuhrpark**?", hinten: "Wir verkaufen ein Fahrzeug auf Ziel." },
  ],

  quiz: [
    {
      frage: "Auf welcher Seite steht der **Anfangsbestand** eines **Aktivkontos**?",
      antworten: ["Soll", "Haben"],
      richtig: 0,
      erklaerung: "Aktivkonten stehen in der Bilanz links, deshalb steht der AB im Soll.",
    },
    {
      frage: "Auf welcher Seite werden **Zugänge** auf einem **Passivkonto** gebucht?",
      antworten: ["Soll", "Haben"],
      richtig: 1,
      erklaerung: "Passivkonto: AB und Zugänge im Haben, Abgänge und SB im Soll.",
    },
    {
      frage: "Wo steht der **Schlussbestand** eines **Passivkontos**?",
      antworten: ["Soll", "Haben"],
      richtig: 0,
      erklaerung: "Der SB steht auf der kleineren Seite. Beim Passivkonto ist das das Soll.",
    },
    {
      frage: "Welche Konten sind **Passivkonten**?",
      antworten: ["Darlehen", "Forderungen a. LL.", "Verbindlichkeiten a. LL.", "BGA", "Hypotheken"],
      richtig: [0, 2, 4],
      erklaerung: "Forderungen und BGA gehören zum Vermögen (Aktiva).",
    },
    {
      frage: "Kasse: AB 10.000 €, Zugänge 14.000 €, Abgänge 5.000 €. Wie hoch ist der **Schlussbestand**?",
      antworten: ["29.000 €", "19.000 €", "1.000 €", "24.000 €"],
      richtig: 1,
      erklaerung: "10.000 + 14.000 − 5.000 = 19.000 €. 24.000 € ist die Summe beider Seiten.",
    },
    {
      frage: "Spedition Baumann kauft **Reifen auf Ziel**. Wie lautet der Buchungssatz?",
      antworten: [
        "Reifenvorrat an Verbindlichkeiten a. LL.",
        "Verbindlichkeiten a. LL. an Reifenvorrat",
        "Reifenvorrat an Forderungen a. LL.",
        "Forderungen a. LL. an Reifenvorrat",
      ],
      richtig: 0,
      erklaerung: "Reifenvorrat (Aktiv) nimmt zu → Soll. Verbindlichkeiten (Passiv) nehmen zu → Haben.",
    },
    {
      frage: "Ein **Kunde überweist** eine offene Rechnung. Wie lautet der Buchungssatz?",
      antworten: ["Forderungen a. LL. an Bank", "Bank an Forderungen a. LL.", "Bank an Verbindlichkeiten a. LL.", "Kasse an Forderungen a. LL."],
      richtig: 1,
      erklaerung: "Bank nimmt zu (Soll), Forderungen nehmen ab (Haben).",
    },
    {
      frage: "Wir **tilgen ein Darlehen** per Banküberweisung. Wie lautet der Buchungssatz?",
      antworten: ["Bank an Darlehen", "Darlehen an Bank", "Darlehen an Kasse", "Verbindlichkeiten a. LL. an Darlehen"],
      richtig: 1,
      erklaerung: "Darlehen (Passiv) nimmt ab → Soll. Bank (Aktiv) nimmt ab → Haben. „Bank an Darlehen“ wäre eine Darlehensaufnahme.",
    },
    {
      frage: "Eine **Verbindlichkeit wird in ein Darlehen umgewandelt**. Wie lautet der Buchungssatz?",
      antworten: ["Darlehen an Verbindlichkeiten a. LL.", "Verbindlichkeiten a. LL. an Darlehen", "Verbindlichkeiten a. LL. an Bank", "Bank an Darlehen"],
      richtig: 1,
      erklaerung: "Die alte Schuld (Verbindlichkeiten) nimmt ab → Soll. Die neue Schuld (Darlehen) nimmt zu → Haben.",
    },
    {
      frage: "Welcher Geschäftsfall gehört zu **Kasse an Bank**?",
      antworten: ["Bareinzahlung auf das Bankkonto", "Barabhebung vom Bankkonto", "Kunde zahlt bar", "Wir zahlen eine Rechnung bar"],
      richtig: 1,
      erklaerung: "Kasse nimmt zu (Soll), Bank nimmt ab (Haben): Wir holen Bargeld von der Bank.",
    },
    {
      frage: "Welcher Geschäftsfall gehört zu **Forderungen a. LL. an Fuhrpark**?",
      antworten: ["Kauf eines Lkw auf Ziel", "Verkauf eines Lkw auf Ziel", "Kunde zahlt eine Rechnung", "Barverkauf eines Lkw"],
      richtig: 1,
      erklaerung: "Fuhrpark nimmt ab (Haben), wir bekommen das Geld später (Forderungen im Soll).",
    },
    {
      frage: "Welcher Geschäftsfall gehört zu **Hypotheken an Bank**?",
      antworten: ["Aufnahme einer Hypothek", "Tilgung einer Hypothek per Banküberweisung", "Umwandlung eines Darlehens in eine Hypothek", "Kunde überweist Geld"],
      richtig: 1,
      erklaerung: "Hypothek (Passiv) nimmt ab → Soll. Bank nimmt ab → Haben.",
    },
    {
      frage: "Wann spricht man von einem **zusammengesetzten** Buchungssatz?",
      antworten: ["Wenn der Betrag über 10.000 € liegt", "Wenn mehr als zwei Konten berührt werden", "Wenn ein Passivkonto dabei ist", "Wenn bar gezahlt wird"],
      richtig: 1,
      erklaerung: "Einfach = zwei Konten, zusammengesetzt = mehr als zwei Konten.",
    },
    {
      frage: "Kauf eines Lkw: 10.000 € bar und 100.000 € per Überweisung. Was steht im **Soll**?",
      antworten: ["Kasse 10.000 € und Bank 100.000 €", "Fuhrpark 110.000 €", "Fuhrpark 100.000 €", "Verbindlichkeiten a. LL. 110.000 €"],
      richtig: 1,
      erklaerung: "Fuhrpark 110.000 € an Kasse 10.000 € und Bank 100.000 €.",
    },
    {
      frage: "Grundstück für 300.000 € verkauft: 5.000 € bar, 20.000 € Überweisung, Rest in zwei Monaten. Wie hoch sind die **Forderungen**?",
      antworten: ["300.000 €", "25.000 €", "275.000 €", "295.000 €"],
      richtig: 2,
      erklaerung: "300.000 − 5.000 − 20.000 = 275.000 €",
    },
    {
      frage: "Was gilt beim zusammengesetzten Buchungssatz **immer**?",
      antworten: [
        "Im Soll steht genau ein Konto.",
        "Summe der Soll-Buchungen = Summe der Haben-Buchungen",
        "Es muss immer die Kasse dabei sein.",
        "Im Haben stehen nur Passivkonten.",
      ],
      richtig: 1,
      erklaerung: "Soll und Haben müssen wertmäßig übereinstimmen. Es können auf beiden Seiten mehrere Konten stehen.",
    },
    {
      frage: "Was ist die **Schlussbilanz** eines Jahres gleichzeitig?",
      antworten: ["Die Gewinn- und Verlustrechnung", "Die Eröffnungsbilanz des neuen Jahres", "Das Inventar", "Das Eigenkapitalkonto"],
      richtig: 1,
      erklaerung: "Die Schlussbestände sind die Anfangsbestände des nächsten Jahres.",
    },
    {
      frage: "Was trägt man im T-Konto **neben dem Betrag** ein?",
      antworten: ["Das Datum", "Das Gegenkonto", "Den Kunden", "Die Rechnungsnummer"],
      richtig: 1,
      erklaerung: "Bei jeder Buchung wird das Gegenkonto eingetragen, z. B. „Kasse“ im Konto Verbindlichkeiten.",
    },
    {
      frage: "Welche Art der Bilanzveränderung ist **Kasse an Bank**?",
      antworten: ["Aktivtausch", "Passivtausch", "Aktiv-Passiv-Mehrung", "Aktiv-Passiv-Minderung"],
      richtig: 0,
      erklaerung: "Zwei Aktivkonten: eins nimmt zu, eins nimmt ab. Die Bilanzsumme bleibt gleich.",
    },
    {
      frage: "Welche Art der Bilanzveränderung ist **Fuhrpark an Verbindlichkeiten a. LL.**?",
      antworten: ["Aktivtausch", "Passivtausch", "Aktiv-Passiv-Mehrung", "Aktiv-Passiv-Minderung"],
      richtig: 2,
      erklaerung: "Vermögen und Schulden nehmen beide zu. Die Bilanzsumme steigt.",
    },
  ],
});
