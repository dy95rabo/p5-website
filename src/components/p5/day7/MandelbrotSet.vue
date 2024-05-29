//Global variables
<script setup>
import { onBeforeUnmount } from "vue";
let p5Instance = null;
const sketch = (p5) => {
  p5Instance = p5;

  // ####################      GameBoard     #######################################

  class ComplexNumber {
    constructor(a, b) {
      this.a = a;
      this.b = b;
    }

    add(c) {
      if (c instanceof ComplexNumber)
        return new ComplexNumber(this.a + c.a, this.b + c.b);
      if (c instanceof Number) return new ComplexNumber(this.a + c, this.b);
      return undefined;
    }

    squared() {
      return new ComplexNumber(
        this.a * this.a - this.b * this.b,
        2 * this.a * this.b
      );
    }

    exceedBound(n) {
      return p5.abs(this.a + this.b) > n;
    }
  }

  // ####################      p5-functions     #######################################
  let showJuliaSet = false;
  let juliaVersion = [];
  let juliaCounter = 0;
  let screenAspectRatio;

  juliaVersion.push(new ComplexNumber(-0.8, 0.156));
  juliaVersion.push(new ComplexNumber(0.285, 0.01));
  juliaVersion.push(new ComplexNumber(-0.835, -0.2321));
  juliaVersion.push(new ComplexNumber(-0.7269 , 0.1889));
  juliaVersion.push(new ComplexNumber(-0.70176, -0.3842));
  juliaVersion.push(new ComplexNumber(0.4, 0.4));
  juliaVersion.push(new ComplexNumber(0, 0.8));
  juliaVersion.push(new ComplexNumber(-0.4 , 0.6));
  // juliaVersion.push(new ComplexNumber(0.4, 0.4));

  function drawToScreen() {
    p5.background(127, 127, 127);
    p5.pixelDensity(1);
    p5.loadPixels();
    p5.colorMode(p5.HSB);
    const MAX_ITERATIONS = 50;
    for (let x = 0; x < p5.width; x++) {
      for (let y = 0; y < p5.height; y++) {
        var a;
        if(showJuliaSet){
          a = p5.map(x, 0, p5.width, -2, 2);
        }else{
          a = p5.map(x, 0, p5.width, -2.5, 1.5);

        }
        var b = p5.map(
          y,
          0,
          p5.height,
          -2 * screenAspectRatio,
          2 * screenAspectRatio
        );

        let c = new ComplexNumber(a, b);
        let z = new ComplexNumber(a, b);

        let n = 0;
        while (n < MAX_ITERATIONS) {
          // z = z.squared().add(j);
          z = z.squared().add(showJuliaSet ? juliaVersion[juliaCounter] : c);

          if (z.exceedBound(1000)) {
            break;
          }
          n++;
        }

        var color = p5.color(0, 0, 0);
        if (n !== MAX_ITERATIONS) {
          // version 1
          // n = p5.map(n, 0, MAX_ITERATIONS, 0, 1);
          // color = p5.color(p5.map(p5.sqrt(n), 0, 1, 0, 360), 100, 100);
          // version 2
          color = p5.color(p5.map(n, 0, MAX_ITERATIONS, 0, 360), 100, 100);
        }

        var pix = (x + y * p5.width) * 4;
        p5.pixels[pix + 0] = p5.red(color);
        p5.pixels[pix + 1] = p5.green(color);
        p5.pixels[pix + 2] = p5.blue(color);
        p5.pixels[pix + 3] = 255;
      }
    }
    p5.updatePixels();
  }

  p5.preload = () => {};

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    screenAspectRatio = p5.height / p5.width;
    drawToScreen();
  };

  p5.draw = () => {};

  function isInCanvas(x, y) {
    return 0 <= x && x <= p5.width && 0 <= y && y <= p5.height;
  }
  p5.mousePressed = () => {
    if (!isInCanvas(p5.mouseX, p5.mouseY)) {
      return;
    }
  };

  p5.mouseDragged = () => {};

  p5.mouseReleased = () => {};

  p5.mouseWheel = (event) => {
    if (event.delta > 0) {
    } else {
    }
  };
  p5.keyPressed = (event) => {
    switch (event.keyCode) {
      case 13: //Enter
      case 32: //Space Bar
        showJuliaSet = !showJuliaSet;
        drawToScreen();
        break;
      case 38: //Arrow up
      case 87: //"w"
        juliaCounter++;
        if (juliaCounter >= juliaVersion.length) {
          juliaCounter -= juliaVersion.length;
        }
        drawToScreen();
        break;
      case 40: //Arrow down
      case 83: //"s"
        juliaCounter--;
        if (juliaCounter < 0) {
          juliaCounter += juliaVersion.length;
        }
        drawToScreen();
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
