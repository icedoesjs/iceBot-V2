const { MessageEmbed } = require("discord.js");
const Guild = require(`../src/models/guild`);
module.exports = async(client, message) => {
    Guild.findById(message.guild.id, async function(err, d) {
        if (err) return;
        if (d.modLogs == null || !d.modLogs || d.modLogs == "none") return;

        if (message.cleanContent.length > 2048) {
            message.cleanContent = messageClean.content.slice(1024 + `...`)
        }

        if (message.author.bot) return;

        if (message.channel.type == "text") {
            let logs_chan = message.guild.channels.cache.get(d.modLogs)
            if (!logs_chan) return;
            let embed = new MessageEmbed()
                .setAuthor(`Mod Logs`)
                .setDescription(`**A message was deleted in ${message.channel} by ${message.author}**\n` + "``" + message.cleanContent + "``")
                .setFooter(client.config.footers.write)
                .setColor(client.config.colors[0])
            return logs_chan.send(embed).catch()
        }
    })
}