const { MessageAttachment } = require("discord.js");

exports.run = async(client, message, args) => {
    client.imageApi.generate("beautiful", { url: args[0] }).then(i => {
        const attach = new MessageAttachment(i, "what-a-beatuty.png");
        return message.channel.send(`Check this out:`, attach)
    }).catch(e => {
        new client.handleError("beauty", e.stack);
        return message.channel.send(`An unknown error occured, this was reported to our developers.`)
    })


}


exports.conf = {
    description: "Create a nice beautiful image",
    args: true,
}
exports.help = {
    name: "beauty",
    category: "Images"
}