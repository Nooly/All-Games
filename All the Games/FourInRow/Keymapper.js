class Keymapper {
    constructor() { }
    map(key) {
        switch (key) {
            case 'r': return 'r'; break;
            case '1': return '1'; break;
            case '2': return '2'; break;
            case '3': return '3'; break;
            case '4': return '4'; break;
            case '5': return '5'; break;
            case '6': return '6'; break;
            case '7': return '7'; break;

            default: return ''; break;
        }
    }

}

module.exports = Keymapper;