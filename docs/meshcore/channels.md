# Kanäle

Nach der Installation der Companion-Firmware ist der `Public`-Kanal für offene, netzweite Kommunikation bereits verfügbar.

## Was sind Kanäle?

Ein **Kanal** strukturiert die Kommunikation im Mesh. MeshCore unterscheidet drei Kanaltypen:

- **Öffentlicher Kanal** – Durch einen statischen, im MeshCore-Code hinterlegten 16-Byte-Schlüssel gesichert. Für alle Teilnehmer zugänglich.
- **Hash-Kanäle** – Öffentliche Kanäle, deren 16-Byte-Schlüssel automatisch aus dem Kanalnamen generiert wird (z.B. `sha256("#test")`). Gültige Zeichen: `a-z`, `0-9` und Bindestriche.
- **Private Kanäle** – Durch einen individuellen, geheimen 16-Byte-Schlüssel gesichert. Nur Teilnehmer, denen dieser Schlüssel mitgeteilt wurde, können Nachrichten lesen.

Für sensible Kommunikation sind private Kanäle zu empfehlen. MeshCore unterstützt maximal 40 Kanäle gleichzeitig.

Repeater transportieren alle Nachrichten aller Kanäle im Mesh. Companions zeigen Nachrichten nur in Kanälen an, denen sie beigetreten sind. Über [Regionen](./regionen.md) lässt sich die Weiterleitung auf definierte geografische Bereiche einschränken und das Mesh dadurch entlasten.

### Benachrichtigungen und Stummschaltung

Pro Kanal sind Benachrichtigungen individuell konfigurierbar: **Alle Nachrichten**, **nur Erwähnungen** oder **stumm**.

## Kanäle in unserer Community

In der Mesh Rheinland Community verwenden wir derzeit folgende Kanäle.

:::info[Kanäle sind nicht exklusiv]
Durch die standardmäßig 64 Hops in MeshCore hat das Mesh eine große Reichweite. Dieselben Kanäle werden häufig auch von anderen Communities genutzt. Diese Übersicht bietet trotzdem einen Einstiegspunkt für neue Teilnehmer und ermöglicht es, Fragen zu unseren Kanälen mit einem Link zu beantworten.
:::

**Öffentlicher Kanal:**

- `Public` – Standardkanal, bereits nach der Ersteinrichtung vorhanden. Wird von allen Mesh-Teilnehmern genutzt, auch außerhalb von Mesh Rheinland.

**Hash-Kanäle:**

- `#bonn` – Regionaler Kanal für Bonn
- `#bot` – Kanal zum Testen und Nutzen eigener oder fremder Bots
- `#de` – Deutschlandweiter Kanal für alle deutschen Mesh-Teilnehmer
- `#eifel` – Regionaler Kanal für die Eifel
- `#emergency` – Kanal für Notfallkommunikation; zuletzt aktiv bei der Notfunkübung des Distrikt G
- `#koeln` – Regionaler Kanal für Köln
- `#mc-radar` – Kanal zur Ausbreitungsmessung; Observer im Netz tragen empfangene Nachrichten auf [mc-radar.woodwar.com](https://mc-radar.woodwar.com/test-inspector) ein, sodass Signalwege sichtbar werden, ohne Bot-Antworten zu erzeugen
- `#nrw` – Regionaler Kanal für Nordrhein-Westfalen
- `#ping` – Testkanal für Ping-Nachrichten, damit aktive Kommunikationskanäle damit nicht belastet werden
- `#rheinland` – Regionaler Kanal für das Rheinland
- `#test` – Testkanal mit Bots für `Ping`- und `Test`-Nachrichten, damit aktive Kommunikationskanäle damit nicht belastet werden
- `#testkanal` – Weiterer Testkanal mit denselben Bots wie `#test`
- `#wetter` – Kanal für Wettermeldungen und -beobachtungen

## Ressourcen

- [MeshCore Wiki DE: Hashtag Kanäle](https://meshcore-de.fyi/meshcore:allgemeines:hashtag_channels)
