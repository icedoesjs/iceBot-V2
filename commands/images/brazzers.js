const { MessageAttachment } = require("discord.js");

exports.run = async(client, message, args) => {
    client.imageApi.generate("brazzers", { url: args[0] }).then(i => {
        const attach = new MessageAttachment(i, "porn.png");
        return message.channel.send(`Did I hear Johnny Sins?`, attach)
    }).catch(e => {
        new client.handleError("brazzers", e.stack);
        return message.channel.send(`An unknown error occured, this was reported to our developers.`)
    })


}


exports.conf = {
    description: "Create a cool brazzers thumbnail",
    args: true,
}
exports.help = {
    name: "brazzers",
    category: "Images"
}