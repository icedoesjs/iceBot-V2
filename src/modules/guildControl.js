const mongoose = require('mongoose');
const Logger = require(`./Logger`);
const Guild = require('../models/guild');


async function initGuild(id) {
    await Guild.create({
        _id: id,
        voiceLogs: "none",
        modLogs: "none",
        DJRole: {
            active: false,
            _id: "none"
        },
        linkBlocker: 0,
        chatFilter: {
            active: false,
            words: "none"
        }
    }).then(() => {
        Logger.log(`A guild was added to the database.`)
    }).catch((e) => {
        Logger.log(`Failed to write a guild to the database\n${e}`, "error")
    })
}

async function removeGuild(id) {
    await Guild.findOneAndRemove({
        _id: id
    }).then(() => {
        Logger.log(`Guild removed from the database`)
    }).catch((e) => {
        Logger.log(`Failed to remove a guild from the database\n${e}`, "error")
    })
}


exports.initGuild = initGuild;
exports.removeGuild = removeGuild;