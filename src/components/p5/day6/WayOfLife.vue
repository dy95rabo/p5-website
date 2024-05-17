<script setup>
const MIN_FRAMERATE = 1;
const MAX_FRAMERATE = 30;

const sketch = (p5) => {
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

    static wheel = [
      Color.white,
      Color.red,
      Color.green,
      Color.blue,
      Color.yellow,
      Color.cyan,
      Color.pink,
    ];
    static current = 0;

    static next() {
      Color.current++;
      if (Color.current >= Color.wheel.length) {
        Color.current = 0;
      }
    }

    static getCurrent() {
      return Color.wheel[Color.current];
    }

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

    static drawColorCircle() {
      p5.push();
      Color.getCurrent().setFill();
      p5.strokeWeight(3);
      Color.black.setStroke();
      p5.circle(p5.width / 2, p5.height / 2, 100);
      p5.pop();
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
        this.color = Color.getCurrent();
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

    calculateNextState(board) {
      this.countActiveAdjacentCells(board);
      if (
        !(this.adjacentCells == 3 || this.adjacentCells == 2) &&
        this.currentValue
      ) {
        this.nextValue = false;
      } else if (!this.currentValue && this.adjacentCells == 3) {
        this.nextValue = true;
      }
    }

    countActiveAdjacentCells(board) {
      this.adjacentCells = 0;
      let adjacentColors = [];
      for (let dX = -1; dX < 2; dX++) {
        for (let dY = -1; dY < 2; dY++) {
          if (dX != 0 || dY != 0) {
            let currX = this.iX + dX;
            if (currX < 0) {
              currX += board.length;
            }
            if (currX >= board.length) {
              currX -= board.length;
            }
            let currY = this.iY + dY;
            if (currY < 0) {
              currY += board[this.iX].length;
            }
            if (currY >= board[this.iX].length) {
              currY -= board[this.iX].length;
            }

            let currentSquare = board[currX][currY];
            if (currentSquare.currentValue) {
              this.adjacentCells++;
              adjacentColors.push(currentSquare.color);
            }
          }
        }
      }
      this.nextColor = Color.mix(adjacentColors);
    }
  }
  // ####################      GameBoard     #######################################

  class GameBoard {
    constructor(squareSize) {
      Square.size = squareSize;
      let numberOfSquaresInX = Math.floor(p5.width / squareSize);
      let numberOfSquaresInY = Math.floor(p5.height / squareSize);
      this.xShift = (p5.width - numberOfSquaresInX * squareSize) / 2;
      this.yShift = (p5.height - numberOfSquaresInY * squareSize) / 2;
      this.board = Array(numberOfSquaresInX)
        .fill(0)
        .map((x, iX) =>
          Array(numberOfSquaresInY)
            .fill(0)
            .map((y, iY) => new Square(iX, iY))
        );
    }

    draw() {
      p5.push();
      gameBoard.translate();
      p5.background(127);
      this.board.forEach((col) => col.forEach((square) => square.draw()));
      p5.pop();
    }

    translate() {
      p5.translate(this.xShift, this.yShift);
    }

    checkClicked(x, y) {
      for (const column of this.board) {
        for (const square of column) {
          if (square.contains(x, y)) {
            square.toggle();
            return;
          }
        }
      }
    }

    update() {
      this.board.forEach((col) =>
        col.forEach((square) => square.calculateNextState(this.board))
      );
      this.board.forEach((col) =>
        col.forEach((square) => square.updateCurrentState())
      );
    }
  }

  let gameBoard;
  let isRunning = false;
  let frameRate = 2;
  let displayCurrentColor = false;
  let showTooltip = false;

  // ####################      P5 Functions     #######################################
  p5.preload = () => {};

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.frameRate(2);
    gameBoard = new GameBoard(19);
    gameBoard.draw();
  };

  p5.draw = () => {
    if (showTooltip) {
      return;
    }
    if (isRunning) {
      gameBoard.update();
    }
    p5.clear();
    gameBoard.draw();
    if (displayCurrentColor) {
      Color.drawColorCircle();
    }
  };

  p5.mousePressed = (event) => {
    if (showTooltip) {
      return;
    }
    let x = p5.mouseX - gameBoard.xShift;
    let y = p5.mouseY - gameBoard.yShift;
    if (p5.mouseButton === p5.LEFT) {
      gameBoard.checkClicked(x, y);
    }
    if (p5.mouseButton === p5.RIGHT) {
      displayCurrentColor = true;
      Color.next();
      Color.drawColorCircle();
      setTimeout(() => {
        displayCurrentColor = false;
      }, 300);
    }
  };

  p5.mouseWheel = (event) => {
    if (event.delta > 0) {
      frameRate++;
      if (frameRate > MAX_FRAMERATE) {
        frameRate = MAX_FRAMERATE;
      }
    } else {
      frameRate--;
      if (frameRate < MIN_FRAMERATE) {
        frameRate = MIN_FRAMERATE;
      }
    }
    p5.frameRate(frameRate);
  };

  p5.keyPressed = (event) => {
    if (event.keyCode === p5.ENTER) {
      isRunning = !isRunning;
    }
    if (event.keyCode === p5.SPACE) {
      showTooltip = !showTooltip;
    }
  };
};
</script>

<template>
  <P5 :sketch="sketch" />
</template>
