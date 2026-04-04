import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface Point { x: number; y: number }

// Smooth bezier-interpolated mouse cursor
export const MouseCursor: React.FC<{
  keyframes: Array<{ frame: number; x: number; y: number }>;
  visible?: boolean;
}> = ({ keyframes, visible = true }) => {
  const frame = useCurrentFrame();

  if (!visible || keyframes.length < 2) return null;

  // Find surrounding keyframes
  let fromIdx = 0;
  for (let i = 0; i < keyframes.length - 1; i++) {
    if (frame >= keyframes[i].frame) fromIdx = i;
  }
  const from = keyframes[fromIdx];
  const to = keyframes[Math.min(fromIdx + 1, keyframes.length - 1)];

  const t = to.frame === from.frame ? 1 :
    interpolate(frame, [from.frame, to.frame], [0, 1], {
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  const x = from.x + (to.x - from.x) * t;
  const y = from.y + (to.y - from.y) * t;

  // Click pulse: briefly visible near keyframe endpoints
  const distToKeyframe = Math.min(
    Math.abs(frame - from.frame),
    Math.abs(frame - to.frame)
  );
  const clickScale = distToKeyframe < 8
    ? interpolate(distToKeyframe, [0, 8], [1.3, 1], { extrapolateRight: "clamp" })
    : 1;

  const opacity = interpolate(frame, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{
      position: "absolute",
      left: x,
      top: y,
      pointerEvents: "none",
      zIndex: 1000,
      transform: `translate(-4px, -2px) scale(${clickScale})`,
      transformOrigin: "top left",
      opacity,
      filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))",
    }}>
      <svg width="28" height="34" viewBox="0 0 28 34" fill="none">
        <path
          d="M4 2 L4 26 L10 20 L15 30 L18 28.5 L13 18.5 L22 18.5 Z"
          fill="white"
          stroke="#1B2A4A"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      {/* Click ring */}
      {distToKeyframe < 10 && (
        <div style={{
          position: "absolute",
          top: -8, left: -8,
          width: 24, height: 24,
          borderRadius: "50%",
          border: "2px solid rgba(90,173,45,0.7)",
          transform: `scale(${interpolate(distToKeyframe, [0, 10], [1.8, 0.8], { extrapolateRight: "clamp" })})`,
          opacity: interpolate(distToKeyframe, [0, 10], [0, 0.8], { extrapolateRight: "clamp" }),
        }} />
      )}
    </div>
  );
};
