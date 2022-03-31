const term = new (require('../Lib/vt100'))();
term.clear();

term.accept(new (require('../Lib/vt100BlockVisitor')));

const Keyboard = require('../Lib/Keyboard')
var keyboard = new Keyboard(press);

term.accept(new (require('../Lib/vt100CursorVisitor')));
term.cursor.hide();

const Board = [];

const Pieces = [
    [[0, 0], [1, 0], [2, 0], [3, 0]],
    [[0, 0], [1, 0], [2, 0], [0, 1]],
    [[1, 0], [2, 0], [0, 1], [1, 1]],
    [[0, 0], [1, 0], [2, 0], [2, 1]],
    [[0, 0], [1, 0], [1, 1], [2, 1]],
    [[0, 0], [1, 0], [0, 1], [1, 1]],
    [[0, 0], [1, 0], [2, 0], [1, 1]],
];

var isGameActive = true;
var isGameOver = false;

BoardRow = 20; BoardCol = 10;
const StartCol = BoardCol / 2;
const StartRow = 5;
var currCol = StartCol
var currRow = StartRow
var vec;
var StartingSpeed = 1;
var Speed = StartingSpeed;

var BottomArea = [];

const Tick = 500;

var countTime = 0;
var currScore = 0;
var countRowsDel = 0;

let actions = [[0]];
var currPiece = randomPiece();

StartGame();

function RestartGame() {
    insertPiece(0, 0, BottomArea, ' ')
    BottomArea = []

    currCol = StartCol
    currRow = StartRow
    Speed = StartingSpeed
    countTime = 0
    currScore = 0
    countRowsDel = 0

}

function StartGame() {
    makeBoard(BoardRow, BoardCol, ' ');
    term.block.dump(1, 1, Board);
    RefreshScreen();
    stopWatch();
}

function GameOver() {
    if (isUnder(currVector(currPiece, StartRow, currCol), BottomArea)) {
        isGameActive = false;
        term.goto(40, 40).write('Game Over')
        isGameOver = true;
    }
}

function stopWatch() {
    if (isGameActive == true) {
        countTime++
        term.goto(42, 40).write('Time Survived: ' + countTime + ' Seconds')
        score();
        setTimeout(stopWatch, 1000)
    }
}

function score() {
    if (isGameActive == true) {
        currScore = countTime + (countRowsDel * BoardCol * 2)
        term.goto(44, 40).write('Score: ' + currScore)
    }
}

function checkRowsDeleteEmptyAdjust(Matrix, value) {
    count = 0

    function checkRow(Matrix, value) {
        return Matrix.includes(value);
    }

    function checkAllRows(Matrix, value) {
        for (let i = Matrix.length - 1; i >= 0; i--) {
            if (checkRow(Matrix[i], value) !== true) {
                Matrix.splice(i, 1)
                count++
            }
        }
        return Matrix
    }

    function pushMatrix(Matrix, EmptyRows) {
        countRowsDel += EmptyRows
        let m = []
        for (let j = 0; j < EmptyRows; j++) {
            m.push(oneDmatrix(Matrix))
        }
        for (let k = 0; k < Matrix.length; k++) {
            m.push(Matrix[k])
        }
        return m
    }

    function oneDmatrix(Matrix) {
        let box = []
        for (let u = 0; u < Matrix[0].length; u++) {
            box.push(0)
        }
        return box
    }
    return pushMatrix(checkAllRows(Matrix, value), count)
}
function isRotatable(TArray1, TArray2) {
return true
    // if (
    //     currCol < BoardCol - vector2rows(currPiece) &&
    //     currRow < BoardRow - vector2cols(currPiece)){}

}
function isNotSide(TArray1, TArray2) {
    const Array1X = TArray1.map(TArray1 => TArray1[0])
    const Array2X = TArray2.map(TArray2 => TArray2[0])

    const Array1Y = TArray1.map(TArray1 => TArray1[1])
    const Array2Y = TArray2.map(TArray2 => TArray2[1])

    let Box = [];

    for (let i = 0; i < Array1X.length; i++) {
        for (let j = 0; j < Array2X.length; j++) {
            if (Array1X[i] == Array2X[j]) { Box.push([i, j]) }
        }
    }

    for (let i = 0; i < Box.length; i++) {
        if (Array1Y[Box[i][0]] + 1 == Array2Y[Box[i][1]] || Array1Y[Box[i][0]] - 1 == Array2Y[Box[i][1]]) {
            return false;
        }
    }
    return true;

}
function isNotLeft(TArray1, TArray2) {
    const Array1X = TArray1.map(TArray1 => TArray1[0])
    const Array2X = TArray2.map(TArray2 => TArray2[0])

    const Array1Y = TArray1.map(TArray1 => TArray1[1])
    const Array2Y = TArray2.map(TArray2 => TArray2[1])

    let Box = [];

    for (let i = 0; i < Array1X.length; i++) {
        for (let j = 0; j < Array2X.length; j++) {
            if (Array1X[i] == Array2X[j]) { Box.push([i, j]) }
        }
    }

    for (let i = 0; i < Box.length; i++) {
        if (Array1Y[Box[i][0]] - 1 == Array2Y[Box[i][1]]) {
            return false;
        }
    }
    return true;

}

