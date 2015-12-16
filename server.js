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
	res.setHeader('Access-Control-Allow-HEADERS', 'X-Requested-With, content-type, Authorization');
	next();
});

// log all requests to console
app.use(morgan('dev'));

// Connect to the database
mongoose.connect(config.database);

// Set location of static files
app.use(express.static(__dirname + '/public'));

// API ROUTES
// ==================================
var apiRoutes = require('./app/routes/api')(app, express);

// REGISTER ROUTES -------------------
// all API routes will be prefixed with /api
app.use('/api', apiRoutes);

// MAIN CATCHALL ROUTE ---------------
// SEND USERS TO FRONTEND ------------
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

// START THE SERVER 
// ==================================
app.listen(config.port);
console.log('Application is now running on ' + config.port);
