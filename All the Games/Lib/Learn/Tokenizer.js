/*
 * Tiny tokenizer
 *
 * - Accepts a subject string and an object of regular expressions for parsing
 * - Returns an array of token objects
 *
 * tokenize('this is text.', { word:/\w+/, whitespace:/\s+/, punctuation:/[^\w\s]/ }, 'invalid');
 * result => [{ token="this", type="word" },{ token=" ", type="whitespace" }, Object { token="is", type="word" }, ... ]
 *
 * html regEx <(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>
 *
 * xml example:
 * <note>
 *   <to>Tove</to>
 *   <from>Jani</from>
 *   <heading>Reminder</heading>
 *   <body>Don't forget me this weekend!</body>
 * </note>
 *
 * tokenize('<note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don\'t forget me this weekend!</body></note>',
 *         { node:/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/ } ,  'invalid');
 *
 */
function tokenize(data, parsers, deftok) {

    var minLen, result, token, tokens = [];

    while (data) {
        token = null;
        minLen = data.length;
        for (var reKey in parsers) {
            result = parsers[reKey].exec(data);
            console.log('\nr=', result, ' reKey=', reKey)
            // try to choose the best match if there are several
            // where "best" is the closest to the current starting point
            if (result && (result.index < minLen)) {
                token = {
                    token: result[0],
                    type: reKey,
                    matches: result.slice(1)
                }
                minLen = result.index;
            }
            console.log('token=', token)
        }
        if (minLen) {
            // there is text between last token and currently 
            // matched token - push that out as default or "unknown"
            tokens.push({
                token: data.substr(0, minLen),
                type: deftok || 'unknown'
            });
        }
        if (token) {
            // push current token onto sequence
            tokens.push(token);
        }
        data = data.substr(minLen + (token ? token.token.length : 0));
    }
    return tokens;
}

let tokens = tokenize(
    'This is a hello world!',
    { word: /\w+/, whitespace: /\s+/, punctuation: /[^\w\s]/ },
    'invalid'
);

console.log(tokens)
