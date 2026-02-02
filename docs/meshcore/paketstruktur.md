# Paketstruktur

Diese Seite erklärt den Aufbau eines MeshCore-Pakets auf Bit- und Byte-Ebene – vom LoRa-Funkpaket bis zum Mesh-Protokoll.

## Zwei Schichten: LoRa vs. Mesh

Ein MeshCore-Paket besteht aus zwei ineinander geschachtelten Protokoll-Schichten:

```mermaid
graph TB
    A[LoRa Physical Layer] --> B[LoRa Frame]
    B --> C[Mesh Protocol]
    C --> D[Payload Data]

    style A fill:#cfd8dc
    style B fill:#b0bec5
    style C fill:#e3f2fd
    style D fill:#e8f5e9
```

### 1. LoRa Physical Layer

Der LoRa-Chip (z.B. SX1262, SX1276, LLCC68) fügt automatisch hinzu:

```mermaid
block-beta
  columns 8
  A["Preamble<br/>variabel"]:2
  B["LoRa Header<br/>0-20 Bits"]:2
  C["Mesh Packet<br/>variabel"]:3
  D["CRC-16<br/>2 Bytes"]:1

  style A fill:#cfd8dc,stroke:#546e7a,stroke-width:3px
  style B fill:#b0bec5,stroke:#455a64,stroke-width:3px
  style C fill:#90a4ae,stroke:#37474f,stroke-width:3px
  style D fill:#78909c,stroke:#263238,stroke-width:3px
```

| Komponente | Größe | Hinzugefügt von | Beschreibung |
|------------|-------|-----------------|--------------|
| **Preamble** | konfigurierbar | LoRa-Chip | Synchronisation der Empfänger |
| **LoRa Header** | 0-20 Bits | LoRa-Chip | Explicit/Implicit Mode, Coding Rate |
| **Payload** | variabel | Firmware | Das Mesh-Paket (siehe unten) |
| **CRC-16** | 2 Bytes | LoRa-Chip | Hardware-Checksumme über Payload |

:::tip LoRa-CRC wird automatisch validiert
Der LoRa-Chip prüft die CRC-16 automatisch. Nur fehlerfreie Pakete werden an die Firmware übergeben. `setCRC(1)` aktiviert dies in der Firmware.
:::

### 2. Mesh Protocol Layer

Das Mesh-Paket **innerhalb** des LoRa-Payloads hat folgende Struktur:

```mermaid
block-beta
  columns 11
  H["Header<br/>1 Byte"]:1
  TC["Transport Codes<br/>4 Bytes<br/>optional"]:2
  PL["Path Len<br/>1 Byte"]:1
  PT["Path<br/>0-64 Bytes"]:3
  PD["Payload<br/>0-184 Bytes"]:3

  style H fill:#e3f2fd,stroke:#1976d2,stroke-width:3px
  style TC fill:#fce4ec,stroke:#c2185b,stroke-width:3px
  style PL fill:#fff3e0,stroke:#f57c00,stroke-width:3px
  style PT fill:#f3e5f5,stroke:#7b1fa2,stroke-width:3px
  style PD fill:#e8f5e9,stroke:#388e3c,stroke-width:3px
```

## Detaillierte Frame-Struktur

### Minimales Frame (ohne Transport Codes, ohne Path)

**Frame-Struktur:**

```mermaid
block-beta
  columns 5
  H["Header<br/>1 Byte"]:1
  PL["Path Length<br/>1 Byte<br/>0x00"]:1
  P["Payload<br/>0-184 Bytes<br/>variabel"]:3

  style H fill:#e3f2fd,stroke:#1976d2,stroke-width:3px
  style PL fill:#fff3e0,stroke:#f57c00,stroke-width:3px
  style P fill:#e8f5e9,stroke:#388e3c,stroke-width:3px
```

**Header-Byte im Detail:**

