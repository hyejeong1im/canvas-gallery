float noiseY;
float x = 0;
float y;

void setup() {
  size(400, 400);
  background(255);
}

void draw() {
  if(x == width) {
    x=-50;
    background(255);
  }
  else {
    x++;
  }
  y = noise (noiseY) * height;
  float y2 = y/2;
  ellipse(x, y,y2,y2);
  noiseY += 0.01;
}
