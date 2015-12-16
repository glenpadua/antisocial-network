angular.module('app.routes', ['ngRoute'])

	.config(function($routeProvider, $locationProvider) {
			
		$routeProvider
		
		// home page route
		.when('/', {
			templateUrl: 'app/views/pages/home.html'
		})
		
		// login route
		.when('/login', {
			templateUrl: 'app/views/pages/login.html',
			controller: 'mainController',
			controllerAs: 'login'
		});
	
		// get rid of the hash in the URL
		$locationProvider.html5Mode(true);
	});