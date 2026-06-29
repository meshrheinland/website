---
description: Companion- oder Repeater-Firmware per Web-Flasher aufspielen, Meshtastic-Geräte auf MeshCore migrieren und Firmware per OTA-Update (BLE/DFU) ohne physischen Zugriff aktualisieren.
---

# Firmware flashen und aktualisieren

## Erstinstallation

### Web-Flasher (USB)

Der einfachste Weg zum Erstflashen: Browser, USB-Kabel, fertig.

1. Öffne [flasher.meshcore.io](https://flasher.meshcore.io) in Chrome oder Edge
2. Wähle dein Gerät aus der Liste
3. Wähle die Firmware-Variante:
   - **Companion Bluetooth** – für normale Nutzer; Verbindung zur App per Bluetooth
   - **Companion USB** – Verbindung zur App ausschließlich per USB/seriell; kein Bluetooth
   - **Repeater** – für unbemannten Infrastrukturbetrieb
   - **Room Server** – für den BBS-Modus

:::danger[Companion BLE oder USB?]
Für die meisten Nutzer ist **Companion Bluetooth** die richtige Wahl. Die USB-Variante enthält kein Bluetooth – wer sie versehentlich flasht, kann sich nicht per App verbinden und muss neu flashen.
:::
4. Verbinde das Gerät per USB und starte den Flash-Vorgang

:::info[Chrome oder Edge erforderlich]
Der Web-Flasher benötigt WebSerial – das ist nur in Chromium-basierten Browsern verfügbar.
:::

### Geräte-spezifische Hinweise

**RAK WisBlock (nRF52)**

RAK-Boards erscheinen nach einem normalen Anstecken nicht als Flash-Laufwerk. Um den Bootloader-Modus zu aktivieren:

1. USB-Kabel anstecken
2. **Zweimal schnell** die Reset-Taste drücken
3. Das Gerät erscheint als USB-Massenspeicher und kann über den Web-Flasher oder per direktem Kopieren der `.uf2`-Datei bespielt werden

:::note[macOS]
Wenn macOS meldet, der Kopiervorgang sei fehlgeschlagen, ist das in der Regel trotzdem erfolgreich. Das Gerät startet nach dem Schreibvorgang neu.
:::

**Faketec / Heltec T114 (nRF52)**

Bei manchen Boards ist der Bootloader veraltet. Die aktuelle Version findest du in der Datei `INFO*.txt` auf dem USB-Laufwerk des Geräts. Ist der Bootloader älter als `0.9.0`, zuerst aktualisieren.

## Wechsel von Meshtastic zu MeshCore

Wer vorher Meshtastic auf einem **nRF52-Gerät** betrieben hat, sollte vor dem ersten MeshCore-Flash einen vollständigen Speicher-Erase durchführen. Ohne Erase kann das Gerät nach einem Neustart instabil werden oder sich nicht mehr verbinden lassen.

**Ablauf:**

1. Öffne [flasher.meshcore.io](https://flasher.meshcore.io) und wähle dein Gerät aus
2. Klicke auf **Flash Erase** – der Flasher löscht den Speicher direkt
3. Danach MeshCore wie oben per Web-Flasher installieren

:::warning[Nur bei nRF52 nötig]
Bei ESP32-basierten Geräten (Heltec V3, TTGO etc.) gibt es im Web-Flasher eine Checkbox **„Erase device"**. Sie löscht gespeicherte Konfigurationen und entspricht einem Factory Reset – bei einem Firmware-Wechsel empfehlenswert, aber kein eigener Schritt davor nötig.
:::

## Firmware-Update via OTA (nRF52)

Für nRF52-basierte Repeater auf schwer zugänglichen Standorten ist ein Firmware-Update per Bluetooth möglich – ohne physischen Zugriff. Die vollständige Anleitung inkl. OTAFIX-Bootloader und Screenshots findest du auf der eigenen Seite:

→ [OTA-Update (nRF52)](ota-update-nrf52)
