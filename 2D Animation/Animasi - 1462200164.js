// 1462200164 - Kevin Yauwry

let array;
let total, ukuran;

function setup() {
  createCanvas(600, 500);
  ukuran = 10;
  total = 12;
  array = [];
}

function draw() {
  background(240);
  
  for(let i = 0; i < array.length; i++) {
    array[i].show();
    array[i].move();
    array[i].bounce();
  }
}

function mousePressed() {
  for(let i = 0; i < total; i++) {
    array.push(
      new Kotak(mouseX, mouseY, ukuran * 2, 
               random(-4, 4), 
               random(-4, 4))
    );
  } 
}

function Kotak(x, y, ukuran, kecX, kecY) {
  this.x = x;
  this.y = y;
  this.ukuran = ukuran;
  this.kecX = kecX;
  this.kecY = kecY;
  this.arah = random(TWO_PI); // Random initial angle
  this.rotasi = random(-0.1, 0.1); // Random rotation speed
  this.warna = color(random(255), random(255), random(255));
  
  this.show = function() {
    fill(this.warna);
    
    push();
    translate(this.x, this.y);
    rotate(this.arah);
    rectMode(CENTER);
    rect(0, 0, this.ukuran, this.ukuran);
    pop();
  }
  
  this.move = function() {
    this.x += this.kecX;
    this.y += this.kecY;
    this.arah += this.rotasi;
  }
  
  this.bounce = function() {
    if(this.x > width - this.ukuran / 2 || this.x < this.ukuran / 2) {
      this.kecX *= -1;
    }
    if(this.y > height - this.ukuran / 2 || this.y < this.ukuran / 2) {
      this.kecY *= -1;
    }
  }
}
