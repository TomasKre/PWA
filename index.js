'use strict';

var express = require('express')
var path = require('path');
var http = require('http');
var cors = require('cors');

var oas3Tools = require('oas3-tools');
var serverPort = (process.env.PORT || 5000);

// swaggerRouter configuration
var options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
var app = expressAppConfig.getApp();

// Initialize the Swagger middleware
http.createServer(app.use(cors({
    origin: true, //Boolean - set origin to true to reflect the request origin,
	//as defined by req.header('Origin'), or set it to false to disable CORS.

    credentials: false, // This MUST be "true" if your endpoint is
                       // authenticated via either a session cookie
                       // or Authorization header. Otherwise the
                       // browser will block the response.

    methods: ['POST', 'GET', 'PUT', 'OPTIONS', 'DELETE', 'PATCH'], // Make sure you're not blocking
                                           // pre-flight OPTIONS requests
	allowedHeaders: '*',
	optionsSuccessStatus: 200
}));).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});

