<script setup>
const sketch = (p5) => {
  const BUBBLE_MAP = new Map();

  const MAX_RADIUS = 100;
  const MIN_RADIUS = 30;
  const BUBBLE_SPEED = 4;
  const BUBBLE_ACCELERATION = 0.3;
  const BUBBLE_SPAWN_CHANCE = 0.06;

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

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(0, 0, 0);
  };

  p5.draw = () => {
    p5.frameRate(60);
    p5.background(0);

    Bubble.tryGenerateBubble();
    Bubble.updateAllBubbles();
  };

  p5.mousePressed = () => {
    Bubble.onClick(p5.mouseX, p5.mouseY);
  };
};
</script>

<template>
  <P5 :sketch="sketch" class="h-100 d-inline-block" />
</template>
