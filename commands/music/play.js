const { play, spotifyPlayer } = require(`../../src/modules/music.js`);
const ytdl = require(`ytdl-core`);
const { MessageEmbed } = require('discord.js')
exports.run = async(client, message, args) => {
    const vc = message.member.voice.channel;
    const serverQueue = client.queue.get(message.guild.id);
    if (!vc) return message.channel.send(`Please join a voice channel to play music.`);
    if (serverQueue && vc !== message.guild.me.voice.channel) return message.channel.send(`You need to come back to the channel for me to continue`)

    const perms = vc.permissionsFor(message.client.user);
    if (!perms.has("CONNECT")) return message.channel.send(`I cannot connect to your voice channel.`);
    if (!perms.has("SPEAK")) return message.channel.send(`I cannot speak in your voice channel.`);
    if (!args.length) return message.channel.send(`Please provide something to play after the command.`)

    const search = args.join(' ');
    const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi;
    const scRegex = /^https?:\/\/(soundcloud\.com)\/(.*)$/;
    const url = args[0];
    const urlValid = videoPattern.test(args[0]);
    const spRegex = /^https?:\/\/(spotify\.com)\/(.*)$/;

    if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
        let PRUNING = true;
        let MAX_PLAYLIST_SIZE = 100;
        const serverQueue = message.client.queue.get(message.guild.id);
        const search = args.join(" ");
        const pattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
        const url = args[0];
        const urlValid = pattern.test(args[0]);

        const queueConstruct = {
            textChannel: message.channel,
            channel: vc,
            connection: null,
            songs: [],
            loop: false,
            volume: 25,
            playing: true,
            triviaLive: false
        };

        let song = null;
        let playlist = null;
        let videos = [];

        if (urlValid) {
            try {
                playlist = await client.player.getPlaylist(url, { part: "snippet" });
                videos = await playlist.getVideos(MAX_PLAYLIST_SIZE || 10, { part: "snippet" });
            } catch (error) {
                console.error(error);
                return message.reply("Playlist not found.").catch(console.error);
            }
        } else {
            try {
                const results = await client.player.searchPlaylists(search, 1, { part: "snippet" });
                playlist = results[0];
                videos = await playlist.getVideos(MAX_PLAYLIST_SIZE || 10, { part: "snippet" });
            } catch (error) {
                console.error(error);
                return message.reply("Playlist not found.").catch(console.error);
            }
        }

        videos.forEach((video) => {
            song = {
                title: video.title,
                url: video.url,
                duration: video.durationSeconds
            };

            if (serverQueue) {
                serverQueue.songs.push(song);
                if (!PRUNING)
                    message.channel
                    .send(`✅ **${song.title}** has been added to the queue by ${message.author}`)
                    .catch(console.error);
            } else {
                queueConstruct.songs.push(song);
            }
        });

        let playlistEmbed = new MessageEmbed()
            .setTitle(`${playlist.title}`)
            .setURL(playlist.url)
            .setColor(client.config.colors[0])
            .setTimestamp();

        if (!PRUNING) {
            playlistEmbed.setDescription(queueConstruct.songs.map((song, index) => `${index + 1}. ${song.title}`));
            if (playlistEmbed.description.length >= 2048)
                playlistEmbed.description =
                playlistEmbed.description.substr(0, 2007) + "\nPlaylist cut off by character limit!";
        }

        message.channel.send(`${message.author} Added ${videos.length} songs to queue.`, playlistEmbed);

        if (!serverQueue) {
            message.client.queue.set(message.guild.id, queueConstruct);
            try {
                queueConstruct.connection = await vc.join();
                await queueConstruct.connection.voice.setSelfDeaf(true);
                return play(queueConstruct.songs[0], message);
            } catch (error) {
                console.error(error);
                message.client.queue.delete(message.guild.id);
                await vc.leave();
                return message.channel.send(`Could not join the channel: ${error}`).catch(console.error);
            }
        }
    } else if (spRegex.test(url)) {
        return message.channel.send(`Spotify support coming soon...`)
    }

    const qConstruct = {
        textChannel: message.channel,
        channel: vc,
        connection: null,
        songs: [],
        loop: false,
        volume: 20,
        playing: true,
        triviaLive: false
    }

    let songInfo = null;
    let song = null;

    if (urlValid) {
        try {
            songInfo = await ytdl.getInfo(url);
            song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
                duration: songInfo.videoDetails.lengthSeconds,
                live: songInfo.videoDetails.isLiveContent
            }
        } catch (e) {
            new client.handlerError(`play.js`, e.stack)
            return message.channel.send(`Failed to add song.`)
        }
    } else if (scRegex.test(url)) {
        return message.channel.send(`Due to soundcloud developers no longer taking app requests, we have decided to not process soundcloud links.`)
    } else {
        try {
            const results = await client.player.searchVideos(search, 1);
            songInfo = await ytdl.getInfo(results[0].url);
            song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
                duration: songInfo.videoDetails.lengthSeconds,
                live: songInfo.videoDetails.isLiveContent
            };
        } catch (error) {
            console.error(error);
            return message.reply("No video was found with a matching title").catch(console.error);
        }
    }

    if (serverQueue) {
        serverQueue.songs.push(song);
        return serverQueue.textChannel.send(`**${song.title}** was added to the queue.`)
    }

    qConstruct.songs.push(song);
    client.queue.set(message.guild.id, qConstruct);

    try {
        qConstruct.connection = await vc.join();
        await qConstruct.connection.voice.setSelfDeaf(true);
        play(qConstruct.songs[0], message);
    } catch (e) {
        client.queue.delete(message.guild.id);
        await vc.leave();
        return message.channel.send(`Failed to join your voice channel.`)
    }
}



exports.conf = {
    description: "Play some cool tunes!",
    args: false,
}
exports.help = {
    name: "play",
    category: "Music"
}