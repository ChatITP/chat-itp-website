"use client";
import { NextReactP5Wrapper } from "@p5-wrapper/next";

const sketch = (p5) => {
  var stepSize = 20;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.noLoop(); 
  };

  p5.draw = () => {
    var cols = p5.windowWidth / stepSize;
    var rows = p5.windowHeight / stepSize;
    p5.background(77,77,78);

    p5.fill(255);
    p5.noStroke();

    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        p5.ellipse(i * stepSize, j * stepSize, 1); 
      }
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    p5.redraw(); 
  };
};

export default function Ring() {
  return (
    <div id="p5-background" className="">
      <NextReactP5Wrapper sketch={sketch} />
    </div>
  );
}
