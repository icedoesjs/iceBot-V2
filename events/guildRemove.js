const { removeGuild } = require('../src/modules/guildControl');
module.exports = async(client, guild) => {
    removeGuild(guild.id)
    client.logger.log(`Lost guild: ${guild.name}`)

}