'use strict';
var jwt = require('../services/JwtService.js'),
    UserService = require('../services/UserService.js');

module.exports = function(server) {

    server.post('/public/facebook', function (req, res) {

        /**
         * grab facebook token if it's passed in
         */
        var postData = req.body;
        var facebookUser = {
            email : postData.email,
            firstName: postData.first_name,
            lastName: postData.last_name,
            fbImageUrl: postData.fb_image_url
        };

        UserService.facebookLogin(facebookUser, function(err, user) {

            if(user != null) {

                delete user.dataValues.password;
                delete user.dataValues.createdAt;
                delete user.dataValues.updatedAt;
                user.dataValues["token"] = jwt.generateToken(postData.email);

                res.send(200, {status: 200, user:user});

            } else {
                res.send(404, err);
            }

        });

    });


    /**
     * registers a new user by email, and returns the JWT token generated for authentication.
     */
    server.post('/public/register', function (req, res) {

        /**
         * explicitly extract the registration form data so we can see it
         */
        var postData = req.body;
        var user = {
            email : postData.email,
            firstName: postData.first_name,
            lastName: postData.last_name,
            password: postData.password,
        };
        
        UserService.createUser(user, function(err, createdUser) {
            if(err != null) {
                res.send({
                    message: err.message,
                    name: err.name
                });
                return;
            }

            delete createdUser.dataValues.password;
            delete createdUser.dataValues.createdAt;
            delete createdUser.dataValues.updatedAt;
            createdUser.dataValues["token"] = jwt.generateToken(postData.email);

            res.send(200, {status: 200, user:createdUser});
        });

    });

    server.post('/public/login', function (req, res) {

        var postData = req.body;

        /**
         * extract the login data
         */
        var user = {
            email : postData.email,
            password: postData.password
        };

        UserService.loginUser(user, function(err, user) {

            if(user != null) {

                delete user.dataValues.password;
                delete user.dataValues.createdAt;
                delete user.dataValues.updatedAt;
                user.dataValues["token"] = jwt.generateToken(postData.email);

                res.send(200, {status: 200, user:user});
            } else {
                res.send(404, err);
            }

        });

    });
};