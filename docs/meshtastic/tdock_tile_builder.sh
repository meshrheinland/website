#!/usr/bin/env bash

###############################################################################
# Metadaten
###############################################################################

CREATED_ON="$(date +"%Y-%m-%d")"
PROJECT_URL="https://meshrheinland.de"
AUTHOR="Neukirchener"
LICENSE_URL="https://creativecommons.org/licenses/by-nc-sa/2.0/de/"

# Farben
GREEN="\033[32m"
RESET="\033[0m"

echo -e "${GREEN}"
echo "Mesh Rheinland – Tile Generator"
echo "Autor: $AUTHOR"
echo "Projekt: $PROJECT_URL"
echo "Erstellt am: $CREATED_ON"
echo "Lizenz: CC BY-NC-SA 2.0 DE ($LICENSE_URL)"
echo -e "${RESET}"
echo


###############################################################################
# Konfiguration
###############################################################################

# Basis-Ausgabeverzeichnis (absoluter Pfad)
BASE_OUTDIR="$(dirname "$0")/tiles_output"
mkdir -p "$BASE_OUTDIR"

# Regionen aktivieren/deaktivieren
REGION_RHEINLAND=true
REGION_RUHRGEBIET=false
REGION_BERGISCHES_LAND=false
REGION_RHEIN_KREIS_NEUSS=false

# Zoom-Level
MIN_ZOOM=8
MAX_ZOOM=12

# Quelle
SOURCE="osm"

# Nach Download als ZIP packen?
ZIP_AFTER_DOWNLOAD=true


###############################################################################
# Regionale Bounding Boxes
###############################################################################

declare -A NORTH=(
  [rheinland]=51.80
  [ruhrgebiet]=51.70
  [bergisches]=51.30
  [rkn]=51.30
)

declare -A SOUTH=(
  [rheinland]=50.30
  [ruhrgebiet]=51.30
  [bergisches]=50.90
  [rkn]=51.00
)

declare -A EAST=(
  [rheinland]=7.90
  [ruhrgebiet]=7.90
  [bergisches]=7.50
  [rkn]=6.90
)

declare -A WEST=(
  [rheinland]=5.60
  [ruhrgebiet]=6.40
  [bergisches]=6.70
  [rkn]=6.50
)


###############################################################################
# Funktion: Region verarbeiten
###############################################################################

process_region() {
  local name="$1"
  local outdir="${BASE_OUTDIR}/${name}"
  local date_str
  date_str=$(date +"%Y-%m-%d")

  echo -e "${GREEN}[1/3] Region wird vorbereitet:${RESET} ${name}"
  echo -e "${GREEN}[2/3] Kartendaten werden heruntergeladen...${RESET}"

  python3 meshtastic_tiles.py --coords \
    --north "${NORTH[$name]}" \
    --south "${SOUTH[$name]}" \
    --east  "${EAST[$name]}" \
    --west  "${WEST[$name]}" \
    --min-zoom "$MIN_ZOOM" \
    --max-zoom "$MAX_ZOOM" \
    --source "$SOURCE" \
    --output-dir "$outdir"

  if [ "$ZIP_AFTER_DOWNLOAD" = true ]; then
    echo -e "${GREEN}[3/3] ZIP wird erstellt...${RESET}"
    local zipname="${name}_${date_str}.zip"
    zip -r "$zipname" "$outdir"

    echo -e "${GREEN}Aufräumen...${RESET}"
    rm -rf "$outdir"
  fi

  echo -e "${GREEN}Region ${name} erstellt.${RESET}"
  echo
}


###############################################################################
# Hauptlogik
###############################################################################

[ "$REGION_RHEINLAND" = true ]        && process_region "rheinland"
[ "$REGION_RUHRGEBIET" = true ]       && process_region "ruhrgebiet"
[ "$REGION_BERGISCHES_LAND" = true ]  && process_region "bergisches"
[ "$REGION_RHEIN_KREIS_NEUSS" = true ]&& process_region "rkn"

echo -e "${GREEN}Alle aktiven Regionen wurden verarbeitet.${RESET}"
