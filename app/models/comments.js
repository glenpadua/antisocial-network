var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

// Comment schema
var CommentSchema = new Schema({
	author_id: String,
	author_name: String,
	description: String,
	likes: { type: Number, default: 0 },
	date: { type: Date, default: Date.now },
	post: { type: Schema.Types.ObjectId, ref: 'Post' }
});

CommentSchema.methods.likeComment = function(cb) {
	this.likes += 1;
	this.save(cb);
}

// return the model
module.exports = mongoose.model('Comment', CommentSchema);