const { SlashCommandBuilder } = require('discord.js');
const { addBalance, getBalance } = require('../index.js');

module.exports = {
	data:   new SlashCommandBuilder()
		.setName('balance')
		.setDescription('Get the balance of a user')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('User to check balance')
				.setRequired(true)),

	async execute(interaction) {
		const target = interaction.options.getUser('user') ?? interaction.user;
		return interaction.reply(`${target.tag} has ${getBalance(target.id)}💰`);
	},
};
