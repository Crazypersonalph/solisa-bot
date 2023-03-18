const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, demuxProbe } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const { createReadStream } = require('node:fs');

async function probeAndCreateResource(readableStream) {
	const { stream, type } = await demuxProbe(readableStream);
	return createAudioResource(stream, { inputType: type });
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play music')
		.addStringOption(option =>
			option.setName('url')
				.setDescription('The song you want to play')
				.setRequired(true)),
	async execute(interaction) {
		await interaction.deferReply();
		const url = interaction.options.getString('url');
		const song_info = await ytdl.getInfo(url);
		await interaction.editReply(`Now Playing: ${song_info.videoDetails.title}`);
		const stream = await ytdl(url, { filter: 'audioonly' });
		const user = interaction.user.id;
		const member = interaction.guild.members.cache.get(user);
		const connection = joinVoiceChannel({
			channelId: member.voice.channel.id,
			guildId: member.voice.channel.guildId,
			adapterCreator: member.voice.guild.voiceAdapterCreator,
		});
		const player = createAudioPlayer();
		const resource = await probeAndCreateResource(createReadStream(stream));
		connection.subscribe(player);
		player.play(resource);
	},
};