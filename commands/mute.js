const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { ms } = require('ms');

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
		.addStringOption(option =>
			option.setName('time')
				.setDescription('How long they will be muted for (eg, 1d, 1m, 1s, 1ms)')
				.setRequired(true)),

	async execute(interaction) {
		const user = interaction.options.getUser('user');
		let reason;
		const time = interaction.options.getString('time');

		const member = interaction.guild.members.cache.get(user.id);
		const timeinMs = ms(time);
		if (!timeinMs) return await interaction.followUp('Please specify a valid time');
		if (interaction.options.getString('reason') == '') {
			reason = 'No reason specified';

		}
		else {
			reason = interaction.options.getString('reason');
		}
		await member.timeout(timeinMs, reason);
		await interaction.reply(`Muted (timed-out) ${user} for ${reason} and ${time} long`);
	},
};