class Keyboard {
    constructor(Functi0n) {
        var stdin = process.stdin;
        stdin.setRawMode(true);
        stdin.resume();
        stdin.setEncoding('utf8');

        stdin.on('data', key => Functi0n(key));
    }
}
module.exports = Keyboard;