---
sidebar_position: 3
---

# Grundeinstellungen

Nach dem Flashen der Firmware verbindest du dich per App oder Web‑Client mit deinem Gerät und nimmst die folgenden Einstellungen vor.

:::warning Lokale Vorschriften
Bitte beachte lokale Funkrichtlinien (z. B. Duty Cycle im 868‑MHz‑Band). Stelle in Meshtastic die richtige Region ein und nutze angemessene Sendeleistung. Details siehe [Radio‑Konfiguration](https://meshtastic.org/docs/configuration/radio/) in der Meshtastic‑Doku.
:::

## Region: EU868

Stelle als Erstes die Region auf **EU868** (Europa/Deutschland):

1. In der App: Geräteeinstellungen → LoRa/Modem
2. Region/Band: **EU868** auswählen und speichern

## Modem‑Preset: ShortSlow

Im Rheinland nutzen wir einheitlich das Modem‑Profil **ShortSlow**. Das sorgt für gute Reichweite bei vertretbarem Durchsatz und erleichtert die Interoperabilität im Mesh.

:::info Warum ShortSlow im Rheinland?
- **Getestet und bewährt:** In mehreren Community-Tests als optimal ermittelt
- **Nicht der Standard:** Wichtig für neue Nutzer – NICHT die Meshtastic-Standardeinstellung verwenden!
- **Rheinland-optimiert:** Robuste Reichweite in urbanen und hügeligen Gebieten
- **Mesh-Performance:** Geringe Airtime, bessere Netzwerk-Durchdringung
- **Community-Standard:** Einheitliche Basis für alle 200+ Mitglieder
:::

So stellst du es ein:

1. In der App: Geräteeinstellungen → LoRa/Modem
2. „Modem Preset": **ShortSlow** auswählen und speichern

Mehr Hintergründe: [Radio‑Konfiguration (Modem‑Parameter)](https://meshtastic.org/docs/configuration/radio/)

## Kanäle

Kanäle bestimmen, mit wem du kommunizierst:

- **Öffentlich:** Zum Testen und für den Einstieg ins Mesh
- **Privat:** Mit eigenem Schlüssel für private Gruppen

Mehr dazu: [Kanal‑Doku](https://meshtastic.org/docs/configuration/radio/channels/)

## Geräte‑Rollen

Je nach Einsatzzweck wählst du eine passende Rolle für dein Gerät:

- **Client:** Standard für mobile Nutzung
- **Router:** Für stationäre Knoten mit guter Position
- **Client+Router:** Kombination aus beidem

Mehr dazu: [Geräte‑Rollen (Router/Client/etc.)](https://meshtastic.org/docs/configuration/radio/device/)

## Empfohlene Node‑Einstellungen

Diese Einstellungen wurden in der Community erarbeitet und gelten als Best Practice für einen rücksichtsvollen Mesh‑Betrieb. Ziel ist es, unnötige Telemetrie und häufige Selbstankündigungen zu reduzieren, damit das Netz nicht überlastet wird und alle Teilnehmer von einem stabilen Mesh profitieren.

- [Übersicht der empfohlenen Einstellungen](https://docs.google.com/spreadsheets/d/16gFUd1APi93P-PScxhxkql41uNJPvjO_D3EiOONcij4/edit?usp=sharing)

## Häufige Fragen

**Welche Hardware eignet sich?**

Geräte mit EU868‑Unterstützung und guter Antenne. Wichtig sind korrekte Regionseinstellungen und saubere Montage (Freisicht, Höhe, Abstand zu Metall).

**Wie verbessere ich Reichweite in der Stadt?**

Antenne möglichst hoch und frei platzieren, Router‑Knoten strategisch setzen.

**Probleme beim Einstieg?**

Frag in der [WhatsApp‑Gruppe](https://chat.whatsapp.com/CRYnRrAzhYeDlQEJQZQpKi) – dort helfen über 200 Mitglieder gerne weiter.

## Offizielle Ressourcen

- [Meshtastic Dokumentation](https://meshtastic.org/docs)
- [Radio‑Konfiguration](https://meshtastic.org/docs/configuration/radio/device/)
- [Getting Started](https://meshtastic.org/docs/getting-started/)
