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
		})
	
		// register user route
		.when('/register', {
			templateUrl: 'app/views/pages/register.html',
			controller: 'userController',
			controllerAs: 'user'
		})
		
		// timeline showing all posts
		.when('/timeline', {
			templateUrl: 'app/views/pages/timeline.html',
			controller: 'postController',
			controllerAs: 'post'
		});
	
		// get rid of the hash in the URL
		$locationProvider.html5Mode(true);
	});