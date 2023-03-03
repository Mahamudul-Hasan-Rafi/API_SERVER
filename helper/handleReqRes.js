/* eslint-disable no-unused-vars */
const url = require('url');
const { StringDecoder } = require('string_decoder');
const { parseJson } = require('../utilities');

const routes = require('../routes');
// eslint-disable-next-line no-unused-vars
const { sampleHandler } = require('../handlers/routehandlers/sampleRouteHandler');
const { userHandler } = require('../handlers/routehandlers/userHandler');
const { notFoundHandler } = require('../handlers/routehandlers/notFoundHandler');

const handler = {};

handler.handleReq = (req, res) => {
    const parsedUrl = url.parse(req.url);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const reqMethod = req.method.toLowerCase();
    const reqHeaders = req.Headers;
    const queryString = parsedUrl.query;

    const reqObject = {
        parsedUrl,
        path,
        trimmedPath,
        reqMethod,
        reqHeaders,
        queryString,
    };

    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

    const Decoder = new StringDecoder('utf-8');
    let readData = '';
    req.on('data', (buffer) => {
        readData += Decoder.write(buffer);
    });

    req.on('end', () => {
        readData += Decoder.end();
        const data = parseJson(readData);
        reqObject.body = data;

        chosenHandler(reqObject, (statusCode, payload) => {
            const statusC = typeof statusCode === 'number' ? statusCode : 500;
            const payloadData = typeof payload === 'object' ? payload : {};
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusC);
            res.end(JSON.stringify(payloadData));
        });
    });
};

module.exports = handler;
