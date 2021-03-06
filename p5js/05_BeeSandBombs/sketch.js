// 写経
// https://github.com/CodingTrain/website/tree/master/CodingChallenges/CC_086_beesandbombs/P5

let angle = 0;
let w = 24;
let ma;
let maxD;
let output_canvas; // ファイル出力

function setup(){
  let p5Element = createCanvas(400, 400, WEBGL);
  ma=atan(cos(QUARTER_PI));
  maxD=dist(0,0,200,200);

  // output_canvas = new OutputCanvas(p5Element.canvas,"gif",180); // ファイル出力
}

function draw(){
  background(100);
  ortho(-400,400,400,-400,0,1000);
  rotateX(-ma);
  rotateY(-QUARTER_PI);
  
  for(let z=0; z<height; z+=w){
    for (let x = 0; x < width; x+=w) {
      push();
        let d=dist(x,z,width/2,height/2);
        let offset = map(d,0,maxD,-PI,PI);
        let a = angle+offset;
        let h = floor(map(sin(a),-1,1,100,300));
        translate(x-width/2,0,z-height/2);
        normalMaterial();
        box(w,h,w);
      pop();
    }
  }
  angle-=0.1;

  // output_canvas.run(frameCount); // ファイル出力
}