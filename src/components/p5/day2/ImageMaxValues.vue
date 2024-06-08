<script setup>
import { onBeforeUnmount, ref } from "vue";
import PopUpCard from "@/components/PopUpCard.vue";
const showHelp = ref(false);
let p5Instance = null;
const sketch = (p5) => {
  p5Instance = p5;
  let img;

  p5.preload = () => {
    img = p5.loadImage(
      "../../src/assets/glowing-spaceship-orbits-planet-starry-galaxy-generated-by-ai.jpg"
    );
  };
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.pixelDensity(1);

    img.loadPixels();

    for (let i = 0; i < img.pixels.length; i += 4) {
      let maxValue = img.pixels[i + 0];
      if (img.pixels[i + 1] > maxValue) {
        maxValue = img.pixels[i + 1];
      }
      if (img.pixels[i + 2] > maxValue) {
        maxValue = img.pixels[i + 2];
      }

      for (let x = 0; x < 3; x++) {
        if (img.pixels[i + x] < maxValue) {
          img.pixels[i + x] = 0;
        }
      }
    }

    img.updatePixels();

    p5.image(img, 0, 0, p5.width, p5.height);
  };

  p5.draw = () => { };

  p5.mousePressed = () => {     showHelp.value = false};
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

