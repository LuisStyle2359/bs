// Lernfeld 14 – Aufbau der Einträge: siehe README.md
// Grundlage: Portfolio Marketing 10KU (Schuljahr 26/27) und Voth Infoband, Kapitel 32.
lernfeld(14, {
  titel: "Marketingmaßnahmen entwickeln und durchführen",
  jahr: 1, // Lehrjahr (LJ) an eurer Schule: 1, 2 oder 3; 0 = noch nicht eingeteilt
  beschreibung: "Marketing im Speditionsbetrieb. Klausur am 28.10.2026.",

  kapitel: [
    {
      titel: "Klausur-Checkliste",
      text: `
        Das kommt laut Portfolio in der Klausur am **28.10.2026** dran. Die Kapitel darunter gehen die Punkte der Reihe nach durch.

        - Warum Marketing?
        - Definition Marketing
        - Bedeutung von Markt und Zielgruppe
        - Veränderungen des Marktes als Grund für Marketing
        - B2B, B2C, B2G
        - Harte und weiche Faktoren
        - Marktforschung (primär / sekundär): Was nutzt man wie und wann?
        - Marktbeobachtung / Marktanalyse (zeitliche Einordnung), ABC-Analyse
        - Marketing-Mix als Oberbegriff
        - Produktpolitik: Was gibt es, was nutzt man wann? BCG-Matrix und Produktlebenszyklus
        - Preispolitik: Was gibt es, was nutzt man wann?
        - Kommunikationspolitik: Was nutzt man wie und wann? AIDA

        > **Tipp:** Lies zuerst ein Kapitel, mach dann die Karteikarten und zum Schluss das Quiz. Wo hier etwas anders steht als im Voth-Infoband, gilt der Infoband.
      `,
    },
    {
      titel: "Warum Marketing?",
      text: `
        Unternehmen machen Marketing vor allem, um **mehr abzusetzen** (Absatzsteigerung). Mehr Absatz bedeutet mehr Umsatz:

        > **Umsatz = Preis × Menge**

        Umsatz ist aber nicht gleich Gewinn, denn es fallen auch Kosten an:

        > **Gewinn = Umsatz − Kosten**

        ### Ziele eines Unternehmens

        - **Gewinnmaximierung:** das Hauptziel eines privaten Unternehmens
        - **Marktmacht sichern:** sich gegen die Konkurrenz behaupten
        - **Neue Kunden gewinnen (Akquise):** das Mittel zum Zweck
        - **Sicherheit des Unternehmens:** Arbeitsplätze und Fortbestand sichern

        ### Und wenn kein Gewinn angestrebt wird?

        Es gibt auch Einrichtungen, die etwas für die **Gemeinschaft** tun, zum Beispiel Freibad, Schule, Vereine, Kirche oder kommunaler Wohnungsbau. Ihr Ziel ist oft nur die **Kostendeckung**.

        **Genossenschaften** wollen die Interessen ihrer **Mitglieder** bedienen. Beispiel: Eine Genossenschaft übernimmt die Dorfkneipe, damit es im Ort weiterhin einen Treffpunkt gibt.

        Auch solche Einrichtungen brauchen Marketing, zum Beispiel um Mitglieder oder Besucher zu gewinnen.
      `,
    },
    {
      titel: "Was ist Marketing? Markt und Zielgruppe",
      text: `
        Das Wort kommt vom englischen **market** (Markt).

        > **Marketing** bedeutet, das ganze Unternehmen am **Markt** auszurichten: herausfinden, welche Leistungen der Markt verlangt und wie man sie am besten absetzt. Dazu gehören alle Maßnahmen, um einen Markt zu **schaffen**, zu **erhalten** oder zu **vergrößern**.

        ### Die Rolle des Käufers

        Im Mittelpunkt steht der **Kunde**. Ein Unternehmen fragt nicht zuerst „Was können wir anbieten?“, sondern „Was braucht der Kunde?“. Das ist so, weil heute meist ein **Käufermarkt** herrscht:

        | | Verkäufermarkt | Käufermarkt |
        |---|---|---|
        | Lage | Nachfrage größer als Angebot | Angebot größer als Nachfrage |
        | Wer hat die Macht? | der Verkäufer | der Käufer |
        | Folge | wenig Marketing nötig | Unternehmen müssen um Kunden werben |

        ### Markt

        Der **Markt** ist der Ort, an dem **Angebot und Nachfrage** zusammentreffen. Das kann ein echter Ort sein (Messe, Wochenmarkt) oder ein virtueller (Onlineshop, Frachtenbörse).

        ### Zielgruppe

        Die **Zielgruppe** ist die Gruppe von (möglichen) Kunden, die ein Unternehmen mit seinem Marketing ansprechen will. Je genauer sie beschrieben ist, desto gezielter kann man werben.

        *Beispiel:* Industrieunternehmen im Rhein-Main-Gebiet, die ihre Lagerhaltung auslagern wollen.
      `,
    },
    {
      titel: "Veränderungen des Marktes, B2B, B2C, B2G",
      text: `
        Der Markt für Speditionen hat sich stark verändert. Das ist ein wichtiger Grund, warum Marketing heute nötig ist.

        - **Deregulierung:** Früher gab es mehr staatliche Regeln, zum Beispiel feste Tarife im Güterkraftverkehr. Seit diese Regeln wegfielen und der EU-Binnenmarkt den Markt geöffnet hat, herrscht freier Wettbewerb.
        - **Vom Verkäufer- zum Käufermarkt:** Der Kunde hat mehr Macht und kann sich die Spedition aussuchen.
        - **E-Commerce:** Waren werden weltweit online gehandelt. Kunden erwarten Online-Abwicklung und schnelle Lieferung.
        - **Fahrpersonalmangel:** In Deutschland gibt es zu wenige qualifizierte Lkw-Fahrer. Speditionen suchen deshalb oft Personal in Osteuropa. Marketing richtet sich hier auch an Bewerber.

        ### B2B, B2C, B2G

        | Abkürzung | Bedeutung | Kunde ist … | Beispiel Spedition |
        |---|---|---|---|
        | **B2B** | Business to Business | ein Unternehmen | Spedition fährt Bauteile für Opel |
        | **B2C** | Business to Consumer | ein Privatkunde (Endverbraucher) | Paketzustellung an Privatleute, Privatumzug |
        | **B2G** | Business to Government | die öffentliche Hand (Staat, Behörden) | Transporte für eine Stadt oder die Bundeswehr nach einer Ausschreibung |

        Speditionen arbeiten überwiegend im **B2B**-Bereich.
      `,
    },
    {
      titel: "Kundenzufriedenheit: harte und weiche Faktoren",
      text: `
        Ob Kunden zufrieden sind, hängt von **harten** und **weichen** Faktoren ab.

        | | Harte Faktoren | Weiche Faktoren |
        |---|---|---|
        | Merkmal | gut **messbar** | nur **schwer messbar**, Zusammenhänge schwer nachweisbar |
        | Beispiele Spedition | Termingenauigkeit (Ware pünktlich?), Zuverlässigkeit der Auftragsabwicklung, Dauer einer Lieferung, Dichte des Verkehrsnetzes | Freundlichkeit und Auftreten der Mitarbeiter, Erreichbarkeit, Erscheinungsbild (Fahrzeuge, Fahrer), Vertrauen |
        | Beispiele Arbeitsplatz / Schule | Gehalt, Urlaubstage | Klassenklima, Lob und Anerkennung, Hilfsbereitschaft, freundliche Kollegen |

        ### Was ist für Marketing leichter nutzbar?

        **Harte Faktoren**, weil man sie messen und belegen kann (zum Beispiel „98 % unserer Sendungen kommen pünktlich an“). Sie sind auch günstiger zu erfassen.

        ### Warum ist Kundenzufriedenheit so wichtig?

        Zufriedene Kunden erzählen es weiter:

        > mehr neue Kunden → mehr Marktmacht → mehr Umsatz → mehr Gewinn
      `,
    },
    {
      titel: "Marktforschung",
      text: `
        Marktforschung sammelt Informationen über den Markt, die Kunden und die Konkurrenz.

        ### Marktanalyse und Marktbeobachtung (zeitliche Einordnung)

        | | Marktanalyse | Marktbeobachtung |
        |---|---|---|
        | Was? | untersucht den **gegenwärtigen Zustand** des Marktes | erfasst die **laufenden Veränderungen** des Marktes |
        | Zeit | **Zeitpunkt** (Momentaufnahme) | **Zeitraum** (fortlaufend) |
        | Beispiel | Wie viele Speditionen bieten heute Luftfracht in Frankfurt an? | Wie entwickeln sich die Dieselpreise über das Jahr? |

        > **Eselsbrücke aus dem Unterricht: Tracking / Tracing.** Man kann sie so lesen: Wie bei einer Statusabfrage zur Sendung schaut die Marktanalyse auf den Stand **jetzt**, wie bei der Verfolgung des Sendungsverlaufs schaut die Marktbeobachtung auf die Entwicklung **über die Zeit**.

        ### Primär- und Sekundärforschung

        | | Primärforschung | Sekundärforschung |
        |---|---|---|
        | Daten | werden **zum ersten Mal** erhoben | sind **schon vorhanden** |
        | Wer? | das Unternehmen selbst oder eine beauftragte Agentur | man wertet aus, was es schon gibt |
        | Beispiele | Umfrage, Interview, Beobachtung, Experiment / Feldversuch, Produkttest | intern: Umsatzstatistik, Kundendatei; extern: Statistisches Bundesamt, Fachzeitschriften (z. B. DVZ), Branchenberichte, Statista |
        | Vorteile | genau auf die eigene Frage zugeschnitten, aktuell, exklusiv | schnell und günstig |
        | Nachteile | teuer und zeitaufwendig | passt evtl. nicht genau, kann veraltet sein, Quelle muss geprüft werden |

        ### Was nutzt man wann?

        Meist zuerst **Sekundärforschung**, weil sie schnell und günstig ist. Reicht das nicht, folgt **Primärforschung**.

        > **Wichtig bei der Primärforschung:** Vorher klären, *was* man *wozu* untersuchen will. Geht es bei einem neuen Getränk nur ums Design, fragt man nach dem Design und nicht nach dem Geschmack.

        > **Achtung bei Quellen:** Statista ist kommerziell, das Statistische Bundesamt (Destatis) ist eine öffentliche, amtliche Quelle.
      `,
    },
    {
      titel: "Beispiel: Statistik zum Verkehrsträgervergleich",
      text: `
        Sekundärforschung mit einer amtlichen Quelle: Beförderungsmenge in Deutschland in **1.000 Tonnen** (Statistisches Bundesamt).

        | Verkehrsträger | 2019 | 2024 | Anteil 2024 | Veränderung |
        |---|---|---|---|---|
        | Straßenverkehr | 3.758.700 | 3.340.700 | 78,9 % | −11,1 % |
        | Eisenbahnverkehr | 390.752 | 362.331 | 8,6 % | −7,3 % |
        | Seeverkehr | 290.233 | 269.753 | 6,4 % | −7,1 % |
        | Binnenschifffahrt | 205.066 | 173.778 | 4,1 % | −15,3 % |
        | Rohöl-Rohrleitungen | 85.127 | 83.579 | 2,0 % | −1,8 % |
        | Luftverkehr | 4.772 | 4.878 | 0,1 % | +2,2 % |
        | **Insgesamt** | **4.734.650** | **4.235.019** | **100 %** | **−10,6 %** |

        ### So rechnest du den Anteil

        > **Anteil = Teil ÷ Ganzes × 100**
        > Schiene 2024: 362.331 ÷ 4.235.019 × 100 ≈ **8,6 %**

        ### Was sagen die Zahlen?

        - Insgesamt wurde 2024 rund **10,6 % weniger** befördert als 2019. Das kann auf eine schwache Wirtschaft (Rezession) hindeuten.
        - Die Bahn hat mit rund **7,3 %** weniger verloren als der Durchschnitt.
        - Die Luftfracht ist leicht **gewachsen**, hat innerhalb Deutschlands aber nur einen Anteil von etwa **0,1 %**.

        ### Wie nutzt eine Spedition so eine Statistik fürs Marketing?

        - Wachsende Bereiche wie Luftfracht gezielt bewerben, um die Marktposition auszubauen
        - Kampagne für Bahntransporte, dabei aber auch Ursachen prüfen (z. B. Niedrigwasser bei der Binnenschifffahrt)
        - Andere nützliche Statistiken: Baustatistik (Kunden aus der Baubranche), wichtigste Handelspartner Deutschlands (Export- und Importvolumen)
      `,
    },
    {
      titel: "ABC-Analyse",
      text: `
        Mit der **ABC-Analyse** teilt man Kunden nach ihrem **Umsatz** in drei Gruppen ein. Üblich ist das Verhältnis **70 : 20 : 10**:

        - **A-Kunden:** wenige Kunden, die zusammen etwa **70 %** des Umsatzes bringen
        - **B-Kunden:** bringen die nächsten etwa **20 %** (bis zusammen ca. 90 %)
        - **C-Kunden:** viele kleine Kunden mit den restlichen etwa **10 %**

        ### So gehst du vor

        1. Kunden nach Umsatz **absteigend sortieren**
        2. **Umsatzanteil** jedes Kunden berechnen: Umsatz ÷ Gesamtumsatz × 100
        3. Anteile **aufsummieren** (summierter Umsatzanteil)
        4. Grenzen bei ca. 70 % und ca. 90 % ziehen

        ### Beispiel (Lernsituation 25, Aufgabe 4)

        | Nr. | Kunde | Umsatz (EUR) | Anteil | Summiert | Gruppe |
        |---|---|---|---|---|---|
        | 1 | ITC | 110.349 | 13,41 % | 13,41 % | A |
        | 2 | Sindern | 95.476 | 11,61 % | 25,02 % | A |
        | 3 | Dürer | 85.768 | 10,43 % | 35,45 % | A |
        | 4 | Kramer | 79.364 | 9,65 % | 45,09 % | A |
        | 5 | Sinop | 75.322 | 9,16 % | 54,25 % | A |
        | 6 | Wächter | 68.300 | 8,30 % | 62,55 % | A |
        | 7 | Bauer | 65.388 | 7,95 % | 70,50 % | A |
        | 8 | Dehn | 58.398 | 7,10 % | 77,60 % | B |
        | 9 | Wehmeier | 52.897 | 6,43 % | 84,03 % | B |
        | 10 | SOUND | 48.300 | 5,87 % | 89,90 % | B |
        | 11 | BIO-Gen | 25.400 | 3,09 % | 92,99 % | C |
        | 12 | Seller | 18.477 | 2,25 % | 95,24 % | C |
        | 13 | Schorn | 16.423 | 2,00 % | 97,23 % | C |
        | 14 | Bieler | 12.300 | 1,50 % | 98,73 % | C |
        | 15 | C-Tech | 10.455 | 1,27 % | 100,00 % | C |
        | | **Gesamt** | **822.617** | **100 %** | | |

        Ergebnis: **A** = Kunden 1–7 (70,5 %), **B** = Kunden 8–10 (19,4 %), **C** = Kunden 11–15 (10,1 %).

        > **Grenzfall:** Bauer liegt mit 70,50 % knapp über der 70-%-Grenze und ist der Grenze am nächsten, deshalb zählt er hier noch zu A. Bei solchen Grenzfällen in der Klausur kurz begründen, wie du entschieden hast.

        ### Wozu braucht man das im Marketing?

        Man kann jede Gruppe passend betreuen:

        - **A-Kunden:** enge, persönliche Betreuung, z. B. durch einen Key-Account-Manager
        - **B-Kunden:** regelmäßige Betreuung
        - **C-Kunden:** standardisierte Betreuung, z. B. Newsletter, Online-Portal
      `,
    },
    {
      titel: "Marketingziele",
      text: `
        Wer am Markt Erfolg haben will, braucht klare Ziele. Nur dann merkt man, wenn ein Ziel nicht erreicht wird, und kann gegensteuern. Marketingziele werden nach **sechs Kriterien** festgelegt:

        | Kriterium | Frage | Beispiel |
        |---|---|---|
        | 1. Zielinhalt | Was soll erreicht werden? | Umsatz, Kundenzahl |
        | 2. Zielausmaß | Wie viel? | 1,5 Mio. EUR Umsatz |
        | 3. Zielzeitpunkt / -zeitraum | Bis wann? | im kommenden Geschäftsjahr |
        | 4. Zielgruppe | Wer soll angesprochen werden? | Industrieunternehmen, die Logistik auslagern wollen |
        | 5. Zielobjekt | Womit? | Leistungsangebot Beschaffungslogistik |
        | 6. Zielgebiet | Wo? | standortnah oder bundesweit |

        Daneben gibt es **qualitative Ziele** wie **Image** oder **Bekanntheitsgrad**. Sie sind aber schwer messbar.

        ### Begriffe aus dem Unterricht

        - **Beschaffungslogistik:** Die Spedition beschafft Ware für einen Kunden, z. B. Stoßstangen für Opel aus Asien.
        - **Distributionslogistik:** Die Spedition liefert Ware für einen Kunden aus, z. B. fertige Pkw von Opel an Autohäuser.
        - **ROI (Return on Investment):** Das Geld, das ich in eine Marketingmaßnahme stecke, soll mindestens wieder hereinkommen. ROI = Gewinn ÷ eingesetztes Kapital × 100.
      `,
    },
    {
      titel: "Vorgehensweise im Marketing",
      text: `
        Marketing läuft in Schritten ab. Am Ende wird geprüft, ob die Ziele erreicht wurden, und die Planung wird angepasst (Rückkopplung).

        ### Phase 1: Analysen als Grundlage

        1. **Selbstanalyse** (Stärken-Schwächen-Analyse): Welche Ressourcen, Kapazitäten und Kernkompetenzen haben wir?
        2. **Kunden- und Marktanalyse** (Marktforschung): Wie sieht der Markt aus? Was wollen die Kunden?
        3. **Konkurrenzanalyse:** Was machen die Mitbewerber? (z. B. mit SWOT-Analyse, Primär- und Sekundärforschung)
        4. **Marktprognose:** Welche Trends und Chancen sind aus bisherigen Zahlen zu erwarten?

        ### Phase 2: Marketingziele festlegen

        Mit den sechs Kriterien: Zielinhalt, Zielausmaß, Zeitraum, Zielgruppe, Zielobjekt, Zielgebiet.

        ### Phase 3: Strategie und Kommunikationsplanung

        - passende **Kommunikationskanäle** auswählen (Fachzeitschriften, Messen, Online-Werbung)
        - **Werbebudget** festlegen
        - **messbare Kontrollgrößen** festlegen (z. B. Rücklaufquote von Werbebriefen, Anfragen über die Website, Verkaufszahlen)

        ### Danach

        - **Umsetzung** des Marketingprogramms mit Termin- und Ablaufplan
        - **Erfolgskontrolle:** Ist-Zahlen mit Plan-Zahlen vergleichen und bei Abweichungen die Strategie anpassen

        ### SWOT-Analyse

        | | hilfreich | schädlich |
        |---|---|---|
        | **intern** (im Unternehmen) | **S** – Strengths: Stärken | **W** – Weaknesses: Schwächen |
        | **extern** (im Umfeld) | **O** – Opportunities: Chancen | **T** – Threats: Risiken |

        *Beispiel Spedition:* Stärke = dichtes Netz im Rhein-Main-Gebiet; Schwäche = wenig Fahrpersonal; Chance = wachsender Onlinehandel; Risiko = steigende Mautkosten.
      `,
    },
    {
      titel: "Marketing-Mix: Produktpolitik",
      text: `
        Der **Marketing-Mix** ist der Oberbegriff für die vier **Marketinginstrumente**. Erst die passende Kombination führt zum Erfolg:

        1. **Produktpolitik:** Was bieten wir an?
        2. **Preispolitik:** Zu welchem Preis?
        3. **Kommunikationspolitik:** Wie erfahren Kunden davon?
        4. **Distributionspolitik** (Vertrieb): Wie kommt die Leistung zum Kunden?

        ### Maßnahmen der Produktpolitik

        | Maßnahme | Bedeutung | Beispiel |
        |---|---|---|
        | **Produktinnovation** | ein ganz neues Produkt, das es vorher nicht gab | Zustellung per Drohne |
        | **Produktvariation** | ein bestehendes Produkt wird verändert und ersetzt das alte | Umstellung auf eine CO₂-neutrale Flotte |
        | **Produktdifferenzierung** | zum bestehenden Produkt kommen weitere Varianten dazu, das alte bleibt | Paketversand zusätzlich als Express- und Same-Day-Variante |
        | **Produktdiversifikation** | das Unternehmen erweitert sein Angebot um neue Bereiche | siehe unten |
        | **Produktelimination** | ein Produkt wird aus dem Angebot genommen, z. B. weil der Absatz zu gering ist | Apple hat den iPod eingestellt |

        ### Arten der Diversifikation

        - **horizontal:** neues Angebot auf derselben Wirtschaftsstufe, mit Bezug zum bisherigen (Spedition bietet zusätzlich Lagerlogistik an)
        - **vertikal:** Ausweitung auf eine vor- oder nachgelagerte Stufe (Spedition eröffnet eine eigene Lkw-Werkstatt)
        - **lateral:** völlig neues Gebiet ohne Zusammenhang (Spedition betreibt ein Hotel)

        ### Produktlebenszyklus

        1. **Einführung:** hohe Kosten, wenig Umsatz, meist Verlust
        2. **Wachstum:** Umsatz steigt stark, Gewinnzone wird erreicht
        3. **Reife:** Umsatz wächst langsamer, Gewinn am höchsten
        4. **Sättigung:** Umsatz stagniert, viel Konkurrenz
        5. **Rückgang:** Umsatz und Gewinn sinken, dann Relaunch (Variation) oder Elimination

        ### BCG-Matrix (Portfolioanalyse)

        Sie ordnet Produkte nach **Marktwachstum** und **relativem Marktanteil**:

        | | niedriger Marktanteil | hoher Marktanteil |
        |---|---|---|
        | **hohes Marktwachstum** | **Question Marks** (Fragezeichen): investieren oder aufgeben? | **Stars:** weiter investieren |
        | **niedriges Marktwachstum** | **Poor Dogs** (arme Hunde): eher eliminieren | **Cash Cows** (Melkkühe): Gewinne abschöpfen |

        Grob passt das zum Lebenszyklus: Question Marks ≈ Einführung, Stars ≈ Wachstum, Cash Cows ≈ Reife und Sättigung, Poor Dogs ≈ Rückgang.
      `,
    },
    {
      titel: "Preispolitik",
      text: `
        > Dieser Teil ist im Portfolio noch offen. Hier steht das Grundwissen, gleiche es mit dem Voth-Infoband (Kapitel 32.6.2) ab.

        Bei der **Preispolitik** legt das Unternehmen fest, zu welchem Preis und zu welchen Bedingungen es seine Leistung anbietet.

        ### Woran orientiert sich der Preis?

        - **Kosten:** Der Preis muss die Kosten decken und Gewinn bringen (Kalkulation).
        - **Nachfrage:** Was sind Kunden bereit zu zahlen?
        - **Konkurrenz:** Was verlangen die Mitbewerber?

        ### Preisstrategien

        - **Hochpreisstrategie (Premium):** hoher Preis für hohe Qualität und gutes Image
        - **Niedrigpreisstrategie:** dauerhaft günstiger als die Konkurrenz
        - **Abschöpfungsstrategie (Skimming):** neues Produkt startet teuer, der Preis sinkt später
        - **Marktdurchdringungsstrategie (Penetration):** niedriger Einstiegspreis, um schnell viele Kunden zu gewinnen; später steigt der Preis

        ### Preisdifferenzierung

        Für dieselbe Leistung werden unterschiedliche Preise verlangt:

        - **zeitlich:** Express teurer als Standard
        - **räumlich:** je nach Region oder Relation
        - **mengenmäßig:** Staffelpreise bei großen Mengen
        - **personell:** Sonderpreise für Stammkunden

        ### Konditionenpolitik

        Rabatte (Mengen-, Treue-, Sonderrabatt), Skonto, Zahlungsziele und Lieferbedingungen.
      `,
    },
    {
      titel: "Kommunikationspolitik und AIDA",
      text: `
        > Dieser Teil ist im Portfolio noch offen. Hier steht das Grundwissen, gleiche es mit dem Voth-Infoband (Kapitel 32.6.3) ab.

        Die **Kommunikationspolitik** sorgt dafür, dass Kunden das Unternehmen und seine Leistungen kennen. Werbung ist der „Call“, die Reaktion des Kunden die „Response“.

        ### Instrumente

        - **Werbung:** Anzeigen, Plakate, Social Media, TV, Werbung auf der Lkw-Plane
        - **Verkaufsförderung:** zeitlich begrenzte Anreize, z. B. Aktionspreise, Gutscheine, Schulungen für Kunden
        - **Public Relations (PR, Öffentlichkeitsarbeit):** Vertrauen und gutes Image in der Öffentlichkeit aufbauen, z. B. Pressemitteilungen, Tag der offenen Tür
        - **Sponsoring:** Unterstützung von Sport, Kultur oder sozialen Projekten gegen Werbewirkung
        - **Direktmarketing / persönlicher Verkauf:** Kunden direkt ansprechen, z. B. Mailings, Telefonmarketing, Messen

        ### PR: Vor- und Nachteile

        | Sichtweise | Vorteil | Nachteil |
        |---|---|---|
        | Kunde | erfährt mehr über das Unternehmen | Darstellung ist einseitig positiv |
        | Unternehmen | Vertrauen, gutes Image | Wirkung schwer messbar, Risiko bei schlechter Presse |
        | Gesellschaft | Information über Engagement des Unternehmens | Gefahr der Beeinflussung (Manipulation) |

        ### Werbeplan

        Der **Werbeplan** legt fest, wer wie wo wann und mit welchem Budget wirbt: Werbeziel, Zielgruppe, Werbebotschaft, Werbemittel (z. B. Anzeige, Spot), Werbeträger (z. B. Zeitung, Website), Streugebiet, Streuzeit, Werbeetat und Werbeerfolgskontrolle.

        Man braucht ihn, damit Werbung **gezielt** statt zufällig läuft, das **Budget** eingehalten wird und der **Erfolg** gemessen werden kann.

        ### AIDA-Formel

        So soll gute Werbung wirken, Schritt für Schritt:

        | Buchstabe | Englisch | Deutsch | Beispiel |
        |---|---|---|---|
        | **A** | Attention | Aufmerksamkeit erregen | auffälliges Bild, starke Überschrift |
        | **I** | Interest | Interesse wecken | Nutzen zeigen: „Ihre Ware in 24 Stunden in ganz Europa“ |
        | **D** | Desire | Wunsch auslösen | „Das will ich auch“, z. B. durch Kundenstimmen |
        | **A** | Action | Handlung auslösen | „Jetzt Angebot anfordern“ |
      `,
    },
    {
      titel: "Distributionspolitik",
      text: `
        > Dieser Teil ist im Portfolio noch offen. Hier steht das Grundwissen, gleiche es mit dem Voth-Infoband (Kapitel 32.6.4) ab.

        Die **Distributionspolitik** (Vertriebspolitik) legt fest, auf welchem Weg die Leistung zum Kunden kommt und wer die Kunden betreut.

        ### Absatzwege

        - **direkt:** das Unternehmen verkauft selbst, z. B. über eigenen Außendienst, Telefon oder die eigene Website
        - **indirekt:** über Vermittler, z. B. Handelsvertreter oder Kooperationspartner

        ### Organisation der Kundenbetreuung

        - **Key-Account-Manager:** betreut wichtige Großkunden (A-Kunden) als fester Ansprechpartner für alles
        - **Produktmanager:** ist für ein bestimmtes Produkt oder eine Leistung verantwortlich, z. B. Luftfracht, über alle Kunden hinweg
        - **Teamkonzept:** ein Team aus verschiedenen Fachleuten (z. B. Vertrieb, Disposition, Abrechnung) betreut einen Kunden gemeinsam

        ### AIDA beim Telefonmarketing

        1. **Attention:** freundlich begrüßen, sich vorstellen, Aufmerksamkeit gewinnen
        2. **Interest:** mit einer Frage zum Bedarf des Kunden Interesse wecken
        3. **Desire:** passende Leistung und ihren Nutzen vorstellen
        4. **Action:** konkreten nächsten Schritt vereinbaren (Termin, Angebot, Auftrag)

        ### Cross-Selling

        Einem Kunden wird zusätzlich zu dem, was er kauft, eine passende weitere Leistung verkauft. *Beispiel:* Ein Kunde bucht Seefracht und bekommt dazu Zollabfertigung und Transportversicherung.
      `,
    },
    {
      titel: "Exkurse: Gütekriterien und Motivation",
      text: `
        ### Gütekriterien (z. B. bei Befragungen und wissenschaftlichen Arbeiten)

        - **Objektivität:** Das Ergebnis hängt nicht davon ab, wer die Untersuchung durchführt.
        - **Reliabilität (Zuverlässigkeit):** Die Messung ist genau; bei Wiederholung kommt das Gleiche heraus.
        - **Validität (Gültigkeit):** Es wird wirklich das gemessen, was gemessen werden soll.

        ### Intrinsische und extrinsische Motivation

        - **Intrinsisch:** kommt von innen, z. B. weil die Arbeit Spaß macht. Lob und Anerkennung können sie stärken.
        - **Extrinsisch:** kommt von außen, z. B. mehr Gehalt oder Prämien.

        Intrinsische Motivation ist für Unternehmen günstiger und laut Studien oft auch wirksamer.
      `,
    },
  ],

  karteikarten: [
    { vorne: "Woher kommt das Wort **Marketing**?", hinten: "Vom englischen **market** (Markt)." },
    {
      vorne: "Definiere **Marketing**.",
      hinten: "Ausrichtung des ganzen Unternehmens am **Markt** und an den **Kunden**: herausfinden, was der Markt verlangt und wie man es am besten absetzt. Alle Maßnahmen, um einen Markt zu schaffen, zu erhalten oder zu vergrößern.",
    },
    { vorne: "Formel für den **Umsatz**?", hinten: "Umsatz = Preis × Menge" },
    { vorne: "Formel für den **Gewinn**?", hinten: "Gewinn = Umsatz − Kosten" },
    {
      vorne: "Nenne vier **Gründe** für Marketing.",
      hinten: "- Absatzsteigerung\n- Gewinnmaximierung\n- Marktmacht sichern\n- neue Kunden gewinnen (Akquise)\n- Sicherheit des Unternehmens",
    },
    { vorne: "Was bedeutet **Akquise**?", hinten: "Gewinnung neuer Kunden." },
    {
      vorne: "Welches Ziel haben **gemeinnützige Einrichtungen** (Freibad, Verein)?",
      hinten: "Etwas für die Gemeinschaft tun; oft reicht **Kostendeckung**.",
    },
    { vorne: "Welches Ziel hat eine **Genossenschaft**?", hinten: "Die Interessen ihrer **Mitglieder** bedienen." },
    { vorne: "Was ist ein **Markt**?", hinten: "Der Ort (real oder virtuell), an dem **Angebot und Nachfrage** zusammentreffen." },
    { vorne: "Was ist eine **Zielgruppe**?", hinten: "Die Gruppe (möglicher) Kunden, die mit dem Marketing angesprochen werden soll." },
    {
      vorne: "**Käufermarkt** – was bedeutet das?",
      hinten: "Angebot ist größer als die Nachfrage. Der **Käufer** hat die Macht und kann sich den Anbieter aussuchen.",
    },
    { vorne: "**Verkäufermarkt** – was bedeutet das?", hinten: "Nachfrage ist größer als das Angebot. Der **Verkäufer** hat die Macht." },
    {
      vorne: "Nenne vier **Veränderungen des Marktes** für Speditionen.",
      hinten: "- Deregulierung\n- vom Verkäufer- zum Käufermarkt\n- E-Commerce\n- Fahrpersonalmangel",
    },
    {
      vorne: "Was heißt **Deregulierung**?",
      hinten: "Abbau staatlicher Regeln (z. B. feste Tarife im Güterkraftverkehr). Folge: freier Wettbewerb.",
    },
    { vorne: "**B2B**", hinten: "Business to Business: Unternehmen verkauft an Unternehmen (Spedition fährt für Opel)." },
    { vorne: "**B2C**", hinten: "Business to Consumer: Unternehmen verkauft an Privatkunden (Paketzustellung, Privatumzug)." },
    { vorne: "**B2G**", hinten: "Business to Government: Unternehmen verkauft an die öffentliche Hand (Transporte für eine Behörde)." },
    {
      vorne: "**Harte Faktoren** der Kundenzufriedenheit – Merkmal und Beispiele?",
      hinten: "Gut **messbar**. Z. B. Termingenauigkeit, Zuverlässigkeit der Auftragsabwicklung, Lieferdauer, Dichte des Verkehrsnetzes.",
    },
    {
      vorne: "**Weiche Faktoren** der Kundenzufriedenheit – Merkmal und Beispiele?",
      hinten: "Nur **schwer messbar**. Z. B. Freundlichkeit, Erreichbarkeit der Mitarbeiter, Erscheinungsbild, Vertrauen.",
    },
    {
      vorne: "Welche Faktoren sind für Marketing **leichter** zu nutzen – und warum?",
      hinten: "**Harte** Faktoren, weil sie messbar und belegbar sind (und günstiger zu erfassen).",
    },
    {
      vorne: "Welche Folge hat hohe **Kundenzufriedenheit**?",
      hinten: "Es spricht sich herum → mehr neue Kunden → mehr Marktmacht → mehr Umsatz → mehr Gewinn.",
    },
    {
      vorne: "**Marktanalyse**",
      hinten: "Erforschung des **gegenwärtigen Zustands** eines Marktes. Bezieht sich auf einen **Zeitpunkt** (Momentaufnahme).",
    },
    {
      vorne: "**Marktbeobachtung**",
      hinten: "Erfassung der **laufenden Veränderungen** eines Marktes. Bezieht sich auf einen **Zeitraum**.",
    },
    {
      vorne: "**Primärforschung**",
      hinten: "Daten werden **zum ersten Mal** erhoben, selbst oder durch eine Agentur. Z. B. Umfrage, Interview, Beobachtung, Experiment.",
    },
    {
      vorne: "**Sekundärforschung**",
      hinten: "Man wertet **vorhandene** Daten aus. Intern: Umsatzstatistik, Kundendatei. Extern: Statistisches Bundesamt, Fachzeitschriften (DVZ).",
    },
    {
      vorne: "Vor- und Nachteil der **Primärforschung**?",
      hinten: "Vorteil: genau passend, aktuell, exklusiv. Nachteil: teuer und zeitaufwendig.",
    },
    {
      vorne: "Vor- und Nachteil der **Sekundärforschung**?",
      hinten: "Vorteil: schnell und günstig. Nachteil: passt evtl. nicht genau, kann veraltet sein, Quelle prüfen.",
    },
    {
      vorne: "**ABC-Analyse**: Verhältnis und Einteilung?",
      hinten: "Kunden nach Umsatz einteilen, meist **70 : 20 : 10**.\nA = wenige Kunden mit ca. 70 % Umsatz, B = ca. 20 %, C = viele Kunden mit ca. 10 %.",
    },
    {
      vorne: "**ABC-Analyse**: die vier Arbeitsschritte?",
      hinten: "1. nach Umsatz absteigend sortieren\n2. Umsatzanteil je Kunde berechnen\n3. Anteile aufsummieren\n4. Grenzen bei ca. 70 % und 90 % ziehen",
    },
    {
      vorne: "Wozu nutzt die ABC-Analyse im **Marketing**?",
      hinten: "Jede Kundengruppe passend betreuen: A-Kunden eng (Key-Account-Manager), C-Kunden standardisiert.",
    },
    {
      vorne: "Die **sechs Kriterien** für Marketingziele?",
      hinten: "Zielinhalt, Zielausmaß, Zielzeitpunkt/-zeitraum, Zielgruppe, Zielobjekt, Zielgebiet",
    },
    {
      vorne: "Beispiele für **qualitative** Marketingziele?",
      hinten: "Image, Bekanntheitsgrad. Sie sind schwer messbar.",
    },
    { vorne: "**ROI**", hinten: "Return on Investment: Gewinn ÷ eingesetztes Kapital × 100. Das investierte Geld soll mindestens wieder hereinkommen." },
    {
      vorne: "**SWOT** – wofür stehen die Buchstaben?",
      hinten: "**S**trengths = Stärken\n**W**eaknesses = Schwächen\n**O**pportunities = Chancen\n**T**hreats = Risiken",
    },
    {
      vorne: "Die Phasen der **Vorgehensweise im Marketing**?",
      hinten: "1. Analysen (Selbst-, Markt-, Konkurrenzanalyse, Marktprognose)\n2. Marketingziele\n3. Strategie und Kommunikationsplanung\n4. Umsetzung\n5. Erfolgskontrolle",
    },
    {
      vorne: "Die vier Instrumente des **Marketing-Mix**?",
      hinten: "Produktpolitik, Preispolitik, Kommunikationspolitik, Distributionspolitik",
    },
    { vorne: "**Produktinnovation**", hinten: "Ein ganz neues Produkt kommt auf den Markt (z. B. Drohnenzustellung)." },
    { vorne: "**Produktvariation**", hinten: "Ein bestehendes Produkt wird verändert und ersetzt das alte (z. B. CO₂-neutrale Flotte)." },
    { vorne: "**Produktdifferenzierung**", hinten: "Zum bestehenden Produkt kommen Varianten dazu, das alte bleibt (z. B. zusätzlich Express-Versand)." },
    { vorne: "**Produktelimination**", hinten: "Ein Produkt wird aus dem Angebot genommen, z. B. weil der Absatz zu gering ist (iPod)." },
    {
      vorne: "Horizontale, vertikale, laterale **Diversifikation**?",
      hinten: "Horizontal: gleiche Stufe, verwandt (Lagerlogistik)\nVertikal: vor-/nachgelagerte Stufe (eigene Werkstatt)\nLateral: ohne Zusammenhang (Hotel)",
    },
    {
      vorne: "Die fünf Phasen des **Produktlebenszyklus**?",
      hinten: "Einführung → Wachstum → Reife → Sättigung → Rückgang",
    },
    {
      vorne: "Die vier Felder der **BCG-Matrix**?",
      hinten: "Question Marks (hohes Wachstum, kleiner Anteil)\nStars (hohes Wachstum, großer Anteil)\nCash Cows (geringes Wachstum, großer Anteil)\nPoor Dogs (geringes Wachstum, kleiner Anteil)",
    },
    {
      vorne: "**Abschöpfungs-** vs. **Marktdurchdringungsstrategie**?",
      hinten: "Abschöpfung (Skimming): erst teuer, dann günstiger.\nMarktdurchdringung (Penetration): erst günstig, um schnell Kunden zu gewinnen.",
    },
    {
      vorne: "Arten der **Preisdifferenzierung**?",
      hinten: "zeitlich, räumlich, mengenmäßig, personell",
    },
    {
      vorne: "Instrumente der **Kommunikationspolitik**?",
      hinten: "Werbung, Verkaufsförderung, Public Relations, Sponsoring, Direktmarketing / persönlicher Verkauf",
    },
    { vorne: "Was ist **PR**?", hinten: "Public Relations (Öffentlichkeitsarbeit): Vertrauen und gutes Image in der Öffentlichkeit aufbauen." },
    {
      vorne: "**AIDA** – wofür stehen die Buchstaben?",
      hinten: "**A**ttention = Aufmerksamkeit\n**I**nterest = Interesse\n**D**esire = Wunsch\n**A**ction = Handlung",
    },
    {
      vorne: "Was ist ein **Werbeplan** und wozu braucht man ihn?",
      hinten: "Plan, wer wie wo wann und mit welchem Budget wirbt. Damit Werbung gezielt läuft, das Budget eingehalten und der Erfolg gemessen wird.",
    },
    { vorne: "**Key-Account-Manager**", hinten: "Betreut wichtige Großkunden (A-Kunden) als fester Ansprechpartner." },
    { vorne: "**Produktmanager**", hinten: "Verantwortlich für ein bestimmtes Produkt oder eine Leistung (z. B. Luftfracht)." },
    { vorne: "**Teamkonzept**", hinten: "Ein Team aus verschiedenen Fachleuten betreut einen Kunden gemeinsam." },
    { vorne: "**Cross-Selling**", hinten: "Dem Kunden zusätzlich eine passende weitere Leistung verkaufen (Seefracht + Zollabfertigung)." },
    {
      vorne: "**Objektivität, Reliabilität, Validität**?",
      hinten: "Objektivität: unabhängig von der Person\nReliabilität: zuverlässig, bei Wiederholung gleich\nValidität: misst, was es messen soll",
    },
    {
      vorne: "**Intrinsische** vs. **extrinsische** Motivation?",
      hinten: "Intrinsisch: von innen (Spaß an der Arbeit).\nExtrinsisch: von außen (Gehalt, Prämien).",
    },
  ],

  quiz: [
    {
      frage: "Wie berechnet man den **Gewinn**?",
      antworten: ["Preis × Menge", "Umsatz − Kosten", "Umsatz + Kosten", "Kosten − Umsatz"],
      richtig: 1,
      erklaerung: "Gewinn = Umsatz − Kosten. Preis × Menge ist der Umsatz.",
    },
    {
      frage: "Was ist das Hauptziel eines **privaten Unternehmens**?",
      antworten: ["Kostendeckung", "Gewinnmaximierung", "Interessen der Mitglieder bedienen", "möglichst viele Mitarbeiter"],
      richtig: 1,
      erklaerung: "Kostendeckung ist typisch für gemeinnützige Einrichtungen, Mitgliederinteressen für Genossenschaften.",
    },
    {
      frage: "Welche Aussage beschreibt einen **Käufermarkt**?",
      antworten: [
        "Die Nachfrage ist größer als das Angebot.",
        "Das Angebot ist größer als die Nachfrage, der Käufer hat die Macht.",
        "Der Staat legt die Preise fest.",
        "Es gibt nur einen Anbieter.",
      ],
      richtig: 1,
      erklaerung: "Im Käufermarkt gibt es mehr Angebot als Nachfrage. Deshalb müssen Unternehmen um Kunden werben.",
    },
    {
      frage: "Welche Punkte sind **Veränderungen des Marktes**, die Marketing für Speditionen nötig machen?",
      antworten: ["Deregulierung", "E-Commerce", "Fahrpersonalmangel", "Einführung fester staatlicher Frachttarife"],
      richtig: [0, 1, 2],
      erklaerung: "Feste Tarife gab es früher. Sie sind durch die Deregulierung weggefallen.",
    },
    {
      frage: "Eine Spedition übernimmt nach einer Ausschreibung Transporte für die Stadtverwaltung. Das ist …",
      antworten: ["B2B", "B2C", "B2G", "C2C"],
      richtig: 2,
      erklaerung: "B2G = Business to Government: Kunde ist die öffentliche Hand.",
    },
    {
      frage: "Ein Paketdienst liefert an Privatleute. Das ist …",
      antworten: ["B2B", "B2C", "B2G"],
      richtig: 1,
      erklaerung: "B2C = Business to Consumer: Kunde ist der Endverbraucher.",
    },
    {
      frage: "Welche davon sind **harte Faktoren** der Kundenzufriedenheit?",
      antworten: ["Termingenauigkeit", "Freundlichkeit der Disponenten", "Dauer einer Lieferung", "Erscheinungsbild der Fahrer"],
      richtig: [0, 2],
      erklaerung: "Harte Faktoren sind messbar. Freundlichkeit und Erscheinungsbild sind weiche Faktoren.",
    },
    {
      frage: "Warum lassen sich **harte Faktoren** leichter fürs Marketing nutzen?",
      antworten: [
        "Weil sie messbar und belegbar sind",
        "Weil Kunden sie nicht bemerken",
        "Weil sie gesetzlich vorgeschrieben sind",
        "Weil sie nichts mit Zufriedenheit zu tun haben",
      ],
      richtig: 0,
      erklaerung: "Mit Zahlen kann man werben, z. B. „98 % pünktliche Zustellung“.",
    },
    {
      frage: "Eine Spedition untersucht, wie viele Mitbewerber **heute** Luftfracht in Frankfurt anbieten. Das ist …",
      antworten: ["Marktanalyse", "Marktbeobachtung", "Marktprognose"],
      richtig: 0,
      erklaerung: "Marktanalyse = gegenwärtiger Zustand zu einem Zeitpunkt.",
    },
    {
      frage: "Die Spedition verfolgt **über das ganze Jahr**, wie sich die Dieselpreise entwickeln. Das ist …",
      antworten: ["Marktanalyse", "Marktbeobachtung", "ABC-Analyse"],
      richtig: 1,
      erklaerung: "Marktbeobachtung = laufende Veränderungen über einen Zeitraum.",
    },
    {
      frage: "Welche Methoden gehören zur **Primärforschung**?",
      antworten: ["Kundenbefragung", "Auswertung der Umsatzstatistik", "Interview", "Daten des Statistischen Bundesamts"],
      richtig: [0, 2],
      erklaerung: "Bei der Primärforschung werden Daten neu erhoben. Umsatzstatistik und Destatis-Daten sind schon vorhanden (Sekundärforschung).",
    },
    {
      frage: "Was ist ein typischer **Nachteil der Sekundärforschung**?",
      antworten: [
        "Sie ist sehr teuer.",
        "Die Daten passen evtl. nicht genau oder sind veraltet.",
        "Sie dauert immer sehr lange.",
        "Man braucht immer eine Agentur.",
      ],
      richtig: 1,
      erklaerung: "Sekundärforschung ist schnell und günstig, die Daten wurden aber für einen anderen Zweck erhoben.",
    },
    {
      frage: "Welches Verhältnis nutzt man üblicherweise bei der **ABC-Analyse**?",
      antworten: ["50 : 30 : 20", "70 : 20 : 10", "80 : 15 : 5", "33 : 33 : 33"],
      richtig: 1,
      erklaerung: "A-Kunden ca. 70 %, B-Kunden ca. 20 %, C-Kunden ca. 10 % des Umsatzes.",
    },
    {
      frage: "Was ist der **erste Schritt** einer ABC-Analyse?",
      antworten: [
        "Umsatzanteile aufsummieren",
        "Kunden nach Umsatz absteigend sortieren",
        "Grenzen bei 70 % und 90 % ziehen",
        "C-Kunden kündigen",
      ],
      richtig: 1,
      erklaerung: "Erst sortieren, dann Anteile berechnen, aufsummieren und die Grenzen ziehen.",
    },
    {
      frage: "Ein Kunde hat 65.388 EUR Umsatz, der Gesamtumsatz beträgt 822.617 EUR. Wie hoch ist sein **Umsatzanteil**?",
      antworten: ["ca. 6,5 %", "ca. 7,95 %", "ca. 12,6 %", "ca. 0,8 %"],
      richtig: 1,
      erklaerung: "65.388 ÷ 822.617 × 100 ≈ 7,95 %",
    },
    {
      frage: "Wie werden **A-Kunden** im Marketing typischerweise betreut?",
      antworten: [
        "Nur über einen Newsletter",
        "Eng und persönlich, z. B. durch einen Key-Account-Manager",
        "Gar nicht, sie kommen von allein",
        "Nur über das Online-Portal",
      ],
      richtig: 1,
      erklaerung: "A-Kunden bringen den meisten Umsatz und bekommen deshalb die intensivste Betreuung.",
    },
    {
      frage: "„Im kommenden Geschäftsjahr“ – welches **Kriterium eines Marketingziels** ist das?",
      antworten: ["Zielinhalt", "Zielausmaß", "Zielzeitpunkt / -zeitraum", "Zielgebiet"],
      richtig: 2,
      erklaerung: "Zielinhalt = was, Zielausmaß = wie viel, Zielzeitraum = bis wann, Zielgebiet = wo.",
    },
    {
      frage: "„1,5 Millionen EUR Umsatz“ – welches Kriterium ist das?",
      antworten: ["Zielinhalt", "Zielausmaß", "Zielobjekt", "Zielgruppe"],
      richtig: 1,
      erklaerung: "Das Zielausmaß gibt an, wie viel erreicht werden soll.",
    },
    {
      frage: "Wofür steht das **O** in SWOT?",
      antworten: ["Objectives (Ziele)", "Opportunities (Chancen)", "Obstacles (Hindernisse)", "Organisation"],
      richtig: 1,
      erklaerung: "S = Stärken, W = Schwächen, O = Chancen, T = Risiken.",
    },
    {
      frage: "Welche der folgenden gehören zum **Marketing-Mix**?",
      antworten: ["Produktpolitik", "Preispolitik", "Personalpolitik", "Kommunikationspolitik", "Distributionspolitik"],
      richtig: [0, 1, 3, 4],
      erklaerung: "Die vier Marketinginstrumente: Produkt, Preis, Kommunikation, Distribution. Personalpolitik gehört nicht dazu.",
    },
    {
      frage: "Eine Spedition stellt ihre Flotte auf CO₂-neutrale Lkw um. Welche Maßnahme der Produktpolitik ist das?",
      antworten: ["Produktinnovation", "Produktvariation", "Produktelimination", "laterale Diversifikation"],
      richtig: 1,
      erklaerung: "Die bestehende Leistung (Transport) wird verändert. Das ist Produktvariation.",
    },
    {
      frage: "Eine Spedition eröffnet ein Hotel. Welche Art der Diversifikation ist das?",
      antworten: ["horizontal", "vertikal", "lateral"],
      richtig: 2,
      erklaerung: "Lateral = neues Gebiet ohne Zusammenhang zum bisherigen Geschäft.",
    },
    {
      frage: "In welcher Phase des **Produktlebenszyklus** ist der Gewinn meist am höchsten?",
      antworten: ["Einführung", "Wachstum", "Reife", "Rückgang"],
      richtig: 2,
      erklaerung: "In der Reifephase wächst der Umsatz langsamer, der Gewinn ist aber am höchsten.",
    },
    {
      frage: "Ein Produkt hat einen **hohen Marktanteil** in einem Markt mit **geringem Wachstum**. Wo steht es in der BCG-Matrix?",
      antworten: ["Question Mark", "Star", "Cash Cow", "Poor Dog"],
      richtig: 2,
      erklaerung: "Cash Cows bringen viel Geld bei wenig Investitionsbedarf. Die Gewinne werden abgeschöpft.",
    },
    {
      frage: "Ein neuer Dienst startet mit einem sehr **niedrigen Einstiegspreis**, um schnell viele Kunden zu gewinnen. Welche Strategie ist das?",
      antworten: ["Abschöpfungsstrategie (Skimming)", "Marktdurchdringungsstrategie (Penetration)", "Hochpreisstrategie"],
      richtig: 1,
      erklaerung: "Skimming wäre umgekehrt: erst teuer, dann günstiger.",
    },
    {
      frage: "Wofür steht das **D** in AIDA?",
      antworten: ["Distribution", "Desire (Wunsch)", "Decision (Entscheidung)", "Demand (Nachfrage)"],
      richtig: 1,
      erklaerung: "Attention, Interest, Desire, Action.",
    },
    {
      frage: "„Jetzt kostenloses Angebot anfordern!“ – welche AIDA-Stufe ist das?",
      antworten: ["Attention", "Interest", "Desire", "Action"],
      richtig: 3,
      erklaerung: "Action: Der Kunde soll handeln.",
    },
    {
      frage: "Wer betreut bei einer Spedition einen wichtigen **Großkunden** als festen Ansprechpartner?",
      antworten: ["Produktmanager", "Key-Account-Manager", "Disponent im Nahverkehr", "Teamkonzept"],
      richtig: 1,
      erklaerung: "Der Key-Account-Manager kümmert sich um Schlüsselkunden (meist A-Kunden).",
    },
    {
      frage: "Ein Kunde bucht Seefracht und bekommt die Zollabfertigung gleich mit verkauft. Das nennt man …",
      antworten: ["Cross-Selling", "Sponsoring", "Produktelimination", "Deregulierung"],
      richtig: 0,
      erklaerung: "Cross-Selling = zusätzliche, passende Leistung an denselben Kunden verkaufen.",
    },
    {
      frage: "2024 wurden in Deutschland 4.235.019 Tsd. t befördert, davon 362.331 Tsd. t auf der Schiene. Wie hoch ist der **Anteil der Bahn**?",
      antworten: ["ca. 3,6 %", "ca. 8,6 %", "ca. 11,7 %", "ca. 78,9 %"],
      richtig: 1,
      erklaerung: "362.331 ÷ 4.235.019 × 100 ≈ 8,6 %. 78,9 % ist der Anteil der Straße.",
    },
  ],
});
