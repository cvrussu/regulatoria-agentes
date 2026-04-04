import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { Logo } from "./Logo";
import { MouseCursor } from "./MouseCursor";
import { OrchestratorScene } from "./OrchestratorScene";

const GREEN       = "#5AAD2D";
const GREEN_DARK  = "#2B5A14";
const ORANGE      = "#ea580c";
const BLUE        = "#2563eb";
const BG_DARK     = "#0a140a";
const BG_LIGHT    = "#f8faf6";

// ── helpers ──────────────────────────────────────────────────
function fadeIn(frame: number, start: number, dur = 20) {
  return interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
}
function slideY(frame: number, start: number, fps: number, from = 40) {
  const p = spring({ frame: frame - start, fps, config: { damping: 14, stiffness: 90 } });
  return interpolate(p, [0, 1], [from, 0]);
}
function counter(frame: number, start: number, end: number, dur: number) {
  return Math.round(
    interpolate(frame, [0, dur], [start, end], {
      easing: Easing.out(Easing.quad),
      extrapolateLeft: "clamp", extrapolateRight: "clamp",
    })
  );
}

// ── TRANSITION — Wipe ────────────────────────────────────────
const Transition: React.FC<{ frame: number; dir?: "left" | "right" }> = ({ frame, dir = "left" }) => {
  const x = interpolate(frame, [0, 20], dir === "left" ? [0, 110] : [110, 0], {
    easing: Easing.bezier(0.76, 0, 0.24, 1),
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 50,
      background: `linear-gradient(135deg, ${GREEN_DARK}, ${GREEN})`,
      transform: `translateX(${x}%)`,
      pointerEvents: "none",
    }} />
  );
};

