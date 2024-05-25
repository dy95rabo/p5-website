//Global variables
<script setup>
import { onBeforeUnmount } from "vue";
let p5Instance = null;
const sketch = (p5) => {
  p5Instance = p5;
  class Particle {
    static size = 4;

    constructor(iX, iY, grid = null) {
      this.grid;
      this.iX = iX;
      this.iY = iY;
      this.value = 0;
      this.velocity = 2;
    }

    addGrid(grid) {
      this.grid = grid;
    }

    draw() {
      if (this.value > 0) {
        p5.fill(this.value, 100, 100);
        p5.noStroke();
        p5.rect(
          this.iX * Particle.size,
          this.iY * Particle.size,
          Particle.size,
          Particle.size
        );
      }
    }

    updateWithGravity() {
      if (this.value == 0) return;
      let falling = false;
      for (let i = this.velocity; i > 0; i--) {
        if (this.iY + i >= this.grid.length) continue;
        let cellBelow = this.grid[this.iY + i][this.iX];
        if (cellBelow.value === 0) {
          cellBelow.value = this.value;
          this.value = 0;
          falling = true;
          break;
        }
      }
      if (falling) {
        this.velocity++;
      } else {
        this.velocity = 0;
        let rowBelow = this.grid[this.iY + 1];
        let random = p5.random([-1, 1]);
        let belowSide1 = rowBelow[this.iX + random];
        let belowSide2 = rowBelow[this.iX - random];
        if (belowSide1 && belowSide1.value === 0) {
          belowSide1.value = this.value;
          this.value = 0;
        } else if (belowSide2 && belowSide2.value === 0) {
          belowSide2.value = this.value;
          this.value = 0;
        }
      }
    }
    updateWithoutGravity() {
      if (this.value == 0) return;
      let rowBelow = this.grid[this.iY + 1];
      let cellBelow = rowBelow[this.iX];
      if (cellBelow.value === 0) {
        cellBelow.value = this.value;
        this.value = 0;
      } else {
        let random = p5.random([-1, 1]);
        let belowSide1 = rowBelow[this.iX + random];
        let belowSide2 = rowBelow[this.iX - random];
        if (belowSide1 && belowSide1.value === 0) {
          belowSide1.value = this.value;
          this.value = 0;
        } else if (belowSide2 && belowSide2.value === 0) {
          belowSide2.value = this.value;
          this.value = 0;
        }
      }
    }
  }

  // ####################      BoardManager     #######################################
  class BoardManager {
    constructor() {
      this.canvasColor = p5.color(51);
      this.backgroundColor = p5.color(0);
      let numberOfSquaresInX = Math.floor(p5.width / Particle.size) - 1;
      let numberOfSquaresInY = Math.floor(p5.height / Particle.size) - 1;
      this.xShift = (p5.width - numberOfSquaresInX * Particle.size) / 2;
      this.yShift = (p5.height - numberOfSquaresInY * Particle.size) / 2;
      this.grid = Array(numberOfSquaresInY)
        .fill(0)
        .map((y, iY) =>
          Array(numberOfSquaresInX)
            .fill(0)
            .map((it, iX) => new Particle(iX, iY))
        );
      this.addGridToParticles()
      this.currentColor = 1;
      this.width = numberOfSquaresInX * Particle.size;
      this.height = numberOfSquaresInY * Particle.size;
      this.fillPercentage = 0.05;
      this.fillArea = 5;
    }

    addGridToParticles(){
      this.grid.forEach((r) => r.forEach((p) => p.addGrid(this.grid)));
    }

    draw() {
      p5.push();
      p5.colorMode(p5.HSB);
      this.translate();
      p5.background(this.canvasColor);
      p5.fill(this.backgroundColor);
      p5.rect(0, 0, this.width, this.height);
      this.grid.forEach((row) =>
        row.forEach((particle) => {
          particle.draw();
        })
      );
      p5.pop();
    }

    resetBoard(){
      this.grid
        .forEach((r) =>
            r.forEach((c) => {c.value = 0; c.velocity = 1;})
        );
      this.addGridToParticles();
    }

    updateColor() {
      this.currentColor++;
      if (this.currentColor > 360) {
        this.currentColor = 1;
      }
    }
    translate() {
      p5.translate(this.xShift, this.yShift);
    }

    checkClicked() {
      let y = p5.mouseY - this.yShift;
      let x = p5.mouseX - this.xShift;
      let iY = Math.floor(y / Particle.size);
      let iX = Math.floor(x / Particle.size);
      if (!this.isInGrid(iX, iY)) return;
      this.insert(iX, iY);
    }

    insert(x, y) {
      for (let dy = -this.fillArea; dy <= this.fillArea; dy++) {
        for (let dx = -this.fillArea; dx <= this.fillArea; dx++) {
          let iX = x + dx;
          let iY = y + dy;
          if (
            this.isInGrid(iX, iY) &&
            p5.random() < this.fillPercentage &&
            this.grid[iY][iX].value == 0
          ) {
            this.grid[iY][iX].value = this.currentColor;
          }
        }
      }
    }

    update() {
      // ! why does forwards through the rows make the falling particles disappear
      // for (let y = 0; y < this.grid.length - 1; y++) {
      for (let y = this.grid.length - 2; y >= 0; y--) {
        this.grid[y].forEach((particle) => particle.updateWithGravity());
      }
    }

    toggle() {
      this.isRunning = !this.isRunning;
    }

    isInGrid(x, y) {
      return (
        0 <= y && y < this.grid.length && 0 <= x && x < this.grid[y].length
      );
    }
  }
  // ####################      P5-Functions     #######################################

  let boardManager;
  let mouseIsDown = false;
  p5.preload = () => {};

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(127, 127, 127);
    p5.frameRate(30);
    Particle.size = 4;
    boardManager = new BoardManager();
  };

  p5.draw = () => {
    if (mouseIsDown && isInCanvas(p5.mouseX, p5.mouseY)) {
      boardManager.checkClicked();
      boardManager.updateColor();
    }
    boardManager.update();
    boardManager.draw();
  };

  function isInCanvas(x, y) {
    return 0 <= x && x <= p5.width && 0 <= y && y <= p5.height;
  }
  // p5.mousePressed = () => {
  //   if(!isInCanvas(p5.mouseX, p5.mouseY)){
  //     return;
  //   }
  //   boardManager.checkClicked();
  // };
  p5.mouseDragged = () => {
    // if (!isInCanvas(p5.mouseX, p5.mouseY)) {
    //   return;
    // }
    // boardManager.checkClicked();
    // boardManager.updateColor();
  };

  p5.mouseReleased = () => {
    mouseIsDown = false;
  };

  p5.mousePressed= ()=>{
    mouseIsDown = true;
  }

  p5.mouseWheel = (event) => {
    if (event.delta > 0) {
    } else {
    }
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
        break;
      case 39: //Arrow Right
      case 68: //"d"
        break;
      case 37: //Arrow Right
      case 65: //"a"
        break;
      case 27: //"ESC"
      boardManager.resetBoard()

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
</script>

<template>
  <P5 :sketch="sketch" />
</template>
