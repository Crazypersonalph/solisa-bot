const { SlashCommandBuilder } = require('discord.js');
const { moment } = require('moment');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Info about a user'),
	async execute(interaction) {
		const memberRoles = interaction.member.roles.cache
			.filter ((roles) => roles.id !== interaction.guild.id)
			.map((role) => role.toString());
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}\nAccount Creation Date: ${moment.utc(interaction.user.createdAt).format('dddd, MMMM Do YYYY')}\nYour role(s): ${memberRoles}`);
	},
};