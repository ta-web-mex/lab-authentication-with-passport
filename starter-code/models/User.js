const { model, Schema } = require('mongoose');
const PLM = require('passport-local-mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    }
}, {
    timestamps: true
});

userSchema.plugin(PLM, { usernameField: 'email' });

module.exports = model("User", userSchema);