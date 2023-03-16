const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

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
		let url;
		let voiceChannel;
		let member;
		url = interaction.options.getString('url');
		member = interaction.guild.members.cache.get(user);
		console.log(member.voice.channel);
	},
};