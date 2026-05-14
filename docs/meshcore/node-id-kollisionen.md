# Node-ID-Kollisionen vermeiden

MeshCore identifiziert Repeater im Routing über einen Prefix des Public Keys. Seit Version 1.14 unterstützt MeshCore **2-Byte- und 3-Byte-Node-IDs**, was die Kollisionsgefahr drastisch reduziert hat.

## Was hat sich mit Version 1.14 geändert?

Vor 1.14 wurde nur das **erste Byte** des Public Keys als Node-ID verwendet – das bedeutete lediglich 255 mögliche IDs. Bei dichten Netzwerken war die Kollisionsgefahr entsprechend hoch.

Ab Version 1.14 werden **2-Byte-IDs** als Standard für das Routing genutzt. Das ergibt über 65.000 mögliche Kombinationen. Kollisionen auf dem ersten Byte allein sind damit kein kritisches Problem mehr.

**Was bleibt relevant:** In unmittelbarer Funkreichweite sollten keine zwei Repeater dieselbe **2-Byte-Node-ID** haben, da Routing-Pfade über diesen Prefix gespeichert werden.

## Kollisionswahrscheinlichkeit mit 2-Byte-IDs

Mit 65.535 möglichen 2-Byte-IDs ist die Wahrscheinlichkeit einer zufälligen Kollision selbst in größeren Netzwerken gering:

- Bei 10 Repeatern in der Nähe: < 0,1 %
- Bei 100 Repeatern: < 0,8 %

Ein bewusstes Prüfen lohnt sich dennoch, insbesondere vor dem Deployment eines neuen Repeaters.

## Kollision prüfen und vermeiden

### 1. Benachbarte IDs prüfen

Der [MeshCore Prefix Analyzer](https://analyzer.letsmesh.net/nodes/prefix-utilization?region=CGN) zeigt die genutzten Node-Prefixe im Rheinland. Prüfe dort, welche 2-Byte-Prefixe in deiner Region bereits vergeben sind.

### 2. Key mit gewünschtem Prefix generieren

1. Öffne https://gessaman.com/mc-keygen/
2. Gib deine gewünschten zwei Hex-Zeichen (1-Byte-Prefix) oder vier Hex-Zeichen (2-Byte-Prefix) ein
3. Klicke auf "Generate Keys"
4. Kopiere den generierten Private Key

### 3. Key auf dem Repeater setzen

Nach dem Flashen über die serielle Console im [MeshCore Flasher](https://flasher.meshcore.dev/):

```bash
set prv.key <dein-generierter-private-key>
reboot
```

:::warning Wichtig
Der neue Key wird erst nach einem Neustart aktiv.
:::

## Häufige Fragen

**Sind Kollisionen bei Companion-Nodes auch ein Problem?**

Nein. Companions leiten keine Nachrichten weiter und sind nicht Teil der Routing-Pfade. Kollisionen betreffen nur Repeater.

**Kann ich die ID nach dem Flashen noch ändern?**

Ja, jederzeit über die serielle Schnittstelle:
```bash
set prv.key <your_private_key>
reboot
```
