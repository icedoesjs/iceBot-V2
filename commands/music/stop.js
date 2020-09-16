const { canModifyQueue } = require(`../../src/modules/djCheck`);
exports.run = async(client, message, args) => {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send(`There's nothing playing.`)
    if (!canModifyQueue(message.member)) return message.channel.send(`Only Djs can skip`)

    queue.songs = [];
    queue.connection.dispatcher.end();
    return message.channel.send(`The player was stopped and the queue was cleared.`);

}


exports.conf = {
    description: "Stop the music",
    args: false,
}
exports.help = {
    name: "stop",
    category: "Music"
}