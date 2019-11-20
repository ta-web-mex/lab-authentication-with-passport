const { model, Schema } = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema(
	{
		email: String
	},
	{
		timestamps: true
	}
);

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = model('User', userSchema);
