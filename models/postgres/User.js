'use strict';
var sequelize = require('./SequelizePool.js'),
    Sequelize = require('sequelize');

var User = sequelize.define('User', {
    email: {
        type: Sequelize.STRING(512),
        unique: true,
        field: 'email'
    },
    firstName: {
        type: Sequelize.STRING(255),
        field: 'first_name'
    },
    lastName: {
        type: Sequelize.STRING(255),
        field: 'last_name'
    },
    password: {
        type: Sequelize.STRING(512),
        field: 'password'
    },
    createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
        defaultValue: sequelize.fn('NOW')
    },
    updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
        defaultValue: sequelize.fn('NOW')
    }
},{
    tableName: 'tb_user'
});

module.exports = User;
