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
	
	// Routes that end in /users
	// -----------------------------------------
	apiRouter.route('/users')
	
	// Create a User/Register (POST http://localhost/api/users)
		.post(function(req, res) {
			// Create a new instance of the user model
			var user = new User();
		
			// set the user information
			user.name = req.body.name;
			user.username = req.body.username;
			user.password = req.body.password;
		
			// save user and check for errors
			user.save(function(err) {
				if (err) {
					// duplicate entry
					if (err.code == 11000)
						return res.json({ success: false, message: 'A user with that username already exists.' });
					else
						return res.send(err);
				}
				
				res.json({ message: 'User created successfully!' });
			});
		});
	
	return apiRouter;
};