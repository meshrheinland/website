---
sidebar_position: 4
---

# Selbstbau

DIY-Projekte für Meshtastic und MeshCore Hardware.

## Grundlagen

Der wichtigste Faktor für einen funktionierenden Solar-Node ist der Chip:

| Chip | Geräte | Verbrauch | Solarpanel |
|---|---|---|---|
| **nRF52840** | RAK4631, T114, Seeed XIAO | ~8 mA / ~300 mAh täglich | ab 3 W |
| **ESP32** | Heltec V3/V4, T-Beam | ~50 mA / ~1300 mAh täglich | im Winter kaum machbar |

Der **Heltec V3** ist ein fertiges ESP32-Entwicklungsboard mit integriertem LoRa-Chip – günstig und weit verbreitet, aber wegen des hohen ESP32-Stromverbrauchs für dauerhaften Solarbetrieb kaum geeignet.

Hinter jedes Solarpanel gehört zwingend ein **Laderegler**. Rohe 18650-Zellen (unprotected) brauchen zusätzlich eine **Schutzschaltung (BMS)**.

:::warning
Akkus nie bei Temperaturen unter 0 °C laden – ein Laderegler schützt nicht vor Kälteschäden.
:::

## Build 1 – RAK WisBlock

Beliebteste Variante für schwer zugängliche Standorte. OTA-Updates funktionieren zuverlässig über Monate ohne physischen Zugang.

| Bauteil | Empfehlung | Hinweise |
|---|---|---|
| MCU | RAK4631 (nRF52840, SX1262) | 868 MHz EU-Version |
| Baseboard | RAK19003 oder RAK19007 | 19003 ist halb so groß, reicht für Meshtastic |
| Akku | 3–4× 18650 parallel (~3000 mAh je Zelle) | Mind. 3 Ah, ergibt ~4–6 Wochen Puffer |
| Solarpanel | 3 W, 5 V, 10-zellig | Direkt an RAK-Eingang (max. 5,5 V) |
| Schutzschaltung | Mini-BMS-Board | Schaltet bei ~2,8 V ab, bei Sonnenstrom wieder an |
| Laderegler | Eingebaut im RAK-Baseboard | Kein MPPT; alternativ CN3791 für höhere Effizienz |
| Gehäuse | Aluminium IP66 | Kabelverschraubungen abdichten |

:::warning
Nur 10-zellige Panels (max. 5,5 V Leerlaufspannung) direkt anschließen. Bei 12-zelligen Panels zwingend externen Laderegler verwenden.
:::

