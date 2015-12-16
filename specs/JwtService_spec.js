'use strict';
var ConfigurationService = require('../config/ConfigurationService.js');

var jwt = require('../services/JwtService.js');

describe("JWT Test Suite", function() {

    it("jwt test generate token", function() {
        var token = jwt.generateToken("bluesockets");
        expect("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImJsdWVzb2NrZXRzIn0.NTjBDQAHcNGHXej6U5LW_7YQJLiGYP8XtDJR1xsGqYI")
            .toEqual(token);
    });

    it("jwt test test to see if url requires validation", function() {
        var req = {
            url: "http://127.0.0.1:8080/protected"
        };
        var requiresValidation = jwt.requiresValidation(req);
        expect(true).toEqual(requiresValidation);
    });

    it("jwt test verify/sign token via headers", function() {
        var req = {
            url: "http://127.0.0.1:8080/protected",
            headers: {
                "x-auth":  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImJsdWVzb2NrZXRzIn0.NTjBDQAHcNGHXej6U5LW_7YQJLiGYP8XtDJR1xsGqYI"
            }
        };
        var decoded = jwt.authenticate(req);
        expect({"email":"bluesockets"}).toEqual(decoded);
    });

    it("jwt test verify/sign token via token", function() {
        var req = {
            url: "http://127.0.0.1:8080/protected",
            headers: {
            },
            query: {
                token:  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImJsdWVzb2NrZXRzIn0.NTjBDQAHcNGHXej6U5LW_7YQJLiGYP8XtDJR1xsGqYI"
            }
        };
        var decoded = jwt.authenticate(req);
        expect({"email":"bluesockets"}).toEqual(decoded);
    });

});