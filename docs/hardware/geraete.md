---
sidebar_position: 2
---

# Geräte

Empfohlene LoRa-Geräte für Meshtastic und MeshCore im Rheinland.

## Heltec Mesh Node T114

| Eigenschaft | Details |
|---|---|
| Preis | ~30–40 € |
| MCU | Nordic nRF52840 |
| LoRa | SX1262, 868 MHz (EU), 22 dBm Sendeleistung |
| Konnektivität | Bluetooth 5.0 (kein WiFi) |
| Display | 0.96" OLED |
| Akku | Li-Po Anschluss, kein Akku im Lieferumfang |
| GPS | Optional (L76K GNSS) |
| Formfaktor | Kompakt, gut für mobile Nutzung |

Stromsparender Einsteiger-Node dank nRF52840. Kein WiFi, daher kein MQTT-Bridge-Betrieb. Ideal als tragbares Gerät oder für stationären Betrieb. Dank des geringen Stromverbrauchs sehr beliebt für Solarbetrieb.


## Heltec V3

| Eigenschaft | Details |
|---|---|
| Preis | ~20–25 € |
| MCU | Espressif ESP32-S3 |
| LoRa | SX1262, 868 MHz (EU), 22 dBm Sendeleistung |
| Konnektivität | WiFi 2.4 GHz + Bluetooth 5.0 |
| Display | 0.96" OLED |
| Akku | Li-Po Anschluss, kein Akku im Lieferumfang |
| GPS | ✗ |
| Formfaktor | Kompakt |

Günstigster Einstieg mit vollem Funktionsumfang. Einer der meistgenutzten Nodes im Netz — gut unterstützt, viele Anleitungen verfügbar.


## Heltec V4

| Eigenschaft | Details |
|---|---|
| Preis | ~25–30 € |
| MCU | Espressif ESP32-S3 |
| LoRa | SX1262 + PA, 868 MHz (EU), bis zu 27 dBm Sendeleistung |
| Konnektivität | WiFi 2.4 GHz + Bluetooth 5.0 |
| Display | 0.96" OLED |
| Akku | Li-Po Anschluss, kein Akku im Lieferumfang |
| GPS | Optional (L76K GNSS) |
| Formfaktor | Kompakt |

Überarbeitete Version des V3 mit verbessertem Antennenanschluss und Layout. Für Neueinsteiger empfehlenswerter als der V3, da aktueller Stand der Technik.

## SenseCAP Card Tracker T1000-E

| Eigenschaft | Details |
|---|---|
| Preis | ~50–70 € |
| MCU | Nordic nRF52840 |
| LoRa | LR1110, 868 MHz (EU), 22 dBm Sendeleistung |
| Konnektivität | Bluetooth 5.1 |
| Display | ✗ |
| Akku | 700 mAh integriert |
| GPS | ✓ (AG3335) |
| Formfaktor | Kreditkartengroß (85 × 55 × 6.5 mm), IP65 |

![SenseCAP Card Tracker T1000-E](/img/hardware/devices/sensecap-card-tracker-t1000-e.jpg)

Kompakter GPS-Tracker im Kreditkartenformat mit integriertem 700 mAh Akku und IP65-Schutz. Trotz kleiner, interner Antenne erreicht er überraschend gute Reichweiten und genießt große Beliebtheit. Besonderheit: Integrierte Sensoren für Temperatur, Licht und Bewegung sowie Status-LED, Buzzer und Bedientaster. Wird mit magnetischem Ladekabel geliefert.

:::note Hinweis
Achte beim Kauf darauf, die „for Meshtastic"-Version zu wählen. [Herstellerseite](https://www.seeedstudio.com/SenseCAP-Card-Tracker-T1000-E-for-Meshtastic-p-5913.html) · [Wiki](https://wiki.seeedstudio.com/sensecap_t1000_e/) · [Forum](https://forum.seeedstudio.com/t/sensecap-t1000-e-meshtastic-tracker-user-guide/287783)
:::


## Seeed Studio Xiao nRF52840 WIO

| Eigenschaft | Details |
|---|---|
| Preis | ~35–45 € |
| MCU | Nordic nRF52840 |
| LoRa | Wio-SX1262, 868 MHz (EU), 22 dBm Sendeleistung |
| Konnektivität | Bluetooth 5.0 (kein WiFi) |
| Display | Keins (extern möglich) |
| Akku | Li-Po Anschluss |
| GPS | ✗ |
| Formfaktor | Sehr kompakt (Briefmarkengröße) |

Kleinstes verfügbares Format. XIAO-Board + Wio-SX1262-Modul werden kombiniert — einfaches Aufstecken, kein Löten notwendig. Kein Display serienmäßig, daher eher für stationären Betrieb geeignet.


## RAK Wireless WisBlock

| Eigenschaft | Details |
|---|---|
| Preis | ~50–80 € (Starter-Kit) |
| MCU | Nordic nRF52840 (RAK4631) |
| LoRa | SX1262, 868 MHz (EU), 22 dBm Sendeleistung |
| Konnektivität | Bluetooth 5.0; WiFi über optionales Modul |
| Display | Optional (Erweiterungsmodul) |
| Akku | Li-Po Anschluss |
| GPS | Optional (RAK1910 Modul) |
| Formfaktor | Modular, industrietauglich |

Modulares System: Basisboard + austauschbare Module (GPS, Sensoren, Display, Solar). Höchste Flexibilität, aber auch höchster Preis und mehr Einarbeitungsaufwand. Empfehlenswert für Fortgeschrittene oder spezielle Anforderungen (z. B. Solarknoten, Wetterstation).


## Vergleich

| Gerät | Display | WiFi | GPS | Akku-Anschluss | Solar-Anschluss | Sendeleistung |
|---|---|---|---|---|---|---|
| Heltec Mesh Node T114 | ✓ | ✗ | optional | ✓ | ✓ | 22 dBm |
| Heltec V3 | ✓ | ✓ | ✗ | ✓ | ✗ | 22 dBm |
| Heltec V4 | ✓ | ✓ | optional | ✓ | ✓ | 27 dBm |
| Seeed T1000-E | ✗ | ✗ | ✓ | ✓ (intern, 700 mAh) | ✗ | 22 dBm |
| Seeed Xiao nRF52840 WIO | ✗ | ✗ | ✗ | ✓ | ✗ | 22 dBm |
| RAK Wireless WisBlock | optional | optional | optional | ✓ | optional | 22 dBm |
