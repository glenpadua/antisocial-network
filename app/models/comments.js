var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

// Comment schema
var CommentSchema = new Schema({
	author: String,
	description: String,
	likes: { type: Number, default: 0 },
	post: { type: Schema.Types.ObjectId, ref: 'Post' }
});

// return the model
module.exports = mongoose.model('Comment', CommentSchema);