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
		const user = interaction.options.getUser('user');
		let url;
		let voiceChannel;
		let member;
		url = interaction.options.getString('url');
		console.log(interaction.guild.members.get(user));
		// test for CI/CD
	},
};