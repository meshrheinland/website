# Installation
## Vorbereitung
Für die Installation der Meshtastic‑CLI unter Linux hat sich pipx als die sicherste und angenehmste Methode bewährt. pipx sorgt dafür, dass Meshtastic in einer eigenen, isolierten Umgebung landet und dein System‑Python unangetastet bleibt. Dadurch vermeidest du typische Stolperfallen wie beschädigte Python‑Abhängigkeiten oder Konflikte mit Systempaketen. Meshtastic bleibt sauber getrennt, lässt sich problemlos aktualisieren und bei Bedarf rückstandsfrei entfernen. Es ist ideal für alle, die einfach nur eine funktionierende CLI möchten.

### Debian / Ubuntu / Linux Mint
```bash
sudo apt install pipx
pipx ensurepath
```

### Fedora
```bash
sudo dnf install pipx
pipx ensurepath
```

### Arch / Manjaro
```bash
sudo pacman -S pipx
pipx ensurepath
```
> [!NOTE]
> Nach pipx ensurepath ist ein einmaliges Ab‑ und wieder Anmelden notwendig, damit dein System den neuen Pfad (~/.local/bin) erkennt.

## Meshtastic
Nun wird das eigentliche CLI installiert, damit du deinen Node später bequem konfigurieren kannst. 
```bash
pipx install meshtastic
```

Testen kannst du die Installation mittels:
```bash
meshtastic --version
```
Wenn dir die Versionsnummer angezeigt wird, ist die Installation erfolgreich abgeschlossen und die CLI steht bereit.

## USB‑Zugriff
Damit du ohne Root‑Rechte auf Geräte wie /dev/ttyUSB0 oder /dev/ttyACM0 zugreifen kannst, fügst du deinen Benutzer der Gruppe dialout hinzu:
```bash
sudo usermod -a -G dialout $USER
```
> [!NOTE]
> Danach meldest du dich einmal ab und anschließend wieder an, damit die neue Gruppen­zugehörigkeit aktiv wird.

## Überprüfung
Um sicherzugehen, dass dein Gerät korrekt vom System erkannt wird, kannst du die verfügbaren seriellen Ports anzeigen lassen:
```bash
ls /dev/ttyUSB* /dev/ttyACM* 2>/dev/null
```

Typische Ports:
- **/dev/ttyUSB0** → ESP32‑Boards (T‑Beam, Heltec, LILYGO)  
- **/dev/ttyACM0** → nRF52‑Boards (T‑Echo, RAK)

Schließe nun deinen Node an und teste die Verbindung:
```bash
meshtastic --port /dev/ttyUSB0 --info
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

> [!NOTE]
> Die oben gezeigte Ausgabe ist nur ein Beispiel und entspricht nicht echten Gerätedaten.


# Sonstiges
## Meshtastic aktualisieren
Wenn du Meshtastic über pipx installiert hast, kannst du Updates sehr einfach einspielen:

```bash
pipx upgrade meshtastic
```
Damit wird die aktuellste Version aus PyPI installiert und deine bestehende Installation ersetzt.

Falls du zusätzlich das CLI‑Tool meshtastic in einer eigenen Umgebung laufen hast, kannst du auch alle pipx‑Pakete auf einmal aktualisieren:

```bash
pipx upgrade-all
```

## Meshtastic entfernen
Wenn du Meshtastic nicht mehr benötigst oder sauber neu installieren möchtest:

```bash
pipx uninstall meshtastic
```

Damit wird die komplette isolierte pipx‑Umgebung entfernt.
