const util = require("util");

class Keyboard {
    constructor(actor) {
        this.actor = actor;                     // Injected actor

        var stdin = process.stdin;
        stdin.setRawMode(true);
        stdin.resume();                         // Keeps app running
        stdin.setEncoding('utf8');

        stdin.on('data', key => this.act(key));

        this.block = false;
        this.history = [];
    }
    act(key) {
        if (key === '\u0003') process.exit();   // Ctrl-C

        if (!this.block) {
            if (this.actor) this.actor(key);
        }
        this.history.push(key);
    }
    getHistory() {
        return this.history;
    }
    // dsr(dsrAction) {                             // Device Status Report
    //     this.block = true;
    //     process.stdin.once("data", data => {
    //         let pos = util.inspect(data.toString());
    //         dsrAction((pos.substring(6, pos.length - 2)).split(';'));
    //         this.block = false;
    //     });
    //     process.stdout.write("\x1b[6n");
    // }
}

const keyboard = new Keyboard(keyPress);

function keyPress(key) {
    process.stdout.write(key);
    if (key == 'p') typeWrite(keyboard.getHistory())
    if (key == 'q') typeWrite(getFile());
}

function typeWrite(keys) {
    console.clear();
    let current = 0;

    setTimeout(write_text, 100);

    function write_text() {
        process.stdout.write(keys[current]);

        if (current < keys.length - 1) {
            current++;
            setTimeout(write_text, 100);
        }
    }
}

function getFile() {
    const fs = require('fs');

    var path = require('path');
    var scriptName = path.basename(__filename);

    try {
        const data = fs.readFileSync(scriptName, 'utf8');
        return data;
    } catch (err) {
        console.error(err);
    }
    return 'Error';
}

function getPosition(position) {
    process.stdout.write(position.toString());
}