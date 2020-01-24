let root_circle_radius;
let root_circle_x;
let root_circle_y;
let num=5;
let ciic=[];
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
  colorMode(HSB,360,0,0);
  noFill(); 
  root_circle_radius=170;
  root_circle_x=width/2;
  root_circle_y=height/2; 
  let _radius=root_circle_radius;
  for(let i=0; i<num; i++){
    ciic[i] = new CircleInscribedInCircle(_radius*0.8,360/num*i);
    _radius = ciic[i].radius;
  }
  // GIF出力開始
  // capturer.start();
}

function draw(){
  background(0,0,100);

  // 一番外側のx,y,radを設定
  let _x=root_circle_x;
  let _y=root_circle_y;
  let _radius=root_circle_radius;
  for (let i = 0; i < num; i++) {
    ciic[i].run(_x,_y,_radius);

    // 次のforのためにパラメータをアップデート
    _x =ciic[i].get_my_circle_xPos();
    _y =ciic[i].get_my_circle_yPos();
    _radius=ciic[i].get_my_circle_radius();
  }

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

class CircleInscribedInCircle{
  // a circle inscribed in a circle : 円に内接する円
  constructor(my_radius,hue){
    this.radius=my_radius;
    this.dia=this.radius*2;
    this.angle=0;
    this.angle_add=random(1,5);
    this.xPos;
    this.yPos;
    this.hue=hue;
  }
  run(outercircle_x,outercircle_y,outercircle_radius){
    this.set_my_circle_position(outercircle_x,outercircle_y,outercircle_radius);
    this.display_my_circle();
    this.update_angle();
  }
  set_my_circle_position(outercircle_x,outercircle_y,outercircle_radius){
    this.xPos=outercircle_x + (outercircle_radius - this.radius) * cos(radians(this.angle));
    this.yPos=outercircle_y + (outercircle_radius - this.radius) * sin(radians(this.angle));
  }
  display_my_circle(){
    push();
      stroke(this.hue,80,80);
      ellipse(this.xPos, this.yPos, 5, 5);
      ellipse(this.xPos, this.yPos, this.radius*2, this.radius*2);
    pop();
  }
  update_angle(){
    this.angle+=this.angle_add;
  }
  get_my_circle_xPos(){
    return this.xPos;
  }
  get_my_circle_yPos(){
    return this.yPos;
  }
  get_my_circle_radius(){
    return this.radius;
  }
}