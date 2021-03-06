// Service to handle data for User Comment API calls

angular.module('commentService', [])

	.factory('Comment', function($http) {
	
		// create a new object
		var commentFactory = {};
		
		// Define a function for each comment API endpoint
		
		// Add a comment to a post
		commentFactory.add = function(post_id, commentData) {
			return $http.post('/api/posts/' + post_id + '/comments/', commentData);
		};
	
		// Like a comment
		commentFactory.like = function(post_id, comment_id) {
			return $http.put('/api/posts/' + post_id + '/comments/' + comment_id + '/like/');
		};
	
		// Get all comments of a post
		commentFactory.get = function(post_id) {
			return $http.get('/api/posts/' + post_id + '/comments/');
		};
	
		// return the factory object
		return commentFactory;
	});