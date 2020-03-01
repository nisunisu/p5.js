let rtb;
function setup() {
  createCanvas(400, 400);
  frameRate(30);
  colorMode(HSB, 360, 100, 100, 100);
  // noStroke();
  rtb = new RectTileBackground();
}
function draw() {
  rtb.run();
}
function mousePressed() {
  rtb.run_mousepressed();
}
class RectTileBackground {
  constructor() {
    this.tile_num_arr = [];
    this.SIDE = 33;
    this.TILE_NUM_X = floor(width / this.SIDE); // x方向のタイルの個数。最小は1ではなく0。
    this.TILE_NUM_Y = floor(height / this.SIDE); // y方向のタイルの個数。最小は1ではなく0。
    this.TILE_NUM_TOTAL = (this.TILE_NUM_X + 1) * (this.TILE_NUM_Y + 1) - 1; // 総タイル数。Canvasから微妙にはみ出すモノも数に含める。0からスタートする
    //      0   1   2   3  <- TILE_NUM_X
    //   +---+---+---+---+
    // 0 |  0|  1|  2|  3|
    //   +---+---+---+---+
    // 1 |  4|  5|  6|  7|
    //   +---+---+---+---+
    // 2 |  8|  9| 10| 11|
    //   +---+---+---+---+
    // 3 | 12| 13| 14| 15| <- TILE_NUM_TOTAL
    //   +---+---+---+---+
    // |
    // + TILE_NUM_Y

    this.tile_saturation_arr = [];
    this.tile_saturation_prev_arr = [];
    this.wait_count_arr = [];
    for (let i = 0; i <= this.TILE_NUM_TOTAL; i++) {
      this.tile_saturation_arr.push(0); // デフォルトカラー
      this.tile_saturation_prev_arr.push(0); // デフォルトカラー
      this.wait_count_arr.push(0); // 待ち時間の初期値は0
    }
  }

  run() {
    this.display_tiles();
  }
  
  run_mousepressed(){
    const _obj = this.get_tile_info_obj_over_mouse();
    this.tile_num_arr.push(_obj.num_cur);

    const _arr = this.get_surround_2tiles_info_arr(_obj.num_cur);
    for(let i=0; i< _arr.length; i++){
      this.tile_saturation_prev_arr[_arr[i]] = this.tile_saturation_arr[_arr[i]]; // クリックしたタイルとその周辺の2タイル（ランダム）の直前のsaturationに現在のsaturationを代入
      this.tile_saturation_arr[_arr[i]] = 60; // クリックしたタイルとその周辺の2タイルのsaturationを変える
      this.wait_count_arr[_arr[i]] = 5 * i; // 待機時間を設定
    }
  }

  display_tiles() {
    let _i = 0; // タイルNoは0から始まる
    for (let y = 0; y < height; y += this.SIDE) {
      for (let x = 0; x < width; x += this.SIDE) {
        if(this.wait_count_arr[_i] <= 0){
          fill(0, parseInt(this.tile_saturation_arr[_i],10), 80); // tile_saturation_arrの中身が文字列と判定される？のでparseIntをつける
          this.wait_count_arr[_i]=0;
        }else{
          fill(0, parseInt(this.tile_saturation_prev_arr[_i],10), 80); // 待ち時間が1以上の場合は、直前のsaturationにする
          this.wait_count_arr[_i]--;
        }
        rect(x, y, this.SIDE, this.SIDE);

        // debug用
        push()
        fill(180, 50, 50);
        textSize(9)
        textAlign(CENTER);
        text(`${_i}`, x + this.SIDE / 2, y + this.SIDE / 2);
        text(`${this.tile_num_arr[this.tile_num_arr.length - 1]}`, mouseX, mouseY);
        pop()
        // debug用

        _i++; // 次のタイルNoへ
      }
    }
  }

  get_surround_2tiles_info_arr(tile_num) {
    // 1 2 3
    // 4 0 5
    // 6 7 8
    //
    //   left_up | up | right_up
    // ----------+----+------------
    //      left | *  | right
    // ----------+----+-----------
    // left_down |down| right_down
    //
    //  - TILE_NUM_X - 1 | - TILE_NUM_X | - TILE_NUM_X + 1
    // ------------------+--------------+-------------------
    //               - 1 |       0      | + 1
    // ------------------+--------------+-------------------
    //  + TILE_NUM_X - 1 | + TILE_NUM_X | + TILE_NUM_X + 1

    const _num_arr=[];
    _num_arr.push(tile_num);                       // 0 : the CENTER tile
    _num_arr.push(tile_num - this.TILE_NUM_X - 2); // 1 : left up
    _num_arr.push(tile_num - this.TILE_NUM_X - 1); // 2 : up
    _num_arr.push(tile_num - this.TILE_NUM_X);     // 3 : right up
    _num_arr.push(tile_num - 1);                   // 4 : left
    _num_arr.push(tile_num + 1);                   // 5 : right
    _num_arr.push(tile_num + this.TILE_NUM_X);     // 6 : left down
    _num_arr.push(tile_num + this.TILE_NUM_X + 1); // 7 : down
    _num_arr.push(tile_num + this.TILE_NUM_X + 2); // 8 : right down

    // 1-8の整数のうちランダムで2つ選ぶ
    // [FIX] val2が0になる場合がある
    const val0 = 0;
    const val1 = floor(random(1,9));
    const val2 = (val1 + floor(random(1,9)) ) % 9 ;
    const _arr = [_num_arr[val0], _num_arr[val1], _num_arr[val2]];
    return _arr;
  }

  get_tile_info_obj_over_mouse() {
    // マウス上のタイル情報を取得
    const _num_x=floor(mouseX / this.SIDE);
    const _num_y=floor(mouseY / this.SIDE);
    return {
      num_x: _num_x, // 左端から何個目のrectにmouseXが存在しているか、のintを返す
      num_y: _num_y, // 上端から何個目のrectにmouseYが存在しているか、のintを返す
      num_cur: (this.TILE_NUM_X + 1) * _num_y + _num_x // タイルNo
    }
  }
}
