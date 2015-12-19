angular.module('userCtrl', ['userService', 'postService', 'commentService'])

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
		
	})

	// Controller for profile needs
	.controller('profileController', function($routeParams, Post, Comment) {
		
		var vm = this;
		
	// use route params service to grab data from the url
		Post.getUserPosts($routeParams.username)
			.success(function(data) {
				vm.posts = data;
		});
	
		// function to show likes increasing without reload
		vm.incrementLikes = function(post) {
			post.likes += 1;
		};
		// function to like a post
		vm.likePost = function(id) {	
			
			Post.like(id)
				.success(function(data) {
					vm.message = data.message;
			});
		};
		
		// function to show comment likes increasing without reload
		vm.incrementCommentLikes = function(comment) {
			comment.likes += 1;
		};
	
		// function to like a comment
		vm.likeComment = function(post_id, comment_id) {
			Comment.like(post_id, comment_id)
				.success(function(data) {
					vm.message = data.message;	
				});
		};
	
		
	});