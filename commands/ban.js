const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Banish somebody to the underworld')
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)

		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user to be banned')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('The reason for muting')
				.setRequired(false)),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		let reason;
		if (interaction.options.getString('reason') == '') {
			reason = 'No reason specified';

		}
		else {
			reason = interaction.options.getString('reason');
		}
		await interaction.guild.members.ban(user);
		await interaction.reply(`Banned ${user} for ${reason}`);
	},
};