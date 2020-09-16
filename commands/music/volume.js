const { canModifyQueue } = require(`../../src/modules/djCheck`);
exports.run = async(client, message, args) => {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send(`There's nothing playing.`)
    if (!canModifyQueue(message.member)) return message.channel.send(`Only Djs can change volume`);
    if (isNaN(args[0])) return message.channel.send(`The arguement must be a number`)
    if (parseInt(args[0]) > 100 || parseInt(args[0]) < 0) return message.channel.send(`The number must be 0-100`)

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    return message.channel.send(`The volume was set to **${args[0]}**%`)

}


exports.conf = {
    description: "Set the music volume.",
    args: true,
}
exports.help = {
    name: "volume",
    category: "Music"
}
