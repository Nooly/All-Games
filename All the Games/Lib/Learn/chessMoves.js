ChessBoard = [
    ['A8', 'B8', 'C8', 'D8', 'E8', 'F8', 'G8'],
    ['A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7'],
    ['A6', 'B6', 'C6', 'D6', 'E6', 'F6', 'G6'],
    ['A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5'],
    ['A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4'],
    ['A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3'],
    ['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2'],
    ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1'],
]

ChessColors = [
    'White', 'Black',
]

ChessPieces = [
    { 'King': 'K' },
    { 'Queen': 'Q' },
    { 'Rook': 'R' },
    { 'Bishop': 'B' },
    { 'Knight': 'N' },
    { 'Pawn': 'P' },
]

ChessVectors = [
    // Simple Steps
    { 'StepUp': [0, 1] },
    { 'StepDown': [0, -1] },
    { 'StepRight': [1, 0] },
    { 'StepLeft': [-1, 0] },
    { 'StepUpRight': [1, 1] },
    { 'StepUpLeft': [-1, 1] },
    { 'StepDownRight': [1, -1] },
    { 'StepDownLeft': [-1, -1] },
    // 
    { 'KnightUpRight': [0, 0] },
    { 'KnightRightUp': [0, 0] },
    { 'KnightUpLeft': [0, 0] },
    { 'KnightLeftUp': [0, 0] },
    { 'KnightDownRight': [0, 0] },
    { 'KnightRightDown': [0, 0] },
    { 'KnightDownLeft': [0, 0] },
    { 'KnightLeftDown': [0, 0] },
    // Multiple Options ( up to 8 steps )
    { 'LineUp': [0, 0] },
    { 'LineDown': [0, 0] },
    { 'LineRight': [0, 0] },
    { 'LineLeft': [0, 0] },
    { 'LineUpRight': [0, 0] },
    { 'LineUpLeft': [0, 0] },
    { 'LineDownRight': [0, 0] },
    { 'LineDownLeft': [0, 0] },
    // Casteling ( Moves 2 tools )
    { 'CastelingLeft': [0, 0] },
    { 'CastelingRight': [0, 0] },
    // Pawn StepForward ( Color Dependant )
    { 'StepUpDouble': [0, 0] },
    { 'StepDownDouble': [0, 0] },
    { 'EnPassantUpLeft': [0, 0] },
    { 'EnPassantUpRight': [0, 0] },
    { 'EnPassantDownLeft': [0, 0] },
    { 'EnPassantDownRight': [0, 0] },
]

ChessMoves = {
    /*
        The king moves exactly one vacant square in any direction:
        forwards, backwards, left, right, or diagonally;
        
        however, it cannot move to a square that is under attack by
        an opponent, nor can a player make a move with another piece
        if it will leave the king in check.
        
        It also has a special move called castling, in which the king
        moves two squares towards one of its own rooks and in the same move,
        the rook jumps over the king to land on the square on the king's
        other side.
        
        Castling may only be performed if the king and rook involved have
        never previously been moved in the game,
        if the king is not in check,
        if the king would not travel through or into check,
        and if there are no pieces between the rook and the king.
    */
    'King': [
        StepUp,
        StepDown,
        StepRight,
        StepLeft,
        StepUpRight,
        StepUpLeft,
        StepDownRight,
        StepDownLeft,
        CastelingLeft,
        CastelingRight,
    ],
    /*
        The queen moves any number of vacant squares in any direction:
        forwards, backwards, left, right, or diagonally, in a straight line.
    */
    'Queen': [
        LineUp,
        LineDown,
        LineRight,
        LineLeft,
        LineUpRight,
        LineUpLeft,
        LineDownRight,
        LineDownLeft,
    ],
    /*
        A rook moves any number of vacant squares forwards, backwards,
        left, or right in a straight line.
        It also takes part, along with the king, in a special move
        called castling.
    */
    'Rook': [
        LineUp,
        LineDown,
        LineRight,
        LineLeft,
        CastelingLeft,
        CastelingRight,
    ],
    /*
        A knight moves on an extended diagonal from one corner of any
        two-by-three rectangle of squares to the farthest opposite corner.
        
        Consequently, the knight alternates its square color each time it moves.
        Other than the castling move described above where the rook jumps over
        the king, the knight is the only piece permitted to routinely
        jump over any intervening piece(s) when moving.
    */
    'Knight': [
        KnightUpRight,
        KnightRightUp,
        KnightUpLeft,
        KnightLeftUp,
        KnightDownRight,
        KnightRightDown,
        KnightDownLeft,
        KnightLeftDown,
    ],
    /*
        A bishop moves any number of vacant squares diagonally
        in a straight line.

        Consequently, a bishop stays on squares of the same color throughout
        a game. The two bishops each player starts with move on squares of
        opposite colors.
    */
    'Bishop': [
        LineUpRight,
        LineUpLeft,
        LineDownRight,
        LineDownLeft,
    ],
    /*
        A pawn moves forward exactly one square, or optionally, two squares when on
        its starting square, toward the opponent's side of the board.
        
        When there is an enemy piece one square diagonally ahead of a pawn,
        either left or right, then the pawn may capture that piece.
        
        A pawn can perform a special type of capture of an enemy pawn called
        en passant ("in passing"). If the pawn reaches a square on the back rank
        of the opponent, it promotes to the player's choice of a queen, rook,
        bishop, or knight
    */
    'Pawn': [
        StepForward,
        StepDouble,
        EnPassantLeft,
        EnPassantRight,
    ],
}