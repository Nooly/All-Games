class Board {
    constructor(r,c){
        this.matrix = this.createMatrix(r,c);
    }

    draw(){console.log(this.matrix)}

    createMatrix(r,c) {
        let m = [];
        for (let i = 0; i < r; i++) {
            m.push([]);
            for (let j = 0; j < c; j++) {
                m[i].push(null);
            }
        }
        return m;
    }
    resetBoard() {
        for (let i = 0; i < this.matrix[0].length; i++) {
            for (let n = 0; n < this.matrix.length; n++) {
                this.matrix[n][i] = null;
            }
        }
    }


}

module.exports = Board;