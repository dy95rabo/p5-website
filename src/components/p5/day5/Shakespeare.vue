<script setup>
import { onBeforeUnmount, ref } from "vue";
import PopUpCard from "@/components/PopUpCard.vue";
const showHelp = ref(false);
let p5Instance = null;
const sketch = (p5) => {
  p5Instance = p5;
  // ####################      CONSTANTS     #######################################
  let text;

  const CHAIN = new Map();
  //Key:    String (word)
  //Value:  Word (obj)

  let output;
  let currentWord;
  // ####################      Classes     #######################################
  // ####################      FrameRateManager     #######################################
  class FrameRateManager {
    constructor(
      min = 1,
      max = 60,
      start = 10,
      positionPercentageX = 0.5,
      positionPercentageY = 0.5,
      radius = 70
    ) {
      this.x = p5.width * positionPercentageX;
      this.y = p5.height * positionPercentageY;
      this.radius = radius;
      this.min = min;
      this.max = max;
      this.current = start;
      this.timer;
      this.show = false;
      this.timerDurationMilli = 500;
      this.textSize = 90;
    }

    update(delta) {
      if (delta > 0) {
        this.current++;
        if (this.current > this.max) {
          this.current = this.max;
        }
      } else {
        this.current--;
        if (this.current < this.min) {
          this.current = this.min;
        }
      }
      this.setFrameRate();
      this.displayChange();
    }

    setFrameRate() {
      p5.frameRate(this.current);
    }

    displayChange() {
      this.draw();
      this.show = true;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.show = false;
      }, this.timerDurationMilli);
    }

    draw() {
      p5.push();
      p5.fill(127, 127, 127);
      p5.strokeWeight(3);
      p5.stroke(0);
      p5.circle(this.x, this.y, this.radius * 2);
      p5.pop();
      p5.push();
      p5.textSize(this.textSize);
      p5.textAlign(p5.CENTER);
      p5.text(this.current, this.x, this.y + this.textSize * 0.35);
      p5.pop();
    }
  }
  // ####################      WORD     #######################################

  class Word {
    constructor() {
      this.totalCount = 0;
      this.nextWords = new Map(); //Key:    String (word)
      //Value:  Number (count)
    }

    getRandomNext() {
      let randomNumber = p5.random(0, this.totalCount);
      let runningCount = 0;
      for (let [nextWord, count] of this.nextWords) {
        runningCount += count;
        if (runningCount > randomNumber) {
          return nextWord;
        }
      }
      return "Error";
    }

    addNextWord(nextWord) {
      this.totalCount++;
      if (this.nextWords.has(nextWord)) {
        this.nextWords.set(nextWord, this.nextWords.get(nextWord) + 1);
        return;
      }
      this.nextWords.set(nextWord, 1);
    }
  }

  // returns random key from Set or Map
  function getRandomKey(collection) {
    return p5.random(Array.from(collection.keys()));
  }

  function needsNoWhitespaceInFront(str) {
    return /[.,\/#!$?%\^&\*)}\];:=~({\[`]/g.test(str);
  }

  function needsNoWhitespaceAfter(str) {
    return /[({\[`]/g.test(str);
  }

  function startsWithCapitalLetter(str) {
    return /^[A-Z]/.test(str);
  }

  function getFirstWord() {
    do {
      currentWord = getRandomKey(CHAIN);
    } while (!startsWithCapitalLetter(currentWord));
    output = currentWord;
  }

  let frameRateManager;
  // ####################      P5 Functions     #######################################
  p5.preload = () => {
    text = p5.loadStrings("../../src/assets/shakespeare2.txt");
  };

  p5.setup = () => {
    text = text.join("\n");
    let wordsArray = text
      .replace(/[^\w\s]|_/g, function ($1) {
        return " " + $1 + " ";
      })
      .replace(/[ ]+/g, " ")
      .split(" ");

    for (let i = 0; i < wordsArray.length - 1; i++) {
      const word = wordsArray[i];
      const nextWord = wordsArray[i + 1];
      if (!CHAIN.has(word)) {
        CHAIN.set(word, new Word());
      }
      CHAIN.get(word).addNextWord(nextWord);
    }
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(127, 127, 127);

    getFirstWord();

    frameRateManager = new FrameRateManager();
    frameRateManager.setFrameRate();
  };

  p5.draw = () => {
    if (output.length < 1500) {
      let previousWord = currentWord;
      currentWord = CHAIN.get(currentWord).getRandomNext();
      if (
        !(
          needsNoWhitespaceInFront(currentWord) ||
          needsNoWhitespaceAfter(previousWord)
        )
      ) {
        output += " ";
      }
      output += currentWord;
    }

    p5.clear();
    p5.background(127, 127, 127);

    let x = p5.width / 2;
    p5.push();
    p5.textSize(25);
    p5.textAlign(p5.CENTER);
    p5.text(output, x, 30);
    p5.pop();
    if (frameRateManager.show) {
      frameRateManager.draw();
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
    output = "";
    getFirstWord();
  };

  p5.mouseWheel = (event) => {
    frameRateManager.update(event.delta);
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
    function: "reset the text",
  },
  {
    keys: "'scroll-up'/'scroll-down'",
    function: "increase/decrease the frame rate (1-60)",
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
