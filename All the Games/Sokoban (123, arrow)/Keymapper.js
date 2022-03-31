const up    = '\u001B\u005B\u0041'
const down  = '\u001B\u005B\u0042'
const right = '\u001B\u005B\u0043'
const left  = '\u001B\u005B\u0044'
const Number1  = '1'
const Number2  = '2'
const Number3  = '3'
const debug  = 'd'
const reset  = 'r'



class Keymapper {
    constructor() { }
    map( key ) {
        switch (key) {
            case up:    return 'up'   ; break;
            case down:  return 'down' ; break;
            case right: return 'right'; break;
            case left:  return 'left' ; break;
            case Number1:  return '1' ; break;
            case Number2:  return '2' ; break;
            case Number3:  return '3' ; break;
            case debug:  return 'debug' ; break;
            case reset:  return 'reset' ; break;


            default:    return ''     ; break;
        }

    }
}

module.exports = Keymapper;