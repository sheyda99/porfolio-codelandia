const generateResponse = ({ res, status, header, data }) => {
    const headers = {
        "Content-Type": `${header}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT,DELETE",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Max-Age": 2592000,
        "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    };
    res.writeHead(status, headers);
    res.end(data);
    // res.end(JSON.stringify(data));
}

module.exports = generateResponse;