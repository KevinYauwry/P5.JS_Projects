// Kevin Yauwry (1462200164)

let teksturBumi, teksturBulan, teksturMatahari;

function preload(){
  teksturBumi = loadImage('earthmap1k.jpg');
  teksturBulan = loadImage('moonmap1k.jpg');
  teksturMatahari = loadImage('sunmap.jpg');
}

function setup() {
  createCanvas(1000, 720, WEBGL);
}

function draw() {
  background(0);
  camera(0, -500, 700);

  push();  
    strokeWeight(3);
    rotateX(HALF_PI);
    noFill();
    stroke(255, 100);
    circle(0, 0, 800);
  pop();

  matahari();

  pointLight(255, 255, 255, 0, 0, 0);

  push();  
    bumi();
    push();
      bulan();
    pop();
  pop();
}

function matahari(){
  push();  
    rotateY(millis() * 0.001 * radians(-10));
    texture(teksturMatahari);
    noStroke();
    sphere(150);
  pop();
}

function bumi(){
  rotateY(millis() * 0.001 * radians(30));
  translate(400, 0);
  rotateY(millis() * 0.001 * radians(60));
  texture(teksturBumi);
  noStroke();
  sphere(50);
}

function bulan(){
  rotateY(millis() * 0.001 * radians(90));
  translate(100, 0);
  rotateY(millis() * 0.001 * radians(50));
  texture(teksturBulan);
  noStroke();
  sphere(15);
}
