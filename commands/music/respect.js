const { MessageAttachment } = require("discord.js");

exports.run = async(client, message, args) => {
    client.imageApi.generate("missionpassed", { url: args[0] }).then(i => {
        const attach = new MessageAttachment(i, "mission-passed.png");
        return message.channel.send(`+ Respect`, attach)
    }).catch(e => {
        new client.handleError("respect", e.stack);
        return message.channel.send(`An unknown error occured, this was reported to our developers.`)
    })


}


exports.conf = {
    description: "Burn an image",
    args: true,
}
exports.help = {
    name: "respect",
    category: "Images"
}