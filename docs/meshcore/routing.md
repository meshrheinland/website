# Routing

Diese Seite erklärt, wie MeshCore-Repeater Nachrichten weiterleiten, wie Flooding funktioniert und welche Rolle Timing dabei spielt.

## Zwei Routing-Modi

MeshCore kennt zwei grundlegende Routing-Modi:

```mermaid
graph LR
    A[Routing-Modus] --> B[FLOOD]
    A --> C[DIRECT]

    B --> B1[Broadcast]
    B --> B2[Alle Repeater leiten weiter]
    B --> B3[Optional: Path Learning]

    C --> C1[Punkt-zu-Punkt]
    C --> C2[Source Routing]
    C --> C3[Nur Hops im Path leiten weiter]

    style B fill:#fff3e0,stroke:#f57c00,stroke-width:3px
    style C fill:#e3f2fd,stroke:#1976d2,stroke-width:3px
```

| Modus | Beschreibung | Wann? |
|-------|--------------|-------|
| **FLOOD** | Broadcast an alle Repeater, alle leiten weiter | **Öffentliche Kanalnachrichten** (immer FLOOD) oder **erste private Nachricht** (Path Learning) |
| **DIRECT** | Source Routing über vorgegebenen Pfad | **Private Nachrichten** mit bekanntem Pfad |

- **Öffentliche Kanalnachrichten**: FLOOD ohne Path Learning (kein PATH-Paket zurück)
- **Private Nachrichten**: FLOOD mit Path Learning (PATH-Paket zurück, beide Richtungen lernen)

## FLOOD-Routing: Schritt für Schritt

:::info Zwei Anwendungsfälle für FLOOD
FLOOD wird für zwei verschiedene Zwecke verwendet:
1. **Öffentliche Kanalnachrichten**: Broadcast an alle Teilnehmer, **kein** Path Learning
2. **Private Nachrichten** (erste Nachricht): Path Learning für effiziente Folge-Kommunikation

Die folgenden Schritte beschreiben FLOOD-Routing am **Beispiel einer privaten Nachricht mit Path Learning** (Anwendungsfall 2). Öffentliche Kanalnachrichten (Anwendungsfall 1) nutzen denselben FLOOD-Mechanismus für die Schritte 1-4, aber ohne Path-Learning (Schritt 5).
:::

### 1. Initiales Senden

Alice sendet ihre erste private Nachricht an Bob. Der Pfad ist noch unbekannt.

```mermaid
sequenceDiagram
    participant A as Alice<br/>(Sender)
    participant R1 as Repeater 1<br/>0xA1
    participant R2 as Repeater 2<br/>0xB2
    participant R3 as Repeater 3<br/>0xC3
    participant B as Bob<br/>(Empfänger)

    Note over A: Path = []<br/>FLOOD Mode
    A->>R1: Packet (Path=[])
    A->>R2: Packet (Path=[])

    Note over R3: Außerhalb Reichweite<br/>empfängt nichts

    Note over R1,R2: Repeater in direkter Reichweite<br/>von Alice empfangen das Paket
```

### 2. Repeater fügen sich zum Path hinzu

Jeder Repeater, der das Paket empfängt:
1. Prüft: "Habe ich dieses Paket schon gesehen?" (Duplicate Detection)
2. Wenn nein: Fügt eigenen Hash zum Path hinzu
3. Plant Weiterleitung mit RX Delay (SNR-basiert) + TX Delay (random)

```mermaid
sequenceDiagram
    participant A as Alice
    participant R1 as Repeater 1<br/>0xA1
    participant R2 as Repeater 2<br/>0xB2
    participant R3 as Repeater 3<br/>0xC3
    participant B as Bob

    A->>R1: Path=[]
    Note over R1: ✓ Noch nicht gesehen<br/>+ Eigenen Hash anhängen<br/>Path=[0xA1]

    A->>R2: Path=[]
    Note over R2: ✓ Noch nicht gesehen<br/>+ Eigenen Hash anhängen<br/>Path=[0xB2]

    Note over R3: Hat nichts empfangen<br/>→ Keine Aktion

    Note over R1,R2: Warten mit<br/>RX Delay (SNR-basiert)<br/>+ TX Delay (random)
```

### 3. Weiterleitung mit aufgebautem Path

Die Repeater leiten das Paket mit ihrem Hash im Path weiter:

