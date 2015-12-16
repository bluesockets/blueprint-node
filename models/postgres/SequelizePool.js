'use strict';
var ConfigurationService = require('../../config/ConfigurationService.js'),
    Sequelize = require('sequelize');

let config = ConfigurationService["postgres"];
var sequelize = new Sequelize(config["connectionString"], config["configuration"]);

module.exports = sequelize;