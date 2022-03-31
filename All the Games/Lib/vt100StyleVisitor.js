const CSI = '\x1b[';
const AREA = 'style';

const STYLES = [
    { 'reset': CSI + '0m' },
    { 'bold': CSI + '1m' },
    { 'low': CSI + '2m' },
    { 'italic': CSI + '3m' },
    { 'underline': CSI + '4m' },
    { 'blink': CSI + '5m' },
    { 'invisible': CSI + '8m' },
    { 'negative': CSI + '7m' },
    { 'positive': CSI + '27m' },
]

var StyleVisitor = function () {
    this.visit = function (screen) {
        screen.actionsFactory(screen, AREA, STYLES)
    }
}

module.exports = StyleVisitor