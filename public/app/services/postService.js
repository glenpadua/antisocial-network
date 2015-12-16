// Service to handle data for User Post API calls

angular.module('postService', [])

	.factory('Post', function($http) {
		
		// create a new object
		var postFactory = {};
	
		// Define functions for each Post API endpoint
		
		// create a new post
		postFactory.create = function(postData) {
			return $http.post('/api/posts/', postData);
		};
	
		// get all posts from all users
		postFactory.all = function() {
			return $http.get('/api/posts/');
		};
	
		// get posts from particular user
		postFactory.getUserPosts = function(username) {
			return $http.get('/api/users/' + username + '/posts/');
		};
		
		// get individual post
		postFactory.getPost = function(post_id) {
			return $http.get('/api/posts/' + post_id);
		};
		
		// delete a post
		postFactory.delete = function(post_id) {
			return $http.delete('/api/posts/' + post_id);
		};
		
		// like a post
		postFactory.like = function(post_id) {
			return $http.put('/api/posts/' + post_id + '/like/');
		};
		
		// return the post factory object
		return postFactory;
		
	});