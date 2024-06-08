<script setup>
import { onBeforeUnmount, ref } from "vue";
import PopUpCard from "@/components/PopUpCard.vue";
const showHelp = ref(false);
let p5Instance = null;
const sketch = (p5) => {
  p5Instance = p5;
  // ####################      CONSTANTS     #######################################
  let text;

  let words = new Map();
  //Key:    String (word)
  //Value:  Int count

  const MIN_OCCURRENCE = 20;
  // ####################      Classes     #######################################
  // ####################      WORD     #######################################

  let centerX;
  let centerY;



  // returns random key from Set or Map
  function getRandomKey(collection) {
    return p5.random(Array.from(collection.keys()));
  }

  // ####################      P5 Functions     #######################################
  p5.preload = () => {
    text = p5.loadStrings("../../src/assets/shakespeare2.txt");
  };

  p5.setup = () => {
    text = text.join(" ");
    let wordsArray = text
      .toLowerCase()
      .replace(/[^a-zA-Z]/g, " ")
      .replace(/[^\w\s]|_/g, function ($1) {
        return " " + $1 + " ";
      })
      .replace(/[ ]+/g, " ")
      .trim()
      .split(" ");

    for (let i = 0; i < wordsArray.length - 1; i++) {
      const word = wordsArray[i];
      words.set(word, words.has(word) ? words.get(word) + 1 : 1);
    }
    words = new Map([...words].filter(([k, v]) => v > MIN_OCCURRENCE));
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(0, 0, 0);
    p5.frameRate(10);

  };

  p5.draw = () => {
    p5.background(0,0,0,50)
    let word = getRandomKey(words);
    p5.textSize(Math.sqrt(words.get(word)) * 15);
    p5.textAlign(p5.CENTER);
    p5.fill(p5.random(0,255),p5.random(0,255),p5.random(0,255),)
    p5.text(word, p5.random(p5.width*0.1,p5.width*0.9), p5.random(p5.height*0.1,p5.height*0.9));

  };

  p5.mousePressed = () => {
    showHelp.value = false
  };

  p5.mouseWheel = (event) => {};

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
