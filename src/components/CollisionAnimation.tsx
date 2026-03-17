import React, { useState, useEffect, useRef } from 'react';

// SF8, BW 62.5 kHz
const SYM = 4.096; // ms per symbol
const CAD_MS = SYM * 1;  // Hardware CAD: 1 symbol  ≈ 4.1 ms
const IRQ_MS = SYM * 5;  // PREAMBLE_DETECTED: 5 symbols ≈ 20.5 ms
const PREAMBLE_MS = SYM * 8; // full preamble ≈ 32.8 ms
const SHOW_MS = 46;

const SVG_W = 560;
const BAR_TOP = 26;
const BAR_H = 30;
const ROW_SVG_H = BAR_TOP + BAR_H + 26;

const px = (ms: number) => (ms / SHOW_MS) * SVG_W;

const SPEED = 13;   // ms simulation per real second
const HOLD_MS = 3000;

const SCENARIOS = [
  {
    nodeB: 2,
    title: 'Szenario 1 / 3',
    desc: 'Node B sendet 2 ms nach Node A',
    note: 'Beide Verfahren kommen zu spät — Kollision unvermeidlich',
  },
  {
    nodeB: 10,
    title: 'Szenario 2 / 3',
    desc: 'Node B sendet 10 ms nach Node A',
    note: 'Hardware CAD erkennt — PREAMBLE_DETECTED noch nicht',
  },
  {
    nodeB: 27,
    title: 'Szenario 3 / 3',
    desc: 'Node B sendet 27 ms nach Node A',
    note: 'Beide Verfahren erkennen rechtzeitig',
  },
];

const COLLISION_COLOR = '#f87171';
const SAFE_COLOR = '#4ade80';
const CAD_COLOR = '#4ade80';
const IRQ_COLOR = '#fb923c';
const PREAMBLE_COLOR = 'rgba(96,165,250,0.65)';
const DANGER_BG = 'rgba(248,113,113,0.14)';
const SAFE_BG = 'rgba(74,222,128,0.10)';
const BORDER = 'rgba(255,255,255,0.08)';

const btnStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: 6,
  color: '#e2e8f0',
  padding: '5px 14px',
  cursor: 'pointer',
  fontSize: 12,
  fontFamily: 'system-ui, sans-serif',
};