```mermaid
graph TB
    H["Header Byte<br/>8 Bits"]
    H --> V["Bits 6-7<br/><b>Payload Version</b><br/>2 Bits<br/>00 = Version 1"]
    H --> T["Bits 2-5<br/><b>Payload Type</b><br/>4 Bits<br/>0000-1111"]
    H --> R["Bits 0-1<br/><b>Route Type</b><br/>2 Bits<br/>00-11"]

    style H fill:#e3f2fd,stroke:#1976d2,stroke-width:3px
    style V fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    style T fill:#e1f5fe,stroke:#0277bd,stroke-width:2px
    style R fill:#fff9c4,stroke:#f57f17,stroke-width:2px
```

**Bit-Layout:**

```
 Bit:  7   6   5   4   3   2   1   0
     ┌───┬───┬───┬───┬───┬───┬───┬───┐
     │Ver│Ver│ Type  │ Type  │RT │RT │
     └───┴───┴───┴───┴───┴───┴───┴───┘
       └─┬─┘   └────┬────┘   └──┬──┘
    Payload      Payload      Route
    Version       Type         Type
    (2 Bits)     (4 Bits)    (2 Bits)
```

**Gesamtlänge in Bytes**: 2 + Payload-Länge

### Vollständiges Frame (mit Transport Codes und Path)

**Frame-Struktur:**

```mermaid
block-beta
  columns 12
  H["Header<br/>1 Byte"]:1
  TC1["Transport Code 1<br/>2 Bytes"]:2
  TC2["Transport Code 2<br/>2 Bytes"]:2
  PL["Path Len<br/>1 Byte"]:1
  PT["Path<br/>0-64 Bytes"]:3
  PD["Payload<br/>0-184 Bytes"]:3

  style H fill:#e3f2fd,stroke:#1976d2,stroke-width:3px
  style TC1 fill:#fce4ec,stroke:#c2185b,stroke-width:3px
  style TC2 fill:#fce4ec,stroke:#c2185b,stroke-width:3px
  style PL fill:#fff3e0,stroke:#f57c00,stroke-width:3px
  style PT fill:#f3e5f5,stroke:#7b1fa2,stroke-width:3px
  style PD fill:#e8f5e9,stroke:#388e3c,stroke-width:3px
```

**Beispiel mit 3 Hops:**

```mermaid
block-beta
  columns 12
  H["Header<br/>0x00"]:1
  C1["Code 1<br/>0x1234"]:2
  C2["Code 2<br/>0x5678"]:2
  PL["Path Len<br/>0x03"]:1
  H1["H1<br/>0xA1"]:1
  H2["H2<br/>0xB2"]:1
  H3["H3<br/>0xC3"]:1
  PD["Payload<br/>..."]:3

  style H fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
  style C1 fill:#fce4ec,stroke:#c2185b,stroke-width:2px
  style C2 fill:#fce4ec,stroke:#c2185b,stroke-width:2px
  style PL fill:#fff3e0,stroke:#f57c00,stroke-width:2px
  style H1 fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
  style H2 fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
  style H3 fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
  style PD fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
```

**Beispiel-Bytes:**
```
Byte  0:    Header
Byte  1-2:  Transport Code 1 (16-bit, Little Endian)
Byte  3-4:  Transport Code 2 (16-bit, Little Endian)
Byte  5:    Path Length (z.B. 0x03 für 3 Hops)
Byte  6-8:  Path (3 Node-Hashes à 1 Byte)
Byte  9+:   Payload
```

**Gesamtlänge in Bytes**: 6 + Path-Länge + Payload-Länge

## Längenbestimmung

:::info Keine explizite Payload-Länge
Das Mesh-Protokoll speichert **keine** explizite Payload-Länge. Diese wird implizit berechnet.
:::

**Formel**:
```
payload_len = total_frame_len - header_size - transport_codes_size - 1 - path_len
```

## Beispiele

### Beispiel 1: Advertisement eines Repeaters

Ein Repeater in Bonn-Hardtberg sendet ein Advertisement (FLOOD-Routing):

