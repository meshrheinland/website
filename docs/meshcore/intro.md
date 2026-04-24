---
sidebar_position: 1
description: Einstieg in MeshCore im Rheinland – Erklärung der Firmware-Rollen und Einstieg ins Mesh Rheinland.
---

# MeshCore im Rheinland

MeshCore ist ein LoRa-basiertes Mesh-Netzwerk mit Fokus auf präzise Nachrichtenzustellung und minimalem Funkverkehr. Im Gegensatz zu Meshtastic unterscheidet MeshCore zwischen Infrastruktur (Repeater/Room Server) und Anwendern (Companion).

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

**Nächster Schritt:** [Companion-Setup](companion-setup) – Flashen, Grundeinstellungen und erste Verbindung.

## Community & Karte

- WhatsApp Community: [MeshCore Rheinland](https://chat.whatsapp.com/JyNcTcgwlJf6Mhhf7vgYWD)
- [Live-Karte](https://corescope.meshrheinland.de/#/live)
- [MeshCore Flasher](https://flasher.meshcore.dev/)

## Offizielle Ressourcen

- [MeshCore GitHub](https://github.com/meshcore-dev/MeshCore)
- [MeshCore FAQ](https://github.com/meshcore-dev/MeshCore/blob/main/docs/faq.md)
- [Companion Radio Protocol](https://github.com/meshcore-dev/MeshCore/wiki/Companion-Radio-Protocol)

## Häufige Fragen (FAQ)

**Warum sehe ich in der Kontaktliste so viele Infrastruktur-Nodes und kaum User?**

Das liegt am sparsamen Umgang mit Adverts in MeshCore:

- **Infrastruktur** (Repeater, Room Server): Sendet automatisch in der Regel alle 3 Stunden Adverts → zeitnah sichtbar in der Kontaktliste
- **Companion-Nodes** (Nutzer): Senden Adverts **nur manuell** bei Betätigung des Buttons "Advert - Flood Routed" in der App

MeshCore zielt auf minimalen Funkverkehr ab. Infrastruktur kündigt sich automatisiert regelmäßig an, Companion-Nodes senden Adverts nur bei Aufforderung, um das Netz nicht zu belasten. Im **Mesh Rheinland** gibt es den **"Advert Sonntag"**, an dem alle Teilnehmer einmal wöchentlich aufgerufen sind, einen Advert zu senden, damit die Community sich gegenseitig sieht.

**Wie weiß ich, ob meine Nachricht angekommen ist?**

MeshCore zeigt präzises Feedback: "Heard x repeats" bedeutet erfolgreiche Weiterleitung. Die App zeigt Sendeversuche und wechselt automatisch zwischen Direct- und Flood-Routing bei Bedarf.

**Kann ich auch ohne Repeater kommunizieren?**

Ja! Direct-Kommunikation funktioniert zwischen allen Nodes in direkter Funkreichweite. Repeater erweitern nur die Reichweite.

## Fragen & Support

- Bei Problemen: Prüfe die Radio-Einstellungen (Preset **EU/UK (Narrow)**) und den **Default Region Scope** (`de`)
- Teste im öffentlichen Channel
- Achte auf "Heard Repeats" Feedback
