const { sampleHandler } = require('./handlers/routehandlers/sampleRouteHandler');
const userHandler = require('./handlers/routehandlers/userHandler');

const routes = {
    sample: sampleHandler,
    user: userHandler,
};

module.exports = routes;
