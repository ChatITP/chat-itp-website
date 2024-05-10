"use client";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { motion } from "framer-motion";

const sketch = (p5) => {
  class Ring {
    constructor(x, y, r) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.noiseT = p5.random(100);
      this.vertices = [];
      this.createVertices();
    }

    createVertices() {
      for (let i = 0; i < Math.floor(this.r / 20); i++) {
        let angle = p5.map(i, 0, Math.floor(this.r / 20), 0, p5.TWO_PI);
        let x = this.x + this.r * p5.cos(angle);
        let y = this.y + this.r * p5.sin(angle);
        this.vertices.push({ x: x, y: y });
      }
    }

    update() {}

    display() {
      p5.noStroke();
      p5.fill(255, 30);
      p5.beginShape();
      for (let i = 0; i < this.vertices.length; i++) {
        let x = this.vertices[i].x + p5.noise(i, this.noiseT) * this.r * 0.5 - this.r * 0.25;
        let y = this.vertices[i].y + p5.noise(i * 4, this.noiseT) * this.r * 0.5 - this.r * 0.25;
        p5.vertex(x, y);
        this.noiseT += 0.0001;
      }
      p5.endShape();
    }

    resize(x, y, r) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.vertices = [];
      this.createVertices();
    }
  }

  let rings = [];

  p5.setup = () => {
    let cvn = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    cvn.parent("p5-container");
    let w = document.body.scrollWidth - 1;
    let h = p5.windowHeight;
    p5.resizeCanvas(w, h);
    p5.background(0);
    for (let i = 0; i < 4; i++) {
      rings.push(new Ring(p5.width / 3, p5.height / 2, (i + 1) * (p5.height / 8)));
    }
  };

  p5.draw = () => {
    p5.background(0);

    for (let i = 0; i < rings.length; i++) {
      rings[i].display();
    }
  };

  p5.windowResized = () => {
    let w = document.body.scrollWidth - 1;
    let h = p5.windowHeight;
    p5.resizeCanvas(w, h);
    for (let i = 0; i < 4; i++) {
      try {
        rings[i].resize(p5.width / 3, p5.height / 2, (i + 1) * (p5.height / 8));
      } catch (e) {}
    }
  };
};

export default function Background() {
  return (
    <motion.div
      id="p5-container"
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <NextReactP5Wrapper sketch={sketch} />
    </motion.div>
  );
}
