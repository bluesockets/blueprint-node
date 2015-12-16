'use strict';
var fs = require('fs');


function Configuration(){};
Configuration.prototype = new Array;
Configuration.prototype.loadConfiguration = function(env){

    var environment = env || 'test';
    if (environment != null) {
        var configs = JSON.parse(fs.readFileSync('./config/config.json', 'utf8'))[environment];
        for(var key in configs) {
            this[key] = configs[key];
        }
        console.log("set config environment to '" + environment + "'");
    }

};


var config = new Configuration();
console.log("NODE_ENV:" + process.env.NODE_ENV);
config.loadConfiguration(process.env.NODE_ENV);


module.exports = config;