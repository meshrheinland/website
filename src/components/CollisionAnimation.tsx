import React, { useState, useEffect, useRef } from 'react';

// ── Physics: SF8, BW 62.5 kHz ──────────────────────────────────────────────
const SYM        = 4.096;           // ms per symbol
const CAD_THR    = SYM * 1;         // HW-CAD detects after ~1 symbol  ≈ 4.1 ms
const IRQ_THR    = SYM * 5;         // PREAMBLE_DETECTED fires after ~5 symbols ≈ 20.5 ms
const PREAMBLE   = SYM * 8;         // preamble duration ≈ 32.8 ms

// ── Animation timeline ──────────────────────────────────────────────────────
const TIMELINE   = 80;              // ms shown
const DEFER_VIS  = 62;              // where deferred Node B TX starts visually
                                    // (represents the actual ~200 ms CAD retry delay)
const SPEED      = 11;              // simulation ms per real second
const HOLD_REAL  = 3400;            // ms to hold at end before next scenario

// ── SVG layout ───────────────────────────────────────────────────────────────
const LBL        = 64;              // px for row labels
const TW         = 520;             // px track width
const SW         = LBL + TW + 8;   // total SVG width
const TH         = 22;              // track height px
const TG         = 8;               // gap between Node A and Node B tracks

// ── Colors ───────────────────────────────────────────────────────────────────
const C_A        = 'rgba(96,165,250,0.72)';   // Node A preamble (blue)
const C_COLL     = 'rgba(248,113,113,0.78)';  // collision (red)
const C_DEFER    = 'rgba(74,222,128,0.72)';   // deferred TX (green)
const C_WAIT     = 'rgba(251,146,60,0.80)';   // waiting (orange)
const C_IRQ      = '#fb923c';
const C_CAD      = '#4ade80';
const C_CURSOR   = 'rgba(255,255,255,0.28)';
const C_COLL_BG  = 'rgba(248,113,113,0.13)';
const C_TRK      = 'rgba(255,255,255,0.035)';

