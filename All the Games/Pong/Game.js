const Keyboard = require('../Lib/Keyboard');
const keyboard = new Keyboard(press);

const term = new (require('../Lib/vt100'))();
term.clear();

term.accept(new (require('../Lib/vt100BlockVisitor')));

term.accept(new (require('../Lib/vt100CursorVisitor')));
term.cursor.hide();

let Border = []
var batStartX = 14
myBoard();

function myBoard() {
    makeBoard(20, 50, 'x');
    //drawOnBoard(fromStartRow, toEndRow, fromStartCol, toEndCol, symbol)
    drawOnBoard(1, 19, 1, 49, ' ');         // inside 
    drawOnBoard(0, 20, 0, 1, 'w');          // left wall
    drawOnBoard(1, 19, 49, 50, 'y');        // right wall
    drawOnBoard(0, 1, 1, 49, 't');          // top wall
    drawOnBoard(19, 20, 1, 49, 'o');        // bottom wall
    drawOnBoard(0, 1, 49, 50, 'm');         // top right corner
    drawOnBoard(19, 20, 49, 50, 'm');       // bottom right corner
    drawOnBoard(batStartX, batStartX + 5, 5, 6, 'l');        // Bat

}

let dumpPositionX = 15;
let dumpPositionY = 8;

const Ball = '@'

var StartingX = 6 + dumpPositionX;
var StartingY = 6 + dumpPositionY;

var BallLastX = [];
var BallLastY = [];

BallLastX[0] = StartingX;
BallLastY[0] = StartingY;

var BatLastX = [];


const ballTick = 100;

var startingBallSpeedX = 1;
var startingBallSpeedY = 1;

var speedBallX = startingBallSpeedX;
var speedBallY = startingBallSpeedY;

const batTick = 1000;
var speedBatX = 0;

BallMove();
BatMove();

function press(key) {

    if (key === 'p') term.cursor.show(), process.exit();

    switch (key) {
        case 'w': if (batStartX !== 1) { speedBatX = -1 }; break;
        case 's': if (batStartX !== 14) { speedBatX = +1 }; break;
        case 'r': restartGame(); break;
        default: break;
    }
}

function BallMove() {
    BallPos();
    setTimeout(BallMove, ballTick);
}

function BatMove() {
    BatPos();
    setTimeout(BatMove, batTick);
}

function BatPos() {
    //Places Border
    myBoard();
    term.block.dump(dumpPositionX, dumpPositionY, Border);


    batStartX += speedBatX;

    if (batStartX == 14) {
        speedBatX = 0;
    }
    if (batStartX == 1) {
        speedBatX = 0;
    }
    // term.goto(1, 1);
    // term.write(batStartX.toString());
}


function BallPos() {
    // End Game
    if (PongBallCheck() == 'w') {
        restartGame();
    }
    // Walls
    WhenBallHitWallChangeSpeed('t', -1, 1);
    WhenBallHitWallChangeSpeed('o', -1, 1);
    WhenBallHitWallChangeSpeed('y', 1, -1);
    WhenBallHitWallChangeSpeed('m', -1, -1);
    // Bat
    WhenBallHitWallChangeSpeed('l', -1 * speedBatX, -1);
    if (speedBallX == 0 && speedBallY == 1) speedBallX = 1;
    if (speedBallX == 0 && speedBallY == -1) speedBallX = -1;
    // Pong Ball
    BallLastX[0] += speedBallX;
    BallLastY[0] += speedBallY;
    term.goto(BallLastX[0], BallLastY[0]);
    term.write(Ball);

}
// returning the Ball X & Y cordinates and adjusting the screen to the matrix
function PongBallCheck() {
    return Border[BallLastX[0] - dumpPositionX][BallLastY[0] - dumpPositionY];
}
// putting the ball back in his starting position and speed
// changing Bat speed to 0 (stopping his movement)
// and reloading the board.
function restartGame() {
    term.clear();
    speedBallX = startingBallSpeedX;
    speedBallY = startingBallSpeedY;
    speedBatX = 0;
    speedBatY = 0;
    myBoard()
    BallLastX[0] = StartingX;
    BallLastY[0] = StartingY;
    term.goto(BallLastX[0], BallLastY[0]);
}
//making the actual Board
function makeBoard(row, col, symbol) {
    for (let i = 0; i < row; i++) {
        Border[i] = []
        for (let j = 0; j < col; j++) {
            Border[i][j] = symbol
        }
    }
}
//drawing on the board in the matrix
function drawOnBoard(fromStartRow, toEndRow, fromStartCol, toEndCol, symbol) {
    for (let i = fromStartRow; i < toEndRow; i++) {
        for (let j = fromStartCol; j < toEndCol; j++) {
            Border[i][j] = symbol
        }
    }
}
// checking which type of symbol it hits in the matrix
// and changing speed accordingly 
function WhenBallHitWallChangeSpeed(wallSymbol, speedX, speedY) {
    if (PongBallCheck() == wallSymbol) {
        speedBallX = speedBallX * speedX;
        speedBallY = speedBallY * speedY;
    }
}