```mermaid
sequenceDiagram
    participant A as Alice
    participant R1 as Repeater 1<br/>0xA1
    participant R2 as Repeater 2<br/>0xB2
    participant R3 as Repeater 3<br/>0xC3
    participant B as Bob

    Note over R1: Delay abgelaufen
    R1->>R2: Path=[0xA1]
    R1->>R3: Path=[0xA1]
    R1->>B: Path=[0xA1]

    Note over R2: Delay abgelaufen
    R2->>R1: Path=[0xB2]
    R2->>R3: Path=[0xB2]
    R2->>B: Path=[0xB2]

    Note over R3: Empfängt [0xA1]<br/>✓ Noch nicht gesehen<br/>+ Hash anhängen

    Note over R3: Delay abgelaufen
    R3->>B: Path=[0xA1, 0xC3]

    Note over R3: Empfängt [0xB2]<br/>✗ Schon gesehen<br/>→ Verwerfen

    Note over B: Empfängt 3 Pakete:<br/>[0xA1], [0xB2], [0xA1,0xC3]<br/>"First Packet Wins"
```

### 4. Empfänger erhält Pakete über verschiedene Wege

Bob empfängt dasselbe Paket über mehrere Pfade:

```mermaid
graph TD
    A[Alice sendet] --> R1[Repeater 1<br/>0xA1]
    A --> R2[Repeater 2<br/>0xB2]

    R1 --> R3[Repeater 3<br/>0xC3]
    R2 --> R3

    R1 --> B[Bob]
    R2 --> B
    R3 --> B

    style A fill:#e8f5e9,stroke:#388e3c,stroke-width:3px
    style B fill:#e3f2fd,stroke:#1976d2,stroke-width:3px
    style R1 fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style R2 fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style R3 fill:#fff3e0,stroke:#f57c00,stroke-width:2px
```

**Bob empfängt (aus Schritt 3):**
- Paket 1: Path = `[0xA1]` (direkt über Repeater 1) ← **Gewinnt!**
- Paket 2: Path = `[0xB2]` (direkt über Repeater 2) → Verworfen
- Paket 3: Path = `[0xA1, 0xC3]` (über Repeater 1 → Repeater 3) → Verworfen

Bob akzeptiert **nur das erste empfangene Paket** ("First Packet Wins"). Alle anderen werden als Duplikate verworfen.

### 5. Automatischer bidirektionaler Path-Learning

Nach dem Empfang einer FLOOD-Nachricht startet ein automatischer Prozess, der **beide Routen gleichzeitig lernt**:

```mermaid
sequenceDiagram
    participant A as Alice
    participant R1 as Repeater 1<br/>0xA1
    participant R2 as Repeater 2<br/>0xB2
    participant R3 as Repeater 3<br/>0xC3
    participant B as Bob

    Note over B: TXT_MSG empfangen<br/>via Path=[0xA1]<br/>(First Packet Wins!)

    Note over B: Speichere Path [0xA1]<br/>im Payload eines PATH-Pakets

    B->>R2: PATH per FLOOD<br/>Path=[]<br/>Payload: [0xA1] + ACK
    B->>R3: PATH per FLOOD<br/>Path=[]<br/>Payload: [0xA1] + ACK

    Note over R2,R3: RX + TX Delay<br/>(SNR-abhängig)

    R2->>A: PATH per FLOOD<br/>Path=[0xB2]<br/>Payload: [0xA1] + ACK

    Note over A: Erste Ankunft!<br/>✓ Speichere out_path=[0xB2]<br/>✓ Verarbeite ACK

    Note over A: Sende reciprocal PATH<br/>per DIRECT zurück

    A->>R2: PATH per DIRECT<br/>Path=[0xB2]<br/>Payload: [0xA1]

    Note over R2: Ich bin 0xB2<br/>→ Entferne mich<br/>Path=[]

    R2->>B: PATH per DIRECT<br/>Path=[]<br/>Payload: [0xA1]

    Note over B: ✓ Bestätige out_path=[0xA1]

    Note over A,B: Beide Routen gelernt!<br/>Alice→Bob: [0xB2]<br/>Bob→Alice: [0xA1]<br/>(asymmetrisch)
```

**Der Ablauf im Detail:**

1. **Bob empfängt TXT_MSG per FLOOD** mit Path=`[0xA1]` (erstes angekommenes Paket)
2. **Bob speichert den Pfad** `[0xA1]` (Bob → Alice)
3. **Bob sendet PATH-Paket per FLOOD**
   - Im Payload: Der empfangene Pfad `[0xA1]`
   - Als Extra: ACK für die Nachricht
