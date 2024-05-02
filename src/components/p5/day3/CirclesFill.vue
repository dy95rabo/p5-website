<script setup>
const sketch = (p5) => {
  const CIRCLE_ARR = [];
  const POINT_ARR = [];
  const POINT_SIZE = 15;
  const MIN_RADIUS = 20;
  const MAX_RADIUS = 200;

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

  // ###########################     CIRCLE     ###################################

  class Circle {
    constructor(center, radius, color = Color.createRandom()) {
      this.center = center;
      this.radius = radius;
      this.color = color;
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
      do {
        p = Point.createRandom();
        minDist = p.calcMinDistance();
      } while (minDist < MIN_RADIUS);

      CIRCLE_ARR.push(new Circle(p, p5.random(MIN_RADIUS, p5.min(minDist, MAX_RADIUS))));
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

  p5.setup=()=> {
    p5.createCanvas(windowWidth, windowHeight);
    p5.background(220);
    p5.frameRate(120);
  }

  // #########################     DRAW       #####################################
  p5. draw=()=> {
    Circle.tryToCreateNewCircle(150);
    Circle.drawAll();
  }
};
</script>

<template>
  <P5 :sketch="sketch" />
</template>
