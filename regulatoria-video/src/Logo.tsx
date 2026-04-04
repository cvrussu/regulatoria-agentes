import React from "react";

// Official Regulator.IA logo — reconstructed from uploaded image
export const Logo: React.FC<{
  scale?: number;
  variant?: "dark" | "light" | "white";
  style?: React.CSSProperties;
}> = ({ scale = 1, variant = "dark", style }) => {
  const shieldColor =
    variant === "white" ? "#ffffff" : "#1B2A4A";
  const molColor =
    variant === "white" ? "rgba(255,255,255,0.9)" : "#1B998B";
  const regColor =
    variant === "white" ? "#ffffff" : "#155724";
  const iaColor =
    variant === "white" ? "rgba(255,255,255,0.85)" : "#1B998B";

  return (
    <svg
      viewBox="0 0 480 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: 480 * scale, height: 110 * scale, ...style }}
    >
      {/* Shield outline */}
      <path
        d="M47 8 L80 19 L80 50 C80 70 65 86 47 96 C29 86 14 70 14 50 L14 19 Z"
        stroke={shieldColor}
        strokeWidth="4.5"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Molecule / network graph inside shield */}
      {/* Nodes */}
      <circle cx="47" cy="30" r="4" fill={molColor} />
      <circle cx="33" cy="46" r="3.5" fill={molColor} />
      <circle cx="62" cy="44" r="3.5" fill={molColor} />
      <circle cx="38" cy="62" r="3" fill={molColor} />
      <circle cx="58" cy="62" r="3" fill={molColor} />
      {/* Connections */}
      <line x1="47" y1="34" x2="33" y2="43" stroke={molColor} strokeWidth="2" strokeLinecap="round" />
      <line x1="47" y1="34" x2="62" y2="41" stroke={molColor} strokeWidth="2" strokeLinecap="round" />
      <line x1="33" y1="49.5" x2="38" y2="59" stroke={molColor} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="62" y1="47.5" x2="58" y2="59" stroke={molColor} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="38" y1="62" x2="58" y2="62" stroke={molColor} strokeWidth="1.5" strokeLinecap="round" />

      {/* "Regulator." */}
      <text
        x="98"
        y="72"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize="56"
        fill={regColor}
        letterSpacing="-1.5"
      >
        Regulator.
      </text>
      {/* "IA" */}
      <text
        x="375"
        y="72"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize="56"
        fill={iaColor}
        letterSpacing="-1.5"
      >
        IA
      </text>
    </svg>
  );
};
