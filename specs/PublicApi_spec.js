'use strict';
var ConfigurationService = require('../config/ConfigurationService.js');

var frisby = require('frisby'),
    sequelize = require('../models/postgres/SequelizePool.js');

var URL = 'http://localhost:8080';

describe("User create Suite", function() {

    it("User registration tests", function() {

        frisby.create('Create user with form data')
            .post(URL + '/public/register', {
                "email": "qa1-someone@gmail.com",
                "first_name": "John",
                "last_name": "Smith",
                "password": "password123!"
            }, {json: true})
            .expectJSON({
                "user": {
                    "email":"qa1-someone@gmail.com",
                    "firstName":"John",
                    "lastName":"Smith",
                    "fbImageUrl": ""
                }
            })
            .afterJSON(function () {

                waits(1000);

                frisby.create('User logs in')
                    .post(URL + '/public/login', {
                        "email": "qa1-someone@gmail.com",
                        "password": "password123!"
                    }, {json: true})
                    .expectJSON({
                        "user": {
                            "email":"qa1-someone@gmail.com"
                        }
                    })
                    .afterJSON(function () {

                        waits(1000);

                        sequelize.query(
                            "delete from tb_user where email similar to 'qa1-%'" ,
                            {
                                type: sequelize.QueryTypes.DELETE,
                                logging: false
                            }
                        );

                    })
                    .toss();



            })
            .toss();



        frisby.create('User logs in with facebook data')
            .post(URL + '/public/facebook', {
                "email": "qa2-someone@facebook.com",
                "first_name": "Jason",
                "last_name": "Smith",
                fb_image_url: "http://images.google.com/something.jpg"
            }, {json: true})
            .expectJSON({
                "user": {
                    "email":"qa2-someone@facebook.com"
                }
            })
            .afterJSON(function () {

                waits(1000);

                sequelize.query(
                    "delete from tb_user where email similar to 'qa2-%'" ,
                    {
                        type: sequelize.QueryTypes.DELETE,
                        logging:false
                    }
                );

            })
            .toss();



    });

});
