const { SlashCommandBuilder } = require('discord.js');
const { addBalance, getBalance } = require('../index.js');

module.exports = {
	data:   new SlashCommandBuilder()
		.setName('transfer')
		.setDescription('Transfer your currency to another user')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('User to have money transferred')
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName('amount')
				.setDescription('Amount of money to be transferred')
				.setRequired(true)),

	async execute(interaction) {
		const currentAmount = getBalance(interaction.user.id);
		const transferAmount = interaction.options.getInteger('amount');
		const transferTarget = interaction.options.getUser('user');

		if (transferAmount > currentAmount) return interaction.reply(`Sorry ${interaction.user}, you only have ${currentAmount}.`);
		if (transferAmount <= 0) return interaction.reply(`Please enter an amount greater than zero, ${interaction.user}.`);

		addBalance(interaction.user.id, -transferAmount);
		addBalance(transferTarget.id, transferAmount);

		return interaction.reply(`Successfully transferred ${transferAmount}💰 to ${transferTarget.tag}. Your current balance is ${getBalance(interaction.user.id)}💰`);
	},
};
