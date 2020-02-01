let num_x=12;
let num_y=15;
let scl_x; // 距離
let scl_y; // 距離
let hue=0;
let output_canvas; // ファイル出力

function setup(){
  let p5Element = createCanvas(400,400);
  colorMode(HSB,360,100,100,100);
  scl_x=width /num_x;
  scl_y=height/num_y;
  noLoop();
  // output_canvas = new OutputCanvas(p5Element.canvas,"gif",180); // ファイル出力
}

function draw(){
  background(0,0,0);
  stroke(0,0,20);
  for (let y = 0; y < height; y+=scl_y) {
    fill(hue,100,80);
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < width; x+=scl_x) {
      vertex(x,y);
      vertex(x,y+scl_y);
    }
    endShape();
    
    if(hue < 360){
      hue+=360/num_y;
    }else{
      hue=0;
    }
  }
  
  // save("myCanvas.jpg");
  // output_canvas.run(frameCount); // ファイル出力
}
