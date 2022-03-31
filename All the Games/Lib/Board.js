class Board {
    constructor(board) {
        this.board = board;
        this.rows = board.length;
        this.cols = board[0].length;
    }
    find(marker) {
        let r, c;
        r = this.board.findIndex(
            e => {
                c = e.findIndex(
                    e => this.isPieceOnSquare(marker, e)
                )
                if (c >= 0) return true;
            }
        );
        return ([r, c]);
    }
    isPlaceOnBoard(place) {
        return (
            (place[0] >= 0) &&
            (place[1] >= 0) &&
            (place[0] < this.rows) &&
            (place[1] < this.cols)
        )
    }
    get(place) {
        return (this.isPlaceOnBoard(place))
            ? this.board[place[0]][place[1]]
            : null;
    }
    isPieceOnSquare(piece, cell) {
        return (Array.isArray(cell))
            ? cell.find(e => e == piece)
            : cell == piece
    }
    isPieceAtPlace(piece, place) {
        return (this.isPlaceOnBoard(place))
            ? this.isPieceOnSquare(piece, this.get(place))
            : false;
    }
    add(piece, place) {
        let cell = this.get(place);
        if (!Array.isArray(cell))
            this.board[place[0]][place[1]] = [cell];

        this.board[place[0]][place[1]].push(piece);
    }
    del(piece, place) {
        let cell = this.get(place);
        let idx = cell.findIndex(e => e == piece)
        cell.splice(idx, 1);

        this.board[place[0]][place[1]] =
            (cell.length > 1) ? cell : cell[0];
    }
    move(piece, from, to) {
        this.del(piece, from);
        this.add(piece, to);
    }
}

module.exports = Board;

/*
    what is the purpose of the board class ?

    To introduce a set of services to the programmer that are
    related to the board:

      - advise the size of the board, in a specific [ format ].
      ✓ advise if a [ location ] is in the board's boundries.
      ✓ add a [ piece ] to the board at a [ location ].
      ✓ remove a [ piece ] from the board from a [ location ]
      ✓ find a [ piece ] on the board.
      - identify if a specific [ piece ] is on the board
      - identify if a [ loaction ] is empty
      - identify if a [ loaction ] is occupied.
      - identify the color of a piece at a [ location ].
      - identify what kinds of pieces are on the board.
      ✓ advice what is at a requested location.
      ✓ move a piece from one location to an other.  ( directioon )
      - transformation between different co-ordinate systems 
      - advise what is the next location when advancing in
        a specific direction. ( enable cyclic movement )
      - export the board data to other classes.
      ✓ enable multiple pieces on a spot
      - treat markings different than pieces
*/

/*
    identify the size of the board.

    return the amount of rows and columns.
    consider the structure: array or object ?

    board.getSize({r,c} or [x,y])

*/