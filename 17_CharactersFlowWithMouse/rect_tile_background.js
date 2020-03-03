let rtb;
function setup() {
  createCanvas(400, 400);
  frameRate(30);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
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
    this.SIDE = 23; // [FIX]25を指定すると挙動がおかしい
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

    this.tile_hue_arr = [];
    this.tile_hue_prev_arr = [];
    this.wait_count_arr = [];
    for (let i = 0; i <= this.TILE_NUM_TOTAL; i++) {
      this.tile_hue_arr.push(0); // デフォルトカラー
      this.tile_hue_prev_arr.push(0); // デフォルトカラー
      this.wait_count_arr.push(0); // 待ち時間の初期値は0
    }
  }

  run() {
    this.display_tiles();
  }

  run_mousepressed(){
    const _tile_info_obj_over_mouse = this.get_tile_info_obj_over_mouse();
    this.set_new_hue_of_all_tiles(); // nextのhueをセットする（waitcountが0にならない限りnextにはならない）
    this.set_waitcount_of_all_tiles(_tile_info_obj_over_mouse); 
  }

  display_tiles() {
    let _i = 0; // タイルNoは0から始まる
    for (let y = 0; y < height; y += this.SIDE) {
      for (let x = 0; x < width; x += this.SIDE) {
        if(this.wait_count_arr[_i] <= 0){
          fill(parseInt(this.tile_hue_arr[_i],10), 50, 90); // [FIX]tile_hue_arrの中身が文字列と判定される？のでparseIntをつける
          this.wait_count_arr[_i]=0;
        }else{
          fill(parseInt(this.tile_hue_prev_arr[_i],10), 50, 90); // 待ち時間が1以上の場合は、直前のhueにする
          this.wait_count_arr[_i]--;
        }
        rect(x, y, this.SIDE, this.SIDE);
        _i++; // 次のタイルNoへ
      }
    }
  }

  set_waitcount_of_all_tiles(_tile_info_obj) {
    //     0   1   2   3   4  <- TILE_NUM_X
    //   +---+---+---+---+---+
    // 0 | 4 | 3 | 2 | 3 | 4 | 2
    //   +---+---+---+---+---+
    // 1 | 3 | 2 | 1 | 2 | 3 | 1
    //   +---+---+---+---+---+
    // 2 | 2 | 1 | 0 | 1 | 2 | 0  <- Y-distance from 0
    //   +---+---+---+---+---+
    // 3 | 3 | 2 | 1 | 2 | 3 | 1
    //   +---+---+---+---+---+
    // 4 | 4 | 3 | 2 | 3 | 4 | 2
    // | +---+---+---+---+---+
    // |   2   1   0   1   2      <- X-distance from 0
    // |
    // +-- TILE_NUM_Y
    
    // _tile_info_obj = マウスクリックした箇所 からの距離に応じてwait_countを設定する
    const _max_distance=(this.TILE_NUM_X+1) + (this.TILE_NUM_Y+1); // 最大距離
    let i=0;
    for(let _num_y=0; _num_y <= this.TILE_NUM_Y; _num_y++){
      for(let _num_x=0; _num_x <= this.TILE_NUM_X; _num_x++){
        const _relative_distance = abs(_tile_info_obj.num_x - _num_x) + abs(_tile_info_obj.num_y - _num_y); // 0からの相対距離
        this.wait_count_arr[i] = floor(map(_relative_distance,0,_max_distance,0,40))+floor(random(8));
        i++;
      }
    }
  }
  
  set_new_hue_of_all_tiles(){
    // 現在のhue値をprevに入れて、ランダムな値を現在地としてセット
    const _new_hue=random(360);
    for (let i = 0; i <= this.TILE_NUM_TOTAL; i++) {
      this.tile_hue_prev_arr[i] = this.tile_hue_arr[i];
      this.tile_hue_arr[i]=_new_hue; // 
    }
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
