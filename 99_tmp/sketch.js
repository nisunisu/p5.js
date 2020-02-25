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
}
class RectTileBackground {
  constructor() {
    this.tile_num_arr = [];
    this.SIDE = 33;
    this.TILE_NUM_X = floor(width / this.SIDE); // x方向のタイルの個数。最小は1ではなく0。
    this.TILE_NUM_Y = floor(height / this.SIDE); // y方向のタイルの個数。最小は1ではなく0。
    this.TILE_NUM_TOTAL = (this.TILE_NUM_X + 1) * (this.TILE_NUM_Y + 1) - 1; // 総タイル数。Canvasから微妙にはみ出すモノも数に含める。0からスタートする
    //   |  0  1  2  3   <- TILE_NUM_X
    // --+-------------
    // 0 |  0  1  2  3
    // 1 |  4  5  6  7
    // 2 |  8  9 10 11
    // 3 | 12 13 14 15   <- TILE_NUM_TOTAL
    // |
    // + TILE_NUM_Y

    this.tile_saturation_arr = [];
    for (let i = 0; i < this.TILE_NUM_TOTAL; i++) {
      this.tile_saturation_arr.push(0); // デフォルトカラー
    }
    this.magic_nums = []; // 色が変わったタイル（以下*）の周辺のタイルのNoを格納する。番号対応は以下の通り。
    // 1 2 3
    // 4 * 5
    // 6 7 8
    //
    //
    //   left_up | up | right_up
    // ----------+----+------------
    //      left | *  | right
    // ----------+----+-----------
    // left_down |down| right_down
    //
    //
    //  - TILE_NUM_X - 1 | - TILE_NUM_X | - TILE_NUM_X + 1
    // ------------------+--------------+-------------------
    //               - 1 |       0      | + 1
    // ------------------+--------------+-------------------
    //  + TILE_NUM_X - 1 | + TILE_NUM_X | + TILE_NUM_X + 1
  }
  run() {
    this.turn_1_tile_into_new_color();
  }

  turn_1_tile_into_new_color() {
    let _i = 0; // タイルNoは0から始まる
    for (let y = 0; y < height; y += this.SIDE) {
      for (let x = 0; x < width; x += this.SIDE) {
        let _saturation = 0;
        if (this.tile_num_arr.includes(_i)) {
          // 現在のタイルNoと等しい数字が1つでも配列に存在していれば色を変える
          _saturation = 60;
        }
        fill(0, _saturation, 80);
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

  turn_surround_tiles_into_new_color() {
    let _i = 1; // タイルNoは1から始まる
    for (let y = 0; y < height; y += this.SIDE) {
      for (let x = 0; x < width; x += this.SIDE) {
        fill(0, _saturation, 80);
        rect(x, y, this.SIDE, this.SIDE);

        _i++; // 次のタイルNoへ
      }
    }
  }

  push_target_tile_info_into_array() {
    const _num_x = floor(mouseX / this.SIDE);// 左端から何個目のrectにmouseXが存在しているか、のintを返す
    const _num_y = floor(mouseY / this.SIDE);// 上端から何個目のrectにmouseYが存在しているか、のintを返す
    const _num_cur = (this.TILE_NUM_X + 1) * _num_y + _num_x;
    this.tile_num_arr.push(_num_cur);
  }
}
