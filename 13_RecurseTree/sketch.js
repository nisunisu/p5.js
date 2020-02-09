// Thank you -> https://editor.p5js.org/mtchl/sketches/ryyW2U5Fx

function setup(){
  createCanvas(windowWidth,windowHeight);
  colorMode(HSB,360,100,100,100);
  noLoop();
}

function draw(){
  background(0,0,20);
  strokeWeight(10);
  translate(width/2,height-20);
  branch(10);
}

function branch(level){
  if (level > 0) {
    let cur_hue=map(level,10,1,40,80); // like real tree
    stroke(cur_hue,80,80);
    line(0,0,0,-height/10); // draw a line going up
    translate(0,-height/10); // move the space upwards
    rotate(random(-0.05,0.05));  // random wiggle
    if (random(1.0) < 0.6){
      // new 2 branches
      level-=1;
      scale(0.8);  // scale down
      rotate(0.3); // rotate to the right
        push();
          branch(level);
        pop();
      rotate(-0.6); // rotate back to the left
        push();
          branch(level);
        pop();
     }else{
      // no branch (continue at the same depth)
      branch(level);
    }
  }else if(level === 0){
    // 最後に花を添える
		blendMode(ADD);
    noStroke();
    fill(340,30,100,1.5);
    ellipse(random(-100,100),random(-100,100),random(150,600),random(150,600));
    ellipse(random(-100,100),random(-100,100),random(150,600),random(150,600));
    ellipse(random(-100,100),random(-100,100),random(150,600),random(150,600));
    ellipse(random(-100,100),random(-100,100),random(150,600),random(150,600));
    ellipse(random(-100,100),random(-100,100),random(150,600),random(150,600));
  }
}

function mouseReleased(){
	clear();
  redraw();
}