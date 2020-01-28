let img;

function preload(){
  // setupでloadImageするとうまく動かないことがある
  img = loadImage('img/sample.png');
}

function setup() {
  createCanvas(400,400);
  stroke(120,120,120);
  frameRate(30);
  strokeWeight(3);

  // SurfacePro4ではpixelDensity()=2になる
  // pixelDensity() != 1 の環境でmouseX, mouseYを用いると
  // mouseX,mouseYの数値とpixels[]とで座標の整合性が取れなくなる。
  // この理由により本sketchでは意図的に1を指定する
  pixelDensity(1); // 1
}

function draw() {
  image(img,0,0,width,height);
  loadPixels();
    let x = mouseX;
    let y = mouseY;
    let red  =pixels[ 4 * (width * y + x) + 0];
    let green=pixels[ 4 * (width * y + x) + 1];
    let blue =pixels[ 4 * (width * y + x) + 2];
    let alpha=pixels[ 4 * (width * y + x) + 3];
    fill(red,green,blue,alpha);
    rect(0,0,100,100);
}