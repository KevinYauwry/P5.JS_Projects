// 1462200164 - Kevin Yauwry

let input, img, capture;
let fotoSepia, fotoGray, fotoPixel;
let button1, button2, button3, button4, buttonSave;
let showSepia = false, showGray = false, showPixel = false, showNormal = false;
let textInput, slider1, slider2, textX, textY;

function setup() {
  createCanvas(1000, 600);
  input = createFileInput(cekImage);
  input.position(20, 510);
  
  textInput = createInput();
  textInput.position(130, 560);
  
  slider1 = createSlider(0, 874, 0);
  slider1.position(400, 560);
  slider1.size(50);
  textX = createInput('0');
  textX.position(350, 560);
  textX.size(32);

  slider2 = createSlider(0, 500, 0);
  slider2.position(540, 560);
  slider2.size(50);
  textY = createInput('0');
  textY.position(490, 560);
  textY.size(32);
  
  textX.input(() => {
    let val = int(textX.value());
    slider1.value(val);
  });

  textY.input(() => {
    let val = int(textY.value());
    slider2.value(val);
  });
  
  button0 = createButton("Normal");
  button0.position(220, 510);
  button0.mousePressed(() => {
    if (img) {
      applyFilter('normal');
    }
  });
  
  button1 = createButton("Sepia");
  button1.position(290, 510);
  button1.mousePressed(() => {
    if (img) {
      applyFilter('sepia');
    }
  });
  
  button2 = createButton("Grayscale");
  button2.position(360, 510);
  button2.mousePressed(() => {
    if (img) {
      applyFilter('grayscale');
    }
  });
  
  button3 = createButton("Pixelated");
  button3.position(460, 510);
  button3.mousePressed(() => {
    if (img) {
      applyFilter('pixelate', 5);
    }
  });

  button4 = createButton("Ambil Foto");
  button4.position(560, 510);
  button4.mousePressed(() => {
    capture = createCapture(VIDEO);
    capture.size(500, 500);
    capture.hide();
    img = capture;
  });

  buttonSave = createButton("Save");
  buttonSave.position(610, 557);
  buttonSave.mousePressed(saveCanvasImage);
  
}

function draw() {
  background(255);
  
  textSize(14);
  text("Masukkan Text :", 20, 575);
  text("x : ", 325, 575);
  text("y : ", 470, 575);
  
  fill(0);
  strokeWeight(10);
  stroke(255);
  rect(0, 0, width, 500);

  if (img) {
    if (img === capture) {
      image(capture, 0, 0);
    } else {
      image(img, 0, 0);
    }
  }

  if (showSepia) {
    image(fotoSepia, img.width, 0);
  } else if (showGray) {
    image(fotoGray, img.width, 0); 
  } else if (showPixel) {
    image(fotoPixel, img.width, 0); 
  } else if (showNormal){
    image(img, img.width,0);
  }

  let inputText = textInput.value();
  let x = slider1.value();
  let y = slider2.value();
  
  textX.value(x);
  textY.value(y);
  
  push();
  textSize(28);
  fill(255);
  noStroke();
  textStyle(BOLD);
  text(inputText, x, y);
  pop();
}

function cekImage(file) {
  if (file.type === 'image') {
    loadImage(file.data, (loadedImage) => {
      img = loadedImage;
    });
  } else {
    img = null;
  }
}

function applyFilter(type, size) {
  if (img) {
    let sourceImage;
    if (img === capture) {
      sourceImage = createImage(capture.width, capture.height);
      sourceImage.copy(capture, 0, 0, capture.width, capture.height, 0, 0, capture.width, capture.height);
    } else {
      sourceImage = img;
    }

    let newImage = createImage(sourceImage.width, sourceImage.height);
    newImage.loadPixels();
    sourceImage.loadPixels();

    for (let i = 0; i < sourceImage.width; i++) {
      for (let j = 0; j < sourceImage.height; j++) {
        let warna = sourceImage.get(i, j);
        let r = red(warna);
        let g = green(warna);
        let b = blue(warna);
        let sr, sg, sb;

        if (type === 'sepia') {
          sr = 0.393 * r + 0.769 * g + 0.189 * b;
          sg = 0.349 * r + 0.686 * g + 0.168 * b;
          sb = 0.272 * r + 0.534 * g + 0.131 * b;
          newImage.set(i, j, color(sr, sg, sb));
        } 
        else if (type === 'grayscale') {
          let gray = (r + g + b) / 3;
          newImage.set(i, j, color(gray));
        } 
        else if (type === 'pixelate' && size) {
          if (i % size === 0 && j % size === 0) {
            for (let dx = 0; dx < size; dx++) {
              for (let dy = 0; dy < size; dy++) {
                let px = i + dx;
                let py = j + dy;
                if (px < sourceImage.width && py < sourceImage.height) {
                  newImage.set(px, py, color(r, g, b));
                }
              }
            }
          }
        }
      }
    }
    newImage.updatePixels();
    
    if (type === 'sepia') {
      fotoSepia = newImage;
      showSepia = true;
      showGray = false;
      showPixel = false;
    } else if (type === 'grayscale') {
      fotoGray = newImage;
      showGray = true;
      showSepia = false;
      showPixel = false;
      showNormal = false;
    } else if (type === 'pixelate') {
      fotoPixel = newImage;
      showPixel = true;
      showSepia = false;
      showGray = false;
      showNormal = false;
    } else if (type === 'normal'){
      showNormal = true;
      showPixel = false;
      showSepia = false;
      showGray = false;
    }
  }
}

function saveCanvasImage() {
  let partialCanvas = get(0, 0, 1000, 500);
  partialCanvas.save('myCanvas', 'png');
}
