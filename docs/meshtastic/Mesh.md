# Was ist ein Mesh?
Ein Mesh ist ein vermaschtes Netzwerk, in dem alle Knoten miteinander verbunden sind. Dies geschieht nicht über eine zentrale Basisstation, sondern direkt untereinander. Jeder Knoten kann Nachrichten empfangen, weiterleiten und selbst senden. Dadurch entsteht ein flexibles, robustes Netz, das auch dann funktioniert, wenn einzelne Knoten ausfallen oder schlecht erreichbar sind.

## Eigenschaften eines Mesh-Netzes
| **Eigenschaft** | **Beschreibung** |
|-----------------|------------------|
| Dezentrale Struktur | Es gibt keinen zentralen Server oder „Master“. Jeder Knoten ist gleichberechtigt und kann senden, empfangen und weiterleiten. |
| Selbstheilend | Fällt ein Knoten aus, sucht das Mesh automatisch alternative Wege. Nachrichten finden neue Pfade, solange andere Knoten erreichbar sind. |
| Mehrere mögliche Routen | Nachrichten können über verschiedene Pfade ihr Ziel erreichen. Das Mesh ist nicht auf eine einzelne Verbindung angewiesen. |
| Hohe Ausfallsicherheit | Je mehr Knoten aktiv sind, desto stabiler wird das Netz. Einzelne Ausfälle beeinträchtigen das Gesamtnetz kaum. |
| Reichweite durch Zusammenarbeit | Während ein einzelner Knoten nur eine begrenzte Reichweite hat, können viele Knoten gemeinsam große Gebiete abdecken und das Netz nach und nach erweitern. |

Voraussetzung dafür ist, dass Nachrichten alle erreichbaren Knoten erreichen. Dies wird durch das Broadcast-Prinzip ermöglicht.

# Broadcast im Mesh-Kontext
Meshtastic arbeitet auf Funkebene nach einem Broadcast-Prinzip. Dabei wird eine Nachricht nicht an einen einzelnen, gezielt adressierten Empfänger geschickt, sondern an alle Knoten, die sich in Funkreichweite befinden.

In der klassischen Netzwerktechnik bedeutet Broadcast, dass ein Paket an alle Teilnehmer eines gemeinsamen Netzsegments gesendet wird. Es gibt keinen spezifischen Zielknoten – jedes Gerät entscheidet selbst, ob die Nachricht für es relevant ist.

Übertragen auf Meshtastic bedeutet das, dass jede gesendete Nachricht zunächst ein **Funk-Broadcast** ist. Alle Knoten im Empfangsbereich hören mit und prüfen selbstständig, ob sie die Nachricht anzeigen, weiterleiten (wenn die Hop-Zahl größer als 0 ist) oder verwerfen, etwa weil es sich um ein Duplikat handelt oder die Hop-Zahl bereits 0 erreicht hat.

Zusammen mit dem Hop-Limit bildet dies das von Meshtastic verwendete Routing-Verfahren: **Hop-Limited Broadcast Flooding**.

# Hops im Meshtastic-Mesh
Hops bestimmen, wie viele Zwischenstationen eine Nachricht im Mesh durchlaufen darf, bevor sie verworfen wird. Jeder Hop ist ein „Sprung“ von einem Knoten zum nächsten. Dieses Prinzip begrenzt die Ausbreitung von Nachrichten und trägt zur Stabilität des Meshes bei.

## Was ein Hop technisch bedeutet
- Ein Hop beschreibt einen Weiterleitungsschritt über einen anderen Knoten.  
- Die Hop-Zahl zeigt an, wie weit entfernt der ursprüngliche Sender ist.  
- Jeder Hop erhöht die Latenz, da die Nachricht erneut empfangen, verarbeitet und gesendet wird.  
- Jeder Hop verbraucht zusätzliche Airtime, weil die Nachricht erneut ausgestrahlt wird.  
- Die Hop-Begrenzung verhindert, dass Nachrichten endlos im Netz kreisen (Routing-Schleifen).  
- Mit jedem Hop steigt die Wahrscheinlichkeit, dass eine Nachricht verloren geht (z. B. durch Kollisionen oder schlechten Empfang).

