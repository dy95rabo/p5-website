//Global variables
<script setup>
const sketch = (p5) => {

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
    static defaultNode(){
      return new Color(127,127,127)
    }
    static defaultLightning(){
      return new Color(125,249,255)
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

  // ####################      NODE     #######################################
  class Node {
    constructor(x, y, parent ,color = null) {
      this.x = x;
      this.y = y;
      this.parent = parent;
      this.children = [];
      this.color = color? color: Color.defaultNode()
    }

    addChild(node){
      this.children.push(node)
    }

    // static createRandom() {
    //   return new Node(p5.random(p5.width), p5.random(p5.height));
    // }

    // calcDist(point) {
    //   return p5.dist(this.x, this.y, point.x, point.y);
    // }

    draw() {
      p5.push();
      this.color.setStroke()
      p5.strokeWeight(POINT_SIZE);
      p5.point(this.x, this.y);
      p5.pop();
    }

    drawLine(node) {
      p5.push();
      Color.defaultLightning().setStroke();
      p5.strokeWeight(2);
      p5.line(this.x, this.y, node.x, node.y);
      p5.pop();
    }

    // calcWallDist() {
    //   let minX = p5.min(this.x, p5.width - this.x);
    //   let minY = p5.min(this.y, p5.height - this.y);

    //   return p5.min(minX, minY);
    // }

    // static drawAll() {
    //   POINT_ARR.forEach((p) => {
    //     p.draw();
    //   });
    // }
    /**
      calculates the minimal distance to all other circles and walls
       * @returns minimal distance
       *  
       * */
    // calcMinDistance() {
    //   let minDist = this.calcWallDist();
    //   for (const c of CIRCLE_ARR) {
    //     let dist = c.calcDist(this);
    //     if (dist < minDist) {
    //       minDist = dist;
    //     }
    //   }
    //   return minDist;
    // }
  }
  p5.preload = () => {};

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(127, 127, 127);


  };

  p5.draw = () => {};

  p5.mousePressed = () => {};

  p5.mouseWheel = (event) => {
    if(event.delta>0){

    }else{

    }
  };
};
</script>

<template>
  <P5 :sketch="sketch" />
</template>
