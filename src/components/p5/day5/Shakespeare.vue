<script setup>
const sketch = (p5) => {
  // ####################      CONSTANTS     #######################################
  let text;

  const CHAIN = new Map();
  //Key:    String (word)
  //Value:  Word (obj)

  let output;
  let currentWord;
  // ####################      Classes     #######################################
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
    return /[.,\/#!$?%\^&\*)}\];:=~]/g.test(str);
  }

  function needsNoWhitespaceAfter(str) {
    return /[({\[`]/g.test(str);
  }

  function startsWithCapitalLetter(str) {
    return /^[A-Z]/.test(str);
  }

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
    p5.frameRate(5);

    do {
      currentWord = getRandomKey(CHAIN);
      console.log(currentWord + " -> " + startsWithCapitalLetter(currentWord));
    } while (!startsWithCapitalLetter(currentWord));
    output = currentWord;
  };

  p5.draw = () => {
    if (output.length > 1500) return;
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

    p5.clear();
    p5.background(127, 127, 127);

    let x = p5.width / 2;
    p5.push();
    p5.textSize(25);
    p5.textAlign(p5.CENTER);
    p5.text(output, x, 30);
    p5.pop();
  };

  p5.mousePressed = () => {};

  p5.mouseWheel = (event) => {
    if (event.delta > 0) {
    } else {
    }
  };
};
</script>

<template>
  <P5 :sketch="sketch" />
</template>
