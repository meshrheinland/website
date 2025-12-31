# Meshtastic im Rheinland

Willkommen auf der Info-Seite für Meshtastic Nutzer im Rheinland. Du findest hier den Schnellstart, die in der Region genutzten Grundeinstellungen und die wichtigsten Links.

Meshtastic wird im gesamten Rheinland eingesetzt – rund um Köln, Düsseldorf, Bonn, Aachen, Wuppertal, Leverkusen, Krefeld, Mönchengladbach sowie in den Kreisen Rhein‑Erft, Rhein‑Sieg, Rhein‑Berg, Rhein‑Kreis Neuss, Heinsberg, Düren, Euskirchen und dem Bergischen Land.

## TL;DR

- Region/Band: European Union 868MHz (EU868)
- Modem‑Preset: Kurze Reichweite - Langsam (**ShortSlow**)
- WhatsApp Community: [Meshtastic Rheinland](https://chat.whatsapp.com/CRYnRrAzhYeDlQEJQZQpKi?mode=wwt) mit über 200 Mitgliedern

:::warning Lokale Vorschriften
Bitte beachte lokale Funkrichtlinien (z. B. Duty Cycle im 868‑MHz‑Band). Stelle in Meshtastic die richtige Region ein und nutze angemessene Sendeleistung. Details siehe [Radio‑Konfiguration](https://meshtastic.org/docs/configuration/radio/) in der Meshtastic‑Doku.
:::

## Schnellstart

1. Geräte‑Firmware flashen und App koppeln
2. In den LoRa‑Einstellungen die Region auf EU868 stellen
3. „Modem Preset" auf ShortSlow setzen
4. Kanal einstellen (Schlüssel optional) und mit dem Mesh testen

## Profil: ShortSlow (Rheinland‑Standard)

Im Rheinland nutzen wir einheitlich das Modem‑Profil „ShortSlow". Das sorgt für gute Reichweite bei vertretbarem Durchsatz und erleichtert die Interoperabilität im Mesh.

:::info Warum ShortSlow im Rheinland?
- **Getestet und bewährt:** In mehreren Community-Tests als optimal ermittelt
- **Nicht der Standard:** Wichtig für neue Nutzer - NICHT die Meshtastic-Standardeinstellung verwenden!
- **Rheinland-optimiert:** Robuste Reichweite in urbanen und hügeligen Gebieten
- **Mesh-Performance:** Geringe Airtime, bessere Netzwerk-Durchdringung
- **Community-Standard:** Einheitliche Basis für alle 200+ Mitglieder
:::

So stellst du es ein:

1. In der App: Geräteeinstellungen → LoRa/Modem
2. Region/Band: EU868 (Europa/Deutschland) wählen
3. „Modem Preset": „ShortSlow" auswählen und speichern

Mehr Hintergründe: [Radio‑Konfiguration (Modem‑Parameter)](https://meshtastic.org/docs/configuration/radio/)

## Community & Mesh Map

- [Mesh Rheinland Karte](https://map.meshrheinland.de)
- WhatsApp Community: [Meshtastic Rheinland](https://chat.whatsapp.com/CRYnRrAzhYeDlQEJQZQpKi?mode=wwt)

### Lokal vernetzt in vielen Städten

Köln, Düsseldorf, Bonn, Aachen, Wuppertal, Leverkusen, Krefeld, Mönchengladbach, Neuss, Solingen, Remscheid, Bergisch Gladbach und umliegende Kreise: Das Rheinland‑Mesh wächst stetig. Schau in die WhatsApp‑Gruppe für lokale Kontakte, Treffpunkte und Testrunden.

## Setup‑Basics (EU/DE)

### 1) Firmware & App

- [Offizielle Downloads](https://meshtastic.org/docs/downloads/)
- [Getting Started (Flashen/Verbinden)](https://meshtastic.org/docs/getting-started/)

### 2) Region/Band: EU868

- LoRa‑Einstellungen → Region auf EU868 setzen
- [Radio‑Konfiguration](https://meshtastic.org/docs/configuration/radio/lora/)

### 3) Kanäle

- Öffentlich zum Testen oder privat mit Schlüssel
- [Kanal‑Doku](https://meshtastic.org/docs/configuration/radio/channels/)

### 4) Rollen & Strom

- [Geräte‑Rollen (Router/Client/etc.)](https://meshtastic.org/docs/configuration/radio/device/)

## Häufige Fragen (FAQ)

**Gibt es Gruppen in Köln, Düsseldorf, Bonn, Aachen?**

Ja, die Rheinland‑Community deckt diese Städte und Umgebung ab. Einstieg über die WhatsApp‑Gruppe (über 200 Mitglieder).

**Welche Hardware eignet sich?**

Geräte mit EU868‑Unterstützung und guter Antenne. Wichtig sind korrekte Regionseinstellungen und saubere Montage (Freisicht, Höhe, Abstand zu Metall).

**Wie verbessere ich Reichweite in der Stadt?**

Antenne möglichst hoch und frei platzieren, Router‑Knoten strategisch setzen.

## Offizielle Ressourcen

- [Meshtastic Dokumentation](https://meshtastic.org/docs)
- [Radio‑Konfiguration](https://meshtastic.org/docs/configuration/radio/device/)
- [Getting Started](https://meshtastic.org/docs/getting-started/)

## Fragen & Support

- Funkregeln beachten (Duty Cycle im 868‑MHz‑Band)
- Probleme beim Einstieg? Frag in der WhatsApp‑Gruppe
- Du hast Tipps oder möchtest mitmachen? PRs willkommen!
