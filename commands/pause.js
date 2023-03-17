const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');
const { client } = require('../index');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stop music'),
	async execute(interaction) {
		const user = interaction.user.id;
		const member = interaction.guild.members.cache.get(user);
		const connection = getVoiceConnection(member.voice.channel.guildId);
		connection.state.subscription.player.pause();
		client.isPaused = true;
		interaction.reply('Paused the music');

	},
};