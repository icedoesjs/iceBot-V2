const { MessageEmbed } = require("discord.js");

exports.run = async(client, message, args) => {

    var author = require(`../../package.json`).author;
    var vs = require(`../../package.json`).version;
    var desc = require(`../../package.json`).description;

    const waiter = await message.channel.send(`Ping checker, if you can see this the api ping is awful.`)

    let apiPing = Math.round(client.ws.ping);

    await waiter.delete()
    let embed = new MessageEmbed()
        .setAuthor(`Information about me`)
        .setColor(client.config.colors[0])
        .setDescription(desc)
        .addFields({ name: `Author`, value: author, inline: true }, { name: `Version`, value: vs, inline: true }, {
            name: `Ping`,
            value: `${apiPing}ms`,
            inline: true
        })

    .setTimestamp()
    return message.channel.send(embed)
}


exports.conf = {
    description: "See information about me",
    args: false,
}
exports.help = {
    name: "info",
    category: "help"
}
