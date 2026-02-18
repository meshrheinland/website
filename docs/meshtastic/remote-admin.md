---
sidebar_position: 5
---

# Remote Administration (Fernverwaltung)

Die Fernverwaltung (Remote Administration) ermöglicht es dir, Einstellungen an Nodes zu ändern, die räumlich entfernt oder schwer zugänglich installiert sind (z. B. auf einem Dach oder Berg). 

## Funktionsweise

Du hinterlegst den **Public Key** deines Administrator-Geräts (Quelle) auf dem Gerät, das gesteuert werden soll (Ziel). Ein extra Kanal ist nicht mehr notwendig.

## Schritt-für-Schritt-Anleitung

### 1. Public Key des Admin-Geräts ermitteln

Zuerst musst du herausfinden, wie der öffentliche Schlüssel des Geräts lautet, von dem aus du die Administration starten möchtest.

1. Öffne die Meshtastic App auf deinem Admin-Gerät.
2. Gehe zu **Settings** > **Security**.
3. Suche das Feld **Public Key**  und kopiere diesen Schlüssel.
4. **Wichtig:** Sichere dir unbedingt den **Private Key** dieses Geräts (z.B. als Backup exportieren). Wenn du die App neu installierst und den Private Key verlierst, verlierst du auch den Zugriff auf deine Remote-Nodes!

### 2. Ziel-Node autorisieren

Das ferngesteuerte Gerät muss deinen Schlüssel kennen, um Befehle von dir zu akzeptieren.

1. Verbinde dich (lokal per Bluetooth oder USB) mit dem Node, der administriert werden soll.
2. Navigiere zu **Settings** > **Security**.
3. Es gibt dort drei Felder für Admin-Schlüssel. Füge deinen kopierten **Public Key** in eines dieser Felder ein.
4. Speichere die Einstellungen. Der Node wird ggf. neu starten.

### 3. Fernverwaltung starten

Sobald die Schlüssel hinterlegt sind, kannst du den Ziel-Node über das Funknetzwerk verwalten:

1. Gehe in der App zur **Node List**.
2. Wähle den entsprechenden Remote-Node aus der Liste aus.
3. Wähle im Menü den Punkt **Remote Administration
4. Du kannst nun fast alle Parameter (Funk-Settings, Position, LoRa-Parameter) aus der Ferne anpassen.

## weitere Hinweise

* **Kein Admin-Channel:** Die alte Methode mit dem separaten Admin-Kanal ist veraltet und sollte nicht mehr genutzt werden. Die Public-Key-Methode ist wesentlich sicherer.
* **Schlüsselschutz:** Gib niemals deinen **Private Key** an Dritte weiter. Wer den Private Key besitzt, hat die volle Kontrolle über alle Nodes, auf denen der zugehörige Public Key hinterlegt ist.
* **Erreichbarkeit:** Die Fernadministration funktioniert nur, wenn eine stabile Funkverbindung zum Ziel-Node besteht. Bei schwachem Signal können Pakete verloren gehen und Einstellungen nicht übernommen werden.