---
sidebar_position: 4
---

# Unterstützte Sensoren

Meshtastic kann über das Telemetry‑Modul angeschlossene Sensoren auslesen und die Messwerte als Telemetrie‑Nachrichten über das Mesh übertragen. Unterstützte Sensoren am I²C‑Bus werden beim Start der Firmware automatisch erkannt. Das ermöglicht neben der reinen Kommunikation auch Monitoring, Wetterstationen oder Umweltdatenerfassung.

## Telemetrie‑Kategorien

Das Telemetry‑Modul gliedert sich in vier Kategorien:

- **Gerätemetriken:** Akkustand, Spannung, Kanalauslastung, Airtime – werden immer erfasst.
- **Umgebungsmetriken:** Temperatur, Luftfeuchtigkeit, Druck, Licht, UV, Wind, Regen u. a. – erfordern einen angeschlossenen Sensor.
- **Luftqualitätsmetriken:** Partikelkonzentrationen (PM2.5, PM10) – erfordern einen angeschlossenen Sensor.
- **Gesundheitsmetriken:** Herzfrequenz, Sauerstoffsättigung – erfordern einen angeschlossenen Sensor und müssen beim Compilieren der Firmware aktiviert werden.

Das Standard‑Sendeintervall für Telemetrie‑Nachrichten beträgt 30 Minuten.

## Aktivierung

Das Telemetry‑Modul ist per Voreinstellung aktiv für Gerätemetriken. Umgebungs‑, Luftqualitäts‑ und Gesundheitsmetriken müssen in den Moduleinstellungen aktiviert werden – per App, Web‑Interface oder CLI.

:::note Messintervall
Für Nodes mit Akku oder Solar empfiehlt es sich, das Sendeintervall großzügig zu wählen (z. B. alle 15–30 Minuten), um die Laufzeit zu verlängern.
:::

## Unterstützte Sensorarten

- Temperatur und Luftfeuchtigkeit: z. B. AHT10, BME280, SHT31
- Barometrischer Druck: z. B. BMP280, DPS310
- Licht und UV: z. B. OPT3001, LTR390UV, BH1750
- Strom und Spannung: z. B. INA219, INA260
- CO₂: SCD4X
- Regen: DFROBOT_RAIN
- Partikel (Luftqualität): PMSA003I
- Herzfrequenz und Körpertemperatur: MAX30102, MLX90614 (Health Metrics)

## I²C‑Schnittstelle

I²C‑Leitungen sollten möglichst kurz bleiben, idealerweise unter 30 cm. Längere Kabel funktionieren besser geschirmt oder als Twisted Pair. Achte auf saubere 3,3 V‑Pull‑Ups – viele Boards bringen diese bereits mit. Feuchtigkeit ist der natürliche Feind von I²C; Schrumpfschlauch, Silikon oder ein Gehäuse schützen die Verbindungen. Wenn ein Sensor beim Start nicht erkannt wird oder Messwerte ausbleiben, liegt die Ursache fast immer an der I²C‑Verkabelung.

## Praxisbeispiele

### Wetter‑Node (Outdoor)

Ein BME280 liefert Temperatur, Luftfeuchtigkeit und Druck. Ergänzend lassen sich ein LTR390UV für UV‑Strahlung, ein DFROBOT_RAIN als Regenmesser und ein DFROBOT_LARK für Windrichtung und -geschwindigkeit anschließen. Meshtastic fasst alle Messwerte in einer Telemetrie‑Nachricht zusammen und überträgt sie im konfigurierten Intervall.

### Energie‑Node

INA219 oder INA260 liefern Strom und Spannung. Das Telemetry‑Modul überträgt diese Werte zusammen mit den internen Gerätemetriken, sodass der Ladezustand einer Solar‑ oder Batterieinstallation remote überwacht werden kann.

### Mobile Telemetrie

Ein BME280 genügt für Temperatur, Luftfeuchtigkeit, Druck und Höhenschätzung. Bei tragbaren Geräten sind die Temperaturwerte eingeschränkt aussagekräftig, da Körperwärme oder direkte Sonneneinstrahlung die Messung beeinflussen.

