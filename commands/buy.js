const { SlashCommandBuilder } = require('discord.js');
const { addBalance, getBalance } = require('../index.js');
const { Users, CurrencyShop } = require('../dbObjects.js');
const { Op } = require('sequelize');

module.exports = {
	data:   new SlashCommandBuilder()
		.setName('buy')
		.setDescription('Buy something from the shop')
		.addStringOption(option =>
			option.setName('item')
				.setDescription('Item to be bought')
				.setRequired(true)),

	async execute(interaction) {
		const itemName = interaction.options.getString('item');
		const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: itemName } } });

		if (!item) return interaction.reply('That item doesn\'t exist.');
		if (item.cost > getBalance(interaction.user.id)) {
			return interaction.reply(`You currently have ${getBalance(interaction.user.id)}, but the ${item.name} costs ${item.cost}!`);
		}

		const user = await Users.findOne({ where: { user_id: interaction.user.id } });
		addBalance(interaction.user.id, -item.cost);
		await user.addItem(item);

		return interaction.reply(`You've bought: ${item.name}.`);
	},
};
