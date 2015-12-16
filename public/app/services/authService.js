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
		authFactory.login = function(username, password) {
			
			// return the promise object and its data
			return $http.post('/api/authenticate', {
				username: username,
				password: password
			})
				// if success then set the token
				.success(function(data) {
					AuthToken.setToken(data.token);
					return data;
				});
		};
	
		// handle logout by clearing token
		authFactory.logout= function() {
			// clear token
			AuthToken.setToken();
		};
	
		// check if user is logged in 
		// checks if there is a local token
		authFactory.isLoggedIn = function() {
			if (AuthToken.getToken())
				return true;
			else
				return false;
		};
	
		// get user info of logged in user
		authFactory.getUser = function() {
			if (AuthToken.getToken())
				return $http.get('/api/me', { cache: true }); // saves login info to cache 
			else
				return $q.reject({ message: 'User has no token.' });
		};
	
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
// all HTTP requests should carry the token
// ===================================================

	.factory('AuthInterceptor', function($q, $location, AuthToken) {
		
		var interceptorFactory = {};
	
		// attach the token to every request
		interceptorFactory.request = function(config) {
			
			// grab the token
			var token = AuthToken.getToken();
			
			// if token exists, add it to header as x-access-token
			if (token)
				config.headers['x-access-token'] = token;
			
			return config;
		};
	
		// redirect if token doesn't authenticate
		// happens on response errors
		interceptorFactory.responseError = function(response) {
			
			// if server returns 403 forbidden response
			if (response.status == 403) {
				// clear token
				AuthToken.setToken();
				// redirect to login
				$location.path('/login');
			}
			
			// return the errors from the server as a promise
			return $q.reject(response);
		};
	
		return interceptorFactory;
	})