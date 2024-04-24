//Global variables
const CIRCLE_MAP = new Map(); 


const MAX_NUMBER_OF_CIRCLES = 300;
const MAX_CIRCLE_RADIUS = 150

const SPAWN_RATE = 5


function preload() {}

class Circle {

  static generateId() {
    let newID = 0;
    while (CIRCLE_MAP.has(newID)) {
      newID++;
    }
    return newID;
  }

  // static updateAllCircles() {
  //   for (const bubble of bubbleMap.values()) {
  //     bubble.update();
  //     bubble.draw();
  //   }
  // }

  // static checkClick(mouseX, mouseY) {
  //   for (const bubble of bubbleMap.values()) {
  //     if (bubble.isInside(mouseX, mouseY)) {
  //       bubble.pop();
  //     }
  //   }
  // }

  static tryGenerateCircle(){
    if (CIRCLE_MAP.size>=MAX_NUMBER_OF_CIRCLES) {
      return;
    }


    new Circle();
  }

  constructor() {

    this.x = x;
    this.y = y;
    this.rad = rad;

    
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);

    this.id = Circle.generateId();
    CIRCLE_MAP.set(this.id, this);
  }

  draw() {
    fill(this.r, this.g, this.b);
    strokeWeight(0);
    circle(this.x, this.y, this.rad);
  }

  isInside(x, y) {
    return dist(x,y,this.x,this.y)<=this.rad
  }

  update() {
    this.vX += random(-bubbleAcceleration, bubbleAcceleration);

    if (this.vX > bubbleSpeed) {
      this.vX = bubbleSpeed;
    }
    if (-this.vX > bubbleSpeed) {
      this.vX = -bubbleSpeed;
    }

    this.x += this.vX;
    this.y -= this.vY;
    if (this.isOffscreen()) {
      this.pop();
    }
  }

  pop() {
    CIRCLE_MAP.delete(this.id);
  }

  // isOffscreen() {
    // return this.y + this.rad < 0;
  // }
}

function setup() {
//   createCanvas(400, 400);
  createCanvas(windowWidth, windowHeight);

  background(255, 0, 0);


//   point(220,240);
//   line(0,0,400,400);
  
//   stroke("black")
//   strokeWeight(3)
  
//   triangle(10,200,30,400,50,60)
//   square(30,50,20)
//   rect(300,200,20,60,5)
//   circle(60,300,50)
//   strokeWeight(10);
//   background(0);
    frameRate(30)

  
}

function draw() {}
