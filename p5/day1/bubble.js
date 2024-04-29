// let r,g,b = 0;

const BUBBLE_MAP = new Map();

const MAX_RADIUS= 100
const MIN_RADIUS = 30
const BUBBLE_SPEED = 4
const BUBBLE_ACCELERATION = 0.3
// const xSpeedMax = 4
const BUBBLE_SPAWN_CHANCE = 0.06


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

  // static checkClick(mouseX, mouseY) {
    // for (const bubble of circleMap.values()) {
      // if (bubble.isInside(mouseX, mouseY)) {
        // bubble.pop();
      // }
    // }
    // 
  // }
  static onClick(mouseX, mouseY) {
    for (const circle of BUBBLE_MAP.values()) {
      if (circle.isInside(mouseX, mouseY)) {
        circle.pop();
      }
    }
  }

  static tryGenerateBubble(){
    if (random() <= BUBBLE_SPAWN_CHANCE) {
        new Bubble();
      }
  }

  constructor() {
    this.radius = random(MIN_RADIUS, MAX_RADIUS);
    this.x = random(0, width);
    this.y = height + this.radius;

    this.r = random(255);
    this.g = random(255);
    this.b = random(255);

    this.vX = 0;
    this.vY = BUBBLE_SPEED;

    this.id = Bubble.generateId();
    BUBBLE_MAP.set(this.id, this);
  }

  draw() {
    fill(this.r, this.g, this.b);
    strokeWeight(0);
    circle(this.x, this.y, this.radius);
  }

  isInside(x, y) {
    return dist(x,y,this.x,this.y)<=this.radius
  }

  update() {
    this.vX += random(-BUBBLE_ACCELERATION, BUBBLE_ACCELERATION);

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
  }

  isOffscreen() {
    return this.y + this.radius < 0;
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
    Bubble.onClick(mouseX, mouseY);
}
