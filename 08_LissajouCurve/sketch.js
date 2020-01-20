let r1=180;
let r2=120;
let r3=80;
let r4=50;
let angle_1=0;
let angle_2=0;
let angle_3=0;
let extraCanvas;

// GIF出力用変数
// live-p5が外部ファイル読み込みに対応していないため、GIF出力が必要な時以外はコメントアウトする
// let capturer = new CCapture({
//   format: 'gif',
//   workersPath: '../gif.js/dist/',
//   verbose: true
// });
// let canvas;

function setup(){
  // let p5Canvas = createCanvas(400, 400);
  // canvas = p5Canvas.canvas;
  createCanvas(400,400);
  extraCanvas=createGraphics(400,400);
  colorMode(HSB,360,100,100);
  // GIF出力開始
  // capturer.start();
}

function draw(){
  background(0,0,20);
  noFill();

  let x0=width/2;
  let y0=height/2;
  stroke(0,80,100);
  ellipse(x0,y0,5,5);
  ellipse(x0,y0,r1*2,r1*2); 

  let x1=x0 + (r1 - r2) * cos(radians(angle_1));
  let y1=y0 + (r1 - r2) * sin(radians(angle_1));
  stroke(90,80,100);
  ellipse(x1,y1,5,5);
  ellipse(x1,y1,r2*2,r2*2); 

  let x2=x1 + (r2 - r3) * cos(radians(angle_2));
  let y2=y1 + (r2 - r3) * sin(radians(angle_2));
  stroke(180,80,100);
  ellipse(x2,y2,5.5);
  ellipse(x2,y2,r3*2,r3*2); 

  let x3=x2 + (r3 - r4) * cos(radians(angle_3));
  let y3=y2 + (r3 - r4) * sin(radians(angle_3));
  stroke(270,80,100);
  ellipse(x3,y3,5.5);
  ellipse(x3,y3,r4*2,r4*2); 

  extraCanvas.fill(0,0,100);
  extraCanvas.ellipse(x3,y3,2,2);
  image(extraCanvas,0,0);

  update();
  
  // GIF出力
  // if(frameCount <= 360){
  //   capturer.capture(canvas);
  // }else{
  //   // GIF出力と同時にdraw()も終了する
  //   capturer.stop();
  //   capturer.save();
  //   noLoop();
  // }
}
function update(){
  angle_1++;
  angle_2+=3;
  angle_3+=5;
}

// ----------------------------------------------------------

class CircleInscribedInCircle{
  // a circle inscribed in a circle : 円に内接する円
  constructor(my_radius,outercircle_x,outercircle_y,outercircle_radius){
    this.my_radius=my_radius;
    this.my_diameter=this.my_radius*2;
    this.my_angle=0;
    this.outercircle_x=outercircle_x;
    this.outercircle_y=outercircle_y;
    this.outercircle_radius=outercircle_radius;
  }
  display(){
    let xPos=this.outercircle_x + (this.outercircle_radius - this.my_radius) * cos(radians(this.my_angle));
    let yPos=this.outercircle_y + (this.outercircle_radius - this.my_radius) * sin(radians(this.my_angle));
    ellipse(xPos,yPos,this.my_diameter,this.my_diameter);
  }
}