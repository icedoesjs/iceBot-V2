const { canModifyQueue } = require(`../../src/modules/djCheck`);
exports.run = async(client, message, args) => {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send(`There's nothing playing.`)
    if (!canModifyQueue(message.member)) return message.channel.send(`Only Djs can do this.`)

    queue.playing = true;
    message.channel.send(`**${queue.songs[0].title}** was skipped.`)
    queue.connection.dispatcher.end()

}


exports.conf = {
    description: "Skip a bad song",
    args: false,
}
exports.help = {
    name: "skip",
    category: "Music"
}