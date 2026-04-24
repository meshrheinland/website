---
sidebar_position: 2
description: Companion-Firmware flashen, Node einrichten und erste Verbindung ins MeshCore-Netz im Rheinland herstellen.
---

# Companion-Setup

:::warning Wichtige Änderung seit dem 24.04.2026
Die Repeater im Mesh Rheinland transportieren keinen ungescopten Verkehr mehr. Aktualisiere deine Firmware auf die neueste Version und stelle sicher, dass du einen **Default Region Scope** gesetzt hast – sonst werden deine Nachrichten nicht weitergetragen.
:::

## TL;DR

- Preset: **EU/UK (Narrow)** (Frequenz 869.618 MHz, Bandbreite 62.5 kHz, Spreading Factor 8, Coding Rate 8)
- Firmware für Nutzer: **Companion**
- **Default Region Scope** auf `de` setzen
- Adverts: Sparsam senden (nur zur Sichtbarkeit)
- Nachrichtenstatus: "Heard x repeats" zeigt erfolgreiche Weiterleitung

## Schnellstart

1. Flashe die Companion-Firmware auf dein Gerät
2. Verbinde die App (BLE/USB/WiFi)
3. Stelle die Radio-Einstellungen ein
4. Konfiguriere Node-Name und Position
5. Region Scope konfigurieren
6. Teste im öffentlichen Channel

## Grundeinstellungen

### Node-Name

Setze einen eindeutigen Namen für deinen Node unter "Name" in den Einstellungen.

### Position (Privacy-Tipp)

Trage deine Position gerne mit ein paar Straßen Versatz ein – das erhöht deine Privatsphäre und ist ausreichend genau für Netzwerkkarten.

### Modem-Preset

Die Einstellungen müssen exakt übereinstimmen, damit die Geräte miteinander kommunizieren können:

- **Frequenz**: 869.618 MHz
- **Bandwidth**: 62.5 kHz
- **Spreading Factor**: 8
- **Coding Rate**: 8

:::info Preset verwenden
Am einfachsten: Wähle das Preset **EU/UK (Narrow)** in den Radio-Einstellungen. Die Parameter werden automatisch korrekt gesetzt.
:::

<div style={{textAlign: 'center', maxWidth: '400px', margin: '0 auto'}}>

![App Einstellungen](/img/meshcore/app-settings.png)

</div>

### Region Scope

Ein Region Scope begrenzt die Weiterleitung deiner Nachrichten auf Repeater, die diese Region kennen. Seit dem 24.04.2026 transportieren die Repeater im Mesh Rheinland keinen ungescopten Verkehr mehr – Nachrichten ohne Scope werden schlicht ignoriert. Das Setzen eines Default Scopes ist daher kein optionaler Schritt, sondern Voraussetzung für die Teilnahme am Netz.

Öffne in der App: **Einstellungen → Experimentelle Einstellungen**

- **Default Region Scope**: `de`
- **Default Path Hash Size**: `2-byte (max. 32 Hops)` *(optional)*

<div style={{textAlign: 'center', maxWidth: '400px', margin: '0 auto'}}>

![Experimentelle Einstellungen](/img/meshcore/app-experimental-settings.png)

</div>

:::tip Regionen pro Kanal
Der Default Region Scope gilt für alle Kanäle. Für den Einstieg ist das ausreichend – du kannst aber jedem Kanal auch eine eigene Region zuweisen. Wie das geht, erklärt die [Regionen-Seite](regionen).
:::

## Funktion überprüfen

### Öffentlicher Channel

Die einfachste Methode, deine Node zu testen:

1. Sende eine Nachricht im öffentlichen Channel
2. Prüfe unter der gesendeten Nachricht den Status

Ist der Region Scope korrekt gesetzt, zeigt der öffentliche Channel **Region: de** im Header.

<div style={{textAlign: 'center', maxWidth: '400px', margin: '0 auto'}}>

![Public Channel mit Region Scope](/img/meshcore/app-public-channel-scoped.png)

</div>

### "Heard x repeats"

Diese Notiz unter deiner Nachricht bedeutet:

- Ein entfernter Repeater hat deine Nachricht empfangen
- Die Nachricht wurde erfolgreich weitergeleitet
- Dein Setup funktioniert!

### Hop-Anzeige aktivieren

Unter **Einstellungen → Message Settings** lassen sich zusätzliche Infos unter empfangenen Nachrichten einblenden:

- **Show Channel Message Hops**: Anzahl der Hops, die eine Nachricht genommen hat
- **Show Channel Message Path Hash Sizes**: Frame-Format der Nachricht (1-byte, 2-byte oder 3-byte)

<div style={{textAlign: 'center', maxWidth: '400px', margin: '0 auto'}}>

![Message Settings](/img/meshcore/app-message-settings.png)

</div>

### Heard Repeats anzeigen

Für Details, welche Repeater in Reichweite sind:

1. Drücke lange auf eine gesendete Nachricht
2. Wähle "Heard Repeats"
3. Siehst du eine Liste der Repeater, die deine Nachricht weitertragen haben

## Adverts verstehen

**Wichtig:** In MeshCore kündigt sich nur Infrastruktur periodisch im Netz an.

- **Companion-Nodes** (Nutzer): Senden Adverts nur selten, wenn Sichtbarkeit gewünscht ist
- **Ohne Advert**: Du bist für andere Teilnehmer unsichtbar (Privacy-Feature!)
- **Mit gelegentlichem Advert**: Du erscheinst auf Netzwerkkarten

:::tip Sichtbarkeit vs. Privatsphäre
Sendest du als Companion keinen Advert, bist du für andere Teilnehmer unsichtbar. Sende hin und wieder einen Advert, wenn du auf der Netzwerkkarte erscheinen möchtest.
:::
