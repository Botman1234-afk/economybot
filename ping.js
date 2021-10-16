/* eslint-disable no-unused-vars */
module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(msg, args) {
		const client = msg.client;

		msg.reply(`Pong! Bot's Ping is ${client.ws.ping}ms`);

	},
};