4. **Alice empfängt PATH per FLOOD** mit neuem Path=`[0xB2]`
5. **Alice speichert den Pfad** `[0xB2]` (Alice → Bob)
6. **Alice verarbeitet das ACK** im PATH-Paket
7. **Alice sendet automatisch reciprocal PATH per DIRECT**
   - Via Pfad `[0xB2]` (aus dem Payload des empfangenen PATH)
   - Im Payload: Der ursprüngliche Pfad `[0xA1]`
8. **Bob empfängt PATH per DIRECT** und bestätigt den Pfad

**Ergebnis nach einer FLOOD-Nachricht:**
- ✅ Alice kennt Pfad zu Bob: `[0xB2]`
- ✅ Bob kennt Pfad zu Alice: `[0xA1]`
- ✅ Beide können DIRECT kommunizieren
- ✅ Routen sind **asymmetrisch** (in diesem Beispiel)

**Wichtig:**
- **Ein FLOOD reicht** für bidirektionales Path-Learning
- Die Routen **können asymmetrisch sein** (abhängig von der Netzwerktopologie)
- Jeder lernt den Pfad, über den das PATH-Paket zu ihm kam
- Kein Problem: Jede Richtung funktioniert unabhängig

## DIRECT-Routing: Source Routing

Nachdem Alice den Pfad zu Bob gelernt hat, verwendet sie DIRECT-Routing:

```mermaid
sequenceDiagram
    participant A as Alice
    participant R1 as Repeater 1<br/>0xA1
    participant R2 as Repeater 2<br/>0xB2
    participant B as Bob

    Note over A: Kenne Pfad=[0xA1]<br/>DIRECT Mode

    A->>R1: Path=[0xA1]<br/>DIRECT
    A->>R2: Path=[0xA1]<br/>DIRECT

    Note over R1: ✓ Ich bin 0xA1<br/>→ Hash entfernen<br/>→ Weiterleiten

    Note over R2: ✗ Ich bin nicht 0xA1<br/>→ Verwerfen

    R1->>B: Path=[]<br/>DIRECT

    Note over B: Nachricht erhalten!
```

**Wichtig:**
- Nur der **erste Repeater im Path** (0xA1) leitet weiter
- Repeater 2 verwirft das Paket, da er nicht im Path ist
- Der Repeater **entfernt sich selbst** aus dem Path beim Weiterleiten
- Am Ende erhält Bob ein Paket mit leerem Path (`Path=[]`)

## Timing & Delays

MeshCore nutzt **zwei verschiedene Delay-Mechanismen**, um Kollisionen zu vermeiden und die besten Pfade zu bevorzugen:

### 1. RX Delay (Signalstärke-basiert, nur FLOOD)

:::info Nur für FLOOD
RX Delay wird **nur bei FLOOD-Paketen** angewendet. DIRECT-Pakete werden sofort verarbeitet (RX Delay = 0 ms).
:::

Beim Empfang eines FLOOD-Pakets wird zunächst basierend auf der **Signalstärke (SNR)** ein Delay berechnet:

```cpp
// Score aus SNR berechnen (0.0 = schwach, 1.0 = stark)
float score = (snr - snr_threshold) / 10.0;

// RX Delay berechnen
int rx_delay = (pow(rx_delay_base, 0.85 - score) - 1.0) * airtime;
```

**Formel:**
```
RX Delay = (rx_delay_base^(0.85 - Score) - 1) × Airtime
```

**Der `rx_delay_base` ist konfigurierbar:**
- **Default**: `10.0` (Basis-Implementierung)
- **Repeater-Firmware**: Oft `0.0` (deaktiviert)
- **Bereich**: `0.0 - 20.0`
- **CLI-Kommando**: `set rxdelay <wert>`
- **Effekt**: Höhere Basis = stärkerer SNR-Effekt

**Effekt:**
- **Starkes Signal** (hoher SNR) → hoher Score → **kurzes Delay** → frühe Verarbeitung
- **Schwaches Signal** (niedriger SNR) → niedriger Score → **langes Delay** → späte Verarbeitung
- Falls RX Delay < 50 ms: **sofortige Verarbeitung**
- Falls `rx_delay_base = 0.0`: RX Delay deaktiviert (nur TX Delay aktiv)

