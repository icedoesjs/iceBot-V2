const Guild = require(`../models/guild`);

async function canModifyQueue(member) {
    let channel = member.voice.channel;
    let botChannel = member.guild.me.voice.channel;
    await Guild.findById(member.guild.id, function(err, d) {
        if (err) return false;

        let djRole = member.guild.roles.cache.get(d.DJRole)
        if (!djRole) return false;
        if (!member.roles.cache.find(r => r.id === d.DJRole)) return false;
        if (!channel !== botChannel) return false;
        return true;
    })
}

exports.canModifyQueue = canModifyQueue
