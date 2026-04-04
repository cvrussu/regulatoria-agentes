import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { MouseCursor } from "./MouseCursor";

const GREEN = "#5AAD2D";
const GREEN_DARK = "#2B5A14";
const TEAL = "#1B998B";
const NAVY = "#1B2A4A";

const AGENTS = [
  { emoji: "🧭", name: "COMPASS",  role: "Navigator",   color: GREEN,       free: true,  angle: -90 },
  { emoji: "🔬", name: "PREDICT",  role: "Lab",          color: TEAL,        free: false, angle: -57 },
  { emoji: "🧬", name: "GENESIS",  role: "Architect",    color: "#3A86FF",   free: false, angle: -24 },
  { emoji: "🔍", name: "SCOUT",    role: "Spy",          color: GREEN,       free: true,  angle: 9   },
  { emoji: "🛡️", name: "SOURCE",   role: "Gatekeeper",   color: "#8338EC",   free: false, angle: 42  },
  { emoji: "📁", name: "BINDER",   role: "Organizer",    color: "#ea580c",   free: false, angle: 75  },
  { emoji: "✅", name: "AUDITOR",  role: "Reviewer",     color: "#ea580c",   free: false, angle: 108 },
  { emoji: "⚖️", name: "DEFENDER", role: "Lawyer",       color: "#ea580c",   free: false, angle: 141 },
  { emoji: "🏷️", name: "SCRIBE",   role: "Publisher",    color: GREEN,       free: true,  angle: 174 },
  { emoji: "🌍", name: "BRIDGE",   role: "Globalizer",   color: "#2563eb",   free: false, angle: 207 },
  { emoji: "🔔", name: "GUARD",    role: "Sentinel",     color: "#2563eb",   free: false, angle: 240 },
];

function toRad(deg: number) { return (deg * Math.PI) / 180; }

