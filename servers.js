/* eslint-disable no-unused-vars */
module.exports = {
	name: 'servers',
	description: 'Get the amount of servers the bot is in',
	async execute(msg, args) {
		const client = msg.client;
		const mysql = require('mysql');
        const Discord = require('discord.js')
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'latehome4',
			database:'discord',
			charset : 'utf8mb4',
		});
        msg.reply('I am currently serving ' + `${client.guilds.cache.size}` + ' servers!');

	},
};