//Global variables
<script setup>
import { onBeforeUnmount, ref } from "vue";
import PopUpCard from "@/components/PopUpCard.vue";
const showHelp = ref(false);
let p5Instance = null;
const sketch = (p5) => {
  p5Instance = p5;

  const AMOUNT_OF_POINTS = 5;
  const STEP_SIZE = 2;
  const INIT_RADIUS = 150;
  const MOUSE_ATTRACTION = 0.02;
  const ANGEL_SPACING = (2 * Math.PI) / AMOUNT_OF_POINTS;
  let centerX;
  let centerY;
  const X = [];
  const Y = [];

  function isInCanvas(x, y) {
    return 0 <= x && x <= p5.width && 0 <= y && y <= p5.height;
  }
  
  p5.preload = () => {};

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    // p5.frameRate(10);
    p5.background(255);
    centerX = p5.width;
    centerY = p5.height;
    for (let i = 0; i < AMOUNT_OF_POINTS; i++) {
      X.push(Math.cos(ANGEL_SPACING * i) * INIT_RADIUS);
      Y.push(Math.sin(ANGEL_SPACING * i) * INIT_RADIUS);
    }

    p5.stroke(0, 75);
    p5.strokeWeight(0.5);
    p5.noFill();
  };

  p5.draw = () => {
    centerX += (p5.mouseX - centerX) * MOUSE_ATTRACTION;
    centerY += (p5.mouseY - centerY) * MOUSE_ATTRACTION;

    // for (let i = 0; i < AMOUNT_OF_POINTS; i++) {
    //   X[i] += p5.random(-STEP_SIZE, STEP_SIZE);
    //   Y[i] += p5.random(-STEP_SIZE, STEP_SIZE);
    //   p5.circle(X[i] + centerX, Y[i] + centerY, 5);
    // }
    p5.push();
    p5.translate(centerX, centerY);
    p5.beginShape();

    p5.curveVertex(X[0], Y[0]);

    for (let i = 0; i < AMOUNT_OF_POINTS; i++) {
      p5.curveVertex(X[i], Y[i]);
    }

    p5.curveVertex(X[0], Y[0]);

    p5.curveVertex(X[AMOUNT_OF_POINTS - 1], Y[AMOUNT_OF_POINTS - 1]);

    // p5.endShape(p5.CLOSE);
    p5.endShape();
    p5.pop();
    // p5.line(p5.mouseX,p5.mouseY,p5.width*0.5,p5.height*0.5)
  };

  p5.mousePressed = () => {
    if (!isInCanvas(p5.mouseX, p5.mouseY)) {
      return;
    }
    p5.clear();
    p5.background(255);
  };

  p5.mouseWheel = (event) => {
    if (event.delta > 0) {
    } else {
    }
  };
  p5.keyPressed = (event) => {
    switch (event.keyCode) {
      case 13: //Enter
      case 32: //Space Bar
        break;
      case 38: //Arrow up
      case 87: //"w"
        break;
      case 40: //Arrow down
      case 83: //"s"
        break;
      case 82: //"r"
        break;
      case 72: //"h"
        showHelp.value = !showHelp.value;
        break;
      case 39: //Arrow Right
      case 68: //"d"
        break;
      case 37: //Arrow Right
      case 65: //"a"
        break;
      case 27: //"ESC"
        break;
      default:
        break;
    }
  };
};

// p5 instance Cleanup on unmount component
onBeforeUnmount(() => {
  if (p5Instance) {
    p5Instance.remove();
  }
});
const keyInput = [
  {
    keys: "'h'",
    function: "show/hide help",
  },
];
</script>

<template>
  <P5 style="overflow: hidden; height: 100dvh;" :sketch="sketch" @wheel.prevent @touchmove.prevent @scroll.prevent />
  <pop-up-card :show-pop-up="showHelp" :key-input="keyInput"></pop-up-card>
</template>

