let xoff=0.08;
let yoff=0.09;
const num=10;
function setup() {
  createCanvas(400, 400);
	colorMode(HSB,360,100,100,100);
	// blendMode(ADD);
	// noLoop();
	noStroke();
}

function draw() {
  background(0);
	for(let x=0; x<num; x++){
  	for(let y=0; y<num; y++){
	    const thisXoff=xoff+x/10;
	    const thisYoff=yoff+y/10;
			const hue=360*noise(thisXoff,thisYoff);
			fill(hue,80,80,60);
			ellipse(width/num*x,height/num*y,80,80);
	  }
	}
	
	//update
	xoff+=0.02;
	yoff+=0.05;
}