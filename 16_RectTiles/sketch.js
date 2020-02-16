let x1, x2, x3, x4; // xpos
let y1, y2, y3, y4; // ypos
let a1, a2, a3, a4; // angle
let output_canvas;

function setup() {
  let p5Element = createCanvas(400, 400);
  frameRate(3);
  noFill();
  colorMode(HSB, 360, 100, 100, 100);
  x1=-10, y1= 50, a1=atan(y1/x1);
  x2= 10, y2= 50, a2=atan(y2/x2);
  x3= 10, y3=-50, a3=atan(y3/x3);
  x4=-10, y4=-50, a4=atan(y4/x4);
  // output_canvas = new OutputCanvas(p5Element.canvas,"gif",180); // ファイル出力
}
function draw() {
  background(0, 0, 90);
  translate(width / 2, height / 2);
  beginShape();
    vertex(x1, y1);
    vertex(x2, y2);
    vertex(x3, y3);
    vertex(x4, y4);
  endShape(CLOSE);
  let nextOjb = rotate_1degree(x1,y1);
  let {_next_x:x1, _next_y:y1} = nextOjb;
  // output_canvas.run(frameCount); // ファイル出力
}
function rotate_1degree(x, y) {
  let _angle = atan(y / x);
  _angle++;
  let _next_x = dist(0, 0, x, y) * cos(_angle);
  let _next_y = dist(0, 0, x, y) * cos(_angle);
  return { _next_x, _next_y };
}
// 参考
// function fnc() {
//   let _x=2;
//   let _y=3;
//   return {_x,_y};
// }
// let obj = fnc();
// let { _x:hoge, _y:fuga } = obj;
// console.log(fuga);

// 参考
// let x,y,radius;
// function setup() {
//   createCanvas(400, 400);
//   frameRate(10);
//   textSize(20);
//   textAlign(CENTER);
//   x=width;
//   y=0;
//   radius=dist(0,0,x,y);
// }
// function draw() {
//   background(220);
//   ellipse(x,y,5,5);
//   line(0,0,width,height);

//   // update
//   let cur_angle=atan(y/x);
//   let next_angle= cur_angle + radians(1);
//   x=radius*cos(next_angle);
//   y=radius*sin(next_angle);
  
//   // info
//   text(
// `rad  : ${floor(atan(y/x))}
// angle: ${floor(degrees(atan(y/x)))}`,
//     width/2,height/2
//   );
// }
