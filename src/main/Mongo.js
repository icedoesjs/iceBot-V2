const Config = require(`../../config/config`)
const mongoose = require('mongoose')
async function mongoConnection() {
    mongoose.connect(Config.dbUrl, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    }, err => {
        if (err) console.log(`Failed to connect to your MongoDatabase, possibly invalid url?`)
    })
};

exports.mongoConnection = mongoConnection;