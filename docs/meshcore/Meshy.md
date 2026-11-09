# Meshy
Meshy ist ein moderner, GTK‑basierter Desktop‑Client für das MeshCore‑LoRa‑Netzwerk. Ideal für alle, die ihre MeshCore‑Geräte lieber komfortabel am Linux‑Rechner verwalten als über Smartphone‑Apps oder 
Web‑Interfaces. Die Anwendung kombiniert verschlüsselte Nachrichtenübertragung, umfassendes Gerätemanagement und eine interaktive Netzwerkkarte in einer klar strukturierten Oberfläche 
auf Basis von GTK 4 und libadwaita. Dank Unterstützung für Bluetooth, USB‑Serial und TCP/WiFi lässt sich jedes MeshCore‑Companion‑Device nahtlos anbinden, überwachen und konfigurieren.

# Installation
Zur Installation das Programm aus dem Flathub‑Repository herunterladen:
```bash
flatpak install flathub page.codeberg.sesivany.Meshy
```
Nach Abschluss der Installation steht Meshy systemweit zur Verfügung.

:::note
Flatpak muss installiert und Flathub als Remote aktiviert sein.
:::

# Einrichtung
## Geräte
Beim ersten Start wird der Verbindungsbildschirm angezeigt. Hier das gewünschte Gerät auswählen oder ein neues (z.B. Heltec T-114) hinzufügen. Meshy merkt sich das zuletzt verbundene Gerät und die Übertragungsmethode. Bei nachfolgenden Starts versucht es, die Verbindung automatisch wiederherzustellen. Ist das Gerät nicht verfügbar oder schlägt die Verbindung nach mehreren Versuchen fehl, wird der Verbindungsbildschirm angezeigt.

### Bluetooth
 * Bluetooth auf dem Computer aktivieren.
 * Über *"Pair with a New Companion"* werden verfügbare Geräte in der Umgebung gesucht.
 * Gerät auswählen - ggf. ist ein PIN erforderlich.

Nach der ersten Kopplung verbindet sich Meshy automatisch und beginnt mit der Synchronisierung von Kontakten, Kanälen und Nachrichten.

:::note
Bereits gekoppelte Geräte werden hier automatisch aufgelistet. Verbindungswiederholung: Wenn die Verbindung fehlschlägt, versucht Meshy automatisch bis zu 3 Mal, die Verbindung wiederherzustellen, wobei die Verzögerungen zwischen den Versuchen zunehmend größer werden.
:::

### USB
 * PC und MeshCore-Gerät mittels eines USB-Kabels miteinander verbinden.
 * Erkannte Geräte werden unter dem Eintrag *"USB Serial"* angezeigt (z.B. `/dev/ttyUSB0`) aufgelistet. 
 * Über *"Verbinden"* wird die Verbindung zum Gerät mit `115200` Baud hergestellt.

### Wifi/TCP
Für netzwerkverbundene Begleitgeräte oder Fernzugriff:
 * *"Add TCP Companion"*.
 * IP-Adresse oder Hostname eingeben (z. B. `192.168.47.47`).
 * Port angeben. Standardwert ist `5000`.
 * *"Verbinden"* 

