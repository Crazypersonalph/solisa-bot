const { SlashCommandBuilder } = require('discord.js');
const moment = require('moment');
moment().format();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Info about a user')
		.addUserOption(option =>
			option.setName('target')
				.setDescription('User to have information gathered')
				.setRequired(true)),
	async execute(interaction) {
		const user = interaction.options.getUser('target');
		const member = interaction.guild.members.cache.get(user.id);
		const memberRoles = member.roles.cache
			.filter ((roles) => roles.id !== interaction.guild.id)
			.map((role) => role.toString());
		await interaction.reply(`Tag: ${user.tag}\nId: ${user.id}\nAccount Creation Date: ${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY')}\nRole(s): ${memberRoles}`);
	},
};