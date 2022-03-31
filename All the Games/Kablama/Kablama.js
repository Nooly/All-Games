//123

const term = new (require('../Lib/vt100'))();
term.clear();

term.accept(new (require('../Lib/vt100BlockVisitor')));

const Keyboard = require('../Lib/Keyboard')
var keyboard = new Keyboard(press);

term.accept(new (require('../Lib/vt100CursorVisitor')));
term.cursor.hide();

const Board = [];

BoardRow = 20; BoardCol = 40;

let actions = [[0]];



const Tick = 500;

// Bat Properties
var currPiece =
    [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7]];

const StartCol = BoardCol / 2;
const StartRow = BoardRow - 5;
var currCol = StartCol
var currRow = StartRow

// Targets Positions
var Blocks =
    [
        [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9],
        [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9],
        [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9],
        [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9],
        [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9],
        [0, 10], [0, 11], [0, 12], [0, 13], [0, 14], [0, 15], [0, 16], [0, 17], [0, 18], [0, 19],
        [1, 10], [1, 11], [1, 12], [1, 13], [1, 14], [1, 15], [1, 16], [1, 17], [1, 18], [1, 19],
        [2, 10], [2, 11], [2, 12], [2, 13], [2, 14], [2, 15], [2, 16], [2, 17], [2, 18], [2, 19],
        [3, 10], [3, 11], [3, 12], [3, 13], [3, 14], [3, 15], [3, 16], [3, 17], [3, 18], [3, 19],
        [4, 10], [4, 11], [4, 12], [4, 13], [4, 14], [4, 15], [4, 16], [4, 17], [4, 18], [4, 19],
    ]

const BlocksRow = 5
const BlocksCol = 10


const oneBlock = [[0, 0]];

const Ball = '@'
const Wall = '*'
const End = '-'
const SingleBlock = '&'
const Empty = ' '
const TempBlock = '%'

var BallStartRow = 15;
var BallStartCol = 15;

var BallCurrRow = BallStartRow;
var BallCurrCol = BallStartCol;

var BallStartSpeedRow = -1;
var BallStartSpeedCol = 1;

var BallSpeedRow = BallStartSpeedRow;
var BallSpeedCol = BallStartSpeedCol;

var GameIsActive = false;

var GameisWon = false;

var Mark = false;

GameStart();

function GameStart() {
    GameIsActive = true;

    //Whole Board
    makeBoard(BoardRow, BoardCol, Empty);

    //Left Wall
    drawOnBoard(0, BoardRow, 0, 1, Wall)
    //Right Wall
    drawOnBoard(0, BoardRow, BoardCol - 1, BoardCol, Wall)
    //Top Wall
    drawOnBoard(0, 1, 0, BoardCol, Wall)

    //Bottom Wall
    drawOnBoard(BoardRow - 1, BoardRow, 0, BoardCol, End)
    //Left Bottom Wall
    drawOnBoard(StartRow, BoardRow, 0, 1, End)
    //Right Bottom Wall
    drawOnBoard(StartRow, BoardRow, BoardCol - 1, BoardCol, End)

    BallCurrRow = BallStartRow;
    BallCurrCol = BallStartCol;

    BallSpeedRow = BallStartSpeedRow;
    BallSpeedCol = BallStartSpeedCol;

    currCol = StartCol;
    currRow = StartRow;

    insertPiece(BlocksRow, BlocksCol, Blocks, SingleBlock)

    term.block.dump(1, 1, Board);
    RefreshScreen()
}

// Ball Functions
function BallPosition() {
    insertPiece(BallCurrRow, BallCurrCol, oneBlock, Empty)
    BallCollision();

    BallCurrRow += BallSpeedRow
    BallCurrCol += BallSpeedCol

    insertPiece(BallCurrRow, BallCurrCol, oneBlock, Ball)

}

function BallCollision() {
    if (Board[BallCurrRow + BallSpeedRow][BallCurrCol] !== Empty) {
        BallSpeedRow *= -1;
    }
    if (Board[BallCurrRow][BallCurrCol + BallSpeedCol] !== Empty) {
        BallSpeedCol *= -1;
    }
    if (Board[BallCurrRow + BallSpeedRow][BallCurrCol + BallSpeedCol] !== Empty) {
        BallSpeedCol *= -1; BallSpeedRow *= -1;
    }

    if (Board[BallCurrRow + BallSpeedRow][BallCurrCol + BallSpeedCol] == SingleBlock ||
        Board[BallCurrRow + BallSpeedRow][BallCurrCol] !== SingleBlock ||
        Board[BallCurrRow][BallCurrCol + BallSpeedCol] !== SingleBlock) {
        Board[BallCurrRow + BallSpeedRow][BallCurrCol + BallSpeedCol] = TempBlock; Mark = true;
    }
}

function MarkBlock() {

    if (Board[BallCurrRow + BallSpeedRow][BallCurrCol + BallSpeedCol] == SingleBlock &&
        Board[BallCurrRow + BallSpeedRow][BallCurrCol] !== SingleBlock &&
        Board[BallCurrRow][BallCurrCol + BallSpeedCol] !== SingleBlock) {
        Board[BallCurrRow + BallSpeedRow][BallCurrCol + BallSpeedCol] = TempBlock; Mark = true;
    }

    if (Board[BallCurrRow + BallSpeedRow][BallCurrCol] == SingleBlock) {
        Board[BallCurrRow + BallSpeedRow][BallCurrCol] = TempBlock; Mark = true;
    }
    if (Board[BallCurrRow][BallCurrCol + BallSpeedCol] == SingleBlock) {
        Board[BallCurrRow][BallCurrCol + BallSpeedCol] = TempBlock; Mark = true;
    }


}

