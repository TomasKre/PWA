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
//app.options('*', cors()); // pro pre-flight dotazy?

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
/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "");
  next();
});*/

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});

