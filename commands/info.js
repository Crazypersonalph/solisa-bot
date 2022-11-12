const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data:   new SlashCommandBuilder()
		.setName('info')
		.setDescription('Get info about the server'),

	async execute(interaction) {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	},
};
