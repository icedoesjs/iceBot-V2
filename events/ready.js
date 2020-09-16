module.exports = async client => {
    setTimeout(() => {

        client.logger.log(`Client online as ${client.user.tag}`, "ready");

        if (client.config.activity.type !== "WATCHING" || client.config.activity.type !== "PLAYING" || client.config.activity.type !== "LISTENING") client.config.activity.type == "WATCHING";

        if (client.Matienece == true) {
            client.user.setActivity("Bot under maintenance", {
                type: "WATCHING"
            })
        }

        if (client.config.activity.changingAct !== true) {
            client.user.setActivity(client.config.activity.text, {
                type: client.config.activity.type
            })
        } else if (client.config.activity.chaningAct == true) {
            let actTable = client.config.activity.array.replace(`{prefix}`, client.config.prefix).replace(`{members}`, client.users.length).replace(`{guilds}`, client.guild.length).replace(`{sServer}`, client.config.supportDiscord);

            let chosen = Math.floor(Math.random() * (actTable.length - 1) + 1);

            setInterval(() => {
                client.user.setActivity(actTable[chosen], {
                    type: client.config.activity.type
                }, 10000)
            })
        } else {
            client.user.setActivity(client.config.activity.text, {
                type: client.config.activity.type
            })
        }


    }, 2000)
}
