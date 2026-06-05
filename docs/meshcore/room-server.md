---
description: Room Server einrichten und beitreten – die MeshCore-Pinnwand für Channels ohne direkten Peer-Kontakt.
---

# Room Server

Ein Room Server ist eine Art Pinnwand im MeshCore-Netz: Nachrichten werden zentral gespeichert und an alle angemeldeten Teilnehmer verteilt, auch wenn diese gerade nicht online sind. Der Server speichert bis zu **32 Nachrichten** und sendet sie beim nächsten Login automatisch nach.

Im Unterschied zu einem Kanal zwischen zwei Companions benötigst du für einen Room Server keinen direkten Funkkontakt zum Gesprächspartner – der Room Server übernimmt die Verteilung.

## Betrieb eines Room Servers

### Firmware flashen

Der Room Server ist eine eigene Firmware-Variante. Im [Web-Flasher](https://flasher.meshcore.io) die Variante **Room Server** für das jeweilige Board auswählen und flashen ([Anleitung](firmware-flashen)).

:::warning Companion Bluetooth enthält keinen Room Server
Room Server und Companion sind getrennte Firmware-Varianten. Ein Companion-Gerät kann nicht als Room Server fungieren.
:::

### Grundkonfiguration (CLI)

Direkt nach dem Flashen per serieller Konsole im [Web-Flasher](https://flasher.meshcore.io) oder über [config.meshcore.io](https://config.meshcore.io) konfigurieren:

```bash
set name DE-NW Bonner-Pinnwand
set owner.info Bernd aus Beuel
set lat 50.73597
set lon 7.11093

# Passwort für Beitritt (leer lassen = kein Passwort)
password hello

# Admin-Passwort setzen
admin.password MeinGeheimnis

set radio 869.618,62.5,8,8
set dutycycle 10

region default de-nw

set advert.interval 230
set flood.advert.interval 50

reboot
```

### Room Server als Repeater betreiben

Ein Room Server leitet standardmäßig **keine** Pakete weiter – er empfängt und verteilt nur eigene Nachrichten. Das Weiterleiten lässt sich aktivieren:

```bash
set repeat on
reboot
```

:::warning Nicht empfohlen
Der Betrieb als Repeater wird für Room Server offiziell nicht empfohlen:

- **Airtime**: Ein Room Server erzeugt durch Nachrichtenverteilung bereits hohes TX-Volumen. Die 10 % Duty-Cycle-Grenze reicht kaum für beide Aufgaben.
- **Sichtbarkeit**: Room Server tauchen in Nachrichtenpfaden nicht mit Namen auf – eine Einschränkung der Companion-App.
- **Keine Nachbarschaftskarte**: Anders als bei Repeatern lässt sich die Nachbarschaft eines Room Servers nicht einsehen.
- **Regionen nur per CLI**: Regionen können am Room Server nicht über die Android-App konfiguriert werden, sondern ausschließlich über die serielle Konsole.

Für Repeater-Funktion ist ein dediziertes Gerät mit Repeater-Firmware die bessere Wahl.
:::

### Regionen konfigurieren

Regionen werden am Room Server **ausschließlich per CLI** gesetzt – die Remote-Admin-Oberfläche bietet diese Einstellung nicht. Die Konfiguration folgt dem gleichen Schema wie bei Repeatern: [Repeater-Betreiber: Regionen konfigurieren](https://www.meshrheinland.de/meshcore/regionen#repeater-betreiber-regionen-konfigurieren)

---

## Einem Room Server beitreten

### Voraussetzung: Room Server in der Kontaktliste

Der Room Server muss zunächst in der App bekannt sein. Das geht auf zwei Wegen:

- **Advert empfangen**: Wenn sich der Room Server per Advert ankündigt, erscheint er automatisch in der Kontaktliste
- **Manuell hinzufügen**: Über „Kontakt hinzufügen" mit der Node-ID des Room Servers

### Beitritt

1. Room Server in der Kontaktliste antippen
2. Auf **„Login"** tippen (oder der Button zum Beitritt in der App)
3. Passwort eingeben (Standard: `hello`)
4. Nach erfolgreichem Login sendet der Server bis zu **32 historische Nachrichten** nach

Ab diesem Zeitpunkt kennt der Server deinen Client. Neue Nachrichten anderer Teilnehmer werden aktiv zu dir gepusht – du musst dich nicht erneut einloggen. Der Server merkt sich dabei den Rückpfad zu deiner Node und liefert Nachrichten fortan direkt (nicht per Flood) aus. Nach 3 erfolglosen Zustellversuchen wird der Client vorübergehend übersprungen.

Sollte ein Betreten des Room Servers mit bestehendem Pfad nicht mehr möglich sein, setze den Pfad per **„Reset Path"** zurück und starte wieder mit **„Log In • Flood"**. Auf diese Weise wird ein neuer Pfad ausgehandelt und mit etwas Glück gelingt die Anmeldung dieses Mal wieder.

:::info Kein Advert nötig
Der Login-Request enthält deinen öffentlichen Schlüssel direkt. Der Room Server führt daraus einen individuellen ECDH-Schlüsselaustausch durch – alle Nachrichten zwischen Server und Client sind Ende-zu-Ende verschlüsselt, ohne dass zuvor ein Advert ausgetauscht werden musste.
:::

:::warning Login-Fehler ohne klare Ursache
Bei einem fehlgeschlagenen Login erscheint die Meldung **„Failed to log in!"** – aber die App kann nicht unterscheiden, ob das Passwort falsch war oder der Room Server nicht erreichbar ist.

<div style={{textAlign: 'center', maxWidth: '400px', margin: '0 auto'}}>

![Login-Fehlermeldung in der MeshCore App](/img/meshcore/meshcore-room-login-failed.png)

</div>

Bei Problemen:

1. Passwort prüfen (`hello` ist das Standard-Passwort öffentlicher Räume)
2. Näher an einen Repeater gehen (bessere Verbindung)
3. Login erneut versuchen
:::

### Nachrichten schreiben

Nach dem Login können Nachrichten direkt im Room-Server-Kanal eingegeben werden. Der Server bestätigt den Empfang – die Auslieferung an andere Teilnehmer erfolgt im Hintergrund automatisch.

Nachrichten sind auf **151 Zeichen** begrenzt.
