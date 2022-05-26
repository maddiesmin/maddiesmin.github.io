// Global variable to store the classifier
let classifier;

// Label
let label = "";

// Teachable Machine model URL:
let soundModelURL = 'https://teachablemachine.withgoogle.com/models/EB1BUWz_j/model.json';

var hydra = new Hydra({
  canvas: document.getElementById("myCanvas")
})
osc(10, 0.1, 3).hue().modulate(noise(4)).out()

let hc, pg;

let clapping = false;
let helloing = false;
let clicking = false;

function preload() {
  // Load the model
  classifier = ml5.soundClassifier(soundModelURL);
}

function setup() {
  createCanvas(1000, 800);
  hc = select("#myCanvas")
  hc.hide()
  background(255);
  pg = createGraphics(width, height)
  // Start classifying
  // The sound model will listen to the microphone
  classifier.classify(gotResult);
  osc(10, 0.1, 1).hue().modulate(noise(3)).out()
}

function draw() {
  pg.image(hc, 0, 0);
  pg.loadPixels()
  d = pg.pixelDensity()
  noStroke()
  for (let i = 0; i < 200; i++) {
    let x = int(random(width));
    let y = int(random(height));
    let id = 4 * d * (x + y * width * d)
    fill(pg.get(x, y))
    ellipse(x, y, 5);
  }
}

// The model recognizing a sound will trigger this event
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  console.log(results[0]);
  label = results[0].label;
  
  if(label == "clap"){
    if (!clapping) {
      hydraFunc1();
      clapping = true;
      helloing = false;
      clicking = false;
    }
  }
  else if(label == "testing"){
    if (!helloing){
      hydraFunc2();
      helloing = true;
      clapping = false;
      clicking = false;
    }
  }
  else if(label == "c5"){
    if (!clicking){
      hydraFunc3();
      clicking = true;
      helloing = false;
      clapping = false;
    }
  }
  else{
    osc(10, 0.1, 3).hue().modulate(noise(4)).out()
  }
}

function hydraFunc1(){
  background(255);
  osc(215, 0.1, 2).modulate(osc(2, -0.3, 100).rotate(15)).mult(osc(215, -0.1, 2).pixelate(50, 50)).color(0.9, 0.0, 0.9).modulate(osc(6, -0.1).rotate(9)).add(osc(10, -0.9, 900).color(1,0,1)).mult(shape(900, 0.2, 1).luma().repeatX(2).repeatY(2).colorama(10)).modulate(osc(9, -0.3, 900).rotate(6)).add(osc(4, 1, 90).color(0.2,0,1)).out();
}

function hydraFunc2(){
  background(255);
  osc(18, 0.1, 0).color(2, 0.1, 2).mult(osc(20, 0.01, 0)).repeat(2, 20).rotate(0.5).modulate(o1).scale(1, () => (a.fft[0]*0.9 + 2)).diff(o1).out(o0);
  osc(20, 0.2, 0).color(2, 0.7, 0.1).mult(osc(40)).modulateRotate(o0, 0.2).rotate(0.2).out(o1);
}

function hydraFunc3(){
  voronoi(5,-0.1,5).add(osc(1,0,1)).kaleid(21).scale(1,1,2).colorama().out(o1);
  src(o1).mult(src(s0).modulateRotate(o1,100), -0.5).out(o0);
}