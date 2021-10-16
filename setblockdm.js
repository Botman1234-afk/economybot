/* eslint-disable no-unused-vars */
module.exports = {
	name: 'setblockdm',
	description: 'Allow or block dms from the bot!',
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
        	if (msg.content.endsWith('false')) {
						connection.query('update profiles set dmblock=0 where name = ?', [msg.member.user.username], function (error, results, fields) {
							msg.reply('Successfully set dmblock to false');
						});
					}
					else if (msg.content.endsWith('true')) {
						connection.query('update profiles set dmblock=1 where name = ?', [msg.member.user.username], function (error, results, fields) {
							msg.reply('Successfully set dmblock to true');
						});
					}
					else {
						msg.reply('Check your syntax!');
					}

	},
};