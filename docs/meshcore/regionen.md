# Regionen

Regionen sind geografische Bereiche, die in MeshCore verwendet werden, um die Weiterleitung von Nachrichten auf definierte Gebiete zu begrenzen. Dies verhindert unkontrolliertes Flooding und entlastet das Netzwerk.

## Was sind Regionen?

Ein **Scope** ist der geografische Reichweitenwunsch, den ein Nutzer einer Nachricht hinzufügt. Ein Repeater leitet die Nachricht nur weiter, wenn dieser Scope in seiner Region-Liste vorhanden ist. Das Matching erfolgt exakt (1:1), nicht teilweise.

**So funktioniert es:**
- **Companion-Nutzer** wählen in der App einen Scope für ihre Nachrichten
- **Repeater-Betreiber** konfigurieren am Repeater, welche Scopes weitergeleitet werden
- Nur Repeater mit passendem Scope leiten die Nachricht weiter

:::tip Nur für gesendete Nachrichten
Der gewählte Scope beeinflusst nur deine gesendeten Nachrichten. Empfangen kannst du alle Nachrichten des Kanals, unabhängig vom Scope.
:::

### Zweck

- Reduzierung der Menge übermittelter Nachrichten
- Vermeidung von Kollisionen und überforderten Repeatern
- Standardmäßig werden Nachrichten über 64 Hops weitergeleitet – oft unnötig weit

![Region Scopes Illustration](/img/meshcore/region-scopes.png)

*Alice sendet eine Nachricht mit Scope `#de`. Nur Repeater, die `#de` in ihrer Region-Liste haben, leiten die Nachricht weiter. Repeater ohne `#de` in ihrer Liste ignorieren die Nachricht.*

## Regionen in unserer Community

In der Mesh Rheinland Community verwenden wir derzeit folgende Regionen:

- `#de` – Deutschland
- `#nrw` – Nordrhein-Westfalen
- `#rheinland` – Rheinland
- `#bonn` – Bonn
- `#koeln` – Köln

:::info Eingeschränkte Regionenliste
Wir bewerben derzeit **nur** die oben genannten Regionen. Die Community sondiert noch alle Möglichkeiten für Regionen und Schemas.
:::

## Companion-Nutzer: Regionen in der App verwenden

Als Companion-Nutzer legst du in der App fest, welche Scopes du für deine Nachrichten verwenden möchtest.

### Regionen-Liste öffnen

Um zur globalen Regionen-Liste zu gelangen:

1. Öffne einen Kanal (z.B. "Public")
2. Tippe rechts oben auf die **drei Punkte**
3. Wähle **"Set Region Scope"**

### Neue Region hinzufügen

In der Regionen-Ansicht kannst du über das **"+"** oben rechts neue Regionen zu deiner Liste hinzufügen:

<div style={{textAlign: 'center', maxWidth: '400px', margin: '0 auto'}}>

![MeshCore App Regionen-Liste](/img/meshcore/app-region-list.png)

</div>

*Beispiel: Die Regionen-Liste mit #bonn, #de, #nrw und #rheinland*

### Scope einem Kanal zuweisen

Mit einem **Klick auf einen Eintrag** in der Liste aktivierst du den Scope für den gewählten Kanal:

<div style={{textAlign: 'center', maxWidth: '400px', margin: '0 auto'}}>

![MeshCore App Kanal mit Scope](/img/meshcore/app-channel-scope.png)

</div>

*Beispiel: Kanal "#bonn" mit aktiviertem Scope #bonn – alle Nachrichten werden nur über Repeater mit #bonn verbreitet*

Der aktive Scope wird unterhalb des Kanalnamens angezeigt (z.B. "Region: #bonn").

### Scope entfernen

Um einen Scope von einem Kanal wieder zu entfernen:

1. Öffne den Kanal
2. Tippe auf die **drei Punkte** oben rechts
3. Wähle **"Set Region Scope"**
4. Tippe auf die **drei Punkte** oben rechts
5. Wähle **"Clear Scope"**

:::info Individuelle Anpassung
Die Beispiele zeigen die Rheinland-Regionen. Je nach Standort wirst du andere Regionen verwenden – passe die Liste an deine lokale Community an.
:::

## Repeater-Betreiber: Regionen konfigurieren

Als Repeater-Betreiber legst du über die CLI fest, welche Regionen dein Repeater weiterleitet.

Regionen werden über die CLI des Repeaters konfiguriert (USB, Seriell oder Remote via App):

### Beispiel: Alle Rheinland-Regionen anlegen

```bash
region put #de
region allowf #de

region put #nrw
region allowf #nrw

region put #rheinland
region allowf #rheinland

region put #bonn
region allowf #bonn

region put #koeln
region allowf #koeln

region save
```

**Befehle erklärt:**

- `region put <name>` – Fügt eine Region zur Liste hinzu
- `region allowf <name>` – Erlaubt Flood-Weiterleitung für diese Region
- `region save` – Speichert die Konfiguration dauerhaft

:::tip Region-Verwaltung
Nach jeder Änderung an Regionen muss `region save` ausgeführt werden, damit die Konfiguration nach einem Neustart erhalten bleibt.
:::

### Technische Anforderungen

- Maximum 30 Bytes (UTF-8)
- Nur Kleinbuchstaben, `#`, `$`, Bindestrich
- Maximal 32 Regionen pro Repeater
- Eindeutigkeit im Netz erforderlich

## Schema-Diskussion

Die Community hat erkannt: **„Es wird nicht das eine Schema geben, was jeder versteht."**

Zu feinkörnige Aufteilungen sind kontraproduktiv. Landschaften und Metropolregionen (beispielsweise `#rhein-main`) sind oft sinnvoller als starre Verwaltungsgrenzen.

:::info Laufende Diskussion
Die Community sondiert noch alle Möglichkeiten für Regionen und Schemas. Beteilige dich an der Diskussion im [MeshCore Wiki DE](https://meshcore-de.fyi/meshcore:allgemeines:regions) im Abschnitt **Diskussion**.
:::

### Basis-Schema (ISO 3166-2)

Als empfohlenes grundlegendes Schema für Deutschland:

- `#de` – Deutschland (Bundesebene)
- `#de-bw` – Baden-Württemberg
- `#de-by` – Bayern
- `#de-he` – Hessen
- `#de-nw` – Nordrhein-Westfalen
- ... (weitere Bundesländer nach ISO 3166-2)

## Weitere Informationen

Detaillierte Informationen zu Regionen, Schemas und der laufenden Community-Diskussion findest du im offiziellen Wiki:

**[MeshCore Wiki DE: Regionen](https://meshcore-de.fyi/meshcore:allgemeines:regions)**

Besonders interessant ist der **Diskussions-Abschnitt**, in dem verschiedene Ansätze und ihre Vor- und Nachteile erörtert werden.

## Ressourcen

- [MeshCore Wiki DE: Regionen](https://meshcore-de.fyi/meshcore:allgemeines:regions)
- [Repeater CLI Reference](https://github.com/meshcore-dev/MeshCore/wiki/Repeater-&-Room-Server-CLI-Reference)
