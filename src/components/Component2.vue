<script setup>
const sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(127, 127, 127);
  };

  p5.mousePressed = () => {
    console.log("Component2 --> clicked")
  };

};
</script>

<template>
  <P5 :sketch="sketch" />
</template>
