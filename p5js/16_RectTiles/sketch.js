let x_num = 5;
let y_num = 3;
let rotate_rect;

let output_canvas;
function setup() {
  let p5Element = createCanvas(400, 400);
  frameRate(30);
  colorMode(HSB, 360, 100, 100, 100);
  noFill();
  stroke(0,0,60);
  angleMode(DEGREES); // rotateRectクラス用
  rectMode(CENTER); // rotateRectクラス用
  rotate_rect = new rotateRect(x_num, y_num);
  rotate_rect.initialize_all();

  // output_canvas = new OutputCanvas(p5Element.canvas,"gif",180); // ファイル出力
}
function draw() {
  background(0, 0, 95);
  rotate_rect.run();

  //   text(`angle : ${floor(rotate_rect.current_angle[0])}
  // t : ${rotate_rect.t[0]}`, -100, 100);

  // output_canvas.run(frameCount); // ファイル出力
}

class rotateRect {
  constructor(x_num, y_num) {
    this.x_num = x_num;
    this.y_num = y_num;
    this.rect_width =width/this.x_num*0.7;
    this.rect_height=height/this.y_num;
    this.num = x_num * y_num;
    this.my_easing = new myEasing();

    // オブジェクトによって内容が変わるので配列にする
    this.current_angle = [];
    this.t = [];
    this.waitCount = [];
  }
  initialize(_i) {
    this.current_angle[_i] = 0;
    this.t[_i] = 0;
    this.waitCount[_i] = 5 * _i;
  }
  initialize_all() {
    for (let i = 0; i < this.num; i++) {
      this.initialize(i);
    }
  }
  run() {
    this.display_all();
    this.update_all();
  }
  display_all() {
    for (let cnt_y = 0; cnt_y < this.y_num; cnt_y++) {
      for (let cnt_x = 0; cnt_x < this.x_num; cnt_x++) {
        const _i = cnt_y * this.y_num + cnt_x;
        const _x = (cnt_x + 1) / (this.x_num + 1) * width;
        const _y = (cnt_y + 1) / (this.y_num + 1) * height;
        push();
        translate(_x, _y);
        rotate(this.current_angle[_i]);
        rect(0, 0, this.rect_width, this.rect_height);
        pop();
      }
    }
  }
  update_all() {
    for (let i = 0; i < this.num; i++) {
      if (this.waitCount[i] <= 0) {
        this.current_angle[i] = this.my_easing.get(this.t[i]) * 90;
        this.t[i] += 0.02;
      }
      this.waitCount[i]--;
    }
    // 最終要素のtが1を超えたらすべて初期化
    if(this.t[this.num - 1] > 1){
      this.initialize_all();
    }
  }
}

class myEasing {
  constructor() {
    this.p = 0.1;
    this.s = 1.70158;
  }
  get(t) {
    if (t <= 0) {
      return 0;
    }
    if (t >= 1.0) {
      return 1.0;
    }
    let _angle = (t - this.s) * 2 / this.p
    return pow(2, -10 * t) * sin(_angle) + 1.0;
  }
}
