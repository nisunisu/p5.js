// outputCanvas.js

// let output_canvas; // 外部ファイル出力
// function setup() {
// let p5Element = createCanvas(400,400); // 外部ファイル出力に用いるため変数にCanvas要素を格納する
// output_canvas = new OutputCanvas(p5Element.canvas,gif,180); // 外部ファイル出力
// }
// function draw(){
// output_canvas.run(frameCount); // 外部ファイル出力
// }

class OutputCanvas{
  // constructor(HtmlCanvasElement_canvas,format_type,max_frame_count){
  constructor(HtmlCanvasElement_canvas){
    this.canvas=HtmlCanvasElement_canvas; // HTMLCanvasElementインタフェースのcanvas要素
    // this.format_type=format_type; // gif or png
    // this.max_frame_count=max_frame_count;

    this.capturer = new CCapture({
      // format: this.format_type,
      format: 'gif',
      workersPath: '../gif.js/dist/',
      verbose: true
    });
    this.capturer.start(); // キャプチャ開始
  }

  // GIF出力
  // run (current_frame_count){
  run (current_frame_count,max_frame_count){
    // if( current_frame_count <= this.max_frame_count ){
    if( current_frame_count <= max_frame_count ){
      this.capturer.capture(this.canvas);
    }else{
      this.capturer.stop();
      this.capturer.save();
      noLoop();
    }
  }
}