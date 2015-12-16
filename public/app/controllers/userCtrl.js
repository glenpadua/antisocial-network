angular.module('userCtrl', ['userService'])

	.controller('userController', function(User) {
		var vm = this;
	
		// create a user
		vm.registerUser = function() {
			
			// clear the message
			vm.message = '';
			
			// use the create function in the userService
			User.create(vm.userData)
				.success(function(data) {
				
				// clear the form
				vm.userData = {};
				vm.message = data.message;
				
			});
		}
		
	});