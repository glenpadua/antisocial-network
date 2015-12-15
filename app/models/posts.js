var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

// Post schema
var PostSchema = new Schema({
	author_id: String,
	author_name: String,
	description: String,
	date: { type: Date, default: Date.now },
	likes: { type: Number, default: 0 },
	comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

// return the model
module.exports = mongoose.model('Post', PostSchema);