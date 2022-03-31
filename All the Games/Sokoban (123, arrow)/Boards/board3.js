const Board = require('../board.js');

const matrix = 
[ [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [ 1, 1, 0, 0, 0, 0, 0, 0, 0, 1 ],
  [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
  [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
  [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
  [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
  [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ] ];

board = new Board(matrix.length,matrix[0].length);
board.setMatrix(matrix);

module.exports = board