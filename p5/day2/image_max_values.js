//Global variables
let img;





function preload() {
  img = loadImage(
    "../../img/glowing-spaceship-orbits-planet-starry-galaxy-generated-by-ai.jpg"
  );







}
function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);


  img.loadPixels();



  for (let i = 0; i < img.pixels.length; i+=4) {
    let maxValue = img.pixels[i+0];
    if (img.pixels[i+1]>maxValue) {
      maxValue = img.pixels[i+1]
    }
    if (img.pixels[i+2]>maxValue) {
      maxValue = img.pixels[i+2]
    }

    for (let x = 0; x < 3; x++) {
      if(img.pixels[i+x]<maxValue){
        img.pixels[i+x] = 0
      }
      
    }

  }


  img.updatePixels();


  image(img, 0, 0, width, height);

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


}

function mousePressed() {
}