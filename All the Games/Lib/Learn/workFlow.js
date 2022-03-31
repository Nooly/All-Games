workFlow = {
    name: 'PlayGame',   // PlayChess
    nodes: [
        {
            id: '1',
            name: 'createBoard',       // CreateChessBoard
            stepType: 'Action',
            input: 'characteristics',  // 8x8, B&W, [1-8]:[A-H],BL=>TR, NotationLanguage
            action: 'createABoard',
            output: 'board'
        },
        { setUpBoard: 'whatEverSetsUpABoard' },         // put16ChessPiecesOnBoard
        { choosePlayerTypes: 'choosePlayerTypes' },     // 2 humans
        { allocateSides: 'allocateSides' },             // whoAreWhite&Black
        { executeGameType: 'executeGameType' },
        { completeGame: 'completeGame' },
    ],
    edges: [

    ]
};

humansPlayWorkFlow = {
    name: 'HumanPlayers',
    steps: [
        { selectPlayer: 'selectPlayer' },
        { showHint: 'showHint' },
        { acceptMove: 'acceptMove' },
        // Pass is a move !!
        // New workFlows ??
        {
            pass: [

            ],
            notPass: [
                { validateMove: 'validateMove' },
                // If valid move
                { positionPiece: 'positionPiece' },
                { selectActions: 'selectActions' },
                { performActions: 'performActions' },
            ]
        },

        { storeMove: 'storeMove' },
        { showScore: 'showScore' },
        { checkGameOver: 'checkGameOver' }
        // If not repeat
    ]
}

botsPlayWorkFlow = {
    name: 'BotPlayers',
    // Visual display ??
    // Steps timer ??
    steps: [
        { selectPlayer: 'selectPlayer' },
        { selectStrategy: 'selectStrategy' },
        { showHint: 'showHint', visual: 'visual', optional },
    ]
}

mixedPlayersWorkFlow = {

}