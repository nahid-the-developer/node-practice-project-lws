const url = require('url')
const {StringDecoder} = require('string_decoder')
const routes = require('../routes')
const {notFoundHandler} = require('../handlers/routeHandler/notFoundHandler')

const handle = {};

handle.handleReqRes = (req, res) => {
    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname;
    const exactPath = path.replace(/^\/+|\/+$/g, '')

    const queryStringObject = parseUrl.query;
    const headersObject = req.headers;
    const method = req.method.toLowerCase();

    const requestProperties = {
        parseUrl, path, exactPath, queryStringObject, headersObject, method,
    }

    const decoder = new StringDecoder('utf-8')
    let realData = '';

    const chosenHandler = routes[exactPath] ? routes[exactPath] : notFoundHandler;

    req.on('data', (buffer) => {
        realData += decoder.write(buffer)
    })
    req.on('end', () => {
        realData += decoder.end()

        chosenHandler(requestProperties, (statusCode, payload) => {
            statusCode = typeof statusCode === 'number' ? statusCode : 500;
            payload = typeof payload === 'object' ? payload : {};

            const payloadString = JSON.stringify(payload);

            res.writeHead(statusCode);
            res.end(payloadString);
        })
    })
}

module.exports = handle;