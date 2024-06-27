//Global variables
<script setup>
import { onBeforeUnmount, ref } from "vue";
import PopUpCard from "@/components/PopUpCard.vue";
const showHelp = ref(false);
let p5Instance = null;
const sketch = (p5) => {
  p5Instance = p5;

  let stepSize = 20;

  let maxSideLength;

  function generatePrimes(maxNumber) {
    let primeArr = new Array(maxNumber + 1).fill(true);
    primeArr[0] = false;
    primeArr[1] = false;

    for (let i = 2; i < primeArr.length; i++) {
      if (primeArr[i]) {
        let notPrime = i + i;
        while (notPrime < primeArr.length) {
          primeArr[notPrime] = false;
          notPrime += i;
        }
      }
    }
    return primeArr;
  }

  function drawSpiral() {
    let primes = [];
    let num = 1;
    let direction = 0;
    let numberOfStepsInOneDirection = 1;
    let px;
    let py;
    let x = p5.width / 2;
    let y = p5.height / 2;
    let sideLength = maxSideLength / stepSize;
    sideLength = Math.floor(sideLength);
    primes = generatePrimes(sideLength * sideLength);
    p5.background(0);
    p5.noStroke();
    p5.fill(255, 255, 0);
    p5.textSize(10);
    p5.textAlign(p5.CENTER, p5.CENTER);
    while (num < primes.length) {
      if (primes[num]) {
        p5.text(num, x, y);
      }
      px = x;
      py = y;
      switch (direction) {
        case 0:
          x += stepSize;
          break;
        case 1:
          y -= stepSize;
          break;
        case 2:
          x -= stepSize;
          break;
        case 3:
          y += stepSize;
          break;
        default:
          break;
      }

      if (num % numberOfStepsInOneDirection == 0) {
        direction = (direction + 1) % 4;
        if (direction % 2 == 0) {
          numberOfStepsInOneDirection++;
        }
      }
      num++;
      p5.push();
      p5.strokeWeight(1);
      p5.stroke(70);
      p5.line(x, y, px, py);
      p5.pop();
    }
  }

  function drawPixels() {
    let primes = [];
    let num = 1;
    let x;
    let y;
    let numberOfStepsInOneDirection = 1;
    let state = 0;
    p5.background(0);
    x = p5.width / 2;
    y = p5.height / 2;
    primes = generatePrimes(maxSideLength * maxSideLength);
    p5.noStroke();
    p5.rectMode(p5.CENTER);
    let c = p5.color(255, 255, 0);

    while (num < primes.length) {
      p5.fill(primes[num] ? c : 0);
      p5.rect(x, y, 1, 1);
      switch (state) {
        case 0:
          x++;
          break;
        case 1:
          y--;
          break;
        case 2:
          x--;
          break;
        case 3:
          y++;
          break;
        default:
          break;
      }

      if (num % numberOfStepsInOneDirection == 0) {
        state = (state + 1) % 4;
        if (state % 2 == 0) {
          numberOfStepsInOneDirection++;
        }
      }
      num++;
    }
  }

  p5.preload = () => {};

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    maxSideLength = Math.min(p5.width, p5.height);

    p5.noLoop();
  };

  p5.draw = () => {
    drawSpiral();
    // drawPixels();
  };

  function isInCanvas(x, y) {
    return 0 <= x && x <= p5.width && 0 <= y && y <= p5.height;
  }
  p5.mousePressed = () => {
    showHelp.value = false;
    if (!isInCanvas(p5.mouseX, p5.mouseY)) {
      return;
    }
    if (p5.mouseButton === p5.LEFT) {
      drawPixels();
    }
    if (p5.mouseButton === p5.RIGHT) {
      drawSpiral();
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
        showHelp.value = !showHelp.value;
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
const keyInput = [
  {
    keys: "'h'",
    function: "show/hide help",
  },
];
</script>

<template>
  <P5
    style="overflow: hidden; height: 100dvh"
    :sketch="sketch"
    @wheel.prevent
    @touchmove.prevent
    @scroll.prevent
  />
  <pop-up-card :show-pop-up="showHelp" :key-input="keyInput"></pop-up-card>
</template>
