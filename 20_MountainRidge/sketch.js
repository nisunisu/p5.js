function setup() {
  createCanvas(400, 400);
  colorMode(HSB,360,100,100,100);
  noFill();
  noLoop();
}

function draw() {
  clear();
  let y_height = 10;
  for(let yPos = 0 ; yPos < height ; yPos += y_height){
    // Setting of a mountain ridge
    const _hue = map(yPos, 0, height, 120, 0);
    strokeWeight(map(yPos, 0, height, 1, 4));
    stroke(_hue, 75, 75);
    fill(_hue,60,60);

    // Draw a mountain ridge
    const x_side = map(yPos, 0, height, 2, 15);
    beginShape()
      for(let xPos = 0 ; xPos < width ; xPos += x_side){
        vertex(xPos, yPos);
        vertex(xPos + x_side, yPos);
        
        // 横線の右端から、2/3の確率で上下どちらかに伸ばす
        const random_val = Math.ceil(random(3)) - 1; // 0 or 1 or 2
        switch (random_val){
          case 0  :
            break;
          case 1  : // 下に伸びる
            vertex(xPos + x_side, yPos);
            vertex(xPos + x_side, yPos + x_side);
            yPos += x_side;
            break;
          case 2  : // 上に伸びる
            vertex(xPos + x_side, yPos);
            vertex(xPos + x_side, yPos - x_side);
            yPos -= x_side;
            break;
          default :
            break;
        }
      }
      vertex(width, height);
      vertex(0, height);
    endShape();
  }
}