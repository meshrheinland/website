# Repeater-Setup

Ein Repeater erweitert die Reichweite des MeshCore-Netzwerks, indem er Nachrichten weiterleitet. Diese Anleitung erklärt die wichtigsten Einstellungen und wie du Node-ID-Kollisionen mit benachbarten Repeatern vermeidest.

:::warning Nur für Infrastruktur
Repeater sind für unbemannten Betrieb gedacht. Für normale Nutzung flashe die **Companion**-Firmware!
:::

## Konfiguration über Web-Interface

Nach dem Flashen kannst du deinen Repeater über die Web-Oberfläche konfigurieren:

1. Verbinde den Repeater per USB mit deinem Computer
2. Öffne https://config.meshcore.dev
3. Klicke auf "Connect" und wähle das Gerät aus

![MeshCore Repeater Konfiguration](/img/meshcore-repeater-config.png)

### Wichtige Einstellungen

#### Name & Standort

**Name**: Wähle einen aussagekräftigen Namen (z.B. "DE-BN-53225 Beuel")

**Latitude / Longitude**:

:::warning Standort & Privatsphäre
Überlege dir genau, welche Position du angibst. Ein Versatz von einigen Metern mit ähnlichen topologischen Eigenschaften schützt deine Privatsphäre, ohne die Netzwerk-Übersicht zu beeinträchtigen.
:::

#### Zugriffskontrolle

**Guest password**:

:::tip Offener Zugang empfohlen
Lasse das Feld **leer**, damit sich jeder ohne Passwort anmelden kann. Dies fördert die offene Nutzung des Mesh-Netzwerks.
:::

**New Admin password**: Setze ein Admin-Passwort, um deinen Repeater vor ungewollten Änderungen zu schützen.

#### Radio-Einstellungen (Rheinland-Standard)

**Preset**: EU/UK (Narrow)

Die Radio-Parameter sollten automatisch korrekt gesetzt sein:
- **Frequency**: 869.618 MHz
- **Bandwidth**: 62.5 kHz
- **Spreading Factor**: 8
- **Coding Rate**: 8
- **TX Power**: 22 dBm
- **Airtime factor**: 9

:::info Airtime Factor
Der Airtime Factor begrenzt die Sendezeit und berechnet sich aus: `airtime_factor = (100 / duty_cycle) - 1`. Für Deutschland gilt ein 10% Duty Cycle (ETSI EN300.220-2), daher: `(100 / 10) - 1 = 9`.
:::

:::info Einstellungen speichern
Klicke nach allen Änderungen auf "Save settings" am unteren Rand.
:::

#### Advert senden

Nach dem Speichern der Einstellungen klicke auf **"Send Advert"**, damit dein Repeater im Netzwerk sichtbar wird.

