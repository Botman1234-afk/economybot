/* eslint-disable no-unused-vars */
module.exports = {
	name: 'catimage',
	description: 'Ping!',
	async execute(msg, args) {
		const client = msg.client;
		const fetch = require('node-fetch');
		const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());

			msg.channel.send(file);


	},
};