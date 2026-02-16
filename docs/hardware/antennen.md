---
sidebar_position: 3
---

# Antennen

Antennenempfehlungen für 868 MHz, gesammelt aus Erfahrungsberichten der Rheinland-Community.

## Grundlagen

Alle Meshtastic- und MeshCore-Geräte im Rheinland senden auf **868 MHz**. Eine gut abgestimmte Antenne auf genau dieser Frequenz macht in der Praxis den größten Unterschied.

Worauf es ankommt:

- **Resonanzfrequenz**: Die Antenne muss auf 868 MHz abgestimmt sein. Viele günstige Antennen resonieren auf ~915 MHz oder ~1000 MHz und bringen kaum Mehrwert gegenüber dem mitgelieferten Stummel.
- **SWR** (Stehwellenverhältnis): Misst, wieviel Energie abgestrahlt wird statt zum Sender zurückzufließen. SWR 1,5 bedeutet ~4 % Rücklaufleistung (0,2 dB Verlust) – noch akzeptabel. SWR 2,0 bedeutet bereits ~11 % (0,5 dB) – im Amateurfunk toleriert, für LoRa-Geräte mit knappem Linkbudget und Akkubetrieb aber ungünstig. Ein NanoVNA (~34 € auf AliExpress) macht Fehlkäufe sichtbar.
- **Schmalbandigkeit**: LoRa-Module haben eine schlechte Selektivität - sie können Signale außerhalb der Zielfrequenz kaum herausfiltern. Breitbandige Antennen nehmen deshalb auch starke Mobilfunksignale (z. B. GSM-900) auf und sättigen den Empfänger, was die Reichweite verschlechtert. Schmalbandig auf 868 MHz abgestimmte Antennen verringern dieses Problem deutlich.
- **Anschluss**: SMA reicht für Indoor und mobile Nutzung. Für Außenmontage ist N-Typ zu bevorzugen - wetterbeständiger und robuster.
- **Kabel**: CFD400/LMR-200 verliert ca. 1,2 dB pro 5 m, H155 ca. 1,5 dB, RG-58 dagegen ca. 3,3 dB.

:::warning
Die mitgelieferten Stummelantennen sind häufig mangelhaft - teils auf 915 MHz optimiert. Schon eine günstige Gizont-Antenne bringt deutlich mehr Reichweite.
:::

## Empfohlene Antennen

**Kompakt und portabel**

### Gizont Peitschen-Antenne

| Eigenschaft | Details |
|---|---|
| Gewinn | ~3,5 dBi |
| Länge | 16 cm |
| Anschluss | SMA |
| Preis | ~10–15 € |

Community-Favorit. Klein und leicht, in Tests besser als viele deutlich teurere Antennen. Nicht alle Exemplare sind gleich abgestimmt - die Variante **mit silbernem Ring am Gewinde** schneidet schlechter ab.

### Eightwood 868 MHz Antenne

| Eigenschaft | Details |
|---|---|
| Gewinn | 3,5 dBi |
| Anschluss | RP-SMA |
| Preis | ~8–12 € (Doppelpack) |

Günstig auf Amazon als Doppelpack erhältlich. In SNR-Tests auf 35 km ca. +4 dB besser als Stummelantenne.

**Outdoor und stationär**

### MikroTik 868 Omni Antenna

| Eigenschaft | Details |
|---|---|
| Gewinn | 6,5 dBi |
| Bandbreite | 862–876 MHz |
| Anschluss | SMA, inkl. 1 m Kabel |
| Preis | ~45–50 € |

SWR 1,2 gemessen beim Meshcore-Meeting in Bonn. Der schmale Frequenzbereich ist ein Vorteil gegenüber breitbandigen Alternativen.

:::warning
Es gibt mehrere ähnlich aussehende Modelle (868 MHz, 915 MHz, Vorgängerversion). Auf Amazon kursiert teils das Vorgängermodell - im Zweifelsfall SWR messen.
:::

### Ziisor 8 dBi

