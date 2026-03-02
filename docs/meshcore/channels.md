# Kanäle

Nach der Installation eines Companion ist bereits der `Public` Kanal für offenen, meshweite Kommunikation verfügbar.

## Was sind Kanäle?

Ein **Kanal** erlaubt es die Kommunikation zu strukturieren. MeshCore erlaubt 
  
- **Private Kanäle**
  durch geheimen, privaten Schlüssel gesicherte Kommunikation, nur von Teilnehmer mit diesem Schlüssel lesbar, nutzt einen 16-byte key.
- **Öffentlicher Kanal**
  durch statischen, im MeshCore Code, abgelegter Schlüssel gesicherte Kommunikation, nutzt einen 16-byte key.
- **Hashtag Kanäle**
  öffentliche Kanäle, durch a-z, 0-9 und Bindestriche erzeugt MeshCore selbst einen Schlüssel über den Namen. Nutzt die ersten 16-byte von z.B. `sha256("#test")`

Für private oder sensible Informationen solltest du private Kanäle nutzen. Die individuellen, geheimen Schlüssel, schützen die Kommunikation zwischen den Teilnehmern denen dieser mitgeteilt wurde.

MeshCore sieht aktuell 40 beigetretenen Kanäle als Maximum vor.

MeshCore Repeater transportiert alle Nachrichten in allen Kanälen im Mesh. Companions zeigen Sie nur an, wenn sie den entsprechenden Kanälen auch beigetreten sind. Eine Ausnahme bilden die [Regionen](./regionen.md), falls Nachrichten einen Scope gesetzt bekommen haben kann der Repeater zur Entlastung des Mesh entsprechend eingeschränkt werden.

### Zweck

- Strukturierung der Kommunikation im durch Messenger bekannten Format
- Benachrichtigung (Alle, nur Erwähnungen) und Stummschaltung nutzbar pro Kanal konfigurierbar
- auf Kanäle können [Regionen](./regionen.md) / Scopes angewendet werden

## Kanäle in unserer Community

In der Mesh Rheinland Community verwenden wir derzeit folgende Kanäle.

Beachte bitte, dass durch die 64 Hop Anzahl aktuell in MeshCore, das Mesh bereits eine große Ausdehnung hat und es durchaus die Regel ist, dass Kanäle von mehreren Communitys oder Einzelpersonen genutzt werden. Diese Liste soll trotzdem einen Startpunkt für unsere Nutzer bieten um Fragen zu unseren Kanälen mit einem Link zu dieser Dokumentation beantworten zu können.

Öffentliche Kanäle:
- `Public` - Default bereits durch den Client vorhanden, wird von allen Mesh Teilnehmern genutzt, auch ausserhalb von Mesh-Rheinland.

Hash Kanäle:  
- `#bonn` - Bonn
- `#bot` - eigene oder fremde Bots nutzen / testen 
- `#emergency` - zuletzt in Nutzung bei der Notfunkübung des Distrikt G, Vorbereitung für Notfallkommunikation
- `#koeln` - Köln
- `#nrw` - Nordrhein-Westfalen
- `#rheinland` - Rheinland
- `#test` - Testkanal mit Bots um `Ping` und `Test` Nachrichten zu nutzen, ohne *Mensch zu Mensch* Kommunikation Kanäle damit zu füllen
- `#testkanal` - weiterer Testkanal mit Bots um `Ping` und `Test` Nachrichten zu nutzen, ohne *Mensch zu Mensch* Kommunikation Kanäle damit zu füllen
- `#wetter` - Wetter

## Ressourcen

Überblick über etablierte Hash Kanäle:  
- [MeshCore Wiki DE: Hashtag Kanäle](https://meshcore-de.fyi/meshcore:allgemeines:hashtag_channels)
