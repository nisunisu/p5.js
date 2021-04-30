let ricochet_num = 20;
let ricochet = [];
function setup() {
  createCanvas(400, 400);
  colorMode(HSB,360,100,100,100);
  // noLoop();
  blendMode(ADD);
  noStroke();
  ellipseMode(RADIUS);
  for(let i = 0 ; i < ricochet_num; i++){
    ricochet[i] = new Ricochet ();
  }
}

function draw() {
  clear();
  for (let i = 0; i < ricochet_num; i++) {
    ricochet[i].run();
  }
}

// Ricochet : 跳弾
class Ricochet{
  constructor(){
    let _x=random(width);
    let _y=random(height);
    this.location=createVector(_x, _y);
    
    // velocity : Vector from the center of the Canvas
    let _center=createVector(width/2, height/2);
    this.velocity=p5.Vector.sub(this.location, _center);
    this.velocity.normalize();

    this.acceleration=createVector(0, 0);
    this.radius=3;
  }
  run(){
    this.display();
    this.update_velocity();
    this.update_location();
    this.bounce();
  }
  display(){
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = color(0, 60, 80);
    fill(0,60,80)
    ellipse(this.location.x, this.location.y, this.radius, this.radius);
    ellipse(this.location.x, this.location.y, this.radius-1, this.radius-1);
  }
  update_location(){
    this.location.add(this.velocity);
  }
  bounce(){
    if(this.location.x + this.radius >= width  || this.location.x - this.radius <= 0){
      this.velocity.x *= -1;
      this.acceleration.x *= -1;
    }
    if(this.location.y + this.radius >= height || this.location.y - this.radius <= 0){
      this.velocity.y *= -1;
      this.acceleration.y *= -1;
    }
  }
  update_velocity(){
    this.velocity.add(this.acceleration);
  }
}