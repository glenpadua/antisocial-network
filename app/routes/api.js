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
	
	// route to authenticate users (POST http://localhost:8080/api/authenticate)
	apiRouter.post('/authenticate', function(req, res) {
		
		// find the user
		// select the name username and password explicitly
		User.findOne({
			username: req.body.username
		}).select('name username password').exec(function(err, user) {
			
			if (err) throw err;
			
			// if no user with that username was found
			if (!user) {
				res.json({ success: false, message: 'Authentication failed. User not found.' });
			}
			else if (user) {
				// check if password matches
				var validPassword = user.comparePassword(req.body.password);
				if (!validPassword)
					res.json({ success: false, message: 'Authentication failed. Wrong password.' });
				else {
					// if user is found and password is right
					// create a token
					var token = jwt.sign({
						name: user.name,
						username: user.username
					}, superSecret, {
						expiresInMinutes: 1440 // expires in 24 hours
					});

					// return the information token as JSON
					res.json({
						success: true,
						message: 'Authenticated successfully',
						token: token
					});
				}
			}
		});
	});
	
	
	// middleware to use for all requests
	apiRouter.use(function(req, res, next) {
		console.log("Somebody just came in!");
		
		// More stuff for authenticating users
		
		// check header or url params or post params for token
		var token = req.body.token || req.query.token ||req.headers['x-access-token'];
		
		// decode token
		if (token) {
			jwt.verify(token, superSecret, function(err, decoded) {
				if (err) {
					return res.status(403).send({
						success: false,
						message: 'Failed to authenticate token'
					});
				} 
				else {
					// if everything is good save to request later for use in other routes
					req.decoded = decoded;
					
					next();	
				}
			});
		}
		else {
			// if no token return HTTP 403  access forbidden
			return res.status(403).send({
				success: false,
				message: 'No token provided'
			});
		}
	});
	
	// test route for API
	// accessed at GET http://localhost:8080/api
	apiRouter.get('/', function(req, res) {
		res.json({ message: 'Welcome to the Anti-Social Network API!' });
	});
	
	// USER API ROUTES
	// ========================================================================
	
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
		})
		
		// Get all users (GET http://localhost/api/users)
		.get(function(req, res) {
			User.find(function(err, users) {
				if (err) res.send(err);
				
				// return the users
				res.json(users);
			})
		});
	
	// Routes that end in /users/:username
	// -----------------------------------------
	apiRouter.route('/users/:username')
	
		// Get user with that username (GET http://localhost/api/users/:username)
		.get(function(req, res) {
			
			User.findOne({ username: req.params.username }, function(err, user) {
				if (err) res.send(err);
				
				if (user === null) 
					res.json({ success: false, message: 'No such user exists' });
				else
				// return the user
					res.json(user);
			});
		})
		
		// Update user info (PUT http://localhost/api/users/:username)
		.put(function(req, res) {
			User.findOne({ username: req.params.username }, function(err, user) {
				if (err) res.send(err);
				
				// update users only if info is new
				if (req.body.name) user.name = req.body.name;
				if (req.body.username) user.username = req.body.username;
				if (req.body.password) user.password = req.body.password;
				
				// save the user
				user.save(function(err) {
					if (err) {
						// duplicate entry
						if (err.code == 11000)
							return res.json({ success: false, message: 'A user with that username already exists.' });
						else
							return res.send(err);
					}
					
					// return message
					res.json({ message: 'User updated!' });
				});
			});
		})
	
		// Delete a user (DELETE http://localhost/api/users/:username)
		.delete(function(req, res) {
			User.remove({ username: req.params.username }, function(err, user) {
				if (err) return res.send(err);
				
				res.json({ message: 'Successfully deleted' });
			});
		});
	
	// api endpoint to get user information
	apiRouter.get('/me', function(req, res) {
		res.send(req.decoded);
	});
	
	// POST API ROUTES
	// ========================================================================
	
	
	return apiRouter;
};