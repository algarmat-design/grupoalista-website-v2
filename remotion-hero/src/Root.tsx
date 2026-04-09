import { Composition } from "remotion";
import { HeroBackground } from "./HeroBackground";

export const RemotionRoot = () => {
  return (
    <Composition
      id="HeroBackground"
      component={HeroBackground}
      durationInFrames={600}
      fps={30}
      width={1440}
      height={900}
    />
  );
};
