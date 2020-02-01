let start=0;
let end  =QUARTER_PI;
let startAdd=0.03;
let endAdd  =0.01;
let radius=100;
let output_canvas; // ファイル出力

function setup() {
  let p5Element = createCanvas(400, 400);
  // output_canvas = new OutputCanvas(p5Element.canvas,"gif",180); // ファイル出力
}

function draw() {
  background(220);
  arc(0,0,radius,start,end);

  start+=startAdd;
  end  +=endAdd;
  if(start>end){
    let tmp=start;
    start=end;
    end  =tmp;
    start=start%PI;
    end  =end%PI;
  }
  
  // output_canvas.run(frameCount); // ファイル出力
}