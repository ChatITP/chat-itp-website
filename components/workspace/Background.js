"use client";
import { NextReactP5Wrapper } from "@p5-wrapper/next";

const sketch = (p5) => {
  let stepSize = 20;

  p5.setup = () => {
    let w = p5.windowWidth;
    let h = p5.windowHeight;
    let cnv = p5.createCanvas(w, h);
    cnv.parent("p5-workspace-background");
    p5.noLoop();
  };

  p5.draw = () => {
    var cols = p5.windowWidth / stepSize;
    var rows = p5.windowHeight / stepSize;
    p5.background(77, 77, 78);

    p5.fill(255);
    p5.noStroke();

    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        p5.ellipse(i * stepSize, j * stepSize, 1);
      }
    }
  };

  p5.windowResized = () => {
    let w = p5.windowWidth;
    let h = p5.windowHeight;
    p5.resizeCanvas(w, h);
    p5.redraw();
  };
};

export default function Background() {
  return (
    <div id="p5-workspace-background" className="absolute -z-10 top-0 left-0 w-full">
      <NextReactP5Wrapper sketch={sketch} />
    </div>
  );
}
