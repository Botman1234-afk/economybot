/* eslint-disable no-unused-vars */
module.exports = {
	name: 'purge job',
	description: 'Delete one of your jobs!',
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
		var text = msg.content.split(' ').slice(2).join(' ');
		console.log(text)
		connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {
			if (results[0].job == 'ceo') {
				connection.query('delete from jobs where name = ? and business = ?', [text, results[0].bussiness], function (error, results, fields) {
				});
				msg.reply('Deleted job!');

			}
			else {
				msg.reply('You are not ceo of your business!');
			}
		});
	},
};