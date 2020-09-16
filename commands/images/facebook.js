const { MessageAttachment } = require("discord.js");

exports.run = async(client, message, args) => {
    client.imageApi.generate("facebook", { url: args[0], text: args.slice(1).join(" ") }).then(i => {
        const attach = new MessageAttachment(i, "fb.png");
        return message.channel.send(`Woah a new post!`, attach)
    }).catch(e => {
        new client.handleError("facebook", e.stack);
        return message.channel.send(`An unknown error occured, this was reported to our developers.`)
    })


}


exports.conf = {
    description: "Make a simple facebook post",
    args: true,
}
exports.help = {
    name: "facebook",
    category: "Images"
}