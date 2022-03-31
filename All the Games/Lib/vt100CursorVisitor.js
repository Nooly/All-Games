const CSI = '\x1b[';
const AREA = 'cursor';

const CURSORS = [
    { 'show': CSI + '?25h' },
    { 'hide': CSI + '?25l' },
    { 'blink': CSI + '?25h' },
    { 'save': CSI + 's' },
    { 'restore': CSI + 'u' },
    { 'getPosition': CSI + '6n' },
]

var CursorVisitor = function () {
    this.visit = function (screen) {

        screen.actionsFactory(screen, AREA, CURSORS);

        screen.move = {};
        screen.move.up = (rows) => { screen.write(CSI + (rows || 1) + 'A'); return screen; };
        screen.move.down = (rows) => { screen.write(CSI + (rows || 1) + 'B'); return screen; };
        screen.move.right = (cols) => { screen.write(CSI + (cols || 1) + 'C'); return screen; };
        screen.move.left = (cols) => { screen.write(CSI + (cols || 1) + 'D'); return screen; };
        screen.move.next = (rows) => { screen.write(CSI + (rows || 1) + 'E'); return screen; };
        screen.move.prev = (rows) => { screen.write(CSI + (rows || 1) + 'F'); return screen; };
        screen.move.column = (n) => { screen.write(CSI + n + 'G'); return screen; };
        screen.move.goto = (n, m) => { screen.write(CSI + (n || 1) + ';' + (m || 1) + 'H'); return screen; };
        screen.move.reverse = (n) => { screen.write(CSI + n + 'M'); return screen; };
    }
}

module.exports = CursorVisitor