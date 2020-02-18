let num=160;
const char_sets=[
  "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9"
];
let cur_char=[];
let cur_count=[];
let wait_count=[];
let invisible_count=[];
let base_radius=40;
let v=[];
let hue=0;
let e_x, e_y, e_r, e_alpha;
let e_is=false;

function setup(){
  createCanvas(windowWidth,windowHeight);
  frameRate(30);
  colorMode(HSB,360,100,100,100);
  textSize(15);
  noStroke();
  initialize_all();
}
function draw(){
  background(hue,50,90);
  let _hue;
  if(hue <= 180){
    _hue=hue+180;
  }else{
    _hue=hue-180;
  }
  for (let i = 0; i < num; i++) {
    if(invisible_count[i]<=0){
      const _alpha=map(cur_count[i],wait_count[i],0,100,0);
      fill(_hue,50,90,_alpha);
      text(cur_char[i],v[i].x,v[i].y);
      // update
      cur_count[i]--;
      if(cur_count[i]<=0){
        initialize(i);
      }
    }else{
      invisible_count[i]--;
    }
  }
  if(e_is === true){
    push();
    noFill();
    strokeWeight(3);
    stroke(_hue,50,90,e_alpha);
    ellipse(e_x,e_y,e_r,e_r);
    pop();
    
    e_r+=12;
    e_alpha-=3;
    if(e_alpha <= 0){
      e_is=false;
    }
  }
}
let initialize = (_i) => {
  invisible_count[_i]=floor( random(5)*random(5)*random(5)
                            /random(5)/random(5)/random(5)
                           );
  wait_count[_i]=30;
  cur_count[_i]=wait_count[_i];
  cur_char[_i]=char_sets[floor(random(0,char_sets.length-1))];
  const _xPos=mouseX + base_radius * random(0.3,1.2) * cos(radians(random(360)));
  const _yPos=mouseY + base_radius * random(0.3,1.2) * sin(radians(random(360)));
  v[_i]=createVector(_xPos,_yPos);
}
let initialize_all = () => {
  for(let i=0; i<num; i++){
    initialize(i);
  }
}
function mousePressed() {
  hue = random(360);
  e_x=mouseX;
  e_y=mouseY;
  e_r=0;
  e_alpha=100;
  e_is=true;
}