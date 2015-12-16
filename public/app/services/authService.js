angular.module('authService', [])

// ===================================================
// auth factory to login and get information
// inject $http for communicating with the API
// inject $q to return promise objects
// inject AuthToken to manage tokens
// ===================================================

	.factory('Auth', function($http, $q, AuthToken) {
		
		// create authFactory object
		var authFactory = {};
	
		// handle login
	
		// handle logout
	
		// check if user is logged in 
	
		// get user info
	
		// return auth factory object
		return authFactory;

	})

// ===================================================
// factory for handling tokens
// inject $window to store token client-side 
// Tokens are stored in browsers local storage
// ===================================================	

	.factory('AuthToken', function($window) {
		
		var authTokenFactory = {};
	
		// get the token
		authTokenFactory.getToken = function() {
			return $window.localStorage.getItem('token');
		};
	
		// set or clear the token
		// if token is passed set token
		// if no token, clear it from storage
		authTokenFactory.setToken = function(token) {
			if (token)
				$window.localStorage.setItem('token', token);
			else
				$window.localStorage.removeItem('token');
		};
	
		return authTokenFactory;
	
	})

// ===================================================
// application configuration to integrate token into requests
// ===================================================

	.factory('AuthInterceptor', function($q, AuthToken) {
		
		var interceptorFactory = {};
	
		// attach the token to every request
	
		// redirect if token doesn't authenticate
	
		return interceptorFactory;
	})