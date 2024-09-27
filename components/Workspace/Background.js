"use client";
import { useRecoilValue } from "recoil";
import { backgroundPositionState } from "../../contexts/workspace";

export default function Background() {
  const backgroundPosition = useRecoilValue(backgroundPositionState);

  const stepSize = 20;
  const xOff = backgroundPosition.x % stepSize;
  const yOff = backgroundPosition.y % stepSize;

  return (
    // Repeating dotted grid background
    <div
      className="absolute -z-10 top-0 left-0 w-full h-full bg-gray2 bg"
      style={{
        backgroundImage: `radial-gradient(#b7b7b7 1px, transparent 1px)`,
        backgroundSize: `${stepSize}px ${stepSize}px`,
        backgroundPosition: `${xOff}px ${yOff}px`,
      }}
    ></div>
  );
}
