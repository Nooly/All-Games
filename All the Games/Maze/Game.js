const Keyboard = require('../Lib/Keyboard');
const keyboard = new Keyboard(press);

const term = new (require('../Lib/vt100'))();
term.clear();

term.accept(new (require('../Lib/vt100BlockVisitor')));

term.accept(new (require('../Lib/vt100CursorVisitor')));
term.cursor.show();

const Board = require('./Board');
board = new Board(8, 6);

const Maze = [
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', ' ', '.', '.'],
    ['.', ' ', ' ', ' ', '.', ' ', ' ', ' ', '.', ' ', '.', '.'],
    ['E', ' ', '.', ' ', '.', ' ', '.', ' ', ' ', ' ', ' ', '.'],
    ['.', ' ', '.', ' ', ' ', ' ', ' ', ' ', ' ', '.', ' ', '.'],
    ['.', ' ', '.', ' ', '.', ' ', '.', ' ', ' ', '.', ' ', '.'],
    ['.', '.', ' ', '.', '.', ' ', '.', ' ', '.', '.', ' ', '.'],
    ['.', '.', ' ', '.', '.', ' ', '.', ' ', '.', '.', ' ', '.'],
    ['.', '.', ' ', '.', '.', ' ', '.', ' ', '.', '.', ' ', '.'],
    ['.', '.', ' ', '.', '.', ' ', '.', ' ', '.', '.', ' ', '.'],
    ['.', '.', ' ', '.', '.', ' ', '.', ' ', '.', '.', ' ', '.'],
    ['.', '.', ' ', '.', '.', ' ', ' ', ' ', '.', '.', ' ', '.'],
    ['.', '.', ' ', '.', '.', ' ', '.', ' ', '.', ' ', ' ', ' '],
    ['.', ' ', ' ', '.', '.', '.', ' ', ' ', '.', ' ', ' ', '.'],
    [' ', ' ', '.', '.', '.', '.', ' ', ' ', ' ', ' ', ' ', '.'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', ' ', 'I', '.'],

];
// console.log(Maze.length);
// console.log(Maze[0].length);


board.matrix = Maze;
let dumpPositionX = 5;
let dumpPositionY = 8;
term.block.dump(dumpPositionX, dumpPositionY, Maze);
let currMatX = 16;
let currMatY = 11;
let count = 0;
let countDisplayX = dumpPositionX - 1;
let countDisplayY = dumpPositionY + 9;
let endGameDisplayX = dumpPositionX - 1;
let endGameDisplayY = dumpPositionY;
Goto();

let pushmove = [];

let a = 0, b = 0;


let Direction = 'N';


function press(key) {

    if (key === 'p') term.cursor.show(), process.exit();

    switch (key) {
        case 'w':
            MoveX(1);
            Goto();
            Counter();
            SaveStep();
            EndGame();
            break;

        case 's':
            MoveX(-1);
            Goto();
            Counter();
            SaveStep();
            EndGame();
            break;

        case 'd':
            MoveY(1);
            Goto();
            Counter();
            SaveStep();
            EndGame();
            break;

        case 'a':
            MoveY(-1);
            Goto();
            Counter();
            SaveStep();
            EndGame();
            break;

        case 'z':
            ctrlZ();
            break;

        case ' ':
            press(pushmove[a]);
            a++
            break;
        case 'u':
            Counter();
            botSolve();
            EndGame();
            break;

        case 'r':
            break;
        default:
            break;
    }
    function SaveStep() {
        pushmove.push(key);
    }
    function ctrlZ() {
        let z = pushmove.pop();
        switch (z) {
            case 'w':
                MoveX(-1);
                break;
            case 's':
                MoveX(1);
                break;
            case 'd':
                MoveY(-1);
                break;
            case 'a':
                MoveY(1);
                break;

            default:
                break;
        }
        Counter();

    }
}

function botSolve() {
    let VectorU = Maze[currMatX - 2][currMatY - 1]
    let VectorD = Maze[currMatX][currMatY - 1]
    let VectorR = Maze[currMatX - 1][currMatY]
    let VectorL = Maze[currMatX - 1][currMatY - 2]
    let VectorUR = Maze[currMatX - 2][currMatY]
    let VectorUL = Maze[currMatX - 2][currMatY - 2]
    let VectorDR = Maze[currMatX][currMatY]
    let VectorDL = Maze[currMatX][currMatY - 2]

    if (VectorU == 'E') { MoveX(1); return; }
    if (VectorD == 'E') { MoveX(-1); return; }
    if (VectorR == 'E') { MoveY(1); return; }
    if (VectorL == 'E') { MoveY(-1); return; }


    if (Direction == 'N') { North(); return; }
    if (Direction == 'W') { West(); return; }
    if (Direction == 'S') { South(); return; }
    if (Direction == 'E') { East(); return; }



    function North() {
        if (VectorR == ' ') {
            MoveY(1);
            Direction = 'E'
        }
        else if (VectorU == ' ' && VectorR == '.') {
            MoveX(1);
        } else {
            Direction = 'W'
        }
    }
    function West() {
        if (VectorU == ' ') {
            MoveX(1);
            Direction = 'N'
        }
        else if (VectorL == ' ' && VectorU == '.') {
            MoveY(-1);
        } else {
            Direction = 'S'
        }
    }
    function South() {
        if (VectorL == ' ') {
            MoveY(-1);
            Direction = 'W'
        }
        else if (VectorD == ' ' && VectorL == '.') {
            MoveX(-1);
        } else {
            Direction = 'E'
        }
    }
    function East() {
        if (VectorD == ' ') {
            MoveX(-1);
            Direction = 'S'
        }
        else if (VectorR == ' ' && VectorD == '.') {
            MoveY(1);
        } else {
            Direction = 'N'
        }
    }



}
function MoveY(a) {
    currMatY += 1 * a;
    if (currMatY == Maze[0].length + 1 || currMatY == 0) {
        currMatY -= 1 * a;
        return;
    }
    if (Maze[currMatX - 1][currMatY - 1] !== '.') {
        Goto();
    }
    else
        currMatY -= 1 * a;
}

function MoveX(a) {
    currMatX -= 1 * a;
    if (currMatX == Maze.length + 1 || currMatX == 0) {
        currMatX += 1 * a;
        return;
    }
    if (Maze[currMatX - 1][currMatY - 1] !== '.') {
        Goto();
    }
    else
        currMatX += 1 * a;
}

function gotoStartingPosition() {
    currMatX = 16
    currMatY = 11
    term.goto(currMatX + dumpPositionX - 1, currMatY + dumpPositionY - 1);
}

function Counter() {
    count++;
    term.goto(countDisplayX, countDisplayY);
    console.log(count);
    Goto();
}

function EndGame() {
    if (Maze[currMatX - 1][currMatY - 1] == 'E') {
        term.goto(endGameDisplayX, endGameDisplayY);
        console.log('WINNER!');
        Goto();
        gotoStartingPosition();
    }
}

function Goto() {
    term.goto(currMatX + dumpPositionX - 1, currMatY + dumpPositionY - 1);
}