:::note Hinweis für mobile Geräte
Sensorwerte können durch **Körperwärme, direkte Sonneneinstrahlung oder Berührung** verfälscht werden.
:::

### Outdoor‑Einsatz und Gehäuse

Temperatur‑ und Feuchtesensoren gehören in ein belüftetes Gehäuse (Stevenson‑Screen), UV‑Sensoren brauchen freie Sicht nach oben, Regenmesser müssen waagerecht stehen.

:::note Kondenswasser
Feuchtigkeit im Gehäuse kann die Sensoren beeinflussen.
:::

## Sensorübersicht

| **Sensor** | **I²C‑Adresse** | **Messwerte** |
|---|---|---|
| AHT10, AHT20 | `0x38` | Temperatur, Luftfeuchtigkeit |
| BMP085, BMP180 | `0x76`, `0x77` | Temperatur, barometrischer Druck |
| BMP280 | `0x76`, `0x77` | Temperatur, barometrischer Druck |
| BME280 | `0x76`, `0x77` | Temperatur, barometrischer Druck, Luftfeuchtigkeit |
| BMP388 | `0x76`, `0x77` | Barometrischer Druck, Temperatur |
| BMP390 | `0x76`, `0x77` | Barometrischer Druck, Temperatur |
| BME68x | `0x76`, `0x77` | Temperatur, barometrischer Druck, Luftfeuchtigkeit, Luftwiderstand |
| DPS310 | `0x76`, `0x77` | Barometrischer Druck, Temperatur |
| MCP9808 | `0x18` | Temperatur |
| PCT2075 | `0x37` | Temperatur |
| INA219 | `0x40`, `0x41`, `0x43` | Strom, Spannung |
| INA226 | `0x40`, `0x41`, `0x43` | Strom, Spannung |
| INA260 | `0x40`, `0x41`, `0x43` | Strom, Spannung |
| INA3221 | `0x42` | 3‑Kanal Strom, Spannung |
| LPS22 | `0x5C`, `0x5D` | Barometrischer Druck |
| SHTC3 | `0x70` | Temperatur, Luftfeuchtigkeit |
| SHT31 | `0x44`, `0x45` | Temperatur, Luftfeuchtigkeit |
| SHT4X | `0x44`, `0x45` | Temperatur, Luftfeuchtigkeit |
| OPT3001 | `0x44`, `0x45` | Lichtintensität |
| VEML7700 | `0x10` | Lichtintensität |
| TSL2561 | `0x29` | Lichtintensität |
| TSL2591 | `0x29` | Lichtintensität |
| BH1750 | `0x23` | Lichtintensität |
| LTR553ALS | `0x23` | Lichtintensität |
| LTR390UV | `0x53` | UV‑Lichtintensität |
| RCWL9620 | `0x57` | Ultraschall‑Entfernungssensor |
| PMSA003I | `0x12` | Partikelkonzentration (PM2.5, PM10) |
| SCD4X | `0x62` | CO₂, Temperatur, Luftfeuchtigkeit |
| DFROBOT_LARK | `0x42` | Temperatur, barometrischer Druck, Luftfeuchtigkeit, Windrichtung, Windgeschwindigkeit |
| DFROBOT_RAIN | `0x1D` | Regenmesser (Tip Bucket) |
| RadSens | `0x66` | Radioaktivitäts‑Dosimeter |
| MAX30102 | `0x57` | Herzfrequenz, Sauerstoffsättigung |
| MLX90614 | `0x5A` | Körpertemperatur (IR) |
| MLX90632 | `0x3A` | Körpertemperatur (IR) |
| NAU7802 | `0x2A` | 24‑Bit‑Differenz‑ADC (Wägezellen) |
| MAX17048 | `0x36` | Batterie‑Ladezustand |
| CW2015 | `0x62` | Batterie‑Ladezustand |
| RAK12035 | `0x20`, `0x21`, `0x22` | Bodenfeuchtigkeit, Bodentemperatur |

Eine aktuelle Übersicht zu den unterstützten Sensoren und Konfigurationsoptionen findet sich in der [Meshtastic‑Dokumentation zum Telemetry‑Modul](https://meshtastic.org/docs/configuration/module/telemetry/).
