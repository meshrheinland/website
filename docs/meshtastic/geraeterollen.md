---
sidebar_position: 4
---

# Geräte­rollen

Die Rolle bestimmt, wie ein Node im Mesh agiert – ob er Nachrichten routet, Telemetrie sendet oder sich still verhält. Die richtige Wahl reduziert Funkkollisionen und verbessert die Netzqualität.

## Übersicht

| Rolle | Funktion | Typischer Einsatz |
|---|---|---|
| **CLIENT** | Sendet, empfängt, routet wenn nötig | Standard für alle Geräte |
| **CLIENT_MUTE** | Nur eigene Nachrichten, kein Routing | Mobile/portable Nodes, mehrere Geräte am selben Standort |
| **CLIENT_HIDDEN** | Sendet nur bei Bedarf | Stealth, Energiesparen |
| **CLIENT_BASE** | Bevorzugtes Rebroadcasting für/von favorisierte Nodes | Dachantenne mit definierten Favoriten |
| **ROUTER** | Bricht Rebroadcast nie ab, reduzierte Telemetrie | Feste Infrastrukturknoten |
| **ROUTER\_LATE** | Wie ROUTER, aber mit spätem Zeitslot | Isolierte Mesh-Segmente ohne direkten Router-Sichtbereich |
| **REPEATER** | Wie ROUTER, komplett unsichtbar (kein Remote-Admin möglich) | Unsichtbare Reichweitenerweiterung |
| **SENSOR** | Priorisierte Telemetrieübertragung | Wetter-/Umweltsensoren |
| **TRACKER** | Priorisierte GPS-Positionsübertragung | Mobile Einsätze, Asset-Tracking |
| **LOST\_AND\_FOUND** | Sendet Standort regelmäßig als Nachricht | Verlorene Geräte wiederfinden |
| **TAK** | Reduzierter Overhead für ATAK | ATAK-Integration |
| **TAK\_TRACKER** | Automatische PLI-Übertragung für ATAK | ATAK mit Positionsverfolgung |

## Rollen im Detail

### CLIENT

Standardrolle. Nimmt vollständig am Mesh teil: sendet, empfängt und routet – aber nur wenn kein anderer Node das Paket bereits weitergeleitet hat. Für die meisten Anwendungsfälle die richtige Wahl.

### CLIENT\_MUTE

Sendet nur eigene Nachrichten, leitet keine fremden Pakete weiter. Sinnvoll wenn mehrere Geräte am gleichen Standort betrieben werden – vermeidet unnötige Airtime-Belastung.

### CLIENT\_BASE

Priorisiert das Routing von und zu favorisierten Nodes, alle anderen Pakete behandelt es wie CLIENT. Geeignet für Basisstationen (Dach, Dachboden), bei denen lokale Router als Favoriten gesetzt sind – profitiert dadurch ebenfalls von Zero-Cost Hops.

### ROUTER

Für fest installierte Knoten an strategischen Positionen (Dach, Turm, Mast). Bricht einen geplanten Rebroadcast nie ab – auch dann nicht, wenn ein anderer Node das Paket bereits weitergeleitet hat. Sendet weniger Telemetrie und „schneidet sich vor" beim Rebroadcasting. Wird in der Nodes-Liste angezeigt. Werden Router gegenseitig als Favoriten eingetragen, zählen Hops zwischen ihnen nicht gegen das Hop-Limit (**Zero-Cost Hops**).

### ROUTER\_LATE

Wie ROUTER – bricht Rebroadcast nie ab – verwendet aber immer den späten Zeitslot, sodass ROUTER und andere höher priorisierte Nodes zuerst senden können. Geeignet für Standorte, die geografisch isolierte Mesh-Segmente anbinden (Tallagen, Funklöcher hinter Hügeln) – aber nur dort, wo kein normaler ROUTER die Verbindung übernehmen kann.

:::warning Airtime beachten
ROUTER_LATE erhöht die Gesamtairtime spürbar. ChUtil sollte unter 25 % und AirTxUtil unter 7–8 % bleiben. Für Dachknoten oder mobile Geräte ist CLIENT die bessere Wahl.
:::

### REPEATER

Verhält sich identisch zu ROUTER, aber komplett ohne eigenen Traffic – keine Telemetrie, keine Ankündigungen. Taucht nicht in der Nodes-Liste auf und ist damit nicht remote administrierbar.

:::note Deprecated
REPEATER ist seit Firmware v2.7.11 deprecated. Für neue Installationen ROUTER verwenden.
:::

### SENSOR

Sendet Telemetriedaten (Temperatur, Luftdruck usw.) mit höherer Priorität, auch bei hoher Kanalauslastung. Kombiniert mit Stromspar-Einstellungen schläft das Gerät zwischen den Messintervallen.

### TRACKER

Sendet regelmäßig GPS-Koordinaten mit hoher Priorität. Ideal für mobile Einsätze, Outdoor-Aktivitäten oder Asset-Tracking. Sendeintervall lässt sich gezielt steuern.

### Sonstige Rollen

**CLIENT_HIDDEN** sendet nur bei Bedarf (Stealth/Energiesparen). **LOST_AND_FOUND** sendet den Standort regelmäßig als Nachricht zur Geräteortung. **TAK** und **TAK_TRACKER** sind für ATAK-Integration optimiert – TAK_TRACKER sendet zusätzlich automatisch PLI-Positionsdaten.

## Hinweise zur Platzierung

:::warning Router und Repeater sparsam einsetzen
Zu viele Router oder Repeater in unmittelbarer Nähe verursachen Funkkollisionen und unnötigen Hopsverbrauch. Ungünstig platzierte Knoten degradieren das Netz durch asymmetrische Links.
:::

- Starte mit **CLIENT** – das passt für die meisten Fälle
- **ROUTER** und **REPEATER** nur an Standorten mit echter Infrastrukturrolle (Höhe, Reichweite, Dauerbetrieb)
- **CLIENT\_MUTE** wenn mehrere Geräte am selben Standort betrieben werden

Fragen zur Rollenwahl? Frag in der [WhatsApp-Community](https://chat.whatsapp.com/CRYnRrAzhYeDlQEJQZQpKi).

## Quellen

- [Device Configuration – meshtastic.org](https://meshtastic.org/docs/configuration/radio/device/)
- [Choosing the Right Device Role – meshtastic.org](https://meshtastic.org/blog/choosing-the-right-device-role/)
- [Demystifying ROUTER_LATE – meshtastic.org](https://meshtastic.org/blog/demystifying-router-late/)
- [Zero-Cost Hops & Favorite Routers – meshtastic.org](https://meshtastic.org/blog/zero-cost-hops-favorite-routers/)
