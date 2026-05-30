const { joinVoiceChannel } = require('@discordjs/voice');

const OWNER_ID = 'YOUR_DISCORD_USER_ID';

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content === '!connect') {

        // Owner check
        if (message.author.id !== 1342981291288825888) {
            return message.reply('Only the bot owner can use this command.');
        }

        // Check if owner is in a voice channel
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            return message.reply('You must be in a voice channel.');
        }

        try {
            joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                selfDeaf: false,
            });

            message.reply(Connected to **${voiceChannel.name}**);
        } catch (error) {
            console.error(error);
            message.reply('Failed to connect to the voice channel.');
        }
    }
});
