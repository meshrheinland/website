
# Contact
Contact ist eine praktische Ergänzung für stationäre Meshtastic Nodes. Es bietet ein Terminal User Interface (TUI), also eine textbasierte Benutzeroberfläche, die vollständig im Terminal läuft.  
Im Gegensatz zur klassischen CLI mit einzelnen Befehlen erhältst du eine dauerhaft sichtbare, interaktive Oberfläche mit Menüs, Listen und Statusanzeigen. Sie kommt ganz ohne grafische Oberfläche aus und ist auch über SSH nutzbar.

Durch den reinen Terminalbetrieb eignet sich Contact besonders gut für Headless Systeme, Raspberry Pis und Remote Server. Damit kannst du das Mesh effizient verwalten, Nachrichten einfach versenden und empfangen sowie die Nodes im Blick behalten – direkt im Terminal und ohne zusätzliche Abhängigkeiten. Besonders in Community-Netzen wie dem Meshrheinland zeigt Contact seine Stärken.

Contact erleichtert die tägliche Arbeit mit Meshtastic-Nodes und bietet dir unter anderem:
- Menübasierte Navigation,  
- Senden und Empfangen von Nachrichten,  
- Übersichtliche Darstellung von Kanälen und Nodes,  
- Zugriff auf Konfigurationsoptionen sowie
- Unterstützung für Serial, Bluetooth und IP*.

Für die persistente Nutzung speichert Contact empfangene Nachrichten und Node‑Infos lokal in einer SQLite‑Datenbank (client.db). Bei einem Neustart werden die Daten wieder geladen. Ein Löschen der Datei setzt alles zurück. Damit ist Contact sowohl für Einsteiger als auch für erfahrene Nutzer geeignet, die regelmäßig mit Meshtastic arbeiten und dabei effizienter vorgehen möchten.

Insgesamt verbindet Contact die Vorteile der klassischen Kommandozeile mit einer schön strukturierten, interaktiven TUI, wodurch sich Aufgaben schneller erledigen lassen und ein schneller Überblick über das Mesh möglich ist. Dies ist ideal für Headless Systeme, Remote-Server oder Meshrheinland.

# Installation
Die empfohlene Installation erfolgt über `pipx`. Dadurch bleibt dein System sauber und Contact steht dir systemweit zur Verfügung.
```bash
pipx install contact
```

Nach der Installation kannst du Contact direkt über den Befehl `contact` starten. `contact -t` startet es im Standardmodus.

:::note Hinweis
Wenn du keine Verbindung angibst, nutzt Contact automatisch die Standardparameter. Du kannst aber auch gezielt eine Verbindung festlegen, z.B. über `--port`, `--host` oder `--ble`. Achte darauf, dass deine Meshtastic-Node läuft, die API aktiviert ist und du eine funktionierende Verbindung über Serial, IP oder Bluetooth hast.
:::


Die Oberfläche ist in drei Bereiche aufgeteilt:

1. Kanäle
2. Nachrichtenfenster
3. Nodes im Mesh

Die Navigation erfolgt über die Pfeiltasten, Aktionen werden mit Enter ausgelöst.

Hello-World-Beispiel
Als kleinstes funktionsfähiges Beispiel kannst du mit Contact eine einfache Nachricht an dein Mesh senden, ohne die UI zu öffnen.

```bash
contact --host 192.168.1.50 --send "Hello world!"
```

Alternativ über eine serielle Verbindung:
```bash
contact --port /dev/ttyUSB0 --send "Hello world!"
```

Damit hast du ein minimales Beispiel, das sich direkt ausführen oder problemlos in Skripte integrieren lässt.

# Nachrichtenversand
## Kanalnachrichten
1. Kanal in der linken Spalte auswählen
2. Nachricht eingeben
3. Enter drücken

## Direktnachrichten
1. Node in der rechten Spalte auswählen
2. Enter drücken
3. Nachricht eingeben und senden

# Konfiguration
Über die Backtick-Taste (`) öffnest du das Konfigurationsmenü.

Die Struktur orientiert sich an der offiziellen Meshtastic App und umfasst unter anderem:
 * Radio-Einstellungen
 * Power-Management
 * Position und Telemetrie
 * Kanal-Konfiguration
 * Geräteeinstellungen

Zu jeder Option zeigt Contact eine kurze Erklärung an, was die Konfiguration direkt im Terminal deutlich erleichtert.

Zusätzlich kannst du die Einstellungen auch direkt ändern:
```bash
contact --settings
contact -c
```

# Skripte
Neben der interaktiven TUI eignet sich Contact auch sehr gut für automatisierte Abläufe. Nachrichten lassen sich direkt per Kommandozeile versenden, z. B. für Monitoring, Sensoren oder Statusmeldungen.

Beispiel für ein einfaches Skript:

```bash
#!/bin/bash
contact --host 192.168.1.50 --send "Still alive."
```

Dieses Skript kann anschließend regelmäßig per Cron ausgeführt werden:
```bash
*/10 * * * * /home/user/scripts/status.sh
```

Typische Anwendungsfälle sind z.B. Statusmeldungen, Warnungen und regelmäßige Erreichbarkeitsmeldungen.


## Praxisbeispiel
Im Meshrheinland bietet sich Contact besonders für stationäre Nodes an, etwa auf Gateways, Relaispunkten oder dauerhaft betriebenen Raspberry Pis.

Ein typisches Szenario ist ein zentraler Node, der regelmäßig Statusmeldungen ins Mesh sendet z.B. zur Erreichbarkeit, Stromversorgung oder Temperatur.

Eine einfache Meldung könnte so aussehen:
```bash
contact --host 192.168.1.50 --send "This is Moonbase Alpha. Still transmitting."
```

In Kombination mit Cron lassen sich so regelmäßige Statusmeldungen realisieren (z.B. alle 30 Minuten). Dadurch sehen andere Teilnehmer im Mesh sofort, welche Gateways aktuell aktiv sind.

# Befehlsübersicht
| Befehl                          | Beschreibung                                             |
| ------------------------------- | -------------------------------------------------------- |
| contact -t                  | Startet die TUI im Standardmodus                         |
| contact --port /dev/ttyUSB0 | Verbindung zu einer Node über die serielle Schnittstelle |
| contact --host <IP>         | Verbindung zu einer Node über das Netzwerk               |
| contact --ble <Adresse>     | Verbindung über Bluetooth                                |
| contact --send "<Text>"     | Sendet eine Nachricht ohne die UI zu öffnen              |
| contact --log               | Zeigt das Paket-Log                                      |
| contact --config            | Startet direkt im Konfigurationsmodus                    |
| contact --settings          | Öffnet das interne Settings-Menü                         |
| contact --help              | Zeigt alle verfügbaren Optionen                          |
| contact --version           | Zeigt die installierte Version                           |

# Tastenkürzel
| Tastenkürzel     | Beschreibung                      |
| ---------------- | --------------------------------- |
| Backtick (`) | Öffnet das Konfigurationsmenü     |
| CTRL + L     | Bildschirm neu zeichnen / Refresh |
| CTRL + P     | Paket-Log ein/ausblenden          |
| CTRL + T     | Traceroute auf eine Node starten  |
| F            | Node als Favorit markieren        |
| I            | Node ignorieren                   |
| A            | Node archivieren                  |
| ESC          | Menü / Aktion abbrechen           |

# Links
 * [GitHub](https://github.com/pdxlocations/contact)
 * [Cron](https://wiki.ubuntuusers.de/Cron/)