function Row({
  label,
  threshMs,
  threshColor,
  simMs,
  nodeBMs,
  showNodeB,
  collision,
}: {
  label: string;
  threshMs: number;
  threshColor: string;
  simMs: number;
  nodeBMs: number;
  showNodeB: boolean;
  collision: boolean;
}) {
  const tx = px(threshMs);
  const cursor = px(Math.min(simMs, SHOW_MS));
  const preamble = px(Math.min(simMs, PREAMBLE_MS));
  const nb = px(nodeBMs);
  const outcomeColor = collision ? COLLISION_COLOR : SAFE_COLOR;

  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{
        fontSize: 11,
        fontWeight: 700,
        color: threshColor,
        marginBottom: 3,
        fontFamily: 'monospace',
        letterSpacing: 0.3,
      }}>
        {label}
      </div>
      <svg
        width="100%"
        viewBox={`0 0 ${SVG_W} ${ROW_SVG_H}`}
        style={{ display: 'block', overflow: 'visible' }}
      >
        {/* Danger zone */}
        <rect x={0} y={BAR_TOP} width={tx} height={BAR_H} fill={DANGER_BG} rx={3} />
        {/* Safe zone */}
        <rect x={tx} y={BAR_TOP} width={SVG_W - tx} height={BAR_H} fill={SAFE_BG} rx={3} />
        {/* Border */}
        <rect x={0} y={BAR_TOP} width={SVG_W} height={BAR_H}
          fill="none" stroke={BORDER} strokeWidth={1} rx={3} />

        {/* Symbols tick marks */}
        {[1,2,3,4,5,6,7,8].map(s => {
          const x = px(s * SYM);
          return (
            <line key={s}
              x1={x} y1={BAR_TOP} x2={x} y2={BAR_TOP + BAR_H}
              stroke="rgba(255,255,255,0.06)" strokeWidth={1}
            />
          );
        })}

        {/* Preamble progress bar */}
        <rect x={0} y={BAR_TOP + 7} width={preamble} height={BAR_H - 14}
          fill={PREAMBLE_COLOR} rx={2} />

        {/* Node A label inside bar */}
        {simMs > 3 && (
          <text x={Math.min(preamble / 2, px(6))} y={BAR_TOP + BAR_H / 2 + 4}
            textAnchor="middle" fill="rgba(255,255,255,0.7)"
            fontSize={10} fontFamily="monospace">
            Preamble Node A
          </text>
        )}

        {/* Threshold dashed line */}
        <line
          x1={tx} y1={BAR_TOP - 8}
          x2={tx} y2={BAR_TOP + BAR_H + 8}
          stroke={threshColor} strokeWidth={2}
          strokeDasharray="5,3"
        />
        {/* Threshold label */}
        <text x={tx + 4} y={BAR_TOP - 10}
          fill={threshColor} fontSize={10} fontFamily="monospace">
          {threshMs.toFixed(1)} ms
        </text>

        {/* Node B marker */}
        {showNodeB && (
          <>
            {/* Vertical bar */}
            <line
              x1={nb} y1={BAR_TOP - 4}
              x2={nb} y2={BAR_TOP + BAR_H + 4}
              stroke={outcomeColor} strokeWidth={2.5}
            />
            {/* Arrow pointing down */}
            <polygon
              points={`${nb},${BAR_TOP - 5} ${nb - 7},${BAR_TOP - 17} ${nb + 7},${BAR_TOP - 17}`}
              fill={outcomeColor}
            />
            {/* Label above arrow */}
            <text
              x={nb} y={BAR_TOP - 20}
              textAnchor="middle"
              fill={outcomeColor}
              fontSize={9}
              fontFamily="monospace"
              fontWeight="bold"
            >
              Node B
            </text>
            {/* Outcome below bar */}
            <text
              x={nb} y={BAR_TOP + BAR_H + 20}
              textAnchor="middle"
              fill={outcomeColor}
              fontSize={12}
              fontFamily="monospace"
              fontWeight="bold"
            >
              {collision ? '⚡ KOLLISION' : '✓ TX zurückgestellt'}
            </text>
          </>
        )}

        {/* Time cursor */}
        <line
          x1={cursor} y1={BAR_TOP + 4}
          x2={cursor} y2={BAR_TOP + BAR_H - 4}
          stroke="rgba(255,255,255,0.4)" strokeWidth={1.5}
        />
      </svg>
    </div>
  );
}

