<script setup>
import { onBeforeUnmount, ref } from "vue";
import PopUpCard from "@/components/PopUpCard.vue";
const showHelp = ref(false);
let p5Instance = null;
let div;

const sketch = (p5) => {
  p5Instance = p5;

  p5.preload = () => {};

  p5.setup = () => {
    // p5.createCanvas(p5.windowWidth, p5.windowHeight);
    // p5.background(127, 127, 127);
    // p5.textSize(25);
    // p5.textAlign(p5.CENTER);
    // p5.text("Work in Progress", p5.width*0.5,p5.height*0.5 );
    // div = p5.createElement("h1", "Work in Progress");
    // div.attribute("class", "fancy-div");
  };

  p5.draw = () => {};

  function isInCanvas(x, y) {
    return 0 <= x && x <= p5.width && 0 <= y && y <= p5.height;
  }
  p5.mousePressed = () => {
    if (!isInCanvas(p5.mouseX, p5.mouseY)) {
      return;
    }
  };

  p5.mouseDragged = () => {};

  p5.mouseReleased = () => {};

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
];
</script>

<template>
  <P5 style="overflow: hidden; height: 100dvh;" :sketch="sketch" @wheel.prevent @touchmove.prevent @scroll.prevent />
  <pop-up-card :show-pop-up="showHelp" :key-input="keyInput"></pop-up-card>
</template>

