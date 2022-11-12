const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Info about a user'),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}\nYour roles: ${interaction.guild.member.roles(user)}`);
	},
};