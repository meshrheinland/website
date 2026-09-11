---
sidebar_position: 2
sidebar_label: Letzte Notfunkübungen
title: Letzte Notfunkübungen
description: Übersicht vergangener Notfunkübungen im Rheinland mit einklappbaren Detailblöcken pro Übung.
---

# Letzte Notfunkübungen

Hier findet ihr die letzten Notfunkübungen im Rheinland. Jede Übung hat einen eigenen einklappbaren Detailblock, sodass sich neue Termine einfach ergänzen lassen.

<details open>
   <summary>
      <strong>Großraum Köln/Bonn am 10. September 2026 (Bundesweiter Warntag)</strong>
   </summary>

Liebe Funkamateure und Hobbyfunker,

anlässlich des **Bundesweiten Warntags** findet am **Donnerstag, den 10. September 2026** eine kleine lokale Notfunkübung im Großraum Köln/Bonn statt.

Gegen **11:00 Uhr** ertönen die Sirenen – die Übung selbst findet am Abend statt, damit möglichst viele nach Feierabend mitmachen können.

## Teilnahme und Funkbereiche

**Großraum Köln/Bonn:**
- Bonner Notfunkrelais **DBØDBN** der IGFS im Siebengebirge <span className="tag-gray">(2m FM, 145,575&nbsp;MHz, Ablage&nbsp;−0,6&nbsp;MHz, 103,5&nbsp;Hz&nbsp;CTCSS)</span>
- MeshCore <span className="tag-gray">(Kanal: #emergency, LoRa `EU/UK (Narrow)`)</span>

## Zeitplan

**18:30 – 19:00 Uhr:** Sprechfunk über das Bonner Notfunkrelais **DBØDBN** (145,575&nbsp;MHz, FM, Ablage&nbsp;−0,6&nbsp;MHz, 103,5&nbsp;Hz&nbsp;CTCSS) – Test der Einstellungen und Austausch von Rapporten

**19:00 – 20:00 Uhr:** **MeshCore**, Kanal: #emergency – Übungsverkehr nach [Übungsablauf Option B](#uebungsablauf-option-b)

---

## Auswertung

### Sprechfunk auf DBØDBN

Der Betrieb auf **DBØDBN** verlief geordnet. Insgesamt meldeten sich **12 Teilnehmer** herein. Erprobt wurden die Funktion der Geräte, eine saubere Modulation und der Einsatz von CTCSS. Kleinere Verbesserungen konnten bereits während der Übung vorgenommen werden.

### MeshCore

Grundlage ist der Mitschnitt der Leitstelle **LST-BN** auf dem Kanal #emergency ab Übungsbeginn um **19:00 Uhr**. Anfragen, die vorher eingingen, wurden nicht mitgezählt. Betrachtet wurden die einzelnen Kommunikationsstränge je Station – von der Anfrage über Aufgabe und Lösung bis zur Bestätigung durch die Leitstelle.

:::note[Sicht der Leitstelle]
Kanalnachrichten werden in MeshCore ohne Empfangsbestätigung übertragen – was unterwegs verloren geht, taucht im Mitschnitt nicht auf. Ob eine Aufgabe bei einer Station angekommen ist, lässt sich deshalb nur indirekt ablesen: Fragt eine Station erneut nach einer Aufgabe, ohne die bereits verschickte zu lösen, ist diese offensichtlich nicht angekommen. Die Laufzeiten im Netz wurden dabei berücksichtigt: Eine Anfrage, die sich unterwegs mit einer gerade verschickten Aufgabe gekreuzt hat, zählt nicht als Verlust.
:::

Mit **40 Stationen**, die im Kanal aktiv waren, war die Beteiligung deutlich größer als bei der Übung im März. 38 Stationen forderten Aufgaben an, an 34 Stationen verschickte die Leitstelle mindestens eine Aufgabe und **25 Stationen** schlossen mindestens einen Nachrichtenwechsel vollständig ab. Zwischen 19:00 und 19:50 Uhr liefen rund 300 Nachrichten über den Kanal – im Schnitt etwa alle zehn Sekunden eine.

| Kennzahl | Anzahl |
|---|---|
| Aufgabenanfragen (`Aufgabe?`) | 78 |
| Verschickte Aufgaben | 59 |
| Lösungen bei der Leitstelle eingegangen | 40 (68&nbsp;%) |
| **Vollständige Nachrichtenwechsel** (bis zur Bestätigung) | **39 (66&nbsp;%)** |

Hinter den 78 Anfragen stecken nicht 78 Aufgabenwünsche. Aus Sicht der Leitstelle schlüsseln sie sich so auf:

| Art der Anfrage | Anzahl |
|---|---|
| Erste Anfrage einer Station | 36 |
| Neue Anfrage nach gelöster Aufgabe | 21 |
| Erneute Anfrage, weil die verschickte Aufgabe nicht ankam | 12 |
| Erneute Anfrage, weil die Leitstelle noch nicht reagiert hatte | 5 |
| Erneute Anfrage, die sich unterwegs mit einer Aufgabe gekreuzt hat | 4 |

Im Median dauerte es rund **30 Sekunden** von der Anfrage bis zur Aufgabe, rund **1:40 Minuten** bis die Lösung bei der Leitstelle eintraf und rund **20 Sekunden** bis zur Bestätigung.

#### Was gut funktionierte

- **Alle 40 eingegangenen Lösungen waren richtig** – eine davon nach eigener Korrektur.
- Nahezu alle Lösungen trugen Anrede und Aufgabennummer. Dadurch ließen sich die Stränge auch im dichten Verkehr eindeutig zuordnen.
- Nachrichten erreichten die Leitstelle über im Median 6 und maximal 21 Hops.
- 116 der 139 Nachrichten der Leitstelle (83&nbsp;%) wurden nachweislich von mindestens einem Repeater weitergegeben.

#### Was sich gezeigt hat

- **Bestätigungen kamen offenbar nicht immer an.** In 8 Strängen wurde die Lösung mehrfach gesendet, einmal sogar sechsmal. Insgesamt gingen 58 Lösungsnachrichten für 40 Aufgaben ein – jede Wiederholung zog eine weitere Bestätigung nach sich und belastete das Netz zusätzlich.
- **Aufgaben gingen unterwegs verloren.** 8 Stationen fragten erneut nach einer Aufgabe, obwohl die Leitstelle ihnen bereits eine verschickt hatte – eine davon erst nach Ende der Aufgabenvergabe. Insgesamt kamen so mindestens 13 Aufgaben-Nachrichten nachweislich nicht an, 8 davon, obwohl Repeater sie weitergegeben hatten. Am stärksten betroffen war eine Station, die 14-mal anfragte: Eine ihrer Aufgaben wurde sechsmal verschickt, bis die Lösung eintraf. 7 der 8 Stationen lösten dennoch mindestens eine Aufgabe.
- **Einzelne Anfragen gingen im Betrieb unter.** Von den 73 Anfragen während der Aufgabenvergabe blieben 3 ohne Antwort, eine davon kurz vor Schluss. Eine Station erhielt dadurch überhaupt keine Aufgabe. Drei weitere Stationen wurden erst nach 7 bis 8 Minuten und erneuter Anfrage versorgt – ihre Anfragen fielen in die Zeit, in der die Leitstelle eine nicht angekommene Aufgabe immer wieder verschickte. Nach Ende der Aufgabenvergabe um 19:46 Uhr fragten noch fünf Stationen an.
- **19 Aufgaben blieben ohne Lösung bei der Leitstelle.** 8 davon kamen nachweislich nicht an, eine kam an, wurde aber ohne Aufgabennummer beantwortet. Bei den übrigen 10 bleibt offen, ob die Aufgabe oder die Lösung verloren ging oder die Station nicht mehr aktiv war; drei davon wurden erst in den letzten sechs Minuten der Aufgabenvergabe verschickt. Vier Aufgaben wurden von keinem Repeater weitergegeben und haben die Umgebung der Leitstelle vermutlich nie verlassen. Umgekehrt war bei jeder beantworteten Aufgabe mindestens eine Weitergabe zu hören.
- Fünf Aufgabennummern wurden an zwei verschiedene Stationen vergeben. Dank der Anrede blieben die Stränge unterscheidbar, eindeutige Nummern erleichtern aber die Auswertung.
- In vier Strängen wurde bestätigt, ohne dass eine passende Lösung im Mitschnitt vorliegt. Eine eingegangene Lösung blieb unbestätigt.
- Zwei Stationen wurden von der Leitstelle auf einen fehlenden oder falschen Region-Scope hingewiesen.
- An einem Repeater wurde während der Übung eine Auslastung von 9,8&nbsp;% beobachtet – üblich sind zu dieser Uhrzeit 6–7&nbsp;%.

#### Für die nächste Übung

- Aufgabennummern fortlaufend und nur einmal vergeben.
- **Leitstelle:** Anfragen und verschickte Aufgaben je Station mitschreiben, damit in Spitzenzeiten keine Anfrage untergeht. Fragt eine Station erneut, die noch offene Aufgabe mit derselben Nummer wiederholen.
- **Teilnehmer:** Kommt nach zwei bis drei Minuten keine Aufgabe oder Bestätigung an, die Nachricht wiederholen – in einem verlustbehafteten Netz gehört das dazu. Vorher lohnt sich etwas Geduld: Über viele Hops kann eine Nachricht deutlich länger unterwegs sein.
- Den Region-Scope vor der Übung prüfen und klar kommunizieren.
- Den Kanal während des Übungsverkehrs möglichst nur für Übungsnachrichten nutzen.

### Fazit

Der neue Ablauf mit festem Nachrichtenwechsel hat sich bewährt: Von den 59 verschickten Aufgaben durchliefen 39 (66&nbsp;%) den vollständigen Nachrichtenwechsel von der Anfrage bis zur Bestätigung durch die Leitstelle – bei rund 300 Nachrichten in 50 Minuten und deutlich mehr Stationen als im März. Gleichzeitig hat die Übung gezeigt, dass im Mesh Nachrichten verloren gehen und Wiederholungen zum Ablauf gehören – und dass die Leitstelle in Spitzenzeiten einen verlässlichen Überblick über offene Anfragen braucht. Herzlichen Dank an alle Teilnehmer!

</details>

<details>
   <summary>
      <strong>Bonn am 12. März 2026 (Landesweiter Warntag NRW)</strong>
   </summary>

Liebe Funkamateure und Hobbyfunker,

anlässlich des **Landesweiten Warntags Nordrhein-Westfalen** findet am **Donnerstag, den 12. März 2026** im Rahmen einer Notfunkübung des **DARC Distrikts G** eine kleine lokale Übung im Großraum Bonn statt.

Gegen **11:00 Uhr** ertönen die Sirenen – wir nutzen den Anlass für einen Verbindungs- und Belastungstest über verschiedene Kommunikationswege.


## Teilnahme und Funkbereiche

<img src="/img/darc-notfunk-logo.png" alt="DARC Notfunk Logo" className="logo-float-right" />

**Großraum Bonn:**
- Amateurfunk (2m FM über DBØDBN)
- MeshCore <span className="tag-gray">(Kanal: #emergency, LoRa `EU/UK (Narrow)`)</span>
- Meshtastic <span className="tag-gray">(Kanal: emergency mit PSK `AQ==`, LoRa `SHORT_SLOW`)</span>

## Zeitplan

**10:50 – 11:10 Uhr:** Sprechfunk über **DBØDBN**, Verbindungstest

**11:15 – 11:30 Uhr:** **MeshCore**, Kanal: #emergency – Belastungstest

**11:40 – 11:55 Uhr:** **Meshtastic**, Kanal: emergency – Belastungstest

---

## Auswertung

Diese Auswertung bezieht sich ausschließlich auf den Mesh-Teil der Übung und ist für die Mesh-Rheinland-Community bestimmt.

Die Übung war ein voller Erfolg: Trotz des engen Zeitfensters an einem normalen Werktag beteiligten sich jeweils **9 Teilnehmer** an beiden Mesh-Abschnitten.

### Sprechfunk auf DBØDBN

Der Sprechfunkbetrieb über **DBØDBN** verlief störungsfrei. 9 OMs meldeten sich auf dem Relais. Signalstärke und Verständlichkeit waren bei allen Verbindungen durchgehend hervorragend.

### MeshCore

Der Verkehrskreis auf dem #emergency-Kanal verlief geordnet. Die Teilnehmer meldeten sich an, beantworteten die gestellten Aufgaben und meldeten sich zum Abschluss korrekt ab.

Die Leitstelle hatte zeitweise Schwierigkeiten, eigene Nachrichten abzusetzen. Genau das zeigt den Wert solcher Übungen: Schwachstellen werden sichtbar, bevor sie im Ernstfall zählen.

### Meshtastic

Die Netzabdeckung am Standort der Leitstelle war durchgehend gut, die Leitstellen-Anbindung stabil und die Kommunikation verlief zuverlässig.

### Fazit

Ein starkes Zeichen der Community – engagiert, pünktlich und gut vorbereitet. Herzlichen Dank an alle Teilnehmer!

### Teilnehmer

In zufälliger Reihenfolge: Franz-Peter, Ulli, Martin, Linus, Martin, Marcus E., Andres, Kaiser, Alex, Stephan, Colin, Marcus, Jörn, Patrick, Marc, Basti, Alexander, Roland, Samuel und Tom.


---

*Mathias, DL3KE*<br/>
*Notfunkreferent im DARC Distrikt G, Notfunk Bonn*

</details>

<details>
   <summary>
      <strong>Leverkusen am 12. März 2026 (Landesweiter Warntag NRW)</strong>
   </summary>

Zum landesweiten Warntag am **12. März 2026** war auch die Notfunkgruppe in Leverkusen aktiv. Während ab **11:00 Uhr** die Warnmittel ausgelöst wurden, arbeitete die mobile Leitstelle **DL0THO/p** unter realistischen Bedingungen.

Auf **145,3625 MHz** beteiligten sich zwischen **10:45 Uhr und 12:45 Uhr** insgesamt **14 Stationen** am Notfunkverkehrskreis. Zusätzliche Rückmeldungen gingen über Signal und WhatsApp bei der Leitstelle ein.

Erfasst wurde vor allem, wie gut Sirenen und Warnmeldungen auf Mobiltelefonen wahrgenommen wurden. Diese Ergebnisse werden dem Bevölkerungsschutz zur Verfügung gestellt. Auch aus anderen Notfunkkreisen des Distrikts kamen positive Rückmeldungen, was auf eine gute Beteiligung und wachsendes Interesse am Thema Notfunk hindeutet. Für das Team in Leverkusen war der Warntag damit zugleich ein praxisnaher Test der mobilen und autarken Leitstelle.

Gemeinsam stärken wir den Bevölkerungsschutz in Leverkusen.

[Artikel auf G11-Seite](https://www.darc.de/der-club/distrikte/g/ortsverbaende/11/nachrichten-details/news/notfunk-an-warntagen-unterstuetzt-bevoelkerungsschutz/)

---

*Achim, DG3KBF*<br/>
*Notfunkreferent im DARC Distrikt G, Notfunk Leverkusen*

</details>

<details>
   <summary>
      <strong>Leverkusen am 21. Februar 2026 (Notfunkübung des Distrikts G)</strong>
   </summary>

Im Rahmen der **Notfunkübung des Distrikts G Köln/Aachen am 21. Februar 2026** wurde in Leverkusen erstmals ein gezielter **Meshtastic-Test** durchgeführt. Ziel war es, die Kommunikation zwischen den KIEZ-Betreuungspunkten und der Leitstelle unter Praxisbedingungen zu erproben.

Das Ergebnis fiel überwiegend positiv aus: Von **acht angefahrenen Standorten** konnten an **sieben** Standorten Nachrichten erfolgreich zur Leitstelle und wieder zurück übermittelt werden. Die direkte 1-zu-1-Kommunikation zwischen mobilem Knoten und Leitstelle funktionierte damit in den meisten Fällen zuverlässig.

Die Übung machte aber auch deutlich, wo Meshtastic im Notfunkkontext noch Grenzen hat. Schwierigkeiten zeigten sich vor allem beim Routing sowie bei unterschiedlich konfigurierten Knoten im Mesh-Verbund. Dadurch wurden Nachrichten im eigens eingerichteten Kanal **"Notfunk-G11"** nur teilweise erfolgreich bis zur Leitstelle weitergeleitet.

Auch im öffentlichen Kanal **"ShortSlow"** kamen nicht alle Meldungen wie gewünscht an. Das unterstreicht, dass gerade 1-zu-N-Kommunikation in Meshtastic anspruchsvoll sein kann. Weitere praktische Tests sind deshalb vorgesehen. Dabei sollen auch alternative Ansätze wie **MeshCore** weiter betrachtet werden, das sich bei der Übung im Raum Bonn als robuster erwiesen hat.

[Der ausführliche Bericht kann hier angesehen und/oder herunterladen werden.](https://www.darc.de/fileadmin/filemounts/distrikte/g/ortsverbaende/11/Content/2026/2026_02_Notfunk%C3%BCbung_mit_Meshtastic_Test_in_Leverkusen_-_Fazit.pdf)

Weitere Informationen folgen.

[Artikel auf G11-Seite](https://www.darc.de/der-club/distrikte/g/ortsverbaende/11/nachrichten-details/news/notfunkuebung-2026-meshtastic-auf-dem-pruefstand/)

---

*Philip, DN9PHI*<br/>
*Michael, DO6WPM*<br/>
*Notfunker im DARC Distrikt G, Notfunk Leverkusen*

</details>

---

## Wer kann teilnehmen?

Alle Funkamateure und Hobbyfunker im Rheinland sind willkommen – unabhängig von Erfahrung oder Ausrüstung. Die Übung dient der Vorbereitung auf echte Notfallsituationen und dem Austausch untereinander.

---

## Übungsablauf auf den Mesh-Netzwerken

Die Leitstelle ist auf dem Kanal **emergency** erreichbar. Der Ablauf orientiert sich an den Grundsätzen des Notfunk-Sprechverkehrs – angepasst für die Textkommunikation im Mesh-Netzwerk.

1. **Anmeldung**

   Sendet eine Nachricht mit eurem Namen und Standort an die Leitstelle:

   > `[Name], Standort [Ort] meldet sich an den Notfunkverkehrskreis an`

   Die Leitstelle bestätigt die Anmeldung. Nach der Bestätigung erhaltet ihr ggf. eine Aufgabe.

2. **Aufgabe bearbeiten**

   Die Leitstelle stellt euch eine Frage oder Aufgabe. Beantwortet sie öffentlich im Kanal. Korrekturen leitet ihr mit **„Ich berichtige"** ein.

   Beispiele:

   - Wie lautet die Adresse der nächsten Apotheke?
   - Wie viele Tage könnt ihr bei Stromausfall funken?
   - Habt ihr eine aktuelle BBK-Broschüre?

   <br/>

3. **Abmeldung**

   Gegen Ende der Übung meldet euch ab:

   > `[Name] meldet sich vom Notfunkverkehrskreis ab`

   Die Leitstelle bestätigt die Abmeldung.

---

## Übungsablauf Option B {/* #uebungsablauf-option-b */}

:::info[Fester Nachrichtenwechsel]
Bei diesem Ablauf arbeiten wir mit einem festen **Nachrichtenwechsel** aus vier Nachrichten. Nicht die Aufgabe selbst steht im Vordergrund, sondern der vollständige und sauber adressierte Ablauf von der Anfrage bis zur Bestätigung. Eingesetzt wurde er erstmals bei der Übung am 10. September 2026 auf MeshCore.
:::

Die Leitstelle meldet sich auf dem Kanal **#emergency** als **`@LST-BN`**. Jede Nachricht beginnt mit der Anrede des Gegenübers (`@LST-BN` bzw. `@Teilnehmer`), damit die einzelnen Kommunikationsstränge im Kanal auseinandergehalten werden können. Die Leitstelle vergibt zu jeder Aufgabe eine **Aufgabennummer** (z. B. `A1`), die in allen folgenden Nachrichten mitgeführt wird.

1. **Aufgabe anfordern**

   Fordert bei der Leitstelle eine Aufgabe an:

   > `@LST-BN Aufgabe?`

2. **Aufgabe erhalten**

   Die Leitstelle antwortet mit der Aufgabennummer und der Aufgabe:

   > `@Teilnehmer A1: 1+1?`

3. **Aufgabe lösen**

   Antwortet der Leitstelle mit Aufgabennummer, Aufgabe und Lösung:

   > `@LST-BN A1: 1+1=2`

4. **Bestätigung**

   Die Leitstelle bestätigt den Empfang:

   > `@Teilnehmer: A1: Verstanden!`

Damit ist der Nachrichtenwechsel abgeschlossen. Anschließend könnt ihr mit `@LST-BN Aufgabe?` die nächste Aufgabe anfordern – so oft ihr möchtet.

:::tip
Es geht **nicht** um die Mathematik, sondern um den vollständigen Nachrichtenwechsel.
:::