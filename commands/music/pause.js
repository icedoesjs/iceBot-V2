const { canModifyQueue } = require(`../../src/modules/djCheck`);
exports.run = async(client, message, args) => {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send(`There's nothing playing.`)
    if (!canModifyQueue(message.member)) return message.channel.send(`Only Djs can skip!`)

    if (queue.playing) {
        queue.playing = false;
        message.channel.send(`**${queue.songs[0].title}** was paused.`)
        queue.connection.dispatcher.pause(true);
    } else if (!queue.playing) {
        queue.playing = true;
        message.channel.send(`**${queue.songs[0].title}** was resumed.`)
        queue.connection.dispatcher.resume()
    }

}


exports.conf = {
    description: "Pause the tunes",
    args: false,
}
exports.help = {
    name: "pause",
    category: "Music"
}