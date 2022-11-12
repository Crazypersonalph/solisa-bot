const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Yeet them out of the server')
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)

		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user to be kicked')
				.setRequired(true)),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		await interaction.guild.members.kick(user);
		await interaction.reply(`Kicked ${user}`);
	},
};