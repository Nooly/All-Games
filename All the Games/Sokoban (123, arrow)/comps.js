/*
    What are the pieces in a board game called?
    -------------------------------------------
    Collectively all the pieces in a board game are called components,
    or less commonly, equipment.
    
    Common pieces include chits, tiles, counters, chips, dice, cards,
    pawns, standees and miniatures.
    
    Individual pieces usually have names specific to each game.
*/

let free = 0;
let wall = 1;

let MAN = 2;
let box = 3;

let finish = 5;

let poison = 4

module.exports = { free, wall, MAN, finish, box, poison};