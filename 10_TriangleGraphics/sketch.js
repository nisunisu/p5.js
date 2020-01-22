let num_x=12;
let num_y=15;
let scl_x; // 距離
let scl_y; // 距離
function setup(){
  createCanvas(400,400);
  scl_x=width /num_x;
  scl_y=height/num_y;
  noLoop();
}

function draw(){
  background(255);
  stroke(80);

  let cnt_y=0;
  let xoff=0;
  let alpha=10;
  for (let y = 0; y < height; y+=scl_y) {
    let y_cur=y;
    let y_nxt=y+scl_y;
    let cnt_x=0;
    
    if(cnt_y % 2 === 0){
      xoff=scl_x;
    }else{
      xoff=0;
    }
    
    fill(0,0,250,alpha);
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < width; x+=scl_x) {
      if( cnt_x % 2 === 0 ){
        vertex(x+xoff,y_cur);
      }else{
        vertex(x+xoff,y_nxt);
      }
      cnt_x++;
    }
    endShape();
    
    cnt_y++;
    alpha+=5;
  }
  
  save("myCanvas.jpg");
}

