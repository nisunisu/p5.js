let x_pre;
let y_pre;

function setup() {
  createCanvas(500,500);
  colorMode(HSB,360,100,100,100);
  noFill();
  rectMode(CENTER);
  blendMode(ADD);
  noLoop();
}

function draw() {
  background(200,25,20);  
  const loop_degree = 360*3;
  for(let i = 0 ; i < loop_degree ; i+= 35){
    const rad = map(i,0,loop_degree,5,150);
    const x   = width /2 + rad * cos(radians(i));
    const y   = height/2 + rad * sin(radians(i));
    const rect_rad_v = map(i,0,loop_degree,50,100) * random(0.6,1.4);
    const rect_rad_h = map(i,0,loop_degree,50,100) * random(0.6,1.4);
    
    const s = map(i,0,loop_degree,80,50);
    fill(random(0,100),s,70,40);
    stroke(0,s,70,0);
    rect(x,y,rect_rad_v,rect_rad_h);
    
    stroke(180,10,70);
    // line(x,y,x_pre,y_pre);
    x_pre=x;
    y_pre=y;
  }
}