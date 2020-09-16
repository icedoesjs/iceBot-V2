const { MessageEmbed } = require("discord.js");
const { readFileSync } = require("fs");
const path = require(`path`);
const Guild = require(`../src/models/guild`);
const { initGuild } = require('../src/modules/guildControl');
module.exports = async(client, message) => {
    var prefix;
    Guild.findById(message.guild.id, async function(err, d) {
        if (d == undefined) {
            initGuild(message.guild.id);
            client.logger.log(`New guild: ${message.guild.name}`, "sucess")
        }
        if (err) prefix = client.config.prefix;
        else prefix = d.prefix;
        if (prefix == null || prefix == undefined || !prefix) prefix = client.config.prefix;
        if (message.author.bot) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        var command = args.shift().toLowerCase();

        if (message.guild && !message.guild.me.hasPermission("SEND_MESSAGES")) return;

        const atHelp = new RegExp(`^<@!?${client.user.id}>( |)$`);
        if (message.content.match(atHelp)) {
            const embed = new MessageEmbed()
                .setAuthor(`IceMod`)
                .setDescription("This section is yet to be done.")
                .setColor(client.config.colors[1])
                .setTimestamp()
            return message.channel.send(embed)
        }

        if (message.guild && !message.member) await message.guild.fetchMember(message.author);
        const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
        const allBans = readFileSync(path.join(__dirname, `../config/bans.json`), "utf-8")
        if (cmd && allBans.includes(message.author.id)) return message.reply(`Im sorry, it looks like you've been banned by the bot's developers, if you believe this is an error on our part contact our support at ${client.config.supportDiscord}.`);
        if (!cmd && client.Matienece == true) return;
        if (!cmd) return;
        if (cmd.conf.enabled == false) return;
        if (cmd && !message.guild && cmd.conf.guildOnly) return message.channel.send(`This command must be used in a **server**.`)
        if (cmd.conf.args == true && !args.length) return message.reply(`This command has arguements required, check out the help menu for how this is used.`);

        try {
            await cmd.run(client, message, args)
        } catch (e) {
            client.logger.log(`Failed to run ${command} for ${message.guild.id}\n${e}`)
            message.reply(`Oh no! That command failed to run, dont worry this was reported to our wizards and they are on it!`)
            new client.handleError(command, e.stack)
        }
    })
}