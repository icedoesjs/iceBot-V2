const { MessageEmbed, ReactionManager } = require("discord.js")
const Guild = require('../../src/models/guild')
const { link } = require("fs")
exports.run = async(client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) client.noPerms(message, "ADMINISTRATOR")
    const sEmbed = new MessageEmbed()
    sEmbed.setAuthor(`Settings Prompt`)
    sEmbed.setColor(client.config.colors[1])
    sEmbed.setDescription(`React with 📚 to view settings\nReact with ⚙️ to change settings.`)
    sEmbed.setFooter(client.config.footers.write)
    message.channel.send(sEmbed).then(async(e) => {
        await e.react("📚")
        await e.react("⚙️")
        const view = (reaction, user) => reaction.emoji.name === "📚" && user.id === message.author.id;
        const change = (reaction, user) => reaction.emoji.name === "⚙️" && user.id === message.author.id;
        const viewer = e.createReactionCollector(view, { time: 60000 });
        const changer = e.createReactionCollector(change, { time: 60000 });

        viewer.on(`collect`, r => {
            viewSettings(message, e)
            viewer.stop()
        });
        changer.on(`collect`, r => {
            editSettings(message, e)
            changer.stop()
        });
    })


    async function viewSettings(message, e) {
        sEmbed.setAuthor(`Current Settings`)
        sEmbed.setColor(client.config.colors[1])
        let settings = `**Your Current Settings**\n\n`;
        Guild.findById(message.guild.id, function(err, d) {
            if (err) {
                sEmbed.setDescription(`**An unkown database error occured, this was reported to our developers.**`)
                e.edit(sEmbed)
                client.handleError(`settings.js`, err)
            }
            let voiceLogs = d.voiceLogs
            let vL = message.guild.channels.cache.get(voiceLogs)
            if (!vL) vL = `No voice logs set`
            let modLogs = d.modLogs
            let mL = message.guild.channels.cache.get(modLogs)
            if (!mL) mL = `No mod logs set`;
            let djId = d.DJRole;
            let dR = message.guild.roles.cache.get(djId)
            if (!dR) dR = `No DJ Role set`;
            let prefix = d.prefix;
            let linkBlocker = d.linkBlocker;
            if (linkBlocker == "1") linkBlocker = "Discord Links";
            if (linkBlocker == "2") linkBlocker = "IP Logger Links";
            if (linkBlocker == "3") linkBlocker = "Discord Links/IP Logger Links";
            if (linkBlocker == "4") linkBlocker = "All links";
            if (linkBlocker == "none") linkBlocker = "No links are blocked"

            settings += `**Prefix** - ${prefix}\n**Voice Logs** - ${vL}\n**Mod Logs** - ${mL}\n**DJ Role** - ${dR}\n**Blocked Links** - ${linkBlocker}`
            sEmbed.setDescription(settings)
            e.edit(sEmbed)
        })
    }
    async function editSettings(message, e) {
        await e.delete()
        let embed = new MessageEmbed()
        embed.setAuthor(`React with the specified emoji to change settings.`)
        embed.setColor(client.config.colors[1])
        embed.setFooter(client.config.footers.credit)
        embed.setDescription(`🤖 - **Prefix**\n🎤 - **Voice Logs**\n🔨 - **Mod Logs**\n🎶 - **DJ Role**\n📎 - **Link Blocker**`)
        message.channel.send(embed).then(async(e) => {
            await e.react(`🤖`)
            await e.react(`🎤`)
            await e.react(`🔨`)
            await e.react(`🎶`)
            await e.react(`📎`)
            const voiceLogs = (reaction, user) => reaction.emoji.name === "🎤" && user.id === message.author.id;
            const modLogs = (reaction, user) => reaction.emoji.name === "🔨" && user.id === message.author.id;
            const djRole = (reaction, user) => reaction.emoji.name === "🎶" && user.id === message.author.id;
            const preWait = (reaction, user) => reaction.emoji.name === "🤖" && user.id === message.author.id;
            const linkWait = (reaction, user) => reaction.emoji.name === "📎" && user.id === message.author.id;
            const vL = e.createReactionCollector(voiceLogs, { time: 60000 });
            const mL = e.createReactionCollector(modLogs, { time: 60000 });
            const djR = e.createReactionCollector(djRole, { time: 60000 });
            const pre = e.createReactionCollector(preWait, { time: 60000 });
            const links = e.createReactionCollector(linkWait, { time: 60000 });

            vL.on('collect', r => {
                client.waitReply(message, `You are changing **Voice Logs**\n**Supply the new ID of the Voice Logs channel.**`).then(res => {
                    let channel = message.guild.channels.cache.get(res)
                    if (!channel) return message.channel.send(`I could not find that channel, prompt cancelled.`)
                    Guild.findByIdAndUpdate(message.guild.id, {
                        voiceLogs: channel.id
                    }, function(err) {
                        if (err) {
                            message.channel.send(`I failed to save that, this has been reported to our developers`)
                            new client.handleError(`settings.js`, err.stack)
                        } else {
                            return message.channel.send(`The voice logs channel was updated to ${channel}`)
                        }
                    })
                })

            });
            mL.on('collect', r => {
                client.waitReply(message, `You are changing **Mod Logs**\n**Supply the new ID of the Mod Logs channel.**`).then(res => {
                    let channel = message.guild.channels.cache.get(res)
                    if (!channel) return message.channel.send(`I could not find that channel, prompt cancelled.`)
                    Guild.findByIdAndUpdate(message.guild.id, {
                        modLogs: channel.id
                    }, function(err) {
                        if (err) {
                            message.channel.send(`I failed to save that, this has been reported to our developers`)
                            new client.handleError(`settings.js`, err.stack)
                        } else {
                            return message.channel.send(`The mod logs channel was updated to ${channel}`)
                        }
                    })
                })
            });
            djR.on('collect', r => {
                client.waitReply(message, `You are changing **Dj Role**\n**Supply the new ID of the DJ Role.**`).then(res => {
                    let role = message.guild.roles.cache.get(res)
                    if (!role) return message.channel.send(`I could not find that role, prompt cancelled.`)
                    Guild.findByIdAndUpdate(message.guild.id, {
                        DJRole: role.id
                    }, function(err) {
                        if (err) {
                            message.channel.send(`I failed to save that, this has been reported to our developers`)
                            new client.handleError(`settings.js`, err.stack)
                        } else {
                            return message.channel.send(`The DJ Role channel was updated to ${role}`)
                        }
                    })
                })
            });
            pre.on(`collect`, r => {
                client.waitReply(message, `You are changing **Prefix**\n**Type the new prefix.**`).then(res => {
                    Guild.findByIdAndUpdate(message.guild.id, {
                        prefix: res
                    }, function(err) {
                        if (err) {
                            message.channel.send(`I failed to save that, this has been reported to our developers`)
                            new client.handleError(`settings.js`, err.stack)
                        } else {
                            return message.channel.send(`The prefix was updated to: **${res}**`)
                        }
                    })
                })
            })
            links.on('collect', r => {
                client.waitReply(message, `You are changing **Link Blocker**\n**Type 1 to block discord links, 2 to block IP logger links, 3 to block both or 4 to block all links**, Type none to allow all links.`).then(res => {
                    Guild.findByIdAndUpdate(message.guild.id, {
                        linkBlocker: res
                    }, function(err) {
                        if (err) {
                            message.channel.send(`I failed to save that, this has been reported to our developers`)
                            new client.handleError(`settings.js`, err.stack)
                        } else {
                            if (res == "1") return message.channel.send(`The link blocker will now block all **discord links**`);
                            if (res == "2") return message.channel.send(`The link blocker will now block all **IP logger links**`);
                            if (res == "3") return message.channel.send(`The link blocker will now block **Discord and IP Logger Links**`);
                            if (res == "4") return message.channel.send(`The link blocker will now block **all links**.`);
                            if (res == "none") return message.channel.send(`The link blocker was disabled, no links are being blocked.`);
                        }
                    })
                })
            })

        });
    }
}


exports.conf = {
    description: "Change some settings around.",
    args: false,
}
exports.help = {
    name: "settings",
    category: "Admin"
}
