<script setup>
import { onBeforeUnmount, ref } from "vue";
import PopUpCard from "@/components/PopUpCard.vue";
const showHelp = ref(false);
let p5Instance = null;
const sketch = (p5) => {
  p5Instance = p5;
  let baseImg;
  let redImg;
  let blueImg;
  let greenImg;
  let invertImg;
  let grayImg;

  let mouseAngle = 0;
  let translationFactor = 15;

  const alpha = 50;

  const images = [];
  const OVERLAY_IMAGES = [];
  let currentImage = 0;

  function swapImage() {
    currentImage++;
    if (currentImage >= images.length) {
      currentImage = 0;
    }
  }

  p5.preload = () => {
    baseImg = p5.loadImage(
      "../../src/assets/glowing-spaceship-orbits-planet-starry-galaxy-generated-by-ai.jpg"
    );

    redImg = p5.loadImage(
      "../../src/assets/glowing-spaceship-orbits-planet-starry-galaxy-generated-by-ai.jpg"
    );
    blueImg = p5.loadImage(
      "../../src/assets/glowing-spaceship-orbits-planet-starry-galaxy-generated-by-ai.jpg"
    );
    greenImg = p5.loadImage(
      "../../src/assets/glowing-spaceship-orbits-planet-starry-galaxy-generated-by-ai.jpg"
    );

    invertImg = p5.loadImage(
      "../../src/assets/glowing-spaceship-orbits-planet-starry-galaxy-generated-by-ai.jpg"
    );
    grayImg = p5.loadImage(
      "../../src/assets/glowing-spaceship-orbits-planet-starry-galaxy-generated-by-ai.jpg"
    );

    images.push(baseImg);
    images.push(invertImg);
    images.push(grayImg);
    OVERLAY_IMAGES.push(redImg);
    OVERLAY_IMAGES.push(greenImg);
    OVERLAY_IMAGES.push(blueImg);
  };

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.pixelDensity(1);

    // p5.loadPixels();
    baseImg.loadPixels();
    redImg.loadPixels();
    blueImg.loadPixels();
    greenImg.loadPixels();

    //Erstelle jeweils eine Kopie des mit nur dem Rot, dem Blau und dem Grün Anteil (niedriger alpha Wert)
    //

    for (let i = 0; i < redImg.pixels.length; i++) {
      if (i % 4 == 0) {
        blueImg.pixels[i] = 0;
        greenImg.pixels[i] = 0;
      }
      if (i % 4 == 1) {
        blueImg.pixels[i] = 0;
        redImg.pixels[i] = 0;
      }
      if (i % 4 == 2) {
        redImg.pixels[i] = 0;
        greenImg.pixels[i] = 0;
      }
      if (i % 4 == 3) {
        // img.pixels[i] = alpha
        redImg.pixels[i] = alpha;
        blueImg.pixels[i] = alpha;
        greenImg.pixels[i] = alpha;
      }
    }

    baseImg.updatePixels();

    OVERLAY_IMAGES.forEach((img) => img.updatePixels());

    invertImg.filter(p5.INVERT);
    grayImg.filter(p5.GRAY);
  };

  p5.draw = () => {
    let dx = p5.mouseX - p5.width * 0.5;
    let dy = p5.mouseY - p5.height * 0.5;
    mouseAngle = (dx < 0 ? Math.PI : 0) - Math.atan(dy / dx);
    translationFactor =
      Math.sqrt(
        (dx * dx + dy * dy) / (p5.width * p5.width + p5.height * p5.height)
      ) * 150;

    p5.image(images[currentImage], 0, 0, p5.width, p5.height);

    OVERLAY_IMAGES.forEach((img, i) => {
      p5.push();
      p5.translate(
        translationFactor * Math.cos(((i * 2) / 3) * Math.PI + mouseAngle),
        translationFactor * Math.sin(((i * 2) / 3) * Math.PI + mouseAngle)
      );
      p5.image(img, 0, 0, p5.width, p5.height);
      p5.pop();
    });
  };

  function isInCanvas(x, y) {
    return 0 <= x && x <= p5.width && 0 <= y && y <= p5.height;
  }
  
  p5.mousePressed = () => {
    showHelp.value = false
    if (!isInCanvas(p5.mouseX, p5.mouseY)) {
      return;
    }
    swapImage();
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
    function: "change to different image version",
  },
  {
    keys: "'move mouse cursor'",
    function: "parallax glitch effect",
  },
];
</script>

<template>
  <P5 style="overflow: hidden; height: 100dvh;" :sketch="sketch" @wheel.prevent @touchmove.prevent @scroll.prevent />
  <pop-up-card :show-pop-up="showHelp" :key-input="keyInput"></pop-up-card>
</template>

