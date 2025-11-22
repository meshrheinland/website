# Mesh Rheinland Website

Die offizielle Website der Mesh Rheinland Community für Meshtastic und Meshcore.

Diese Website wurde mit [Docusaurus](https://docusaurus.io/) erstellt.

## Installation

```bash
npm install
```

## Lokale Entwicklung

```bash
npm start
```

Dieser Befehl startet einen lokalen Entwicklungsserver und öffnet ein Browserfenster. Die meisten Änderungen werden live übernommen, ohne den Server neu zu starten.

## Build

```bash
npm run build
```

Dieser Befehl generiert statische Inhalte im `build`-Verzeichnis, die über jeden statischen Webserver bereitgestellt werden können.

## Automatisches Deployment

Die Website wird automatisch bei jedem Push auf den `main`-Branch gebaut und deployed.

### Erforderliche GitHub Secrets

Für das automatische Deployment müssen folgende Secrets im GitHub Repository konfiguriert werden:

1. `SSH_PRIVATE_KEY`: Der private SSH-Schlüssel für die Verbindung zum Server
2. `SERVER_HOST`: Die Adresse des Zielservers (z.B. `meshrheinland.de`)
3. `SERVER_USER`: Der SSH-Benutzername auf dem Server
4. `SERVER_PATH`: Der Zielpfad auf dem Server (z.B. `/var/www/meshrheinland.de`)

### Secrets konfigurieren

1. Gehe zu deinem GitHub Repository
2. Settings → Secrets and variables → Actions
3. Klicke auf "New repository secret"
4. Füge die oben genannten Secrets hinzu

### SSH-Schlüssel generieren

Falls noch kein SSH-Schlüssel vorhanden ist:

```bash
ssh-keygen -t ed25519 -C "github-actions@meshrheinland.de" -f deploy_key
```

Den öffentlichen Schlüssel (`deploy_key.pub`) auf dem Server in `~/.ssh/authorized_keys` hinzufügen.
Den privaten Schlüssel (`deploy_key`) als `SSH_PRIVATE_KEY` Secret in GitHub hinterlegen.
