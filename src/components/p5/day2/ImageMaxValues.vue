<script setup>
import { onBeforeUnmount } from 'vue';
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

  p5.mousePressed = () => { };
};
// p5 instance Cleanup on unmount component
onBeforeUnmount(() => {
  if (p5Instance) {
    p5Instance.remove();
  }
});
</script>

<template>
  <P5 :sketch="sketch" @wheel.prevent @touchmove.prevent @scroll.prevent/>
</template>
