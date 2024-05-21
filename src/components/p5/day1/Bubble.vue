<script setup>
const sketch = (p5) => {
  const BUBBLE_MAP = new Map();
  const FRAGMENTS_MAP = new Map();

  const MAX_RADIUS = 100;
  const MIN_RADIUS = 30;
  const BUBBLE_SPEED = 4;
  const BUBBLE_ACCELERATION = 0.3;
  const BUBBLE_SPAWN_CHANCE = 0.06;

  // ####################      Bubbles     #######################################

  class Bubble {
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

    static onClick(mouseX, mouseY) {
      for (const circle of BUBBLE_MAP.values()) {
        if (circle.isInside(mouseX, mouseY)) {
          Fragment.spawn(circle.x, circle.y, p5.random(10, 40));
          circle.pop();
        }
      }
    }

    static tryGenerateBubble() {
      if (p5.random() <= BUBBLE_SPAWN_CHANCE) {
        new Bubble();
      }
    }

    constructor() {
      this.radius = p5.random(MIN_RADIUS, MAX_RADIUS);
      this.x = p5.random(0, p5.width);
      this.y = p5.height + this.radius;

      this.r = p5.random(255);
      this.g = p5.random(255);
      this.b = p5.random(255);

      this.vX = 0;
      this.vY = BUBBLE_SPEED;

      this.id = Bubble.generateId();
      BUBBLE_MAP.set(this.id, this);
    }

    draw() {
      p5.fill(this.r, this.g, this.b);
      p5.strokeWeight(0);
      p5.circle(this.x, this.y, this.radius);
    }

    isInside(x, y) {
      return p5.dist(x, y, this.x, this.y) <= this.radius;
    }

    update() {
      this.vX += p5.random(-BUBBLE_ACCELERATION, BUBBLE_ACCELERATION);

      if (this.vX > BUBBLE_SPEED) {
        this.vX = BUBBLE_SPEED;
      }
      if (-this.vX > BUBBLE_SPEED) {
        this.vX = -BUBBLE_SPEED;
      }

      this.x += this.vX;
      this.y -= this.vY;
      if (this.isOffscreen()) {
        this.pop();
      }
    }

    pop = function () {
      BUBBLE_MAP.delete(this.id);
    };

    isOffscreen() {
      return this.y + this.radius < 0;
    }
  }

  // ####################      Fragments     #######################################

  class Fragment {
    static gravity = 0.4
    static starting_velocity = 12;
    static drag = 0.99

    static generateId() {
      let newID = 0;
      while (FRAGMENTS_MAP.has(newID)) {
        newID++;
      }
      return newID;
    }

    static spawn(x, y, n = 1) {
      for (let i = 0; i < n; i++) {
        new Fragment(x, y);
      }
    }

    static updateAllFragments() {
      for (const fragment of FRAGMENTS_MAP.values()) {
        fragment.update();
        fragment.draw();
      }
    }

    constructor(x, y) {
      this.radius = p5.random(3, 8);
      this.x = x;
      this.y = y;

      this.r = p5.random(255);
      this.g = p5.random(255);
      this.b = p5.random(255);

      this.vX = p5.random(-Fragment.starting_velocity, Fragment.starting_velocity);
      this.vY = p5.random(-Fragment.starting_velocity, Fragment.starting_velocity);

      this.id = Fragment.generateId();
      FRAGMENTS_MAP.set(this.id, this);
    }

    update() {
      this.vX *= Fragment.drag
      this.vY += Fragment.gravity
      this.vY *= Fragment.drag
      // if (this.vX > BUBBLE_SPEED) {
      //   this.vX = BUBBLE_SPEED;
      // }
      // if (-this.vX > BUBBLE_SPEED) {
      //   this.vX = -BUBBLE_SPEED;
      // }

      this.x += this.vX;
      this.y += this.vY;
      if (this.isOffscreen()) {
        this.pop();
      }
    }

    pop() {
      FRAGMENTS_MAP.delete(this.id);
    }

    isOffscreen() {
      return this.y - this.radius > p5.height;
    }

    draw() {
      p5.fill(this.r, this.g, this.b, this.alpha);
      p5.strokeWeight(0);
      p5.circle(this.x, this.y, this.radius);
    }
  }

  // ####################      P5 Functions     #######################################

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(0, 0, 0);
  };

  p5.draw = () => {
    p5.frameRate(60);
    p5.background(0);

    Bubble.tryGenerateBubble();
    Bubble.updateAllBubbles();
    Fragment.updateAllFragments();
  };

  p5.mousePressed = () => {
    Bubble.onClick(p5.mouseX, p5.mouseY);
  };
};
</script>

<template>
  <P5 :sketch="sketch" class="" style="height: 100%" />
</template>

<style></style>