function isNotRight(TArray1, TArray2) {
    const Array1X = TArray1.map(TArray1 => TArray1[0])
    const Array2X = TArray2.map(TArray2 => TArray2[0])

    const Array1Y = TArray1.map(TArray1 => TArray1[1])
    const Array2Y = TArray2.map(TArray2 => TArray2[1])

    let Box = [];

    for (let i = 0; i < Array1X.length; i++) {
        for (let j = 0; j < Array2X.length; j++) {
            if (Array1X[i] == Array2X[j]) { Box.push([i, j]) }
        }
    }

    for (let i = 0; i < Box.length; i++) {
        if (Array1Y[Box[i][0]] + 1 == Array2Y[Box[i][1]]) {
            return false;
        }
    }
    return true;

}
function isNotUnder(TArray1, TArray2) {
    const Array1X = TArray1.map(TArray1 => TArray1[0])
    const Array2X = TArray2.map(TArray2 => TArray2[0])

    const Array1Y = TArray1.map(TArray1 => TArray1[1])
    const Array2Y = TArray2.map(TArray2 => TArray2[1])

    let Box = [];

    for (let i = 0; i < Array1Y.length; i++) {
        for (let j = 0; j < Array2Y.length; j++) {
            if (Array1Y[i] == Array2Y[j]) { Box.push([i, j]) }
        }
    }

    for (let i = 0; i < Box.length; i++) {
        if (Array1X[Box[i][0]] + 1 == Array2X[Box[i][1]]) {
            return false;
        }
    }
    return true;
}
function isUnder(TArray1, TArray2) {
    const Array1X = TArray1.map(TArray1 => TArray1[0])
    const Array2X = TArray2.map(TArray2 => TArray2[0])

    const Array1Y = TArray1.map(TArray1 => TArray1[1])
    const Array2Y = TArray2.map(TArray2 => TArray2[1])

    let Box = [];

    for (let i = 0; i < Array1Y.length; i++) {
        for (let j = 0; j < Array2Y.length; j++) {
            if (Array1Y[i] == Array2Y[j]) { Box.push([i, j]) }
        }
    }

    for (let i = 0; i < Box.length; i++) {
        if (Array1X[Box[i][0]] + 1 == Array2X[Box[i][1]]) {
            return true;
        }
    }
    return false;
}

function currVector(Piece, Row, Col) {
    return Piece.map(Piece => [Piece[0] + Row, Piece[1] + Col])
}

function insertPieceIntoBottom(row, col, Piece) {
    for (let i = 0; i < Piece.length; i++) {
        BottomArea.push([Piece[i][0] + row, Piece[i][1] + col]);
    }
}

function whenToInsertToBottomArea() {
    insertPieceIntoBottom(currRow, currCol, currPiece);
    delete currPiece;
    currRow = StartRow;
    currCol = StartCol;
    Speed = StartingSpeed;
    currPiece = SpawnPiece();
    actions.push([currRow, currCol])
    RemoveLastMove(actions[actions.length - 1], currPiece)
}

function press(key) {
    if (key === 'p') term.cursor.show(), process.exit();
    switch (key) {
        case 'r':
            isGameActive = true; RestartGame();
            term.clear()
            if (isGameOver == true) { RefreshScreen(); stopWatch() };
            isGameOver = false;
            return;
        default: break;
    }
    if (isGameActive == true) {

        switch (key) {

            case 'a':
                if (isNotLeft(currVector(currPiece, currRow, currCol), BottomArea)) {
                    if (currCol > 0) {
                        DeleteMoveDraw('Left')
                    }
                }; return;

            case 'd':
                if (isNotRight(currVector(currPiece, currRow, currCol), BottomArea)) {
                    if (currCol < BoardCol - vector2cols(currPiece) - 1) {
                        DeleteMoveDraw('Right')
                    }
                }; return;

            case 's':
                if (isNotUnder(currVector(currPiece, currRow, currCol), BottomArea)) {
                    if (currRow < BoardRow - vector2rows(currPiece) - 1) {
                        DeleteMoveDraw('Down')
                    }
                }; return;

            case 'q':
                if (isRotatable(currVector(currPiece, currRow, currCol), BottomArea)) {
                    if (
                        currCol < BoardCol - vector2rows(currPiece) &&
                        currRow < BoardRow - vector2cols(currPiece)) {
                        DeleteMoveDraw('Rotate');
                    }
                }; return;

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
function CheckLimits() {
    if (currRow == BoardRow - vector2rows(currPiece) - 1) {
        Speed = 0
        whenToInsertToBottomArea();
    }
    if (isNotUnder(currVector(currPiece, currRow, currCol), BottomArea)) {
        currRow += Speed
    }
    if (isUnder(currVector(currPiece, currRow, currCol), BottomArea)) {
        Speed = 0
        whenToInsertToBottomArea();
    }
}
function RefreshScreen() {
    if (isGameActive == true) {
        RemoveLastMove(actions[actions.length - 1], currPiece)

        CheckLimits();

        actions.push([currRow, currCol])

        insertPiece(currRow, currCol, currPiece, '\u2588')


        insertPiece(0, 0, BottomArea, ' ')
        BottomArea = DelEmptyRows(BottomArea)

        insertPiece(0, 0, BottomArea, '\u2588')

        term.block.dump(1, 1, Board);

        GameOver();

        setTimeout(RefreshScreen, Tick);
    }
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

function randomPiece() { return Pieces[Math.floor(Math.random() * Pieces.length)]; }

function SpawnPiece() {
    let newPiece = randomPiece()
    insertPiece(StartRow, StartCol, newPiece, '\u2588')
    return newPiece;
}

function DelEmptyRows(Matrix) {
    let Mat = vector2Matrix(Matrix);
    let dMat = checkRowsDeleteEmptyAdjust(Mat, 0)
    let Vec = matrix2Vector(dMat);
    return Vec;
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