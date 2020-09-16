const mongoose = require('mongoose');
const moment = require('moment');
const time = `[${moment().format("MM-DD-YYYY HH:mm")}]`;
const errorSchema = new mongoose.Schema({
    errTime: { type: String, default: time },
    errPath: { type: String, default: "Unkown" },
    errMessage: { type: String, default: "Unknown" }
});

module.exports = mongoose.model('Errors', errorSchema);