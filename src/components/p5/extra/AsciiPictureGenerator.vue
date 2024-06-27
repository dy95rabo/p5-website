//Global variables
<script setup>
import { onBeforeUnmount, ref } from "vue";
import PopUpCard from "@/components/PopUpCard.vue";
const showHelp = ref(false);
let p5Instance = null;
const sketch = (p5) => {
  p5Instance = p5;

  const charArr = "Ñ@#W$9876543210?!abc;:+=-,._ ".split("");
  let img;
  let imgCopy;
  let outputString = "";
  const resizePixelWidth = 250;
  p5.preload = () => {
    img = p5.loadImage("../../src/assets/Cute-cartoon-cat.png");
    // imgCopy = p5.loadImage("../../src/assets/Cute-cartoon-cat.png");
  };

  p5.setup = () => {
    // img = structuredClone(imgCopy);
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    img.resize(resizePixelWidth, 0);
    const charSize = Math.floor(
      Math.min(p5.width / img.width, p5.height / img.height)
    );
    const xOffset = (p5.width - img.width * charSize) / 2;
    const yOffset = (p5.height - img.height * charSize) / 2;
    img.filter(p5.GRAY);
    p5.background(0);
    p5.stroke(255);
    p5.fill(255);
    p5.textSize(charSize);
    img.loadPixels();

    for (let i = 0; i < img.pixels.length; i += 4) {
      const gray = img.pixels[i + 0];
      const charIndex = Math.round(p5.map(gray, 255, 0, 0, charArr.length - 1));
      const char = charArr[charIndex];
      const x = ((i / 4) % img.width) * charSize;
      const y = Math.floor(i / 4 / img.width) * charSize;
      p5.text(char, x + xOffset, y + yOffset);

      outputString += char;
      if ((i / 4) % img.width == img.width - 1) {
        outputString += "\n";
      }
    }
    // console.log(outputString);
  };

  p5.draw = () => {};

  function isInCanvas(x, y) {
    return 0 <= x && x <= p5.width && 0 <= y && y <= p5.height;
  }
  p5.mousePressed = () => {
    showHelp.value = false;
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
      case 67: //"c"
        navigator.clipboard.writeText(outputString);
        alert("Copied to clipboard");
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
    keys: "'c'",
    function: "Copy the ASCII text to clipboard",
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
