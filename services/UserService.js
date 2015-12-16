'use strict';
var User = require('../models/postgres/User.js'),
    HashService = require('password-hash');

var createUser = function(newUser, callback) {

    newUser.password = HashService.generate(newUser.password);
    User.create(newUser)
        .then(function(createdUser) {
            console.log("Created User: " + JSON.stringify(createdUser));
            return callback(null, createdUser);
        })
        .catch(function(err){
            console.log("error: " + err);
            return callback(err);
        });

};

var findUserByEmail = function(email, callback) {
    User.findOne({ where : {email : email} })
        .then(function (user) {
            console.log("found user: " + user.email);
            return callback(user);
        });
};

var facebookLogin = function(facebookUser, callback) {

    User.findOne({ where : {email :facebookUser.email} })
        .then(function (user) {

            /**
             * save the user if they don't exist
             * else if they already exist, return them
             */
            if(user == null) {

                User.create(facebookUser)
                    .then(function(createdUser) {
                        console.log("Created User: " + JSON.stringify(createdUser));
                        createdUser.dataValues["isNewUser"] = true;
                        return callback(null, createdUser);
                    })
                    .error(function(err){
                        console.log("error: " + err);
                        return callback(err, null);
                    });

            } else {

                // return the user found in the DB
                user.dataValues["isNewUser"] = false;
                return callback(null, user);

            }

        })
        .error(function (err) {
            console.log("no facebook user found for email: " + facebookUser.email);
            return callback(err, null);
        });

};

var loginUser = function(authUser, callback) {

    User.findOne({ where : {email : authUser.email} })
        .then(function (user) {

            if(user == null) {
                var err = {message:"no user found with username: " + authUser.handle};
                return callback(err, null);
            }

            if (HashService.verify(authUser.password, user.dataValues.password)) {
                console.log("found user: " + authUser.handle);
                return callback(null, user);
            } else {
                console.log("found user: " + authUser.handle + " but password authentication failed");
                return callback("authentication failure", null);
            }

        })
        .error(function (err) {
            console.log("error looking up username: " + authUser.handle);
            return callback(err, null);
        });

};

module.exports = {
    createUser: createUser,
    facebookLogin: facebookLogin,
    findUserByEmail: findUserByEmail,
    loginUser: loginUser
};