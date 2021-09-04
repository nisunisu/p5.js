let rad=100;
let baseangle=0;

function setup() {
  createCanvas(400, 400);
  colorMode(HSB,360,100,100,100);
  blendMode(ADD);
  frameRate(3);
  textAlign(CENTER, CENTER);
  angleMode(DEGREES);
  stroke(0,0,100)
}

function draw() {
  clear();
  background(30,100);
  // line(width/2, 0, width/2, height);  // for debug
  // line(0, height/2, width, height/2); // for debug
  for(let i=0; i<8; i++){
    const angle=45*i + baseangle;
    const _x=width /2 + rad*cos(angle);
    const _y=height/2 + rad*sin(angle);
    push()
      translate(_x, _y);
      rotate(angle);
      stroke(45*i,100,100);
      text(i,0,0)
      ellipse(0,0,40,110);
    pop()
  }
  baseangle+=2;
}