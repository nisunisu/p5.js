let bomb = [];
let distance = 100;
let angle_base = 0;
let rad_base = 150;
let particle_info_arr = []; // vector and color info
function setup() {
  createCanvas(400, 400);
  colorMode(HSB,360,100,100,100);
  angleMode(DEGREES);
  noFill();
  blendMode(ADD);
  stroke(0,0,40);
}

function draw() {
  clear();
  translate(width/2, height/2);
  
  let _x = rad_base * cos(angle_base);
  let _y = rad_base * sin(angle_base);
  if(Math.floor(angle_base * 10)  % 57 == 0){ // 5.7度ごとにpushする
    const _vector = createVector(_x, _y);
    const _hue    = random(360);
    const _size   = random(5, 40);
    const _hash   = {
      vector : _vector,
      hue    : _hue,
      size   : _size
    };
    particle_info_arr.push(_hash)
  }
  for (let i = 0; i < particle_info_arr.length; i++) {
    const _particle_info = particle_info_arr[i];
    const _vector = _particle_info.vector;
    const _hue    = _particle_info.hue;
    const _size   = _particle_info.size;
    fill(_hue, 80, 80, 30);
    ellipse(_vector.x, _vector.y, _size, _size);
  }

  
  // 表示用
  line(0, 0, _x, _y);
  ellipse(_x, _y, 5, 5)
  
  
  // update
  angle_base+=0.1;
}