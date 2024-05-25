const querystring = require('querystring');

function parseRequestBody(req) {
    let body = "";
    req.on("data", chunk => {
        body += chunk.toString();
    });

    return new Promise((resolve, reject) => {
        req.on("end", () => {
            try {
                if (!body) {
                    throw new Error("Empty request body");
                }
                const parsedBody = querystring.parse(body);
                resolve(parsedBody);
            } catch(error) {
                reject(error);
            }
        });
    });
}

module.exports = parseRequestBody;