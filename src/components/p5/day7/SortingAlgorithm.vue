//Global variables
<script setup>
import { onBeforeUnmount, ref } from "vue";
import PopUpCard from "@/components/PopUpCard.vue";
const showHelp = ref(false);
let p5Instance = null;
const sketch = (p5) => {
  p5Instance = p5;

  let numberArr = [];

  let currentIndex = 0;
  let lastIndex;
  let sorted = false;

  const defaultArrayLength = 96;

  function generateRandomNumberArr(length, maxValue) {
    let arr = new Array(length).fill(0);
    return arr.map((n) => p5.random(maxValue));
  }

  function drawArray(arr) {
    p5.background(0);
    p5.push();
    p5.noStroke();
    p5.translate(0, p5.height);
    const stripeWidth = p5.width / arr.length;
    arr.forEach((n, i) => {
      p5.fill(255);
      if (i > lastIndex) {
        p5.fill(0, 255, 0);
      }
      if (i == currentIndex) {
        p5.fill(255, 0, 0);
      }
      p5.rect(i * stripeWidth, 0, stripeWidth, -n);
    });
    p5.pop();
  }

  function bubbleSort(arr) {
    if (lastIndex == 0) {
      sorted = true;
      currentIndex = -1;
      lastIndex = -1;
      return;
    }
    if (currentIndex == lastIndex) {
      lastIndex--;
      currentIndex = 0;
      return;
    }
    if (arr[currentIndex] > arr[currentIndex + 1]) {
      swap(arr, currentIndex, currentIndex + 1);
    }
    currentIndex++;
  }

  function swap(arr, i1, i2) {
    // if (!(arr instanceof Array && i1 instanceof Number && i2 instanceof Number))
    //   return;
    if (i1 < 0 || i2 < 0 || i1 >= arr.length || i2 >= arr.length) return;
    let tmp = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = tmp;
  }

  p5.preload = () => {};

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(0);
    p5.frameRate(60);
    numberArr = generateRandomNumberArr(defaultArrayLength, p5.height);
    lastIndex = numberArr.length - 1;
    // numberArr = generateRandomNumberArr(p5.width, p5.height);
  };

  p5.draw = () => {
    drawArray(numberArr);
    if (!sorted) {
      bubbleSort(numberArr);
    }
  };

  function isInCanvas(x, y) {
    return 0 <= x && x <= p5.width && 0 <= y && y <= p5.height;
  }
  p5.mousePressed = () => {
    showHelp.value = false;
    if (!isInCanvas(p5.mouseX, p5.mouseY)) {
      return;
    }
  };

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
        numberArr = generateRandomNumberArr(defaultArrayLength, p5.height);
        currentIndex = 0;
        lastIndex = numberArr.length - 1;
        sorted = false;
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
  {
    keys: "'ESC'",
    function: "reset random Array and restart sorting",
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
