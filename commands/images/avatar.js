const { MessageAttachment } = require("discord.js");

exports.run = async(client, message, args) => {
    let person;

    let user = message.mentions.users.first() || message.author;


    const avatar = user.avatarURL({ size: 512, dynamic: true }).replace('.webp', ".png");

    const attach = new MessageAttachment(avatar, `avatar.${avatar.split(".").pop().split("?")[0]}`);
    if (user === message.author) person = 'Here\'s your avatar:'
    else person = `Here\'s ${user}'s avatar:`
    return message.channel.send(person, attach)
}


exports.conf = {
    description: "Get a user's avatar",
    args: false,
}
exports.help = {
    name: "avatar",
    category: "Images"
}