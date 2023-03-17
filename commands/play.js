const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
// const { client } = require('../index');
// const { createReadStream } = require('node:fs');

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
		await interaction.editReply(`Now playing: ${song_info.videoDetails.title}`);
		const user = interaction.user.id;
		const member = interaction.guild.members.cache.get(user);
		const stream = await ytdl(url, { filter: 'audioonly' });
		const connection = joinVoiceChannel({
			channelId: member.voice.channel.id,
			guildId: member.voice.channel.guildId,
			adapterCreator: member.voice.guild.voiceAdapterCreator,
		});
		const player = createAudioPlayer();
		const resource = createAudioResource(stream);
		connection.subscribe(player);
		player.play(resource);
	},
};