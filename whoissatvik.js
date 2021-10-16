/* eslint-disable no-unused-vars */
module.exports = {
	name: 'whoissatvik',
	description: 'Find out who Satvik is!',
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
		})				
				msg.reply('Satvik dumb kid');

	},
};