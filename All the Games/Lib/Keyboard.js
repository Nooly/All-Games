// https://stackoverflow.com/questions/5006821/
// nodejs-how-to-read-keystrokes-from-stdin

class Keyboard {
    constructor(actor) {
        this.actor = actor;                     // Injected actor

        var stdin = process.stdin;

        if (stdin.isTTY) stdin.setRawMode(true);
        stdin.resume();                         // Keeps app running
        stdin.setEncoding('utf8');

        stdin.on('data', key => this.act(key));

        this.history = [];
    }
    act(key) {
        if (key === '\u0003') process.exit();   // Ctrl-C
        if (this.actor) this.actor(key);
        this.history.push(key);
    }
    getHistory() {
        return this.history;
    }
}

module.exports = Keyboard;

// https://nodejs.org/api/process.html#process_process_stdin
// https://stackoverflow.com/questions/5006821/nodejs-how-to-read-keystrokes-from-stdin