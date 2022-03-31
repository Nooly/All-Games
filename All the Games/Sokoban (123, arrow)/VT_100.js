// https://notes.burke.libbey.me/ansi-escape-codes/
// https://www.csie.ntu.edu.tw/~r92094/c++/VT100.html

const VT_ESC = `\x1b[`;
const VT_CLS = `2J`;

class VT_100 {
    constructor() {
        this.xStep = 1;
        this.yStep = 2;
        this.screen = process.stdout;
    }
    cls() {
        this.screen.write(VT_ESC + VT_CLS);
    }
    write(x) {
        this.screen.write(x)
    }
    goTo(x, y) {
        const VT_Row = `${x * this.xStep}H`;
        const VT_Col = `${y * this.yStep}G`;
        let loc = VT_ESC + VT_Row + VT_ESC + VT_Col;
        this.screen.write(loc)
    }
    moveTo(point) {
        this.goTo(point.x, point.y);
    }
    drawboard(board) {
        for (let x = 1; x <= board.length; x++) {
            for (let y = 1; y <= board[0].length; y++) {  /*note the amount of collums
                                                           according to row 0 */
                this.goTo(x, y);
                let cell = (board[x - 1][y - 1]).toString();
                ('0' == cell) ? this.write(' ') : this.write(cell);
            }
        }
    }
}

module.exports = VT_100;

/*
    Trinary ( '0' == cell ) ? this.write(' ') : this.write(cell);
*/