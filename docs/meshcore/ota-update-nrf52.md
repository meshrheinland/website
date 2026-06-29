---
description: Firmware-Update per Bluetooth (OTA/DFU) für nRF52-basierte MeshCore-Repeater – ohne physischen Zugriff auf das Gerät. Schritt-für-Schritt-Anleitung inkl. OTAFIX-Bootloader.
---

# OTA-Update (nRF52)

:::warning[Nur für nRF52-basierte Geräte]
Diese Anleitung gilt ausschließlich für Boards mit einem **nRF52**-Chip, z. B. RAK WisBlock oder Xiao nRF52840. ESP32-basierte Geräte (Heltec V3, TTGO etc.) werden anders aktualisiert – dort genügt der Web-Flasher mit aktivierter „Erase device"-Checkbox.
:::

Repeater auf Dächern oder anderen schwer zugänglichen Standorten lassen sich per Bluetooth aktualisieren, ohne das Gerät physisch anfassen zu müssen. Voraussetzung ist ein einmalig installierter Spezial-Bootloader.

## Schritt 1: OTAFIX-Bootloader installieren

Für stabiles OTA-Verhalten wird der **OTAFIX**-Bootloader benötigt – ein angepasster Adafruit-nRF52-Bootloader. Dieser Schritt muss einmalig mit physischem Zugang zum Gerät durchgeführt werden.

1. OTAFIX-Bootloader von [github.com/oltaco/Adafruit_nRF52_Bootloader_OTAFIX](https://github.com/oltaco/Adafruit_nRF52_Bootloader_OTAFIX) herunterladen – passende `.uf2`-Datei für das jeweilige Board wählen
2. Board per **doppeltem Tastendruck** auf die Reset-Taste in den Bootloader-Modus bringen – das Gerät erscheint als USB-Massenspeicher
3. Die `.uf2`-Datei auf das Laufwerk kopieren – das Board startet danach automatisch neu

### Installation prüfen

Die einfachste Prüfung erfolgt direkt über die Console: Mit dem Befehl `get bootloader.ver` antwortet der Repeater mit der installierten Bootloader-Version. Eine erfolgreiche OTAFIX-Installation zeigt z. B. `0.9.2-OTAFIX2.1-BP1.2`.

Alternativ: Board per doppeltem Tastendruck in den Bootloader-Modus bringen und die Datei `INFO_UF2.TXT` auf dem USB-Laufwerk öffnen.

## Schritt 2: DFU-Paket herunterladen

Das DFU-Paket (`.zip`) für das jeweilige Board und die gewünschte Firmware-Variante (Companion BLE / Repeater) von [flasher.meshcore.io](https://flasher.meshcore.io) herunterladen. Die Datei auf dem Smartphone speichern, da sie im nächsten Schritt direkt aus der App heraus benötigt wird.

## Schritt 3: OTA-Modus am Repeater aktivieren

Der OTA-Modus wird per Remote-Admin aus der App aktiviert:

1. In der App die Ziel-Node im Admin-Modus öffnen
2. Zum mittleren Tab **„Command Line"** wechseln – dort erscheint ein schwarzes Terminalfenster
3. `start ota` eingeben und absenden
4. Der Repeater antwortet mit `OK - mac: C0:A6:F0:8D:66:A5` (MAC-Adresse des jeweiligen Geräts)

Die angezeigte MAC-Adresse ist die Bluetooth-Adresse des Repeaters im DFU-Modus – sie wird im nächsten Schritt zur Geräteauswahl benötigt. Erfolgt kein Upload innerhalb des Timeouts, bootet das Gerät automatisch neu und die bestehende Firmware bleibt erhalten.

:::warning[Reihenfolge beachten]
Der Befehl lautet `start ota` – nicht `ota start`. Letzteres wird mit `Unknown command` quittiert.
:::

<div style={{textAlign: 'center', maxWidth: '400px', margin: '0 auto'}}>

![Command Line Tab mit start ota und OK-Antwort](/img/meshcore/meshcore-console-start-ota.png)

</div>

## Schritt 4: Firmware per nRF DFU übertragen

Für den Upload wird die App **nRF Device Firmware Update** von Nordic Semiconductor benötigt: [Google Play](http://play.google.com/store/apps/details?id=no.nordicsemi.android.dfu)

1. App öffnen, unter **„File"** das DFU-Paket (`.zip`) aus Schritt 2 auswählen
2. Unter **„Device"** den Repeater anhand der MAC-Adresse aus Schritt 3 auswählen – das Gerät erscheint im OTA-Modus mit dem Suffix `_OTA` im Namen
3. Paketanzahl einstellen:
   - **Xiao (nRF52840):** 8 Pakete
   - **RAK WisBlock:** 10 Pakete
4. Upload starten – der Fortschritt zeigt nacheinander: Bootloader enabled → DFU initialized → Uploading → Completed

<div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center'}}>
<div style={{minWidth: '400px', maxWidth: '400px'}}>

![nRF DFU App während des Uploads](/img/meshcore/ota-uploading.png)

</div>
<div style={{minWidth: '400px', maxWidth: '400px'}}>

![nRF DFU App nach erfolgreichem Update](/img/meshcore/ota-complete.png)

</div>
</div>

:::tip[Warum unterschiedliche Paketanzahlen?]
Die Paketanzahl steuert, wie viele Datenpakete ohne Bestätigung übertragen werden. Die Werte 8 (Xiao) und 10 (RAK) haben sich in der Praxis bewährt – andere Werte können zu fehlgeschlagenen Updates führen.
:::

## Troubleshooting: Repeater nach „Completed" nicht erreichbar

In seltenen Fällen meldet die App „Completed", der Repeater ist danach aber trotzdem nicht mehr über MeshCore erreichbar. In diesem Fall ist er oft noch als Bluetooth-Gerät sichtbar – manchmal unter einem leicht abweichenden Namen (z. B. `PROM_DFU`) und mit einer leicht abweichenden MAC-Adresse.

Den Flashvorgang in diesem Fall einfach von Schritt 3 an erneut durchführen. In der Regel klappt es beim zweiten Versuch.
