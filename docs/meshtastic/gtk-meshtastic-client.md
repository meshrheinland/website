# GTK Meshtastic Client

<img src="/img/meshtastic/gtk-meshtastic-client/logo.svg" alt="GTK Meshtastic Client Logo" className="logo-float-right" />

Der **gtk-meshtastic-client** ist eine GTK-basierte Desktop-Anwendung für Meshtastic unter Linux – für alle, die Meshtastic lieber am Rechner nutzen als per Smartphone-App oder Web-Interface.

## Installation

Das Paket heißt `gtk-meshtastic-client` und lässt sich über deinen Paketmanager installieren. Nach der Installation erreichst du die App über den Befehl oder das Anwendungsmenü:

```bash
gtk-meshtastic-client
```

## Oberfläche

Die Oberfläche ist in vier Reiter aufgeteilt:

| Reiter | Funktion |
|---|---|
| **Connection & Status** | Verbindung herstellen, Port wählen, Gerätestatus |
| **Chat** | Nachrichten senden und empfangen, Kanäle wechseln |
| **Nearby Nodes** | Liste erreichbarer Mesh-Nodes |
| **Node Map** | Kartenansicht der Mesh-Topologie (erfordert GPS-Daten) |

## Connection & Status

![Connection & Status](/img/meshtastic/gtk-meshtastic-client/connection-status.png)

Verbindungsaufbau und Geräteinfos auf einen Blick.

| Bereich | Beschreibung |
|---|---|
| **Device Region** | Region einstellen, z. B. `EU_868` |
| **Other Preferences** | Erweiterte Geräteeinstellungen (nur aktiv wenn verbunden) |
| **Connect Serial** | Serielle Ports neu laden und Verbindung herstellen |
| **Serial Port** | Dropdown für verfügbare Ports, z. B. `/dev/ttyUSB0` |
| **Connect TCP** | Verbindung per Hostname oder IP (Standard: `meshtastic.local`) |
| **Bluetooth Scan** | Bluetooth-Geräte suchen und verbinden |
| **Disconnect Node** | Verbindung trennen |

## Chat

![Chat](/img/meshtastic/gtk-meshtastic-client/chat.png)

Zeigt alle Kanäle und Direktnachrichten des verbundenen Geräts. In der linken Sidebar wechselst du zwischen Kanälen und DMs.

## Nearby Nodes

![Nearby Nodes](/img/meshtastic/gtk-meshtastic-client/nearby-nodes.png)

Listet das eigene Gerät und alle empfangbaren Nodes auf. Mit dem Suchfeld filterst du die Liste live.

## Node Map

![Node Map](/img/meshtastic/gtk-meshtastic-client/node-map.png)

Zeigt alle Nodes mit GPS-Position auf einer interaktiven Karte. Klick auf das Positionssymbol zentriert die Karte auf die eigene Position.

## Einstellungen

Die Einstellungen erreichst du über **Main Menu** oben im Fenster.

![App Preferences](/img/meshtastic/gtk-meshtastic-client/app-preferences.png)

| Einstellung | Beschreibung |
|---|---|
| **Print Packets** | Pakete auf `stdout` ausgeben |
| **Log Packets** | Pakete unter `~/gtk_meshtastic_client/` speichern |
| **Return Sends Message** | `Enter` sendet statt Zeilenumbruch |
| **Always Quit On Close** | App vollständig beenden oder im Hintergrund laufen lassen |
| **Create NMEA/GPS Socket** | GNSS-Socket unter `$XDG_RUNTIME_DIR/meshtastic-gnss.sock` anlegen |

## CLI-Parameter

| Parameter | Beschreibung |
|---|---|
| `-v` | Version anzeigen |
| `-d` | Debug-Ausgaben aktivieren |
| `-h` | Hilfe anzeigen |

## Links

- [Quellcode auf GitLab (kop316/gtk-meshtastic-client)](https://gitlab.com/kop316/gtk-meshtastic-client)
