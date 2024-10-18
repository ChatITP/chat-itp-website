"use client";
import { useRecoilValue } from "recoil";
import { viewportPositionState } from "../../contexts/workspace";

export default function Background() {
  const backgroundPosition = useRecoilValue(viewportPositionState);

  const vx = backgroundPosition.x;
  const vy = backgroundPosition.y;
  const scale = backgroundPosition.scale;

  const stepSize = 20 * scale;

  // Adjust the x and y offset calculation to handle large shifts
  const xOff = -(vx % stepSize);
  const yOff = -(vy % stepSize);
  const dotSize = 1 * scale;

  return (
    // Repeating dotted grid background
    <div
    // className="absolute -z-10 top-0 left-0 w-full h-full bg-gray2 bg"
    // style={
    //   scale > 0.5
    //     ? {
    //         backgroundImage: `radial-gradient(#b7b7b7 ${dotSize}px, transparent ${dotSize}px), radial-gradient(#b7b7b7 ${dotSize}px, transparent ${dotSize}px)`,
    //         backgroundSize: `${stepSize}px ${stepSize}px`,
    //         backgroundPosition: `${xOff}px ${yOff}px`,
    //       }
    //     : {}
    // }
    ></div>
  );
}
