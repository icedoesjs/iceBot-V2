const mongoose = require('mongoose');
const Error = require(`../models/errors`);
const Logger = require('../modules/Logger')
const moment = require('moment');

class ErrorHandler {
    constructor(path, mssg) {
        const time = `[${moment().format("MM-DD-YYYY HH:mm")}]`;
        if (!path) path = `None specified/Check stack if supplied`;
        if (!mssg) return Logger.log(`No error message supplied, no errors posted.`, "error");

        try {
            Error.create({
                errTime: time,
                errPath: path,
                errMessage: mssg
            })
        } catch (e) {
            Logger.log(`Failed to save the error to the database, it was posted below\n${e}`, "error");
        }
        Logger.log(`An error was recieved, it was added to the database.`, "log")
    }
}

module.exports = ErrorHandler;