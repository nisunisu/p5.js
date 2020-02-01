let rad=80;
let angle_1=0;
let angle_2=0;
let extraCanvas;
let output_canvas; // ファイル出力

function setup(){
  let p5Element = createCanvas(400,400);
  extraCanvas=createGraphics(400,400);
  // output_canvas = new OutputCanvas(p5Element.canvas,"gif",180); // ファイル出力
}
function draw(){
  background(255);
  noFill();
  stroke(120,0,0,50);

  // 固定円
  let x_1_1=width/2;
  let y_1_1=rad;
  let x_2_1=rad;
  let y_2_1=height/2;
  ellipse(x_1_1,y_1_1,rad*2,rad*2);
  ellipse(x_2_1,y_2_1,rad*2,rad*2);

  // 固定円を周回する円
  let x_1_2=x_1_1 + rad*cos(radians(angle_1));
  let y_1_2=y_1_1 + rad*sin(radians(angle_1));
  let x_2_2=x_2_1 + rad*cos(radians(angle_2));
  let y_2_2=y_2_1 + rad*sin(radians(angle_2));
  ellipse(x_1_2,y_1_2,5,5);
  ellipse(x_2_2,y_2_2,5,5);

  // 線
  stroke(0,0,0,30);
  line(x_1_2,0,x_1_2,height);
  line(0,y_2_2,width,y_2_2); 
  extraCanvas.fill(0,0,50,70);
  extraCanvas.noStroke();
  extraCanvas.ellipse(x_1_2,y_2_2,3,3);
  image(extraCanvas,0,0); 

  angle_1+=1.5;
  angle_2+=1;
  // output_canvas.run(frameCount); // ファイル出力
}