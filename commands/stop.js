const { SlashCommandBuilder } = require('discord.js');
const { player } = require('./play');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stop music'),
	async execute(interaction) {

		player.stop();
		interaction.reply('Stopped the music');

	},
};