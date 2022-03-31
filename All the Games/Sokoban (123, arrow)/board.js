class Board {
    constructor(rows, cols) {
        this.matrix = [];

        this.rows = rows;
        this.cols = cols;

        for (let r = 0; r < this.rows; r++) {
            this.matrix[r] = []
            for (let c = 0; c < this.cols; c++)
                this.matrix[r][c] = {}
        }
    }

    setCell(point, obj) { this.matrix[point.x][point.y] = obj }
    getCell(point) { return this.matrix[point.x][point.y] }

    findCells(obj) { 
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++)
                if ( this.matrix[r][c] === obj) return {x:r, y:c};
        }
        return {x: 1, y: 1};
    }

    setMatrix(matrix) { this.matrix = matrix }

    draw() { console.log(this.matrix) }
}

module.exports = Board