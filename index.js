'use strict';

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

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*, http://localhost:4200/, https://tomaskre.github.io/PWAFE/');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});
app.use(cors({
    origin: false, //Boolean - set origin to true to reflect the request origin,
	//as defined by req.header('Origin'), or set it to false to disable CORS.

    credentials: false, // This MUST be "true" if your endpoint is
                       // authenticated via either a session cookie
                       // or Authorization header. Otherwise the
                       // browser will block the response.

    methods: ['POST', 'GET', 'PUT', 'OPTIONS', 'DELETE', 'PATCH'], // Make sure you're not blocking
                                           // pre-flight OPTIONS requests
	allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', '*'],
	optionsSuccessStatus: 200
}));

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});

