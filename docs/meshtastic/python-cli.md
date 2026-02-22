# Meshtastic Python CLI

## Installation

### Vorbereitung
Für die Installation der Meshtastic‑CLI unter Linux hat sich pipx als die sicherste und angenehmste Methode bewährt. pipx sorgt dafür, dass Meshtastic in einer eigenen, isolierten Umgebung landet und dein System‑Python unangetastet bleibt. Dadurch vermeidest du typische Stolperfallen wie beschädigte Python‑Abhängigkeiten oder Konflikte mit Systempaketen. Meshtastic bleibt sauber getrennt, lässt sich problemlos aktualisieren und bei Bedarf rückstandsfrei entfernen. Es ist ideal für alle, die einfach nur eine funktionierende CLI möchten.

#### Debian / Ubuntu / Linux Mint
```bash
sudo apt install pipx
pipx ensurepath
```

#### Fedora
```bash
sudo dnf install pipx
pipx ensurepath
```

#### Arch / Manjaro
```bash
sudo pacman -S pipx
pipx ensurepath
```
:::note
Nach pipx ensurepath ist ein einmaliges Ab‑ und wieder Anmelden notwendig, damit dein System den neuen Pfad (~/.local/bin) erkennt.
:::

### Meshtastic
Nun wird das eigentliche CLI installiert, damit du deinen Node später bequem konfigurieren kannst. 
```bash
pipx install meshtastic
```

Testen kannst du die Installation mittels:
```bash
meshtastic --version
```
Wenn dir die Versionsnummer angezeigt wird, ist die Installation erfolgreich abgeschlossen und die CLI steht bereit.

### USB‑Zugriff
Damit du ohne Root‑Rechte auf Geräte wie /dev/ttyUSB0 oder /dev/ttyACM0 zugreifen kannst, fügst du deinen Benutzer der Gruppe dialout hinzu:
```bash
sudo usermod -a -G dialout $USER
```
:::note
Danach meldest du dich einmal ab und anschließend wieder an, damit die neue Gruppen­zugehörigkeit aktiv wird.
:::

### Überprüfung
Um sicherzugehen, dass dein Gerät korrekt vom System erkannt wird, kannst du die verfügbaren seriellen Ports anzeigen lassen:
```bash
ls /dev/ttyUSB* /dev/ttyACM* 2>/dev/null
```

Typische Ports:
- **/dev/ttyUSB0** → ESP32‑Boards (T‑Beam, Heltec, LILYGO)  
- **/dev/ttyACM0** → nRF52‑Boards (T‑Echo, RAK)

Schließe nun deinen Node an und teste die Verbindung:
```bash
$ meshtastic --port /dev/ttyUSB0 --info
Connected to radio

Owner: MeinNode (MN01)
Hardware: T-Beam (ESP32)
Firmware: 2.3.12.5 (beta)
MAC: A4:CF:12:8B:44:91
Region: EU868
Role: Client
Battery: 92% (charging)
Uptime: 01:12:44

Channels:
  Primary: LongFast
  Secondary: None

Position:
  GPS: Fix acquired
  Lat/Lon: 51.12 / 6.58
  Altitude: 72 m

Radio:
  SNR: 9.5 dB
  RSSI: -102 dBm
  Air rate: 21.88 kbps
```
Wenn du Geräteinfos siehst, ist die Installation abgeschlossen.

:::note
Die oben gezeigte Ausgabe ist nur ein Beispiel und entspricht nicht echten Gerätedaten.
:::

## CLI nutzen

Die Bedienung der Meshtastic Python CLI folgt immer dem gleichen Grundmuster. Du sprichst das Programm selbst an, gibst an, über welchen seriellen Port dein Node erreichbar ist, und führst anschließend eine Aktion aus,
bei der du gegebenenfalls einen Parameter mit einem neuen Wert versiehst:

```bash
meshtastic --port <serieller_port> <aktion> <parameter>=<wert>
```

