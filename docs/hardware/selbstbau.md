---
sidebar_position: 4
---

# Selbstbau

DIY-Projekte für Meshtastic und MeshCore Hardware.

## Grundlagen Solar-Node

Bevor du anfängst zu bauen, ein paar wichtige Punkte:

### Chip-Wahl ist entscheidend für Solar

Der größte Faktor für den Erfolg eines Solar-Nodes ist der verbaute Mikrocontroller-Chip:

| Chip | Gerät | Verbrauch (Betrieb) | Solarpanel (Min.) |
|------|-------|--------------------|--------------------|
| **nRF52840** | RAK4631, T114, Seeed XIAO | ~8 mA | ab 3 W (1 W absolutes Minimum) |
| **ESP32** | Heltec V3/V4, T-Beam | ~50 mA | >5 W (Winter: kaum machbar) |

> "Sofern du einen ESP32 nutzt, wäre bei dieser Jahreszeit wohl ein 120-Watt-Panel vonnöten ... Wenn du eine Node mit nRF52-Chip verwendest, kann auch ein 1-Watt-Panel reichen."

Ein nRF52-basierter Node verbraucht auf den Tag gerechnet ca. **300 mAh**, ein ESP32-Node ca. **1300 mAh**.

### Laderegler und Schutzschaltung

Hinter jedes Solarpanel gehört zwingend ein **Laderegler** – eine direkte Verbindung von Panel zu Akku kann das Gerät zerstören (Überspannung, unkontrolliertes Laden).

Zusätzlich brauchen rohe 18650-Zellen (unprotected) eine **Schutzschaltung (BMS)**, die vor Tiefentladung und Überladung schützt.

> ⚠️ Akkus nie bei Temperaturen unter 0 °C laden – ein Laderegler schützt nicht vor Kälteschäden.

---

## Build 1 – RAK WisBlock Solar-Node

Die beliebteste und zuverlässigste Variante, besonders für schwer zugängliche Standorte.

### Bauteile

| Bauteil | Empfehlung | Hinweise |
|---------|-----------|---------|
| **LoRa-Modul** | RAK4631 (nRF52840, SX1262) | 868 MHz EU-Version |
| **Baseboard** | RAK19003 (kompakt) oder RAK19007 | 19003 ist halb so groß, reicht für Meshtastic |
| **Akku** | 3–4× 18650 parallel (je ~3000 mAh) oder Boston Power Swing 5300 | Mind. 3 Ah empfohlen |
| **Solarpanel** | 3 W, 5 V (10-zellig) | Direkt an RAK-Eingang anschließbar (max. 5,5 V) |
| **Schutzschaltung** | Mini-BMS-Board | Schaltet bei ~2,8 V ab und bei Sonnenstrom wieder an |
| **Laderegler** | Eingebaut im RAK-Baseboard | Kein MPPT; alternativ CN3791 für höhere Effizienz |
| **Gehäuse** | Aluminium IP66 oder Pollin-Modulgehäuse | Inkl. Kabelverschraubungen abdichten |

### Strombedarf und Dimensionierung

- Betrieb: ~8 mA + Sendebursts
- Tagesverbrauch: ~300 mAh
- 4× 18650 (≈ 12 Ah): Puffer für **4–6 Wochen** ohne Sonne
- 3-W-Panel: lädt bei Sonne mit ~200 mA (maximaler RAK-Eingang)

> "Nummer 1: 4 Wochen kaum Sonne, jetzt wieder 3 Tage Sonne... ca. 8000 mAh Speicher, 3 W Solar, unverschattet – der 3-W-Regler lädt mit der maximalen Leistung des RAK-Eingangs, 200 mAh."

### Wichtige Hinweise

- **Solarpanel:** Unbedingt 10-zellige Panels verwenden (max. 5,5 V Leerlaufspannung) für den direkten Anschluss. Bei 12-zelligen Panels zwingend externen Laderegler verwenden.
- **Abdichtung:** Gehäuse gründlich abdichten – Temperaturschwankungen erzeugen einen Pumpeffekt, der Feuchtigkeit ansaugt. Ggf. Klimastutzen oder kleines Druckausgleichsloch am tiefsten Punkt.
- **OTA-Updates:** Funktionieren zuverlässig über Monate hinweg ohne physischen Zugang.

