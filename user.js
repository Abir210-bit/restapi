const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true }, // String is shorthand for {type: String}
    mail: { type: String, unique: true },

});

module.exports = mongoose.model('user', UserSchema);