const { MessageAttachment } = require("discord.js");

exports.run = async(client, message, args) => {
    client.imageApi.generate("circle", { url: args[0] }).then(i => {
        const attach = new MessageAttachment(i, "circle.png");
        return message.channel.send(`Here's your circle:`, attach)
    }).catch(e => {
        new client.handleError("circle", e.stack);
        return message.channel.send(`An unknown error occured, this was reported to our developers.`)
    })


}


exports.conf = {
    description: "Change your image to a circle",
    args: true,
}
exports.help = {
    name: "circle",
    category: "Images"
}