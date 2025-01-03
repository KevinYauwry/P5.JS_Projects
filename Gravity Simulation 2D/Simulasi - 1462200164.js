/*
    Evaluasi Pemrograman #9 - Grafkom
    1462200164 - Kevin Yauwry
*/

function setup() {
  createCanvas(600, 500);
  total = 12;
  ballArray = [];
  
  gravitasi = createVector(0,0);
  angin = createVector(0,0);
  gesek = createVector(0,0);
  c = 1;
}

function draw() {
  background(235);
  
  for(let i=0;i<ballArray.length;i++){
    ballArray[i].show();
    ballArray[i].addForce(gravitasi);
    ballArray[i].addForce(angin);
    ballArray[i].move();
    
    gesek = ballArray[i].kec.copy();
    gesek.normalize();
    gesek.mult(c);
    gesek.mult(-1);
    ballArray[i].addForce(gesek);
    
    ballArray[i].bounce();
  }
  
  fill(0);
  textSize(30);
  textAlign(LEFT,CENTER);
  text("Gravitasi : " + gravitasi.y,20,30);
  text("Angin : " + angin.x,20,65);
  
}

function mousePressed(){
    for(let i=0;i<total;i++){
    ballArray.push(
      new Ball(mouseX,mouseY,random(7,17),
               random(-3,3), random(-2,2), // kecepatan
              0,0) // perecepatan
    );
  }  
}

function keyPressed(){
  if(key === 'w' || key === 'W'){
    gravitasi.y += -1;
  }
  if(key === 's' || key === 'S'){
    gravitasi.y += 1;
  }
  if(key === 'a' || key === 'A'){
    angin.x += -1;
  }
  if(key === 'd' || key === 'D'){
    angin.x += 1;
  }
}

function Ball(x,y,r,kecX,kecY,perX,perY){
  this.pos = createVector(x,y);
  this.r = r;
  this.d = this.r * 2;
  this.berat = this.d * 4;
  this.e = -0.85;
  this.kec = createVector(kecX,kecY);
  this.per = createVector(perX,perY);
  this.warna = color(random(255),random(255),random(255));
  
  this.show = function(){
    fill(this.warna);
    circle(this.pos.x,this.pos.y,this.d);
  }
  
  this.addForce = function(gaya){
    let f = gaya.copy();
    f.div(this.berat);
    this.per.add(f);
  }
  
  this.move = function(){
    this.kec.add(this.per);
    this.pos.add(this.kec);
    this.per.mult(0);
  }
  
  this.bounce = function(){
     if(this.pos.x > width-this.r){
       this.pos.x = width-this.r;
       this.kec.x = this.kec.x * this.e;
      }
    if(this.pos.x < this.r){
       this.pos.x = this.r;
       this.kec.x = this.kec.x * this.e;
      }
    if(this.pos.y > height-this.r){
      this.pos.y = height-this.r;
      this.kec.y = this.kec.y * this.e;
      }
    if(this.pos.y < this.r){
      this.pos.y = this.r;
      this.kec.y = this.kec.y * this.e;
      }
  }
  
}