
/* ======================================== */
/*             Test VT100 Box               */
/* ======================================== */

const testLeftTopHorizontalBox = true;
const testLeftTopVerticalBox = true;
const testRightTopHorizontalBox = true;
const testRightTopVerticalBox = true;
const testLeftBottomHorizontalBox = true;
const testLeftBottomVerticalBox = true;
const testRightBottomHorizontalBox = true;
const testRightBottomVerticalBox = true;
const testFrame = true;
const testFullFrame = true;
const testAllBoxSymbols = true;
const testVisualSymbols = true;

/* ------------------------------------
    ToDo:
    -----
    0. Nothing to be done ;-)
---------------------------------------- */

/* ======================================== */
/*             Setup                        */
/* ======================================== */
const Keyboard = require('../Keyboard');
const keyboard = new Keyboard();

const term = new (require('../vt100'))();
term.accept(new (require('../vt100BoxVisitor')));
term.clear();

/* ======================================== */
/*             Tests                        */
/* ======================================== */

if (testLeftTopHorizontalBox) {
    let row = 1, col = 10, width = 10
    drawHorizontalBox(row, col, width);
    drawHorizontalNumbers(row + 2, col);
}

if (testLeftTopVerticalBox) {
    let row = 1, col = 1, hight = 5;
    drawVerticalBox(row, col, hight);
    drawVerticalNumbers(row, col, hight);
}

if (testRightTopHorizontalBox) {
    let cols = process.stdout.columns;
    let row = 1, col = cols - 20, width = 10
    drawHorizontalBox(row, col, width);
    drawHorizontalNumbers(row + 2, col);
}

if (testRightTopVerticalBox) {
    let cols = process.stdout.columns;
    let row = 1, col = cols - 1, hight = 5;
    drawVerticalBox(row, col, hight);
    drawVerticalNumbers(row, col - 3, hight);
}

if (testLeftBottomHorizontalBox) {
    let rows = process.stdout.rows;
    let row = rows - 1, col = 10, width = 10
    drawHorizontalBox(row, col, width);
    drawHorizontalNumbers(row - 1, col);
}

if (testLeftBottomVerticalBox) {
    let rows = process.stdout.rows;
    let hight = 5, row = rows - 1 - hight, col = 1;
    drawVerticalBox(row, col, hight);
    drawVerticalNumbers(row, col, hight);
}

if (testRightBottomHorizontalBox) {
    let rows = process.stdout.rows;
    let cols = process.stdout.columns;
    let row = rows - 1, col = cols - 20, width = 10
    drawHorizontalBox(row, col, width);
    drawHorizontalNumbers(row - 1, col);
}

if (testRightBottomVerticalBox) {
    let rows = process.stdout.rows;
    let cols = process.stdout.columns;
    let hight = 5, row = rows - 1 - hight, col = cols - 1;
    drawVerticalBox(row, col, hight);
    drawVerticalNumbers(row, col - 3, hight);
}

if (testFrame) {
    let hight = 16;
    let width = 50;
    let row = parseInt((process.stdout.rows - hight) / 2)
    let col = parseInt((process.stdout.columns - width) / 2)
    term.box.frame(row, col, hight, width)
}

if (testFullFrame) {
    term.box.fullFrame()
}

if (testAllBoxSymbols) {
    term.goto(10, 20);
    term.box.horizontal(); term.write(' ');
    term.box.vertical(); term.write(' ');
    term.box.downRight(); term.write(' ');
    term.box.downLeft(); term.write(' ');
    term.box.upRight(); term.write(' ');
    term.box.upLeft(); term.write(' ');
    term.box.verticalRight(); term.write(' ');
    term.box.verticalLeft(); term.write(' ');
    term.box.downHorizontal(); term.write(' ');
    term.box.upHorizontal(); term.write(' ');
    term.box.verticalHorizontal(); term.write(' ');
    term.box.left(); term.write(' ');
    term.box.up(); term.write(' ');
    term.box.right(); term.write(' ');
    term.box.down(); term.write(' ');
}

if (testVisualSymbols) {
    term.box.frame(25, 10, 6, 12);
    term.goto(26, 10).box.down()
    term.goto(26, 10).write(' ')
    term.goto(28, 10).box.up()
    term.goto(28, 10).box.verticalRight().box.horizontal().box.verticalLeft()
    term.goto(26, 12).box.downRight()
    term.goto(27, 12).box.vertical()
    term.goto(29, 12).box.vertical()
    term.goto(30, 12).box.upRight().box.horizontalLine(4).box.upLeft()
    term.goto(30, 13).box.downHorizontal()
    term.goto(29, 17).box.verticalHorizontal().box.left().box.right().box.verticalLeft()
    term.goto(32, 16).box.upHorizontal()
    term.goto(31, 16).box.vertical()
}

// Move Awway
term.goto(15, 18)

/* ================================================== */
/*           Test VT100 Box - Test Functions          */
/* ================================================== */

function drawHorizontalNumbers(row, col) {
    term.goto(row, col);
    term.write('012345678901');
}

function drawHorizontalBox(row, col, len) {
    term.goto(row, col).box.downRight().box.horizontalLine(len).box.downLeft();
    term.goto(row + 1, col).box.upRight().box.horizontalLine(len).box.upLeft();
}

function drawVerticalNumbers(row, col, hight) {
    for (let i = 0; i <= hight + 1; i++) {
        term.goto(row + i, col + 2);
        term.write(i.toString());
    }
}

function drawVerticalBox(row, col, len) {
    term.goto(row, col).box.downRight().box.downLeft();
    term.goto(row + 1, col).box.verticalLine(len);
    term.goto(row + 1, col + 1).box.verticalLine(len);
    term.goto(row + len + 1, col).box.upRight().box.upLeft();
}