const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    fullname: { type: String, require: true},
    gmail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, require: true}

}, { timestamps: true });

module.exports = mongoose.model('user', UserSchema);
