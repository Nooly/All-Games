class VT100 {
    constructor() {
        Object.assign(this, this.vt100());
    }
    vt100() {
        return {
            accept(visitor) { visitor.visit(this); },

            actionFactory: (Obj, area, command, action) => {
                if (!Obj[area]) { Obj[area] = {} }
                (Obj[area])[command] = () => { return Obj.write(action); };
            },

            actionsFactory: (vt100, area, actions) => {
                actions.forEach(action => {
                    let key = Object.keys(action)[0];
                    this.actionFactory(this, area, key, action[key]);
                });
            },

            clear: () => {
                this.write('\x1b[2J'); return this;
            },

            goto: (n, m) => {
                //n = (n < 0) ? 0 : n; m = (m < 0) ? 0 : m;
                this.write('\x1b[' + (n || 1) + ';' + (m || 1) + 'H');
                return this;
            },

            write: (data) => {
                process.stdout.write(data); return this;
            },
            note: (x, y, data) => {
                this.write('\x1b[s');
                this.goto(x, y);
                this.write(data);
                this.write('\x1b[u');
            },
        };
    }
}

module.exports = VT100

// Documentation:
// --------------
// https://github.com/75lb/ansi-escape-sequences/blob/master/dist/index.cjs
// https://docs.microsoft.com/en-us/windows/console/console-virtual-terminal-sequences
// https://docs.microsoft.com/en-us/previous-versions/tn-archive/cc722862(v=technet.10)?redirectedfrom=MSDN
// https://developpaper.com/linux-tips-setting-terminal-character-display-color-and-moving-cursor-position-in-code/
// https://www.csie.ntu.edu.tw/~r92094/c++/VT100.html
// https://stackoverflow.com/questions/36929209/read-ansi-escape-from-terminal