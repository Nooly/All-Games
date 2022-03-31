const Game = require('./Game');


class Sokoban extends Game{
    constructor(board) {
        super(board);
        this.loadSokoban();
    }

    moveplayer(direction) {
        let player = this.board.findCells(2);
        player.id = 2;

        let cell = { x: 0, y: 0, id: 0 };

        if ((this.checkcell(player, direction) == 0) ||
            (this.checkcell(player, direction) == 4) ||
            (this.checkcell(player, direction) == 5)) {
            cell.x = player.x
            cell.y = player.y
            this.posobject(cell)
            this.stepplayer(player, direction)
            this.posobject(player)
        } else if (this.checkcell(player, direction) == 3) {
            if (this.checkcell(this.boxes[0], direction) == 0 ||
                this.checkcell(this.boxes[0], direction) == 5) {
                cell.x = player.x
                cell.y = player.y
                this.posobject(cell)
                this.stepplayer(player, direction)
                this.posobject(player)
                this.stepplayer(this.boxes[0], direction)
                this.posobject(this.boxes[0])
            }
        }
    }

    checkcell(player, direction) {

        let x = player.x
        let y = player.y;

        switch (direction) {
            case 'up': x = x - 1; break;
            case 'down': x = x + 1; break;
            case 'left': y = y - 1; break;
            case 'right': y = y + 1; break;
            default: break;
        }

        return this.board.matrix[x][y];
    }

    posobject(body) {
        this.board.matrix[body.x][body.y] = body.id
    }

    stepplayer(player, direction) {

        switch (direction) {
            case 'up': player.x = player.x - 1; break;
            case 'down': player.x = player.x + 1; break;
            case 'left': player.y = player.y - 1; break;
            case 'right': player.y = player.y + 1; break;
            default: break;
        }
    }

    finishgame() {
        return (
            this.boxes[0].x == this.finish.x &&
            this.boxes[0].y == this.finish.y
        )
    }
    ifpoison() {
        let player = this.board.findCells(2);
        player.id = 2;
        return (
            player.x == this.poison.x &&
            player.y == this.poison.y
        )
    }

    loadSokoban(){
        this.boxes = [];
        this.boxes[0] = this.board.findCells(3);
        this.boxes[0].id = 3;

        this.finish = this.board.findCells(5);
        this.poison = this.board.findCells(4);
    }

}

function copy2Dmatrix(m) {
    return m.map(x => x.map(x => x));
}

module.exports = Sokoban