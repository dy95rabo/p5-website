//Global variables
let img;
let redImg;
let blueImg;
let greenImg;
let invertImg;
let grayImg;

const translationFactor = 10;
const alpha = 50;


const images = []
let currentImage = 0;

function swapImage() {
  currentImage++;
  if (currentImage >= images.length) {
    currentImage = 0;
  }
}

function preload() {
  img = loadImage(
    "../../img/glowing-spaceship-orbits-planet-starry-galaxy-generated-by-ai.jpg"
  );

  //I tried cloning the object but thats really difficult to do in javascript
  redImg = loadImage(
    "../../img/glowing-spaceship-orbits-planet-starry-galaxy-generated-by-ai.jpg"
  );
  blueImg = loadImage(
    "../../img/glowing-spaceship-orbits-planet-starry-galaxy-generated-by-ai.jpg"
  );
  greenImg = loadImage(
    "../../img/glowing-spaceship-orbits-planet-starry-galaxy-generated-by-ai.jpg"
  );

  invertImg = loadImage(
    "../../img/glowing-spaceship-orbits-planet-starry-galaxy-generated-by-ai.jpg"
  );
  grayImg = loadImage(
    "../../img/glowing-spaceship-orbits-planet-starry-galaxy-generated-by-ai.jpg"
  );

  images.push(img);
  images.push(redImg);
  images.push(greenImg);
  images.push(blueImg);
  images.push(invertImg);
  images.push(grayImg);





}
function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  loadPixels();
  img.loadPixels();
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


  img.updatePixels();
  redImg.updatePixels();
  blueImg.updatePixels();
  greenImg.updatePixels();

  invertImg.filter(INVERT);
  grayImg.filter(GRAY);
}

function draw() {
//   image(invertImg,0,0,width,height);


  //füge eine translation jeweils um 120 grad verschoben zur vorhärigen mit einer amplitude relativ zur mausposition ein

//   push()
//   translate(translationFactor * Math.cos(0), translationFactor * Math.sin(0))
//   image(redImg,0,0,width,height)
//   pop()

//   push()
//   translate(translationFactor * Math.cos(2/3*Math.PI), translationFactor * Math.sin(2/3*Math.PI))
//   image(blueImg,0,0,width,height)
//   pop()

//   push()
//   translate(translationFactor * Math.cos(4/3*Math.PI), translationFactor * Math.sin(4/3*Math.PI))
//   image(greenImg,0,0,width,height)
//   pop()


  image(images[currentImage], 0, 0, width, height);
}

function mousePressed() {
  swapImage();
}
