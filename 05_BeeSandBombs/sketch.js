// 写経
// https://github.com/CodingTrain/website/tree/master/CodingChallenges/CC_086_beesandbombs/P5

let angle = 0;
let w = 24;
let ma;
let maxD;

// GIF出力用変数
// live-p5が外部ファイル読み込みに対応していないため、GIF出力が必要な時以外はコメントアウトする
// let capturer = new CCapture({
//   format: 'gif',
//   workersPath: '../gif.js/dist/',
//   verbose: true
// });
// let canvas;

function setup(){
  let p5Canvas = createCanvas(400, 400, WEBGL);
  canvas = p5Canvas.canvas;
  ma=atan(cos(QUARTER_PI));
  maxD=dist(0,0,200,200);

  // GIF出力開始
  // capturer.start();
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

  // GIF出力
  // if(frameCount < 180){
  //   capturer.capture(canvas);
  // }else{
  //   // GIF出力と同時にdraw()も終了する
  //   capturer.stop();
  //   capturer.save();
  //   noLoop();
  // }
}