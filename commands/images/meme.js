const { MessageEmbed } = require("discord.js");
const fetch = require(`node-fetch`);

exports.run = async(client, message, args) => {


    try {
        const res = await fetch(encodeURI(`https://www.reddit.com/r/deepfried/random/.json`));
        const json = await res.json();
        let author = json[0].data.children[0].data.author;
        let title = json[0].data.children[0].data.title;
        let uri = json[0].data.children[0].data.url;
        let desc = json[0].data.children[0].data.selftext;
        let embed = new MessageEmbed()
            .setTitle(`${author}: ${title}`)
            .setURL(uri)
            .setDescription(desc)
            .setImage(uri)
            .setColor(`RANDOM`)
        return message.channel.send(embed)
    } catch (e) {
        new client.handleError("meme", e.stack);
        return message.channel.send(`An unknown error occured, this was reported to our developers.`)
    }


}


exports.conf = {
    description: "Get a free meme",
    args: false,
}
exports.help = {
    name: "meme",
    category: "Images"
}