// https://stackoverflow.com/questions/5006821/
// nodejs-how-to-read-keystrokes-from-stdin

class Keyboard {
    constructor( controler ) {
        var stdin = process.stdin;
        stdin.setRawMode( true );
        stdin.resume();
        stdin.setEncoding( 'utf8' );

        stdin.on('data', key =>  controler( key ));
    }
}

module.exports = Keyboard;