// ══════════════════════════════════════════════════════════════
// SCENE 1 — PROBLEMA
// ══════════════════════════════════════════════════════════════
const SceneProblema: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const f = frame - startFrame;

  const problems = [
    { icon: "⏱️", label: "6–18 meses", sub: "por registro manual", color: "#FF6B6B" },
    { icon: "❌", label: "60%",          sub: "de expedientes con errores", color: ORANGE },
    { icon: "👥", label: "Equipos",      sub: "saturados y sin escalabilidad", color: "#FFB347" },
    { icon: "📋", label: "Constantes",   sub: "cambios normativos", color: "#c084fc" },
  ];

  const cursorKeyframes = [
    { frame: startFrame + 15, x: 400, y: 300 },
    { frame: startFrame + 50, x: 700, y: 420 },
    { frame: startFrame + 90, x: 1100, y: 380 },
    { frame: startFrame + 125, x: 1400, y: 430 },
  ];

  return (
    <AbsoluteFill style={{
      background: `radial-gradient(ellipse at 20% 60%, rgba(43,90,20,0.2) 0%, transparent 50%), ${BG_DARK}`,
    }}>
      {/* Grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(90,173,45,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(90,173,45,0.035) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }} />

      {/* Logo top-left */}
      <div style={{
        position: "absolute", top: 32, left: 48,
        opacity: fadeIn(f, 0, 15),
      }}>
        <Logo scale={0.32} variant="white" />
      </div>

      {/* Heading */}
      <div style={{
        position: "absolute", top: 130, left: 0, right: 0, textAlign: "center",
        opacity: fadeIn(f, 10, 20),
        transform: `translateY(${slideY(f, 10, fps, 30)}px)`,
      }}>
        <div style={{ fontSize: 13, letterSpacing: 5, color: GREEN, fontWeight: 700, marginBottom: 16 }}>EL PROBLEMA</div>
        <div style={{ fontSize: 60, fontWeight: 900, color: "white", fontFamily: "Inter, sans-serif", lineHeight: 1.1 }}>
          Registrar agroquímicos es<br />
          <span style={{ background: `linear-gradient(135deg, #FF6B6B, ${ORANGE})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            lento, costoso y complejo
          </span>
        </div>
      </div>

      {/* Problem cards */}
      <div style={{
        position: "absolute",
        bottom: 120,
        left: 80, right: 80,
        display: "flex", gap: 28,
      }}>
        {problems.map((p, i) => {
          const s = spring({ frame: f - 30 - i * 12, fps, config: { damping: 14, stiffness: 80 } });
          return (
            <div key={i} style={{
              flex: 1,
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${p.color}33`,
              borderRadius: 20,
              padding: "32px 24px",
              textAlign: "center",
              opacity: s,
              transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px)`,
            }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>{p.icon}</div>
              <div style={{ fontSize: 38, fontWeight: 900, color: p.color, fontFamily: "Inter, sans-serif" }}>{p.label}</div>
              <div style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", marginTop: 8, lineHeight: 1.4 }}>{p.sub}</div>
            </div>
          );
        })}
      </div>

      <MouseCursor keyframes={cursorKeyframes} />
      <Transition frame={f} dir="left" />
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════
// SCENE 3 — 3 FASES
// ══════════════════════════════════════════════════════════════
const SceneFases: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const f = frame - startFrame;

  const phases = [
    {
      num: "I", title: "Pre-Registro", icon: "🔍", color: GREEN,
      agents: ["🧭 COMPASS", "🔬 PREDICT", "🧬 GENESIS", "🔍 SCOUT", "🛡️ SOURCE"],
      desc: "Análisis de viabilidad regulatoria y preparación automática de documentación técnica.",
    },
    {
      num: "II", title: "Registro", icon: "📋", color: ORANGE,
      agents: ["📁 BINDER", "✅ AUDITOR", "⚖️ DEFENDER", "🏷️ SCRIBE"],
      desc: "Generación del expediente completo con validación inteligente y defensa regulatoria.",
    },
    {
      num: "III", title: "Post-Registro", icon: "🌍", color: BLUE,
      agents: ["🌍 BRIDGE", "🔔 GUARD"],
      desc: "Expansión a mercados LATAM y monitoreo continuo de cambios normativos 24/7.",
    },
  ];

  const cursorKeyframes = [
    { frame: startFrame + 15, x: 480, y: 400 },
    { frame: startFrame + 60, x: 960, y: 420 },
    { frame: startFrame + 110, x: 1450, y: 400 },
    { frame: startFrame + 150, x: 960, y: 600 },
  ];

  // Flow arrow animation
  const arrowT = (f % 45) / 45;

  return (
    <AbsoluteFill style={{ background: BG_LIGHT }}>
      {/* Logo top-left */}
      <div style={{ position: "absolute", top: 32, left: 48, opacity: fadeIn(f, 0, 15) }}>
        <Logo scale={0.28} variant="dark" />
      </div>

      {/* Heading */}
      <div style={{
        position: "absolute", top: 100, left: 0, right: 0, textAlign: "center",
        opacity: fadeIn(f, 8, 20),
        transform: `translateY(${slideY(f, 8, fps, 25)}px)`,
      }}>
        <div style={{ fontSize: 13, letterSpacing: 5, color: GREEN, fontWeight: 700, marginBottom: 12 }}>PROCESO</div>
        <div style={{ fontSize: 52, fontWeight: 900, color: "#0f1a0a", fontFamily: "Inter, sans-serif" }}>
          Tres fases.{" "}
          <span style={{ background: `linear-gradient(135deg, ${GREEN_DARK}, ${GREEN})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Cero fricción.
          </span>
        </div>
      </div>

      {/* Phase cards */}
      <div style={{
        position: "absolute", bottom: 80, left: 60, right: 60,
        display: "flex", gap: 0, alignItems: "stretch",
      }}>
        {phases.map((ph, i) => {
          const s = spring({ frame: f - 25 - i * 15, fps, config: { damping: 14, stiffness: 85 } });
          return (
            <React.Fragment key={i}>
              <div style={{
                flex: 1,
                background: "white",
                borderRadius: 24,
                padding: "36px 28px",
                boxShadow: "0 4px 40px rgba(0,0,0,0.08)",
                borderTop: `6px solid ${ph.color}`,
                opacity: s,
                transform: `translateY(${interpolate(s, [0, 1], [50, 0])}px)`,
              }}>
                <div style={{ fontSize: 11, letterSpacing: 3, fontWeight: 700, color: ph.color, marginBottom: 12 }}>FASE {ph.num}</div>
                <div style={{ fontSize: 44, marginBottom: 16 }}>{ph.icon}</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: "#0f1a0a", marginBottom: 12 }}>{ph.title}</div>
                <div style={{ fontSize: 15, color: "#5a6b52", lineHeight: 1.6, marginBottom: 20 }}>{ph.desc}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {ph.agents.map((a) => (
                    <span key={a} style={{
                      fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 50,
                      background: "#f8faf6", color: ph.color, border: `1px solid ${ph.color}33`,
                    }}>{a}</span>
                  ))}
                </div>
              </div>

              {/* Flow arrow between cards */}
              {i < phases.length - 1 && (
                <div style={{
                  width: 48, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  opacity: interpolate(f, [50, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                }}>
                  <svg width="36" height="36" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill={GREEN} opacity="0.12" />
                    {/* Animated dot moving right */}
                    <circle
                      cx={4 + arrowT * 28}
                      cy={18}
                      r="3.5"
                      fill={GREEN}
                    />
                    <path d="M24 12 L32 18 L24 24" stroke={GREEN} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <MouseCursor keyframes={cursorKeyframes} />
      <Transition frame={f} dir="left" />
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════
// SCENE 4 — RESULTADOS
// ══════════════════════════════════════════════════════════════
const SceneResultados: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - startFrame;

  const metrics = [
    { value: 80,   unit: "%",  label: "reducción de tiempos",     color: GREEN,  prefix: "−" },
    { value: 10,   unit: "x",  label: "más registros por equipo", color: GREEN,  prefix: "" },
    { value: 99,   unit: "%",  label: "exactitud en expedientes", color: "#3A86FF", prefix: "" },
    { value: 24,   unit: "/7", label: "monitoreo automatizado",   color: "#8338EC", prefix: "" },
  ];

  const cursorKeyframes = [
    { frame: startFrame + 20, x: 360, y: 500 },
    { frame: startFrame + 65, x: 800, y: 480 },
    { frame: startFrame + 110, x: 1240, y: 510 },
    { frame: startFrame + 155, x: 1600, y: 490 },
  ];

  return (
    <AbsoluteFill style={{
      background: `radial-gradient(ellipse at 50% 80%, rgba(43,90,20,0.25) 0%, transparent 60%), #0d1b0d`,
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(90,173,45,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(90,173,45,0.03) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }} />

      {/* Logo */}
      <div style={{ position: "absolute", top: 32, left: 48, opacity: fadeIn(f, 0, 15) }}>
        <Logo scale={0.28} variant="white" />
      </div>

      {/* Heading */}
      <div style={{
        position: "absolute", top: 110, left: 0, right: 0, textAlign: "center",
        opacity: fadeIn(f, 8, 20),
        transform: `translateY(${slideY(f, 8, fps, 25)}px)`,
      }}>
        <div style={{ fontSize: 13, letterSpacing: 5, color: GREEN, fontWeight: 700, marginBottom: 12 }}>RESULTADOS</div>
        <div style={{ fontSize: 52, fontWeight: 900, color: "white", fontFamily: "Inter, sans-serif" }}>
          Impacto real en tu operación
        </div>
      </div>

      {/* Metric cards */}
      <div style={{
        position: "absolute", bottom: 90, left: 70, right: 70,
        display: "flex", gap: 32,
      }}>
        {metrics.map((m, i) => {
          const s = spring({ frame: f - 30 - i * 14, fps, config: { damping: 13, stiffness: 85 } });
          const count = counter(f - 30, 0, m.value, 60);

          // Arc progress
          const arcProgress = interpolate(f - 30, [0, 80], [0, m.value / 100], {
            easing: Easing.out(Easing.cubic),
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          });
          const r = 52;
          const circ = 2 * Math.PI * r;
          const dash = arcProgress * circ;

          return (
            <div key={i} style={{
              flex: 1,
              background: `rgba(${m.color === GREEN ? "90,173,45" : m.color === "#3A86FF" ? "58,134,255" : "131,56,236"},0.08)`,
              border: `1px solid ${m.color}33`,
              borderRadius: 24,
              padding: "40px 24px",
              textAlign: "center",
              opacity: s,
              transform: `scale(${interpolate(s, [0, 1], [0.85, 1])})`,
              boxShadow: `0 0 40px ${m.color}11`,
            }}>
              {/* Arc */}
              <div style={{ position: "relative", display: "inline-block", marginBottom: 20 }}>
                <svg width={120} height={120} style={{ transform: "rotate(-90deg)" }}>
                  <circle cx={60} cy={60} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                  <circle
                    cx={60} cy={60} r={r} fill="none"
                    stroke={m.color} strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${dash} ${circ}`}
                  />
                </svg>
                <div style={{
                  position: "absolute", inset: 0,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{
                    fontSize: 32, fontWeight: 900, color: m.color,
                    fontFamily: "Inter, sans-serif", lineHeight: 1,
                  }}>
                    {m.prefix}{count}{m.unit}
                  </span>
                </div>
              </div>
              <div style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.4 }}>{m.label}</div>
            </div>
          );
        })}
      </div>

      <MouseCursor keyframes={cursorKeyframes} />
      <Transition frame={f} dir="left" />
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════
// SCENE 5 — CTA FINAL
// ══════════════════════════════════════════════════════════════
const SceneCTA: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const f = frame - startFrame;

  const logoScale = spring({ frame: f - 10, fps, config: { damping: 12, stiffness: 70 } });
  const textOpacity = fadeIn(f, 35, 25);
  const btnScale = spring({ frame: f - 55, fps, config: { damping: 14, stiffness: 90 } });

  // Cursor moves to CTA button
  const cursorKeyframes = [
    { frame: startFrame + 55, x: width / 2 + 200, y: height / 2 + 160 },
    { frame: startFrame + 85, x: width / 2 - 10, y: height / 2 + 165 },
    { frame: startFrame + 100, x: width / 2 - 10, y: height / 2 + 165 },
  ];

  // Pulse ring on logo
  const pulseT = (f % 50) / 50;
  const pulseR = interpolate(pulseT, [0, 1], [80, 160]);
  const pulseOpacity = interpolate(pulseT, [0, 0.5, 1], [0.3, 0.1, 0]);

  return (
    <AbsoluteFill style={{
      background: `radial-gradient(ellipse at 30% 60%, rgba(43,90,20,0.4) 0%, transparent 55%),
                   radial-gradient(ellipse at 75% 25%, rgba(90,173,45,0.1) 0%, transparent 50%),
                   ${BG_DARK}`,
    }}>
      {/* Grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(90,173,45,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(90,173,45,0.04) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }} />

      {/* Pulse rings */}
      <svg style={{ position: "absolute", inset: 0 }} width={width} height={height}>
        <circle cx={width / 2} cy={height / 2 - 60} r={pulseR} stroke={GREEN} strokeWidth="1" fill="none" opacity={pulseOpacity} />
        <circle cx={width / 2} cy={height / 2 - 60} r={pulseR * 0.6} stroke={GREEN} strokeWidth="0.8" fill="none" opacity={pulseOpacity * 0.6} />
      </svg>

      {/* Logo centered */}
      <div style={{
        position: "absolute",
        left: 0, right: 0,
        top: height / 2 - 200,
        display: "flex", justifyContent: "center",
        transform: `scale(${logoScale})`,
        transformOrigin: "center",
        opacity: logoScale,
      }}>
        <Logo scale={0.72} variant="white" />
      </div>

      {/* Tagline */}
      <div style={{
        position: "absolute",
        left: 0, right: 0,
        top: height / 2 + 20,
        textAlign: "center",
        opacity: textOpacity,
      }}>
        <div style={{ fontSize: 22, color: "rgba(255,255,255,0.5)", letterSpacing: 1, marginBottom: 8 }}>
          Primera consultora de registro de plaguicidas impulsada por IA
        </div>
        <div style={{ fontSize: 16, color: "rgba(255,255,255,0.35)" }}>
          proyectos@uranoia.cl · +56 9 8144 0854 · www.gruporegulatorio.cl
        </div>
      </div>

      {/* CTA Buttons */}
      <div style={{
        position: "absolute",
        left: 0, right: 0,
        top: height / 2 + 130,
        display: "flex", justifyContent: "center", gap: 20,
        transform: `scale(${btnScale})`,
        opacity: btnScale,
      }}>
        <div style={{
          background: `linear-gradient(135deg, ${GREEN}, ${GREEN_DARK})`,
          color: "white", padding: "18px 48px", borderRadius: 60,
          fontSize: 18, fontWeight: 700, fontFamily: "Inter, sans-serif",
          boxShadow: `0 8px 32px ${GREEN}44`,
          letterSpacing: 0.5,
        }}>
          Agenda una consulta →
        </div>
        <div style={{
          background: "transparent",
          color: "rgba(255,255,255,0.8)", padding: "18px 48px", borderRadius: 60,
          fontSize: 18, fontWeight: 600, fontFamily: "Inter, sans-serif",
          border: "1.5px solid rgba(255,255,255,0.2)",
        }}>
          Solicita una demo
        </div>
      </div>

      <MouseCursor keyframes={cursorKeyframes} />
      <Transition frame={f} dir="left" />
    </AbsoluteFill>
  );
};

// ══════════════════════════════════════════════════════════════
// MAIN COMPOSITION
// ══════════════════════════════════════════════════════════════
// Scene durations (frames @ 30fps):
// 0   → 180  : Problema   (6s)
// 180 → 450  : Orquestador (9s)
// 450 → 630  : Fases      (6s)
// 630 → 810  : Resultados  (6s)
// 810 → 990  : CTA         (6s)
// Total: 990 frames = 33s

export const RegulatoriaVideo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ fontFamily: "Inter, system-ui, sans-serif", overflow: "hidden" }}>
      <Sequence from={0} durationInFrames={180}>
        <SceneProblema startFrame={0} />
      </Sequence>
      <Sequence from={180} durationInFrames={270}>
        <OrchestratorScene startFrame={180} />
      </Sequence>
      <Sequence from={450} durationInFrames={180}>
        <SceneFases startFrame={450} />
      </Sequence>
      <Sequence from={630} durationInFrames={180}>
        <SceneResultados startFrame={630} />
      </Sequence>
      <Sequence from={810} durationInFrames={180}>
        <SceneCTA startFrame={810} />
      </Sequence>
    </AbsoluteFill>
  );
};
