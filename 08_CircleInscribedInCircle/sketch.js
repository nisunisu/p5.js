let root_circle_radius;
let root_circle_x;
let root_circle_y;
let num=50;
let ciic=[];
let output_canvas; // ファイル出力

function setup(){
  let p5Element = createCanvas(400,400);
  colorMode(HSB,360,100,100,100);
  noFill(); 
  root_circle_radius=270;
  root_circle_x=width/2;
  root_circle_y=height/2; 
  let _radius=root_circle_radius;
  for(let i=0; i<num; i++){
    let _hue=map(_radius*0.9,0,width/2,0,280);
    ciic[i] = new CircleInscribedInCircle(_radius*0.9,_hue,(i+1)*2);
    _radius = ciic[i].radius;
  }

  // output_canvas = new OutputCanvas(p5Element.canvas,"gif",180); // ファイル出力
}

function draw(){
  background(0,0,100,5);

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

  // output_canvas.run(frameCount); // ファイル出力
}

class CircleInscribedInCircle{
  // a circle inscribed in a circle : 円に内接する円
  constructor(my_radius,hue,angle_add){
    this.radius=my_radius;
    this.dia=this.radius*2;
    this.angle=0;
    this.angle_add=angle_add;
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
