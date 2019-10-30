let num=3; // shape用配列数
let shape=[];
let eyes;
function setup() {
  createCanvas(400, 400);
  colorMode(HSB,360,100,100,100);
  for (let i = 0; i < num; i++) {
    shape[i]=new Shape(i*10);
  }
  eyes =new Eyes;
}

function draw() {
  background(100);
  
  // りんかく
  for (let i = 0; i < num; i++) {
    if(shape[i].currentframe > shape[i].waitframe){
      // 内部フレーム数が一定値になったら円を表示する
      shape[i].display();
      if(shape[i].alpha>0){
        // 徐々に大きく、薄くする
        shape[i].expand();
        shape[i].dilute();
      }else{
        // 円が消えたら初期化する
        shape[i]=new Shape(i*10);
      }
    }
    // 内部フレーム数をインクリメント
    shape[i].updateframe();
  }
  
  // キュートなお目目
  eyes.display();
  eyes.setRotateDirection();
  eyes.rotate();
}

// ------------------------------------------
// 輪郭
// ------------------------------------------
class Shape{
  constructor(waitframe){
    this.num=60; // 円を構成する要素の数
    this.rad=150;
    this.alpha=80;
    this.xpos=width/2;
    this.ypos=height/2;
    this.yoff=random(1,1.5);

    // 内部フレーム数 = 円が出現するまでの時間 の制御
    this.currentframe=0;
    this.waitframe=waitframe;
  }
  display(){
    noStroke();
    fill(0,0,80,this.alpha);
    // Shapeを用いた疑似的な円
    beginShape();
      // 中央下部にvertexを1つ配置することで首のように見せる
      vertex(width/2,height*4/5);
      
      // 2次元noise用変数。ここで常に0にする
      this.xoff=0;
      for (let i = 0; i < this.num; i++) {
        const angle = TWO_PI / this.num * [i];
        if (angle >= TWO_PI/8 && angle <= TWO_PI * 7/8) {
          // angleが45°以上315°以下の場合だけ描画する
          const rad = noise(this.xoff,this.yoff) * this.rad;
          const angle_rotated = angle + HALF_PI; // HALF_PIを加算することでvertexの始点と終点を結ぶ線が凡そ水平になるようにする
          const x = this.xpos + rad * cos(angle_rotated);
          const y = this.ypos + rad * sin(angle_rotated);
          vertex(x,y);
        }
        this.xoff+=0.06;
      }
    endShape(CLOSE);
    this.yoff+=0.002;
  }
  expand(){
    this.rad+=1;
  }
  dilute(){
    this.alpha-=1.2;
  }
  updateframe(){
    this.currentframe++;
  }
}

// ------------------------------------------
// 目
// ------------------------------------------
class Eyes{
  constructor(){
    this.center_x=width/2;  // 両目の中心座標x
    this.center_y=height/2; // 両目の中心座標y
    this.rad=30;  // これ*2が目と目の距離
    this.angle=0; // 目の傾く角度。ラジアン。
    this.angleAdd=0.002;
    this.rad_black_eye=8;  // 黒目の大きさ
    this.rad_white_eye=20; // 白目の大きさ
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
    fill(0,0,800)
    ellipse(this.right_eye_x,this.right_eye_y,this.rad_white_eye,this.rad_white_eye);
    ellipse(this.left_eye_x, this.left_eye_y, this.rad_white_eye,this.rad_white_eye);
    
    // 黒目
    fill(0,0,40)
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