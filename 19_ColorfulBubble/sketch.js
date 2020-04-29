let rad_base = 150;
function setup() {
  createCanvas(400, 400);
  colorMode(HSB,360,100,100,100);
  angleMode(DEGREES);
  noFill();
  blendMode(ADD);
  stroke(0,0,40);
  noLoop();
}

function draw() {
  background(0,0,10);
  translate(width/2, height/2);
  
  for (let angle = 0; angle < 1800 ;  angle+= 5.7) {
    const _rad = map(angle, 0, 1800, 250, 10);
    const _x = _rad * cos(angle);
    const _y = _rad * sin(angle);
    const _hue    = random(360);
    const _size   = random(2, 60);
    fill(_hue, 80, 80, 30);
    push()
    rotate(angle);
    ellipse(_x, _y, _size*0.4, _size);
    pop()
  }
}