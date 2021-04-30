class DisplayEllipse{
  constructor(x,y,dia,sw, hue, velocity){
    this.x = x;
    this.y = y;
    this.dia = dia;
    this.sw = sw; // stroke weight
    this.hue = hue;
    this.velocity = velocity;
  }
  display(){
    stroke(this.hue,100,100,60);
    strokeWeight(this.sw);
    ellipse(this.x,this.y,this.dia,this.dia);
  }
  update(){
    if(this.dia >= 0){
      this.dia -= this.velocity;
    }else{
      this.dia = 0;
      if(this.sw >= 0){
        this.sw -= 1;
      }else{
        this.sw = 0;
      }
    }    
  }
}

let num = 200;
let ins = [];

function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360,100,100,100);
  noFill();

  for(let i = 0; i<num; i++){
    const x = width/2;
    const y = height/2;
    const dia = random(20,600);
    const stroke_weight=random(2,10);
    const hue = 0;
    const v = map(dia,20,600,3,6);
    ins[i] = new DisplayEllipse(x,y,dia,stroke_weight,hue,v);
  }
}

function draw() {
  background(0,0,20);
  for(let i = 0; i<num; i++){
    ins[i].display();
    ins[i].update();
    if(ins[i].sw===0){
      ins[i] = new DisplayEllipse(x,y,dia,stroke_weight,hue,v);
    }
  }
}
