const TypeWriter = require('../TypeWriter');

const typeWiter = new TypeWriter({ speed: 40, clear: false, newLine: true });
typeWiter.type(getFile());
typeWiter.type('Finished'); // Will not Run :-)

function getFile() {
    const fs = require('fs');
    const path = require('path');
    const scriptName = path.basename(__filename);

    try {
        const data = fs.readFileSync(scriptName, 'utf8');
        return data;
    } catch (err) {
        return err;
    }
}