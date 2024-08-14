"use client";
import { NextReactP5Wrapper } from "@p5-wrapper/next";

const sketch = (p5) => {
  p5.setup = () => {
    let w = document.getElementById("about").scrollWidth - 1;
    let h = Math.max(p5.windowHeight, 640);
    let cvn = p5.createCanvas(w, h);
    cvn.parent("p5-blob-container");
  };

  p5.draw = () => {
    p5.clear();
    p5.circle(p5.width / 2, p5.height / 2, 100);
  };

  p5.windowResized = () => {
    let w = document.getElementById("about").scrollWidth - 1;
    let h = Math.max(p5.windowHeight, 640);
    p5.resizeCanvas(w, h);
    x = 298 + p5.max(0, w - 1440) / 2;
    y = h / 2 + 74;
    if (p5.windowWidth < 1024) x = w / 2;
  };
};

export default function Blob() {
  return (
    <div id="p5-blob-container" className="absolute top-0 left-0">
      <NextReactP5Wrapper sketch={sketch} />
    </div>
  );
}
