const CSI = '\x1b[';
const color = 'color';
const background = 'bg'

const COLOR = [
    { 'reset': CSI + '0m' },
    { 'black': CSI + '30m' },
    { 'red': CSI + '31m' },
    { 'green': CSI + '32m' },
    { 'yellow': CSI + '33m' },
    { 'blue': CSI + '34m' },
    { 'magenta': CSI + '35m' },
    { 'cyan': CSI + '36m' },
    { 'white': CSI + '37m' },
]

const BACKGROUND = [
    { 'black': CSI + '40m' },
    { 'red': CSI + '41m' },
    { 'green': CSI + '42m' },
    { 'yellow': CSI + '43m' },
    { 'blue': CSI + '44m' },
    { 'magenta': CSI + '45m' },
    { 'cyan': CSI + '46m' },
    { 'white': CSI + '47m' },
]

var ColorVisitor = function () {
    this.visit = function (screen) {
        screen.actionsFactory(screen, color, COLOR);
        screen.actionsFactory(screen, background, BACKGROUND);

        // https://www.rapidtables.com/web/color/RGB_Color.html
        screen.colors = {};
        screen.colors.rgb = (r, g, b) => { screen.write(CSI + `38;2;${r};${g};${b}m`); return screen; }
        screen.colors.bgRgb = (r, g, b) => { screen.write(CSI + `48;2;${r};${g};${b}m`); return screen; };
    }
}

module.exports = ColorVisitor