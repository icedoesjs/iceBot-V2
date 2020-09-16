exports.run = async(client, message, args) => {
    var answer = [
        "Yes",
        "No",
        "Maybe",
        "Probably",
        "Probably not"
    ]

    const qA = answer[Math.floor(Math.random() * answer.length)];

    return message.channel.send(`The 8 ball says **${qA}**`)

}


exports.conf = {
    description: "Get a random answer from 8ball",
    args: true,
}
exports.help = {
    name: "8ball",
    category: "Fun"
}
