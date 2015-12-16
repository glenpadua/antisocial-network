angular.module('mainCtrl', [])

	.controller('mainController', function($rootScope, $location, Auth) {
		
		var vm = this;
		
		// get info if person is logged in
		vm.loggedIn = Auth.isLoggedIn();
	
		// check to see if a user is logged on every request
		$rootScope.$on('$routeChangeStart', function() {
			vm.loggedIn = Auth.isLoggedIn();
			
			// get user information on route change
			Auth.getUser()
				.success(function(data) {
					vm.user = data;
				});
			
		});
	
		// function to handle login form
		vm.doLogin = function() {
			
			// clear the error
			vm.error = '';
				
			// call the Auth login() function
			Auth.login(vm.loginData.username, vm.loginData.password)
				.success(function(data) {
					
				// if a user successfully logs in redirect to timeline page
				if (data.success)
					$location.path('/timeline');
				else
					vm.error = data.message;
				
			});
		};
	
		// function to hangle logout
		vm.doLogout = function() {
			Auth.logout();
			
			// reset all user info
			vm.user = {};
			$location.path('/login');
		};
	});