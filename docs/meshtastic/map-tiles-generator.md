# Meshtastic Map Tiles Generator

[tdeck-maps](https://github.com/JustDr00py/tdeck-maps) ist ein Python-Skript, das Kartenkacheln für das LILYGO T‑Deck herunterlädt und die Ordnerstruktur erzeugt, die Meshtastic auf diesem Gerät erwartet. Das T‑Deck ist ein Meshtastic-Gerät mit eingebautem Display und Tastatur – tdeck-maps bereitet Offline-Karten speziell für dieses Gerät auf.

## Installation

Python 3.8 oder neuer wird benötigt.

### Debian / Ubuntu

```bash
sudo apt install python3 python3-pip python3-pil python3-requests
```

### Skript

Lade das [Archiv von GitHub](https://github.com/JustDr00py/tdeck-maps/archive/refs/heads/main.zip) herunter, entpacke es und starte das Skript aus dem entpackten Ordner:

```bash
python3 meshtastic_tiles.py --help
```

## Bedienung

Das Skript unterstützt zwei Modi: manuelle Koordinaten oder automatische Auflösung per Städtenamen.

### Kartenausschnitt per Koordinaten

Nord-, Süd-, Ost- und Westgrenzen legen den Kartenausschnitt fest. Beispiel für Grevenbroich und Umgebung:

```bash
python3 meshtastic_tiles.py --coords \
  --north 51.15 --south 51.00 \
  --east 6.75 --west 6.50 \
  --min-zoom 12 --max-zoom 15 \
  --source osm \
  --output-dir grevenbroich_tiles
```

### Kartenausschnitt per Städtenamen

```bash
python3 meshtastic_tiles.py \
  --cities "Köln; Düsseldorf; Bonn; Aachen; Solingen" \
  --buffer 25 \
  --min-zoom 8 --max-zoom 12 \
  --source osm \
  --output-dir meshrheinland_tiles
```

:::note
`--buffer 25` vergrößert den Kartenausschnitt um 25 km in alle Richtungen – so wird nicht nur das Stadtzentrum, sondern auch das Umland erfasst.
:::

### Browser-Oberfläche

Im Archiv liegt `maps.html`, die sich direkt im Browser öffnen lässt. Dort wählst du den Kartenausschnitt per Klick, setzt die Zoomstufen und lässt dir den passenden Befehl generieren.

![Kartenausschnitt in der Browser-Oberfläche](/img/meshtastic/tdeck-maps/map-region.png)

### Auf das T-Deck übertragen

Kopiere den erzeugten Ordner nach `/sdcard/maps/` auf der microSD-Karte (z. B. `/sdcard/maps/grevenbroich/`). Auf dem Gerät: **Settings → Maps → Offline Maps aktivieren → Map Style auswählen**. Der Map Style entspricht dem Ordnernamen unter `/maps/`.

## Vordefinierte Kartenausschnitte

| Gebiet | Nord | Süd | Ost | West | |
|---|---|---|---|---|---|
| **Bergisches Land** | 51.35 | 50.85 | 7.60 | 6.90 | Solingen, Wuppertal, Remscheid |
| **NRW** | 52.55 | 50.30 | 9.50 | 5.50 | Ruhrgebiet, Rheinland, Münsterland, OWL, Sauerland |
| **Rheinland** | 51.80 | 50.30 | 7.90 | 5.60 | Köln, Düsseldorf, Bonn, Aachen, Niederrhein |
| **Rhein‑Kreis Neuss** | 51.30 | 51.00 | 6.80 | 6.50 | Grevenbroich, Neuss, Dormagen, Korschenbroich |
| **Ruhrgebiet** | 51.70 | 51.30 | 7.80 | 6.40 | Essen, Dortmund, Bochum, Duisburg, Gelsenkirchen |

## Parameter

| Parameter | Beispiel | Beschreibung |
|---|---|---|
| `--coords` | *(Flag)* | Modus für manuelle Koordinaten (Nord/Süd/Ost/West erforderlich) |
| `--north` | `52.55` | Nördliche Grenze des Kartenausschnitts |
| `--south` | `50.30` | Südliche Grenze |
| `--east` | `9.50` | Östliche Grenze |
| `--west` | `5.50` | Westliche Grenze |
| `--city` | `"Köln"` | Kartenausschnitt automatisch für eine Stadt berechnen |
| `--cities` | `"Köln; Düsseldorf"` | Kartenausschnitt für mehrere Städte (Semikolon-getrennt) |
| `--buffer` | `20` | Kartenausschnitt um angegebene Kilometer in alle Richtungen erweitern |
| `--min-zoom` | `8` | Niedrigster Zoomlevel (grob, wenige Kacheln) |
| `--max-zoom` | `12` | Höchster Zoomlevel (detailliert, viele Kacheln) |
| `--source` | `osm` | Kartenquelle: `osm`, `satellite`, `terrain`, `cycle` |
| `--output-dir` | `nrw_tiles` | Zielordner für die Kacheln |
| `--delay` | `0.2` | Wartezeit zwischen Downloads (schont Tile-Server) |
| `--max-workers` | `3` | Anzahl paralleler Downloads |
| `--sample-only` | *(Flag)* | Nur eine Testkachel herunterladen |

## Kartenquellen

| Wert | Kartenstil | Beschreibung |
|---|---|---|
| `osm` | Straßenkarte | OpenStreetMap-Standardkarte |
| `satellite` | Satellitenbilder | Luftbilder (ArcGIS World Imagery), höherer Speicherbedarf |
| `terrain` | Topografisch | Höhenlinien und Geländeformen |
| `cycle` | Fahrradkarte | Thunderforest Cycle Map mit Radwegen und Routen |

## Links

- [Meshtastic Map Tiles Generator auf GitHub](https://github.com/JustDr00py/tdeck-maps)
- [OpenStreetMap](https://www.openstreetmap.org)
