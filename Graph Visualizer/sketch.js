// Kevin Yauwry - 1462200164

let data = [];
let suhu = [];

function preload(){
  data = loadStrings("kvn.txt");
}

function setup() {
  createCanvas(1200, 600);
  
  data = split(data[0],",");
  for(let i in data){
    suhu[i] =  parseFloat(data[i]);
  }
}

function draw() {
  background(225);
  translate(0,height);
  scale(1,-1);
  
  grafBar();
  grafLine();
}

function grafBar(){
  strokeWeight(4);
  for(let i=0;i<suhu.length;i++){
    stroke(0);
    fill(map(suhu[i],39,41,255,0));
    rect(i*width/suhu.length,0,
        width/suhu.length, 
        map(suhu[i],39,41,0,height));
  }
}

function grafLine(){
  
  for(let i=0;i<suhu.length-1;i++){
    strokeWeight(4);
    line(i*width/suhu.length + 0.5*(width/suhu.length),
        map(suhu[i],39,41,0,height),
        (i+1)*width/suhu.length + 0.5*(width/suhu.length),
        map(suhu[i+1],39,41,0,height))
  }
  
  for(let i=0;i<suhu.length;i++){
    strokeWeight(10);
    point(i*width/suhu.length + 0.5*(width/suhu.length),
        map(suhu[i],39,41,0,height));
    
    push();
    translate(i*width/suhu.length + 0.5*(width/suhu.length),
        map(suhu[i],39,41,0,height));
    scale(1,-1);
    
    strokeWeight(2);
    rectMode(CENTER);
    fill(255);
    rect(0,-20,50,20);
    
    fill(0);
    textAlign(CENTER,CENTER);
    textSize(14);
    text(nf(suhu[i],0,2),0,-20);
    pop();
  }
  
}