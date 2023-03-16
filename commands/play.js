const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const { StreamType } = require('@discordjs/voice');
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
		const user = interaction.user.id;
		const url = interaction.options.getString('url');
		const member = interaction.guild.members.cache.get(user);
		console.log(member.voice);
		console.log(member.voice.channel);
		const player = createAudioPlayer();
		const connection = joinVoiceChannel({
			channelId: member.voice.channel.id,
			guildId: member.voice.channel.guildId,
			adapterCreator: member.voice.guild.voiceAdapterCreator,
		});
		const resource = createAudioResource(ytdl(url, { filter: 'audioonly' }), { inputType: StreamType.Arbitrary });
		connection.subscribe(player);
		player.play(resource);
		player.stop();
	},
};