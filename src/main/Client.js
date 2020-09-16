if (Number(process.version.slice(1).split(".")[0]) < 10) throw new Error(`This bot is only supported on Node.js V10 or higher.\nProcess Stopped`);
const { Client, Collection, MessageEmbed } = require('discord.js');
const path = require('path');
const { readdirSync } = require('fs');
const Youtube = require(`simple-youtube-api`);
const ameClient = require(`amethyste-api`);

class IceMod extends Client {
    constructor(options) {
        super(options);
        this.Matienece = false;
        this.queue = new Map();
        this.config = require(`../../config/config.js`);
        this.commands = new Collection();
        this.aliases = new Collection();
        this.logger = require('../modules/Logger.js');
        this.handleError = require(`../modules/passError`);
        this.imageApi = new ameClient(this.config.apiKeys[2]);
        this.wait = require('util').promisify(setTimeout);
        this.player = new Youtube(this.config.apiKeys[0], this.config.apiKeys[1])
        this.waitReply = async(message, text, limit = 60000) => {
            const filter = m => m.author.id === message.author.id;
            await message.channel.send(text);
            try {
                const collected = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
                return collected.first().content;
            } catch (e) {
                return undefined;
            }
        }
        this.noPerms = async(message, permission) => {
            let embed = new MessageEmbed()
                .setAuthor(`Missing required permission`)
                .setColor(`RED`)
                .setDescription("``" + permission + "``" + "is required to run this")
                .setFooter(`IceMod, Made by IceyyM8`)
            message.channel.send(embed).then(i => i.delete({ timeout: 10000 }))
        }
    }


    loadCommand(commandPath, commandName) {
        try {
            const props = new(require(`${commandPath}${path.sep}${commandName}`))(this);
            this.logger.log(`Loading command: ${props.help.name}`), "log";
            props.conf.location = commandPath;
            if (props.init) {
                props.init(this);
            }
            this.commands.set(props.help.name, props);
            props.conf.aliases.forEach(f => {
                this.aliases.set(a, props.help.name);
            })
            return undefined
        } catch (e) {
            return `Command Failed to load [${commandName}] (${e})`
        }
    }
}


const client = new IceMod({
    fetchAllMembers: true
})

const init = async() => {
    readdirSync(path.join(__dirname, `../`, `../`, 'commands')).forEach(dir => {
        const commands = readdirSync(path.join(__dirname, `../`, '../', `commands/`, `${dir}`)).filter(f => f.endsWith('.js'));

        for (let file of commands) {
            let pull = require(`../../commands/${dir}/${file}`);

            if (pull.help.name) {
                client.commands.set(pull.help.name, pull)
                console.log(`Loaded ${pull.help.name}`)
            } else {
                console.log(`Failed to load a command.`)
                continue;
            }
        }
    });

    const events = await readdirSync(path.join(__dirname, `../`, `../`, 'events'))
    console.log(`Loading ${events.length} event files.`)
    events.forEach(e => {
        const name = e.split('.')[0];
        console.log(`Loading ${name}`)
        const event = require(`../../events/${e}`)
        client.on(name, event.bind(null, client));
        delete require.cache[require.resolve(`../../events/${e}`)]
    })
    if (events.length === 0) console.warn(`No event files found to load.`)

    client.login(client.config.token).catch(e => console.log(`Failed to login [${e}]`))

}

client.on('disconnect', () => client.logger.warn(`Connection the Discord API lost, attempting to reconnect.`)).on('reconnecting', () => client.logger.log(`Attempting API reconnection.`))
client.on(`error`, e => client.logger.log(e)).on(`warn`, w => client.logger.warn(w))

exports.init = init;