# Hops herunterzählen
Damit du dir besser vorstellen kannst, wie Hops im Alltag funktionieren, hier ein einfaches Beispiel:

1. **Node A** sendet eine Nachricht mit **3 Hops**.  
2. **Node B** empfängt die Nachricht → Hop-Zahl wird auf **2** reduziert.  
3. **Node B** leitet die Nachricht weiter.  
4. **Node C** empfängt die Nachricht → Hop-Zahl wird auf **1** reduziert.  
5. **Node C** leitet die Nachricht weiter.  
6. **Node D** empfängt die Nachricht → Hop-Zahl wird auf **0** reduziert.  
7. Da die Hop-Zahl jetzt **0** ist, wird die Nachricht **nicht mehr weitergeleitet**.

Die Nachricht erreicht also maximal **drei Zwischenstationen**, bevor sie aus dem Mesh verschwindet.

# Was passiert, wenn ein Node ausfällt?
Ein Mesh ist von Natur aus fehlertolerant. Fällt ein Node aus, werden Nachrichten automatisch über andere erreichbare Knoten weitergeleitet. Da es keine zentrale Instanz gibt, die ausfallen könnte, bleibt das Netzwerk funktionsfähig, solange mindestens ein alternativer Pfad existiert. Lediglich der Bereich, der ausschließlich über den ausgefallenen Node erreichbar war, wird vom Mesh getrennt.

### Beispiel
Fällt ein Router auf einem hohen Gebäude aus, verringert sich in diesem Gebiet die Reichweite. Andere Nodes übernehmen zwar die Weiterleitung der Nachrichten, jedoch unter Umständen mit geringerer Reichweite. Das Mesh selbst bleibt dabei stabil – lediglich die Abdeckung verändert sich.

# Welches Routing-Verfahren verwendet Meshtastic?
Meshtastic nutzt kein klassisches Routing-Protokoll wie z. B. das Routing Information Protocol, das Link-State-Routing-Protokoll Open Shortest Path First oder andere IP-basierte Mesh-Protokolle.

Stattdessen verwendet Meshtastic **Hop-Limited Broadcast Flooding**.

## Flooding mit Hop-Limit
Jede Nachricht wird zunächst an alle erreichbaren Knoten gesendet. Jeder Knoten entscheidet anschließend selbst, ob er die Nachricht weiterleitet, wobei die Hop-Zahl die Ausbreitung begrenzt. Doppelte Nachrichten werden erkannt und verworfen, sodass keine unnötige Last entsteht. Eine explizite Pfadberechnung oder Routing-Tabellen sind dabei nicht erforderlich.

Dieses Verfahren ist extrem robust und funktioniert auch dann zuverlässig, wenn sich Knoten bewegen, etwa bei Trackern oder in Fahrzeugen. Da keine komplexen Routing-Updates notwendig sind, eignet es sich besonders gut für LoRa-Netze mit geringer Bandbreite.

Der Preis dafür ist eine höhere Airtime im Vergleich zu klassischen Routing-Protokollen. Außerdem erfordert der Betrieb eine disziplinierte Konfiguration, insbesondere bei Hop-Zahlen, Rollen und Sendeintervallen.

Im Rheinland sind drei Hops in der Praxis ideal, da die meisten Knoten relativ dicht beieinander stehen und gut platzierte Router – etwa auf erhöhten Standorten – bereits große Bereiche abdecken. Zusätzliche Hops würden kaum noch Reichweite bringen, dafür aber deutlich mehr Airtime verursachen. Gleichzeitig verhindern drei Hops, dass Nachrichten aus weiter entfernten Regionen das lokale Mesh unnötig füllen.

:::note Empfehlung  
**3 Hops** sind der sichere Standard. Nur bei sehr speziellen Anforderungen lohnt sich eine Abweichung – im Zweifel funktioniert das Mesh im Rheinland so am zuverlässigsten.  
:::