export const OrchestratorScene: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const f = frame - startFrame;

  const cx = width / 2;
  const cy = height / 2;
  const orbitR = 330;

  // Orchestrator entrance
  const orchScale = spring({ frame: f, fps, config: { damping: 14, stiffness: 90 } });

  // Pulse ring
  const pulseT = (f % 60) / 60;
  const pulseR = interpolate(pulseT, [0, 1], [70, 130]);
  const pulseOpacity = interpolate(pulseT, [0, 0.6, 1], [0.5, 0.15, 0]);

  // Data particles flowing from orchestrator to agents
  const particleT = (f % 40) / 40;

  // Cursor path — circles the agents
  const cursorKeyframes = [
    { frame: startFrame + 20,  x: cx - 30, y: cy - 30 },
    { frame: startFrame + 60,  x: cx + orbitR * Math.cos(toRad(-90)) + cx * 0 - cx + cx, y: cy + orbitR * Math.sin(toRad(-90)) },
    { frame: startFrame + 100, x: cx + orbitR * Math.cos(toRad(42)),  y: cy + orbitR * Math.sin(toRad(42)) },
    { frame: startFrame + 140, x: cx + orbitR * Math.cos(toRad(174)), y: cy + orbitR * Math.sin(toRad(174)) },
    { frame: startFrame + 180, x: cx + orbitR * Math.cos(toRad(240)), y: cy + orbitR * Math.sin(toRad(240)) },
    { frame: startFrame + 210, x: cx - 30, y: cy - 30 },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden",
      background: "radial-gradient(ellipse at 30% 50%, rgba(43,90,20,0.3) 0%, transparent 60%), #0a140a" }}>

      {/* Grid bg */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(90,173,45,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(90,173,45,0.04) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }} />

      {/* Title */}
      <div style={{
        position: "absolute", top: 40, left: 0, right: 0, textAlign: "center",
        opacity: interpolate(f, [10, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        transform: `translateY(${interpolate(f, [10, 30], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
      }}>
        <div style={{ fontSize: 13, letterSpacing: 5, color: GREEN, fontWeight: 700, marginBottom: 8 }}>ECOSISTEMA DE AGENTES</div>
        <div style={{ fontSize: 42, fontWeight: 900, color: "white", fontFamily: "Inter, sans-serif" }}>
          Un orquestador. <span style={{ background: `linear-gradient(135deg, ${GREEN}, #8edc4f)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>11 agentes.</span>
        </div>
      </div>

      {/* SVG canvas for connections */}
      <svg style={{ position: "absolute", inset: 0 }} width={width} height={height}>
        {AGENTS.map((agent, i) => {
          const ax = cx + orbitR * Math.cos(toRad(agent.angle));
          const ay = cy + orbitR * Math.sin(toRad(agent.angle));
          const agentVisible = spring({ frame: f - i * 6, fps, config: { damping: 16, stiffness: 80 } });
          const lineOpacity = interpolate(agentVisible, [0, 1], [0, 0.3]);

          // Particle along the line
          const pt = ((f + i * 10) % 50) / 50;
          const px = cx + (ax - cx) * pt;
          const py = cy + (ay - cy) * pt;

          return (
            <g key={agent.name}>
              <line
                x1={cx} y1={cy} x2={ax} y2={ay}
                stroke={agent.color}
                strokeWidth="1.5"
                strokeOpacity={lineOpacity}
                strokeDasharray="4 6"
              />
              {/* Data particle */}
              <circle cx={px} cy={py} r="3" fill={agent.color}
                opacity={lineOpacity * 1.5} />
            </g>
          );
        })}

        {/* Pulse rings from orchestrator */}
        <circle cx={cx} cy={cy} r={pulseR} stroke={GREEN} strokeWidth="1.5" fill="none" opacity={pulseOpacity} />
        <circle cx={cx} cy={cy} r={pulseR * 0.6} stroke={GREEN} strokeWidth="1" fill="none" opacity={pulseOpacity * 0.5} />
      </svg>

      {/* Orchestrator center node */}
      <div style={{
        position: "absolute",
        left: cx - 75, top: cy - 75,
        width: 150, height: 150,
        transform: `scale(${orchScale})`,
        transformOrigin: "center",
      }}>
        <div style={{
          width: "100%", height: "100%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${GREEN_DARK}CC, #0a140a)`,
          border: `2px solid ${GREEN}`,
          boxShadow: `0 0 40px ${GREEN}66, 0 0 80px ${GREEN}22`,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: GREEN, fontWeight: 700 }}>ORQUESTADOR</div>
          <div style={{ fontSize: 28, marginTop: 2 }}>🤖</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>AI Core</div>
        </div>
      </div>

      {/* Agent nodes */}
      {AGENTS.map((agent, i) => {
        const ax = cx + orbitR * Math.cos(toRad(agent.angle));
        const ay = cy + orbitR * Math.sin(toRad(agent.angle));
        const agentSpring = spring({ frame: f - i * 6, fps, config: { damping: 14, stiffness: 80 } });
        const agentOpacity = interpolate(agentSpring, [0, 1], [0, 1]);

        // Gentle float
        const floatY = Math.sin((f + i * 15) / 30) * 5;

        return (
          <div key={agent.name} style={{
            position: "absolute",
            left: ax - 48,
            top: ay - 48 + floatY,
            width: 96, height: 96,
            opacity: agentOpacity,
            transform: `scale(${agentSpring})`,
            transformOrigin: "center",
          }}>
            <div style={{
              width: "100%", height: "100%",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${agent.color}22, #0a140a88)`,
              border: `1.5px solid ${agent.color}66`,
              boxShadow: `0 0 16px ${agent.color}33`,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(4px)",
            }}>
              <div style={{ fontSize: 22 }}>{agent.emoji}</div>
              <div style={{ fontSize: 9, fontWeight: 800, color: agent.color, letterSpacing: 1, marginTop: 2 }}>{agent.name}</div>
              <div style={{ fontSize: 8, color: "rgba(255,255,255,0.4)" }}>{agent.role}</div>
              {agent.free && (
                <div style={{
                  marginTop: 3, fontSize: 7, fontWeight: 700,
                  background: `${agent.color}33`, border: `1px solid ${agent.color}66`,
                  color: agent.color, padding: "1px 6px", borderRadius: 10,
                }}>FREE</div>
              )}
            </div>
          </div>
        );
      })}

      {/* Mouse cursor */}
      <MouseCursor keyframes={cursorKeyframes} />
    </div>
  );
};
