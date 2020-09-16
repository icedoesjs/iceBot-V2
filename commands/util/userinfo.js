const { MessageEmbed } = require("discord.js");

exports.run = async(client, message, args) => {

    let user = message.mentions.users.first() || message.author;



    let embed = new MessageEmbed()
        .setColor(`RANDOM`)
        .setTitle(`Information about **${user.tag}**`)
        .setDescription(`**Basic User Info**\n**Tag** - ${user.discriminator}\n**ID** - ${user.id}`)
        .setThumbnail(user.avatarURL())
        .addFields({ name: `Creation`, value: user.createdAt }, { name: `Presence`, value: user.presence.status.toLocaleUpperCase() })
        .setTimestamp()
        .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL())
    return message.channel.send(embed)

}


exports.conf = {
    description: "See information about you or another user.",
    args: false,
}
exports.help = {
    name: "userinfo",
    category: "Utility"
}
