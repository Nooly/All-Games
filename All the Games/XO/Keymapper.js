class Keymapper {
    constructor() { }
    map(key) {
        switch (key) {
            case 'r': return 'r'; break;
            case 'q': return 'q'; break;
            case 'w': return 'w'; break;
            case 'e': return 'e'; break;
            case 'a': return 'a'; break;
            case 's': return 's'; break;
            case 'd': return 'd'; break;
            case 'z': return 'z'; break;
            case 'x': return 'x'; break;
            case 'c': return 'c'; break;

            default: return ''; break;
        }
    }

}

module.exports = Keymapper;