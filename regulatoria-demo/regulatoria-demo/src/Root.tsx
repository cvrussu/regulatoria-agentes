import React from "react";
import { Composition } from "remotion";
import { RegulatoriaVideo } from "./RegulatoriaVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="RegulatoriaVideo"
      component={RegulatoriaVideo}
      durationInFrames={990}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
