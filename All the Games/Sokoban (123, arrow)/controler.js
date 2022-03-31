const CtrlC = '\u0003';
var debug = false;

function display() {
    let board = sokoban.getBoard();
    // screen.cls();
    screen.drawboard(board.matrix);

    if (debug) {
        console.log('\n\n\n\n');
        console.log(board);
        screen.goTo(0, 0);
    }
}

function action(key) {
    if (key === CtrlC) process.exit();

    let act = keymapper.map(key)

    switch (act) {
        case '1':
            screen.cls()
            sokoban.loadBoard(board1)
            break;
        case '2':
            screen.cls()
            sokoban.loadBoard(board2)
            break;
        case '3':
            screen.cls()
            sokoban.loadBoard(board3)
            break;
        case 'debug':
            screen.cls();
            (debug === false) ? debug = true : debug = false;
            break;
        case 'reset':
            screen.cls();
            
            break;

        default:
            break;
    }

    if (act) {
        sokoban.moveplayer(act);
        display();

        if (sokoban.finishgame()) {
            screen.goTo(0, 20);
            screen.write('Game Over');
        }
        if (sokoban.ifpoison()) {
            screen.goTo(0, 20);
            screen.write('You Are Dead');
        }
    }
}

const Keyboard = require('./Keyboard');
keyboard = new Keyboard(action);

const Keymapper = require('./Keymapper');
keymapper = new Keymapper();

const board1 = require('./Boards/board1');
const board2 = require('./Boards/board2');
const board3 = require('./Boards/board3');
const checkers = require('./Boards/checkers');


let board = checkers;

const Sokoban = require('./Sokoban');
sokoban = new Sokoban(board);

const VT_100 = require('./VT_100');
screen = new VT_100();

// Hint: screen.cls();
screen.cls()
display()