# Mesh Rheinland Website

Willkommen im Repository der Mesh Rheinland Webseite! Diese Website bietet Einstiegshilfen für Meshtastic und MeshCore im Rheinland.

## Mitmachen erwünscht!

Du hast Verbesserungsvorschläge, Ergänzungen oder Korrekturen? Wir freuen uns über jeden Beitrag! Die Dokumentation lebt von der Community.

Es gibt zwei Wege, um beizutragen:

1. **Bearbeiten direkt im Browser** (einfach, kein Git-Wissen nötig)
2. **Lokale Entwicklung** (für umfangreichere Änderungen)

## Bearbeiten direkt im Browser (empfohlen für Einsteiger)

Dieser Weg ist ideal, wenn du nicht mit Git vertraut bist oder nur kleine Änderungen vornehmen möchtest.

### Schritt-für-Schritt Anleitung

1. **Navigiere zur Datei**: Öffne die Datei, die du bearbeiten möchtest (z.B. `docs/meshtastic/intro.md`)

2. **Klicke auf den Stift** (Edit-Button oben rechts in der Dateiansicht)

3. **Bearbeite den Inhalt**: GitHub erstellt automatisch einen Fork in deinem Account beim ersten Edit

4. **Änderungen beschreiben**: Scrolle nach unten und beschreibe kurz deine Änderung

5. **"Propose changes"** klicken

6. **Pull Request erstellen**: Klicke auf "Create pull request"

### Preview Deployment

**Wichtig:** Nach Einreichung deines Pull Requests wird automatisch ein Preview Deployment erstellt!

- Du erhältst einen Link zum Preview in den PR-Kommentaren
- So kannst du das Erscheinungsbild deiner Änderungen prüfen
- Das Preview wird bei jeder Aktualisierung des PRs neu gebaut

Das Preview zeigt dir exakt, wie deine Änderungen auf der Live-Site aussehen werden.

## Lokale Entwicklung (für umfangreichere Änderungen)

Dieser Weg ist empfehlenswert für umfangreichere Änderungen oder wenn du mehrere Dateien gleichzeitig bearbeiten möchtest.

### Voraussetzungen

Du hast zwei Optionen:

**Option A: Lokal**
- Node.js (Version 18 oder höher)
- npm

**Option B: Dev Container**
- VS Code + Dev Containers Extension

### Repository forken und clonen

1. **Forken**: Klicke oben rechts auf "Fork", um eine Kopie des Repositories in deinem GitHub-Account zu erstellen

2. **Clonen**: Klone dein Fork lokal:
```bash
git clone https://github.com/DEIN-USERNAME/website.git meshrheinland-website
cd meshrheinland-website
```

### Projekt starten

**Lokal**
Installiere die Abhängigkeiten und starte den Entwicklungsserver:

```bash
npm install
npm start
```

**Dev Container**
1. Repository in VS Code öffnen und "Reopen in Container" wählen
2. Im Container starten:

```bash
npm run start:devcontainer
```

Der Entwicklungsserver startet unter `http://localhost:3000` und lädt Änderungen automatisch neu.

### Änderungen vornehmen

1. Erstelle einen neuen Branch für deine Änderungen:
```bash
git checkout -b meine-verbesserung
```

2. Bearbeite die Markdown-Dateien im `docs/` Verzeichnis

3. Prüfe deine Änderungen im Browser

### Änderungen committen und pushen

1. **Änderungen stagen**:
```bash
git add .
```

2. **Commit erstellen**:
```bash
git commit -m "Kurze Beschreibung deiner Änderung"
```

3. **Push zu deinem Fork**:
```bash
git push origin meine-verbesserung
```

### Pull Request erstellen

1. Gehe zu deinem Fork auf GitHub
2. Klicke auf "Pull Request" bzw. "Compare & pull request"
3. Beschreibe deine Änderungen
4. Klicke auf "Create pull request"

Wir schauen uns deinen Pull Request an und mergen ihn, sobald alles passt!

## Welchen Weg soll ich wählen?

| Browser-Bearbeitung | Lokale Entwicklung |
|---------------------|-------------------|
| ✅ Keine Software-Installation nötig | ❌ Erfordert Node.js und Git |
| ✅ Ideal für kleine Textänderungen | ✅ Perfekt für größere Änderungen |
| ✅ Preview durch automatisches Deployment | ✅ Sofortiges lokales Preview |
| ❌ Jeweils nur eine Datei bearbeitbar | ✅ Mehrere Dateien gleichzeitig |
| ✅ Gut für Git-Einsteiger | ⚙️ Für Git-versierte Nutzer |

## Projekt-Struktur

```
docs/
├── meshtastic/     # Meshtastic-Dokumentation
├── meshcore/       # MeshCore-Dokumentation
src/
├── pages/          # Einzelseiten (z.B. Impressum)
docusaurus.config.ts # Konfiguration
```

## Fragen?

Bei Fragen oder Problemen eröffne gerne ein Issue oder frag in der Community-WhatsApp-Gruppe.

## Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Beiträge werden unter derselben Lizenz veröffentlicht.
