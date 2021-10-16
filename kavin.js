module.exports = {
	name: 'kavin',
	description: 'Find out who kavin is!',
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
           				msg.channel.send('**GIVE ARYAV CEO!!!**');

	},
};