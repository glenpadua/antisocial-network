// BASE SETUP
// ================================

// CALL THE PACKAGES ---------------

var express = require('express'), // Call express
		app = express(), // Define app using express
		bodyParser = require('body-parser'), // get body parser
		morgan = require('morgan'), // used to log requests
		mongoose = require('mongoose'), // ORM for MongoDB
		path = require('path'), // node path module
		config = require('./config'); // get the environment configurations

// APP CONFIGURATIONS --------------

// use body parser so that we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-HEADERS', 'X-Requested-With, content-type, \Authorization');
	next();
});

// log all requests to console
app.use(morgan('dev'));

// Connect to the database
//mongoose.connect(config.database);

// API ROUTES
// ==================================

// basic route for home page
app.get('/', function(req, res) {
	res.send('Welcome to the home page');
});

// get an instance of express router
var apiRouter = express.Router();

// test route to make sure everything is working
// accessed at GET http://localhost:8080/api
apiRouter.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

// more API routes go here

// REGISTER ROUTES -------------------
// all API routes will be prefixed with /api
app.use('/api', apiRouter);

// START THE SERVER 
// ==================================
app.listen(config.port);
console.log('Application is now running on ' + config.port);