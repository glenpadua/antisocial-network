var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

// Post schema
var PostSchema = new Schema({
	author_id: String,
	author_name: String,
	description: String,
	date: { type: Date, default: Date.now },
	likes: { type: Number, default: 0 },
	like_ids: [String],
	comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});


PostSchema.methods.likePost = function(cb) {
	this.likes += 1;
	this.save(cb);
}

// return the model
module.exports = mongoose.model('Post', PostSchema);