"use client";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
const sketch = (p5) => {
  var circles = [];
  var circleNum = 8;
  var initialRadius = 5;
  var noiseOffsets = [];
  let x, y;

  class Circle {
    constructor(x, y, d) {
      this.x = x;
      this.y = y;
      this.d = d;
    }

    show() {
      p5.noFill();
      p5.stroke(200);
      p5.ellipse(this.x, this.y, this.d);
    }

    update(noiseFactor) {
      this.d = initialRadius + p5.noise(noiseFactor) * 400;
    }
  }

  p5.setup = () => {
    let cvn = p5.createCanvas(800, 1000);
    cvn.parent("p5-container");
    let w = document.body.scrollWidth - 1;
    let h = Math.max(p5.windowHeight, 640);
    p5.resizeCanvas(w, h);
    p5.background(0);
    x = 330;
    y = 400;

    for (var i = 0; i < circleNum; i++) {
      let radius = initialRadius + i * 20;
      let noiseOffset = p5.random(1000);
      noiseOffsets.push(noiseOffset);
      circles[i] = new Circle(x, y, radius);
    }
  };

  p5.draw = () => {
    p5.background(0);
    p5.fill(255);
    p5.ellipse(x, y, 10);

    for (var i = 0; i < circleNum; i++) {
      circles[i].update(noiseOffsets[i]);
      circles[i].show();
      noiseOffsets[i] += 0.01;
    }
  };
};

export default function Ring() {
  return (
    <div id="p5-container" className="">
      <NextReactP5Wrapper sketch={sketch} />
    </div>
  );
}
