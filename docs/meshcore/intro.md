# MeshCore im Rheinland

MeshCore ist ein LoRa-basiertes Mesh-Netzwerk mit Fokus auf präzise Nachrichtenzustellung und minimalem Funkverkehr. Im Gegensatz zu Meshtastic unterscheidet MeshCore zwischen Infrastruktur (Repeater/Room Server) und Anwendern (Companion).

## TL;DR

- Preset: **EU/UK (Narrow)** (Frequenz 869.618 MHz, Bandbreite 62.5 kHz, Spreading Factor 8, Coding Rate 8)
- Firmware für Nutzer: **Companion**
- Adverts: Sparsam senden (nur zur Sichtbarkeit)
- Nachrichtenstatus: "Heard x repeats" zeigt erfolgreiche Weiterleitung

## Firmware-Typen verstehen

MeshCore unterscheidet klar zwischen verschiedenen Rollen:

### Companion (für Nutzer)

**Das ist die richtige Firmware für neue Teilnehmer!**

- Ermöglicht Senden und Empfangen von Nachrichten
- Verbindung per BLE, USB oder WiFi mit der App
- Leitet **keine** Nachrichten für andere weiter
- Verhindert ungewollte Routing-Pfade

### Repeater & Room Server (nur Infrastruktur)

- Nur für unbemannten Betrieb
- Repeater: Weiterleitung von Nachrichten
- Room Server: Einfacher BBS-Server für 32 Nachrichten an einer Pinnwand

:::warning Wichtig für neue Nutzer
Flashe die **Companion**-Firmware! Repeater und Room Server sind für Infrastruktur-Knoten und erlauben keine normale Nutzung als Teilnehmer.
:::

## Schnellstart

1. Flashe die Companion-Firmware auf dein Gerät
2. Verbinde die App (BLE/USB/WiFi)
3. Stelle die Radio-Einstellungen ein
4. Konfiguriere Node-Name und Position
5. Teste im öffentlichen Channel

## Radio-Einstellungen (Rheinland-Standard)

### Preset: EU/UK (Narrow)

Die Einstellungen müssen exakt übereinstimmen, damit die Geräte miteinander kommunizieren können:

- **Frequenz**: 869.618 MHz
- **Bandwidth**: 62.5 kHz
- **Spreading Factor**: 8
- **Coding Rate**: 8

:::info Preset verwenden
Am einfachsten: Wähle das Preset **EU/UK (Narrow)** in den Radio-Einstellungen. Die Parameter werden automatisch korrekt gesetzt.
:::

## Grundeinstellungen

### Node-Name

Setze einen eindeutigen Namen für deinen Node unter "Name" in den Einstellungen.

### Position (Privacy-Tipp)

Trage deine Position gerne mit ein paar Straßen Versatz ein – das erhöht deine Privatsphäre und ist ausreichend genau für Netzwerkkarten.

### Adverts verstehen

**Wichtig:** In MeshCore kündigt sich nur Infrastruktur periodisch im Netz an.

- **Companion-Nodes** (Nutzer): Senden Adverts nur selten, wenn Sichtbarkeit gewünscht ist
- **Ohne Advert**: Du bist für andere Teilnehmer unsichtbar (Privacy-Feature!)
- **Mit gelegentlichem Advert**: Du erscheinst auf Netzwerkkarten

:::tip Sichtbarkeit vs. Privatsphäre
Sendest du als Companion keinen Advert, bist du für andere Teilnehmer unsichtbar. Sende hin und wieder einen Advert, wenn du auf der Netzwerkkarte erscheinen möchtest.
:::

## Funktion überprüfen

### Öffentlicher Channel

Die einfachste Methode, deine Node zu testen:

1. Sende eine Nachricht im öffentlichen Channel
2. Prüfe unter der gesendeten Nachricht den Status

### "Heard x repeats"

Diese Notiz unter deiner Nachricht bedeutet:

- Ein entfernter Repeater hat deine Nachricht empfangen
- Die Nachricht wurde erfolgreich weitergeleitet
- Dein Setup funktioniert!

### Heard Repeats anzeigen

Für Details, welche Repeater in Reichweite sind:

1. Drücke lange auf eine gesendete Nachricht
2. Wähle "Heard Repeats"
3. Siehst du eine Liste der Repeater, die deine Nachricht weitertragen haben

## Community & Karte

- WhatsApp Community: [MeshCore Rheinland](https://chat.whatsapp.com/GKnoM4NDHQD9crIZpvv0Q1?mode=wwt)
- [Letsme.sh Karte](https://analyzer.letsme.sh/map?last_heard_days=1&lat=50.88376&long=7.23022&zoom=10)
- [MeshCore Flasher](https://flasher.meshcore.dev/)

## Offizielle Ressourcen

- [MeshCore GitHub](https://github.com/meshcore-dev/MeshCore)
- [MeshCore FAQ](https://github.com/meshcore-dev/MeshCore/blob/main/docs/faq.md)
- [Companion Radio Protocol](https://github.com/meshcore-dev/MeshCore/wiki/Companion-Radio-Protocol)

## Häufige Fragen (FAQ)

**Warum sehe ich in der Kontaktliste so viele Infrastruktur-Nodes und kaum User?**

Das liegt am sparsamen Umgang mit Adverts in MeshCore:

- **Infrastruktur** (Repeater, Room Server): Sendet automatisch in der Regel alle 3 Stunden Adverts → zeitnah sichtbar in der Kontaktliste
- **Companion-Nodes** (User): Senden Adverts **nur manuell** bei Betätigung des Buttons "Advert - Flood Routed" in der App

MeshCore zielt auf minimalen Funkverkehr ab. Infrastruktur kündigt sich automatisiert regelmäßig an, Companion-Nodes senden Adverts nur bei Aufforderung, um das Netz nicht zu belasten. Im **Mesh Rheinland** gibt es den **"Advert Sonntag"**, an dem alle Teilnehmer einmal wöchentlich aufgerufen sind, einen Advert zu senden, damit die Community sich gegenseitig sieht.

**Wie weiß ich, ob meine Nachricht angekommen ist?**

MeshCore zeigt präzises Feedback: "Heard x repeats" bedeutet erfolgreiche Weiterleitung. Die App zeigt Sendeversuche und wechselt automatisch zwischen Direct- und Flood-Routing bei Bedarf.

**Kann ich auch ohne Repeater kommunizieren?**

Ja! Direct-Kommunikation funktioniert zwischen allen Nodes in direkter Funkreichweite. Repeater erweitern nur die Reichweite.

## Fragen & Support

- Bei Problemen: Prüfe die Radio-Einstellungen (Preset EU/UK Narrow)
- Teste im öffentlichen Channel
- Achte auf "Heard Repeats" Feedback
