<script setup>
import { onBeforeUnmount } from 'vue';
let p5Instance = null;
const sketch = (p5) => {
  p5Instance = p5;
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(0);
    p5.frameRate(60);
  };

  p5.draw = () => {
    p5.background(0, 0, 0, 5);

    p5.stroke(p5.random(255), p5.random(255), p5.random(255));
    let x = p5.random(0, p5.width);
    let y = p5.random(0, p5.height);

    p5.line(p5.width / 2, p5.height / 2, x, y);
  };

  p5.mousePressed = () => {
    // console.log("Random Lines -> clicked");

    p5.clear();
    p5.background(0, 0, 0);
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
