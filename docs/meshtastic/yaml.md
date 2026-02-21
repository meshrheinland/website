YAML ist ein menschenlesbares, textbasiertes Datenformat für Konfigurationsdateien. Geräteeinstellungen, Kanäle und Backups. Diese werden durch die verwendete Syntax klar und strukturiert dargestellt.

# Aufbau
YAML besteht aus Schlüssel‑Wert‑Paaren, Listen und verschachtelten Objekten.  
Die Struktur wird hauptsächlich durch Einrückung mit Leerzeichen bestimmt.

## Grundelemente
**Schlüssel‑Wert**
```yaml
name: RheinlandNode
```

**Verschachtelung**
```yaml
device:
  region: EU_868
```

:::Hinweis Konvention
Bei der Verschachtelung kommen 2 Leerzeichen zum Einsatz.
:::

**Liste**

```yaml
channels:
  - name: Rheinland
  - name: Backup
```

**Kommentar**
```yaml
# Hinweis oder Erklärung
```

# Syntax
YAML folgt wenigen aber klar vorgegebenen Regeln. 
## Einrückungen
Üblich sind zwei Leerzeichen pro Ebene, vorgeschrieben ist nur eine konsistente Einrückung.

## Schlüssel‑Wert‑Paare
```yaml
schluessel: wert
```
Werte können Strings, Zahlen, Booleans, Listen oder Mappings sein.
## Listen
```yaml
channels:
  - name: Rheinland
  - name: Backup
```

## Datentypen
Die verwendeten Datentypen:
| Typ      | Beispiel        | Beschreibung                |
|----------|-----------------|-----------------------------|
| String   | "Rheinland"     | Text                        |
| Zahl     | 42              | Ganzzahl oder Float         |
| Boolean  | true / false    | Wahr/Falsch                 |
| Liste    | - item1         | Mehrere Werte               |
|  Mapping  | key: value      | Strukturierte Werte         |

# YAML‑Schlüssel
Die folgenden Schlüssel sind für Meshtastic von Relevanz:
| Schlüssel     | Kurzbeschreibung |
|---------------|------------------|
| device        | Geräteeinstellungen (Name, Region, Position) |
| lora          | Funkparameter |
| power         | Energieverwaltung |
| position      | GPS‑ und Standortoptionen |
| telemetry     | Sensor‑ und Statusmeldungen |
| channels      | Liste aller Kanäle |
| channel_url   | Kodierte Kanaldefinition |
| owner         | Gerätebesitzer |
| preferences   | App‑ und UI‑Einstellungen |
| mqtt          | MQTT‑Konfiguration |

# Beispielkonfiguration 
Die folgende Minimal-Konfiguration für das Rheinland:
```yaml
device:
  region: EU_868

channels:
  - name: Rheinland
    psk: AQ==
    uplink_enabled: true
    downlink_enabled: true
```

:::Hinweis
EU_868 passt für Deutschland; psk: `AQ==` ist der standardmäßig gesetzte Platzhalter‑Schlüssel (entspricht dem Byte 0x01).
Er dient lediglich als Default‑Wert für neue oder unkonfigurierte Kanäle und sollte in produktiven Setups immer durch einen eigenen, sicheren PSK ersetzt werden.
Der Pre-Shared Key ist ein vorab geteilter geheimer Schlüssel, den alle Teilnehmer eines Systems kennen müssen, um sich zu authentifizieren oder verschlüsselt zu kommunizieren; uplink/downlink schalten Senden und Empfangen frei, und zusätzliche Bereiche wie power, telemetry oder owner lassen sich bei Bedarf ergänzen.
:::


# Sicherheit
Beim Teilen von Informationen solltest du die folgenden Punkte beachten: 
| Bereich            | Teilen | Begründung |
|--------------------|--------|------------|
| device.region      | ✔️     | Unkritisch |
| lora               | ✔️     | Öffentlich |
| power              | ✔️     | Unkritisch |
| preferences        | ✔️     | UI‑Einstellungen |
| telemetry          | ✖     | Kritisch bei GPS |
| device.name        | ✖️     | Rückschlüsse möglich |
| owner              | ✖️     | Persönliche Infos |
| position           | ✖️     | Standortdaten |
| mqtt               | ✖️     | Zugangsdaten |
| channels.name      | ✔️     | Unkritisch |
| channels.psk       | ✖️     | Schlüssel |

:::Warnung
Backups enthalten PSKs und sollten **nicht** öffentlich geteilt werden.
:::

# Fehlerquellen

| Fehler               | Beschreibung |
|----------------------|---------|
| Tabs statt Leerzeichen | YAML akzeptiert lediglich Leerzeichen. |
| Falsche Einrückung     | Die Struktur wird falsch interpretiert. |
| Doppelte Schlüssel      | Der zuletzt übergebene Wert überschreibt den vorherigen. |
| Falsche Region          | Gerät sendet nicht korrekt. |
| Ungültiger PSK          | Keine Kommunikation möglich. |

# Erweiterung
## Ausbaustufen
| Stufe | Ergänzung       | Zweck |
|-------|------------------|-------|
| 1     | device.name      | Eigener Node‑Name |
| 2     | owner            | Anzeigename im Mesh |
| 3     | power            | Energiesparen |
| 4     | telemetry        | Statusdaten |
| 5     | position         | GPS |
| 6     | lora             | Funk‑Feintuning |
| 7     | mqtt             | Server‑Anbindung |

### Erweiterte Rheinland‑Konfiguration
Beispielhaft eine erweiterte Konfiguration
```yaml
device:
  region: EU_868
  name: RheinlandNode01

owner:
  long_name: March Rheinland
  short_name: MR

power:
  is_power_saving: true

telemetry:
  device_update_interval: 600

channels:
  - name: Rheinland
    psk: AQ==
    uplink_enabled: true
    downlink_enabled: true
```

## Referenz
Die folgenden Schlüssel beziehen sich auf Meshtastic-Konfigurationen:

## device
| Parameter | Bedeutung |
|----------|-----------|
| region   | Funkregion |
| name     | Gerätename |

## owner
| Parameter | Bedeutung |
|----------|-----------|
| long_name | Anzeigename |
| short_name | Kurzkennung |

## power
| Parameter | Bedeutung |
|----------|-----------|
| is_power_saving | Energiesparmodus |
| min_battery_level | Unteree Akkuschwellwert |

## telemetry
| Parameter | Bedeutung |
|----------|-----------|
| device_update_interval | Intervall in Sekunden |
| environment_update_interval | Sensorintervall |

## lora
| Parameter | Bedeutung |
|----------|-----------|
| region | Funkband |
| tx_power | Sendeleistung |
| modem_preset | Modus |

## mqtt
| Parameter | Bedeutung |
|----------|-----------|
| enabled | MQTT aktivieren |
| address | Broker |
| username | Benutzername |
| password | Passwort |
