let maxlevel=20;

function setup() {
	let p5Element = createCanvas(windowWidth, windowHeight);
	colorMode(HSB,360,100,100,100);
	background(0,0,100);
	rectMode(CENTER);
	angleMode(DEGREES);
	// noFill();
	noLoop();
  // output_canvas = new OutputCanvas(p5Element.canvas,"gif",180); // ファイル出力
}

function draw() {
	recursive_rect(maxlevel);
  // save("myCanvas.jpg");
  // output_canvas.run(frameCount); // ファイル出力
}

function recursive_rect(level){
	let current_level=level;
	push();
    translate(width/2, height/2);
			let current_angle=map(current_level,maxlevel,0,0,90);
			rotate(current_angle);
	      let hue=map(current_level,maxlevel,0,0,360);
	      stroke(hue,80,80);
	      fill(hue,50,80);
	      let current_dia=map(current_level,maxlevel,0,500,10);
		    rect(0,0,current_dia,current_dia);
	pop();
	current_level -= 1;
	if(current_level >= 0){
	  recursive_rect(current_level); // Recurse
	}
}