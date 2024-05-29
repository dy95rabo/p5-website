<script setup>
//https://www.google.com/search?client=firefox-b-d&q=game+of+life
import { onBeforeUnmount } from 'vue';
let p5Instance = null;
const sketch = (p5) => {
  p5Instance = p5;
  // ####################      Classes     #######################################
  // ####################        COLOR     #####################################
  class Color {
    constructor(r, g, b) {
      this.r = r;
      this.g = g;
      this.b = b;
    }

    static white = new Color(255, 255, 255);
    static red = new Color(255, 0, 0);
    static green = new Color(0, 255, 0);
    static blue = new Color(0, 0, 255);
    static yellow = new Color(255, 255, 0);
    static cyan = new Color(0, 255, 255);
    static pink = new Color(255, 0, 255);
    static black = new Color(0, 0, 0);
    static gray = new Color(127, 127, 127);

    static createRandom() {
      return new Color(p5.random(255), p5.random(255), p5.random(255));
    }

    static mix(colors) {
      let mixedColor = new Color(0, 0, 0);
      colors.forEach((c) => {
        mixedColor.r += c.r;
        mixedColor.g += c.g;
        mixedColor.b += c.b;
      });
      mixedColor.r /= colors.length;
      mixedColor.g /= colors.length;
      mixedColor.b /= colors.length;
      return mixedColor;
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
  // ####################        Square     #####################################
  class Square {
    static size = 20;

    constructor(iX, iY, value = false, color = Color.white) {
      this.x = iX * Square.size;
      this.y = iY * Square.size;
      this.iX = iX;
      this.iY = iY;
      this.color = color;
      this.nextColor = color;
      this.nextValue = value;
      this.currentValue = value;
      this.adjacentCells = 0;
    }

    draw() {
      p5.push();
      if (this.nextValue) {
        this.color.setFill();
      } else {
        Color.black.setFill();
      }
      p5.rect(this.x + 1, this.y + 1, Square.size - 2, Square.size - 2);
      p5.pop();
    }

    toggle() {
      if (!this.currentValue) {
        this.color = colorManager.getCurrent();
      }
      this.currentValue = !this.currentValue;
      this.nextValue = this.currentValue;
    }

    contains(x, y) {
      let isInX = this.x < x && x < this.x + Square.size;
      let isInY = this.y < y && y < this.y + Square.size;
      return isInX && isInY;
    }

    updateCurrentState() {
      this.currentValue = this.nextValue;
      this.color = this.nextColor;
    }

    calculateNextState(matrix) {
      this.countActiveAdjacentCells(matrix);
      if (
        !(this.adjacentCells == 3 || this.adjacentCells == 2) &&
        this.currentValue
      ) {
        this.nextValue = false;
      } else if (!this.currentValue && this.adjacentCells == 3) {
        this.nextValue = true;
      }
    }

    countActiveAdjacentCells(matrix) {
      this.adjacentCells = 0;
      let adjacentColors = [];
      for (let dx = -1; dx < 2; dx++) {
        for (let dy = -1; dy < 2; dy++) {
          if (dx != 0 || dy != 0) {
            let currentSquare = this.getRelativeSquare(dx, dy, matrix);
            if (currentSquare.currentValue) {
              this.adjacentCells++;
              adjacentColors.push(currentSquare.color);
            }
          }
        }
      }
      this.nextColor = this.currentValue
        ? this.color
        : Color.mix(adjacentColors);
      // this.nextColor = Color.mix(adjacentColors);
    }

    getRelativeSquare(dx, dy) {
      let currX = this.iX + dx;
      let matrix = boardManager.matrix;
      let numberOfRows = matrix.length;
      while (currX < 0) {
        currX += numberOfRows;
      }
      while (currX >= numberOfRows) {
        currX -= numberOfRows;
      }
      let currY = this.iY + dy;
      let numberOfColumns = matrix[this.iX].length;
      while (currY < 0) {
        currY += numberOfColumns;
      }
      while (currY >= numberOfColumns) {
        currY -= numberOfColumns;
      }
      return matrix[currX][currY];
    }

    insert() {
      let prefab = insertManager.getCurrent();
      for (let y = 0; y < prefab.length; y++) {
        for (let x = 0; x < prefab[y].length; x++) {
          let currentSquare = this.getRelativeSquare(x, y);
          currentSquare.currentValue = !!prefab[y][x];
          currentSquare.nextValue = !!prefab[y][x];
          //currentSquare.nextValue = currentSquare.currentValue;
          currentSquare.color = colorManager.getCurrent();
        }
      }
    }
  }
  // ####################      GameBoard     #######################################

  class BoardManager {
    constructor(squareSize = 17) {
      Square.size = Math.max(8,squareSize);
      let numberOfSquaresInX = Math.floor(p5.width / Square.size) - 1;
      let numberOfSquaresInY = Math.floor(p5.height / Square.size) - 1;
      this.xShift = (p5.width - numberOfSquaresInX * Square.size) / 2;
      this.yShift = (p5.height - numberOfSquaresInY * Square.size) / 2;
      this.matrix = Array(numberOfSquaresInX)
        .fill(0)
        .map((x, iX) =>
          Array(numberOfSquaresInY)
            .fill(0)
            .map((y, iY) => new Square(iX, iY))
        );
      this.isRunning = false;
    }

    draw() {
      p5.push();
      boardManager.translate();
      p5.background(127);
      this.matrix.forEach((col) => col.forEach((square) => square.draw()));
      p5.pop();
    }

    translate() {
      p5.translate(this.xShift, this.yShift);
    }

    checkClicked(x, y) {
      for (const column of this.matrix) {
        for (const square of column) {
          if (square.contains(x, y)) {
            if (insertManager.currentIndex == 0) {
              square.toggle();
            } else {
              square.insert();
            }
            return;
          }
        }
      }
    }

    update() {
      this.matrix.forEach((col) =>
        col.forEach((square) => square.calculateNextState(this.matrix))
      );
      this.matrix.forEach((col) =>
        col.forEach((square) => square.updateCurrentState())
      );
    }

    toggle() {
      this.isRunning = !this.isRunning;
    }
  }
  // ####################      FrameRateManager     #######################################
  class FrameRateManager {
    constructor(
      min = 1,
      max = 60,
      start = 10,
      positionPercentageX = 0.66,
      positionPercentageY = 0.5,
      radius = 70
    ) {
      this.x = p5.width * positionPercentageX;
      this.y = p5.height * positionPercentageY;
      this.radius = radius;
      this.min = min;
      this.max = max;
      this.current = start;
      this.timer;
      this.show = false;
      this.timerDurationMilli = 500;
      this.textSize = 90;
    }

    update(delta) {
      if (delta > 0) {
        this.current++;
        if (this.current > this.max) {
          this.current = this.max;
        }
      } else {
        this.current--;
        if (this.current < this.min) {
          this.current = this.min;
        }
      }
      this.setFrameRate();
      this.displayChange();
    }

    setFrameRate() {
      p5.frameRate(this.current);
    }

    displayChange() {
      this.draw();
      this.show = true;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.show = false;
      }, this.timerDurationMilli);
    }

    draw() {
      p5.push();
      Color.gray.setFill();
      p5.strokeWeight(3);
      Color.black.setStroke();
      p5.circle(this.x, this.y, this.radius * 2);
      p5.pop();
      p5.push();
      p5.textSize(this.textSize);
      p5.textAlign(p5.CENTER);
      p5.text(this.current, this.x, this.y + this.textSize * 0.35);
      p5.pop();
    }
  }

  // ####################      TooltipManager     #######################################
  class TooltipManager {
    constructor() {
      this.x = 0;
      this.y = 0;
      this.message = "";
      this.show = false;
    }

    toggle() {
      this.show = !this.show;
    }
  }
  // ####################      InsertManager      #######################################

  class InsertManager {
    baseBlock = [[1]];
    glider = [
      [1, 1, 1],
      [0, 0, 1],
      [0, 1, 0],
    ];
    spinner = [[1, 1, 1]];
    spaceship1 = [
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
      [1, 1, 0, 1, 0, 0, 1, 0, 1, 1],
      [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    ];
    pulsator = [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    octagon = [
      [0, 1, 1, 1, 1, 0],
      [1, 0, 1, 1, 0, 1],
      [1, 1, 0, 0, 1, 1],
      [1, 1, 0, 0, 1, 1],
      [1, 0, 1, 1, 0, 1],
      [0, 1, 1, 1, 1, 0],
    ];
    eater = [
      [1, 1, 0, 0],
      [1, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 1],
    ];
    smallSailer = [
      [0, 1, 1, 1, 1],
      [1, 0, 0, 0, 1],
      [0, 0, 0, 0, 1],
      [1, 0, 0, 1, 0],
    ];
    mandala = [
      [1,1,1],
      [1,0,1],
      [1,0,1],
      [0,0,0],
      [1,0,1],
      [1,0,1],
      [1,1,1],
    ];
    f_pentomino =[
      [0,1,1],
      [1,1,0],
      [0,1,0],
    ] ;

    constructor(
      positionPercentageX = 0.5,
      positionPercentageY = 0.5,
      sideLength = 300
    ) {
      this.x = p5.width * positionPercentageX;
      this.y = p5.height * positionPercentageY;
      this.sideLength = sideLength;
      this.timer;
      this.show = false;
      this.timerDurationMilli = 500;
      this.currentIndex = 0;
      this.wheel = [
        this.baseBlock,
        this.glider,
        this.eater,
        // this.spinner,
        this.spaceship1,
        this.pulsator,
        this.octagon,
        this.smallSailer,
        this.mandala,
        this.f_pentomino,

      ];
      this.current = this.wheel[0];
    }

    getCurrent() {
      return this.current;
    }

    next() {
      this.currentIndex++;
      if (this.currentIndex >= this.wheel.length) {
        this.currentIndex = 0;
      }
      this.current = this.wheel[this.currentIndex];
      this.displayChange();
    }

    previous() {
      this.currentIndex--;
      if (this.currentIndex < 0) {
        this.currentIndex = this.wheel.length - 1;
      }
      this.current = this.wheel[this.currentIndex];
      this.displayChange();
    }

    displayChange() {
      this.draw();
      this.show = true;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.show = false;
      }, this.timerDurationMilli);
    }

    rotate() {
      //Rotate n x m Matrix 90deg
      // https://stackoverflow.com/questions/15170942/how-to-rotate-a-matrix-in-an-array-in-javascript
      this.current = this.current[0].map((val, index) =>
        this.current.map((row) => row[index]).reverse()
      );
      this.displayChange();
    }

    draw() {
      p5.push();
      Color.gray.setFill();
      p5.rectMode(p5.CENTER);
      p5.strokeWeight(3);
      Color.black.setStroke();
      p5.rect(this.x, this.y, this.sideLength + 10, this.sideLength + 10);
      p5.pop();
      this.drawPrefab();
    }

    drawPrefab() {
      let squareSize = 50;
      squareSize = Math.floor(
        Math.min(
          this.sideLength / this.current[0].length,
          this.sideLength / this.current.length,
          squareSize
        )
      );
      let xShift = (p5.width - this.current[0].length * squareSize) * 0.5;
      let yShift = (p5.height - this.current.length * squareSize) * 0.5;
      p5.push();
      p5.translate(xShift, yShift);
      this.current.forEach((row, iy) =>
        this.current[iy].forEach((square, ix) => {
          if (square) {
            colorManager.getCurrent().setFill();
          } else {
            Color.black.setFill();
          }
          p5.rect(
            ix * squareSize + 1,
            iy * squareSize + 1,
            squareSize - 2,
            squareSize - 2
          );
        })
      );
      p5.pop();
    }
  }
  // ####################      ColorManager      #######################################
  class ColorManager {
    constructor(
      positionPercentageX = 0.33,
      positionPercentageY = 0.5,
      radius = 70
    ) {
      this.x = p5.width * positionPercentageX;
      this.y = p5.height * positionPercentageY;
      this.radius = radius;
      this.current = 0;
      this.timer;
      this.show = false;
      this.timerDurationMilli = 500;
      this.wheel = [
        Color.white,
        Color.red,
        Color.green,
        Color.blue,
        Color.yellow,
        Color.cyan,
        Color.pink,
      ];
    }

    next() {
      this.current++;
      if (this.current >= this.wheel.length) {
        this.current = 0;
      }
      this.displayChange();
    }

    previous() {
      this.current--;
      if (this.current < 0) {
        this.current = this.wheel.length - 1;
      }
      this.displayChange();
    }

    displayChange() {
      this.draw();
      this.show = true;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.show = false;
      }, this.timerDurationMilli);
    }
    getCurrent() {
      return this.wheel[this.current];
    }

    draw() {
      p5.push();
      this.getCurrent().setFill();
      p5.strokeWeight(3);
      Color.black.setStroke();
      p5.circle(this.x, this.y, this.radius * 2);
      p5.pop();
    }
  }

  function isInCanvas(x,y){
  return 0<=x && x<= p5.width && 0<=y && y<= p5.height
}

  // ! ####################      CONSTANTS     #######################################

  let boardManager;
  let colorManager;
  let tooltipManager;
  let frameRateManager;
  let insertManager;

  // ####################      P5 Functions     #######################################
  p5.preload = () => {};

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    frameRateManager = new FrameRateManager();
    frameRateManager.setFrameRate();
    boardManager = new BoardManager();
    boardManager.draw();

    colorManager = new ColorManager();
    tooltipManager = new TooltipManager();
    insertManager = new InsertManager();
  };

  p5.draw = () => {
    if (tooltipManager.active) {
      return;
    }
    if (boardManager.isRunning) {
      boardManager.update();
    }
    p5.clear();
    boardManager.draw();
    if (colorManager.show) {
      colorManager.draw();
    }
    if (insertManager.show) {
      insertManager.draw();
    }
    if (frameRateManager.show) {
      frameRateManager.draw();
    }
  };

  p5.mousePressed = () => {
    // console.log("Way of Life -> clicked");
    if(!isInCanvas(p5.mouseX, p5.mouseY)){
      return;
    }
    if (tooltipManager.active) {
      return;
    }
    let x = p5.mouseX - boardManager.xShift;
    let y = p5.mouseY - boardManager.yShift;

    if (p5.mouseButton === p5.LEFT) {
      boardManager.checkClicked(x, y);
    }
    if (p5.mouseButton === p5.RIGHT) {
      colorManager.next();
    }
  };

  p5.mouseWheel = (event) => {
    frameRateManager.update(event.delta);
  };

  p5.keyPressed = (event) => {
    switch (event.keyCode) {
      case 13: //Enter
      case 32: //Space Bar
        boardManager.toggle();
        break;
      case 38: //Arrow up
      case 87: //"w"
        insertManager.previous();
        break;
      case 40: //Arrow down
      case 83: //"s"
        insertManager.next();
        break;
      case 82: //"r"
        insertManager.rotate();
        break;
      case 72: //"h"
        tooltipManager.toggle();
        break;
      case 39: //Arrow Right
      case 68: //"d"
        colorManager.next();
        break;
      case 37: //Arrow Right
      case 65: //"a"
        colorManager.previous();
        break;
      case 27: //"ESC"
        boardManager = new BoardManager();
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
  <P5 :sketch="sketch" @wheel.prevent @touchmove.prevent @scroll.prevent/>
</template>
