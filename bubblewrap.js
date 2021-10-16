/* eslint-disable no-unused-vars */
module.exports = {
	name: 'bubblewrap',
	description: 'Pop bubblewrap!',
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
		msg.channel.send("||pop||||pop||||pop||||pop||||pop||\n||pop||||pop||||pop||||pop||||pop||\n||pop||||pop||||pop||||pop||||pop||\n||pop||||pop||||pop||||pop||||pop||\n||pop||||pop||||pop||||pop||||pop||")
	},
};