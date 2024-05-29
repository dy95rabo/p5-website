//Global variables
<script setup>
import { onBeforeUnmount } from "vue";
let p5Instance = null;

const sketch = (p5) => {
  p5Instance = p5;

  const AXIOM = "F";
  let sentence = AXIOM;
  let clickCounter = 0;
  let len;
  // const ALPHA_REDUCTION_RATE = 0.5;
  // let alpha = 100/ALPHA_REDUCTION_RATE;
  let angle = p5.radians(25);
  let rules = [];
  rules.push({ current: "F", next: "FF+[+F-F-F]-[-F+F+F]" });

  function interpret(string) {
    p5.background(51);
    p5.resetMatrix();
    p5.translate(p5.width / 2, p5.height);
    p5.stroke(255,50);
    for (let i = 0; i < string.length; i++) {
      switch (string.charAt(i)) {
        case "F":
          p5.line(0, 0, 0, -len);
          p5.translate(0, -len);
          break;
        case "[":
          p5.push();
          break;
        case "]":
          p5.pop();
          break;
        case "+":
          p5.rotate(angle);
          break;
        case "-":
          p5.rotate(-angle);
          break;
        default:
          break;
      }
    }
  }

  function iterate() {
    len *= 0.5;
    // alpha*=ALPHA_REDUCTION_RATE;
    var next = "";
    for (let i = 0; i < sentence.length; i++) {
      let current = sentence.charAt(i);
      let found = false;
      for (let j = 0; j < rules.length; j++) {
        if (current == rules[j].current) {
          found = true;
          next += rules[j].next;
          break;
        }
      }
      if (!found) {
        next += current;
      }
    }
    sentence = next;
    interpret(sentence);
  }

  p5.preload = () => {};

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(51);
    len = p5.height / 4;
    interpret(sentence);
  };

  p5.draw = () => {};

  function isInCanvas(x, y) {
    return 0 <= x && x <= p5.width && 0 <= y && y <= p5.height;
  }
  p5.mousePressed = () => {
    if (!isInCanvas(p5.mouseX, p5.mouseY)) {
      return;
    }
    if (clickCounter > 5) {
      return;
    }
    clickCounter++;
    iterate();
  };

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
        break;
      case 39: //Arrow Right
      case 68: //"d"
        break;
      case 37: //Arrow Right
      case 65: //"a"
        break;
      case 27: //"ESC"
        sentence = AXIOM;
        clickCounter = 0;
        len = p5.height/3;
        p5.clear()
        p5.background(51);
        p5.translate(p5.width*0.5,p5.height)
        interpret(sentence);
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
</script>

<template>
  <P5 :sketch="sketch" @wheel.prevent @touchmove.prevent @scroll.prevent/>
</template>
