// let r,g,b = 0;

const bubbleMap = new Map();

const maxRadius= 100
const minRadius = 30
const bubbleSpeed = -4
const bubbleAcceleration = 0.3
const xSpeedMax = 4
const bubbleSpawnChance = 0.06


class Bubble {


  static generateId() {
    let newID = 0;
    while (bubbleMap.has(newID)) {
      newID++;
    }
    return newID;
  }

  static updateAllBubbles() {
    for (const bubble of bubbleMap.values()) {
      bubble.update();
      bubble.draw();
    }
  }

  static checkClick(mouseX, mouseY) {
    for (const bubble of bubbleMap.values()) {
      if (bubble.isInside(mouseX, mouseY)) {
        bubble.pop();
      }
    }
  }

  static tryGenerateBubble(){
    if (random() <= bubbleSpawnChance) {
        new Bubble();
      }
  }

  constructor() {
    this.rad = random(minRadius, maxRadius);
    this.x = random(0, width);
    this.y = height + this.rad;

    this.r = random(255);
    this.g = random(255);
    this.b = random(255);

    this.vX = 0;
    this.vY = bubbleSpeed;

    this.id = Bubble.generateId();
    bubbleMap.set(this.id, this);
  }

  draw() {
    fill(this.r, this.g, this.b);
    strokeWeight(0);
    circle(this.x, this.y, this.rad);
  }

  isInside(x, y) {
    return (
      (x - this.x) * (x - this.x) + (y - this.y) * (y - this.y) <=
      this.rad * this.rad
    );
  }

  update() {
    this.vX += random(-bubbleAcceleration, bubbleAcceleration);

    if (this.vX > xSpeedMax) {
      this.vX = xSpeedMax;
    }
    if (-this.vX > xSpeedMax) {
      this.vX = -xSpeedMax;
    }

    this.x += this.vX;
    this.y += this.vY;
    if (this.isOffscreen()) {
      this.pop();
    }
  }

  pop() {
    bubbleMap.delete(this.id);
  }

  isOffscreen() {
    return this.y + this.rad < 0;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 0, 0);
}

function draw() {
  frameRate(60);
  background(0);

  Bubble.tryGenerateBubble()
  Bubble.updateAllBubbles();
}

function mousePressed() {
    Bubble.checkClick(mouseX, mouseY);
}
