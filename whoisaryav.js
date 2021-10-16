/* eslint-disable no-unused-vars */
module.exports = {
	name: 'whoisaryav',
	description: 'Find out who aryav is!',
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
           				msg.reply('Aryav is a owner of Softwaresat Community and created a miniscule part of the bot!');

	},
};