| Eigenschaft | Details |
|---|---|
| Gewinn | 8 dBi |
| Länge | ~55 cm |
| Anschluss | N-Stecker |
| Preis | ~15–25 € |

Gute Messwerte: SWR 1,17, Resonanz bei 868 MHz. Beim Kauf auf die 868-MHz-Version achten, nicht 915 MHz.

### ALFA Network AOA-868-5ACM

| Eigenschaft | Details |
|---|---|
| Gewinn | 5 dBi |
| Anschluss | N-Stecker |
| Preis | ~14 € |

Kompakte Outdoor-Antenne mit N-Anschluss. Auch mit Magnetfuß (IP65, 3 m LMR-200-Kabel) erhältlich (~24 €).

### Sirio GP 868C

| Eigenschaft | Details |
|---|---|
| Gewinn | 5,14 dBi |
| Frequenzbereich | 835–900 MHz |
| Anschluss | N-Buchse |
| Preis | ~58 € |

Klassische Ground-Plane-Basisantenne aus dem Amateurfunkbereich.

**Richtantennen**

### Interline Panel-Antenne

| Eigenschaft | Details |
|---|---|
| Gewinn | 8 dBi |
| Bandbreite | 860–880 MHz |
| Öffnungswinkel | 70° |
| Anschluss | N-Buchse |

In Feldtests auf 35 km SNR +5,7 gegenüber SNR -12 mit Stummelantenne. Richtantennen verbessern nicht nur den Gewinn, sondern unterdrücken auch Rauschen aus anderen Richtungen.

### Interline Horizon 868

| Eigenschaft | Details |
|---|---|
| Gewinn | 5–8 dBi |
| Besonderheit | Eingebauter Bandpassfilter |
| Anschluss | N-Buchse |
| Preis | ~90 € |

Empfehlenswert wenn Störsender in der Nähe sind - der Bandpassfilter schützt vor Übersättigung durch Mobilfunksignale.

## Eigenbau

Selbstgebaute Antennen können sehr gute Ergebnisse liefern, sofern mit einem VNA abgestimmt wird. Beliebte Varianten:

:::tip Abstimmung im Gehäuse vornehmen
Wer die Antenne in einem Kunststoffrohr oder -gehäuse unterbringt, sollte die Abstimmung mit dem VNA **im eingebauten Zustand** durchführen. Das umgebende Kunststoffmaterial erhöht die Dielektrizitätszahl und verschiebt die Resonanzfrequenz je nach Material und Wandstärke nach unten. Eine freistehend auf 868 MHz abgestimmte Antenne kann im Rohr dann auf 840 MHz oder tiefer resonieren.
:::

- **Lambda/4 Groundplane** - einfach zu bauen, gleichmäßiges Rundstrahldiagramm
- **J-Pole / Slim Jim** - gut für Rohrmontage
- **Moxon** - Richtantenne, 3D-druckbare Halterungen verfügbar; ca. +3 dB gegenüber Peitschen-Antenne
- **Yagi** - stärkste Richtwirkung, aufwändigerer Aufbau

Anleitung GP-Antenne für 868 MHz: [DARC OV O38 Bericht](https://www.darc.de/fileadmin/filemounts/distrikte/o/ortsverbaende/38/Downloads/Bericht_868MHz_Antennen_V2.0.pdf)

## Vergleich

| Antenne | Gewinn | Anschluss | Preis | Einsatz |
|---|---|---|---|---|
| Gizont Peitschen-Antenne | ~3,5 dBi | SMA | ~10–15 € | Portabel |
| Eightwood | 3,5 dBi | RP-SMA | ~8–12 € | Portabel |
| MikroTik 868 Omni | 6,5 dBi | SMA | ~45–50 € | Outdoor |
| Ziisor 8 dBi | 8 dBi | N | ~15–25 € | Outdoor |
| ALFA AOA-868-5ACM | 5 dBi | N | ~14 € | Outdoor |
| Sirio GP 868C | 5,14 dBi | N | ~58 € | Outdoor |
| Interline Horizon 868 | 5–8 dBi | N | ~90 € | Outdoor, mit Filter |
