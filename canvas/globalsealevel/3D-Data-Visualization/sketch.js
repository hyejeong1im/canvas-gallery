let table;
let myCanvas;
let date = [], gsml = [], year = [];
let boxSize = 400;
let font1;

function preload() {
    table = loadTable("assets/dataset.csv", "csv", "header");
    font1 = loadFont("assets/Roboto.ttf");
}

function setup() {
    let canvasW = windowWidth * 3 / 5;
    let canvasH = windowHeight;
    myCanvas = createCanvas(canvasW, canvasH, WEBGL);
    myCanvas.position(0, (windowHeight - canvasH) / 2);

    // set the camera
    createEasyCam();
    document.oncontextmenu = () => false;

    // get the basic info of the data
    numRows = table.getRowCount();
    numCols = table.getColumnCount();
    // print("numRows: " + numRows + " / numCols: " + numCols);

    // load data
    for (let i = 0; i < table.getRowCount(); i++) {
        date[i] = table.getString(i, 0);
        gsml[i] = table.getNum(i, 1);
        year[i] = table.getNum(i, 0);
    }

    // minMax();
    cursor(HAND);
    textFont(font1);
}

function draw() {
    background(240);
    noFill();
    stroke('black');
    strokeWeight(.5);
    box(boxSize);
    push();
    translate(-width / 2, -height/2, -boxSize / 2);
    mainGraph();
    pop();
}

// x - axis : year
// y - axis : sea Level
// z - axis : month

let nextX, nextY, nextZ;

function mainGraph() {
    let gapx = boxSize / (year[numRows - 1] - year[0]);
    let gapz = boxSize / 11;

    for(let i = 0; i < table.getRowCount(); i++) {
        let x = width / 2 - boxSize / 2 + gapx * abs((i) / 12);
        let y = map(gsml[i], -3.5, 79.5, height / 2 + boxSize / 2, height / 2 - boxSize / 2);
        let z = gapz * (i % 12);

        let size = map(gsml[i], -3.5, 79.5, 1, 15);
        strokeWeight(size);
        stroke('blue');
        point(x, y, z);

        // tag
        push();
        translate(0, 0, z);
        textSize(5);
        fill('black');
        textAlign(CENTER);
        text(gsml[i], x, y + 20);
        pop();

        //connecting the points
        if (i < numRows - 1) {
            nextX = width / 2 - boxSize / 2 + gapx * abs((i + 1) / 12);
            nextY = map(gsml[i + 1], -3.5, 79.5, height / 2 + boxSize / 2, height / 2 - boxSize / 2);
            nextZ = gapz * ((i + 1) % 12);
        }

        strokeWeight(1);
        beginShape();
        if (i % 12 != 11) {
            vertex(x, y, z);
            vertex(nextX, nextY, nextZ);
        }
        endShape();
    }
}

// let dataMin, dataMax = 0;

// function minMax() {

//     for (let i = 0; i < numRows; i++) {
//         if (table.getNum(i, 1) > dataMax) {
//             dataMax = table.getNum(i, 1);
//         }
//     }

//     dataMin = dataMax;

//     for (let i = 0; i < numRows; i++) {
//         if (table.getNum(i, 1) < dataMin) {
//             dataMin = table.getNum(i, 1);
//         }
//     }

//     print("Max : " + dataMax + ", Min : " + dataMin);
// }