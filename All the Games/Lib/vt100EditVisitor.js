const CSI = '\x1b[';

var EditVisitor = function () {
    this.visit = function (screen) {
        screen.erase = {};
        screen.erase.display = (n) => { screen.write(CSI + (n || 0) + 'J'); return screen; };
        screen.erase.inLine = (n) => { screen.write(CSI + (n || 0) + 'K'); return screen; };
    }
}

module.exports = EditVisitor

// Test: term.goto(13,27).color.black().write(' \u23F2  '); // Length 2 !!