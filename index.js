const { init } = require('./src/main/Client');
const { mongoConnection } = require('./src/main/Mongo');
const mongoose = require('mongoose');
const DB = mongoose.connection;
const Logger = require('./src/modules/Logger')
init();
mongoConnection();

DB.on(`error`, e => Logger.log(`Mongo error recieved: [${e}]`, "error"));
DB.once(`open`, () => Logger.log(`Connected to the MongoDB`, "ready"));
