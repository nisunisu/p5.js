let current_angle = 0;
let t = 0;
let waitCount=30;
let my_easing;

let output_canvas;
function setup() {
  let p5Element = createCanvas(400, 400);
  frameRate(30);
  angleMode(DEGREES);
  // noFill();
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);
  my_easing = new myEasing();

  // output_canvas = new OutputCanvas(p5Element.canvas,"gif",180); // ファイル出力
}
function draw() {
  background(0, 0, 50);
  translate(width / 2, height / 2);
  push();
  rotate(current_angle);
  rect(0, 0, 30, 100);
  pop();

  // update
  if(waitCount <= 0 ){
    current_angle = my_easing.get(t) * 90;
    t += 0.02;
    if (t > 1) {
      t = 0;
      waitCount=30;
      current_angle=0;
    }
  }
  waitCount--;

  text(`angle : ${floor(current_angle)}
my_easing.get(t) : ${my_easing.get(t)}
t : ${t}`, -100, 100);

  // output_canvas.run(frameCount); // ファイル出力
}


class myEasing {
  constructor() {
    this.p = 0.1;
    this.s = 1.70158;
  }
  get(t) {
    if (t <= 0) {
      return 0;
    }
    if (t >= 1.0) {
      return 1.0;
    }
    let _angle = (t - this.s) * 2 / this.p
    return pow(2, -10 * t) * sin(_angle) + 1.0;
  }
}
