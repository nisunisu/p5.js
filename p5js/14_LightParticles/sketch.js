// うまく動かないので一旦ペンディングする
// let num=1;
// let light_particle;
// function setup() {
//   createCanvas(400,400);
// 	frameRate(2);
//   colorMode(RGB);
//   pixelDensity(1);
// 	// noLoop();
//   light_particle = new LightParticle(num);
// }

// function draw() {
// 	background(0);
//   light_particle.run();
// }

// class LightParticle{
//   constructor(particle_num){
// 		this.num=particle_num;
// 		this.xPos=[];
// 		this.yPos=[];
// 		for(let i=0; i<this.num; i++){
// 		  this.xPos[i]=random(width);
// 		  this.yPos[i]=random(height);
// 		}

// 		this.side=50;
// 		// initial color val
// 		this.red=150;
// 		this.green=100;
// 		this.blue=20;
// 	}
// 	run(){
// 		loadPixels();
//       for(let i=0; i<this.num; i++){
// 	      this.display(i);
// 		    this.update(i);
// 	    }
// 		updatePixels();
// 		this.display_rect(0);
// 	}
// 	display(i){
// 		for(let y=this.yPos[i]-this.side; y<=this.yPos[i]+this.side; y++){
// 			for(let x=this.xPos[i]-this.side; x<=this.xPos[i]+this.side; x++){
// 				let pixel_id = 4*(x + y*width);
// 				pixels[pixel_id + 0] = sq( this.red   / dist(this.xPos[i], this.yPos[i], x, y) );
// 				pixels[pixel_id + 1] = sq( this.green / dist(this.xPos[i], this.yPos[i], x, y) );
// 				pixels[pixel_id + 2] = sq( this.blue  / dist(this.xPos[i], this.yPos[i], x, y) );
// 			}
// 		}
// 	}
// 	update(i){
// 	  this.xPos[i]+=5;
// 		this.yPos[i]+=5;
// 		console.log(this.xPos+","+this.yPos);
// 	}
// 	display_rect(i){
// 		rect(this.xPos[i],this.yPos[i],20,20);
// 	}
// }