export default function CollisionAnimation(): JSX.Element {
  const [simMs, setSimMs] = useState(0);
  const [scIdx, setScIdx] = useState(0);
  const [showNodeB, setShowNodeB] = useState(false);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    let sim = 0;
    let lastTs = -1;
    let holding = false;
    let holdStart = 0;
    let curScIdx = 0;

    const frame = (ts: number) => {
      if (pausedRef.current) {
        lastTs = ts;
        rafRef.current = requestAnimationFrame(frame);
        return;
      }

      if (lastTs < 0) lastTs = ts;
      const dt = Math.min(ts - lastTs, 80);
      lastTs = ts;

      if (holding) {
        if (ts - holdStart > HOLD_MS) {
          holding = false;
          sim = 0;
          curScIdx = (curScIdx + 1) % SCENARIOS.length;
          setScIdx(curScIdx);
          setSimMs(0);
          setShowNodeB(false);
        }
      } else {
        sim += (dt * SPEED) / 1000;
        if (sim >= SHOW_MS) {
          sim = SHOW_MS;
          holding = true;
          holdStart = ts;
        }
        setSimMs(sim);
        setShowNodeB(sim >= SCENARIOS[curScIdx].nodeB);
      }

      rafRef.current = requestAnimationFrame(frame);
    };

    rafRef.current = requestAnimationFrame(frame);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const sc = SCENARIOS[scIdx];
  const cadCollision = sc.nodeB < CAD_MS;
  const irqCollision = sc.nodeB < IRQ_MS;

  const noteColor =
    cadCollision && irqCollision ? COLLISION_COLOR
    : !cadCollision && irqCollision ? IRQ_COLOR
    : SAFE_COLOR;

  return (
    <div style={{
      background: '#0f1117',
      borderRadius: 10,
      padding: '18px 22px',
      color: '#e2e8f0',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      maxWidth: 720,
      margin: '0 auto',
      border: '1px solid rgba(255,255,255,0.07)',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 18 }}>
        <div style={{ fontSize: 10, color: '#64748b', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 }}>
          SF8 · BW 62,5 kHz · {SYM.toFixed(3)} ms / Symbol
        </div>
        <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>
          {sc.title}: <strong style={{ color: '#e2e8f0' }}>{sc.desc}</strong>
        </div>
        <div style={{
          fontSize: 12,
          color: noteColor,
          fontWeight: 600,
          background: 'rgba(255,255,255,0.04)',
          borderRadius: 6,
          padding: '5px 12px',
          display: 'inline-block',
        }}>
          {sc.note}
        </div>
      </div>

      {/* Timeline rows */}
      <Row
        label="PREAMBLE_DETECTED  (aktuell, ~5 Symbole Korrelator)"
        threshMs={IRQ_MS}
        threshColor={IRQ_COLOR}
        simMs={simMs}
        nodeBMs={sc.nodeB}
        showNodeB={showNodeB}
        collision={irqCollision}
      />
      <Row
        label="Hardware CAD  (PR #1727, 1 Symbol aktiver Scan)"
        threshMs={CAD_MS}
        threshColor={CAD_COLOR}
        simMs={simMs}
        nodeBMs={sc.nodeB}
        showNodeB={showNodeB}
        collision={cadCollision}
      />

      {/* Time axis */}
      <svg width="100%" viewBox={`0 0 ${SVG_W} 18`} style={{ display: 'block', marginTop: 2 }}>
        {[0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44].map(ms => (
          <g key={ms}>
            <line x1={px(ms)} y1={0} x2={px(ms)} y2={5} stroke="#334155" strokeWidth={1} />
            <text x={px(ms)} y={15} textAnchor="middle" fill="#475569" fontSize={9} fontFamily="monospace">
              {ms}
            </text>
          </g>
        ))}
        <text x={SVG_W} y={15} textAnchor="end" fill="#475569" fontSize={9} fontFamily="monospace">ms</text>
      </svg>

      {/* Legend */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '6px 18px',
        marginTop: 14, fontSize: 11, color: '#64748b',
      }}>
        {[
          { color: PREAMBLE_COLOR, label: 'Preamble Node A (laufend)' },
          { color: DANGER_BG, label: 'Keine Erkennung möglich', border: COLLISION_COLOR },
          { color: SAFE_BG, label: 'Erkennungszone', border: SAFE_COLOR },
        ].map(({ color, label, border }) => (
          <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{
              display: 'inline-block', width: 13, height: 13,
              background: color,
              border: `1px solid ${border ?? 'rgba(255,255,255,0.15)'}`,
              borderRadius: 2, flexShrink: 0,
            }} />
            {label}
          </span>
        ))}
        <span>▲ Node B TX-Versuch</span>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 14 }}>
        <button onClick={() => setPaused(p => !p)} style={btnStyle}>
          {paused ? '▶ Fortsetzen' : '⏸ Pause'}
        </button>
        {SCENARIOS.map((s, i) => (
          <button
            key={i}
            onClick={() => {
              setScIdx(i);
              setSimMs(0);
              setShowNodeB(false);
            }}
            style={{
              ...btnStyle,
              borderColor: i === scIdx ? '#94a3b8' : 'rgba(255,255,255,0.1)',
              color: i === scIdx ? '#e2e8f0' : '#64748b',
            }}
          >
            S{i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
