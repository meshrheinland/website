# Netzoptimierung (Experiment)

:::info Experimenteller Testbetrieb
Diese Umstellung ist ein **Experiment**, um zu evaluieren:
- Ob die Trennung von Telemetrie und Messaging das Netz entlastet
- Welche Nachteile durch die neue Struktur entstehen
- Ob die Lösung praktikabel für alle Teilnehmer ist

Wir sammeln Erfahrungen und passen das Konzept bei Bedarf an.
:::

## Hintergrund

Unser Meshtastic-Netzwerk ist stark gewachsen und erreicht eine beeindruckende überregionale Abdeckung. Dies führt jedoch zu einem Problem: **Telemetrie-Daten auf dem Primärkanal (ShortSlow) werden über große Strecken transportiert und überlasten das Netz.**

Um dies zu lösen, testen wir eine neue Netzstruktur:
- Gut positionierte Router werden auf `LOCAL_ONLY` gestellt
- Neue dedizierte Kanäle (`M1_Messages`, `M1_Tests`) werden über große Strecken transportiert
- Telemetrie bleibt lokal begrenzt

## Ablauf

### Phase 1: Kanäle einrichten (KW48)

**Ziel:** Alle Teilnehmer richten die neuen Kanäle M1_Messages und M1_Tests ein.

:::warning Wichtig
Die `LOCAL_ONLY`-Einstellung auf den Routern kommt erst in Phase 2! Zunächst richten alle nur die Kanäle ein.
:::

### Phase 2: LOCAL_ONLY aktivieren (aktuell, KW48-KW49)

Router aktivieren die `LOCAL_ONLY`-Einstellung, um nur noch definierte Kanäle weiterzuleiten. Danach sammeln wir Feedback zur Netzqualität.

---

## Phase 1: Router-Konfiguration

**Router** sind gut positionierte Nodes mit großer Reichweite (Dach, Turm, Mast, Berg). Fensterbank-Geräte mit minimaler Reichweite müssen nicht umgestellt werden.

### Schritt 1: Neue Kanäle hinzufügen

#### Option A: Per Link (empfohlen)

