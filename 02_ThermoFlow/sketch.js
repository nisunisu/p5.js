let xoff;
let yoff;
const num=10;
let side;
let hue_add=100;

function setup() {
  createCanvas(400, 400);
  colorMode(HSB,360,100,100,100);
  frameRate(5);
  // rectMode(CENTER);
  // blendMode(ADD);
  strokeWeight(3);
  
  xoff=random(300);
  yoff=0;
  side=width/num;
}

function draw() {
  background(0,0,0,2);
  for(let y=0; y<height; y+=side){
    for(let x=0; x<width; x+=side){
      const thisXoff=xoff+x/500;
      const thisYoff=yoff+y/500;
      const hue=360*noise(thisXoff,thisYoff);
      fill(hue,80,100,70);
      stroke(0,20,70,70);
      rect(x,y,side,side);
    }
  }
  
  //update
  xoff+=0.05;
  yoff+=0.07;
}