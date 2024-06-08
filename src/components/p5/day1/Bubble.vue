<script setup>
import { onBeforeUnmount, ref } from "vue";
import PopUpCard from "@/components/PopUpCard.vue";
import { Vector } from "p5";
const showHelp = ref(false);
let p5Instance = null;
const sketch = (p5) => {
  p5Instance = p5;
  const BUBBLE_MAP = new Map();
  const FRAGMENTS_MAP = new Map();

  function smoothDecay(value, decayConstant, deltaTimeMillis, offset = 0) {
    return (
      offset +
      (value - offset) * Math.exp((-decayConstant * deltaTimeMillis) / 1000)
    );
  }

  // ####################      Bubbles     #######################################

  class Bubble {
    static maxRadius = 60;
    static minRadius = 10;
    static maxSpeed = p5.createVector(400, -200);
    static acceleration = p5.createVector(500, 0);
    static spawnChance = 3;

    static generateId() {
      let newID = 0;
      while (BUBBLE_MAP.has(newID)) {
        newID++;
      }
      return newID;
    }

    static updateAllBubbles() {
      for (const bubble of BUBBLE_MAP.values()) {
        bubble.update();
        bubble.draw();
      }
    }

    static onClick(mousePos) {
      for (const circle of BUBBLE_MAP.values()) {
        if (circle.isInside(mousePos)) {
          Fragment.spawn(circle.pos, p5.random(10, circle.area / 15));
          circle.pop();
        }
      }
    }

    static tryGenerateBubble() {
      if (p5.random() <= (Bubble.spawnChance * p5.deltaTime) / 1000) {
        new Bubble();
      }
    }

    constructor() {
      this.radius = p5.random(Bubble.minRadius, Bubble.maxRadius);
      this.pos = p5.createVector(
        p5.random(0, p5.width),
        p5.height + this.radius
      );

      this.color = p5.color(p5.random(360),100,100)
      this.vel = Bubble.maxSpeed.copy().mult(p5.createVector(0, 1));
      this.area = this.radius * this.radius * Math.PI;

      this.id = Bubble.generateId();
      BUBBLE_MAP.set(this.id, this);
    }

    draw() {
      p5.fill(this.color);
      p5.noStroke();
      p5.circle(this.pos.x, this.pos.y, 2 * this.radius);
    }

    isInside(mousePos) {
      return this.pos.dist(mousePos) <= this.radius;
    }

    update() {
      this.vel.add(
        Bubble.acceleration
          .copy()
          .mult((p5.deltaTime / 1000) * p5.random([-1, 1]))
      );

      if (this.vel.x > Bubble.maxSpeed.x) {
        this.vel.x = Bubble.maxSpeed.x;
      }
      if (-this.vel.x > Bubble.maxSpeed.x) {
        this.vel.x = -Bubble.maxSpeed.x;
      }

      this.pos.add(this.vel.copy().mult(p5.deltaTime / 1000));
      if (this.isOffscreen()) {
        this.pop();
      }
    }

    pop = function () {
      BUBBLE_MAP.delete(this.id);
    };

    isOffscreen() {
      return this.pos.y + this.radius < 0;
    }
  }

  // ####################      Fragments     #######################################

  class Fragment {
    static gravity = p5.createVector(0, 1000);
    static maxStartingVelocity = 600;
    static drag = 0.8;
    static halfLifeSeconds = 0.75;
    static fadingLambda = Math.LN2 / Fragment.halfLifeSeconds;

    static generateId() {
      let newID = 0;
      while (FRAGMENTS_MAP.has(newID)) {
        newID++;
      }
      return newID;
    }

    static spawn(pos, n = 1) {
      for (let i = 0; i < n; i++) {
        new Fragment(pos);
      }
    }

    static updateAllFragments() {
      for (const fragment of FRAGMENTS_MAP.values()) {
        fragment.update();
        fragment.draw();
      }
    }

    constructor(pos) {
      this.radius = p5.random(3, 8);
      this.pos = pos.copy();
      this.color = p5.color(p5.random(360),100,100)
      // this.color = p5.color(
      //   p5.random(255),
      //   p5.random(255),
      //   p5.random(255),
      //   255
      // );
      // let angle = p5.random(Math.PI * 2);
      // this.vel = p5
      //   .createVector(Math.cos(angle), Math.sin(angle))
      //   .mult(p5.random(Fragment.maxStartingVelocity));

      this.vel=Vector.mult(Vector.random2D(),p5.random(Fragment.maxStartingVelocity));
      this.id = Fragment.generateId();
      FRAGMENTS_MAP.set(this.id, this);
    }

    update() {
      let g = Vector.mult(Fragment.gravity,p5.deltaTime / 1000)
      let d = 1 - (Fragment.drag * p5.deltaTime) / 1000
      this.vel.mult(d);

      // this.vel = Vector.add(this.vel,g)
      // this.vel.add(g);
      this.vel.x += g.x 
      this.vel.y += g.y 



      this.color.setAlpha(
        smoothDecay(this.color._getAlpha(), Fragment.fadingLambda, p5.deltaTime)
      );

      let dp = Vector.mult(this.vel,p5.deltaTime / 1000)
      // this.pos = Vector.add(this.pos, dp)
      // this.pos.add(dp);
      this.pos.x += dp.x
      this.pos.y += dp.y

      if (this.isOffscreen()) {
        this.pop();
      }
    }

    pop() {
      FRAGMENTS_MAP.delete(this.id);
    }

    isOffscreen() {
      return this.pos.y - this.radius > p5.height;
    }

    draw() {
      p5.fill(this.color);
      p5.noStroke();
      p5.circle(this.pos.x, this.pos.y, this.radius);
    }
  }

  // ####################      P5 Functions     #######################################

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(0);
    p5.colorMode(p5.HSB)
  };

  p5.draw = () => {
    p5.frameRate(60);
    p5.background(0);

    Bubble.tryGenerateBubble();
    Bubble.updateAllBubbles();
    Fragment.updateAllFragments();
  };

  p5.mousePressed = () => {
    showHelp.value = false
    Bubble.onClick(p5.createVector(p5.mouseX, p5.mouseY));
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
    keys: "'click' on bubble",
    function: "pop bubble and generate particles with physics simulation",
  },
];
</script>

<template>
  <P5 style="overflow: hidden; height: 100dvh;" :sketch="sketch" @wheel.prevent @touchmove.prevent @scroll.prevent />
  <pop-up-card :show-pop-up="showHelp" :key-input="keyInput"></pop-up-card>
</template>
