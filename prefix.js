/* eslint-disable no-unused-vars */
module.exports = {
	name: '.prefix',
	description: 'Gets the prefix',
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
		connection.query('select * from settings where servername = ?', [msg.guild.name], async (error, results, fields) => {

		msg.reply('Your Prefix is ' + `${results[0].prefix}`);
		})

	},
};