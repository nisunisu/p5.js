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
  rtb.push_target_tile_info_into_array();
  rtb.set_surround_2tiles_saturation(rtb.tile_num_arr[rtb.tile_num_arr.length - 1]);
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
    for (let i = 0; i < this.TILE_NUM_TOTAL; i++) {
      this.tile_saturation_arr.push(0); // デフォルトカラー
      this.tile_saturation_prev_arr.push(0); // デフォルトカラー
      this.wait_count_arr.push(0); // 待ち時間の初期値は0
    }
  }

  run() {
    this.turn_1_tile_into_new_color();
  }

  turn_1_tile_into_new_color() {
    let _i = 0; // タイルNoは0から始まる
    for (let y = 0; y < height; y += this.SIDE) {
      for (let x = 0; x < width; x += this.SIDE) {
        if(this.wait_count_arr[_i] <= 0){
          fill(0, parseInt(this.tile_saturation_arr[_i],10), 80); // tile_saturation_arrの中身が文字列と判定される？のでparseIntをつける
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

  set_surround_2tiles_saturation(tile_num) {
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

    const val_arr=[val0, val1, val2];
    val_arr.forEach((_val, _index) => {
      // クリックしたタイルとその周辺の2タイル（ランダム）の直前のsaturationに現在のsaturationを代入
      this.tile_saturation_prev_arr[_num_arr[_val]] = this.tile_saturation_arr[_num_arr[_val]];
      // クリックしたタイルとその周辺の2タイルのsaturationを変える
      this.tile_saturation_arr[_num_arr[_val]] = 60;
      // 待機時間を設定
      this.wait_count_arr[_num_arr[_val]] = 5 * _index;
    });
    
  }

  push_target_tile_info_into_array() {
    const _num_x = floor(mouseX / this.SIDE);// 左端から何個目のrectにmouseXが存在しているか、のintを返す
    const _num_y = floor(mouseY / this.SIDE);// 上端から何個目のrectにmouseYが存在しているか、のintを返す
    const _num_cur = (this.TILE_NUM_X + 1) * _num_y + _num_x; // タイルNoの計算
    this.tile_num_arr.push(_num_cur);
  }
}