**Vollständiger Frame (131 Bytes):**
```
1100FE5616140E71B9E01E5DA75103F56550FFFD78C7DE35CEB30161401CD3A155990B7C5F69FC2DE8FE34DE983DED22BD24A7866A258D823DA714654926A9EDEB54C23EFD990FF25FB22C2B74E0C30177AEB7635CC5CB03CA65BD59A407B891F976FE883D0C9232D1050372946B00442D424E2D353331323320486172647462657267
```

**Farbige Byte-Range-Übersicht:**

```mermaid
block-beta
  columns 12
  H["Header<br/>0x11<br/>(1 Byte)"]:1
  PL["Path Len<br/>0x00<br/>(1 Byte)"]:1
  PK["Public Key<br/>FE56...5599<br/>(32 Bytes)"]:3
  TS["Timestamp<br/>0B7C5F69<br/>(4 Bytes)"]:2
  SG["Signature<br/>FC2D...3D0C<br/>(64 Bytes)"]:3
  AF["Flags<br/>0x92<br/>(1 B)"]:1
  LAT["Latitude<br/>32D10503<br/>(4 B)"]:1

  style H fill:#e3f2fd,stroke:#1976d2,stroke-width:3px
  style PL fill:#fff3e0,stroke:#f57c00,stroke-width:3px
  style PK fill:#e8f5e9,stroke:#388e3c,stroke-width:3px
  style TS fill:#e8f5e9,stroke:#388e3c,stroke-width:3px
  style SG fill:#e8f5e9,stroke:#388e3c,stroke-width:3px
  style AF fill:#e8f5e9,stroke:#388e3c,stroke-width:3px
  style LAT fill:#e8f5e9,stroke:#388e3c,stroke-width:3px
```

```mermaid
block-beta
  columns 12
  LON["Longitude<br/>72946B00<br/>(4 Bytes)"]:2
  NAME["Node Name<br/>442D424E2D3533...<br/>(20 Bytes)"]:10

  style LON fill:#e8f5e9,stroke:#388e3c,stroke-width:3px
  style NAME fill:#e8f5e9,stroke:#388e3c,stroke-width:3px
```

**Hex-Breakdown mit Byte-Positionen:**

| Bytes | Feld | Hex-Wert |
|-------|------|----------|
| **0** | Header | `11` |
| **1** | Path Length | `00` |
| **2-33** | Public Key | `FE5616140E71B9E01E5DA75103F56550FFFD78C7DE35CEB30161401CD3A15599` |
| **34-37** | Timestamp | `0B7C5F69` |
| **38-101** | Signature | `FC2DE8FE34DE983DED22BD24A7866A258D823DA714654926A9EDEB54C23EFD990FF25FB22C2B74E0C30177AEB7635CC5CB03CA65BD59A407B891F976FE883D0C` |
| **102** | App Flags | `92` |
| **103-106** | Latitude | `32D10503` |
| **107-110** | Longitude | `72946B00` |
| **111-130** | Node Name | `442D424E2D353331323320486172647462657267` |

**Dekodierte Werte:**

| Feld | Roh-Wert | Dekodiert |
|------|----------|-----------|
| **Header** | `0x11` | FLOOD (0x01) + ADVERT (0x04) + Version 1 |
| **Path Length** | `0x00` | 0 Bytes (kein Pfad bei FLOOD) |
| **Public Key** | 32 Bytes | Ed25519 Public Key (Node-Identität) |
| **Timestamp** | `0B7C5F69` (LE) | **1767865355** = **2026-01-08 09:42:35 UTC** |
| **Signature** | 64 Bytes | Ed25519-Signatur über (PubKey + Timestamp + AppData) |
| **App Flags** | `0x92` = `10010010` | Repeater ✓, Location ✓, Name ✓ |
| **Latitude** | `32D10503` (LE) | **50712882** → **50.712882° N** |
| **Longitude** | `72946B00` (LE) | **7050354** → **7.050354° E** |
| **Node Name** | ASCII-Hex | **"D-BN-53123 Hardtberg"** (20 Zeichen) |

**Header-Bit-Dekodierung:**

