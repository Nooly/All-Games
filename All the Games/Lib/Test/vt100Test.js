/* ======================================== */
/*             Test VT100                   */
/* ======================================== */

const testBase = true;
const testBlock = false;
const testBox = false;
const testColors = false;
const testCursor = false;
const testEdit = false;
const testSay = false;
const testScroll = false;
const testStyle = false;
const testChess = false;

/* ------------------------------------
    ToDo:
    -----
    1. Test Cursor
    2. Test Edit
    3. Test Scroll
    4. Test Style
---------------------------------------- */

/* ======================================== */
/*             Setup                        */
/* ======================================== */
const Keyboard = require('../Keyboard');
const keyboard = new Keyboard(action);

const term = new (require('../vt100'))();
term.clear();

/* ======================================== */
/*             Tests                        */
/* ======================================== */

if (testBase) {
    term.goto(1, 1);
    term.write('[ Test Base \u2F72 ]');
}

if (testBlock) {
    term.accept(new (require('../vt100BlockVisitor')));

    const square = Alloc(10, 20, 'X');
    term.block.dump(10, 26, square);
}

if (testBox) {
    term.accept(new (require('../vt100BoxVisitor')));

    term.box.frame(9, 24, 10, 22);
}

if (testColors) {
    term.accept(new (require('../vt100ColorVisitor')));

    term.goto(11, 27).color.red().write(' Red ').color.reset();
    term.goto(13, 27).bg.blue().write(' Blue Background ').color.reset();
    term.goto(15, 27).colors.rgb(0, 0, 255).bg.white().write(' Blue on White ').color.reset();
    term.goto(17, 27).colors.bgRgb(0, 127, 127).write(' bgRgb ').color.reset();
}

if (testCursor) {
    term.accept(new (require('../vt100CursorVisitor')));

    // term.cursor.hide();
    // term.move.next(10).write('@Look at the cursor location');
    // term.move.next(3).write('This is chained');
}

if (testEdit) {
    term.accept(new (require('../vt100EditVisitor')));

    // term.move.goto(13,5).chars.put('\u2196').reset();
    // term.move.goto(14,6).style.bold().color.red().chars.put('\u23E9').reset();
}

if (testSay) {
    term.accept(new (require('../vt100SayVisitor')));

    term.goto(4, 20).say.success();
    term.goto(3, 20).say.fail();
}

if (testScroll) {
    term.accept(new (require('../vt100ScrollVisitor')));

    // term.scroll.down(5);
}

if (testStyle) {
    term.accept(new (require('../vt100StyleVisitor')));

    // term.move.goto(1,1).style.bold().color.red().box.topLeft().reset();
}

if (testChess) {
    term.accept(new (require('../vt100ChessVisitor')));

    let i = 10;
    term.goto(24, i++).chess.WhiteRook();
    term.goto(24, i++).chess.WhiteKnight();
    term.goto(24, i++).chess.WhiteBishop();
    term.goto(24, i++).chess.WhiteQueen();
    term.goto(24, i++).chess.WhiteKing();
    term.goto(24, i++).chess.WhiteBishop();
    term.goto(24, i++).chess.WhiteKnight();
    term.goto(24, i++).chess.WhiteRook();

    for (let index = 10; index < 18; index++) {
        term.goto(25, index).chess.WhitePawn(); 
        term.goto(30, index).chess.BlackPawn();          
    }

    i = 10;
    term.goto(31, i++).chess.BlackRook();
    term.goto(31, i++).chess.BlackKnight();
    term.goto(31, i++).chess.BlackBishop();
    term.goto(31, i++).chess.BlackQueen();
    term.goto(31, i++).chess.BlackKing();
    term.goto(31, i++).chess.BlackBishop();
    term.goto(31, i++).chess.BlackKnight();
    term.goto(31, i++).chess.BlackRook();
}

// Move Awway
term.goto(50, 1)

/* ================================================== */
/*           Test VT100 - Test Functions              */
/* ================================================== */
function Alloc(r, c, ch) {
    return Array(r).fill().map(() => Array(c).fill(ch));
}

function action(key) {
    process.stdout.write(key);
}
