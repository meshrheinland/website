---
title: Kollisionen im Netz – und ein Experiment, das sich lohnt
authors: sebastian
tags: [meshcore, repeater, hw-cad]
---

Ein Blick hinter die Kulissen: Was uns eine Notfunkübung über Paketverluste gelehrt hat – und wie HW-CAD das Problem grundlegend lösen könnte.

<!-- truncate -->

## Das Problem: Kollisionen bei der Notfunkübung

Ausgangspunkt war die Notfunkübung am 12.03. Bei hohem Verkehrsaufkommen kam es zu erheblichen Paketverlusten (0 Repeats). Freie Airtime war zu diesem Zeitpunkt noch ausreichend vorhanden – das Problem lag also woanders.

Eine genaue Ursachenanalyse ergab: MeshCore-Geräte hören nicht aktiv in die Frequenz, sondern wählen mithilfe des TX Delays (Standard: `0.5`) einfach einen zufälligen Sendeslot. Die Mathematik dahinter ist ernüchternd – bereits **3 Repeater mit Standardeinstellungen reichen aus, um bei einer Flood-Nachricht eine garantierte Kollision zu erzeugen**.

Christiaan hat ein Demo-Setup gebaut, das das Phänomen sichtbar macht: Leuchten die TX-LEDs mehrerer Repeater gleichzeitig auf, ist das eine Kollision (Video 1).

## Erste Gegenmaßnahmen

**TX Delay erhöhen**

Als erste Maßnahme wurde der TX Delay auf `2.0` erhöht, um Sendeslots aus einem größeren Zahlenraum zu wählen. Kollisionen konnten damit reduziert werden – allerdings wird das Netz dadurch träger, da Repeater je nach Zufallsergebnis später senden.

**Listen before Talk (`int.thresh`)**

Als nächste Maßnahme wurde das standardmäßig deaktivierte *Listen before Talk*-Feature erprobt:

```bash
set int.thresh 10
```

Der Sender horcht dabei aktiv in die Frequenz und prüft, ob sie bereits belegt ist. Der Schwellwert (`10`) legt fest, wie weit ein Signal über dem Rauschpegel liegen muss, damit die Frequenz als belegt gilt. Ein Vorteil: Jedes Signal wird berücksichtigt – egal ob von Meshtastic, MeshCore oder einer anderen ISM-Anwendung. Bewertet wird ausschließlich die Signalstärke. Ob das gleichzeitig ein Nachteil ist, zeigen die laufenden Experimente. Weitere Ideen und Einblicke sind willkommen!

## HW-CAD: Die Hardware-Lösung

Dann wurden wir auf **CAD (Channel Activity Detection)** aufmerksam – ein Feature direkt im LoRa-Chip, das nur aktiviert werden muss. HW-CAD lauscht dauerhaft auf der Frequenz und meldet bereits nach **1–4 LoRa-Symbolen**, ob die Frequenz belegt ist. Das ist extrem schnell.

Im MeshCore-Projekt gibt es dazu einen offenen Pull Request. Wir haben den Entwickler der Evo-Firmware motiviert, alle Features in seine Repeater-Firmware aufzunehmen – mit einem wichtigen Hinweis: **HW-CAD sollte nicht nur auf Repeatern aktiv sein.** Der volle Effekt entfaltet sich erst, wenn sich auch Companions rücksichtsvoll verhalten.

Daraus ist eine experimentelle Firmware entstanden, die Builds für alle Geräte, Rollen und Varianten anbietet (Variante `debug` für Observer):

**👉 [github.com/syssi/MeshCore/releases](https://github.com/syssi/MeshCore/releases)**

- Auf einem **Companion** ist HW-CAD immer aktiv.
- Auf einem **Repeater/Room** muss das Feature explizit aktiviert werden:

```bash
set int.thresh 1
```

Video 2 zeigt die TX-LEDs der Repeater mit aktiviertem HW-CAD – der Unterschied ist deutlich sichtbar.
