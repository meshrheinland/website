---
sidebar_position: 3
---

# Grundeinstellungen

Nach dem Flashen der Firmware verbindest du dich per App oder Web‑Client mit deinem Gerät und nimmst die folgenden Einstellungen vor.

:::warning Lokale Vorschriften
Bitte beachte lokale Funkrichtlinien (z. B. Duty Cycle im 868‑MHz‑Band). Stelle die Region auf EU868 und achte darauf, dass Sendeleistung plus Antennengewinn die erlaubten 27 dBm nicht überschreiten.
:::

## Region: EU868

Stelle als Erstes die Region auf **EU868** (Europa/Deutschland):

1. In der App: Geräteeinstellungen → LoRa/Modem
2. Region/Band: **EU868** auswählen und speichern

## Modem‑Preset: ShortSlow

Im Rheinland nutzen wir das Modem‑Profil **ShortSlow**. Das ist wichtig, denn Geräte mit unterschiedlichen Presets können sich **nicht gegenseitig hören** – ein Gerät auf LongFast und eines auf ShortSlow sprechen aneinander vorbei, als wären sie in getrennten Netzen.

:::warning Nicht der Standard
ShortSlow ist nicht die Meshtastic-Standardeinstellung – bitte aktiv umstellen!
:::

**Du wohnst ländlich und hast noch keine Verbindung?**

In dünn besiedelten Gebieten ist der Weg zum nächsten Knoten manchmal weit. Trotzdem lohnt sich ShortSlow:

- **Jeder neue Knoten hilft** – dein Gerät kann die Brücke für andere werden
- **Das Netz wächst** – was heute eine Lücke ist, kann morgen geschlossen sein
- **ShortSlow verbindet** – nur so erreichst du das gesamte Mesh Rheinland
- **Gemeinsam skalierbar** – ShortSlow nutzt weniger Airtime und lässt Raum für ein großes Netz

Hast du Ideen für einen Standort, der eine Lücke schließen könnte? Melde dich in der Community – gemeinsam finden wir Lösungen!

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
