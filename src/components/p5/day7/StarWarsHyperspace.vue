//Global variables
<script setup>
import { onBeforeUnmount, ref } from "vue";
import PopUpCard from "@/components/PopUpCard.vue";
const showHelp = ref(false);
let p5Instance = null;
const sketch = (p5) => {
  p5Instance = p5;

  class Star {
    static acceleration = -50;
    static maxSpeed = 350;
    static minSpeed = 10
    static speed = Star.minSpeed;
    static numberOfStars = 400;
    static maxZ = 800;
    static maxRadius = 25;
    static stars = [];

    static colors = [
        p5.color(255, 210, 125),
        p5.color(255, 163, 113),
        p5.color(255, 250, 134),
        p5.color(166, 168, 255),
        p5.color(168, 123, 255),
        p5.color(74, 107, 144),
        p5.color(143, 197, 193),
        p5.color(230, 255, 237),
        p5.color(150, 112, 152),
        p5.color(255, 215, 215),
        p5.color(0, 7, 74),
        p5.color(0, 41, 140),
        p5.color(54, 100, 255),
        p5.color(255,234,172),
      ]

    draw() {
      p5.fill(this.color);
      // I don't really understand this part of the code, but it seams to work
      let currX = p5.map(this.startingX / this.z, 0, 1, 0, p5.width/2);
      let currY = p5.map(this.startingY / this.z, 0, 1, 0, p5.height/2);
      p5.circle(currX, currY, this.calcRadius() * 2);
    }

    calcRadius() {
      return p5.map(this.z, 0, Star.maxZ, Star.maxRadius, 0);
    }

    randomPos() {
      this.startingX = p5.random(-p5.width / 2, p5.width / 2);
      this.startingY = p5.random(-p5.height / 2, p5.height / 2);
    }

    update() {
      this.z -= Star.speed *p5.deltaTime/1000;
      if (this.z <= 0) {
        this.z = Star.maxZ;
        this.randomPos();
      }
    }

    static crateRandomStarColor() {
      return p5.random(Star.colors);
    }

    static draw() {
      p5.push();
      p5.translate(p5.width / 2, p5.height / 2);
      p5.noStroke();
      Star.stars.forEach((it) => {
        it.draw();
      });
      p5.pop();
    }

    static update() {
      Star.speed = p5.constrain(
        Star.speed + (Star.acceleration * p5.deltaTime) / 1000,
        Star.minSpeed,
        Star.maxSpeed
      );
      Star.stars.forEach((it) => {
        it.update();
      });
    }

    static init() {
      Star.stars = new Array(Star.numberOfStars).fill(0).map((i) => new Star());
    }

    constructor() {
      this.startingX;
      this.startingY;
      this.randomPos();

      this.z = p5.random(0, Star.maxZ);

      this.color = Star.crateRandomStarColor();
    }
  }

  p5.preload = () => {};

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(0);
    p5.frameRate(60);
    Star.init();
  };

  p5.draw = () => {
    let alpha = p5.map(Star.speed, Star.minSpeed, Star.maxSpeed,255,35)
    p5.background(0,0,0,alpha);
    Star.update();
    Star.draw();
  };

  function isInCanvas(x, y) {
    return 0<=x && x<= p5.width && 0<=y && y<= p5.height
  }
  p5.mousePressed = () => {
    if(!isInCanvas(p5.mouseX, p5.mouseY)){
      return;
    }
    Star.acceleration *= -1;
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

