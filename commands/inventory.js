const { SlashCommandBuilder } = require('discord.js');
const { Users } = require('./dbObjects.js');

module.exports = {
	data:   new SlashCommandBuilder()
		.setName('inventory')
		.setDescription('Get the inventory of a user')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('User to check inventory')
				.setRequired(true)),

	async execute(interaction) {
		const target = interaction.options.getUser('user') ?? interaction.user;
		const user = await Users.findOne({ where: { user_id: target.id } });
		const items = await user.getItems();

		if (!items.length) return interaction.reply(`${target.tag} has nothing!`);

		return interaction.reply(`${target.tag} currently has ${items.map(i => `${i.amount} ${i.item.name}`).join(', ')}`);
	},
};
