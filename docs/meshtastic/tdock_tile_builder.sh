#!/usr/bin/env bash
set -euo pipefail

###############################################################################
# Metadaten
###############################################################################

CREATED_ON="$(date +"%Y-%m-%d")"
PROJECT_URL="https://meshrheinland.de"
AUTHOR="Neukirchener"
LICENSE_URL="https://creativecommons.org/licenses/by-nc-sa/2.0/de/"

GREEN="\033[32m"
RED="\033[31m"
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
# Voraussetzungen prüfen
###############################################################################

command -v python3 >/dev/null || { echo -e "${RED}python3 nicht gefunden${RESET}"; exit 1; }
command -v zip >/dev/null || { echo -e "${RED}zip nicht gefunden${RESET}"; exit 1; }

if [ ! -f "meshtastic_tiles.py" ]; then
  echo -e "${RED}meshtastic_tiles.py nicht gefunden!${RESET}"
  exit 1
fi

###############################################################################
# Konfiguration
###############################################################################

BASE_DIR="$(cd "$(dirname "$0")" && pwd)"
BASE_OUTDIR="${BASE_DIR}/tiles_output"
mkdir -p "$BASE_OUTDIR"

REGION_RHEINLAND=true
REGION_RUHRGEBIET=false
REGION_BERGISCHES_LAND=false
REGION_RHEIN_KREIS_NEUSS=false

MIN_ZOOM=8
MAX_ZOOM=12
SOURCE="osm"
ZIP_AFTER_DOWNLOAD=true

###############################################################################
# Regionsdefinitionen
###############################################################################

declare -A REGION_LABELS=(
  [rheinland]="Rheinland"
  [ruhrgebiet]="Ruhrgebiet"
  [bergisches]="Bergisches Land"
  [rkn]="Rhein-Kreis Neuss"
)

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
# Logging Funktion
###############################################################################

log() {
  echo -e "${GREEN}[$(date +"%H:%M:%S")]${RESET} $1"
}

error_exit() {
  echo -e "${RED}[FEHLER] $1${RESET}"
  exit 1
}

###############################################################################
# Bounding Box Validierung
###############################################################################

validate_bbox() {
  local name="$1"

  if (( $(echo "${NORTH[$name]} <= ${SOUTH[$name]}" | bc -l) )); then
    error_exit "Ungültige Bounding Box (North <= South) bei ${name}"
  fi

  if (( $(echo "${EAST[$name]} <= ${WEST[$name]}" | bc -l) )); then
    error_exit "Ungültige Bounding Box (East <= West) bei ${name}"
  fi
}

###############################################################################
# Region verarbeiten
###############################################################################

process_region() {
  local name="$1"
  local label="${REGION_LABELS[$name]}"
  local outdir="${BASE_OUTDIR}/${name}"
  local date_str
  date_str="$(date +"%Y-%m-%d")"

  log "Region wird vorbereitet: ${label}"

  validate_bbox "$name"

  log "Kartendaten werden heruntergeladen..."

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
    log "ZIP wird erstellt..."
    local zipname="${BASE_OUTDIR}/${name}_${date_str}.zip"
    zip -r "$zipname" "$outdir" >/dev/null
    rm -rf "$outdir"
  fi

  log "Region ${label} erfolgreich erstellt."
  echo
}

###############################################################################
# Hauptlogik
###############################################################################

REGION_COUNT=0

[ "$REGION_RHEINLAND" = true ]        && { process_region "rheinland"; ((REGION_COUNT++)); }
[ "$REGION_RUHRGEBIET" = true ]       && { process_region "ruhrgebiet"; ((REGION_COUNT++)); }
[ "$REGION_BERGISCHES_LAND" = true ]  && { process_region "bergisches"; ((REGION_COUNT++)); }
[ "$REGION_RHEIN_KREIS_NEUSS" = true ]&& { process_region "rkn"; ((REGION_COUNT++)); }

if [ "$REGION_COUNT" -eq 0 ]; then
  error_exit "Keine Region aktiviert!"
fi

log "Alle aktiven Regionen wurden verarbeitet."
