import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

const BRAND_BLUE = "#0A2463";
const BRAND_GREEN = "#1B998B";
const BRAND_LIGHT = "#F4F7FF";
const BRAND_WHITE = "#FFFFFF";

function fadeIn(frame: number, start: number, duration = 20) {
  return interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

function slideUp(frame: number, start: number, fps: number) {
  const progress = spring({ frame: frame - start, fps, config: { damping: 14, stiffness: 100 } });
  return interpolate(progress, [0, 1], [60, 0]);
}

// Scene 1: Intro / Problema
const SceneProblema: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const titleOpacity = fadeIn(frame, 10);
  const titleY = slideUp(frame, 10, fps);
  const subtitleOpacity = fadeIn(frame, 25);
  const stat1Opacity = fadeIn(frame, 40);
  const stat2Opacity = fadeIn(frame, 55);

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND_BLUE, justifyContent: "center", alignItems: "center", padding: 80 }}>
      <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)`, textAlign: "center" }}>
        <div style={{ fontSize: 24, color: BRAND_GREEN, fontFamily: "sans-serif", letterSpacing: 4, marginBottom: 16, fontWeight: 600 }}>
          EL PROBLEMA
        </div>
        <div style={{ fontSize: 72, color: BRAND_WHITE, fontFamily: "sans-serif", fontWeight: 800, lineHeight: 1.1, maxWidth: 1200 }}>
          Registrar agroquímicos es<br />
          <span style={{ color: BRAND_GREEN }}>lento, costoso y complejo</span>
        </div>
      </div>

      <div style={{ display: "flex", gap: 60, marginTop: 80 }}>
        <div style={{ opacity: stat1Opacity, backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 20, padding: "40px 60px", textAlign: "center" }}>
          <div style={{ fontSize: 80, color: BRAND_GREEN, fontWeight: 800, fontFamily: "sans-serif" }}>18</div>
          <div style={{ fontSize: 24, color: BRAND_WHITE, fontFamily: "sans-serif", opacity: 0.8 }}>meses promedio<br />por registro manual</div>
        </div>
        <div style={{ opacity: stat2Opacity, backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 20, padding: "40px 60px", textAlign: "center" }}>
          <div style={{ fontSize: 80, color: "#FF6B6B", fontWeight: 800, fontFamily: "sans-serif" }}>60%</div>
          <div style={{ fontSize: 24, color: BRAND_WHITE, fontFamily: "sans-serif", opacity: 0.8 }}>de expedientes<br />con errores u omisiones</div>
        </div>
      </div>

      <div style={{ opacity: subtitleOpacity, marginTop: 60, fontSize: 28, color: "rgba(255,255,255,0.6)", fontFamily: "sans-serif" }}>
        Documentación incompleta · Rechazos regulatorios · Equipos saturados
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: Solución
const SceneSolucion: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const titleOpacity = fadeIn(frame, 5);
  const titleY = slideUp(frame, 5, fps);
  const card1Opacity = fadeIn(frame, 20);
  const card2Opacity = fadeIn(frame, 35);
  const card3Opacity = fadeIn(frame, 50);

  const phases = [
    { emoji: "🔍", title: "Pre-Registro", desc: "IA analiza requisitos regulatorios y prepara documentación automáticamente", color: "#3A86FF" },
    { emoji: "📋", title: "Registro", desc: "Generación y envío del expediente completo con validación inteligente", color: BRAND_GREEN },
    { emoji: "✅", title: "Post-Registro", desc: "Monitoreo continuo de cumplimiento y actualizaciones regulatorias", color: "#8338EC" },
  ];
  const opacities = [card1Opacity, card2Opacity, card3Opacity];

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND_LIGHT, justifyContent: "center", alignItems: "center", padding: 80 }}>
      <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)`, textAlign: "center", marginBottom: 60 }}>
        <div style={{ fontSize: 24, color: BRAND_GREEN, fontFamily: "sans-serif", letterSpacing: 4, marginBottom: 12, fontWeight: 600 }}>
          LA SOLUCIÓN
        </div>
        <div style={{ fontSize: 64, color: BRAND_BLUE, fontFamily: "sans-serif", fontWeight: 800 }}>
          Automatización regulatoria con <span style={{ color: BRAND_GREEN }}>IA</span>
        </div>
      </div>

      <div style={{ display: "flex", gap: 40, width: "100%" }}>
        {phases.map((phase, i) => (
          <div key={i} style={{
            opacity: opacities[i],
            flex: 1,
            backgroundColor: BRAND_WHITE,
            borderRadius: 24,
            padding: 48,
            borderTop: `6px solid ${phase.color}`,
            boxShadow: "0 4px 40px rgba(0,0,0,0.08)",
          }}>
            <div style={{ fontSize: 56, marginBottom: 20 }}>{phase.emoji}</div>
            <div style={{ fontSize: 32, color: BRAND_BLUE, fontWeight: 700, fontFamily: "sans-serif", marginBottom: 16 }}>{phase.title}</div>
            <div style={{ fontSize: 22, color: "#555", fontFamily: "sans-serif", lineHeight: 1.5 }}>{phase.desc}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: Diferenciadores
const SceneDiferenciadores: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const titleOpacity = fadeIn(frame, 5);
  const items = [
    { icon: "⚡", text: "Procesamiento en paralelo — múltiples registros simultáneos", delay: 15 },
    { icon: "🌎", text: "IA entrenada en normativa de Chile, LATAM, FAO/WHO", delay: 28 },
    { icon: "💰", text: "Hasta 60% menos costo vs. equipo regulatorio tradicional", delay: 41 },
    { icon: "🚀", text: "De 18 meses a semanas en procesos de pre-registro", delay: 54 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND_BLUE, justifyContent: "center", padding: "80px 120px" }}>
      <div style={{ opacity: titleOpacity, marginBottom: 60 }}>
        <div style={{ fontSize: 24, color: BRAND_GREEN, fontFamily: "sans-serif", letterSpacing: 4, marginBottom: 12, fontWeight: 600 }}>
          DIFERENCIADORES
        </div>
        <div style={{ fontSize: 64, color: BRAND_WHITE, fontFamily: "sans-serif", fontWeight: 800 }}>
          ¿Por qué RegulatorIA?
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {items.map((item, i) => {
          const opacity = fadeIn(frame, item.delay);
          const x = interpolate(frame, [item.delay, item.delay + 20], [-40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{
              opacity,
              transform: `translateX(${x}px)`,
              display: "flex",
              alignItems: "center",
              gap: 32,
              backgroundColor: "rgba(255,255,255,0.07)",
              borderRadius: 16,
              padding: "28px 40px",
              borderLeft: `4px solid ${BRAND_GREEN}`,
            }}>
              <span style={{ fontSize: 44 }}>{item.icon}</span>
              <span style={{ fontSize: 28, color: BRAND_WHITE, fontFamily: "sans-serif", fontWeight: 500 }}>{item.text}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: CTA
const SceneCTA: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const bgProgress = spring({ frame, fps, config: { damping: 20 } });
  const titleOpacity = fadeIn(frame, 10);
  const titleY = slideUp(frame, 10, fps);
  const ctaOpacity = fadeIn(frame, 35);
  const scale = interpolate(spring({ frame: frame - 35, fps, config: { damping: 12 } }), [0, 1], [0.8, 1]);

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(135deg, ${BRAND_BLUE} 0%, #1B3A8C 50%, #0D2040 100%)`,
      justifyContent: "center",
      alignItems: "center",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05, backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div style={{ textAlign: "center", zIndex: 1 }}>
        <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
          <div style={{ fontSize: 32, color: BRAND_GREEN, fontFamily: "sans-serif", letterSpacing: 4, marginBottom: 20, fontWeight: 600 }}>
            EMPIEZA HOY
          </div>
          <div style={{ fontSize: 80, color: BRAND_WHITE, fontFamily: "sans-serif", fontWeight: 900, lineHeight: 1.1 }}>
            Registra más.<br />
            <span style={{ color: BRAND_GREEN }}>Espera menos.</span>
          </div>
          <div style={{ fontSize: 30, color: "rgba(255,255,255,0.65)", fontFamily: "sans-serif", marginTop: 24 }}>
            www.gruporegulatorio.cl
          </div>
        </div>

        <div style={{ opacity: ctaOpacity, transform: `scale(${scale})`, marginTop: 60, display: "flex", gap: 32, justifyContent: "center" }}>
          <div style={{
            backgroundColor: BRAND_GREEN,
            color: BRAND_WHITE,
            fontSize: 28,
            fontWeight: 700,
            fontFamily: "sans-serif",
            padding: "24px 56px",
            borderRadius: 60,
          }}>
            Solicita una Demo
          </div>
          <div style={{
            backgroundColor: "transparent",
            color: BRAND_WHITE,
            fontSize: 28,
            fontWeight: 600,
            fontFamily: "sans-serif",
            padding: "24px 56px",
            borderRadius: 60,
            border: "2px solid rgba(255,255,255,0.4)",
          }}>
            Prueba Piloto Gratis
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Main composition
export const RegulatoriaDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={60}>
        <SceneProblema frame={frame} fps={fps} />
      </Sequence>
      <Sequence from={60} durationInFrames={60}>
        <SceneSolucion frame={frame - 60} fps={fps} />
      </Sequence>
      <Sequence from={120} durationInFrames={60}>
        <SceneDiferenciadores frame={frame - 120} fps={fps} />
      </Sequence>
      <Sequence from={180} durationInFrames={30}>
        <SceneCTA frame={frame - 180} fps={fps} />
      </Sequence>
    </AbsoluteFill>
  );
};