function RemoveMarks() {
    Mark = false;
    for (let i = 0; i < BoardRow; i++) {
        for (let j = 0; j < BoardCol; j++) {
            if (Board[i][j] == TempBlock) { Board[i][j] = Empty }
        }
    }
}

function GameOver() {
    if (Board[BallCurrRow + BallSpeedRow][BallCurrCol] == End) { EndTheGame() }
    if (Board[BallCurrRow][BallCurrCol + BallSpeedCol] == End) { EndTheGame() }

    function EndTheGame() {
        BallSpeedRow = 0
        BallSpeedCol = 0
        GameIsActive = false
        term.goto(BoardRow + 1, BoardCol + 1).write('Game Over')
    }
}

function GameRestart() {
    term.clear()
    GameStart()
}

function GameWin() {
    count = 0;
    for (let i = 0; i < BoardRow; i++) {
        for (let j = 0; j < BoardCol; j++) {
            if (Board[i][j] == SingleBlock) { count++ }
        }
    }
    if (count == 0) {
        BallSpeedRow = 0
        BallSpeedCol = 0
        GameIsActive = false
        term.goto(BoardRow + 1, BoardCol + 1).write('You Win!')
    }

}


function RefreshScreen() {
    if (GameIsActive == true) {
        GameOver();

        MarkBlock();

        BallPosition();

        if (Mark == true) {
            RemoveMarks();
            GameWin();
        }

        term.block.dump(1, 1, Board);


        setTimeout(RefreshScreen, Tick);
    }
}



function press(key) {
    if (GameIsActive == false) {

        switch (key) {

            case 'r':
                GameRestart()
                return;

            default: break;
        }
    }

    if (GameIsActive == true) {
        if (key === 'p') term.cursor.show(), process.exit();


        switch (key) {

            case 'a':
                if (currCol > 1) {
                    DeleteMoveDraw('Left')
                }
                return;

            case 'd':
                if (currCol < BoardCol - vector2cols(currPiece) - 2) {
                    DeleteMoveDraw('Right')
                }
                return;

            case 'r':

                return;

            default: break;
        }

    }
}





function DeleteMoveDraw(key) {
    let piece = currPiece;

    RemoveLastMove(actions[actions.length - 1], piece)

    switch (key) {
        case 'Left': vec = MovePiece(key, 0, 1, 0); break;
        case 'Right': vec = MovePiece(key, 0, 1, 0); break;
        case 'Down': vec = MovePiece(0, key, 0, 1); break;
        case 'Rotate': vec = MovePiece(0, 0, 0, 0); piece = rotatePiece(piece); break;
        default: break;
    }
    drawPieceOnScreen(vec, piece)
}

function MovePiece(directionX, directionY, distanceX, distanceY) {
    if (directionX == 'Left') { currCol = currCol - distanceX }
    if (directionX == 'Right') { currCol = currCol + distanceX }
    if (directionY == 'Up') { currRow = currRow - distanceY }
    if (directionY == 'Down') { currRow = currRow + distanceY }
    actions.push([currRow, currCol])
    return ([currRow, currCol])
}

function RemoveLastMove(vec, piece) {
    insertPiece(vec[0], vec[1], piece, ' ')
}

function drawPieceOnScreen(vec, piece) {

    insertPiece(vec[0], vec[1], piece, '\u2588')
    term.block.dump(1, 1, Board);
    currPiece = piece;
}

function makeBoard(row, col, symbol) {
    for (let i = 0; i < row; i++) {
        Board[i] = []
        for (let j = 0; j < col; j++) {
            Board[i][j] = symbol
        }
    }
}

function insertPiece(row, col, Piece, symbol) {
    for (let i = 0; i < Piece.length; i++) {
        Board[Piece[i][0] + row][Piece[i][1] + col] = symbol;
    }
}
function drawOnBoard(fromStartRow, toEndRow, fromStartCol, toEndCol, symbol) {
    for (let i = fromStartRow; i < toEndRow; i++) {
        for (let j = fromStartCol; j < toEndCol; j++) {
            Board[i][j] = symbol
        }
    }
}
// rotation
function rotatePiece(Piece) {
    let Mat = vector2Matrix(Piece);
    let rMat = rotateMatrix(Mat)
    let Vec = matrix2Vector(rMat);
    return Vec;
}

function vector2Matrix(Piece) {
    let rows = vector2rows(Piece) + 1
    let cols = vector2cols(Piece) + 1
    var m = MatrixBuilder(rows, cols)
    for (let i = 0; i < Piece.length; i++)
        m[Piece[i][0]][Piece[i][1]] = 1;
    return m;
}

function vector2rows(Piece) {
    return Piece.reduce(
        (max, piece) => {
            return (max > piece[0]) ? max : piece[0];
        }, 0);
}

function vector2cols(Piece) {
    return Piece.reduce(
        (max, piece) => {
            return (max > piece[1]) ? max : piece[1];
        }, 0);
}

function rotateMatrix(Matrix) {
    return Matrix[0].map(
        (val, index) => Matrix.map(
            row => row[index]
        ).reverse())
}

function matrix2Vector(Matrix) {
    var v = []
    for (let i = 0; i < Matrix.length; i++)
        for (let j = 0; j < Matrix[0].length; j++)
            if (Matrix[i][j] == 1)
                v.push([i, j]);
    return v;
}

function MatrixBuilder(rows, cols) {
    let m = []
    for (let i = 0; i < rows; i++) {
        m[i] = []
        for (let j = 0; j < cols; j++) {
            m[i][j] = 0
        }
    }
    return m;
}