meshtastic ist das eigentliche CLI‑Programm, --port /dev/ttyUSB0 legt fest, welches Gerät angesprochen wird, und danach folgt die gewünschte Aktion.
Zu den typischen Aktionen gehören das Anzeigen von Geräteinformationen (--info), das Setzen einzelner Parameter (--set), das Ändern des Channels (--setchan),
das Senden einer Textnachricht (--sendtext), das Auslesen von Werten (--get) oder ein Neustart des Geräts (--reboot).

Da der Node nach jedem gesetzten Wert automatisch neu startet, lohnt es sich, mehrere Einstellungen in einem einzigen Befehl zu bündeln. So sparst du Zeit und vermeidest unnötige Reboots.

Ein Beispiel für eine solche verkettete Konfiguration könnte so aussehen:

```bash
meshtastic --port /dev/ttyUSB0 \
  --set lora.region EU_868 \
  --set lora.modemPreset SHORT_SLOW \
  --set lora.txPower 27
```

Auch wenn hier mehrere Werte gesetzt werden, handelt es sich um einen einzigen CLI‑Aufruf. Der Node übernimmt die Änderungen nacheinander und startet erst am Ende einmal neu. Damit setzt du Region, Modem‑Preset und Sendeleistung in einem Durchlauf .
Falls dein Gerät an einem anderen Port erscheint, kannst du den Wert hinter --port einfach an deine eigene Umgebung anpassen (z.B. /dev/ttyUSB1), wenn mehrere Geräte angeschlossen sind.
Wenn du mehrere Einstellungen nacheinander ändern möchtest, aber nicht alles in eine einzige lange Befehlszeile packen willst, bietet die CLI einen kleinen, sehr praktischen Zwischenschritt: --begin-edit und --commit-edit. Damit öffnest du eine Art Editor in dem du beliebig viele Änderungen sammeln kannst. Erst beim Commit werden alle Werte gemeinsam übernommen - und der Node startet nur ein einziges Mal neu.

```bash
meshtastic --port /dev/ttyUSB0 --begin-edit
meshtastic --port /dev/ttyUSB0 --set device.role CLIENT
meshtastic --port /dev/ttyUSB0 --set device.longName "MeinNode"
meshtastic --port /dev/ttyUSB0 --set device.shortName "MN01"
meshtastic --port /dev/ttyUSB0 --set lora.region EU_868
meshtastic --port /dev/ttyUSB0 --set lora.modemPreset SHORT_SLOW
meshtastic --port /dev/ttyUSB0 --set lora.txPower 27
meshtastic --port /dev/ttyUSB0 --set lora.hopLimit 3
meshtastic --port /dev/ttyUSB0 --commit-edit
```

Auch hier gilt: egal wie viele Werte du setzt, der Node startet nur einmal neu – nämlich beim Commit.

### Nützliche Befehle
Wenn du einen schnellen Überblick über die gängigen Einstellungen brauchst, findest du im Folgenden die wichtigsten Parameter, die im Alltag – und besonders hier in NRW – häufig verwendet werden und dir die Konfiguration deines Nodes angenehm leicht machen.

