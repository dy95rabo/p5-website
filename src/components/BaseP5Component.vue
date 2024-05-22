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

  function isInCanvas(x,y){
  return 0<=x && x<= p5.width && 0<=y && y<= p5.height
}
  p5.mousePressed = () => {
    if(!isInCanvas(p5.mouseX, p5.mouseY)){
      return;
    }
  };

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
