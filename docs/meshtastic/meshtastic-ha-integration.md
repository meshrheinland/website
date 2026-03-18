---
sidebar_label: Meshtastic HA Integration
title: Meshtastic Home Assistant Integration
description: Einrichtung und Beschreibung der Meshtastic-Integration in Home Assistant über HACS oder manuell, inklusive Voraussetzungen und MQTT-Upload-Hinweisen.
---

# Home Assistant Integration

Diese Seite fasst die Home-Assistant-Integration für Meshtastic auf Basis der offiziellen Quellen zusammen:

- [Meshtastic Home Assistant Integration auf GitHub](https://github.com/meshtastic/home-assistant)
- [Meshtastic MQTT Home Assistant Doku](https://meshtastic.org/docs/software/integrations/mqtt/home-assistant/)

## Zwei Wege zur Integration

Aktuell werden in den offiziellen Quellen zwei gängige Wege gezeigt:

1. Die dedizierte **Meshtastic Home Assistant Integration** (Custom Integration, empfohlen über HACS).
2. Die **MQTT+YAML-Variante** mit eigenen Sensor-Templates und Automationen.

Beide Wege können Telemetrie, Nachrichten und Automationen in Home Assistant nutzbar machen.

## Variante A: Offizielle Meshtastic Home Assistant Integration

Laut Projekt-README unterstützt die Integration unter anderem:

- Gateway-Anbindung für Meshtastic (TCP, Serial, Bluetooth; auch via Bluetooth Proxy)
- Auto-Discovery (Zeroconf, Bluetooth, USB-Serial)
- Auswahl, welche Nodes in Home Assistant importiert werden
- Node-Metriken als Sensoren
- Nachrichten empfangen und senden (Broadcast/Direct Message)
- Positionen als Device Tracker
- Device Trigger und Actions für Automationen
- Weitere Actions (z. B. Telemetry anfordern, Traceroute)
- Gebündelter Meshtastic Web Client als Proxy
- MQTT Client Proxy Support

### Installation (empfohlen: HACS)

Die README beschreibt folgende Schritte:

1. Repository als Custom Repository in HACS hinzufügen.
2. Integration über HACS installieren.
3. Home Assistant neu starten.
4. Integration über die UI hinzufügen.

### Alternative: Manuelle Installation

Als Alternative wird in der README die manuelle Ablage unter `custom_components` beschrieben und anschließend das Hinzufügen der Integration über die HA-Oberfläche.

### Wichtige Hinweise aus der README

- Die Konfiguration erfolgt über die UI.
- Für Automationen wird empfohlen, **Device Triggers/Actions** zu bevorzugen.
- Bei trigger-basierten Antworten sollte eine kurze Verzögerung eingebaut werden, damit Meshtastic nicht während Senden/Empfangen blockiert ist.

:::warning Sicherheitshinweis zum eingebauten Web Client
Laut README kann die aktivierte Web-Client-Proxy-Funktion zu **unauthenticated access** auf Gateway-Nodes führen, wenn Home Assistant aus nicht vertrauenswürdigen Netzen erreichbar ist.
Aktiviere diese Funktion nur in einer vertrauenswürdigen Umgebung.
:::

## Variante B: MQTT-Integration über YAML

Die offizielle Meshtastic-Seite zur MQTT-Integration beschreibt den manuellen Aufbau von MQTT-Entities in Home Assistant.

:::warning Kompatibilität
Laut offizieller Meshtastic-MQTT-Doku sind **nRF52-Geräte derzeit nicht für Home Assistant** unterstützt (bekanntes JSON-Problem).
:::

### Grundvoraussetzungen

- Der Meshtastic-Node ist mit einem MQTT-Broker verbunden.
- JSON-Ausgabe ist aktiv.
- Optional empfohlen: MQTT Explorer zur Analyse der Topics/JSON-Payloads.

### Sensoren und Topics

Die Doku zeigt beispielhaft Sensoren für Telemetrie (z. B. Spannung, Batterie, Temperatur, Luftfeuchte, Druck, Kanal-Auslastung, AirUtilTX) und Message-Entities.

Dabei müssen in den Templates die Beispielwerte ersetzt werden:

- Topic wie `msh/US/2/json/LongFast/!67ea9400` durch den eigenen MQTT-Topic-Pfad
- Node-ID wie `4038675309` durch die eigene Node-Nummer

Die Node-Nummer kann laut Doku über MQTT-Ausgaben oder z. B. mit `meshtastic --info` ermittelt werden.

### Maps / Device Tracker

Für Kartenansicht kann ein `device_tracker` über Automation und `device_tracker.see` aktualisiert werden. Die Doku weist darauf hin, dass `latitude_i`/`longitude_i` mit `1e-7` skaliert werden müssen.

### Konfiguration prüfen

Vor Reload/Restart empfiehlt die Doku:

1. `CHECK CONFIGURATION` in den Developer Tools ausführen.
2. Erst danach YAML neu laden oder Home Assistant neu starten.

## Automationen und Benachrichtigungen

Beide Quellen zeigen, dass Automationen für eingehende/ausgehende Nachrichten und Telemetrie möglich sind.

- In der dedizierten Integration über Device Triggers/Actions oder Notify-Entities (`notify.mesh_*`).
- In der MQTT-Variante über Topic-Trigger in `automations.yaml`.

## Empfehlung für Mesh Rheinland

Wenn du möglichst schnell und mit wenig YAML starten willst, ist laut README der Weg über die dedizierte Integration (HACS + UI) der einfachste Einstieg.

Wenn du dagegen sehr gezielte MQTT-Templates, eigene Sensoren oder spezielle Topic-Logik brauchst, bietet die MQTT/YAML-Variante maximale Kontrolle.

---
