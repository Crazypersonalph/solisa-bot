const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, getVoiceConnection } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
let { isPaused } = require('./pause');
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
		if (isPaused) {
			isPaused = !isPaused;
			const user = interaction.user.id;
			const member = interaction.guild.members.cache.get(user);
			const connection = getVoiceConnection(member.voice.channel.guildId);
			connection.state.subscription.player.play();
		}
		else {
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
		}
	},
};