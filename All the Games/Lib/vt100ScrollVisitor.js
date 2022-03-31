const CSI = '\x1b[';

var ScrollVisitor = function () {
    this.visit = function (screen) {
        screen.scroll = {};
        screen.scroll.up = (rows) => { screen.write(CSI + (rows || 1) + 'S'); return screen; };
        screen.scroll.down =  (rows) => { screen.write(CSI + (rows || 1) + 'T'); return screen; };
    }
}

module.exports = ScrollVisitor