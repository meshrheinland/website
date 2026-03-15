---
sidebar_label: Meshtastic HA Integration
title: Meshtastic Home Assistant Integration
description: Einrichtung und Beschreibung der Meshtastic-Integration in Home Assistant ueber HACS oder manuell, inklusive Voraussetzungen und MQTT-Upload-Hinweisen.
---

# Home Assistant Integration

Diese Seite fasst die Home-Assistant-Integration fuer Meshtastic auf Basis der offiziellen Quellen zusammen:

- [Meshtastic Home Assistant Integration auf GitHub](https://github.com/meshtastic/home-assistant)
- [Meshtastic MQTT Home Assistant Doku](https://meshtastic.org/docs/software/integrations/mqtt/home-assistant/)

## Zwei Wege zur Integration

Aktuell werden in den offiziellen Quellen zwei gaengige Wege gezeigt:

1. Die dedizierte **Meshtastic Home Assistant Integration** (Custom Integration, empfohlen ueber HACS).
2. Die **MQTT+YAML-Variante** mit eigenen Sensor-Templates und Automationen.

Beide Wege koennen Telemetrie, Nachrichten und Automationen in Home Assistant nutzbar machen.

## Variante A: Offizielle Meshtastic Home Assistant Integration

Laut Projekt-README unterstuetzt die Integration unter anderem:

- Gateway-Anbindung fuer Meshtastic (TCP, Serial, Bluetooth; auch via Bluetooth Proxy)
- Auto-Discovery (Zeroconf, Bluetooth, USB-Serial)
- Auswahl, welche Nodes in Home Assistant importiert werden
- Node-Metriken als Sensoren
- Nachrichten empfangen und senden (Broadcast/Direct Message)
- Positionen als Device Tracker
- Device Trigger und Actions fuer Automationen
- Weitere Actions (z. B. Telemetry anfordern, Traceroute)
- Gebuendelter Meshtastic Web Client als Proxy
- MQTT Client Proxy Support

### Installation (empfohlen: HACS)

Die README beschreibt folgende Schritte:

1. Repository als Custom Repository in HACS hinzufuegen.
2. Integration ueber HACS installieren.
3. Home Assistant neu starten.
4. Integration ueber die UI hinzufuegen.

### Alternative: Manuelle Installation

Als Alternative wird in der README die manuelle Ablage unter `custom_components` beschrieben und anschliessend das Hinzufuegen der Integration ueber die HA-Oberflaeche.

### Wichtige Hinweise aus der README

- Die Konfiguration erfolgt ueber die UI.
- Fuer Automationen wird empfohlen, **Device Triggers/Actions** zu bevorzugen.
- Bei trigger-basierten Antworten sollte eine kurze Verzoegerung eingebaut werden, damit Meshtastic nicht waehrend Senden/Empfangen blockiert ist.

:::warning Sicherheitshinweis zum eingebauten Web Client
Laut README kann die aktivierte Web-Client-Proxy-Funktion zu **unauthenticated access** auf Gateway-Nodes fuehren, wenn Home Assistant aus nicht vertrauenswuerdigen Netzen erreichbar ist.
Aktiviere diese Funktion nur in einer vertrauenswuerdigen Umgebung.
:::

## Variante B: MQTT-Integration ueber YAML

Die offizielle Meshtastic-Seite zur MQTT-Integration beschreibt den manuellen Aufbau von MQTT-Entities in Home Assistant.

:::warning Kompatibilitaet
Laut offizieller Meshtastic-MQTT-Doku sind **nRF52-Geraete derzeit nicht fuer Home Assistant** unterstuetzt (bekanntes JSON-Problem).
:::

### Grundvoraussetzungen

- Der Meshtastic-Node ist mit einem MQTT-Broker verbunden.
- JSON-Ausgabe ist aktiv.
- Optional empfohlen: MQTT Explorer zur Analyse der Topics/JSON-Payloads.

### Sensoren und Topics

Die Doku zeigt beispielhaft Sensoren fuer Telemetrie (z. B. Spannung, Batterie, Temperatur, Luftfeuchte, Druck, Kanal-Auslastung, AirUtilTX) und Message-Entities.

Dabei muessen in den Templates die Beispielwerte ersetzt werden:

- Topic wie `msh/US/2/json/LongFast/!67ea9400` durch den eigenen MQTT-Topic-Pfad
- Node-ID wie `4038675309` durch die eigene Node-Nummer

Die Node-Nummer kann laut Doku ueber MQTT-Ausgaben oder z. B. mit `meshtastic --info` ermittelt werden.

### Maps / Device Tracker

Fuer Kartenansicht kann ein `device_tracker` ueber Automation und `device_tracker.see` aktualisiert werden. Die Doku weist darauf hin, dass `latitude_i`/`longitude_i` mit `1e-7` skaliert werden muessen.

### Konfiguration pruefen

Vor Reload/Restart empfiehlt die Doku:

1. `CHECK CONFIGURATION` in den Developer Tools ausfuehren.
2. Erst danach YAML neu laden oder Home Assistant neu starten.

## Automationen und Benachrichtigungen

Beide Quellen zeigen, dass Automationen fuer eingehende/ausgehende Nachrichten und Telemetrie moeglich sind.

- In der dedizierten Integration ueber Device Triggers/Actions oder Notify-Entities (`notify.mesh_*`).
- In der MQTT-Variante ueber Topic-Trigger in `automations.yaml`.

## Empfehlung fuer Mesh Rheinland

Wenn du moeglichst schnell und mit wenig YAML starten willst, ist laut README der Weg ueber die dedizierte Integration (HACS + UI) der einfachste Einstieg.

Wenn du dagegen sehr gezielte MQTT-Templates, eigene Sensoren oder spezielle Topic-Logik brauchst, bietet die MQTT/YAML-Variante maximale Kontrolle.

---