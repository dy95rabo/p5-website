let r,g,b = 0;

const maxRadius = 100;
const minRadius = 30;
const bubbleSpeed = -4;

// let bubbles = []



const bubbleMap = new Map()

function generateId(){
        let newID = 0;
        while(bubbleMap.has(newID)){
            newID++;
        }
        return newID
}

function updateAllBubbles(){
        // console.log("is working")
        for (const bubble of bubbleMap.values()) {
        // console.log("in loop")

            bubble.update()
            bubble.draw()
        }
    }

function checkClick(mouseX,mouseY){
        for (const bubble of bubbleMap.values()) {
            if(bubble.isInside(mouseX,mouseY)){
                bubble.pop()
            }
        }
    }

class Bubble{

    
    constructor(){
        this.rad = random(minRadius,maxRadius)
        this.x = random(0,width)
        this.startX = this.x
        this.y = height + this.rad
        
        this.r = random(255)
        this.g = random(255)
        this.b = random(255)
    
        this.vX = 0
        this.vY = bubbleSpeed

        this.noiseOffset = random(100)
        this.noiseScale = random(0.001)
        this.noiseLevel = (120-this.rad) * 40

        this.isVisible = true

        this.id = generateId()
        bubbleMap.set(this.id,this)
    }

    draw(){
        fill(this.r,this.g,this.b, this.isVisible?255:0)
        stroke(0)
        circle(this.x,this.y,this.rad)
    }

    isInside(x,y){
        return ((x-this.x)*(x-this.x)+(y-this.y)*(y-this.y))<=(this.rad*this.rad)
    }

    update(){
        // this.x = this.startX + this.noiseLevel * (noise(this.noiseScale * frameCount + this.noiseOffset) - 2*noise(0)/3)
        this.vX += random(-1,1);
        this.x += this.vX
        this.y += this.vY
        if(this.isOffscreen()){
            this.pop()
        }
    }

    pop(){
        // this.isVisible = false
        bubbleMap.delete(this.id)

    }

    isOffscreen(){
        return this.y+this.rad<0
    }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0,0,0)
}

function draw() {
    frameRate(60)
    background(0)

    // let deleteBubbles = []
    if(random(10)>=9){
        // bubbles.push(new Bubble())
       new Bubble()
    }

    updateAllBubbles()


  
    // bubbles.forEach((bubble,index) =>{
    //     bubble.draw();
    //     bubble.update()
    //     if(bubble.isOffscreen()){
    //         deleteBubbles.push(index)
    //     }
    // });

    // while (deleteBubbles.length>0) {
    //     const deleted = bubbles.splice(deleteBubbles.pop(),1)

    //     // console.log(deleted[0])
    // }
 
}

function mousePressed(){

    checkClick(mouseX,mouseY);


    // bubbles.forEach(bubble =>{
    //     if(bubble.isInside(mouseX,mouseY)){
    //         bubble.pop()
    //     }
    // });
}

