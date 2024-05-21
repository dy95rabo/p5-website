<script setup>
import { onBeforeUnmount } from 'vue';
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

  p5.mousePressed = () => {
    // console.log("Diagonal Lines -> clicked");

    seed = p5.random(10000000);
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
