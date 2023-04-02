const { Schema, model } = require("mongoose");
const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
}, {
    versionKey: false
});

const UserModel = model('users', userSchema);
module.exports = { UserModel };