**Variante mit RAK Unify Enclosure:** RAK19007 + RAK4631, [Unify Enclosure IP67](https://store.rakwireless.com/products/unify-enclosure-ip67-150x100x45mm-with-pre-mounted-m8-5-pin-and-rp-sma-antenna-ip-rated-connectors), 3000 mAh LiPo – selbst bei schlechtem Wetter bleibt der Akku über 75 %.

## Build 2 – Heltec T114

Einfachster Einstieg – Solar- und Akku-Anschluss bereits auf dem Board integriert.

| Bauteil | Empfehlung | Hinweise |
|---|---|---|
| MCU | Heltec T114 (nRF52840, SX1262) | ab ca. 17 €, eingebauter Solar- & Akku-Anschluss |
| Akku | LiPo 1100–10000 mAh oder 18650 | JST-PH-2-Stecker (1,25 mm) |
| Solarpanel | 3 W, 5 V, 10-zellig | 1 W absolutes Minimum für ideale Standorte |
| Laderegler | Eingebaut (kein MPPT) | Bei > 3 W Panel externen CN3791 verwenden |
| Gehäuse | IP65/66 Kunststoff oder Alu | Kein HT-Rohr ohne zusätzliche Abdichtung |

## Build 3 – Seeed XIAO nRF52840 + CN3791

Kompaktestes Format, MPPT-Laderegler für bessere Ausbeute bei wenig direkter Sonne.

| Bauteil | Empfehlung | Hinweise |
|---|---|---|
| MCU | [Seeed XIAO nRF52840 + Wio-SX1262 Kit](https://www.seeedstudio.com/XIAO-nRF52840-Wio-SX1262-Kit-for-Meshtastic-p-6400.html) | Sehr kompakt, kommt mit Meshtastic vorgeflasht |
| Akku | 2× 18650 parallel oder LiPo 3–6 Ah | Parallel schalten, nie in Reihe |
| Solarpanel | 5–6 W | Spannung je nach CN3791-Konfiguration wählbar |
| Laderegler | [CN3791 MPPT-Modul](https://s.click.aliexpress.com/e/_c3TX3DEF) | MPPT-Spannung per Widerstand einstellbar |
| Schutzschaltung | Separates BMS-Board | CN3791 schützt **nicht** vor Tiefentladung |
| Gehäuse | [Aluminium IP66](https://www.amazon.de/dp/B0746L813H) mit Masthalterung (3D-Druck) | |

:::warning
Bei manchen CN3791-Boards sind die Stecker **verpolt** – vor dem Einbau prüfen. Außerdem können Funkstörungen auftreten.
:::

## Build 4 – FakeTec v4

Open-Source-PCB das einen ProMicro nRF52840 mit einem HT-RA62-LoRa-Modul verbindet – im Formfaktor der Heltec v2/v3-Geräte. Grundaufbau (ohne Akku, Solar, Gehäuse) für ca. 10–11 €.

- **PCB-Dateien & Schaltplan:** [gargomoma/fakeTec_pcb](https://github.com/gargomoma/fakeTec_pcb)
- **Aufbauanleitung (englisch):** [adrelien.com](https://adrelien.com/diy-meshtastic-how-to-build-your-own-meshtastic-device-with-faketec-pcb-nrf52840/)

| Bauteil | Empfehlung | ca. Preis |
|---|---|---|
| PCB | FakeTec v4 (Gerber-Dateien → JLCPCB) | ~2 € |
| MCU | ProMicro nRF52840 | ~3–5 € |
| LoRa | HT-RA62 oder RA-01SH (SX1262, 868 MHz) | ~4–5 € |
| Akku | 2× 18650 parallel (~6 Ah) | |
| Laderegler | CN3791 (passt auf die Rückseite des Boards) | |
| Schutzschaltung | Separates BMS-Board | |
| Solarpanel | 5–6 W | |
| Gehäuse | Kompatibel mit Heltec v2/v3-Gehäusen | |

Verfügbare Versionen: **v3** (größere Pads, 2 Tasten), **v4** (+ 3 MOSFETs für externe Hardware), **v5** (integrierter Akkuschutz, JST-Stecker), **MiniX** (kompakte v4-Variante).

Flashen per DFU-Bootloader, danach Meshtastic-UF2 per Drag & Drop. Kein WiFi – nur Bluetooth und LoRa.

## Gehäuse

Ein wetterfestes Gehäuse ist für Außeninstallationen entscheidend. Die Wahl zwischen Aluminium, Kunststoff oder Fertiglösung beeinflusst Schutzklasse, Bearbeitungsaufwand und Kosten.

| Gehäuse | Vorteile | Nachteile |
|---|---|---|
| **Aluminium IP66** | Robust, langlebig, EMV-Abschirmung | Schwerer zu bearbeiten |
| **Kunststoff IP65** | Günstig, leicht zu bohren | Weniger Abschirmung |
| **RAK Unify Enclosure** | Vorgefertigte Anschlüsse, IP67 | ~40–50 € |
| **Nistkasten** | Unauffällig | Wärmemanagement beachten |

Gehäuse immer mit Druckausgleichsstutzen oder einem kleinen Loch am tiefsten Punkt versehen: Temperaturschwankungen erzeugen sonst einen Pumpeffekt, der Feuchtigkeit ansaugt. Akku und Solar so anordnen, dass die Zelle das Gehäuse beschattet – LiPos blähen sich bei direkter Sonneneinstrahlung schnell auf.

**3D-Druck:**
- [Meshtastic Solar Tube Node (PVC OD32mm)](https://www.printables.com/model/1316317-meshtastic-solar-tube-node-diy-pvc-od32mm/files)
- [Meshtastic Solar Station](https://www.printables.com/model/1027508-meshtastic-solar-station)

## Laderegler

Ein Solarpanel liefert je nach Einstrahlung schwankende Spannung – ohne Laderegler würde diese ungefiltert an den Akku und ihn durch Überladung beschädigen. Der Laderegler begrenzt Spannung und Strom auf die sicheren Ladeparameter des Akkus (~4,2 V für LiPo/Li-Ion). Ein **MPPT**-Regler (Maximum Power Point Tracking) passt seinen Arbeitspunkt dynamisch ans Panel an und holt besonders bei Bewölkung oder Teilverschattung spürbar mehr Energie heraus als ein einfacher PWM-Regler.

Viele LoRa-Geräte bringen einen Laderegler bereits mit. Beim Kauf lohnt es sich zu prüfen, ob einer verbaut ist und ob sein maximaler Ladestrom für den geplanten Einsatz ausreicht. Ist ein Regler fest verbaut, muss das Solarpanel zu dessen Eingangsgrenzen passen – Spannung und Leistung des Panels dürfen den zulässigen Eingangsbereich nicht überschreiten.

| Regler | MPPT | Max. Eingang | Tiefentladeschutz | Hinweise |
|---|---|---|---|---|
| RAK eingebaut | ✗ | 5,5 V | ✗ | Nur 10-zellige Panels |
| T114 eingebaut | ✗ | – | ✗ | Max. 1 A |
| **CN3791** | **✓** | Konfigurierbar | **✗** | Widerstand für Panel-Spannung tauschen |
| TP4056/TP4057 | ✗ | ~6 V | ✗ | Einfach, günstig |
| TP5100 | ✗ | – | ✗ | Mit USB-C-Anschluss |

## Akkus

Für Solar-Nodes kommen hauptsächlich zwei Typen in Frage: **18650-Zellen** (zylindrisch, 18 × 65 mm – das gängige Rundzellen-Format aus Laptopakkus und Taschenlampen) und **LiPo-Pouches** (flache Folienzellen, oft mit JST-Stecker, wie in Smartphones). Beide haben 3,7 V Nennspannung und sind elektrisch identisch. Der Unterschied liegt in Form, Anschluss und Robustheit. 18650 sind günstiger, einzeln austauschbar und mechanisch belastbarer; LiPos passen besser in enge Gehäuse, reagieren aber empfindlicher auf Hitze und können sich bei Überhitzung aufblähen.

In der Community wird regelmäßig davor gewarnt, LiPo-Pouches (umgangssprachlich auch „Tütensuppen-Akkus") im Außenbetrieb einzusetzen: Die flexible Folienhülle bietet keinerlei mechanischen Schutz – schon leichter Druck, ein spitzer Gegenstand beim Einbau oder wiederholte Temperaturschwankungen können die Zelle beschädigen und einen Schwelbrand auslösen. 18650-Zellen sind durch ihr stabiles Metallgehäuse deutlich robuster und verzeihen raue Bedingungen erheblich besser.

Wenn eine Anleitung „LiPo" nennt und du 18650-Zellen hast: Das funktioniert, solange du einen passenden Zellenhalter und einen Steckeradapter verwendest. Spannung und Chemie sind gleich, nur der physische Anschluss unterscheidet sich. Die Kapazität bestimmt, wie viele Tage der Node ohne Sonnenlicht überbrückt – bei nRF52840-Geräten reichen schon 3 Ah für mehrere Wochen Puffer.

| Akku | Vorteil | Nachteil |
|---|---|---|
| **18650 unprotected** | Günstig, hohe Kapazität | Externes BMS erforderlich |
| **18650 protected** | BMS integriert | Minimal teurer |
| **LiPo-Pouch** | Kompakt, leicht | Empfindlich bei Hitze |
| **LiFePO4** | Hitzebeständig, mehr Zyklen | Eigener LFP-Laderegler nötig |

## Schutzschaltung (BMS)

Lithium-Akkus nehmen dauerhaften Schaden, wenn sie unter ~2,8 V entladen oder überladen werden – im schlimmsten Fall blähen sie sich auf oder entzünden sich. Eine **Schutzschaltung** (Battery Management System kurz BMS) ist eine kleine Platine, die den Akku vor **Überladung**, **Tiefentladung** und **Überstrom/Kurzschluss** schützt. Einige Boards bieten zusätzlich einen Temperatursensor, der das Laden bei Frost unterbindet – das ist für Außeninstallationen ideal, wird in der Praxis aber meist vernachlässigt: Frost ist selten, und im Winter sind die Ladeströme durch die geringe Sonneneinstrahlung ohnehin so niedrig, dass das Schadensrisiko gering bleibt.

**Protected 18650-Zellen** haben diesen Chip bereits eingebaut (erkennbar am leicht längeren Gehäuse). **Unprotected-Zellen** und LiPo-Pouches ohne eingebauten Schutz benötigen ein externes BMS-Board – in den Build-Tabellen ist das jeweils angegeben. Wichtig: Manche Laderegler (z. B. der RAK-interne) bieten einen Tiefentladeschutz; der CN3791 hingegen nicht – dort ist ein separates BMS zwingend.

## Solarpanels

Die benötigte Panelgröße hängt stark vom Standort (Ausrichtung und Winkel zur Sonne) und dem verbauten Chip ab – ESP32-Geräte verbrauchen so viel Strom, dass ein zuverlässiger Solarbetrieb im Freien kaum möglich ist.

| Standort | Empfohlene Panelgröße |
|---|---|
| Optimal (SW, >6 h Sonne) | 3 W; 1–2 W nur mit sehr großem Puffer |
| Normal | 3 W |
| Verschattet / Winter | 5 W+ |
| ESP32-basiert | Nicht für Solarbetrieb empfohlen |
