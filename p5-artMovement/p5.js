let titleFont, eFont, hFont;
let sList = []; //문자배열 
let su = [-180, -60, 60, 180]; //x축 배열 
let R, G, B;


function preload() {
    //폰트설정 
    titleFont = loadFont('font/snellRoundhand.otf');
    eFont = loadFont("font/mermaid.ttf");
    hFont = loadFont("font/nanumMyeongjo.ttf");
}

function setup()
{
  // 문자 배열에 값 넣기 
  sList.push("Renaissance");
  sList.push("Baroque");
  sList.push("Rococo");
  sList.push("Romanticism");
  sList.push("Naturalism");
  sList.push("Realism");
  sList.push("Impressionism");
  sList.push("Neo-impressionism");
  sList.push("Post-Impressionism");
  sList.push("Expressionism");
  sList.push("Cubism");
  sList.push("Fauvism");
  sList.push("Suprematism");
  sList.push("Surrealism");
  sList.push("Abstractionism");
  sList.push("Dadaism");


  createCanvas(600, 800);
  translate(width/2, 0);

  // 배경색 랜덤 지정 
  R = random(255);
  G = random(255);
  B = random(255);
  background(R, G, B);
  //prletln(R, G, B);

  // 원을 특정 위치 내에서 랜덤으로 배치
  fill(0, 50);
  noStroke();
  ellipse(random(-220, 220), random(280, 720), 50, 50);

  //배경색이 밝다면 글자,선색을 진하게 
  if ((R+G+B)/3 >150 || R>230 || G>230 || B>230) {
    fill(0);
    stroke(0);
  } else {
    fill(255);
    stroke(255);
  }

  // 타이틀 
  strokeWeight(3);
  line(-160, 70, 160, 70);
  strokeWeight(1);
  line(-160, 75, 160, 75);
  textAlign(CENTER);
  textFont(titleFont);
  textSize(48);
  text("Art movement", 0, 136);
  strokeWeight(0.5);
  line(-160, 160, 160, 160);
  // 서브타이틀 
  textFont(hFont);
  strokeWeight(0);
  textSize(12);
  text("시대와 분위기에 따라 변하는 미술 사상의 흐름", 0, 187);
  line(-160, 205, 160, 205);
  strokeWeight(2);
  line(-160, 210, 160, 210);
  // 타이틀 끝

  strokeWeight(0.5);

  // 아이콘 배열 배치 
  let h = 350; //y축 위치 변수 
  let k = 0; // 문자배열 자리수
  for (let i=0; i<4; i++) { //총 4단 
    for (let j=0; j<4; j++) { //총 4열 
      text(sList[k], su[j], h); //해당자리에 텍스트 입력
      k++; //문자배열자리수+1
    }
    h = h + 120; //y축에 더하여 새로운 단 만들기
  }

  noFill();
  textFont(eFont);
  textSize(14);

  strokeWeight(2);
  //르네상스 
  line(-180, 280, -180, 320);
  line(-200, 300, -160, 300);

  //바로크
  rectMode(CENTER);
  arc(-60, 300, 40, 40, 0, PI);
  arc(-60, 300, 40, 40, -PI, -PI/3.4);
  arc(-40, 290, 18, 18, PI/2, PI);
  arc(-40, 290, 18, 18, -PI, -PI/1.2);

  //로코코
  arc(60, 305, 50, 50, -PI, -PI/2);
  arc(60, 305, 50, 50, -PI/2, 0);
  line(60, 320, 35, 305);
  line(60, 320, 85, 305);
  line(60, 320, 48, 284);
  line(60, 320, 72, 284);

  //낭만주의
  line(180, 280, 180, 320);
  line(160, 300, 200, 300);
  line(165, 285, 195, 315);
  line(195, 285, 165, 315); 

  //자연주의
  arc(-180, 430, 25, 25, 0, PI);
  line(-180, 400, -192.5, 429);
  line(-180, 400, -167.5, 429);

  //사실주의
  line(-85, 420, -75, 420);
  line(-75, 420, -65, 440);
  line(-65, 440, -55, 400);
  line(-55, 400, -45, 420);
  line(-45, 420, -35, 420);

  //인상주의
  ellipse(50, 420, 40, 40);
  ellipse(70, 420, 40, 40);

  //신인상주의
  ellipse(170, 410, 19, 19);
  ellipse(190, 410, 19, 19);
  ellipse(170, 430, 19, 19);
  ellipse(190, 430, 19, 19);

  //후기인상주의
  line(-180, 515, -180, 522);
  line(-167, 535, -160, 535);
  line(-200, 535, -193, 535);
  line(-180, 548, -180, 555);

  //표현주의
  bezier(-40, 527, -60, 517, -60, 537, -80, 527);
  bezier(-40, 540, -60, 530, -60, 550, -80, 540);
  bezier(-40, 553, -60, 543, -60, 563, -80, 553);

  //입체파
  beginShape();
  vertex(60, 512);
  vertex(81, 523);
  vertex(81, 548);
  vertex(60, 563);
  vertex(39, 548);
  vertex(39, 523);
  endShape(CLOSE);
  line(60, 538, 60, 563);
  line(39, 523, 60, 538);
  line(81, 523, 60, 538);

  //야수파
  ellipse(180, 540, 40, 40);
  line(166, 527, 194, 554);

  //절대주의 
  rect(-180, 660, 40, 40);
  rect(-180, 660, 30, 30);

  //초현실주의
  ellipse(-60, 655, 36, 36);
  line(-60, 674, -60, 683);

  //추상주의
  rect(50, 650, 20, 20);
  rect(70, 670, 20, 20);

  //다다이즘
  line(160, 640, 165, 640);
  line(170, 640, 175, 640);
  line(180, 640, 185, 640);
  line(190, 640, 195, 640);

  line(160, 640, 160, 645);
  line(160, 650, 160, 655);
  line(160, 660, 160, 665);
  line(160, 670, 160, 675);

  line(160, 680, 162, 680);
  line(167, 680, 172, 680);
  line(177, 680, 182, 680);
  line(187, 680, 192, 680);

  line(200, 640, 200, 642);
  line(200, 648, 200, 652);
  line(200, 658, 200, 662);
  line(200, 668, 200, 672);

  line(200, 680, 197, 680);
  line(200, 680, 200, 677);

}
