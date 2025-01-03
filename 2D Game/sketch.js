// 1462200164 - Kevin Yauwry

let backgroundImg, berdiriImg, lompatImg, jamurImg, pipaImg, coinImg;
let player, jamur = [], pipa = [], score = 0;
let bgX = 0, gameOver = false, show100 = false, show100X = 0, show100Y = 0;
let lompat = 0;

function preload() {
  backgroundImg = loadImage('assets/background.jpg');
  berdiriImg = loadImage('assets/idle.png');
  lompatImg = loadImage('assets/jump.png');
  jamurImg = loadImage('assets/mushroom.png');
  pipaImg = loadImage('assets/pipe.png');
  coinImg = loadImage('assets/coin.png');
}

function setup() {
  createCanvas(800, 400);
  player = new Player();
}

function draw() {
  if (gameOver) {
    background(0);
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text('GAME OVER', width / 2, height / 2);
    textSize(16);
    text('Score: ' + score, width / 2 - 10, height / 2 + 40);
    image(coinImg, width / 2 + 30, height / 2 + 29, 20, 20);
    text('TAP THE SCREEN TO RESTART', width / 2, height / 2 + 80);
    return;
  }

  // Scrolling background
  bgX -= 5;
  if (bgX <= -backgroundImg.width) {
    bgX = 0;
  }
  image(backgroundImg, bgX, 0, backgroundImg.width, height);
  image(backgroundImg, bgX + backgroundImg.width, 0, backgroundImg.width, height);

  player.update();
  player.show();

  if (frameCount % 150 === 0) {
    jamur.push(new musuh());
  }
  if (frameCount % 200 === 0) {
    pipa.push(new Pipe());
  }

  for (let o of jamur) {
    o.update();
    o.show();
    if (player.hits(o)) {
      gameOver = true;
    }
  }

  for (let p of pipa) {
    p.update();
    p.show();
    if (player.hits(p)) {
      gameOver = true;
    }
  }

  jamur = jamur.filter(o => !o.offscreen());
  pipa = pipa.filter(p => !p.offscreen());

  fill(255);
  textSize(16);
  textAlign(LEFT, TOP);
  text('Score: ' + score, 10, 10);
  image(coinImg, 90, 7, 20, 20);

  if (show100) {
    fill(255, 255, 0);
    textSize(32);
    image(coinImg, show100X - 30, show100Y, 30, 30);
    text('100', show100X, show100Y);
  }
}

function keyPressed() {
  if ((key === ' ' || keyCode === UP_ARROW || key === 'w' || key === 'W') && lompat < 2) {
    player.jump();
    lompat++;
  }
  if (keyCode === RIGHT_ARROW || key === 'd' || key === 'D') {
    player.move(1);
  }
  if (keyCode === LEFT_ARROW || key === 'a' || key === 'A') {
    player.move(-1);
  }
}

function mousePressed(){
  if(lompat<2){
    player.jump();
    lompat++;
  }
}

function keyReleased() {
  if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW|| key === 'a' || key === 'd' || key === 'A' || key === 'D') {
    player.stop();
  }
}

function mousePressed() {
  if (gameOver) {
    resetGame();
  }
}

function resetGame() {
  gameOver = false;
  score = 0;
  player = new Player();
  jamur = [];
  pipa = [];
  loop();
}

class Player {
  constructor() {
    this.x = 50;
    this.y = height - 108; 
    this.yVelocity = 0;
    this.xVelocity = 0;
    this.gravity = 0.3;
    this.jumpPower = -9.5;
    this.speed = 5;
    this.standing = true;
    this.facing = 1;
  }

  update() {
    this.y += this.yVelocity;
    this.x += this.xVelocity;
    this.yVelocity += this.gravity;
    if (this.y >= height - 108) {
      this.y = height - 108;
      this.yVelocity = 0;
      this.standing = true;
      lompat = 0;
    } else {
      this.standing = false;
    }
    this.x = constrain(this.x, 0, width - 50);
  }

  jump() {
    this.yVelocity = this.jumpPower;
  }

  move(direction) {
    this.xVelocity = this.speed * direction;
    this.facing = direction;
  }

  stop() {
    this.xVelocity = 0;
  }

  show() {
    push();
    translate(this.x + 25, this.y + 25);
    scale(this.facing, 1); 
    imageMode(CENTER);
    if (this.standing) {
      image(berdiriImg, 0, 3, 50, 50);
    } else {
      image(lompatImg, 0, 0, 50, 50);
    }
    pop();
  }

  hits(musuh) {
    if (tabrak(this.x, this.y, 40, 40, musuh.x, musuh.y, musuh.w, musuh.h)) {
      if (this.y < musuh.y && this.yVelocity > 0) {
        score += 100;
        show100 = true;
        show100X = this.x + 20;
        show100Y = this.y - 20;
        setTimeout(() => show100 = false, 500);
        jamur = jamur.filter(o => o !== musuh);
        return false;
      }
      return true;
    }
    return false;
  }
}

class musuh {
  constructor() {
    this.x = width;
    this.y = height - 102;
    this.w = 70;
    this.h = 70;
    this.speed = random(4, 8);
  }

  update() {
    this.x -= this.speed;
  }

  show() {
    image(jamurImg, this.x, this.y, this.w, this.h);
  }

  offscreen() {
    return this.x < -this.w;
  }
}

class Pipe {
  constructor() {
    this.x = width;
    this.w = 40;
    this.h = random(190, 280);
    this.y = height - this.h + 50;
    this.speed = 5;
    this.yDirection = -1;
  }

  update() {
    this.x -= this.speed;
  }

  show() {
    image(pipaImg, this.x, this.y, this.w, this.h);
  }

  offscreen() {
    return this.x < -this.w;
  }
}

function tabrak(x1, y1, w1, h1, x2, y2, w2, h2) {
  return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
}
