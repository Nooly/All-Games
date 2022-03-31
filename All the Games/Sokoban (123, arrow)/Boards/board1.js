const { free, wall, MAN, finish, box } = require('../comps');
const Board = require('../board.js');

board1 = new Board(9,9);

// Make walls
for (let x=1; x<board1.rows; x++)
    for (let y = 0; y<board1.cols; y++)
        board1.setCell({x,y},wall)

// Make empty cells
for (let x = 2; x < board1.rows - 1; x++)
    for (let y = 1; y < board1.cols - 1; y++)
        board1.setCell({x,y},free)

// Empty first row
for (let y = 0; y < board1.cols; y++)
    board1.setCell({x:0,y},free)

// Upper Left Space
board1.setCell({x:1,y:0},free)
board1.setCell({x:1,y:1},free)
board1.setCell({x:2,y:1},wall)
board1.setCell({x:2,y:2},wall)

// Bottom Right
board1.setCell({x:8,y:6},free)
board1.setCell({x:8,y:7},free)
board1.setCell({x:8,y:8},free)
board1.setCell({x:7,y:7},wall)
board1.setCell({x:7,y:6},wall)
board1.setCell({x:7,y:5},wall)

// Middle feature
board1.setCell({x:4,y:4},wall)
board1.setCell({x:5,y:3},wall)
board1.setCell({x:5,y:4},wall)
board1.setCell({x:5,y:5},wall)

// Set Player
board1.setCell({x:4,y:5},MAN)

// Set Player
board1.setCell({x:5,y:2},box)

// Set Finish
board1.setCell({x:6,y:6},finish)

module.exports = board1