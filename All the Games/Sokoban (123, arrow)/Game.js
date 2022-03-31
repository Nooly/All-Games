class Game{
    constructor(board){
        this.loadBoard(board);
    }
    loadBoard(board) {
        this.board = board //.map(x => x.map(x => x)); //copy2Dmatrix(board);
    }
    getBoard() {
        return this.board;
    }
}

module.exports = Game