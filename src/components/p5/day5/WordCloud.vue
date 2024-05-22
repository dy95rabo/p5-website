<script setup>
import { onBeforeUnmount } from "vue";
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

  let maxX = 0;
  let dx = 1;
  let maxY = 0;
  let dy = 0;

  let centerX;
  let centerY;

  let xTranslation = 50;
  let yTranslation = 30;

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
    centerX = p5.width / 2;
    centerY = p5.height / 2;
    p5.translate(centerX, centerY);
    p5.strokeWeight(20);
  };

  p5.draw = () => {
    // p5.translate(centerX + currX * xTranslation, centerY + currY * yTranslation);

    p5.background(0,0,0,20)
    // p5.point(0, 0);
    // p5.push();
    let word = getRandomKey(words);
    p5.textSize(Math.sqrt(words.get(word)) * 10);
    p5.textAlign(p5.CENTER);
    p5.fill(p5.random(0,255),p5.random(0,255),p5.random(0,255),)
    // p5.text(word, 0, 0);
    p5.text(word, p5.random(0,p5.width*0.9), p5.random(10,p5.height*0.9));
    // words.delete(word)
    // p5.pop();
  };

  p5.mousePressed = () => {};

  p5.mouseWheel = (event) => {};
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
