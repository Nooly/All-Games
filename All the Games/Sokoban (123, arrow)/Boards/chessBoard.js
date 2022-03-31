const Board = require('../board.js');

const matrix = 
[ [ 2, 3, 4, 5, 6, 4, 3, 2 ],
  [ 1, 1, 1, 1, 1, 1, 1, 1 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 1, 1, 1, 1, 1, 1, 1, 1 ],
  [ 2, 3, 4, 5, 6, 4, 3, 2 ] ];

board = new Board(matrix.length,matrix[0].length);
board.setMatrix(matrix);

module.exports = board