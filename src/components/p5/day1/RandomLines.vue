<script setup>
const sketch = (p5) => {
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
    p5.clear();
    p5.background(0, 0, 0);
  };
};
</script>

<template>
  <P5 :sketch="sketch" />
</template>
