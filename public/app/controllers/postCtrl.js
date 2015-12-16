angular.module('postCtrl', ['postService'])

	.controller('postController', function(Post) {
	
		var vm = this;
	
		// grab all posts at page load
		Post.all()
			.success(function(data) {
				
			// bind all posts that come back to vm.posts 
			vm.posts = data;
		});
	});