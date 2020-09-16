const { canModifyQueue } = require(`../../src/modules/djCheck`);
exports.run = async(client, message, args) => {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send(`There's nothing playing.`)
    if (!canModifyQueue(message.member)) return message.channel.send(`Only Djs can do this.`)

    let songs = queue.songs;
    for (let i = songs.length - 1; i > 1; i--) {
        let ran = 1 + Math.floor(Math.random() * 1);
        [songs[i], songs[ran]] = [songs[ran], songs[i]];
    }
    queue.songs = songs;
    message.client.queue.set(message.guild.id, queue);
    return message.channel.send(`The queue was shuffled!`)

}


exports.conf = {
    description: "Shuffle to a random song",
    args: false,
}
exports.help = {
    name: "shuffle",
    category: "Music"
}