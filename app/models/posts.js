var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

// Post schema
var PostSchema = new Schema({
	author: String,
	description: String,
	date: { type: Date, default: Date.now },
	likes: {  type:Number, default: 0 },
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

// return the model
module.exports = mongoose.model('Post', PostSchema);