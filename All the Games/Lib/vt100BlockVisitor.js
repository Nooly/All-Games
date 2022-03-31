var BlockVisitor = function () {
    this.visit = function (screen) {
        screen.block = {};
        screen.block.dump = (Y = 1, X = 1, memory) => {
            for (let r = 0; r < memory.length; r++)
                for (let c = 0; c < memory[0].length; c++) {
                    screen.goto(r + Y, c + X)
                    screen.write(memory[r][c])
                }
            return screen;
        };
    }
}

module.exports = BlockVisitor