let num=20
let unit_angle=360/num;
let rad=100;
let baseangle=0;
let tate=50;
let yoko=150
let tate_add=-4;
let yoko_add=6;

function setup() {
  createCanvas(350, 350);
  colorMode(HSB,360,100,100,100);
  blendMode(ADD);
  frameRate(30);
  textAlign(CENTER, CENTER);
  angleMode(DEGREES);
}

function draw() {
  clear();
  background(5,100);
  // line(width/2, 0, width/2, height);  // for debug
  // line(0, height/2, width, height/2); // for debug
  // let _cnt=0; // for debug
  if(tate > 60 || tate < 30 ) { tate_add *= -1 }
  if(yoko > 250 || yoko < 110 ) { yoko_add *= -1 }
  tate += tate_add;
  yoko += yoko_add;
  for(let i=0; i<num; i++){
    const angle=unit_angle*i + baseangle;
    const _x=width /2 + rad*cos(angle);
    const _y=height/2 + rad*sin(angle);
    push()
      translate(_x, _y);
      rotate(angle);
      fill(unit_angle*i,100,100,15);
      stroke(unit_angle*i,100,100,50);
      // text(_cnt,0,0) // for debug
      ellipse(0,0,tate,yoko);
    pop()
    // _cnt++; // for debug
  }
  baseangle+=2;
}