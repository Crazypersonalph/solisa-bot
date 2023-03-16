const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play music')
		.addStringOption(option =>
			option.setName('url')
				.setDescription('The song you want to play')
				.setRequired(true)),
	async execute(interaction) {
		const user = interaction.user.id;
		const url = interaction.options.getString('url');
		const member = interaction.guild.members.cache.get(user);
		const player = createAudioPlayer();
		const connection = joinVoiceChannel({
			channelId: member.voice.channel.id,
			guildId: member.voice.channel.guildId,
			adapterCreator: member.voice.guild.voiceAdapterCreator,
		});
		const resource = createAudioResource('/home/alphons/solisa-bot/still alive.mp3');
		player.play(resource);
		connection.subscribe(player);
		player.stop();

		console.log(member.voice.channel);
	},
};