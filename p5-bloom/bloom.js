let f = [];

function setup() {
   createCanvas(windowWidth, windowHeight);
   background(245);
   f[1] = loadImage("data/f1.png");
   f[2] = loadImage("data/f2.png");
   f[3] = loadImage("data/f3.png");
   f[0] = loadImage("data/f4.png");
}

function touchStarted() {
   image(f[int(random(4))], mouseX - 100, mouseY - 100, 200, 200);
}
