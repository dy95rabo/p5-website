<script setup>
import { onBeforeUnmount } from 'vue';
let p5Instance = null;
const sketch = (p5) => {
  p5Instance = p5;
  // ####################      CONSTANTS     #######################################

  // ########################    COLOR     #####################################
  class Color {
    constructor(r, g, b) {
      this.r = r;
      this.g = g;
      this.b = b;
    }
    static white = new Color(255, 255, 255);
    static red = new Color(255, 0, 0);
    static green = new Color(0, 255, 0);
    static blue = new Color(0, 0, 255);
    static yellow = new Color(255, 255, 0);
    static cyan = new Color(0, 255, 255);
    static pink = new Color(255, 0, 255);
    static black = new Color(0, 0, 0);
    static gray = new Color(127, 127, 127);
    static brown = new Color(88, 57, 39);
    static leafGreen = new Color(58, 95, 11);

    static generateLeafColor() {
      return new Color(p5.random(43, 73), p5.random(80, 110), p5.random(1, 21));
    }

    static createRandom() {
      return new Color(p5.random(255), p5.random(255), p5.random(255));
    }
    static defaultNode() {
      return new Color(127, 127, 127);
    }
    static defaultLightning() {
      return new Color(125, 249, 255);
    }

    setBackground() {
      p5.background(this.r, this.g, this.b);
    }

    setStroke() {
      p5.stroke(this.r, this.g, this.b);
    }

    setFill() {
      p5.fill(this.r, this.g, this.b);
    }

    static resetStroke() {
      p5.stroke(0);
    }
    static resetFill() {
      p5.stroke(255, 255, 255);
    }
  }
  // ####################      functions     #######################################
  function branch(length, angle, relativeStartingHeight = 0) {
    let isLAstIteration = length < 10 / lengthFactor;
    if (isLAstIteration) {
      Color.generateLeafColor().setStroke();
    }
    if (length < 10) {
      return;
    }
    p5.push();
    p5.translate(0, (length * relativeStartingHeight) / lengthFactor);
    p5.rotate(angle);
    // p5.strokeWeight(Math.log(length))
    p5.strokeWeight(length * (isLAstIteration ? 0.3 : 0.1));
    p5.line(0, 0, 0, -length);
    p5.translate(0, -length);
    let nextLength = length * lengthFactor;
    branch(nextLength, p5.random(10, 60));
    branch(nextLength, -p5.random(10, 60));
    branch(nextLength, p5.random(10, 70), p5.random(0.4, 0.8));
    branch(nextLength, -p5.random(10, 70), p5.random(0.4, 0.8));
    p5.pop();
  }

  function createRandomTree() {
    // p5.clear();
    // p5.background(127, 127, 127);
    // p5.textAlign(p5.CENTER);
    // p5.textSize(60);
    // p5.text("generating...", p5.width*0.5, p5.height*0.5);
    p5.clear();
    p5.background(127, 127, 127);
    p5.angleMode(p5.DEGREES);
    let startingLength = p5.height * 0.3;
    p5.translate(p5.width * 0.5, p5.height * 0.9);
    Color.brown.setStroke();
    // p5.strokeWeight(Math.log(startingLength))
    p5.strokeWeight(startingLength * 0.1);
    p5.line(0, 0, 0, p5.height * 0.1);
    branch(startingLength, 0);
  }

  function isInCanvas(x, y) {
    return 0 <= x && x <= p5.width && 0 <= y && y <= p5.height;
  }

  // ####################      variables     #######################################
  let slider;
  let lengthFactor = 0.67;
  // ####################      P5 functions     #######################################
  p5.preload = () => {
  };
  
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    createRandomTree();
  };

  p5.draw = () => {};

  p5.mousePressed = () => {
    // console.log("Fractals -> clicked");

    if (isInCanvas(p5.mouseX, p5.mouseY)) {
      createRandomTree();
    }
  };

  p5.mouseWheel = (event) => {
    if (event.delta > 0) {
    } else {
    }
  };

  
};

onBeforeUnmount(() => {
  if (p5Instance) {
    p5Instance.remove();
  }
});
// p5 instance Cleanup on unmount component
onBeforeUnmount(() => {
  if (p5Instance) {
    p5Instance.remove();
  }
});
</script>

<template>
  <P5 :sketch="sketch" @wheel.prevent @touchmove.prevent @scroll.prevent/>
</template>
