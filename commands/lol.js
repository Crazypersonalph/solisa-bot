const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lol')
		.setDescription('check'),
	async execute(interaction) {
		await interaction.reply('lmfao');
	},
};