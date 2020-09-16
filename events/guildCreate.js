const { initGuild } = require('../src/modules/guildControl');
module.exports = async(client, guild) => {
    initGuild(guild.id)
    client.logger.log(`New guild: ${guild.name}`, "sucess")

}