// SETS ALL THE API ROUTES
// ===============================

var User = require('../models/users'),
		jwt = require('jsonwebtoken'),
		config = require('../../config');

// secret for creating JWT
var superSecret = config.secret;

module.exports = function(app, express) {
	
	// get an instance of express router
	var apiRouter = express.Router();
	
	// middleware to use for all requests
	apiRouter.use(function(req, res, next) {
		console.log("Somebody just came in!");
		
		// More stuff for authenticating users
		
		// move on to the next route without stopping here
		next();
	});
	
	// test route for API
	// accessed at GET http://localhost:8080/api
	apiRouter.get('/', function(req, res) {
		res.json({ message: 'Welcome to the Anti-Social Network API!' });
	});
	
	// More API routes to follow
	
	return apiRouter;
};