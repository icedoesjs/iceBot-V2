const { splitMessage, MessageEmbed, escapeMarkdown } = require('discord.js')
exports.run = async(client, message, args) => {
        const queue = message.client.queue.get(message.guild.id);
        if (!queue) return message.channel.send(`There's nothing playing.`)
        var queueL = 0;

        const desc = queue.songs.map((song, index) => `${index + 1}.${escapeMarkdown(`${song.title}`)}`)

    let embed = new MessageEmbed()
        .setAuthor(`The current queue`)
        .setColor(client.config.colors[0])
        .setFooter(client.config.footers.credit)
        .setDescription(desc)

    const splitDesc = splitMessage(desc, {
        maxLength: 2048,
        char: "\n",
        prepend: "",
        append: ""
    });

    splitDesc.forEach(async(m) => {
        queueL++;
        embed.setAuthor(`The current queue [${queueL}]`)
        embed.setDescription(m)
        return message.channel.send(embed)
    })
}


exports.conf = {
    description: "See what's up next",
    args: false,
}
exports.help = {
    name: "queue",
    category: "Music"
}