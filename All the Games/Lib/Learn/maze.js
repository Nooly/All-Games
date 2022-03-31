const _ = ' ';
const W = '\u2592'; // 	▒	Medium shade '\u2592'
const I = '\u2b06'; // Up Arrow
const E = '\u2B05'; // Left Arrow

const Maze = [
    [W, W, W, W, W, W, W, W, W, W, W, W],
    [W, _, _, _, W, _, _, _, W, W, _, W],
    [E, _, W, _, W, _, W, _, _, _, _, W],
    [W, _, W, _, _, _, _, _, _, W, _, W],
    [W, _, W, _, W, _, W, _, _, W, _, W],
    [W, W, _, W, W, _, W, _, W, W, _, W],
    [W, W, _, W, W, _, W, _, W, W, _, W],
    [W, W, _, W, W, _, W, _, W, W, _, W],
    [W, W, _, W, W, _, W, _, W, W, _, W],
    [W, W, _, W, W, _, W, _, W, W, _, W],
    [W, W, _, W, W, _, _, _, W, W, _, W],
    [W, W, _, W, W, _, W, _, W, W, _, W],
    [W, _, _, W, W, W, _, _, W, _, _, W],
    [W, _, W, W, W, W, _, _, _, _, _, W],
    [W, _, _, _, _, _, _, _, _, _, _, W],
    [W, W, W, W, W, W, W, W, W, W, I, W],
];

const Keyboard = require('../Keyboard');
const keyboard = new Keyboard();

const term = new (require('../vt100'))();
term.accept(new (require('../vt100BlockVisitor')));

term.clear();
term.block.dump(1, 1, Maze);

console.log(Maze);