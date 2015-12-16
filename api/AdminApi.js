'use strict';
var ConfigurationService = require('../config/ConfigurationService.js'),
    AdminService = require('../services//AdminService.js');

module.exports = function(server) {

    /**
     * this will load configurations based on the environment
     */
    server.get('/admin/environment/load', function (req, res) {
        ConfigurationService.loadConfiguration(req.params["env"]);
        res.send(200, {"message":"reloaded environment"});
    });

    /**
     * this will drop all tables and re-create them. destroys data for testing.
     */
    server.get('/admin/models/sync', function (req, res) {
        AdminService.initModels(function (results){
            res.send(200, {"message":"synced models", results});
        });
    });

};