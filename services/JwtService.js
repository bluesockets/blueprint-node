'use strict';
var jsonWebToken = require('jsonwebtoken'),
    ConfigurationService = require('../config/ConfigurationService.js');

let config = ConfigurationService["jwt"];

var requiresValidation = function(req) {
    return config["authenticate"] &&
            !req.url.startsWith("/public") &&
            !req.url.endsWith(".html");
};


var generateToken = function (email) {
    var payload = {
        email : email
    };
    return jsonWebToken.sign(payload, config["jwtSecret"], config["jwtOptions"]);
};


var authenticate = function (req) {
    console.log("authentication: " + config["authenticate"]);
    if (requiresValidation(req)) {
        var token = req.headers['x-auth'];
        if (token == undefined) {
            console.log("no headers found, looking for GET token");
            token = req.query.token;
        }
        var decoded = jsonWebToken.verify(token, config["jwtSecret"]);
        req.headers['jwtPayload'] = decoded;
        console.log("token decoded: " + JSON.stringify(decoded));
        return decoded;
    }
};

module.exports = {
    requiresValidation: requiresValidation,
    generateToken: generateToken,
    authenticate: authenticate
};

