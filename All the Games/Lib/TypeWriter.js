class TypeWriter {
    constructor(options) {
        this.running = false;
        if (options) {
            this.speed = (options.speed) ? options.speed : 60;
            this.clear = (options.clear) ? options.clear : false;
            this.newLine = (options.newLine) ? options.newLine : false;
        }
    }
    type(keys) {
        if (this.running === true) {
            return false;
        }
        this.running = true;
        let current = 0;
        let len = keys.length - 1;
        let that = this;

        if (this.clear) this.cls();
        setTimeout(typeText, this.speed);

        function typeText() {
            process.stdout.write(keys[current]);

            if (current++ < len) {
                setTimeout(typeText, that.speed);
            } else {
                if (that.newLine) process.stdout.write('\n\n');
                that.running = false;
            }
        }
    }
    cls() {
        process.stdout.write('\x1b[2J');
        process.stdout.write('\x1b[1;1H');
    }
}

module.exports = TypeWriter;