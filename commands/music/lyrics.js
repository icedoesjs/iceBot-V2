const lyricsF = require(`lyrics-finder`);
const { MessageEmbed } = require("discord.js");
exports.run = async(client, message, args) => {
    const queue = client.queue.get(message.guild.id);
    if (!queue) return message.channel.send(`No song is playing for me to get lyrics for.`)

    let lyrics = null;

    try {
        lyrics = await lyricsF(queue.songs[0].title, "");
        if (!lyrics) lyrics = `I couldnt find lyrics for **${queue.songs[0].title}**`;
    } catch (e) {
        lyrics = `I couldnt find lyrics for **${queue.songs[0].title}**`;
    }

    let allLy = new MessageEmbed()
        .setAuthor(`${queue.songs[0].title}'s lycrics`)
        .setDescription(lyrics)
        .setColor(client.config.colors[0])
        .setFooter(client.config.footers.credit)

    if (allLy.description.length >= 2048) allLy.description = `${allLy.description.substr(0, 2045)}...`;
    return message.channel.send(allLy).catch(e => new client.handleError(`lyrics.js`, e.stack))

}


exports.conf = {
    description: "See the song's lyrics",
    args: false,
}
exports.help = {
    name: "lyrics",
    category: "Music"
}