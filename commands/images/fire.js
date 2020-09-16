const { MessageAttachment } = require("discord.js");

exports.run = async(client, message, args) => {
    client.imageApi.generate("fire", { url: args[0] }).then(i => {
        const attach = new MessageAttachment(i, "fire.png");
        return message.channel.send(`RIP to that image.`, attach)
    }).catch(e => {
        new client.handleError("fire", e.stack);
        return message.channel.send(`An unknown error occured, this was reported to our developers.`)
    })


}


exports.conf = {
    description: "Burn an image",
    args: true,
}
exports.help = {
    name: "fire",
    category: "Images"
}