### Bekannte Variante: RAK + Unify Enclosure

Eine weitere bewährte Kombination:

- **Board:** RAK19007 + RAK4631
- **Gehäuse:** [RAK Unify Enclosure (IP67)](https://store.rakwireless.com/products/unify-enclosure-ip67-150x100x45mm-with-pre-mounted-m8-5-pin-and-rp-sma-antenna-ip-rated-connectors)
- **Akku:** 3000 mAh LiPo
- **Ergebnis:** Akku geht "niemals unter 80 %" – selbst bei anhaltend schlechtem Wetter

---

## Build 2 – Heltec T114 Solar-Node

Der einfachste Einstieg in den Solar-Selbstbau – alles nötige bereits auf dem Board integriert.

### Bauteile

| Bauteil | Empfehlung | Hinweise |
|---------|-----------|---------|
| **LoRa-Modul** | Heltec T114 (nRF52840, SX1262) | ab ca. 17 €, eingebauter Solar- & Akku-Anschluss |
| **Akku** | LiPo 1100–10000 mAh oder 18650 | JST-PH-2-Stecker (1,25 mm) |
| **Solarpanel** | 1–3 W, 5 V (10-zellig) | Direkt an Solar-Eingang anschließen |
| **Laderegler** | Eingebaut (kein MPPT) | Lädt mit max. 1 A |
| **Gehäuse** | IP65/66 Kunststoff oder Alu | Kein HT-Rohr ohne Abdichtung! |

### Dimensionierung

- **1 W Panel** – absolutes Minimum, nur für perfekt ausgerichtete Standorte mit viel Sonne und großem Akku-Puffer
- **3 W Panel** – empfohlene Standardgröße für die meisten Standorte
- Mit 4× 18650 (≈ 12 Ah): sehr langer Puffer

> "Mit einem T114 würdest du ein Solarpanel einsparen – der Aufpreis für den T114 wird wieder eingespart, da weniger Solar und Akku gekauft werden müssen."

### Wichtige Hinweise

- Der eingebaute Laderegler arbeitet **ohne MPPT** – bei bewölktem Himmel oder schwachem Licht kann die Ladeleistung gering sein.
- Bei großen Panels (>3 W) empfiehlt sich ein **externer CN3791-MPPT-Laderegler**.
- Akku-Ladestand kann über Meshtastic-Telemetrie aus der Ferne überwacht werden.
- Frühere Firmware-Versionen hatten Probleme mit OTA-Updates im Solarbetrieb – mit aktueller Firmware behoben.

---

## Build 3 – Seeed XIAO nRF52840 + CN3791 MPPT

Maximale Effizienz durch MPPT-Laderegler – ideal für Standorte mit wenig direkter Sonne.

### Bauteile

| Bauteil | Empfehlung | Hinweise |
|---------|-----------|---------|
| **LoRa-Modul** | Seeed XIAO nRF52840 + Wio-SX1262 | Sehr kompakt, extrem sparsam |
| **Akku** | 2× 18650 parallel oder LiPo 3–6 Ah | Parallel schalten (nie in Reihe!) |
| **Solarpanel** | 5–6 W (Spannung je nach CN3791-Konfiguration) | Verschiedene Eingangsspannungen möglich |
| **Laderegler** | CN3791 MPPT-Modul | MPPT-Spannung per Widerstand konfigurierbar |
| **Schutzschaltung** | Separates BMS-Board | CN3791 schützt **nicht** vor Tiefentladung! |
| **Gehäuse** | Aluminium IP66 oder IP65 Kunststoff | |

### Linkliste

**NODE:**
- [Seeed XIAO nRF52840 + Wio-SX1262 Kit (Seeed Store)](https://www.seeedstudio.com/XIAO-nRF52840-Wio-SX1262-Kit-for-Meshtastic-p-6400.html)

**GEHÄUSE:**
- Aluminium IP66 mit Masthalterung (3D-Druck): [Amazon](https://www.amazon.de/dp/B0746L813H)
- Kunststoff IP65 (einfacher zu bearbeiten): [Amazon](https://amzn.to/4k6ehZu)

**SOLAR (Variante A – CN3791, effizienter):**
- [6-W-Panel + CN3791-Regler (Kombi)](https://s.click.aliexpress.com/e/_c3abw89z)
- [CN3791-Regler einzeln](https://s.click.aliexpress.com/e/_c3TX3DEF)

**SOLAR (Variante B – TP4057, einfacher):**
- [TP4057-Regler](https://amzn.to/4qMJG5T)
- [Panels](https://amzn.to/3NJBrZO)

**AKKU (mind. 3 Ah, parallel schalten!):**
- [18650-Halter](https://s.click.aliexpress.com/e/_c3MHQkSB)
- [LiPo 3–6 Ah](https://amzn.to/4qMDLxE)

### Wichtige Hinweise

> ⚠️ Bei manchen CN3791-Boards sind die Stecker **verpolt**. Vor dem Einbau prüfen! Außerdem können Funkstoerungen auftreten.

- CN3791 schützt nicht vor Tiefentladung – separates BMS unbedingt erforderlich!
- Akkus **parallel** schalten (gleiche Spannung, mehr Kapazität) – niemals in Reihe.
- Für niedrige Lichtverhältnisse: MPPT holt deutlich mehr Leistung aus dem Panel als einfache Laderegler.

---

## Build 4 – FakeTec v4 (Open-Source DIY-PCB)

Wer noch tiefer in den Selbstbau einsteigen möchte: Das FakeTec-PCB ist eine Open-Source-Platine, die einen ProMicro nRF52840 mit einem HT-RA62-LoRa-Modul verbindet – im kompakten Formfaktor der Heltec v2/v3-Geräte. Die PCB-Dateien können direkt bei JLCPCB für ~2 € bestellt werden.

- **GitHub-Repository (PCB-Dateien, Schaltplan):** [gargomoma/fakeTec_pcb](https://github.com/gargomoma/fakeTec_pcb)
- **Aufbauanleitung (englisch):** [adrelien.com – Build your own Meshtastic device with FakeTec PCB](https://adrelien.com/diy-meshtastic-how-to-build-your-own-meshtastic-device-with-faketec-pcb-nrf52840/)

### Verfügbare Versionen

| Version | Besonderheiten |
|---------|---------------|
| v3 | Größere Pads, 2 Drucktasten, Lade-Boost-Option |
| **v4** | Wie v3 + 3 SMD-MOSFETs für externe Hardware-Steuerung |
| v5 | Integrierten Akkuschutz, flaches Profil, JST-Stecker |
| MiniX | Kompakte v4-Variante |

### Bauteile

| Bauteil | Empfehlung | ca. Preis |
|---------|-----------|-----------|
| **PCB** | FakeTec v4 (Gerber-Dateien → JLCPCB) | ~2 € |
| **MCU** | ProMicro nRF52840 (z. B. Nice!Nano-kompatibel) | ~3–5 € |
| **LoRa-Modul** | HT-RA62 oder RA-01SH (SX1262, 868 MHz) | ~4–5 € |
| **Akku** | 2× 18650 parallel (~6 Ah gesamt) | |
| **Laderegler** | CN3791 MPPT-Modul (passt auf die Rückseite des Faketec) | |
| **Schutzschaltung** | Separates BMS-Board (Pflicht – CN3791 schützt nicht vor Tiefentladung!) | |
| **Solarpanel** | 5–6 W | |
| **Gehäuse** | Kompatibel mit Heltec v2/v3-Gehäusen | |

**Gesamtkosten Grundaufbau (ohne Akku, Solar, Gehäuse): ca. 10–11 €**

### Wichtige Hinweise

- Der CN3791-Laderegler lässt sich direkt auf die Rückseite des FakeTec-Boards montieren.
- v4 fügt gegenüber v3 drei MOSFETs hinzu – nützlich für die Steuerung externer Hardware (z. B. GPS, Sensoren).
- Für das Flashen wird ein Bootloader-Update per DFU benötigt, danach läuft die Meshtastic-UF2-Datei per Drag & Drop.
- Das nRF52840 hat **kein WiFi** – nur Bluetooth und LoRa.
- Vor dem Einbau des CN3791 prüfen: Manche Boards sind **verpolt** geliefert.

---

## Gehäuse

### Empfohlene Gehäusetypen

| Gehäuse | Vorteile | Nachteile |
|---------|---------|-----------|
| **Aluminium IP66** (Hammond o.ä.) | Robust, EMV-Abschirmung, langlebig | Schwerer zu bearbeiten |
| **Kunststoff IP65** | Günstig, leicht zu bohren | Weniger Abschirmung |
| **RAK Unify Enclosure** | Vorgefertigte Anschlüsse, IP67 | Teuer (~40–50 €) |
| **Nistkasten** | Unauffällig, gut getarnt | Wärmemanagement beachten |

### Häufige Probleme

- **Undichtes Gehäuse:** Temperaturschwankungen erzeugen einen Pumpeffekt – Luft dehnt sich aus und kühlt ab, dabei wird Feuchtigkeit angesaugt. Lösung: Druckausgleichsstutzen oder kleines Loch am tiefsten Punkt des Gehäuses.
- **Überhitzung:** Akku nie direkt der Sonne aussetzen (Brandgefahr bei LiPo!). Solarzelle so montieren, dass sie das Gehäuse beschattet.
- **HT-Rohre:** Nicht ohne weitere Maßnahmen verwenden – Regenwasser kann trotz Dichtung eindringen.

### 3D-Druck-Ressourcen

- [Meshtastic Solar Tube Node (PVC OD32mm)](https://www.printables.com/model/1316317-meshtastic-solar-tube-node-diy-pvc-od32mm/files)
- [Meshtastic Solar Station](https://www.printables.com/model/1027508-meshtastic-solar-station)

---

## Stromversorgung – Kurzübersicht

### Laderegler-Vergleich

| Regler | MPPT | Max. Eingang | Tiefentladeschutz | Besonderheiten |
|--------|------|-------------|------------------|---------------|
| RAK eingebaut | Nein | 5,5 V | Nein | Nur 10-zellige Panels |
| T114 eingebaut | Nein | – | Nein | Max. 1 A Ladestrom |
| **CN3791** | **Ja** | Konfigurierbar | **Nein** | Widerstand tauschen für verschiedene Panel-Spannungen |
| TP4056/TP4057 | Nein | ~6 V | Nein | Einfach, günstig |
| TP5100 | Nein | – | Nein | Mit USB-C-Anschluss |

### Akkutypen

| Typ | Vorteil | Nachteil |
|-----|---------|----------|
| **18650** (unprotected) | Günstig, überall verfügbar, hohe Kapazität | Braucht externes BMS |
| **18650** (protected) | BMS integriert | Etwas teurer, minimal länger |
| **LiPo-Pouch** | Kompakt, leicht | Empfindlich bei Hitze, aufblähen |
| **Boston Power Swing 5300** | Hochwertig, bis tief unter 0 °C ladbar | Teuer, schwer zu beschaffen |
| **LiFePO4 (LFP)** | Hitzebeständiger, mehr Ladezyklen | Eigener LFP-Laderegler nötig, andere Spannungskurve |

> "Mit Boston Power Swing: Halten länger als 4 gute 18650er – gemessen über 5000 mAh."

### Panelgröße nach Standort

| Bedingung | Empfohlene Panelgröße |
|-----------|----------------------|
| Sehr guter Standort (>6 h Sonne SW-Ausrichtung) | mind. 3 W; 1–2 W nur mit sehr großem Akku-Puffer |
| Normaler Standort | 3 W (nRF52) / nicht sinnvoll (ESP32) |
| Schlechter Standort / viel Verschattung | 5 W+ (nRF52), ESP32 nicht empfohlen |
| Winter-Dauerbetrieb ohne viel Sonne | Mehr Akku-Puffer statt mehr Panel |

> "1 Watt ist knapp und sollte fast einen saisonalen Speicher haben – also 10.000+, besser 20.000 mAh – dann gibt es 8 Wochen Laufzeit auf Akku."
