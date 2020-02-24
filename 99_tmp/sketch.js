let tile_num = [];
let TILE_NUM_X; // x方向のタイルの個数。最小は0ではなく1。
let TILE_NUM_Y; // y方向のタイルの個数。最小は0ではなく1。
let TILE_NUM_TOTAL; // 総タイル数。Canvasから微妙にはみ出すモノも数に含める。
const SIDE = 33;
function setup() {
  createCanvas(400, 400);
  frameRate(30);
  colorMode(HSB, 360, 100, 100, 100);
  // noStroke();
  TILE_NUM_X = ceil(width / SIDE); // 小数点以下切り上げ
  TILE_NUM_Y = ceil(height / SIDE);
  TILE_NUM_TOTAL = TILE_NUM_X * TILE_NUM_Y;
}
function draw() {
  rect_tile_background(SIDE);
}

const rect_tile_background = (side) => {
  let _i = 1; // タイルNoは1から始まる
  for (let y = 0; y < height; y += side) {
    for (let x = 0; x < width; x += side) {
      let saturation = 0;
      if(tile_num.includes(_i)){
        // 現在のタイルNoと等しい数字が1つでも配列に存在していれば色を変える
        saturation = 60;
      }
      fill(0, saturation, 80);
      rect(x, y, side, side);

      // debug用
      push()
      fill(180, 50, 50);
      textSize(9)
      textAlign(CENTER);
      text(_i, x + SIDE / 2, y + SIDE / 2);
      text(tile_num[tile_num.length - 1], mouseX, mouseY);
      pop()
      // debug用

      _i++; // 次のタイルNoへ
    }
  }
}
function mousePressed() {
  const _num_x = ceil(mouseX / SIDE);// 左端から何個目のrectにmouseXが存在しているか、のintを返す
  const _num_y = ceil(mouseY / SIDE);// 上端から何個目のrectにmouseYが存在しているか、のintを返す
  const _num_cur = TILE_NUM_X * (_num_y - 1) + _num_x;
  tile_num.push(_num_cur);
}

// 1 2 3
// 4 * 5
// 6 7 8
// let is_color_arr =[];
// const turn_tiles_into_new_color = () {
  
// }
