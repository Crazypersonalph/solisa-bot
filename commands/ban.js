const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Banish somebody to the underworld')
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)

		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user to be banned')
				.setRequired(true)),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		await interaction.guild.members.ban(user);
		await interaction.reply(`Banned ${user}`);
	},
};