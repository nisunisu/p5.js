let img;
let side=10;
let side_add=1;
let output_canvas; // ファイル出力

function preload(){
  // setupでloadImageするとうまく動かないことがある
  img = loadImage('img/sample.jpg');
}

function setup() {
  let p5Element = createCanvas(400,400);
  frameRate(5);
  noStroke();
  // noLoop();

  // SurfacePro4ではpixelDensity()=2になる
  // pixelDensity() != 1 の環境でmouseX, mouseYを用いると
  // mouseX,mouseYの数値とpixels[]とで座標の整合性が取れなくなる。
  // この理由により本sketchでは意図的に1を指定する
  pixelDensity(1); // 1

  // output_canvas = new OutputCanvas(p5Element.canvas,"gif",180); // ファイル出力
}

function draw() {
  image(img,0,0,width,height);
  loadPixels();
    for(let cur_y=0; cur_y<height; cur_y+=side){
      for(let cur_x=0; cur_x<height; cur_x+=side){
        let red  =pixels[ 4 * floor(width * cur_y + cur_x) + 0]; // pixels[]は整数しか代入できないのでfloorを使う
        let green=pixels[ 4 * floor(width * cur_y + cur_x) + 1]; // 同上
        let blue =pixels[ 4 * floor(width * cur_y + cur_x) + 2]; // 同上
        let alpha=pixels[ 4 * floor(width * cur_y + cur_x) + 3]; // 同上
        fill(red,green,blue,alpha);
        rect(cur_x,cur_y,cur_x+side,cur_y+side);
      }
    }
  side+=side_add;
  if(side>=26){
    side_add*=-1;
  }else if(side<=10){
    side_add*=-1;
  }

  // output_canvas.run(frameCount); // ファイル出力
}