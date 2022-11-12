const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data:   new SlashCommandBuilder()
		.setName('info')
		.setDescription('Get info about a user')
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('Find out about them')
				.setRequired(true)),

	async execute(interaction) {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	},
};