```mermaid
graph TB
    H["Header: 0x11<br/>00010001 binär"]
    H --> V["Bits 6-7: 00<br/><b>Version 1 (0x00)</b>"]
    H --> T["Bits 2-5: 0100<br/><b>ADVERT (0x04)</b>"]
    H --> R["Bits 0-1: 01<br/><b>FLOOD (0x01)</b>"]

    style H fill:#ffebee,stroke:#c62828,stroke-width:3px
    style V fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    style T fill:#e1f5fe,stroke:#0277bd,stroke-width:2px
    style R fill:#fff9c4,stroke:#f57f17,stroke-width:2px
```

**App Data Flags (0x92 = 10010010 binär):**

```mermaid
block-beta
  columns 8
  B7["Bit 7<br/>has_name<br/>✓"]:1
  B6["Bit 6<br/>feature_2<br/>-"]:1
  B5["Bit 5<br/>feature_1<br/>-"]:1
  B4["Bit 4<br/>has_location<br/>✓"]:1
  B3["Bit 3<br/>is_sensor<br/>-"]:1
  B2["Bit 2<br/>room_server<br/>-"]:1
  B1["Bit 1<br/>is_repeater<br/>✓"]:1
  B0["Bit 0<br/>chat_node<br/>-"]:1

  style B7 fill:#e8f5e9,stroke:#388e3c,stroke-width:3px
  style B6 fill:#f5f5f5,stroke:#9e9e9e,stroke-width:1px
  style B5 fill:#f5f5f5,stroke:#9e9e9e,stroke-width:1px
  style B4 fill:#e8f5e9,stroke:#388e3c,stroke-width:3px
  style B3 fill:#f5f5f5,stroke:#9e9e9e,stroke-width:1px
  style B2 fill:#f5f5f5,stroke:#9e9e9e,stroke-width:1px
  style B1 fill:#e8f5e9,stroke:#388e3c,stroke-width:3px
  style B0 fill:#f5f5f5,stroke:#9e9e9e,stroke-width:1px
```

**Standort:**
- **Koordinaten**: 50.712882°N, 7.050354°E
- **Ort**: Bonn-Hardtberg, Deutschland (Rheinland)
- **Postleitzahl**: D-BN-53123
- **Node-Typ**: Repeater mit GPS und Name

**Visualisierung im MeshCore Analyzer:**

![Advertisement Frame Breakdown](/img/meshcore/advert.png)

*Dieser Screenshot zeigt die detaillierte Paket-Analyse mit Byte-für-Byte-Breakdown und farbcodierter Darstellung aller Felder.*

### Beispiel 2: Text Message "Hallo Ulli!"

Eine echte Textnachricht an Ulli mit dem Inhalt "Hallo Ulli!" direkt übermittelt ohne Hops:

**Vollständiger Frame (22 Bytes):**
```
0A004F37CD40E201D82228058A434BF27B926B6F43F7
```

**Farbige Byte-Range-Übersicht:**

```mermaid
block-beta
  columns 11
  H["Header<br/>0x0A<br/>(1 Byte)"]:1
  PL["Path Len<br/>0x00<br/>(1 Byte)"]:1
  D["Dest Hash<br/>0x4F<br/>(1 Byte)"]:1
  S["Src Hash<br/>0x37<br/>(1 Byte)"]:1
  M["MAC<br/>CD40<br/>(2 Bytes)"]:2
  C["Ciphertext<br/>E201D822...<br/>(16 Bytes)"]:5

  style H fill:#e3f2fd,stroke:#1976d2,stroke-width:3px
  style PL fill:#fff3e0,stroke:#f57c00,stroke-width:3px
  style D fill:#e8f5e9,stroke:#388e3c,stroke-width:3px
  style S fill:#e8f5e9,stroke:#388e3c,stroke-width:3px
  style M fill:#e8f5e9,stroke:#388e3c,stroke-width:3px
  style C fill:#e8f5e9,stroke:#388e3c,stroke-width:3px
```

**Hex-Breakdown mit Byte-Positionen:**

