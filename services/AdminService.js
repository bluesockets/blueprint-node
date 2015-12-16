'use strict';
var User = require('../models/postgres/User.js'),
    ConfigurationService = require('../config/ConfigurationService.js');

let syncModels = ConfigurationService["syncModels"];

var initModels = function(callback) {

    if (syncModels) {

        User.drop()
            .then(function(){
                User.sync();
            });

        callback({"message":"models have been synced"});
    } else {
        callback({"message":"models have not been synced"});
    }

};


module.exports = {
    initModels : initModels
};


