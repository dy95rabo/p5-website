<script setup>
import { onBeforeUnmount } from 'vue';
let p5Instance = null;
const sketch = (p5) => {
  p5Instance = p5;
  // ####################      CONSTANTS     #######################################
  const CIRCLE_ARR = [];
  const POINT_ARR = [];
  const POINT_SIZE = 15;
  const MIN_RADIUS = 1;
  const MAX_RADIUS = 300;
  const MAX_NUMBER_OF_TRIES_TO__GENERATE_A_NEW_CIRCLE = 5;
  const RANDOMIZE_RADIUS = false;
  let autogenerate = false;

  // ########################    COLOR     #####################################
  class Color {
    constructor(r, g, b) {
      this.r = r;
      this.g = g;
      this.b = b;
    }

    static createRandom() {
      return new Color(p5.random(255), p5.random(255), p5.random(255));
    }

    setBackground() {
      p5.background(this.r, this.g, this.b);
    }

    setStroke() {
      p5.stroke(this.r, this.g, this.b);
    }

    setFill() {
      p5.fill(this.r, this.g, this.b);
    }

    static resetStroke() {
      p5.stroke(0);
    }
    static resetFill() {
      p5.stroke(255, 255, 255);
    }
  }

  // ####################      POINT     #######################################
  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    static createRandom() {
      return new Point(p5.random(p5.width), p5.random(p5.height));
    }

    calcDist(point) {
      return p5.dist(this.x, this.y, point.x, point.y);
    }

    draw() {
      p5.push();
      Color.createRandom().setStroke();
      p5.strokeWeight(POINT_SIZE);
      p5.point(this.x, this.y);
      p5.pop();
    }

    drawLine(point) {
      p5.push();
      Color.createRandom().setStroke();
      p5.strokeWeight(2);
      p5.line(this.x, this.y, point.x, point.y);
      p5.pop();
    }

    calcWallDist() {
      let minX = p5.min(this.x, p5.width - this.x);
      let minY = p5.min(this.y, p5.height - this.y);

      return p5.min(minX, minY);
    }

    static drawAll() {
      POINT_ARR.forEach((p) => {
        p.draw();
      });
    }
    /**
      calculates the minimal distance to all other circles and walls
       * @returns minimal distance
       *  
       * */
    calcMinDistance() {
      let minDist = this.calcWallDist();
      for (const c of CIRCLE_ARR) {
        let dist = c.calcDist(this);
        if (dist < minDist) {
          minDist = dist;
        }
      }
      return minDist;
    }
  }

  // ###########################     CIRCLE     ###################################

  class Circle {
    constructor(center, radius, color = Color.createRandom()) {
      this.center = center;
      this.radius = radius;
      this.color = color;
    }

    static removeLast(n = 1) {
      for (let i = 0; i < n; i++) {
        CIRCLE_ARR.pop();
      }
    }

    static generate(n = 1) {
      for (let i = 0; i < n; i++) {
        Circle.tryToCreateNewCircle();
      }
    }

    draw() {
      p5.push();
      p5.strokeWeight(0);
      this.color.setFill();
      p5.circle(this.center.x, this.center.y, this.radius * 2);
      p5.pop();
    }

    static createRandom() {
      let centerPoint = Point.createRandom();
      let distanceToWall = centerPoint.calcWallDist();
      return new Circle(centerPoint, p5.random(distanceToWall));
    }

    static drawAll() {
      CIRCLE_ARR.forEach((c) => {
        c.draw();
      });
    }

    static tryToCreateNewCircle(maxNumberOfCircles = Number.MAX_SAFE_INTEGER) {
      if (CIRCLE_ARR.length >= maxNumberOfCircles) {
        return;
      }
      let p;
      let minDist;
      let numberOfTries = 0;
      do {
        if(numberOfTries >= MAX_NUMBER_OF_TRIES_TO__GENERATE_A_NEW_CIRCLE){
          return
        }
        p = Point.createRandom();
        minDist = p.calcMinDistance();
        numberOfTries++;
      } while (minDist < MIN_RADIUS);

        CIRCLE_ARR.push(
          new Circle(p, RANDOMIZE_RADIUS?p5.random(MIN_RADIUS, p5.min(minDist, MAX_RADIUS)):minDist)
        );
    }

    calcDist(other) {
      if (other instanceof Point)
        return this.center.calcDist(other) - this.radius;
      if (other instanceof Circle)
        return this.center.calcDist(other.center) - this.radius - other.radius;
      return NaN;
    }

    checkForOverlappingCircles() {
      for (const c of CIRCLE_ARR) {
        let dist = this.calcDist(c);
        if (dist < 0) {
          return true;
        }
      }
      return false;
    }
  }

  // #######################       SETUP      ################################
  const BACKGROUND_COLOR = new Color(100, 100, 100);
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    BACKGROUND_COLOR.setBackground();
    p5.frameRate(120);
  };

  // #########################     DRAW       #####################################
  p5.draw = () => {
    if (autogenerate) {
      Circle.tryToCreateNewCircle(600);
      Circle.drawAll();
    }
    if(CIRCLE_ARR.length<=0){
      let x = p5.width/2;
      let y = p5.height/2
      p5.push();
      p5.fill(200)
      p5.rectMode(p5.CENTER)
      p5.rect(x,y,x,y)
      p5.pop()
      //Text
      let textSize = Math.min(p5.width,p5.height)>1000?50:25
      p5.push();
      p5.textSize(textSize);
      p5.textAlign(p5.CENTER)
      p5.text("Scroll up and down \n and see what happens",x,y );
      p5.pop();
    }
  };

  // #########################     MOUSE PRESSED       #####################################
  p5.mousePressed = () => {
    console.log("Circles -> clicked");

    // autogenerate = !autogenerate;
  };

  // #########################     MOUSE WHEEL       #####################################
  p5.mouseWheel = (event) => {
    if (!autogenerate) {
      p5.clear();
      BACKGROUND_COLOR.setBackground();
      if (event.delta > 0) {
        Circle.generate(5);
      } else {
        Circle.removeLast(5);
      }
      Circle.drawAll();
    }
  };
};

// p5 instance Cleanup on unmount component
onBeforeUnmount(() => {
  if (p5Instance) {
    p5Instance.remove();
  }
});
</script>

<template>
  <P5 :sketch="sketch" />
</template>