| Bytes | Feld | Hex-Wert |
|-------|------|----------|
| **0** | Header | `0A` |
| **1** | Path Length | `00` |
| **2** | Dest Hash | `4F` |
| **3** | Source Hash | `37` |
| **4-5** | MAC | `CD40` |
| **6-21** | Ciphertext | `E201D82228058A434BF27B926B6F43F7` |

**Dekodierte Werte:**

| Feld | Roh-Wert | Dekodiert |
|------|----------|-----------|
| **Header** | `0x0A` | DIRECT (0x02) + TEXT_MSG (0x02) + Version 1 |
| **Path Length** | `0x00` | 0 Bytes (keine Repeater, direkte Verbindung) |
| **Dest Hash** | `0x4F` | Empfänger: Ulli (Hash von Public Key) |
| **Source Hash** | `0x37` | Sender (Hash von Public Key) |
| **MAC** | `0xCD40` | Message Authentication Code (2 Bytes) |
| **Ciphertext** | 16 Bytes | Verschlüsselt: Timestamp + Type + "Hallo Ulli!" |

**Header-Bit-Dekodierung:**

```mermaid
graph TB
    H["Header: 0x0A<br/>00001010 binär"]
    H --> V["Bits 6-7: 00<br/><b>Version 1 (0x00)</b>"]
    H --> T["Bits 2-5: 0010<br/><b>TXT_MSG (0x02)</b>"]
    H --> R["Bits 0-1: 10<br/><b>DIRECT (0x02)</b>"]

    style H fill:#ffebee,stroke:#c62828,stroke-width:3px
    style V fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    style T fill:#e1f5fe,stroke:#0277bd,stroke-width:2px
    style R fill:#fff9c4,stroke:#f57f17,stroke-width:2px
```

**Struktur nach Entschlüsselung:**

Nach Entschlüsselung mit ECDH (Ed25519) enthält der Ciphertext:

```mermaid
block-beta
  columns 7
  TS["Timestamp<br/>4 Bytes<br/>Unix Time"]:3
  TY["Type+Attempt<br/>1 Byte<br/>0x00"]:1
  MSG["Message<br/>11 Bytes<br/>Hallo Ulli!"]:3

  style TS fill:#e8f5e9,stroke:#388e3c,stroke-width:3px
  style TY fill:#e8f5e9,stroke:#388e3c,stroke-width:3px
  style MSG fill:#e8f5e9,stroke:#388e3c,stroke-width:3px
```

**Nachricht:**
- **Text**: "Hallo Ulli!" (UTF-8, 11 Bytes)
- **Type**: 0x00 = Plain Text
- **Attempt**: 0 (erste Übertragung)

**Besonderheiten:**
- **Path Length = 0**: Direkte Punkt-zu-Punkt-Verbindung ohne Repeater
- **DIRECT Routing**: Verwendet vorher gelernten Pfad (in diesem Fall leer = lokale Kommunikation)
- **Verschlüsselung**: ECDH mit Ed25519-Schlüsseln, nur Empfänger kann entschlüsseln

**Visualisierung im MeshCore Analyzer:**

![Text Message Frame Breakdown](/img/meshcore/direct-message.png)

*Dieser Screenshot zeigt die Textnachricht "Hallo Ulli!" mit vollständiger Frame-Dekodierung und verschlüsseltem Payload.*

## Maximale Frame-Größe

```mermaid
graph TD
    A[Max LoRa Payload: 255 Bytes] --> B{Mit Transport Codes?}
    B -->|Ja| C[Header: 1<br/>Codes: 4<br/>Path Len: 1<br/>Gesamt: 6 Bytes]
    B -->|Nein| D[Header: 1<br/>Path Len: 1<br/>Gesamt: 2 Bytes]

    C --> E[Max Path: 64 Bytes]
    D --> E

    E --> F[Max Payload: 184 Bytes]
```

**Konstanten** (aus `MeshCore.h`):
```cpp
#define MAX_PATH_SIZE        64
#define MAX_PACKET_PAYLOAD  184
#define MAX_TRANS_UNIT      255
```

