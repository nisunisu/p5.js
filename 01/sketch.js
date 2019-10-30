let start=0;
let end  =QUARTER_PI;
let startAdd=0.03;
let endAdd  =0.01;
let radius=100;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  arc(0,0,radius,start,end);

  start+=startAdd;
  end  +=endAdd;
  if(start>end){
    let tmp=start;
    start=end;
    end  =tmp;
    start=start%PI;
    end  =end%PI;
  }
}