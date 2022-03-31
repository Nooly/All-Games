const Keyboard = require('./Keyboard');
keyboard = new Keyboard(press);

const Keymapper = require('./Keymapper');
keymapper = new Keymapper();

const Board = require('./Board');
board = new Board(6, 7);

const player1 = 'R'
const player2 = 'B'

let player = player1

board.draw();


function Loadboard() {
    board.draw();
}

function press(key) {

    if (key === 'p') process.exit();

    let fress = keymapper.map(key)

    switch (fress) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
            positionPlayer();
            break;

        case 'r':
            board.resetBoard();
            Loadboard();
            changePlayer();
            break;
        default:
            break;
    }
    gameOver();

    function positionPlayer() {
        let k = parseInt(fress) - 1;
        putPlayer(board.matrix.length - 1, k);
    }

}



function putPlayer(x, y) {
    for (let i = 0; i < board.matrix.length; i++) {
        if (board.matrix[x - i][y] == null) {
            board.matrix[x - i][y] = player;
            changePlayer();
            break;
        }
    }
    Loadboard();
    console.log(' ')

}

function changePlayer() {
    if (player === player1) {
        player = player2;
    } else {
        player = player1;
    }
}

function gameOver() {
    let m = board.matrix
    let x = board.matrix.length - 1
    let y = 0
    let f = false

    for (let j = 0; j < board.matrix.length - 3; j++) {
        for (let n = 0; n < board.matrix[0].length - 3; n++) {
            let origin = m[x - j][y + n]
            if ( // rows
                origin == m[x - j][y + n + 1] &&
                origin == m[x - j][y + n + 2] &&
                origin == m[x - j][y + n + 3] &&
                origin !== null
            ) {
                f = true
            }
            if ( // collums
                origin == m[x - j - 1][y + n] &&
                origin == m[x - j - 2][y + n] &&
                origin == m[x - j - 3][y + n] &&
                origin !== null
            ) {
                f = true
            }
            if ( // diagnol right
                origin == m[x - j - 1][y + n + 1] &&
                origin == m[x - j - 2][y + n + 2] &&
                origin == m[x - j - 3][y + n + 3] &&
                origin !== null
            ) {
                f = true
            }
            if ( // diagnol left
                origin == m[x - j - 1][y + n - 1] &&
                origin == m[x - j - 2][y + n - 2] &&
                origin == m[x - j - 3][y + n - 3] &&
                origin !== null
            ) {
                f = true
            }

        }
    }
    if (f) console.log('Game Over!');
}