
Der LILYGO T‑Deck ist ideal für Meshtastic‑Nutzer, die im Rheinland unterwegs sind und eine zuverlässige Offline‑Karte brauchen. Mit dem T‑Deck kannst du Kartenmaterial direkt auf dem Gerät anzeigen – ganz ohne Internet.

Damit das funktioniert, benötigt Meshtastic Kartenkacheln im passenden Format. Genau dafür gibt es den Meshtastic Map Tiles Generator. Er lädt die benötigten Kacheln aus der gewünschten Quelle herunter und erzeugt die komplette Ordnerstruktur, die dein T‑Deck anschließend verwenden kann.

# Installation
Die Installation ist bewusst einfach gehalten und funktioniert unter Linux, macOS und Windows. Python 3.8 oder neuer wird benötigt.

## Python
### Linux
Das Script benötigt Python 3 und kann unter Debian/Ubuntu installiert werden:
```bash
sudo apt install python3 python3-pip python3-pil python3-requests
```

## Script
Nachdem Python installiert wurde, lädst du dir von [GitHub](https://github.com/JustDr00py/tdeck-maps) das [Archiv](https://github.com/JustDr00py/tdeck-maps/archive/refs/heads/main.zip)  herunter und entpackst dieses. In dem neuen Ordner **tdeck-maps-main** findest du nun das Skript, welches du über das Terminal aufrufen kannst:

```bash
python3 meshtastic_tiles.py --help
```

# Bedienung
## Terminal
Für den Aufruf des Skriptes müssen bestimmte [Parameter](#parameter)  übergeben werden.

### Grevenbroich + Umgebung
Für das komplette Stadtgebiet Grevenbroich, inklusive aller Ortsteile, wurden die folgenden Koordinaten für die Bounding‑Box verwendet:

 - **North:** 51.15
 - **South:** 51.00
 - **East:** 6.75
 - **West:** 6.50

In diesem Beispiel verwende ich `--min-zoom 12` und `--max-zoom 15`, weil für das Stadtgebiet Grevenbroich eine höhere Detailstufe sinnvoll ist. Die [Quelle](#kartenquellen) `osm` liefert eine Straßenkarte, und mit `--output-dir grevenbroich_tiles` wird ein eigener Ordner für die Region der erzeugten Kacheln angelegt.

```bash
python3 meshtastic_tiles.py --coords \
  --north 51.15 \
  --south 51.00 \
  --east 6.75 \
  --west 6.50 \
  --min-zoom 12 \
  --max-zoom 15 \
  --source osm \
  --output-dir grevenbroich_tiles
Generating tiles for: custom area
Generating tiles for bounds: N:51.15, S:51.0, E:6.75, W:6.5
Zoom levels: 12 to 15
Source: osm
Zoom 12: 16 tiles (x:2121-2124, y:1368-1371)
Zoom 13: 42 tiles (x:4243-4249, y:2737-2742)
Zoom 14: 143 tiles (x:8487-8499, y:5474-5484)
Zoom 15: 528 tiles (x:16975-16998, y:10948-10969)
Total tiles to process: 729
Processing zoom level 12 (x:2121-2124, y:1368-1371)...
Processing zoom level 13 (x:4243-4249, y:2737-2742)...
Processing zoom level 14 (x:8487-8499, y:5474-5484)...
Processing zoom level 15 (x:16975-16998, y:10948-10969)...
Downloaded 100/729 tiles
Downloaded 200/729 tiles
Downloaded 300/729 tiles
Downloaded 400/729 tiles
Downloaded 500/729 tiles
Downloaded 600/729 tiles
Downloaded 700/729 tiles
Completed! Downloaded 729/729 tiles
Metadata saved to: grevenbroich_tiles/metadata.json
```

Der Ordner **grevenbroich_tiles** wurde angelegt und enthält die gewünschten Daten:

```
├── 12
│   ├── 2121
│   │   ├── 1368.png
│   │   ├── ...
│   │   └── 1371.png
│   ├── ...
│   └── 2124
│       ├── 1368.png
│       ├── ...
│       └── 1371.png
├── 13
│   ├── 4243
│   │   ├── 2737.png
│   │   ├── ...
│   │   └── 2742.png
│   ├── ...
│   └── 4249
│       ├── 2737.png
│       ├── ...
│       └── 2742.png
├── 14
│   ├── 8487
│   │   ├── 5474.png
│   │   ├── ...
│   │   └── 5484.png
│   ├── ...
│   ├── 8498
│   │   ├── 5474.png
│   │   ├── ...
│   │   └── 5484.png
│   └── 8499
│       ├── 5474.png
│       ├── ...
│       └── 5484.png
├── 15
│   ├── 16975
│   │   ├── 10948.png
│   │   ├── ...
│   │   └── 10969.png
│   ├── ...
│   ├── 16997
│   │   ├── 10948.png
│   │   ├── ...
│   │   └── 10969.png
│   └── 16998
│       ├── 10948.png
│       ├── ...
│       └── 10969.png
└── metadata.json

53 directories, 730 files
```
## Browser
Im Archiv befindet sich ebenfalls die Datei **maps.html**, welche mit dem Browser aufgerufen werden kann. Wähle den gewünschten Kartenausschnitt auf der Karte aus, lege die Zoomstufen fest und lass dir den passenden Befehl generieren. Dieser wird kopiert und im [Terminal](#terminal) ausgeführt.

## T-Deck
Um das Kartenmaterial mit dem T‑Deck verwenden zu können muss der durch den Skriptaufruf erstellte Ordner von dir nach **/sdcard/maps/** auf der micro-sd-karte kopiert werden (z.B. **/sdcard/maps/grevenbroich/**). 
 Auf dem Gerät im Menü unter **Settings → Maps → Offline Maps aktivieren → Map Style auswählen** die gewünschte Karte auswählen. Dieser entspricht dem Ordnernamen unter `/maps/`. Danach lädt Meshtastic die Tiles automatisch.


# Beispiele
## Nordrhein-Westfalen
Die folgenden Koordinaten umfassen NRW. Einige weitere Regionen sind unter [Bounding-Box](#Bounding-Box) zu ersehen.

```bash
python3 meshtastic_tiles.py --coords \
  --north 52.55 \
  --south 50.30 \
  --east 9.50 \
  --west 5.50 \
  --min-zoom 8 \
  --max-zoom 12 \
  --source osm \
  --output-dir nrw_tiles
```

## Städteregionen
```bash
python3 meshtastic_tiles.py \
  --cities "Köln; Düsseldorf; Bonn; Aachen; Solingen" \
  --buffer 25 \
  --min-zoom 8 \
  --max-zoom 12 \
  --source osm \
  --output-dir meshrheinland_tiles
```
:::note Buffer
Der Parameter `--buffer 25` erweitert die automatisch berechnete Bounding‑Box um 25 Kilometer in alle Richtungen. Dadurch werden nicht nur die Stadtzentren, sondern auch das gesamte Umland zuverlässig abgedeckt.
:::

## Bounding-Box

| Region             | Nord  | Süd  | Ost  | West  | Beschreibung |
|--------------------|--------|--------|--------|--------|--------------|
| **Bergisches Land**| 51.35  | 50.85  | 7.60   | 6.90   | Solingen, Wuppertal & Remscheid |
| **NRW**   | 52.55  | 50.30  | 9.50   | 5.50   | NRW inkl. Bergisches Land, Ruhrgebiet, Rheinland, Münsterland, OWL, Sauerland... |
| **Rheinland**      | 51.80  | 50.30  | 7.90   | 5.60   | Köln, Düsseldorf, Bonn, Aachen, Niederrhein; ideal für Meshrheinland. |
| **Rhein‑Kreis Neuss** | 51.30 | 51.00 | 6.80 | 6.50 | Grevenbroich, Neuss, Dormagen, Korschenbroich... |
| **Ruhrgebiet**     | 51.70  | 51.30  | 7.80   | 6.40   | Essen, Dortmund, Bochum, Duisburg, Gelsenkirchen... |


# Parameter
| Parameter        | Beispiel                                   | Beschreibung |
|------------------|---------------------------------------------|--------------|
| `--coords`       | *(Flag)*                                    | Aktiviert den Modus für manuelle Koordinaten (Nord/Süd/Ost/West erforderlich). |
| `--north`        | `52.55`                                     | Nördlichster Breitengrad der gewünschten Region. |
| `--south`        | `50.30`                                     | Südlichster Breitengrad der Region. |
| `--east`         | `9.50`                                      | Östlichster Längengrad der Region. |
| `--west`         | `5.50`                                      | Westlichster Längengrad der Region. |
| `--city`         | `"Köln"`                                    | Automatische Koordinatensuche für eine einzelne Stadt. |
| `--cities`       | `"Köln; Düsseldorf; Bonn; Aachen"`          | Automatische Bounding‑Box für mehrere Städte (Semikolon‑getrennt). |
| `--buffer`       | `20`                                        | Radius in Kilometern um Stadt/Städte zur Erweiterung der Bounding‑Box. |
| `--min-zoom`     | `8`                                         | Kleinster Zoomlevel (wenige Tiles, grobe Karte). |
| `--max-zoom`     | `12`                                        | Höchster Zoomlevel (viele Tiles, detaillierte Karte). |
| `--source`       | `osm`                                       | Kartenquelle: `osm`, `satellite`, `terrain`, `cycle`. |
| `--output-dir`   | `nrw_tiles`                                 | Zielordner für die generierten Tiles. |
| `--delay`        | `0.2`                                       | Wartezeit zwischen Downloads (schont Tile‑Server). |
| `--max-workers`  | `3`                                         | Anzahl paralleler Downloads (Thread‑Pool). |
| `--sample-only`  | *(Flag)*                                    | Erstellt nur eine Testkachel, lädt keine echten Tiles. |


## Kartenquellen
Neben `osm` stehen auch `satellite`, `terrain` und `cycle` als Kartenquellen zur Verfügung. Je nach Einsatzzweck kannst du so zwischen Straßenkarte, Luftbild, Topografie oder Fahrradkarte wählen.

| Wert      | Kartenstil       | Beschreibung |
|-----------|------------------|--------------|
| `osm`     | Straßenkarte     | Klare, gut lesbare OpenStreetMap‑Standardkarte. Ideal für Alltag, Navigation und Mesh‑Tests. |
| `satellite` | Satellitenbilder | Hochauflösende Luftbilder (ArcGIS World Imagery). Benötigt deutlich mehr Speicherplatz. |
| `terrain` | Topografisch     | Höhenlinien, Schattierungen und Geländeformen. Perfekt für Wandern, Outdoor und Krisenvorsorge. |
| `cycle`   | Fahrradkarte     | Thunderforest Cycle Map – zeigt Radwege, Routen, Steigungen und Outdoor‑Details. |


# Links
 * [Meshtastic Map Tiles Generator](https://github.com/JustDr00py/tdeck-maps)
 * [OpenStreetMap](https://www.openstreetmap.org)

