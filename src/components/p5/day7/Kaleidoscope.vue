<script setup>
import { onBeforeUnmount, ref } from "vue";
import PopUpCard from "@/components/PopUpCard.vue";
const showHelp = ref(false);
let p5Instance = null;

const sketch = (p5) => {
  p5Instance = p5;
  const WHITE = 0;
  const SELECT = 1;
  const FLUID = 2;
  const modeNames=[
    "White",
    "Select",
    "Fluid"
  ]

  let mouseDown = false;
  let previous;
  let colorChangeRatePerSecond = 120;
  let white = p5.color(255);
  p5.colorMode(p5.HSB);
  let c = p5.color(0, 100, 100);
  let colorMode = 0;
  const maxColorMode = 2;


  let timer;
  let showColorChange = false;
  const radius = 80;
  const colorDisplay = p5.createDiv();
  colorDisplay.hide();
  colorDisplay.size(radius*2,radius*2);
  colorDisplay.addClass("rounded-circle position-absolute top-50 start-50 translate-middle fs-1 justify-content-center align-items-center");
  colorDisplay.style("background-color",c);
  colorDisplay.style("z-index","999");

  let canvas;

  p5.preload = () => {};

  p5.setup = () => {
    canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    canvas.style("z-index","0");
    p5.background(0);
    p5.frameRate(200);
  };

  p5.draw = () => {
    p5.translate(p5.width * 0.5, p5.height * 0.5);
    if (mouseDown) {
      let mousePos = p5.createVector(
        p5.mouseX - p5.width * 0.5,
        p5.mouseY - p5.height * 0.5
      );
      let mirrors = Array(8).fill(0);
      mirrors[0] = mousePos;
      mirrors[1] = p5.createVector(-mousePos.x, mousePos.y);
      mirrors[2] = p5.createVector(mousePos.x, -mousePos.y);
      mirrors[3] = p5.createVector(-mousePos.x, -mousePos.y);
      mirrors[4] = p5.createVector(mousePos.y, mousePos.x);
      mirrors[5] = p5.createVector(-mousePos.y, mousePos.x);
      mirrors[6] = p5.createVector(mousePos.y, -mousePos.x);
      mirrors[7] = p5.createVector(-mousePos.y, -mousePos.x);
      let color;
      switch (colorMode) {
        case WHITE:
          color = white;
          break;
        case SELECT:
          color = c;
          break;
        case FLUID:
          c = p5.color(
            c._getHue() + (colorChangeRatePerSecond * p5.deltaTime) / 1000,
            100,
            100
          );
          color = c;
          break;
        default:
          break;
      }
      p5.push();
      p5.strokeWeight(4);
      p5.stroke(color);
      if (previous) {
        mirrors.forEach((p, i) => {
          p5.line(p.x, p.y, previous[i].x, previous[i].y);
        });
      }
      p5.pop();
      previous = mirrors;
    }
    if(showColorChange){
      colorDisplay.style("background-color",(colorMode==0)?white:c);
      colorDisplay.addClass("d-flex")
      colorDisplay.html('<p>' + modeNames[colorMode]+ '</p>')
      colorDisplay.show();
      }else{
        colorDisplay.removeClass("d-flex")
      colorDisplay.hide();
    }

  };

  function isInCanvas(x, y) {
    return 0 <= x && x <= p5.width && 0 <= y && y <= p5.height;
  }



  p5.mousePressed = () => {
    showHelp.value = false;
    if (!isInCanvas(p5.mouseX, p5.mouseY)) {
      return;
    }
    if (p5.mouseButton === p5.LEFT && !mouseDown) {
      previous = 0;
    }
    if (p5.mouseButton === p5.LEFT || p5.mouseButton === p5.RIGHT) {
      mouseDown = true;
    } else {
      colorMode++;
      if (colorMode > maxColorMode) {
        colorMode = WHITE;
      }
      displayColorChange();
    }
  };

  p5.mouseDragged = () => {};

  p5.mouseReleased = () => {
    mouseDown = false;
  };

  p5.mouseWheel = (event) => {
    if (colorMode == SELECT) {
      if (event.delta > 0) {
        c = p5.color(c._getHue() + 10, 100, 100);
      } else {
        let hue = c._getHue() - 10;
        if (hue < 0) {
          hue += 360;
        }
        c = p5.color(hue, 100, 100);
      }
      displayColorChange();
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
        p5.background(0);
        previous = null;
        break;
      default:
        break;
    }
  };

  function displayColorChange() {
    showColorChange = true;
    clearTimeout(timer);
    timer = setTimeout(() => {
      showColorChange = false;
    }, 1000);
  }

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
    keys: "'hold left mouse'",
    function: "draw line (always starts a new Line)",
  },
  {
    keys: "'hold right mouse'",
    function: "draw line (always connects to were last line ended)",
  },
  {
    keys: "'click middle mouse button'",
    function: "change color mode",
  },
  {
    keys: "'scroll mouse wheel'",
    function: "change color (only during 'Select' mode)",
  },
  {
    keys: "'ESC'",
    function: "clean canvas",
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
