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
    let randomX = random(this.x, this.xMax);
    let randomY = random(this.y, this.yMax);
    let point = [randomX, randomY];
    return point;
  }

  draw() {
    stroke("black");
    strokeWeight(1);
    fill(255, 255, 255, 0);
    rect(this.x, this.y, this.w, this.h);
  }
}

let initialRect;
let seed;
let rectangles = [];

function setup() {
  // createCanvas(800, 800);
  createCanvas(windowWidth, windowHeight);
  initialRect = new Rectangle({
    centerX: width / 2,
    centerY: height / 2,
    w: width / 8,
    h: height / 8,
  });

  seed = random(10000000);
  randomSeed(seed);

  generateRect();
}

function draw() {
  background(255);
  push();

//   Math.sqrt(Math.pow(Math.abs(mouseX-width/2)/width,2) + Math.pow(Math.abs(mouseY-height/2)/height,2))*10
const translationFactor = -100;
  translate((mouseX-width/2)/width*translationFactor,(mouseY-height/2)/height*translationFactor)
  rectangles.forEach((r) => {
    r.draw();
  });

  pop();
}

function generateRect() {
  let numOfSquares = random(20, 40);
  rectangles = [];
  for (let square = 0; square < numOfSquares; square++) {
    let [rX, rY] = initialRect.randomPointIn();
    rectangles.push(
      new Rectangle({
        centerX: rX,
        centerY: rY,
        w: random(width / 5, width * 0.9),
        h: random(height / 5, height * 0.9),
      })
    );
  }
}

function mousePressed() {
  seed = random(10000000);
  generateRect()
}
