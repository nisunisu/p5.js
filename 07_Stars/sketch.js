

let moving_stars=new Array(100);
let static_stars;
let moving_rects;


function setup() {
  createCanvas(400,400);
  static_stars = new StaticStars(100);
  for (let i = 0; i < moving_stars.length; i++) {
    moving_stars[i] = new MovingStars(random()*TWO_PI,random(120));
  }
  moving_rects = new MovingRects(5);

}
function draw(){
  background(30);
  // static_stars.run(); 
  for (let i = 0; i < moving_stars.length; i++) {
    moving_stars[i].run();
    if(moving_stars[i].isOut === true){
      moving_stars[i] = new MovingStars(random()*TWO_PI,random(120));
    }
  }
  moving_rects.run();
}

class MovingRects{
  constructor(rect_num){
    this.rect_num=rect_num;
    this.rad =new Array(this.rect_num);
    this.wait_count =new Array(this.rect_num);
    this.isOutOfCanvas=new Array(this.rect_num);
    for (let i = 0; i < this.rect_num; i++) {
      this.rad[i]=0;
      this.wait_count[i]=10*i;
      this.isOutOfCanvas=false;
    }
  }
  run(){
    for (let i = 0; i < this.rect_num; i++) {
      if(this.wait_count[i] <= 0) {
        this.display(i);
        this.update_rad(i);
      }else{
        this.decrement_waitCount(i);
      }
      
      if(this.isOutOfCanvas === true){
        this.rad[i]=0;
        this.wait_count[i]=10*i;
        this.isOutOfCanvas=false;
      }
    }
  }
  display(i){
    push()
      rectMode(RADIUS);
      stroke(255);
      noFill();
      rect(width/2,height/2,this.rad[i],this.rad[i]);
    pop()
  }
  update_rad(i){
    this.rad[i]+=5;
    if(this.rad[i] > width/2){
      this.isOutOfCanvas = true;
    }
  }
  decrement_waitCount(i){
    this.wait_count[i]--;
  }
}

class StaticStars {
  constructor(num_stars){
    this.num_stars=num_stars;
    this.vc = new Array(this.num_stars);
    this.rad = new Array(this.num_stars);
    this.gray= new Array(this.num_stars);
    for (let i = 0; i < this.num_stars; i++) {
      this.vc[i] = createVector(random(width),random(height));
      this.rad[i] = random(1)
      this.gray[i] = random(120,250);
    }
  }
  run(){
    this.display();
  }
  display(){
    for (let i = 0; i < this.num_stars; i++) {
      fill(this.gray[i]);
      ellipse(this.vc[i].x,this.vc[i].y,this.rad[i],this.rad[i]);
    }
  }
}

class MovingStars {
  constructor(angle,waitCount){
    this.radius=0;
    this.radius_acceleration=0.1;
    this.angle=angle;
    this.diameter=1;
    this.isOut=false;
    this.count=0;
    this.waitCount=waitCount;
    this.isVisible=false;
  }

  run(){
    this.increment_waitCount();
    this.display_movingStars();
    this.move();
  }

  increment_waitCount(){
    if(this.count < this.waitCount){
      this.count++;
    }else{
      this.isVisible=true;
    }
  }

  display_movingStars(){
    if(this.isVisible===true){
      push()
        translate(width/2,height/2);
        noStroke();
        let xPos = this.radius * cos(this.angle);
        let yPos = this.radius * sin(this.angle);
        // 画面の外に行くほど白くする
        let gray=map(this.radius,0,width/2,100,255);
        fill(gray);
        ellipse(xPos,yPos,this.diameter,this.diameter);
      pop()
    }
  }

  move(){
    if(this.isVisible===true){
      if(this.radius < sqrt(2) * width/2 + this.diameter){
        this.radius_acceleration+=0.1;
        this.radius+= 2 + this.radius_acceleration;
        this.diameter+=0.03;
      }else{
        this.isOut=true;
      }
    }
  }
}