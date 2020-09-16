exports.run = async(client, message, args) => {

    var coinSide = ["Heads", "Tails"];

    const randomSide = coinSide[Math.floor(Math.random() * coinSide.length)];

    return message.channel.send(`The coin landed on **${randomSide}**`)

}


exports.conf = {
    description: "Flip a coin",
    args: false,
}
exports.help = {
    name: "coin",
    category: "Fun"
}