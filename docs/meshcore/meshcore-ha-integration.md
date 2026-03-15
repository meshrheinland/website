---
sidebar_label: MeshCore HA Integration
title: MeshCore Home Assistant Integration
description: Einrichtung der MeshCore-Integration in Home Assistant ueber HACS oder manuell, inklusive Voraussetzungen und MQTT-Upload-Hinweisen.
---

# MeshCore Home Assistant Integration

Diese Seite beschreibt die Integration von MeshCore in Home Assistant auf Basis der [offiziellen Projektseite](https://github.com/meshcore-dev/meshcore-ha)

Die Integration ist eine Custom Integration fuer Home Assistant und erlaubt Monitoring sowie Steuerung von MeshCore-Nodes ueber **USB**, **BLE** oder **TCP**.

:::warning Status laut Projekt
Die Integration ist laut README noch **Work in Progress**. Die BLE-Verbindung wurde dort als noch nicht umfassend getestet beschrieben.
:::

## Voraussetzungen

Laut README werden benoetigt:

- Home Assistant ab Version `2023.8.0`
- Ein MeshCore-Node mit Firmware, die API-Kommandos unterstuetzt
- Fuer BLE: Bluetooth-Adapter auf dem Home-Assistant-Host
- Fuer USB: USB-Port auf dem Home-Assistant-Host

Hinweis aus der README zu BLE: direkte Verbindung wird vorausgesetzt; Proxy-Verbindungen funktionieren bei PIN-Pairing nicht.

## Installation

### HACS (empfohlen)

1. Sicherstellen, dass HACS installiert ist.
2. In HACS unter Integrations das Repository als Custom Repository hinzufuegen (`Integration` als Kategorie).
3. MeshCore-Integration installieren.
4. Home Assistant neu starten.

### Manuelle Installation

1. Den Ordner `custom_components/meshcore` aus dem Repository in das eigene `custom_components`-Verzeichnis kopieren.
2. Home Assistant neu starten.

## Quick Start

Nach der Installation:

1. In Home Assistant zu **Settings** -> **Devices & Services** wechseln.
2. **+ Add Integration** auswaehlen.
3. Nach **MeshCore** suchen und den Setup-Wizard durchlaufen.

## MQTT Upload (Addon/Container-Umgebung)

Laut README kann die Konfiguration in der Home-Assistant-Weboberflaeche erfolgen:

- `Settings -> Devices & Services -> MeshCore -> Configure`
- MQTT Global Settings
- MQTT Broker Settings (Broker 1-4)

Wichtige Punkte aus der README:

- `meshcore-decoder` ist optional.
- Wenn `meshcore-decoder` nicht verfuegbar ist, faellt die Integration automatisch auf Python-Signing mit `PyNaCl` zurueck.
- Der Signing Key wird vom verbundenen Node via `export_private_key()` geholt.
- Wenn der Export des Private Keys in der Firmware deaktiviert/blockiert ist, kann der Auth-Token-Upload nicht starten.

## Dokumentation und Support

Die [README](https://meshcore-dev.github.io/meshcore-ha/) verweist auf die vollstaendige Projektdokumentation mit Feature-Liste, Konfigurationshilfen, Sensor-/Service-Beschreibungen, Automationsbeispielen, Dashboard-Templates und Troubleshooting

[Issues und Weiterentwicklung](https://github.com/meshcore-dev/meshcore-ha/issues)

---