// Service to handle API calls for User data

angular.module('userService', [])

	.factory('User', function($http) {
		
		// create a new object
		var userFactory = {};
	
		// Define functions for each user API endpoint
		
		// get a single user
		userFactory.get = function(username) {
			return $http.get('/api/users/' + username);
		};
	
		// get all users
		userFactory.all = function() {
			return $http.get('/api/users/');
		};
	
		// create/register a user
		userFactory.create = function(userData) {
			return $http.post('/api/users/', userData);
		};
	
		// update a user
		userFactory.update = function(username, userData) {
			return $http.put('/api/users/' + username, userData);
		};
	
		// delete a user
		userFactory.delete = function(username) {
			return $http.delete('/api/users/' + username);	
		};
	
		// return the user factory object
		return userFactory;
	
	});