| Befehl | Beschreibung |
|--------|--------------|
| `meshtastic --port /dev/ttyUSB0 --info` | Zeigt die aktuellen Geräteinformationen an. |
| `meshtastic --port /dev/ttyUSB0 --set device.longName MeinNode` | Ändert den langen Namen des Nodes. |
| `meshtastic --port /dev/ttyUSB0 --set device.shortName MN01` | Ändert den kurzen Namen des Nodes. |
| `meshtastic --port /dev/ttyUSB0 --set device.role CLIENT` | Legt fest, ob der Node als Router oder Client arbeitet. |
| `meshtastic --port /dev/ttyUSB0 --set lora.region EU_868` | Setzt Region, Modem‑Preset und Sendeleistung auf in Deutschland zulässige Werte. |
| `meshtastic --port /dev/ttyUSB0 --set lora.modemPreset SHORT_SLOW` | Modem‑Preset für EU868. |
| `meshtastic --port /dev/ttyUSB0 --set lora.txPower 27` | Sendeleistung einstellen (EU‑konform). |
| `meshtastic --port /dev/ttyUSB0 --set display.screenOnSecs 30` | Legt fest, wie lange das Display eingeschaltet bleibt. |
| `meshtastic --port /dev/ttyUSB0 --set display.flipScreen=true` | Dreht die Anzeige, falls das Gerät kopfüber montiert ist. |
| `meshtastic --port /dev/ttyUSB0 --set position.fixedPosition true` | Aktiviert feste Position (für Router sinnvoll). |
| `meshtastic --port /dev/ttyUSB0 --set position.latitude 51.xxxxxxx` | Breitengrad setzen. |
| `meshtastic --port /dev/ttyUSB0 --set position.longitude 6.xxxxxxx` | Längengrad setzen. |
| `meshtastic --port /dev/ttyUSB0 --set position.altitude xx` | Höhe setzen. |
| `meshtastic --port /dev/ttyUSB0 --ch-set-url https://meshtastic.org/e/#...` | Setzt einen Channel über einen Link. |
| `meshtastic --port /dev/ttyUSB0 --sendtext "Hallo Welt!"` | Sendet eine einfache Textnachricht. |
| `meshtastic --port /dev/ttyUSB0 --reboot` | Startet den Node neu. |
| `meshtastic --port /dev/ttyUSB0 --set device.tzdef GMT-1GMT,M3.5.0,M10.5.0/3` | Zeitzone konfigurieren. |
| `meshtastic --port /dev/ttyUSB0 --set-time` | Uhrzeit vom Host übernehmen. |
| `meshtastic --port /dev/ttyUSB0 --set security.serialEnabled true` | Serielle Schnittstelle aktivieren. |
| `meshtastic --port /dev/ttyUSB0 --set bluetooth.enabled true` | Bluetooth aktivieren. |
| `meshtastic --port /dev/ttyUSB0 --set bluetooth.fixedPin 123456` | Bluetooth‑PIN setzen. |
| `meshtastic --port /dev/ttyUSB0 --set bluetooth.mode FIXED_PIN` | Bluetooth‑Modus festlegen. |
| `meshtastic --help` | Zeigt die Hilfe an. |

:::warning
`override_duty_cycle=true` darf in Deutschland **nicht** verwendet werden.
Diese Option würde die gesetzlich vorgeschriebenen Sendezeitbegrenzungen umgehen.
:::

## Backup & Restore

Der Export speichert die vollständige Node-Konfiguration als YAML-Datei – einschließlich des privaten Schlüssels. Das ist wichtig, weil ein verlorener Private Key den Zugriff auf per Remote-Admin verwaltete Nodes dauerhaft sperrt. Gleichzeitig lassen sich so verschiedene Konfigurationsstände aufbewahren und bei Bedarf miteinander vergleichen.

### Backup erstellen

```bash
meshtastic --port /dev/ttyUSB0 --export-config > config.yaml
```

### Wiederherstellen

Die YAML-Datei lässt sich vor dem Import manuell anpassen.

```bash
meshtastic --configure config.yaml
meshtastic --reboot
```

:::note
Nach einem Firmware-Update können neue Konfigurationsfelder hinzugekommen sein, die im Backup fehlen. Betroffene Einstellungen müssen dann manuell nachgetragen werden.
:::

## Sonstiges
### Installation aktualisieren
Wenn du Meshtastic über pipx installiert hast, kannst du Updates sehr einfach einspielen:

```bash
pipx upgrade meshtastic
```
Damit wird die aktuellste Version aus PyPI installiert und deine bestehende Installation ersetzt.

Falls du zusätzlich das CLI‑Tool meshtastic in einer eigenen Umgebung laufen hast, kannst du auch alle pipx‑Pakete auf einmal aktualisieren:

```bash
pipx upgrade-all
```

### CLI entfernen
Wenn du Meshtastic nicht mehr benötigst oder sauber neu installieren möchtest:

```bash
pipx uninstall meshtastic
```

Damit wird die komplette isolierte pipx‑Umgebung entfernt.
