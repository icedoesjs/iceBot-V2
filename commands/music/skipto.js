const { canModifyQueue } = require(`../../src/modules/djCheck`);
exports.run = async(client, message, args) => {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send(`There's nothing playing.`)
    if (!canModifyQueue(message.member)) return message.channel.send(`Only Djs can do this.`)

    if (!args.length || isNaN(args[0])) return message.channel.send(`Please supply a queue number for me to skip to.`)

    if (args[0] > queue.songs.length) return message.channel.send(`The queue is only **${queue.songs.length}** songs long.`);

    queue.playing = true;
    if (queue.loop) {
        for (let i = 0; i < args[0] - 2; i++) {
            queue.songs.push(queue.songs.shift());
        }
    } else {
        queue.songs = queue.songs.slice(args[0] - 2)
    }
    queue.connection.dispatcher.end()
    return message.channel.send(`Skipped **${args[0] - 1}** song(s) `)



}


exports.conf = {
    description: "Skip to a queue position",
    args: true,
}
exports.help = {
    name: "skip-to",
    category: "Music"
}