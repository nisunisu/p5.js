let noiseVal_radius;
let noiseVal_color;
// 半径
let baseRadius;
let thisRadius;
// 座標
let baseXpos;
let baseYpos;
let firstX;
let firstY;
// 色
let hue;
let saturation;
let brightness;

function setup() {
  createCanvas(400,400);
  frameRate(5);
  noFill();
  strokeWeight(1);
  colorMode(HSB,360,100,100);
  blendMode(ADD);
  noLoop();
  //---------------------
  baseRadius=height/2;
  thisRadius=0;
  baseXpos=width/2;
  baseYpos=height/2;
}

function draw() {
  clear(); // blendMode(ADD)の時に画面が真っ白になるのを回避する
  background(13);
  
  // Loopの度に初期化
  noiseVal_radius=random(10);
  noiseVal_color=random(360);
  
  // 100回繰り返す
  for(let cnt=0; cnt<100; cnt++){
    beginShape();
      // 色
      hue=360*noise(noiseVal_color);
      saturation=random(50,80);
      brightness=random(50,80);
      stroke(hue,saturation,brightness);
      noiseVal_color+=0.02; // update
      
      // 線
      for(let angle=0; angle<=720; angle+=1){
        // 半径と座標を決定
        thisRadius=baseRadius * fnMyNoise(noiseVal_radius);
        let thisX=baseXpos + thisRadius * cos(radians(angle));
        let thisY=baseYpos + thisRadius * sin(radians(angle));
        noiseVal_radius+=0.01; // update
        
        // 線を書く
        curveVertex(thisX,thisY);
      }
    endShape();
  }
}

function fnMyNoise(val){
  const ret=pow(noise(val),3)*2;
  return ret;
}
