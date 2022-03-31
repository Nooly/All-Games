/* ============================================== */
// My recomended Maze build
/* ============================================== */

const _ = ' ';      // Space                ' '
const W = '\u2592'; // ▒    Medium shade    '\u2592'
const S = '\u261D'; // ☝ finger pointing Up '\u261D'
const E = '\u2B05'; // Left Arrow           '\u2B05'
const P = '\uC6C3'; // 웃 Player            '\uC6C3'

const Maze = [
    [W, W, W, W, W, W, W, W, W, W, W, W],
    [W, _, _, _, W, _, _, _, W, W, _, W],
    [E, _, W, _, W, _, W, _, _, _, _, W],
    [W, _, W, _, _, _, _, _, _, W, _, W],
    [W, _, W, _, W, _, W, _, _, W, _, W],
    [W, W, _, W, W, _, W, _, W, W, _, W],
    [W, W, _, W, W, _, W, _, W, W, _, W],
    [W, W, _, W, W, _, W, _, W, W, _, W],
    [W, W, _, W, W, _, W, _, W, W, _, W],
    [W, W, _, W, W, _, W, _, W, W, _, W],
    [W, W, _, W, W, _, _, _, W, W, _, W],
    [W, W, _, W, W, _, W, _, W, W, _, W],
    [W, _, _, W, W, W, _, _, W, _, _, W],
    [W, _, W, W, W, W, _, _, _, _, _, W],
    [W, _, _, _, _, _, _, _, _, _, _, W],
    [W, W, W, W, W, W, W, W, W, W, S, W],
];

const LU = [+1, -1], UP = [+1, +0], RU = [+1, +1];
const LF = [+0, -1]; MI = [+0, +0], RT = [+0, +1];
const LD = [-1, -1], DN = [-1, +0], RD = [-1, +1];

/* ============================================== */
// Maze functions
/* ============================================== */
const addVectors = (v1, v2) => ([v1[0] + v2[0], v1[1] + v2[1]]);

const maze_findStart = () => board.find(S);
const maze_findPlayer = () => board.find(P);
const maze_peek = (Pos) => board.get(Pos);
const maze_isGameOver = () => board.isPieceAtPlace(P, board.find(E));

/* ============================================== */
// Relevant code fom Omer's game
/* ============================================== */

{
    // const Board = require('../Board');   // Class incorporation
    // board = new Board(8, 6);            // Object initiation
    // board.matrix = Maze;                // Maze assignment
}

const Board = require('../Board');   // Class incorporation
board = new Board(Maze);             // Object initiation

{
    // let currMatX = 16;      // Player initial position Row
    // let currMatY = 11;      // Player initial position Column
}

let startPos = maze_findStart();
console.log('StartPos:', startPos);
console.log('At Start Pos:', board.get(startPos));

let player = P;
//board.add(player, [1, 10]);
board.add(player, startPos);
console.log('At Start Pos after add player:', board.get(startPos));

maze_movePlayer(DN);
let playerPos = maze_findPlayer();
console.log('Player pos after move:', playerPos);
console.log('At Start Pos after move player:', board.get(startPos));
console.log('At Player Pos after move player:', board.get(playerPos));

{
    // if (Maze[currMatX - 1][currMatY - 1] == 'E') { } // have we reached the end point ?
}

console.log("Game Over:", maze_isGameOver())

{
    // let VectorU = Maze[currMatX - 2][currMatY - 1]      // Cell Above
    // let VectorD = Maze[currMatX][currMatY - 1]          // Cell Below
    // let VectorR = Maze[currMatX - 1][currMatY]          // Cell Right
    // let VectorL = Maze[currMatX - 1][currMatY - 2]      // Cell Left
    // let VectorUR = Maze[currMatX - 2][currMatY]         // Upper Right
    // let VectorUL = Maze[currMatX - 2][currMatY - 2]     // Upper Left
    // let VectorDR = Maze[currMatX][currMatY]             // Down Right
    // let VectorDL = Maze[currMatX][currMatY - 2]         // Down Left
}

let playerLocation = maze_findPlayer();
let VectorUR = maze_peek(addVectors(playerLocation, LU));  // Upper Right
let Vector_U = maze_peek(addVectors(playerLocation, UP));  // Cell Above
let VectorUL = maze_peek(addVectors(playerLocation, RU));  // Upper Left
let Vector_L = maze_peek(addVectors(playerLocation, LF));  // Cell Left
let Vector_R = maze_peek(addVectors(playerLocation, RT));  // Cell Right
let VectorDL = maze_peek(addVectors(playerLocation, LD));  // Down Left
let Vector_D = maze_peek(addVectors(playerLocation, DN));  // Cell Below
let VectorDR = maze_peek(addVectors(playerLocation, RD));  // Down Right


console.log('Vector_U:', (Vector_U));
console.log('Vector_R:', (Vector_R));
console.log('Cond 1:)', ((Vector_U) == _ && (Vector_R) == W))

{
    // MoveX(-1);         // Move Up
    // MoveX(1);          // Move Down
    // MoveY(1);          // Move Right
    // MoveY(-1);         // Move Left
}

if (Vector_U == _ && Vector_R == W) { maze_movePlayer(UP); return; }         //     X▒
if (Vector_U == W && Vector_L == _) { maze_movePlayer(LF); return; }
if (Vector_U == _ && VectorUR == W) { maze_movePlayer(DN); return; }
if (Vector_L == W) { maze_movePlayer(RT); return; }


{
    // function MoveY(a) {     // Basic move along the horizontal axis
    //     currMatY += 1 * a;
    //     if (Maze[currMatX - 1][currMatY - 1] !== '.') { }
    //     else (currMatY -= 1 * a);
    // }

    // function MoveX(a) {     // Basic move along the vertical axis
    //     currMatX -= 1 * a;
    //     if (Maze[currMatX - 1][currMatY - 1] !== '.') { }
    //     else (currMatX += 1 * a);
    // }
}
function maze_movePlayer(vec) {
    let from = board.find(P);
    let to = addVectors(from, vec);
    let target = board.get(to);

    if (target == _ || target == S || target == E)
        board.move(P, from, to)
}