// grab packages needed
var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		bcrypt = require('bcrypt-nodejs');

// user schema
var UserSchema = new Schema({
	name: String,
	username: { type: String, required: true, index: { unique: true }},
	password: { type: String, required: true, select: false },
	posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

// hash the password before the user is saved
UserSchema.pre('save', function(next) {
	var user = this;
	
	// hash password only if password is updated or user is new
	if (!user.isModified('password')) return next();
	
	// generate hash
	bcrypt.hash(user.password, null, null, function(err, hash) {
		if (err) return next(err);
		
		// Hash password
		user.password = hash;
		next();	
	});
});

// method to compare given password with database hash
UserSchema.methods.comparePassword = function(password) {
	var user = this;
	
	return bcrypt.compareSync(password, user.password);
};

// return the model
module.exports = mongoose.model('User', UserSchema);