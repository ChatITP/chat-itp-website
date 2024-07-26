"use client";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { useState, useEffect } from "react";

const sketch = (p5) => {
  var circles = [];
  var circleNum = 10;
  var initialRadius = 30;
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

    update(noiseFactor) {}
  }

  p5.setup = () => {
    let w = document.body.clientWidth - 1;
    let h = Math.max(p5.windowHeight * 2, 640 * 2);
    let cvn = p5.createCanvas(w, h);
    cvn.parent("p5-container");
    x = 300;
    y = p5.windowHeight / 2 + 100;
    console.log(p5.windowHeight);

    for (var i = 0; i < circleNum; i++) {
      let radius = initialRadius + i * 90;
      circles[i] = new Circle(x, y, radius);
    }
  };

  p5.draw = () => {
    p5.clear();
    p5.fill(255);
    p5.ellipse(x, y, 10);

    for (var i = 0; i < circleNum; i++) {
      circles[i].show();
    }
  };

  p5.windowResized = () => {
    let w = document.body.clientWidth - 1;
    let h = Math.max(p5.windowHeight * 2, 640 * 2);
    p5.resizeCanvas(w, h);
  };
};

export default function Ring() {
  return (
    <div id="p5-container" className="absolute top-[calc(100vh/2)]">
      <NextReactP5Wrapper sketch={sketch} />
    </div>
  );
}
