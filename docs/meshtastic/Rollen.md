#Rollen
In einem Meshtastic-Mesh entscheidet die Rollenverteilung, wie gut das Netz im Rheinland funktioniert. Sie beeinflusst Reichweite, Stabilität und Effizienz.

## Client
Ein Client ist die Standardeinstellung. Er nimmt aktiv am Mesh teil, sendet, empfängt und leitet Nachrichten weiter. Damit ist er das universell einsetzbare Gerät für die meisten Anwendungsfälle.

## Client-Mute
Der Client Mute ist eine Sonderform. Er sendet nur eigene Nachrichten und leitet keine fremden weiter. Das reduziert Funkverkehr und ist praktisch, wenn mehrere Geräte am gleichen Standort betrieben werden.

## Router & Repeater
Für stabile Netzabdeckung sind Router und Repeater wichtig:
 * Router fungieren als Relaispunkte, verbinden Knoten und sorgen für stabile Verbindungen auch über größere Entfernungen.
 * Repeater leiten nur weiter, erzeugen keinen eigenen Traffic und eignen sich als stille Knoten, um die Reichweite zu erhöhen.

## Sensoren
Sensoren bilden eine eigene Kategorie. Sie erfassen Daten wie Temperatur, Luftfeuchtigkeit oder Luftdruck und senden sie in Intervallen ins Mesh.

Viele Geräte haben Sensoren bereits eingebaut, die über die Geräteeinstellungen aktiviert werden können. Außerdem lassen sich viele Meshtastic-Geräte durch externe Sensoren erweitern, um zusätzliche Messwerte ins Mesh zu bringen. Sensoren erzeugen nur geringen Traffic. Sie routen standardmäßig nicht, können aber auch als Client oder Router arbeiten. Dann sollte das Sendeintervall sinnvoll gewählt werden, damit die Airtime nicht unnötig belastet wird.

## Tracker
Tracker senden regelmäßig ihre GPS-Position ins Mesh. Sie eignen sich für mobile Einsätze, Outdoor-Aktivitäten oder Asset-Tracking. Tracker funktionieren ähnlich wie Sensoren und erzeugen regelmäßigen, aber gut kontrollierbaren Traffic.

# Gerä­terollen im Rheinland-Mesh
| **Rolle**       | **Beschreibung**     | **Funktion im Mesh**                       | **Typische Nutzung**                         |
| --------------- | -------------------- | ------------------------------------------ | -------------------------------------------- |
| **CLIENT**      | Standard-Knoten      | Sendet, empfängt und leitet Nachrichten weiter | Handgeräte, mobile und stationäre Nodes      |
| **CLIENT_MUTE** | Leiser Client        | Sendet nur eigene Nachrichten, kein Routing | Mehrere Geräte am gleichen Standort          |
| **ROUTER**      | Infrastruktur-Knoten | Priorisiertes Weiterleiten von Nachrichten | Strategische, dauerhaft betriebene Standorte |
| **REPEATER**    | Reines Relais        | Leitet weiter ohne eigenen Traffic         | Reichweiten-Erweiterung, Airtime-sparend     |
| **SENSOR**      | Telemetrie-Knoten    | Sendet Mess- und Umweltdaten               | Wetter-, Umwelt- oder Monitoring-Nodes       |
| **TRACKER**     | Positions-Knoten     | Regelmäßige GPS-Positionsübertragung       | Mobile Einsätze, Outdoor-Aktivitäten         |

:::note
Wenn du dir unsicher bist, welche Rolle du wählen sollst, starte immer mit Client und frag bei Bedarf im WhatsApp-Channel nach.

Meshtastic bietet noch weitere spezialisierte Rollen (z. B. für TAK oder Sonderanwendungen). Die aktuelle Übersicht findest du auf der Seite von [meshtastic.org](https://meshtastic.org/docs/introduction/).
:::

# Platzierung und Kombination
Zu viele Router oder Repeater in unmittelbarer Nähe verursachen Funkkollisionen und ineffiziente Airtime-Nutzung. Ungünstig platzierte Knoten verringern die Reichweite und können asymmetrische Verbindungen erzeugen.
Sensoren und Tracker sollten so stehen, dass ihre Daten mindestens einen routingfähigen Knoten erreichen.

Wenn Client, Router, Repeater, Sensoren und Tracker sinnvoll kombiniert werden, arbeitet das Mesh im Rheinland stabil und effizient.
