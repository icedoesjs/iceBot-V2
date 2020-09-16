const { MessageEmbed } = require("discord.js");

exports.run = async(client, message, args) => {


    let rolesCount = message.guild.roles.cache.size;
    let channels = message.guild.channels.cache.size;
    let member = message.guild.memberCount;
    let ico = message.guild.iconURL();

    let embed = new MessageEmbed()
        .setColor(`RANDOM`)
        .setTitle(`Information about **${message.guild.name}**`)
        .setDescription(`**Basic Server Info**\n**Owner:** - ${message.guild.owner}\n**ID:** - ${message.guild.id}\n`)
        .setThumbnail(ico)
        .addFields({ name: 'Created At', value: message.guild.createdAt }, { name: 'Your join', value: message.member.joinedAt }, { name: `Roles`, value: rolesCount, inline: true }, { name: 'Channels', value: channels, inline: true }, { name: 'Members', value: member, inline: true })
        .setTimestamp()
        .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL())
    return message.channel.send(embed)

}


exports.conf = {
    description: "See information about your guild.",
    args: false,
}
exports.help = {
    name: "serverinfo",
    category: "Utility"
}