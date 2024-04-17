let seed;


function setup() {
  createCanvas(windowWidth, windowHeight);
  //   createCanvas(400, 400);
  // background(0,0,0);
  frameRate(10)
  seed = random(10000000)
  
}

function draw() {

  background(255);
  randomSeed(seed);
  strokeWeight(Math.sqrt(Math.pow(Math.abs(mouseX-width/2)/width,2) + Math.pow(Math.abs(mouseY-height/2)/height,2))*10);

  const cellNumbers = 60;
  const gridSize = width / cellNumbers;
  for (let x = 0; x < width; x += gridSize) {
    for (let y = 0; y < height; y += gridSize) {
      if (random(-1, 1) >= 0) {
        line(x, y, x + gridSize, y + gridSize);
      } else {
        line(x + gridSize, y, x, y + gridSize);
      }
    }
  }
}


function mousePressed(){
    seed = random(10000000)
}

