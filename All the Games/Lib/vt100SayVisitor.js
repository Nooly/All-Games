const CSI = '\x1b[';
const AREA = 'say';

const SAYINGS = [
    { 'success': CSI + '6;30;42m' + 'Success!' + CSI + '0m' },
    { 'fail': CSI + '6;31;43m' + 'Fail!' + CSI + '0m' },
]

var SayVisitor = function () {
    this.visit = function (screen) {
        screen.actionsFactory(screen, AREA, SAYINGS)
    }
}

module.exports = SayVisitor