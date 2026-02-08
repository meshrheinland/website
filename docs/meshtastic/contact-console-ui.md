# Contact (Console UI)

Contact ist ein Terminal User Interface (TUI) für Meshtastic. Die textbasierte Oberfläche läuft vollständig im Terminal und eignet sich besonders für Headless-Systeme, Raspberry Pis und Remote-Server per SSH.

![Contact Console UI](/img/meshtastic/contact-console-ui.png)

Die Oberfläche ist in drei Bereiche aufgeteilt:

1. Kanäle
2. Nachrichtenverlauf
3. Nodes im Mesh
4. Eingabefeld

Die Navigation erfolgt über die Pfeiltasten (<kbd>↑</kbd> <kbd>↓</kbd> <kbd>←</kbd> <kbd>→</kbd>), Aktionen werden mit <kbd>Enter</kbd> ausgelöst. Empfangene Nachrichten und Node-Infos werden in einer lokalen SQLite-Datenbank (`client.db`) gespeichert und beim nächsten Start wiederhergestellt.

## Installation

### Vorbereitung

Die Installation mittels `pipx` hält Contact in einer isolierten Umgebung und vermeidet Konflikte mit Systempaketen. Falls `pipx` noch nicht installiert ist, siehe [Python CLI – Installation](./python-cli.md#installation).

### Installieren

```bash
pipx install contact
```

### Verbindung

Ohne Argumente versucht Contact zunächst eine serielle Verbindung, dann TCP zu localhost. Eine Verbindung lässt sich auch explizit angeben:

```bash
contact --port /dev/ttyUSB0   # Seriell
contact --host 192.168.1.50   # TCP/IP
contact --ble <Adresse>       # Bluetooth
```

## Nachrichtenversand

### Kanalnachrichten

1. Kanal in der linken Spalte auswählen
2. Nachricht eingeben
3. Enter drücken

### Direktnachrichten

1. Node in der rechten Spalte auswählen
2. Enter drücken
3. Nachricht eingeben und senden

## Konfiguration

Mit der Backtick-Taste (`` ` ``) oder `F12` öffnest du das Konfigurationsmenü direkt in der TUI. Alternativ startest du Contact im Konfigurationsmodus:

```bash
contact --settings
```

Die Struktur orientiert sich an der offiziellen Meshtastic-App und umfasst unter anderem:

- Radio-Einstellungen
- Power-Management
- Position und Telemetrie
- Kanal-Konfiguration
- Geräteeinstellungen

## Automatisierung

Contact lässt sich auch ohne TUI verwenden, z. B. für regelmäßige Statusmeldungen per Cron:

```bash
*/30 * * * * ~/.local/bin/contact --host 192.168.1.50 --send "Still alive."
```

## Befehlsübersicht

| Befehl | Beschreibung |
|---|---|
| `contact` | Startet die TUI (serial, dann TCP zu localhost) |
| `contact --port /dev/ttyUSB0` | Verbindung über serielle Schnittstelle |
| `contact --host <IP>` | Verbindung über TCP/IP |
| `contact --ble <Adresse>` | Verbindung über Bluetooth |
| `contact --settings` | Startet direkt im Konfigurationsmodus |
| `contact --help` | Zeigt alle verfügbaren Optionen |
| `contact --version` | Zeigt die installierte Version |

## Tastenkürzel

| Taste | Beschreibung |
|---|---|
| <kbd>↑</kbd> <kbd>↓</kbd> <kbd>←</kbd> <kbd>→</kbd> | Navigation |
| <kbd>F1</kbd> / <kbd>F2</kbd> / <kbd>F3</kbd> | Zu Kanälen / Nachrichten / Nodes springen |
| <kbd>Enter</kbd> | Nachricht senden oder Node für DM auswählen |
| <kbd>`</kbd> oder <kbd>F12</kbd> | Einstellungen öffnen |
| <kbd>Ctrl</kbd> + <kbd>K</kbd> | Befehlsliste anzeigen |
| <kbd>Ctrl</kbd> + <kbd>P</kbd> | Paket‑Log ein/ausblenden |
| <kbd>Ctrl</kbd> + <kbd>T</kbd> oder <kbd>F4</kbd> | Traceroute zu einer Node |
| <kbd>F5</kbd> | Node‑Info anzeigen |
| <kbd>Ctrl</kbd> + <kbd>F</kbd> | Node als Favorit markieren |
| <kbd>Ctrl</kbd> + <kbd>G</kbd> | Node ignorieren |
| <kbd>Ctrl</kbd> + <kbd>D</kbd> | Chat archivieren oder Node entfernen |
| <kbd>Ctrl</kbd> + <kbd>/</kbd> | Suche starten |
| <kbd>Esc</kbd> | Menü schließen oder App beenden |

## Links
- [Quellcode auf GitHub (pdxlocations/contact)](https://github.com/pdxlocations/contact)
