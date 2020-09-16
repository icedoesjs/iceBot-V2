const { MessageEmbed } = require("discord.js");
const Guild = require(`../src/models/guild`);
module.exports = async(client, oldMessage, newMessage) => {
    Guild.findById(newMessage.guild.id, async function(err, d) {
        if (err) return;
        if (d.modLogs == null || !d.modLogs || d.modLogs == "none") return;

        if (newMessage.author.bot) return;
        if (newMessage.channel.type == 'text' && newMessage.cleanContent != oldMessage.cleanContent) {
            let logs_chan = newMessage.guild.channels.cache.get(d.modLogs)
            if (!logs_chan) return;
            let embed = new MessageEmbed()
                .setAuthor(`Mod Logs`)
                .setColor(client.config.colors[0])
                .setFooter(client.config.footers.write)
                .setDescription(`**A message was updated in ${newMessage.channel} by ${newMessage.author}**\n` + "``- " + oldMessage.cleanContent + "``" + "\n``+ " + newMessage.cleanContent + "``")
            return logs_chan.send(embed).catch()
        }
    })
}