let xNum=4;
let yNum=4;
let face=[]; // 配列
for (let i = 0; i < xNum; i++) {
  face[i] = [];
}

// GIF出力用変数
// live-p5が外部ファイル読み込みに対応していないため、GIF出力が必要な時以外はコメントアウトする
// let capturer = new CCapture({
//   format: 'gif',
//   workersPath: '../gif.js/dist/',
//   verbose: true
// });
let canvas;

function setup() {
  let p5Canvas = createCanvas(400, 400);
  canvas = p5Canvas.canvas;
  colorMode(HSB,360,100,100,100);
  for (let i = 0; i < xNum; i++) {
    for (let j = 0; j < yNum; j++) {
      // 計算式
      // 
      // 0       1       2      ...     xNum
      // +-------+-------+-------+-------+
      // |       |       |       |       |
      // |       |       |       |       |
      // |       |       |       |       |
      // |       |       |       |       |
      // |       |       |       |       |
      // +-------+-------+-------+-------+
      // ^
      // width * i/xNum // when i=0
      //         ^
      //         width * (i+1)/xNum // when i=0
      // 
      // -> i/xNum + (i+1)/xNum = (2*i + 1)/xNum
      // -> (2*i + 1)/xNum / 2 = (2*i+1)/(2*xNum)
      const _hue = (i*j+j)*25;
      const _x = width *(2*i+1)/(2*xNum)
      const _y = height*(2*j+1)/(2*yNum)
      const _distance=50;
      const _vertexNum=random(100,400);
      face[i][j] = new Face(_hue,_x,_y,_distance,_vertexNum);
    }
  }
  
  // GIF出力開始
  // capturer.start();
}

function draw() {
  background(100);
  for (let i = 0; i < xNum; i++) {
    for (let j = 0; j < yNum; j++) {
      face[i][j].drawFace();
    }
  }
  
  // GIF出力
  // if(frameCount < 240){
  //   capturer.capture(canvas);
  // }else{
  //   // GIF出力と同時にdraw()も終了する
  //   capturer.stop();
  //   capturer.save();
  //   noLoop();
  // }
}

// ------------------------------------------
// 輪郭Shapeとお目目Eyesを使って顔Faceを描画する
// ------------------------------------------
class Face{
  constructor(hue,xPos,yPos,distance,vertexNum){
    //Shapeに渡す用変数
    this.hue=hue;
    this.xPos=xPos;
    this.yPos=yPos;
    this.distance=distance;
    this.vertexNum=vertexNum;

    // Shape
    this.num=3; // 三同画面で1度に描画される輪郭の最大数
    this.shape=[];
    for (let i = 0; i < this.num; i++) {
      // Shape(waitframe,)
      const waitframe=i*10; // 1つ目の輪郭はウェイトタイム無し、2つ目以降はi*10フレームだけ待機する
      this.shape[i]=new Shape(waitframe,this.hue,this.xPos,this.yPos,this.distance,this.vertexNum);
    }

    // Eyes
    this.eyes;
    this.eyes =new Eyes(this.xPos,this.yPos);

  }
  
  drawFace(){
    // 輪郭。numの数だけ描画する
    for (let i = 0; i < this.num; i++) {
      // 内部フレーム数が一定値になったら円を表示する
      if(this.shape[i].currentframe > this.shape[i].waitframe){
        // お顔を表示
        this.shape[i].display();

        if(this.shape[i].alpha>0){
          // 徐々に大きく、薄くする
          this.shape[i].expand();
          this.shape[i].dilute();
        }else{
          // 円が消えたら初期化する
          const waitframe=i*10;
          this.shape[i]=new Shape(waitframe,this.hue,this.xPos,this.yPos,this.distance,this.vertexNum);
        }
      }
      
      // 内部フレーム数をインクリメント
      this.shape[i].updateframe();
    }
    
    // キュートなお目目
    this.eyes.display();
    this.eyes.setRotateDirection();
    this.eyes.rotate();
  }
}

// ------------------------------------------
// 輪郭
// ------------------------------------------
class Shape{
  constructor(waitframe,hue,xPos,yPos,distance,vertexNum){
    this.vertexNum=vertexNum; // 円を構成する要素の数
    this.rad=80;
    this.alpha=80;
    this.xPos=xPos;
    this.yPos=yPos;
    this.distance=distance; // 疑似円の中心から首の頂点までの長さ
    this.yoff=random(100);
    this.hue=hue;

    // 内部フレーム数 = 円が出現するまでの時間 の制御
    this.currentframe=0;
    this.waitframe=waitframe;
  }
  display(){
    noStroke();
    fill(this.hue,20,80,this.alpha);
    // Shapeを用いた疑似的な円
    beginShape();
      // 中央下部にvertexを1つ配置することで首のように見せる
      vertex(this.xPos,this.yPos+this.distance);
      
      // 2次元noise用変数。ここで常に0にする
      this.xoff=0;
      for (let i = 0; i < this.vertexNum; i++) {
        const angle = TWO_PI / this.vertexNum * [i];
        if (angle >= TWO_PI/8 && angle <= TWO_PI * 7/8) {
          // angleが45°以上315°以下の場合だけ描画する
          const rad = noise(this.xoff,this.yoff) * this.rad;
          const angle_rotated = angle + HALF_PI; // HALF_PIを加算することでvertexの始点と終点を結ぶ線が凡そ水平になるようにする
          const x = this.xPos + rad * cos(angle_rotated);
          const y = this.yPos + rad * sin(angle_rotated);
          vertex(x,y);
        }
        this.xoff+=0.06;
      }
    endShape(CLOSE);
    this.yoff+=0.002;
  }
  // 大きくする
  expand(){
    this.rad+=1;
  }
  // 薄くする
  dilute(){
    this.alpha-=1.2;
  }
  // 内部フレーム数のインクリメント
  updateframe(){
    this.currentframe++;
  }
}

// ------------------------------------------
// 目
// ------------------------------------------
class Eyes{
  constructor(xPos,yPos){
    this.center_x=xPos; // 両目の中心座標x
    this.center_y=yPos; // 両目の中心座標y
    this.rad=15;  // これ*2が目と目の距離
    this.angle=0; // 目の傾く角度。ラジアン。
    this.angleAdd=0.002;
    this.rad_black_eye=8;  // 黒目の大きさ
    this.rad_white_eye=11; // 白目の大きさ
  }
  display(){
    // 座標計算
    this.right_eye_x=this.center_x + this.rad * cos(this.angle);
    this.right_eye_y=this.center_y + this.rad * sin(this.angle);
    this.left_eye_x =this.center_x + this.rad * cos(this.angle + PI);
    this.left_eye_y =this.center_y + this.rad * sin(this.angle + PI);
    
    // global描画オプション
    noStroke();
    
    // 白目
    fill(0,0,800,80)
    ellipse(this.right_eye_x,this.right_eye_y,this.rad_white_eye,this.rad_white_eye);
    ellipse(this.left_eye_x, this.left_eye_y, this.rad_white_eye,this.rad_white_eye);
    
    // 黒目
    fill(0,0,40,80)
    ellipse(this.right_eye_x,this.right_eye_y,this.rad_black_eye,this.rad_black_eye);
    ellipse(this.left_eye_x, this.left_eye_y, this.rad_black_eye,this.rad_black_eye);
  }
  setRotateDirection(){
    // 45度を超えたら目の回転する方向を反転する
    if (abs(this.angle) > QUARTER_PI/2){
      this.angleAdd *= -1;
    }
  }
  rotate(){
    this.angle+=this.angleAdd;
  }
}