:::note
[TCP](https://de.wikipedia.org/wiki/Transmission_Control_Protocol)-Verbindungen werden in den Einstellungen gespeichert und können später wiederhergestellt werden. Um die Adresse einer gespeicherten Verbindung zu ändern, klicken Sie mit der rechten Maustaste darauf (oder tippen Sie länger darauf) und wählen Sie „ Adresse ändern“ . Über dasselbe Kontextmenü können Sie gespeicherte Verbindungen auch löschen.
:::

# Konfiguration
Über das "Hamburger-Menü" oder die Tastenkombination <kbd>Strg</kbd>+<kbd>5</kbd> gelangt man zu den Einstellungen. Hier die [Vorgaben](https://www.meshrheinland.de/meshcore/companion-setup) beachten und einstellen. Diese Parameter sind entscheidend, damit Nachrichten zuverlässig zugestellt werden können.

## Datensicherung
Über die Funktionen *"Backup"* und *"Restore"* können die Gerätedaten gesichert und zurückgespielt werden.

Meshy unterstützt sowohl die manuelle als auch die automatische tägliche Sicherungen. Hier kann man auswählen, welche Bereiche gesichert werden sollen (Einstellungen, Kontakte, Kanäle, Nachrichten, Routing‑Verlauf). 

Wiederherstellungen können aus Dateien oder aus den automatisch erstellten Backups erfolgen. Das Programm synchronisiert sich danach automatisch mit dem Gerät und gleicht alle Daten ab.

:::note
Die Geräteidentität wird aus Sicherheitsgründen nur auf Wunsch exportiert und niemals automatisch gesichert. Daten werden unter **~/.var/app/page.codeberg.sesivany.Meshy/data/meshy/backups/
** gespeichert.
:::

# Bedienung
Die Seitenleiste bietet die folgenden Funktionen


| Menüpunkt | Beschreibung |
|----------|--------|
| Gerät | Die Geräteansicht fasst den Zustand deines MeshCore‑Begleitgeräts zusammen und bietet zentrale Verwaltungsfunktionen wie Telemetrie, Funkstatistiken, Speicher‑/Akkustatus sowie Aktionen wie Trace‑Pfad, Knoten‑Scan, Anzeigen senden und Neustart. Sie ist damit der zentrale Überblicks‑ und Steuerbereich für alles, was dein Gerät im MeshCore‑Netzwerk tut. |
| Kontakte | Die Kontaktansicht zeigt alle Knoten deines Mesh‑Netzwerks samt Typ, Routing‑Status und Details an und erlaubt das Verwalten, Filtern, Hinzufügen sowie Bearbeiten von Kontakten. Je nach Kontakttyp öffnet sich beim Auswählen entweder eine Chat‑Ansicht, eine Verwaltungsoberfläche oder ein Telemetrie‑Dashboard. |
| Kanäle | Die Kanalansicht bietet gruppenbasierte Chats mit Hashtag, privaten und [öffentlichen Kanälen](https://www.meshrheinland.de/meshcore/channels) und erlaubt das Beitreten, Verwalten sowie Anzeigen von Nachrichtenpfaden und Teilnehmern. |
| Karte | Die Kartenansicht zeigt alle Kontakte mit bekannten Koordinaten auf einer OSM‑Karte und erlaubt das Filtern, Clustern sowie das Anzeigen von Pfaden und deren SNR‑Werten. Sie dient damit als visuelle Übersicht über die Netzwerktopologie und die Signalqualität im MeshCore‑Netz. |

## Verschlüsselung
| Bereich | Beschreibung |
| --- | --- |
| Direktnachrichten | Peer‑to‑Peer‑Nachrichten werden Ende‑zu‑Ende mit [Ed25519](https://de.wikipedia.org/wiki/Curve25519)‑Schlüsselpaaren gesichert. Die Inhalte werden mit dem öffentlichen Schlüssel des Empfängers verschlüsselt und durch Signaturen auf Integrität geprüft. Nur der private Schlüssel des Empfängers kann die Nachricht entschlüsseln. |
| Kanalnachrichten | Kanalnachrichten nutzen symmetrische PSKs: öffentliche Kanäle mit festem Schlüssel, Hashtag‑Kanäle mit [SHA‑256](https://de.wikipedia.org/wiki/SHA-2)‑abgeleitetem Schlüssel, private Kanäle mit zufälligem oder benutzerdefiniertem 16‑Byte‑PSK. Verschlüsselung per [AES](https://de.wikipedia.org/wiki/Advanced_Encryption_Standard)‑128‑ECB, Integritätsprüfung per HMAC‑SHA256 (2‑Byte‑MAC). |
| Transportsicherheit | [BLE](https://de.wikipedia.org/wiki/Bluetooth_Low_Energy)‑Verbindungen sind durch Link‑Layer‑Verschlüsselung geschützt. USB bietet keine Transportverschlüsselung (physische Sicherheit vorausgesetzt). [TCP](https://de.wikipedia.org/wiki/Transmission_Control_Protocol) ist unverschlüsselt und sollte bei Bedarf über [VPN](https://de.wikipedia.org/wiki/Virtual_Private_Network) oder [SSH](https://de.wikipedia.org/wiki/Secure_Shell)‑Tunnel abgesichert werden. |
| Schlüsselverwaltung | Private Schlüssel verbleiben ausschließlich auf dem Gerät. Öffentliche Schlüssel werden über Kontakt‑Exports und Adverts geteilt. Kanal‑PSKs liegen lokal in der [SQLite](https://de.wikipedia.org/wiki/SQLite)‑Datenbank. Backups enthalten PSKs im Klartext und müssen entsprechend geschützt werden. |

# Tastenkürzel
## Allgemein
| Abkürzung | Aktion |
|----------|--------|
| <kbd>Strg</kbd>+<kbd>Q</kbd>| Anwendung beenden |
| <kbd>Strg</kbd>+<kbd>D</kbd> | Verbindung zum Gerät trennen |
| <kbd>Strg</kbd>+<kbd>?</kbd> | Tastenkürzel anzeigen |
| <kbd>F1</kbd> | Hilfe (Browser) |

## Navigation
| Abkürzung | Aktion |
|----------|--------|
| <kbd>Strg</kbd>+<kbd>1</kbd> | Geräteansicht |
| <kbd>Strg</kbd>+<kbd>2</kbd> | Kontakte |
| <kbd>Strg</kbd>+<kbd>3</kbd> | Kanäle |
| <kbd>Strg</kbd>+<kbd>4</kbd> | Karte |
| <kbd>Strg</kbd>+<kbd>5</kbd> | Einstellungen |
| <kbd>Alt</kbd>+<kbd>↑</kbd> | Vorheriger Kontakt/Kanal |
| <kbd>Alt</kbd>+<kbd>↓</kbd> | Nächster Kontakt/Kanal |
| <kbd>Alt</kbd>+<kbd>Umschalt</kbd>+<kbd>↑</kbd> | Vorherige ungelesene Nachricht anzeigen |
| <kbd>Alt</kbd>+<kbd>Umschalt</kbd>+<kbd>↓</kbd> | Zur nächsten ungelesen Nachricht springen |

## Chat
| Abkürzung | Aktion |
|----------|--------|
| <kbd>Enter</kbd> | Nachricht senden |
| <kbd>Strg</kbd>+<kbd>N</kbd> | Neue Nachricht verfassen |
| <kbd>Strg</kbd>+<kbd>F</kbd> | Suche |

## Karte
| Abkürzung | Aktion |
|----------|--------|
| <kbd>Strg</kbd>+<kbd>M</kbd> | Quellen für benutzerdefinierte Kartenteile |


# Links
- [Projektseite](https://meshy-app.org/)
- [Dokumentation](https://meshy-app.org/docs/guide/getting-started)
- [Quellcode](https://codeberg.org/sesivany/meshy)
