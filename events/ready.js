const { Events } = require('discord.js');
const { Users } = require('../dbObjects.js');
const { currency } = require('../index.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		const storedBalances = Users.findAll();
		storedBalances.forEach(b => currency.set(b.user_id, b));
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
