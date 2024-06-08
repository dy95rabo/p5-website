<script setup>
import { onBeforeUnmount, ref } from "vue";
import PopUpCard from "@/components/PopUpCard.vue";
const showHelp = ref(false);
let p5Instance = null;
const sketch = (p5) => {
  p5Instance = p5;
  const lastMode = 1;
  let mode = 0;
  let bg = p5.color(0, 0, 0, 40);

  let p1;
  let p2;
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(0);
    p5.frameRate(30);
    p5.colorMode(p5.HSB);
  };

  p5.draw = () => {
    p5.background(bg);
    p5.strokeWeight(4);
    p5.stroke(p5.random(360), 100, 100);
    switch (mode) {
      case 0:
        p1 = p5.createVector(p5.width / 2, p5.height / 2);
        p2 = p5.createVector(p5.random(0, p5.width), p5.random(0, p5.height));
        break;
      case 1:
        p1 = p2;
        p2 = p5.createVector(p5.random(0, p5.width), p5.random(0, p5.height));
        break;
      default:
        break;
    }

    p5.line(p1.x, p1.y, p2.x, p2.y);
  };

  function isInCanvas(x, y) {
    return 0 <= x && x <= p5.width && 0 <= y && y <= p5.height;
  }

  p5.mousePressed = () => {
    showHelp.value = false;
    if (!isInCanvas(p5.mouseX, p5.mouseY)) {
      return;
    }
    p5.clear();
    p5.background(0, 0, 0);
    if (p5.mouseButton === p5.LEFT) {
      mode++;
    }
    if (p5.mouseButton === p5.RIGHT) {
      mode--;
    }
    if (mode > lastMode) {
      mode = 0;
    }
    if (mode < 0) {
      mode = lastMode;
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
  {
    keys: "'click'",
    function: "change line mode",
  },
];
</script>

<template>
  <P5
    style="overflow: hidden; height: 100dvh"
    :sketch="sketch"
    @wheel.prevent
    @touchmove.prevent
    @scroll.prevent
  />
  <pop-up-card :show-pop-up="showHelp" :key-input="keyInput"></pop-up-card>
</template>
