let x_prev;
let y_prev;
let angle_1=0;
let angle_2=0;
function setup() {
  createCanvas(500,500);
  colorMode(HSB,360,100,100,100);
  noFill();
  rectMode(CENTER);
  stroke(0,0,80);
  frameRate(30);
}

function draw() {
  background(200,25,20);
  
  x_prev=0;
  y_prev=height/2;
  // ---------------------
  // FOR LOOP 1
  let angle_1=0;
  for(let i = 0; i< 3; i++){
    // ---------------------
    // FOR LOOP 0
    let angle_0  = 0;
    for(let x=0; x<width; x+=1){
      const cur_angle = angle_0 + angle_1 + angle_2;
      const y = height/2 + 50 * sin(radians(cur_angle));
      line(x,y,x_prev,y_prev);

      angle_0 += 7;
      x_prev   = x;
      y_prev   = y;
    }
    angle_1 -= 3;
  }
  angle_2-=2;
}