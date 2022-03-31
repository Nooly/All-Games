const PIECES = [
    { 'WhiteKing': '\u2654' },
    { 'WhiteQueen': '\u2655' },
    { 'WhiteRook': '\u2656' },
    { 'WhiteBishop': '\u2657' },
    { 'WhiteKnight': '\u2658' },
    { 'WhitePawn': '\u2659' },

    { 'BlackKing': '\u265A' },
    { 'BlackQueen': '\u265B' },
    { 'BlackRook': '\u265C' },
    { 'BlackBishop': '\u265D' },
    { 'BlackKnight': '\u265E' },
    { 'BlackPawn': '\u265F' },
]

var ChessVisitor = function () {
    this.visit = function (screen) {
        screen.actionsFactory(screen, 'chess', PIECES)
    }
}

module.exports = ChessVisitor