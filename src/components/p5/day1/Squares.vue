<script setup>
import { onBeforeUnmount, ref } from "vue";
import PopUpCard from "@/components/PopUpCard.vue";
const showHelp = ref(false);
let p5Instance = null;
const sketch = (p5) => {
  p5Instance = p5;
  class Rectangle {
    constructor(options) {
      let x;
      let y;
      let centerX;
      let centerY;
      let w;
      let h;

      if (options.centerX && options.centerY && options.w && options.h) {
        centerX = options.centerX;
        centerY = options.centerY;
        w = options.w;
        h = options.h;
        x = centerX - w / 2;
        y = centerY - h / 2;
      } else if (options.x && options.y && options.w && options.h) {
        x = options.x;
        y = options.y;
        w = options.w;
        h = options.h;
        centerX = x + w / 2;
        centerY = y + h / 2;
      } else if (options.x && options.y && options.centerX && options.centerY) {
        x = options.x;
        y = options.y;
        centerX = options.centerX;
        centerY = options.centerY;
        w = 2 * (centerX - x);
        h = 2 * (centerY - y);
      } else {
        throw "Not valid options";
      }

      this.centerX = centerX;
      this.centerY = centerY;
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.xMax = x + w;
      this.yMax = y + h;
    }

    randomPointIn() {
      let randomX = p5.random(this.x, this.xMax);
      let randomY = p5.random(this.y, this.yMax);
      let point = [randomX, randomY];
      return point;
    }

    draw() {
      p5.push();
      p5.stroke("black");
      p5.strokeWeight(1);
      p5.fill(255, 255, 255, 0);
      p5.rect(this.x, this.y, this.w, this.h);
      p5.pop();
    }
  }

  // ####################      variables     #######################################

  let initialRect;
  let seed;
  let rectangles = [];

  // ####################      P5 Functions     #######################################


  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    initialRect = new Rectangle({
      centerX: p5.width / 2,
      centerY: p5.height / 2,
      w: p5.width / 8,
      h: p5.height / 8,
    });

    seed = p5.random(10000000);
    p5.randomSeed(seed);

    generateRect();
  };

  p5.draw = () => {
    p5.background(255);
    p5.push();

    //   Math.sqrt(Math.pow(Math.abs(mouseX-width/2)/width,2) + Math.pow(Math.abs(mouseY-height/2)/height,2))*10
    const translationFactor = -100;
    p5.translate(
      ((p5.mouseX - p5.width / 2) / p5.width) * translationFactor,
      ((p5.mouseY - p5.height / 2) / p5.height) * translationFactor
    );
    rectangles.forEach((r) => {
      r.draw();
    });

    p5.pop();
  };

  function generateRect() {
    let numOfSquares = p5.random(20, 40);
    rectangles = [];
    for (let square = 0; square < numOfSquares; square++) {
      let [rX, rY] = initialRect.randomPointIn();
      rectangles.push(
        new Rectangle({
          centerX: rX,
          centerY: rY,
          w: p5.random(p5.width / 5, p5.width * 0.9),
          h: p5.random(p5.height / 5, p5.height * 0.9),
        })
      );
    }
  }

  function isInCanvas(x, y) {
    return 0 <= x && x <= p5.width && 0 <= y && y <= p5.height;
  }
  
  p5.mousePressed = () => {
    showHelp.value = false
    if(!isInCanvas(p5.mouseX, p5.mouseY)){
      return;
    }
    // console.log("Squares -> clicked");

    seed = p5.random(10000000);
    generateRect();
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
  {
    keys: "'click'",
    function: "generate new set of random squares",
  },
  {
    keys: "'move mouse cursor'",
    function: "parallax effect",
  },
];
</script>

<template>
  <P5 style="overflow: hidden; height: 100dvh;" :sketch="sketch" @wheel.prevent @touchmove.prevent @scroll.prevent />
  <pop-up-card :show-pop-up="showHelp" :key-input="keyInput"></pop-up-card>
</template>

