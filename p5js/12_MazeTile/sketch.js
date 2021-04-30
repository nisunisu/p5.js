let x_step;
let y_step;

function setup() {
  let p5Element = createCanvas(400,400);
  colorMode(HSB,360,100,100,100);
  stroke(0,0,80);
  strokeWeight(1);
  x_step=20;
  y_step=20;
  noLoop();
  // output_canvas = new OutputCanvas(p5Element.canvas,"gif",180); // ファイル出力
}

function draw() {
  background(0,0,100);
  for(let y=0; y<height; y+=y_step){
    for (let x = 0; x<width; x+=x_step) {
      // rect(x,y,x+x_step,y+y_step);
      
      push();
        stroke(0,0,50);
        strokeWeight(3);
        const is = Math.random(1) >= 0.5;
        if(is === true){
          line(x,y,x+x_step,y+y_step);
        }else{
          line(x,y+y_step,x+x_step,y);
        }
      pop();
    }
  }
  
  // save("myCanvas.jpg");
  // output_canvas.run(frameCount); // ファイル出力
}