// ── Scenarios ────────────────────────────────────────────────────────────────
const SCENARIOS = [
  {
    nodeB : 2,
    title : 'Szenario 1 / 3',
    desc  : 'Node B sendet 2 ms nach Node A',
    note  : 'Beide Verfahren erkennen die Preamble noch nicht — Kollision',
    noteC : '#f87171',
  },
  {
    nodeB : 10,
    title : 'Szenario 2 / 3',
    desc  : 'Node B sendet 10 ms nach Node A',
    note  : 'Hardware CAD rettet — PREAMBLE_DETECTED feuert noch nicht',
    noteC : '#fb923c',
  },
  {
    nodeB : 27,
    title : 'Szenario 3 / 3',
    desc  : 'Node B sendet 27 ms nach Node A',
    note  : 'Beide Verfahren erkennen rechtzeitig',
    noteC : '#4ade80',
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function tx(ms: number): number {
  return LBL + (Math.min(ms, TIMELINE) / TIMELINE) * TW;
}

const btnBase: React.CSSProperties = {
  background : 'rgba(255,255,255,0.06)',
  border     : '1px solid rgba(255,255,255,0.14)',
  borderRadius: 6,
  color      : '#cbd5e1',
  padding    : '5px 13px',
  cursor     : 'pointer',
  fontSize   : 12,
  fontFamily : 'system-ui, sans-serif',
  lineHeight : 1.4,
};

// ── Panel component ───────────────────────────────────────────────────────────
interface PanelProps {
  label       : string;
  threshMs    : number;
  threshColor : string;
  simMs       : number;
  nodeBMs     : number;
}

function Panel({ label, threshMs, threshColor, simMs, nodeBMs }: PanelProps) {
  const collision    = nodeBMs < threshMs;
  const nodeBVisible = simMs >= nodeBMs;

  const ROW_A = 10;
  const ROW_B = ROW_A + TH + TG;
  const H     = ROW_B + TH + 34;

  // Node A bar width (grows with simMs, capped at PREAMBLE)
  const aW = ((Math.min(simMs, PREAMBLE)) / TIMELINE) * TW;

  // Node B absolute x positions
  const nbAbsX      = tx(nodeBMs);
  const deferAbsX   = tx(DEFER_VIS);
  const cursorAbsX  = tx(simMs);
  const threshAbsX  = tx(threshMs);

  // Collision bar: grows from nodeBMs onward
  const collW = collision && nodeBVisible
    ? ((Math.min(simMs - nodeBMs, PREAMBLE)) / TIMELINE) * TW
    : 0;

  // Waiting line length (from nodeBMs to min(simMs, DEFER_VIS))
  const waitLen = !collision && nodeBVisible
    ? ((Math.min(simMs, DEFER_VIS) - nodeBMs) / TIMELINE) * TW
    : 0;

  // Deferred bar width
  const deferW = !collision && simMs >= DEFER_VIS
    ? ((Math.min(simMs - DEFER_VIS, PREAMBLE)) / TIMELINE) * TW
    : 0;

  // Outcome state
  const outcome: { text: string; color: string; x: number } | null = nodeBVisible
    ? collision
      ? { text: '⚡ KOLLISION', color: C_COLL, x: nbAbsX + collW / 2 }
      : simMs >= DEFER_VIS
        ? { text: '✓ TX verschoben (~200 ms)', color: C_DEFER, x: deferAbsX + deferW / 2 }
        : { text: '⏸ CAD: Kanal belegt — warte', color: C_WAIT, x: nbAbsX + 4 }
    : null;

  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{
        fontSize: 11, fontWeight: 700, color: threshColor,
        marginBottom: 4, fontFamily: 'monospace', letterSpacing: 0.3,
      }}>
        {label}
      </div>

      <svg
        width="100%"
        viewBox={`0 0 ${SW} ${H}`}
        style={{ display: 'block', overflow: 'visible' }}
      >
        {/* ── Node A row ── */}
        <text x={LBL - 5} y={ROW_A + TH / 2 + 4}
          textAnchor="end" fill="#94a3b8" fontSize={10} fontFamily="monospace">
          Node A
        </text>
        <rect x={LBL} y={ROW_A} width={TW} height={TH} fill={C_TRK} rx={2} />
        <rect x={LBL} y={ROW_A + 4} width={aW} height={TH - 8} fill={C_A} rx={2} />
        {aW > 55 && (
          <text x={LBL + aW / 2} y={ROW_A + TH / 2 + 4}
            textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize={9} fontFamily="monospace">
            Preamble
          </text>
        )}

        {/* ── Node B row ── */}
        <text x={LBL - 5} y={ROW_B + TH / 2 + 4}
          textAnchor="end" fill="#94a3b8" fontSize={10} fontFamily="monospace">
          Node B
        </text>
        <rect x={LBL} y={ROW_B} width={TW} height={TH} fill={C_TRK} rx={2} />

        {nodeBVisible && (
          <>
            {collision ? (
              /* ── Collision: Node B preamble starts immediately ── */
              <>
                <rect x={nbAbsX} y={ROW_B + 4} width={collW} height={TH - 8}
                  fill={C_COLL} rx={2} />
                {collW > 50 && (
                  <text x={nbAbsX + collW / 2} y={ROW_B + TH / 2 + 4}
                    textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize={9} fontFamily="monospace">
                    Preamble
                  </text>
                )}
                {/* Collision highlight spanning both rows */}
                {collW > 0 && (
                  <rect
                    x={nbAbsX}
                    y={ROW_A}
                    width={Math.min(collW, LBL + aW - nbAbsX)}
                    height={TH * 2 + TG}
                    fill={C_COLL_BG}
                    rx={1}
                  />
                )}
              </>
            ) : (
              /* ── Deferred: waiting, then TX ── */
              <>
                {/* Dotted waiting line */}
                {waitLen > 0 && (
                  <line
                    x1={nbAbsX} y1={ROW_B + TH / 2}
                    x2={nbAbsX + waitLen} y2={ROW_B + TH / 2}
                    stroke={C_WAIT} strokeWidth={2} strokeDasharray="4,3"
                  />
                )}
                {waitLen > 6 && (
                  <text x={nbAbsX + 4} y={ROW_B + TH / 2 - 5}
                    fill={C_WAIT} fontSize={9} fontFamily="monospace">
                    warte...
                  </text>
                )}

                {/* "~200 ms" label at deferred start */}
                {simMs >= DEFER_VIS - 1 && (
                  <>
                    <line
                      x1={deferAbsX} y1={ROW_B - 3}
                      x2={deferAbsX} y2={ROW_B + TH + 3}
                      stroke={C_DEFER} strokeWidth={1.5} strokeDasharray="3,2"
                    />
                    <text x={deferAbsX + 3} y={ROW_B - 5}
                      fill={C_DEFER} fontSize={9} fontFamily="monospace">
                      ~200 ms
                    </text>
                  </>
                )}

                {/* Deferred TX bar */}
                {deferW > 0 && (
                  <rect x={deferAbsX} y={ROW_B + 4} width={deferW} height={TH - 8}
                    fill={C_DEFER} rx={2} />
                )}
                {deferW > 55 && (
                  <text x={deferAbsX + deferW / 2} y={ROW_B + TH / 2 + 4}
                    textAnchor="middle" fill="rgba(0,0,0,0.65)" fontSize={9} fontFamily="monospace">
                    Preamble
                  </text>
                )}
              </>
            )}
          </>
        )}

        {/* ── Threshold dashed line ── */}
        <line
          x1={threshAbsX} y1={ROW_A - 7}
          x2={threshAbsX} y2={ROW_B + TH + 7}
          stroke={threshColor} strokeWidth={2} strokeDasharray="5,3"
        />
        <text x={threshAbsX + 3} y={ROW_A - 9}
          fill={threshColor} fontSize={10} fontFamily="monospace">
          {threshMs.toFixed(1)} ms
        </text>

        {/* ── Time cursor ── */}
        <line
          x1={cursorAbsX} y1={ROW_A + 2}
          x2={cursorAbsX} y2={ROW_B + TH - 2}
          stroke={C_CURSOR} strokeWidth={1.5}
        />

        {/* ── Outcome label ── */}
        {outcome && (
          <text
            x={outcome.x}
            y={ROW_B + TH + 20}
            textAnchor={collision ? 'middle' : 'start'}
            fill={outcome.color}
            fontSize={11}
            fontFamily="monospace"
            fontWeight="bold"
          >
            {outcome.text}
          </text>
        )}
      </svg>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function CollisionAnimation(): JSX.Element {
  const [simMs,  setSimMs]  = useState(0);
  const [scIdx,  setScIdx]  = useState(0);
  const [paused, setPaused] = useState(false);

  const pausedRef  = useRef(false);
  const jumpRef    = useRef<number | null>(null);
  const rafRef     = useRef<number | null>(null);

  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    let sim        = 0;
    let lastTs     = -1;
    let holding    = false;
    let holdStart  = 0;
    let curSc      = 0;

    const frame = (ts: number) => {
      // Handle manual jump
      if (jumpRef.current !== null) {
        curSc           = jumpRef.current;
        jumpRef.current = null;
        sim             = 0;
        holding         = false;
        setScIdx(curSc);
        setSimMs(0);
        lastTs = ts;
        rafRef.current = requestAnimationFrame(frame);
        return;
      }

      if (pausedRef.current) {
        lastTs = ts;
        rafRef.current = requestAnimationFrame(frame);
        return;
      }

      if (lastTs < 0) lastTs = ts;
      const dt = Math.min(ts - lastTs, 80);
      lastTs = ts;

      if (holding) {
        if (ts - holdStart > HOLD_REAL) {
          holding = false;
          sim     = 0;
          curSc   = (curSc + 1) % SCENARIOS.length;
          setScIdx(curSc);
          setSimMs(0);
        }
      } else {
        sim += (dt * SPEED) / 1000;
        if (sim >= TIMELINE) {
          sim       = TIMELINE;
          holding   = true;
          holdStart = ts;
        }
        setSimMs(sim);
      }

      rafRef.current = requestAnimationFrame(frame);
    };

    rafRef.current = requestAnimationFrame(frame);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const sc = SCENARIOS[scIdx];

  return (
    <div style={{
      background   : '#0d0e18',
      borderRadius : 10,
      padding      : '18px 20px',
      color        : '#e2e8f0',
      fontFamily   : 'system-ui, -apple-system, sans-serif',
      border       : '1px solid rgba(255,255,255,0.07)',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 10, color: '#475569', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 }}>
          SF8 · BW 62,5 kHz · {SYM.toFixed(3)} ms / Symbol
        </div>
        <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>
          {sc.title}: <strong style={{ color: '#e2e8f0' }}>{sc.desc}</strong>
        </div>
        <div style={{
          fontSize: 12, fontWeight: 600, color: sc.noteC,
          background: 'rgba(255,255,255,0.04)', borderRadius: 6,
          padding: '5px 12px', display: 'inline-block',
        }}>
          {sc.note}
        </div>
      </div>

      {/* Detection panels */}
      <Panel
        label={`PREAMBLE_DETECTED  (aktuell — Korrelator, ~${IRQ_THR.toFixed(0)} ms)`}
        threshMs={IRQ_THR}
        threshColor={C_IRQ}
        simMs={simMs}
        nodeBMs={sc.nodeB}
      />
      <Panel
        label={`Hardware CAD  (PR #1727 — aktiver Scan, ~${CAD_THR.toFixed(0)} ms)`}
        threshMs={CAD_THR}
        threshColor={C_CAD}
        simMs={simMs}
        nodeBMs={sc.nodeB}
      />

      {/* Time axis */}
      <svg width="100%" viewBox={`0 0 ${SW} 18`} style={{ display: 'block', marginTop: 2 }}>
        {[0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80].map(ms => (
          <g key={ms}>
            <line x1={tx(ms)} y1={0} x2={tx(ms)} y2={5} stroke="#334155" strokeWidth={1} />
            <text x={tx(ms)} y={15} textAnchor="middle" fill="#475569" fontSize={9} fontFamily="monospace">
              {ms}
            </text>
          </g>
        ))}
        <text x={SW} y={15} textAnchor="end" fill="#475569" fontSize={9} fontFamily="monospace">ms</text>
      </svg>

      {/* Legend */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '5px 16px',
        marginTop: 12, fontSize: 11, color: '#64748b',
      }}>
        {[
          { bg: C_A,     label: 'Preamble Node A' },
          { bg: C_COLL,  label: 'Preamble Node B (Kollision)' },
          { bg: C_DEFER, label: 'Preamble Node B (verschoben)' },
          { bg: C_WAIT,  label: 'Node B wartet (CAD busy)' },
        ].map(({ bg, label }) => (
          <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{
              display: 'inline-block', width: 13, height: 13,
              background: bg, borderRadius: 2, flexShrink: 0,
            }} />
            {label}
          </span>
        ))}
        {[
          { stroke: C_IRQ,    dash: true,  label: 'PREAMBLE_DETECTED-Schwelle' },
          { stroke: C_CAD,    dash: true,  label: 'Hardware CAD-Schwelle' },
          { stroke: C_CURSOR, dash: false, label: 'aktuelle Zeit' },
        ].map(({ stroke, dash, label }) => (
          <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <svg width={13} height={13} style={{ flexShrink: 0 }}>
              <line x1={6} y1={0} x2={6} y2={13} stroke={stroke} strokeWidth={2}
                strokeDasharray={dash ? '4,3' : undefined} />
            </svg>
            {label}
          </span>
        ))}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 14 }}>
        <button onClick={() => setPaused(p => !p)} style={btnBase}>
          {paused ? '▶ Fortsetzen' : '⏸ Pause'}
        </button>
        {SCENARIOS.map((_, i) => (
          <button
            key={i}
            onClick={() => { jumpRef.current = i; setPaused(false); }}
            style={{
              ...btnBase,
              borderColor : i === scIdx ? '#94a3b8' : 'rgba(255,255,255,0.1)',
              color       : i === scIdx ? '#e2e8f0' : '#64748b',
            }}
          >
            S{i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
