const Keyboard = require('./Keyboard');
keyboard = new Keyboard(press);
const Keymapper = require('./Keymapper');
keymapper = new Keymapper();
const Board = require('./Board');
board = new Board();

const player1 = 'X'
const player2 = 'O'

let player = player1

Loadboard();

function Loadboard() {
    board.draw();
}

function press(key) {

    if (key === 'p') process.exit();

    let fress = keymapper.map(key)

    switch (fress) {
        case 'q':
            putPlayer(0, 0);
            break;
        case 'w':
            putPlayer(0, 1);
            break;
        case 'e':
            putPlayer(0, 2);
            break;
        case 'a':
            putPlayer(1, 0);
            break;
        case 's':
            putPlayer(1, 1);
            break;
        case 'd':
            putPlayer(1, 2);
            break;
        case 'z':
            putPlayer(2, 0);
            break;
        case 'x':
            putPlayer(2, 1);
            break;
        case 'c':
            putPlayer(2, 2);
            break;
        case 'r':
            board.matrix[0][0] = null
            board.matrix[0][1] = null
            board.matrix[0][2] = null
            board.matrix[1][0] = null
            board.matrix[1][1] = null
            board.matrix[1][2] = null
            board.matrix[2][0] = null
            board.matrix[2][1] = null
            board.matrix[2][2] = null
            Loadboard();
            break;
        default:
            break;
    }

    gameOver();

    changePlayer();



}

function putPlayer(x, y) {
    if (board.matrix[x][y] == null) {
        board.matrix[x][y] = player;
        Loadboard();
    } else { changePlayer(); }
}

function changePlayer() {
    if (player === player1) {
        player = player2;
    } else {
        player = player1;
    }
}

function gameOver() {
    let m=board.matrix
    if (
        m[0][0] == m[0][1] && m[0][0] == m[0][2] && m[0][0] !== null ||
        m[1][0] == m[1][1] && m[1][0] == m[1][2] && m[1][0] !== null ||
        m[2][0] == m[2][1] && m[2][0] == m[2][2] && m[2][0] !== null ||
        m[0][0] == m[1][0] && m[0][0] == m[2][0] && m[0][0] !== null ||
        m[0][1] == m[1][1] && m[0][1] == m[2][1] && m[0][1] !== null ||
        m[0][2] == m[1][2] && m[0][2] == m[2][2] && m[0][2] !== null ||
        m[0][0] == m[1][1] && m[0][0] == m[2][2] && m[0][0] !== null ||
        m[2][0] == m[1][1] && m[2][0] == m[0][2] && m[2][0] !== null
    ) {
        console.log('Game Over')
    }
}