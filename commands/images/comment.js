const { MessageAttachment } = require("discord.js");
const fetch = require(`node-fetch`);

exports.run = async(client, message, args) => {


    try {
        const res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=phcomment&username=${message.author.username}&image=${message.author.avatarURL({ format: "png", size: 512 })}&text=${args.join(' ')}`));
        const json = await res.json();
        const attach = new MessageAttachment(json.message, "comment.png");
        return message.channel.send(attach)
    } catch (e) {
        new client.handleError("beauty", e.stack);
        return message.channel.send(`An unknown error occured, this was reported to our developers.`)
    }




}


exports.conf = {
    description: "Make a ph comment",
    args: true,
}
exports.help = {
    name: "comment",
    category: "Images"
}