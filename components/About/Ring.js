"use client";
import { NextReactP5Wrapper } from "@p5-wrapper/next";

const sketch = (p5) => {
  const diameters = [50, 140, 270, 320, 410, 500, 590, 680, 770, 860];
  const opacities = [150, 130, 230, 130, 110, 90, 70, 50, 30, 30];

  let circles = [];
  let x, y;

  class Circle {
    constructor(d, opacity) {
      this.d = d;
      this.opacity = opacity;
    }

    show() {
      p5.noFill();
      p5.stroke(255, this.opacity);
      p5.ellipse(x, y, this.d);
    }

    update(noiseFactor) {}
  }

  p5.setup = () => {
    let w = document.body.clientWidth - 1;
    let h = Math.max(p5.windowHeight, 640) * 2;
    let cvn = p5.createCanvas(w, h);
    cvn.parent("p5-container");
    // Find the center of the circles
    x = 301 + p5.max(0, w - 1440) / 2;
    y = h / 2 + 100;
    // initalize the circles
    for (var i = 0; i < diameters.length; i++) {
      circles[i] = new Circle(diameters[i], opacities[i]);
    }
  };

  p5.draw = () => {
    p5.clear();
    // center circle with blur
    for (let i = 0; i < 10; i++) {
      p5.fill(255, p5.max(255 - i * 30, 0));
      p5.circle(x, y, 10 + i);
    }

    for (var i = 0; i < diameters.length; i++) {
      circles[i].show();
    }
  };

  p5.windowResized = () => {
    let w = document.body.clientWidth - 1;
    let h = Math.max(p5.windowHeight, 640) * 2;
    x = 300 + p5.max(0, w - 1440) / 2;
    y = h / 2 + 100;
  };
};

export default function Ring() {
  return (
    <div id="p5-container" className="absolute top-0 left-0">
      <NextReactP5Wrapper sketch={sketch} />
    </div>
  );
}
