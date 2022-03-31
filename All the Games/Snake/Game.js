const Keyboard = require('../Lib/Keyboard');
const keyboard = new Keyboard(press);

const term = new (require('../Lib/vt100'))();
term.clear();

term.accept(new (require('../Lib/vt100BlockVisitor')));

term.accept(new (require('../Lib/vt100CursorVisitor')));
term.cursor.hide();

let Border = []

myBoard();

function myBoard() {
    drawBoard(15, 20, 'w');
    fillBoard(15, 20, ' ');
}

let dumpPositionX = 5;
let dumpPositionY = 8;

const Head = '@'
const Body = '*'

var StartingX = 15;
var StartingY = 15;

var HeadLastX = [];
var HeadLastY = [];

HeadLastX[0] = StartingX;
HeadLastY[0] = StartingY;

BodyCount = 0

const Tick = 500;
const Tock = 1000;
var vX = 0;
var vY = 0;

headMove();
Apple();

function press(key) {

    if (key === 'p') term.cursor.show(), process.exit();

    switch (key) {
        case 'w': vX = -1; vY = +0; break;
        case 'a': vX = +0; vY = -1; break;
        case 's': vX = +1; vY = +0; break;
        case 'd': vX = +0; vY = +1; break;
        case 'r': restartGame(); break;
        default: break;
    }
}

function headMove() {
    HeadPos();
    setTimeout(headMove, Tick);
}

function HeadPos() {
    term.block.dump(dumpPositionX, dumpPositionY, Border);
    // End Game
    if (SnakeHeadCheck() == 'w' ||
        SnakeHeadCheckBody() == true) {
        restartGame();
    }
    // Eat Apple
    if (SnakeHeadCheck() == 'A') {
        SnakeHeadReplace(' ');
        BodyCount++
    }
    // Snake Body
    for (let i = BodyCount; i > 0; i--) {
        HeadLastX[i] = HeadLastX[i - 1]
        HeadLastY[i] = HeadLastY[i - 1]
        term.goto(HeadLastX[i], HeadLastY[i]);
        term.write(Body);
    }
    // Snake Head
    HeadLastX[0] += vX;
    HeadLastY[0] += vY;
    term.goto(HeadLastX[0], HeadLastY[0]);
    term.write(Head);


}

function SnakeHeadCheckBody() {
    for (let i = 1; i <= BodyCount; i++) {
        if (HeadLastX[0] == HeadLastX[i] &&
            HeadLastY[0] == HeadLastY[i]) {
            return true;
        }

    }
}

function SnakeHeadReplace(value) {
    Border[HeadLastX[0] - dumpPositionX][HeadLastY[0] - dumpPositionY] = value;
}

function SnakeHeadCheck() {
    return Border[HeadLastX[0] - dumpPositionX][HeadLastY[0] - dumpPositionY];
}

function restartGame() {
    term.clear();
    vX = 0;
    vY = 0;
    myBoard()
    HeadLastX[0] = StartingX;
    HeadLastY[0] = StartingY;
    BodyCount = 0;
    term.goto(HeadLastX[0], HeadLastY[0]);
}

// Apple
function Apple() {
    spawnApple();
    setTimeout(Apple, Tock);
};
function spawnApple() {
    Border[RandomizerLength()][RandomizerWidth()] = 'A'
};
//randomizes a number btw 1-18
function RandomizerLength() {
    let a = Math.floor((Math.random() * (Border.length - 2)) + 1);
    return a;
}
//randomizes a number btw 1-13
function RandomizerWidth() {
    let b = Math.floor((Math.random() * (Border[0].length - 2)) + 1);
    return b;
}
//Board
function drawBoard(row, col, symbol) {
    for (let i = 0; i < row; i++) {
        Border[i] = []
        for (let j = 0; j < col; j++) {
            Border[i][j] = symbol
        }
    }
}
function fillBoard(row, col, symbol) {
    for (let i = 1; i < row - 1; i++) {
        for (let j = 1; j < col - 1; j++) {
            Border[i][j] = symbol
        }
    }
}