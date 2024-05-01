//Global variables
<script setup>
const sketch = (p5) => {
  p5.preload = () => {};

  p5.setup = () => {
    //   p5.createCanvas(400, 400);
    p5.createCanvas(p5.windowWidth, p5.windowHeight);

    p5.background(255, 0, 0);

    //   p5.point(220,240);
    //   p5.line(0,0,400,400);
    //   p5.stroke("black")
    //   p5.strokeWeight(3)
    //   p5.triangle(10,200,30,400,50,60)
    //   p5.square(30,50,20)
    //   p5.rect(300,200,20,60,5)
    //   p5.circle(60,300,50)
    //   p5.strokeWeight(10);
    //   p5.background(0);
    //   p5.frameRate(60)
  };

  p5.draw = () => {};
};
</script>

<template>
  <P5 :sketch="sketch" />
</template>
