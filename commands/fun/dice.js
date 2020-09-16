exports.run = async(client, message, args) => {

    var diceSides = [
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"
    ]

    const randomSide = diceSides[Math.floor(Math.random() * diceSides.length)];

    return message.channel.send(`The dice landed on **${randomSide}**`)

}


exports.conf = {
    description: "See what the dice lands on",
    args: false,
}
exports.help = {
    name: "dice",
    category: "Fun"
}