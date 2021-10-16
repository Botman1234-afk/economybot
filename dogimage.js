/* eslint-disable no-unused-vars */
module.exports = {
	name: 'dogimage',
	description: 'Ping!',
	execute(msg, args) {
		const client = msg.client;
		const fetch = require('node-fetch');
		fetch('https://dog.ceo/api/breeds/image/random')
			.then((response) => {
				return response.json();
			})
			.then((myContent) => {
				msg.channel.send(myContent['message']);
			});


	},
};