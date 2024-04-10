function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let r,g,b = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0,0,0)
//   background(0,240,255);
  
  
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
  
//   for(let i = 0; i <= width;i+=20){
//     stroke("green");
//     line(0,i,width,i);
    
//     stroke("red");
//     line(i,0,i,height);
//   }
}

function draw() {
   frameRate(60)

  background(0,0,0,5)
  
  stroke(random(255),random(255), random(255));
  let x = random(0,width);
  let y = random(0,height);
  
  line(width/2,height/2,x,y)
  // line(x,y,y,x)
  // print(frameRate())
}

function mousePressed(){
  clear()
  background(0,0,0)
}
