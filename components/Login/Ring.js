"use client";
import { NextReactP5Wrapper } from "@p5-wrapper/next";

const sketch = (p5) => {
  const diameters = [50, 140, 270, 320, 410, 500, 590, 680, 770, 860];
  const opacities = [150, 130, 230, 130, 110, 90, 70, 50, 30, 30];

  let circles = [];
  let x, y;

  //circle class
  class Circle {
    constructor(d, opacity) {
      this.d = d;
      this.opacity = opacity;
      this.xDrift = 0;
      this.yDrift = 0;
    }

    show() {
      p5.noFill();
      p5.stroke(255, this.opacity);
      p5.ellipse(x + this.xDrift, y + this.yDrift, this.d);
    }

    update() {
      let mouseX = p5.mouseX;
      let mouseY = p5.mouseY;
      let distance = p5.dist(x, y, mouseX, mouseY);
      let angle = p5.atan2(mouseY - y, mouseX - x);

      let maxDistance = p5.dist(0, 0, p5.width, p5.height);
      let targetX = p5.cos(angle) * p5.min(distance / maxDistance, 1) * (this.d / 4);
      let targetY = p5.sin(angle) * p5.min(distance / maxDistance, 1) * (this.d / 4);

      this.xDrift += (targetX - this.xDrift) * 0.05;
      this.yDrift += (targetY - this.yDrift) * 0.05;
    }
  }

  p5.setup = () => {
    let w = p5.windowWidth;
    let h = p5.windowHeight;
    let cvn = p5.createCanvas(w, h);
    cvn.parent("p5-container-login");
    // Find the center of the circles
    x = 298 + p5.max(0, w - 1440) / 2;
    y = h / 2 + 74;
    if (p5.windowWidth < 1024) x = w / 2;
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
      circles[i].update();
    }
  };

  p5.windowResized = () => {
    let w = p5.windowWidth;
    let h = p5.windowHeight;
    p5.resizeCanvas(w, h);
    x = 298 + p5.max(0, w - 1440) / 2;
    y = h / 2 + 74;
    if (p5.windowWidth < 1024) x = w / 2;
  };
};

export default function Ring() {
  return (
    <div id="p5-container-login" className="absolute top-0 left-0">
      <NextReactP5Wrapper sketch={sketch} />
    </div>
  );
}