:::info Erweiterte Konfiguration
Für erweiterte Einstellungen, die über die Web-Oberfläche hinausgehen, steht die [Repeater CLI Reference](https://github.com/meshcore-dev/MeshCore/wiki/Repeater-&-Room-Server-CLI-Reference) zur Verfügung. Hierüber lassen sich z.B. Advert-Intervalle, Bridging oder Region-Management detailliert konfigurieren.
:::

## Node-ID-Kollisionen vermeiden

:::warning Node-ID-Kollisionen
MeshCore nutzt das **erste Byte** des Public Keys als Node-ID für Routing. Wenn zwei benachbarte Repeater die gleiche Node-ID haben, sind sie im Routing nicht voneinander zu unterscheiden. Für sauberes Routing sollte jeder Repeater in Funkreichweite eine eindeutige Node-ID haben.
:::

### Das Problem verstehen

MeshCore-Nodes lernen Pfade zu anderen Nodes, indem sie sich die Hop-Sequenzen merken. Jeder Repeater wird dabei über das erste Byte seines Public Keys identifiziert.

**Beispiel-Pfad:**
```
Node A → Repeater [3F...] → Repeater [B2...] → Node B
```

Der Pfad wird als `3F → B2` gespeichert.

**Was passiert bei Kollisionen?**

Wenn zwei benachbarte Repeater die gleiche Node-ID haben (z.B. beide `3F`):
- Pfade können nicht eindeutig gespeichert werden
- Routing-Entscheidungen werden fehlerhaft
- Nachrichten erreichen ihr Ziel nicht zuverlässig

**Kritisch:** Mit nur 255 möglichen IDs (00-FE) ist die Kollisionsgefahr in dichten Netzwerken hoch!

**Kollisionswahrscheinlichkeit:**
- Bei 10 Repeatern in der Nähe: ~4%
- Bei 20 Repeatern: ~8%
- Bei 30 Repeatern: ~12%

### Die Lösung: Custom Key Generator

#### Schritt-für-Schritt-Anleitung

**1. Benachbarte Repeater-IDs prüfen**

Der [MeshCore Prefix Analyzer](https://analyzer.letsmesh.net/nodes/prefix-utilization?region=CGN) visualisiert die Nutzung von Node-Prefixen im Rheinland und zeigt dir direkt, welche IDs bereits vergeben sind und welche noch frei sind.

1. Öffne https://analyzer.letsmesh.net/nodes/prefix-utilization?region=CGN
2. Überprüfe die Visualisierung der verwendeten Prefixe in der Region CGN
3. Wähle einen freien Prefix für deinen Repeater

**Beispiel belegter IDs:**
```
Repeater Köln-Süd:    3F...
Repeater Bonn-Nord:   B2...
Repeater Leverkusen:  C4...
```

**2. Freie Node-ID wählen**

Wähle einen Hexwert (00-FE), der **nicht** in deiner Umgebung verwendet wird.

**Tipp:** Nutze den [Prefix Analyzer](https://analyzer.letsmesh.net/nodes/prefix-utilization?region=CGN), um auf einen Blick zu sehen, welche IDs frei sind.

**3. Key generieren**

1. Öffne https://gessaman.com/mc-keygen/
2. Gib deine gewählte ID ein (z.B. `A7`)
3. Klicke auf "Generate Keys"
4. Warte, bis ein passender Key generiert wurde (bei 2 Zeichen: wenige Sekunden)

**4. Private Key notieren**

Kopiere den generierten Private Key aus dem Key Generator.

**5. Repeater flashen**

1. Öffne den [MeshCore Flasher](https://flasher.meshcore.dev/)
2. Wähle Repeater-Firmware
3. Flashe das Gerät (Keys werden automatisch generiert)

**6. Key über serielle Console ändern**

Nach dem Flashen:

1. Öffne im MeshCore Flasher die Console
2. Setze den Private Key mit dem Kommando:
   ```bash
   set prv.key <dein-generierter-private-key>
   ```
3. Starte den Repeater neu, damit der Key aktiv wird:
   ```bash
   reboot
   ```

:::warning Wichtig
Der Custom Key muss nach dem Flashen über die serielle Console gesetzt werden. Es gibt keine Möglichkeit, den Key direkt beim Flashen zu importieren. Der neue Key wird erst nach einem Neustart aktiv.
:::

### Prefix-Nutzung prüfen

Nutze den [Prefix Analyzer](https://analyzer.letsmesh.net/nodes/prefix-utilization?region=CGN), um die Prefix-Nutzung im Rheinland zu überprüfen:

- Zeigt verwendete und freie Prefixe auf einen Blick
- Visualisiert die Belegung aller 255 möglichen IDs (00-FE)
- Ideal zur Vermeidung von Kollisionen vor dem Deployment

## Regionen konfigurieren

:::tip Wichtiger letzter Schritt
Nach der Grundkonfiguration solltest du deinen Repeater mit den passenden Regionen ausstatten. Dies ist für das zukünftige Netzwerk essentiell.
:::

Regionen begrenzen die Weiterleitung von Nachrichten auf definierte geografische Bereiche und verhindern unkontrolliertes Flooding im Netz. In der Mesh Rheinland Community verwenden wir derzeit die Regionen `#de`, `#nrw`, `#rheinland`, `#bonn` und `#koeln`.

**Nächster Schritt:** Lies die Anleitung zur [Regionen-Konfiguration](regionen.md), um deinen Repeater mit den passenden Regionen auszustatten.

## Häufige Fragen

**Wie finde ich heraus, welche IDs in meiner Nähe aktiv sind?**

Nutze den [Prefix Analyzer](https://analyzer.letsmesh.net/nodes/prefix-utilization?region=CGN), der alle verwendeten und freien Node-IDs im Rheinland visualisiert.

**Kann ich die ID nach dem Flashen ändern?**

Ja, über die serielle Schnittstelle mit dem CLI-Kommando:
```bash
set prv.key <your_private_key>
```

Dies ist der empfohlene Weg, um einen Custom Key zu setzen.

**Sind Kollisionen bei Companion-Nodes auch ein Problem?**

Nein. Companions leiten keine Nachrichten weiter und sind nicht Teil der Routing-Pfade. Kollisionen betreffen nur Repeater.

**Kann ich einen Repeater per Funk konfigurieren?**

Ja, wenn du das Admin-Passwort kennst oder deine Companion-Node freigeschaltet wurde.

## Ressourcen

**Tools:**
- MeshCore Flasher: https://flasher.meshcore.dev
- Prefix Analyzer: https://analyzer.letsmesh.net/nodes/prefix-utilization?region=CGN
- Key Generator: https://gessaman.com/mc-keygen/
- USB Config Interface: https://config.meshcore.dev

**Dokumentation:**
- MeshCore Settings Guide: https://www.meshcore.ch/settings
- Repeater CLI Reference: https://github.com/meshcore-dev/MeshCore/wiki/Repeater-&-Room-Server-CLI-Reference
- MeshCore FAQ: https://github.com/meshcore-dev/MeshCore/blob/main/docs/faq.md
- Key Generator GitHub: https://github.com/agessaman/meshcore-web-keygen
