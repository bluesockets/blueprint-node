'use strict';
var frisby = require('frisby');

frisby.globalSetup({
    request: {
        headers: { "x-auth" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImJsdWVzb2NrZXRzQGdtYWlsLmNvbSIsImlhdCI6MTQ0NjUzMjk1M30.xBf6TCW57FX6J3kG0wrKwIJm3TkI56KKtxvushEK6Ro" }
    }
});

var URL = 'http://localhost:8080';

describe("Initialize Suite", function() {

    it("Initialize Tests", function() {

        frisby.create('Manually load the environment')
            .get(URL + "/admin/environment/load?env=jasmine")
                .expectStatus(200)
                .expectHeaderContains('content-type', 'application/json')
                .expectJSON({
                    message: "reloaded environment"
                })
                .expectJSONTypes({
                    message: String
                })
            .toss();

        frisby.create('Manually re-sync the sequelize models')
            .get(URL + "/admin/models/sync")
            .expectStatus(200)
            .expectHeaderContains('content-type', 'application/json')
            .expectJSON({
                message: "synced models",
                results: {
                    message: "models have been synced"
                }
            })
            .expectJSONTypes({
                message: String,
                results: Object
            })
            .afterJSON(function () {
                waits(1000);
            })
            .toss();
    });

});