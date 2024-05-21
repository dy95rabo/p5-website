//Global variables
<script setup>
import { onBeforeUnmount } from 'vue';
let p5Instance = null;
const sketch = (p5) => {
  p5Instance = p5;

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
