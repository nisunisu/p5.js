// 写経
// https://github.com/nature-of-code/noc-examples-p5.js/tree/master/chp02_forces/NOC_2_06_attraction

let output_canvas; // ファイル出力

function setup(){
  let p5Element = createCanvas(500,500);
  textAlign(CENTER,CENTER);
  m=new Mover(1);     // 物体
  a=new Attractor(20); // 引力を持つモノ
  // output_canvas = new OutputCanvas(p5Element.canvas,"gif",180); // ファイル出力
}
function draw(){
  background(255);
  
  let force = a.attract(m);
  m.applyForce(force); // mに力(a由来のforce)を作用させる
  m.update();
  a.display();
  m.display();

  // output_canvas.run(frameCount); // ファイル出力
}

class Attractor{
  constructor (mass){
    this.mass=mass; // 引力を発生する物体の重さ
    this.G=0.4;     // 万有引力定数。自作コードなので6.67*pow(10,-11)である必要はない
    this.location = createVector(width/2,height/2);
  }
  
  // 引力の作用先の性質を引数にとり、力(force)を返却する
  attract(mover){
    // mover ... 引力の作用先。地球から見た月、あるいは月から見た地球。
    let force=p5.Vector.sub(this.location,mover.location); //力のベクトル
    let distance = force.mag(); // ベクトルの大きさ = 距離
    distance=constrain(distance,5,25); // 5-25の間の値に制限する
    
    force.normalize(); // force * strengthするために正規化
    let strength = this.G * this.mass/pow(distance,2); // F=G*M*m/(r^2) ... 万有引力の法則
    force.mult(strength);
    return force
  }
  
  display(){
    stroke(0);
    fill(175,200);
    let _x  =this.location.x;
    let _y  =this.location.y;
    // let _dia=this.mass*2;
    
    ellipse(_x,_y,100,100);
    text("Attractor",_x,_y);
  }
}

class Mover{
  constructor(mass){
    this.mass=mass;
    this.location=createVector(30,30);
    this.velocity=createVector(0,0);
    this.acceleration=createVector(0,0);
  }
  applyForce(force){
    let cur_accl = p5.Vector.div(force,this.mass); // a=F/m
    this.acceleration.add(cur_accl);
  }
  update(){
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0); // 加速度を維持していると次フレームでとんでもないことになるので初期化
  }
  display(){
    stroke(0);
    fill(175);
    ellipse(this.location.x,this.location.y,16,16);
  }
}
