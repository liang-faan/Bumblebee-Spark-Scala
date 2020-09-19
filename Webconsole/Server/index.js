'use strict';

var path = require('path');
var http = require('http');
const config = require('./Config');
const auth = require('./service/AuthenticationService')
const express = require("express");


var oas3Tools = require('oas3-tools');
var serverPort = config.app.port;

// swaggerRouter configuration
var options = {
    controllers: path.join(__dirname, './controllers')
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);

// oasTools.configure({
//     // other configuration variables
//     oasSecurity: true,
//     securityFile: {
//       Bearer: verifyToken
//     }
//   });

auth.addValidator(expressAppConfig);
// expressAppConfig.addValidator();
var app = expressAppConfig.getApp();


app.use(express.static(path.join(__dirname, 'Client/build')));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname+'/Client/build/index.html'));
  });


// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});

