exports.run = async(client, message, args) => {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send(`There's nothing playing.`)
    const song = queue.songs[0];
    var dur = song.duration
    if (song.duration > 0) dur = new Date(song.duration * 1000).toISOString().substr(11, 8)
    if (song.duration > -1) dur = new Date(song.duration * 1000).toISOString().substr(11, 8)

    return message.channel.send(`**${song.title}** is currently playing with **${dur}** left!`)

}


exports.conf = {
    description: "See whats playing",
    args: false,
}
exports.help = {
    name: "now-playing",
    category: "Music"
}