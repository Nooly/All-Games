Game = require('./Game.js');

class Checkers extends Game {
    constructor(board) { super(board); }
    moveplayer(direction) {}
    finishgame() { return false; }
}

module.exports = Checkers