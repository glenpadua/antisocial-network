angular.module('postCtrl', ['postService', 'commentService'])

	.controller('postController', function(Post, $route, Comment) {
	
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
		
	})

	.controller('singlePostController', function(Post, $routeParams, Comment, $route) {
		var vm = this;
		
		Post.getPost($routeParams.post_id)
			.success(function(data) {
				vm.postData = data;
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
	
		// function to get all post comments
		vm.getComments = function(post_id) {
			
			Comment.get(post_id)
				.success(function(data) {
					vm.comments = data;
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
	
		// function to add a comment
		vm.addComment = function(post_id) {
			
			vm.message = '';
			
			Comment.add(post_id, vm.commentData)
				.success(function(data) {
				
					// clear the form 
					vm.commentData = {};
					vm.message = data.message;
				
					// reload page to update view
					$route.reload();
			});
		};
		
	});