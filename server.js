'use strict';
var restify = require('restify'),
    jwt = require('./services/JwtService.js');

/**
 * restify server
 */
var server = restify.createServer({
    name: 'blueprint-api',
    version: '0.0.1'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.use(function logger(req,res,next) {
    console.log(new Date(), req.method, req.url, JSON.stringify(req.headers));
    next();
});

server.use(function authenticate(req,res,next) {
    jwt.authenticate(req)
    next();
});

server.on('uncaughtException',function(request, response, route, error){
    console.error(error.stack);
    response.send(error);
});


/**
 * api endpoints
 */

require("./api/AdminApi.js")(server);
require("./api/PublicApi.js")(server);


/**
 * static html
 */
server.get(/\//, restify.serveStatic({
    directory: './client',
    default: 'index.html'
}));

/**
 * fire up http
 */
server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});