const Board = require('../board.js');

const matrix = 
[ [ 0, 1, 0, 1, 0, 1, 0, 1 ],
  [ 1, 0, 1, 0, 1, 0, 1, 0 ],
  [ 0, 1, 0, 1, 0, 1, 0, 1 ],
  [ 3, 0, 3, 0, 3, 0, 3, 0 ],
  [ 0, 3, 0, 3, 0, 3, 0, 3 ],
  [ 2, 0, 2, 0, 2, 0, 2, 0 ],
  [ 0, 2, 0, 2, 0, 2, 0, 2 ],
  [ 2, 0, 2, 0, 2, 0, 2, 0 ] ];

board = new Board(matrix.length,matrix[0].length);
board.setMatrix(matrix);

module.exports = board