# Repeater-Setup

Ein Repeater erweitert die Reichweite des MeshCore-Netzwerks, indem er Nachrichten weiterleitet. Diese Anleitung erklärt die wichtigsten Einstellungen für den Betrieb eines Repeaters.

:::warning Nur für Infrastruktur
Repeater sind für unbemannten Betrieb gedacht. Für normale Nutzung flashe die **Companion**-Firmware!
:::

## CLI Cheat Sheet

Alle Befehle zum Konfigurieren eines Repeaters auf einen Blick. Eingabe über die serielle Console im [MeshCore Flasher](https://flasher.meshcore.dev/) nach dem Flashen.

```bash
set name DE-NW Bonn-Beuel
set owner.info Bernd aus Beuel
set lat 50.73597
set lon 7.11093
password MySecret

set radio 869.618,62.5,8,8
set dutycycle 10

set advert.interval 240
set flood.advert.interval 24

set txdelay 0.5
set direct.txdelay 0.3
set rxdelay 0

set multi.acks 1

set path.hash.mode 1
set loop.detect minimal

# Weiter: Regionen konfigurieren (siehe unten)
```

:::info
Nach allen Änderungen den Repeater neu starten: `reboot`
:::

Abschließend die Regionen konfigurieren: [Beispiel – alle Rheinland-Regionen anlegen](regionen#beispiel-alle-rheinland-regionen-anlegen)

## Konfiguration über Web-Interface

Nach dem Flashen kannst du deinen Repeater über die Web-Oberfläche konfigurieren:

1. Verbinde den Repeater per USB mit deinem Computer
2. Öffne https://config.meshcore.dev
3. Klicke auf "Connect" und wähle das Gerät aus

![MeshCore Repeater Konfiguration](/img/meshcore/repeater-config.png)

### Wichtige Einstellungen

#### Name & Standort

**Name**: Wähle einen aussagekräftigen Namen (z.B. "DE-NW Bonn-Beuel")

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
- **Duty Cycle**: 10%

:::info Duty Cycle
`set dutycycle 10` begrenzt die Sendezeit auf 10 % (ETSI EN300.220-2 für Deutschland).
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

Seit MeshCore 1.14 werden **2-Byte-Node-IDs** verwendet, was Kollisionen deutlich unwahrscheinlicher macht. Es ist dennoch ratsam, vor dem Deployment zu prüfen, dass kein anderer Repeater in deiner direkten Funkreichweite dieselbe 2-Byte-ID hat.

Mehr dazu und eine Schritt-für-Schritt-Anleitung zum Generieren eines Custom Keys findest du auf der Seite [Node-ID-Kollisionen vermeiden](node-id-kollisionen.md).

## Regionen konfigurieren

:::tip Wichtiger letzter Schritt
Nach der Grundkonfiguration solltest du deinen Repeater mit den passenden Regionen ausstatten. Dies ist für das zukünftige Netzwerk essentiell.
:::

Regionen begrenzen die Weiterleitung von Nachrichten auf definierte geografische Bereiche und verhindern unkontrolliertes Flooding im Netz. In der Mesh Rheinland Community verwenden wir derzeit die Regionen `de`, `de-nw`, `rheinland`, `bonn` und `koeln`.

**Nächster Schritt:** Lies die Anleitung zur [Regionen-Konfiguration](regionen.md), um deinen Repeater mit den passenden Regionen auszustatten.

## Häufige Fragen

**Kann ich einen Repeater per Funk konfigurieren?**

Ja, wenn du das Admin-Passwort kennst oder deine Companion-Node freigeschaltet wurde.

## Ressourcen

**Tools:**
- [MeshCore Flasher](https://flasher.meshcore.dev)
- [Prefix Analyzer](https://analyzer.letsmesh.net/nodes/prefix-utilization?region=CGN)
- [Key Generator](https://gessaman.com/mc-keygen/)
- [USB Config Interface](https://config.meshcore.dev)

**Dokumentation:**
- [MeshCore Settings Guide](https://www.meshcore.ch/settings)
- [Repeater CLI Reference](https://github.com/meshcore-dev/MeshCore/wiki/Repeater-&-Room-Server-CLI-Reference)
- [MeshCore FAQ](https://github.com/meshcore-dev/MeshCore/blob/main/docs/faq.md)
- [Key Generator GitHub](https://github.com/agessaman/meshcore-web-keygen)
