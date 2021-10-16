/* eslint-disable no-unused-vars */
module.exports = {
	name: 'emoji',
	description: 'See emojis from other servers including animated ones!',
	execute(msg, args) {
		const client = msg.client;
		const Discord = require('discord.js');
		const mysql = require('mysql');
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'latehome4',
			database:'discord',
			charset : 'utf8mb4',
		});
		var text = msg.content.split(' ').slice(1).join(' ');

				const ayy = client.emojis.cache.find(emoji => emoji.name === text);
   msg.channel.send(`${ayy}`);
	},
};