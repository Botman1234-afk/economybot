/* eslint-disable no-unused-vars */
module.exports = {
	name: 'setcountingtype',
	description: 'Count in a different way!',
	execute(msg, args) {
		const client = msg.client;
		const mysql = require('mysql');
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'latehome4',
			database:'discord',
			charset : 'utf8mb4',
		});
      if (msg.member.permissions.has('ADMINISTRATOR')) {
					if (msg.content.endsWith('chain')) {
						connection.query('update settings set countingtype=? where servername = ?', ['chain', msg.guild.name], function (error, results, fields) {
							msg.reply('Successfully set CountingType to chain!');
						});
					}
					else if (msg.content.endsWith('traditional')) {
						connection.query('update settings set countingtype=? where servername = ?', ['traditional', msg.guild.name], function (error, results, fields) {
							msg.reply('Successfully set CountingType to traditional!');
						});
					}
					else {
						msg.reply('Check your syntax!');
					}
				}
				else {
					msg.reply('You don\'t have sufficient permissions!');
				}
	},
};