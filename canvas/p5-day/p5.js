let a = 1;
let b = 0;

function setup()
{
   createCanvas(255, 255);
   background(0, 150, 255);
   textSize(15);
}

function draw()
{
   if (a > 280) {
      background(0, 0, b);
      b = b + 1.5;
   }
   else {
      background(0, 0, 255 - a);
      b = 0;
   }

   stroke(255);
   fill(0, 0, 0, 0);
   ellipse(125, 125, 200, 200);
   noStroke();
   fill(255, mouseY, 0);

   push();

   translate(width / 2, height / 2);
   let angle = PI * a / float(height);
   rotate(angle);
   a = a + 1;

   if (a == 510) {
      a = 1;
   }
   if (a > 280) {
      fill(255, 255 - b, 0);
   }
   else {
      fill(255, a - b, 0);
   }

   ellipse(70, -70, 40, 40);
   pop();
   fill(255);

   if (a < 90 || a > 350) {
      text("SUN", 112, 132);
   }
   else {
      text("MOON", 104, 132);
   }
}