[https://meshtastic.org/e/#CjMSII7JP0V7P8f5HomQRUdyqWT9RitJzq9bK-C7ZFTz5AEWGgtNMV9NZXNzYWdlczoCCA0KLBIg6t4uxIUD7wNGt5c332oR6cd_-_cmEz9UVlTUKoCsGJIaCE0yX1Rlc3RzEhEIARAFOANAAkgBUBtoAcAGAQ](https://meshtastic.org/e/#CjMSII7JP0V7P8f5HomQRUdyqWT9RitJzq9bK-C7ZFTz5AEWGgtNMV9NZXNzYWdlczoCCA0KLBIg6t4uxIUD7wNGt5c332oR6cd_-_cmEz9UVlTUKoCsGJIaCE0yX1Rlc3RzEhEIARAFOANAAkgBUBtoAcAGAQ)

Der Link enthält bereits optimierte Einstellungen.

**QR-Code für Smartphone:**

![QR-Code Kanalkonfiguration](/img/m1m2-channel-config.png)

#### Option B: Manuell / Remote Admin

**Kanal M1_Messages:**
- Name: `M1_Messages`
- Passwort: `jsk/RXs/x/keiZBFR3KpZP1GK0nOr1sr4LtkVPPkARY=`

**Kanal M2_Tests:**
- Name: `M2_Tests`
- Passwort: `6t4uxIUD7wNGt5c332oR6cd/+/cmEz9UVlTUKoCsGJI=`

### Schritt 2: Kanalposition festlegen

:::danger Kritisch
Die Kanäle M1 und M2 dürfen **NICHT auf Position 0** liegen!
:::

**Empfohlene Konfiguration:**

| Position | Kanal | Verwendung |
|----------|-------|------------|
| 0 | Dein eigener, privater Kanal | z.B. für lokale Telemetrie |
| 1 | M1_Messages | Überregionale Kommunikation |
| 2 | M2_Tests | Test-Nachrichten |
| 3+ | Weitere lokale Kanäle | Nach Bedarf |

### Schritt 3: Alte Kanäle entfernen

Von Routern sollten folgende Kanäle **entfernt** werden:
- ❌ `ShortSlow` (der überregionale)
- ❌ `NRW_Router`

**Ausnahme:** Lokale Kanäle, die nur in deinem Umkreis genutzt werden, können bleiben.

:::warning Position 0 muss belegt sein
Falls du keinen eigenen Kanal brauchst, erstelle einen Platzhalter-Kanal.
:::

---

## Phase 1: User-Konfiguration

**User** sind Endgeräte, die nicht als Router fungieren (Handys, Tablets, mobile Nodes).

### Schritt 1: Neue Kanäle hinzufügen

#### Option A: Per Link (empfohlen)

[https://meshtastic.org/e/#CjMSII7JP0V7P8f5HomQRUdyqWT9RitJzq9bK-C7ZFTz5AEWGgtNMV9NZXNzYWdlczoCCA0KLBIg6t4uxIUD7wNGt5c332oR6cd_-_cmEz9UVlTUKoCsGJIaCE0yX1Rlc3RzEhEIARAFOANAAkgBUBtoAcAGAQ](https://meshtastic.org/e/#CjMSII7JP0V7P8f5HomQRUdyqWT9RitJzq9bK-C7ZFTz5AEWGgtNMV9NZXNzYWdlczoCCA0KLBIg6t4uxIUD7wNGt5c332oR6cd_-_cmEz9UVlTUKoCsGJIaCE0yX1Rlc3RzEhEIARAFOANAAkgBUBtoAcAGAQ)

**QR-Code für Smartphone:**

![QR-Code Kanalkonfiguration](/img/m1m2-channel-config.png)

#### Option B: Manuell

**Kanal M1_Messages:**
- Name: `M1_Messages`
- Passwort: `jsk/RXs/x/keiZBFR3KpZP1GK0nOr1sr4LtkVPPkARY=`

**Kanal M2_Tests:**
- Name: `M2_Tests`
- Passwort: `6t4uxIUD7wNGt5c332oR6cd/+/cmEz9UVlTUKoCsGJI=`

### Schritt 2: Kanalposition beachten

:::warning Bitte M1_Messages/M2_Tests nicht als primären Kanal nutzen
Um das Experiment erfolgreich zu machen, ist es wichtig, dass M1_Messages und M2_Tests **nicht auf Position 0** liegen.

**Hintergrund:** Auf dem primären Kanal (Position 0) wird, wenn aktiviert, die **Telemetrie** gesendet. Für das Experiment möchten wir in M1_Messages und M2_Tests aber nur Nachrichtenverkehr, um das Netz zu entlasten.
:::

**Empfohlene Konfiguration für das Experiment:**

| Position | Kanal | Verwendung |
|----------|-------|------------|
| 0 | ShortSlow (oder eigener Kanal) | Primärkanal für Telemetrie |
| 1 | M1_Messages | Überregionale Kommunikation |
| 2 | M2_Tests | Test-Nachrichten |
| 3+ | Weitere Kanäle | Nach Bedarf |

:::tip User können ShortSlow behalten
Als User kannst du weiterhin auf dem ShortSlow-Kanal unterwegs sein. Füge einfach M1_Messages und M2_Tests hinzu.
:::

---

## Zweck der neuen Kanäle

### M1_Messages
Hauptkanal für überregionale Kommunikation. Hier findet der normale Nachrichtenaustausch statt.

### M2_Tests
Testkanal für Experimente und Testnachrichten, um die anderen User nicht mit Test-Traffic zu belästigen.

---

## Was passiert nach der Umstellung?

### ✅ Was funktioniert

- Messaging über M1/M2 überregional
- Alle normalen Meshtastic-Funktionen
- Lokale Telemetrie in deiner Gegend
- Lokale Kanäle im eigenen Mesh-Bereich

### ⚠️ Was sich ändert (ab Phase 2)

- Telemetrie wird nicht mehr überregional weitergeleitet
- ShortSlow-Kanal hat geringere Reichweite (weniger Router leiten weiter)
- Du empfängst keine Telemetrie mehr von deinem Heimgerät, wenn du unterwegs bist (außer du betreibst einen eigenen Router mit entsprechendem Kanal)

---

## Phase 2 (Termin folgt)

### Für Router: "LOCAL_ONLY" aktivieren

- **Pfad:** Device → Repeat Settings → "LOCAL_ONLY"
- **Bewirkt:** Nur Kanäle, die auf dem Router vorhanden sind, werden weitergeleitet
- **Ergebnis:** Router leiten nur noch M1/M2 Messaging-Kanäle weiter, keine Telemetrie

### Für User: Keine Änderung nötig

User können ihre Konfiguration so belassen.

---

## Wichtige Hinweise

💡 **Modem-Preset:** Bleibt auf **ShortSlow** - das ändert sich nicht!

🎯 **Für neue Einsteiger:** Die Standard-Kanäle bleiben bestehen. Neueinsteiger finden über ShortSlow lokale Nodes, müssen aber für überregionale Kommunikation in das M1/M2-Netz eingeladen werden.

## Feedback erwünscht

Da dies ein Experiment ist, sind wir auf eure Rückmeldungen angewiesen:
- Wie ist die Netzqualität nach der Umstellung?
- Welche Probleme treten auf?
- Welche Funktionen fehlen oder funktionieren nicht mehr wie erwartet?

Teilt eure Erfahrungen in der WhatsApp-Gruppe "Netz - Optimierung" oder per E-Mail an rennleitung@meshrheinland.de.

---

## Support & Fragen

Bei Fragen oder Unklarheiten wende dich an die WhatsApp-Gruppe "Netz - Optimierung" oder einen Meshtastic-Teilnehmer deines Vertrauens!

**Viel Erfolg und danke fürs Mitmachen!**
