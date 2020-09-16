const { MessageEmbed } = require("discord.js");

exports.run = async(client, message, args) => {

    let url = args[0]

}


exports.conf = {
    description: "See information about your guild.",
    args: false,
}
exports.help = {
    name: "serverinfo",
    category: "Utility"
}