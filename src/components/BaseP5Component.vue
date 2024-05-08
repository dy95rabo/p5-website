//Global variables
<script setup>
const sketch = (p5) => {

    // ####################      CONSTANTS     #######################################

    
    
    // ####################      Classes     #######################################



    // ####################      P5 Functions     #######################################
  p5.preload = () => {};

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(127, 127, 127);


  };

  p5.draw = () => {};

  p5.mousePressed = () => {};

  p5.mouseWheel = (event) => {
    if(event.delta>0){

    }else{

    }
  };
};
</script>

<template>
  <P5 :sketch="sketch" />
</template>
