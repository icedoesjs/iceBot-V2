const mongoose = require('mongoose');
const defaultPrefix = require(`../../config/config.js`).prefix;

const guildSchema = new mongoose.Schema({
    _id: String,
    prefix: { type: String, default: defaultPrefix },
    voiceLogs: { type: String, default: "none" },
    modLogs: { type: String, default: "none" },
    DJRole: {
        type: String,
        default: "none"
    },
    reactionRoles: {
        active: { type: Boolean, default: false },
        ids: { type: Array, default: "none" },
        emojis: { type: Array, default: "none" },
        names: { type: Array, default: "none" },
        channel: { type: String, default: "none" }
    },
    linkBlocker: { type: String, default: "none" },
    chatFilter: {
        active: { type: Boolean, default: false },
        words: { type: Array, default: "none" }
    }
});

module.exports = mongoose.model('Guilds', guildSchema);