**Berechnung**:
```
Ohne Transport Codes:
  1 (Header) + 1 (Path Len) + 64 (Path) + 184 (Payload) = 250 Bytes ✅

Mit Transport Codes:
  1 (Header) + 4 (Codes) + 1 (Path Len) + 64 (Path) + 184 (Payload) = 254 Bytes ✅
```

## Checksumme / CRC

### Warum keine Mesh-CRC?

Das Mesh-Protokoll hat **keine eigene Checksumme**, weil:

1. **LoRa-Hardware-CRC** ist bereits aktiv (`setCRC(1)`)
2. LoRa-CRC-16 ist sehr zuverlässig (Hamming-Distanz)
3. Nur CRC-valide Frames werden an Firmware übergeben
4. Zusätzliche CRC wäre redundant

```mermaid
sequenceDiagram
    participant Air as LoRa Air Interface
    participant Chip as SX1262 Chip
    participant FW as Firmware

    Air->>Chip: Frame empfangen
    Chip->>Chip: CRC-16 prüfen
    alt CRC OK
        Chip->>FW: Frame + Länge
        FW->>FW: Mesh-Paket deserialisieren
    else CRC Fehler
        Chip->>Chip: Frame verwerfen
        Note over FW: Firmware erfährt nichts davon
    end
```

## Frame-Parsing-Ablauf

```mermaid
flowchart TD
    A[LoRa-Frame empfangen] --> B{CRC OK?}
    B -->|Nein| Z[Frame verwerfen]
    B -->|Ja| C[Header lesen: 1 Byte]

    C --> D{Transport Codes?}
    D -->|Ja| E[Codes lesen: 4 Bytes]
    D -->|Nein| F[Path Length lesen: 1 Byte]
    E --> F

    F --> G[Path lesen: path_len Bytes]
    G --> H[Payload = Rest des Frames]

    H --> I{Payload-Typ?}
    I -->|Encrypted| J[Dest/Src Hash + MAC extrahieren]
    I -->|Advert| K[Public Key + Signature prüfen]
    I -->|ACK| L[CRC32 extrahieren]

    J --> M[Entschlüsseln mit ECDH]
    K --> N[Signatur validieren]
    L --> O[ACK verarbeiten]
```

## Header-Bit-Dekodierung

Der Header (1 Byte) kodiert drei Werte:

```
Bit:     7  6  5  4  3  2  1  0
         [Ver ][  Type  ][ RT ]

RT   = Route Type (2 Bits)
Type = Payload Type (4 Bits)
Ver  = Payload Version (2 Bits)
```

**Beispiel**: Header = `0x0A` (binär: `00001010`)

```
  0  0  0  0  1  0  1  0
 [0  0][0  1  0  0][1  0]
 Ver=0  Type=4     RT=2
```

- Route Type: `10` = DIRECT (0x02)
- Payload Type: `0100` = ADVERT (0x04)
- Version: `00` = Version 1 (0x00)

**Umgekehrt kodieren**:

```cpp
header = (route_type & 0x03)           // Bits 0-1
       | ((payload_type & 0x0F) << 2)  // Bits 2-5
       | ((version & 0x03) << 6);      // Bits 6-7
```

## Zusammenfassung

| Aspekt | Wert |
|--------|------|
| **Minimale Frame-Größe** | 2 Bytes (Header + Path-Len=0 + leere Payload) |
| **Maximale Frame-Größe** | 254 Bytes (mit Transport Codes) |
| **Checksumme** | LoRa-Hardware-CRC-16 (automatisch) |
| **Längenbestimmung** | Implizit: `payload_len = total - overhead` |
| **Header-Größe** | 1 Byte (Route, Type, Version) |
| **Optionale Felder** | Transport Codes (4 Bytes), Path (0-64 Bytes) |

:::tip Wire-Format ist kompakt
MeshCore nutzt jeden Byte effizient: Keine Padding-Bytes, keine redundanten Längenfelder, keine doppelte Checksumme.
:::
