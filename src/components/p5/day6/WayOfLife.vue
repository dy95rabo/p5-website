<script setup>
import _ from "lodash";

const sketch = (p5) => {
  // ####################      Classes     #######################################
  // ####################        COLOR     #####################################
  class Color {
    constructor(r, g, b) {
      this.r = r;
      this.g = g;
      this.b = b;
    }

    static White = new Color(255, 255, 255);
    static Black = new Color(0, 0, 0);

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
  // ####################        Square     #####################################
  class Square {
    static size = 0;

    constructor(indexX, indexY, value = false) {
      this.x = indexX * Square.size;
      this.y = indexY * Square.size;
      this.color = Color.White;
      this.value = value;
    }

    draw() {
      p5.push();
      if (this.value) {
        this.color.setFill();
      } else {
        Color.Black.setFill();
      }
      p5.rect(this.x + 1, this.y + 1, Square.size - 2, Square.size - 2);
      p5.pop();
    }

    toggle() {
      this.value = !this.value;
    }

    contains(x, y) {
      let isInX = this.x < x && x < this.x + Square.size;
      let isIny = this.y < y && y < this.y + Square.size;
      return isInX && isIny;
    }
  }
  // ####################      GameBoard     #######################################

  class GameBoard {
    constructor(width, height, squareSize) {
      Square.size = squareSize;
      this.board = Array(width)
        .fill(0)
        .map((x, iX) =>
          Array(height)
            .fill(0)
            .map((y, iY) => new Square(iX, iY))
        );
      this.width = width;
      this.height = height;
      this.xShift = (p5.width - width * squareSize) / 2;
      this.yShift = (p5.height - height * squareSize) / 2;
    }

    draw() {
      p5.push();
      for (let x = 0; x < this.board.length; x++) {
        for (let y = 0; y < this.board[x].length; y++) {
          this.board[x][y].draw();
        }
      }
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
      let newState = _.cloneDeep(this.board);
      console.log(newState);
      for (let x = 0; x < this.board.length; x++) {
        for (let y = 0; y < this.board[x].length; y++) {
          const square = newState[x][y];
          let adjacentCells = this.countAdjacentSquares(x, y);
          if (square.value) {
            if (adjacentCells < 2) {
              square.toggle();
            } else if (adjacentCells > 3) {
              square.toggle();
            }
          } else {
            if (adjacentCells == 3) {
              square.toggle();
            }
          }
        }
      }

      this.board = newState;
    }

    countAdjacentSquares(x, y) {
      let adjacentCells = 0;
      for (let dX = -1; dX < 2; dX++) {
        for (let dY = -1; dY < 2; dY++) {
          if ((dX != dY) ||dX!= 0) {
          let currX = x + dX;
          if(currX<0){
            currX+= this.board.length
          }
          if(currX>=this.board.length){
            currX -= this.board.length
          }
          let currY = y + dY;
          if(currY<0){
            currY+= this.board[x].length
          }
          if(currY>=this.board[x].length){
            currY -= this.board[x].length
          }

          let value = this.board[currX][currY].value;
          if (value) {
            adjacentCells++;
          }
        }
      }

      }
      return adjacentCells;
    }
  }

  class Button {
    constructor(x, y, width, height, text) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.text = text;
    }
  }
  let gameBoard;
  let isRunning = false;
  let button;
  let framerate = 2;

  // ####################      P5 Functions     #######################################
  p5.preload = () => {};

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.frameRate(2);
    gameBoard = new GameBoard(100, 50, 19);
    // gameBoard = new GameBoard(34, 18, 50);
    // gameBoard = new GameBoard(18, 11, 80);
    // gameBoard = new GameBoard(3, 3, 200);
    // button = new Button(p5.width-30,10,20,60)
  };

  p5.draw = () => {
    if (isRunning) {
      gameBoard.update();
    }
    p5.clear();
    gameBoard.translate();
    p5.background(127);
    gameBoard.draw();
  };

  p5.mousePressed = () => {
    let x = p5.mouseX - gameBoard.xShift;
    let y = p5.mouseY - gameBoard.yShift;
    gameBoard.checkClicked(x, y);

    // button.checkButtonClicked(p5.mouseX,p5.mouseY)
  };

  p5.mouseWheel = (event) => {
    if (event.delta > 0) {
      framerate++;
      if(framerate>30){
        framerate = 30
      }
    } else {
      framerate--;
    }
    p5.frameRate(framerate)
  };

  p5.keyPressed = (event) => {
    if (event.keyCode === p5.ENTER) {
      isRunning = !isRunning;
    }
  };
};
</script>

<template>
  <P5 :sketch="sketch" />
</template>
