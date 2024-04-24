//Global variables

function preload() {}

function setup() {
  // createCanvas(100, 100);
  createCanvas(windowWidth, windowHeight);

  background(0, 150, 0);

  // noFill();
  // beginShape();
  // vertex(20,20);
  // vertex(80,20);
  // vertex(80,80);
  // vertex(20,80);
  // endShape();
  // endShape(CLOSE);

  noFill();





//   point(220,240);
//   line(0,0,400,400);
  
//   stroke("black")
//   strokeWeight(3)
  
//   triangle(10,200,30,400,50,60)
//   square(30,50,20)
//   rect(300,200,20,60,5)
//   circle(60,300,50)
//   strokeWeight(10);
//   background(0);
//     frameRate(60)

  
}

function draw() {
  clear();
  beginShape();
  curveVertex(20,20);
  curveVertex(20,20);

  curveVertex(mouseX,mouseY);
  curveVertex(80,80);
  curveVertex(20,80);
  curveVertex(20,80);
  endShape();


}