**Beispiel mit rx_delay_base = 10.0** (Airtime = 200 ms):
- SNR = +10 dB → Score ≈ 0.8 → RX Delay ≈ 20 ms
- SNR = 0 dB → Score ≈ 0.5 → RX Delay ≈ 224 ms
- SNR = -10 dB → Score ≈ 0.2 → RX Delay ≈ 894 ms

**Beispiel mit rx_delay_base = 0.0** (deaktiviert):
- RX Delay = 0 ms (unabhängig vom SNR)

:::tip Beste Pfade gewinnen
Durch das SNR-basierte Delay setzen sich automatisch die **besten Routen** durch: Repeater mit starkem Signal verarbeiten und senden früher, schwache Signale kommen zu spät und werden durch "First Packet Wins" verworfen.

**Hinweis**: In vielen Repeater-Firmwares ist RX Delay standardmäßig deaktiviert (`rx_delay_base = 0.0`), sodass nur TX Delay zur Kollisionsvermeidung verwendet wird.
:::

### 2. TX Delay (Zufalls-basiert)

Nach der Verarbeitung wird zusätzlich ein **zufälliges Delay** hinzugefügt, bevor das Paket weitergeleitet wird:

```cpp
uint32_t t = airtime * tx_delay_factor;
uint32_t delay = random(0, 5 * t);
```

**Formel:**
```
TX Delay = Zufallszahl(0, 5 × Airtime × tx_delay_factor)
```

**Der `tx_delay_factor` ist konfigurierbar:**
- **Default**: `0.5` (Repeater/Room Server)
- **Bereich**: `0.0 - 2.0`
- **CLI-Kommando**: `set txdelay <wert>`
- **Effekt**: Skaliert den Zufallsbereich, **nicht** ein festes zusätzliches Delay

**Beispiele** (Airtime = 200 ms):

| tx_delay_factor | t | TX Delay Bereich | Zweck |
|-----------------|---|------------------|-------|
| **0.5** (Default) | 100 ms | 0-500 ms | Ausgewogene Kollisionsvermeidung |
| **0.25** | 50 ms | 0-250 ms | Geringeres Delay, mehr Kollisionen |
| **1.0** | 200 ms | 0-1000 ms | Höheres Delay, weniger Kollisionen |
| **0.0** | 0 ms | 0 ms | TX Delay deaktiviert (nicht empfohlen) |

:::info Anpassung des TX Delay
Ein höherer `tx_delay_factor` vergrößert den Zufallsbereich und reduziert Kollisionen, erhöht aber die Latenz. Der Default-Wert `0.5` ist für die meisten Netzwerke optimal.
:::

### Gesamt-Delay

Das **Gesamt-Delay** vom Empfang bis zur Weiterleitung ist:

```
Gesamt-Delay = RX Delay + TX Delay
```

```mermaid
gantt
    title FLOOD Timing mit RX Delay (rx_delay_base = 10.0)
    dateFormat X
    axisFormat %L ms

    section Alice
    Sendet Paket              :0, 0

    section Repeater 1 (SNR +5dB)
    Empfängt                  :0, 0
    RX Delay (50ms)           :0, 50
    TX Delay (104ms)          :50, 154
    Sendet                    :154, 154

    section Repeater 2 (SNR -5dB)
    Empfängt                  :0, 0
    RX Delay (500ms)          :0, 500
    TX Delay (208ms)          :500, 708
    Sendet                    :708, 708

    section Repeater 3 (SNR +10dB)
    Empfängt                  :0, 0
    RX Delay (20ms)           :0, 20
    TX Delay (312ms)          :20, 332
    Sendet                    :332, 332
```

**Wichtig:** Repeater 2 mit schwachem Signal sendet zu spät - sein Paket wird durch "First Packet Wins" verworfen!

### TX Delay bei DIRECT

Bei DIRECT-Routing wird ebenfalls ein TX Delay verwendet, allerdings mit einem **kleineren Faktor**:

```cpp
uint32_t t = airtime * direct_tx_delay_factor;
uint32_t delay = random(0, 5 * t);
```

**Der `direct_tx_delay_factor` ist konfigurierbar:**
- **Default**: `0.2` (Repeater/Room Server/Sensor)
- **Bereich**: `0.0 - 2.0`
- **CLI-Kommando**: `set direct.txdelay <wert>`

**Beispiele** (Airtime = 200 ms):

