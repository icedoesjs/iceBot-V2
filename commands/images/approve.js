const { MessageAttachment } = require("discord.js");

exports.run = async(client, message, args) => {
    client.imageApi.generate("approved", {
        "url": args[0]
    }).then(i => {
        if (!i) return message.channel.send(`An unknown error occured, this was reported to our developers.`)
        const attach = new MessageAttachment(i, "approved.png")
        return message.channel.send(`This image has been approved.`, attach)
    }).catch(e => {
        new client.handleError("approve.js", e.stack);
        return message.channel.send(`An unknown error occured, this was reported to our developers.`)
    })
}


exports.conf = {
    description: "Make a cool approved image",
    args: true,
}
exports.help = {
    name: "approve",
    category: "Images"
}