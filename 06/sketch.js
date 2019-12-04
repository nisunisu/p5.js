// 写経
// https://github.com/nature-of-code/noc-examples-p5.js/tree/master/chp02_forces/NOC_2_06_attraction

function setup(){
  createCanvas(640,360);
  textAlign(CENTER,CENTER);
  m=new Mover();
  a=new Attractor();
}
function draw(){
  background(255);
  
  let force = a.attract(m);
  m.applyForce(force);
  m.update();
  
  a.display();
  m.display();
}

class Attractor{
  constructor (){
    this.mass=20;
    this.location = createVector(width/2,height/2);
    this.G=0.4;
  }
  attract(mover){
    let force=p5.Vector.sub(this.location,mover.location); //力のベクトル
    let distance = force.mag(); // ベクトルの大きさ = 距離
    distance=constrain(distance,5,25); // 5-25の間の値に制限する
    force.normalize(); // 一旦正規化
    let strength = (this.G*this.mass)/(distance*distance); // F=G*M*m/(r^2) ... 万有引力の法則
    force.mult(strength);
    return force
  }
  
  display(){
    stroke(0);
    fill(175,200);
    ellipse(this.location.x,this.location.y,this.mass*2,this.mass*2);
    text("Attractor",this.location.x,this.location.y);
  }
}

class Mover{
  constructor(){
    this.mass=1;
    this.rad=16
    this.location=createVector(30,30);
    this.velocity=createVector(0,0);
    this.acceleration=createVector(0,0);
  }
  applyForce(force){
    let f = p5.Vector.div(force,this.mass);
    this.acceleration.add(f);
  }
  update(){
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0); // 加速度を維持していると次フレームでとんでもないことになるので初期化
  }
  display(){
    stroke(0);
    fill(175);
    ellipse(this.location.x,this.location.y,this.rad,this.rad);
  }
}
