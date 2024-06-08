<script setup>
import { onBeforeUnmount, ref } from "vue";
import PopUpCard from "@/components/PopUpCard.vue";
const showHelp = ref(false);
let p5Instance = null;
const sketch = (p5) => {
  p5Instance = p5;
  let seed;
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.frameRate(10);
    seed = p5.random(10000000);
  };

  p5.draw = () => {
    p5.background(255);
    p5.randomSeed(seed);
    p5.strokeWeight(
      Math.sqrt(
        Math.pow(Math.abs(p5.mouseX - p5.width / 2) / p5.width, 2) +
          Math.pow(Math.abs(p5.mouseY - p5.height / 2) / p5.height, 2)
      ) * 10
    );

    const cellNumbers = 60;
    const gridSize = p5.width / cellNumbers;
    for (let x = 0; x < p5.width; x += gridSize) {
      for (let y = 0; y < p5.height; y += gridSize) {
        if (p5.random(-1, 1) >= 0) {
          p5.line(x, y, x + gridSize, y + gridSize);
        } else {
          p5.line(x + gridSize, y, x, y + gridSize);
        }
      }
    }
  };

  function isInCanvas(x, y) {
    return 0 <= x && x <= p5.width && 0 <= y && y <= p5.height;
  }
  
  p5.mousePressed = () => {
    showHelp.value = false
    // console.log("Diagonal Lines -> clicked");

    if(!isInCanvas(p5.mouseX, p5.mouseY)){
      return;
    }
    seed = p5.random(10000000);
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
  {
    keys: "'click'",
    function: "create new randomized maze",
  },
  {
    keys: "'move mouse pointer'",
    function: "change line thickness without changing the maze layout",
  },
];
</script>

<template>
  <P5 style="overflow: hidden; height: 100dvh;" :sketch="sketch" @wheel.prevent @touchmove.prevent @scroll.prevent />
  <pop-up-card :show-pop-up="showHelp" :key-input="keyInput"></pop-up-card>
</template>