| direct_tx_delay_factor | t | DIRECT TX Delay | Zweck |
|------------------------|---|-----------------|-------|
| **0.2** (Default) | 40 ms | 0-200 ms | Geringe Kollisionsvermeidung |
| **0.0** | 0 ms | 0 ms | Keine Verzögerung (minimale Latenz) |
| **0.5** | 100 ms | 0-500 ms | Wie FLOOD txdelay |

**Vergleich:**

| Routing-Modus | RX Delay | TX Delay | Gesamt | Grund |
|---------------|----------|----------|--------|-------|
| **FLOOD** | 20-900 ms (SNR-basiert) | 0-500 ms (random) | 20-1400 ms | SNR-Priorisierung + Kollisionsvermeidung |
| **DIRECT** | 0 ms | 0-200 ms (random) | 0-200 ms | Geringe Kollisionsvermeidung, niedrige Latenz |

*Bei direct_tx_delay_factor = 0.2 (Default). Mit 0.0 → 0 ms TX Delay.

## Prioritäten

MeshCore vergibt **Prioritäten** bei der Weiterleitung:

```mermaid
graph TB
    A[Empfangenes Paket] --> B{Routing-Modus?}

    B -->|DIRECT| C[Priorität 0<br/>HÖCHSTE]
    B -->|FLOOD| D{Path Length?}

    D -->|"Path=[]"| E[Priorität 0]
    D -->|"Path=[0xA1]"| F[Priorität 1]
    D -->|"Path=[0xA1,0xB2]"| G[Priorität 2]
    D -->|"Path=[...]"| H[Priorität = path_len]

    style C fill:#e3f2fd,stroke:#1976d2,stroke-width:3px
    style E fill:#e8f5e9,stroke:#388e3c,stroke-width:3px
    style F fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style G fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style H fill:#fff3e0,stroke:#f57c00,stroke-width:2px
```

**Regel:**
```cpp
priority = path_len  // bei FLOOD
priority = 0         // bei DIRECT
```

**Bedeutung:**
- **Kürzere Pfade** = höhere Priorität (werden zuerst gesendet)
- **DIRECT** = immer höchste Priorität
- Verhindert, dass weit entfernte Repeater den Kanal blockieren

## Duplicate Detection

Jeder Repeater speichert empfangene Pakete in einer **Seen Table**:

```mermaid
sequenceDiagram
    participant A as Alice
    participant R1 as Repeater 1
    participant R2 as Repeater 2

    A->>R1: Paket X
    Note over R1: Hash berechnen<br/>→ In Seen Table speichern

    R1->>R2: Paket X weiterleiten

    Note over R2: Hash berechnen<br/>→ In Seen Table speichern

    R1->>R2: Paket X (Duplikat!)

    Note over R2: Hash prüfen<br/>✗ Schon gesehen<br/>→ Verwerfen
```

**Hash-Berechnung:**
```cpp
SHA256(payload_type + payload_len + payload)
```

**Wichtig:**
- Der Hash berücksichtigt **nicht** den Path
- Dasselbe Paket über verschiedene Wege hat denselben Hash
- Verhindert Endlos-Schleifen im Mesh

## Vollständiges FLOOD-Beispiel

Kompletter Nachrichtenfluss mit Timing und bidirektionalem Path-Learning:

