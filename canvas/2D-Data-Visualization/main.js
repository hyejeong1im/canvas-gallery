let table;
let numRows, numCols;
let date = [], gsml = []; // 날짜와 수치 배열
let diagramX, diagramY;

function preload() {
    table = loadTable("assets/sealevel.csv", "csv", "header");
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    windowResized();
    rectMode(CENTER);

    // 테이블 row, column 갯수 얻기
    numRows = table.getRowCount();
    numCols = table.getColumnCount();

    // print("rows: " + numRows + "cols: " + numCols);

    // 데이터 로드
    for(let r = 0; r < table.getRowCount(); r++) {
        date[r] = table.getString(r, 0);
        gsml[r] = table.getNum(r, 1);
        // print(date[r] + " " + gsml[r]);
    }

    minMax();
}

let size = [];

function draw() {
    background(240);
    chartInfo();
    diagramX = (width / 4) * 3 - 90;
    diagramY = height / 2;
    let radius = width / 5 - 100;
    let ang = 360 / numRows;

    for (let i = 0; i < numRows; i++) {
        size[i] = map(gsml[i], -3.5, 79.5, 0, 205);
        let pointx = (size[i] + radius) * cos(radians(ang * i)) + diagramX;
        let pointy = (size[i] + radius) * sin(radians(ang * i)) + diagramY;
        let cirx = radius * cos(radians(ang * i)) + diagramX;
        let ciry = radius * sin(radians(ang * i)) + diagramY;

        // draw the line
        if (i % 12 === 0) {
            stroke('blue');
            strokeWeight(1);
        } else {
            stroke('black');
            strokeWeight(0.3);
        }
        
        line(cirx, ciry, pointx, pointy);

        // hover
        let datasize;
        let dis = dist(mouseX, mouseY, pointx, pointy);
        if (dis < 5) {
            fill('red');
            datasize = 10;
            noStroke();
            circle(pointx, pointy, datasize);

            // draw information
            textAlign(CENTER);
            textSize(12);
            fill('black');
            text(date[i], diagramX, diagramY);

            fill('blue');
            rect(diagramX, diagramY + 15, 30, 5)
            textSize(25);
            text(gsml[i], diagramX, diagramY + 45);
        } else {
            fill('blue');
            datasize = 3;
            noStroke();
            circle(pointx, pointy, datasize);
        }

        // draw the data points
        fill('blue');
        noStroke();
        circle(pointx, pointy, 4);

        // print(size[i]);
    }
}

function chartInfo() {
    textSize(16);
    textAlign(LEFT);
    fill('black');
    text("Global Average Absolute Sea Level Change, 1880-2014 from the US Environmental Protection Agency using data from CSIRO, 2015; NOAA, 2015. This data contains “cumulative changes in sea level for the world’s oceans since 1880, based on a combination of long-term tide gauge measurements and recent satellite measurements. It shows average absolute sea level change, which refers to the height of the ocean surface, regardless of whether nearby land is rising or falling. Satellite data are based solely on measured sea level, while the long-term tide gauge data include a small correction factor because the size and shape of the oceans are changing slowly over time. (On average, the ocean floor has been gradually sinking since the last Ice Age peak, 20,000 years ago.)”", width / 4, height / 4, width / 4);

    textSize(30);
    text("Global Average Absolute Sea Level Change, 1880-2014", width / 4, height / 4 - 120, width / 4);
}

let dataMin, dataMax = 0;

function minMax() {

    for (let i = 0; i < numRows; i++) {
        if (table.getNum(i, 1) > dataMax) {
            dataMax = table.getNum(i, 1);
        }
    }

    dataMin = dataMax;

    for (let i = 0; i < numRows; i++) {
        if (table.getNum(i, 1) < dataMin) {
            dataMin = table.getNum(i, 1);
        }
    }

    print("Max : " + dataMax + ", Min : " + dataMin);
}