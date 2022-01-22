let stars = [];
let speed = 10;
let minSpeed;


function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent('spacefield');

  for (var i = 0; i < 800; i++) {
    stars[i] = new Star();
  }
  minSpeed = speed;
}

function draw() {
  background(0);
  // translate(width / 2, height / 2);
  translate(mouseX, mouseY);

  for (var i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }

  if (mouseIsPressed) {
    speed++;
  } else {
    if (speed == minSpeed) {
      speed = minSpeed;
    } else {
      speed--;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}