```mermaid
sequenceDiagram
    autonumber
    participant A as Alice
    participant R1 as Repeater 1<br/>0xA1
    participant R2 as Repeater 2<br/>0xB2
    participant B as Bob

    Note over A: Erste Nachricht<br/>TXT_MSG per FLOOD
    A->>R1: TXT_MSG Path=[], t=0ms
    A->>R2: TXT_MSG Path=[], t=0ms

    Note over R1: SNR +5dB<br/>RX=50ms + TX=50ms
    Note over R2: SNR -5dB<br/>RX=500ms + TX=200ms

    Note over R1: t=100ms
    R1->>B: TXT_MSG Path=[0xA1]

    Note over B: Erste Ankunft!<br/>✓ Nachricht empfangen<br/>✓ Path [0xA1] gespeichert

    Note over R2: t=700ms<br/>Hash prüfen<br/>✗ Schon gesehen → Verwerfen

    Note over B: Automatisch: PATH per FLOOD<br/>mit ACK
    B->>R1: PATH Path=[], t=100ms<br/>Payload:[0xA1]+ACK
    B->>R2: PATH Path=[], t=100ms<br/>Payload:[0xA1]+ACK

    Note over R1: SNR +8dB<br/>RX=30ms + TX=50ms
    Note over R2: SNR -3dB<br/>RX=400ms + TX=150ms

    Note over R1: t=180ms
    R1->>A: PATH Path=[0xA1]<br/>Payload:[0xA1]+ACK

    Note over A: ✓ Path [0xA1] gespeichert<br/>✓ ACK verarbeitet

    Note over A: Automatisch: reciprocal PATH<br/>per DIRECT
    A->>R1: PATH Path=[0xA1], t=180ms<br/>Payload:[0xA1]<br/>DIRECT

    Note over R1: Ich bin 0xA1<br/>→ Entferne mich<br/>Delay=0ms (DIRECT)

    R1->>B: PATH Path=[]<br/>Payload:[0xA1], t=180ms

    Note over B: ✓ Path bestätigt

    Note over A,B: Beide Routen gelernt!<br/>Symmetrisch: A↔B via [0xA1]

    Note over A: Zweite Nachricht<br/>DIRECT Mode
    A->>R1: TXT_MSG Path=[0xA1], t=500ms<br/>DIRECT

    Note over R1: Delay=0ms (DIRECT)
    R1->>B: TXT_MSG Path=[], t=500ms

    Note over B: ACK per DIRECT
    B->>R1: ACK Path=[0xA1], t=500ms

    Note over R1: Delay=0ms (DIRECT)
    R1->>A: ACK Path=[], t=500ms
```

## Zusammenfassung

| Aspekt | FLOOD | DIRECT |
|--------|-------|--------|
| **Zweck** | Broadcast (Öffentlich) oder Path Learning (Privat) | Effiziente Punkt-zu-Punkt-Zustellung |
| **Path** | Wird aufgebaut (bei privaten Nachrichten) | Vorgegeben |
| **Weiterleitung** | Alle Repeater | Nur Hops im Path |
| **RX Delay** | 0-900 ms (SNR, konfigurierbar)* | 0 ms |
| **TX Delay** | 0-500 ms (random, konfigurierbar)** | 0-200 ms (random, konfigurierbar)*** |
| **Gesamt Delay** | 0-1400 ms | 0-200 ms |
| **Priorität** | path_len | 0 (höchste) |
| **Duplikate** | Viele (über verschiedene Wege) | Keine |
| **Airtime** | Hoch | Niedrig |
| **Anwendung** | Öffentliche Kanäle (immer) + erste private Nachricht | Folgende private Nachrichten |

*RX Delay: `rx_delay_base` (Default: `10.0`, Repeater oft: `0.0`)
**TX Delay: `tx_delay_factor` (Default: `0.5`)
***DIRECT TX Delay: `direct_tx_delay_factor` (Default: `0.2`, ergibt 0-200ms bei 200ms Airtime)

**Best Practice:**

**Öffentliche Kanalnachrichten:**
- Immer FLOOD-Modus (kein Path Learning möglich)
- Keine PATH-Pakete zurück
- Alle Teilnehmer empfangen die Nachricht

**Private Nachrichten:**
- Erste Nachricht: FLOOD (beide Richtungen lernen)
- Folgende Nachrichten: DIRECT (effizient)
- Nach ~180ms: Beide Pfade gelernt, DIRECT-Kommunikation möglich (bei guten Signalen)

**Allgemein:**
- Repeater ignorieren Duplikate automatisch
- "First Packet Wins" bei mehreren Pfaden
- Asymmetrische Routen sind normal und funktionieren

**Bidirektionales Path-Learning (nur private Nachrichten):**
- **Eine FLOOD-Nachricht** vom Sender löst automatischen Prozess aus
- Empfänger sendet automatisch PATH per FLOOD zurück
- Sender sendet automatisch reciprocal PATH per DIRECT
- **Gesamt: 2× FLOOD (hin & zurück) + 1× DIRECT**
- Beide Nodes kennen danach den optimalen Pfad zum anderen

**Hinweis zu asymmetrischen Routen:**
- Alice → Bob könnte über Repeater A gehen
- Bob → Alice könnte über Repeater B gehen
- Beide Richtungen verwenden den jeweils ersten empfangenen Pfad
- Kein Problem, da jeder Knoten seinen eigenen Pfad zur Gegenseite lernt
- Asymmetrische Routen sind ein gültiges und funktionierendes Szenario
