const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mute')
		.setDescription('Mute a member')
		.setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user to be muted (timed out)')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('The reason for muting')
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName('time')
				.setDescription('How long they will be muted for (minutes)')
				.setRequired(true)),

	async execute(interaction) {
		const user = interaction.options.getUser('user');
		let reason;
		const time = interaction.options.getInteger('time');
		if (interaction.options.getString('reason') == '') {
			reason = 'No reason specified';

		}
		else {
			reason = interaction.options.getString('reason');
		}
		await interaction.guild.members.timeout(user, time * 60000);
		await interaction.reply(`Muted (timed-out) ${user} for ${reason}`);
	},
};