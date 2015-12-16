angular.module('postCtrl', ['postService'])

	.controller('postController', function(Post, $route) {
	
		var vm = this;
	
		// grab all posts at page load
		Post.all()
			.success(function(data) {
				
			// bind all posts that come back to vm.posts 
			vm.posts = data;
		});
		
		// function to create post
		vm.createPost = function() {
			
			// clear the message
			vm.message = '';
			
			Post.create(vm.postData)
				.success(function(data) {
				
				// clear the form 
				vm.postData = {};
				vm.message = data.message;
				
				// reload page to update view
				$route.reload();
			});
		};
	
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
	});