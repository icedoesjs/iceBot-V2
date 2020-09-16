const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: String,
    xp: Number,
    level: Number,
});

module.exports = mongoose.model('Users', userSchema);
