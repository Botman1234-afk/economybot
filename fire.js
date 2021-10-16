/* eslint-disable no-unused-vars */
module.exports = {
	name: 'fire',
	description: 'Fire users!',
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
				var user = msg.mentions.users.first();
				connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results1, fields) {
					connection.query('select * from profiles where name = ?', [user.username], function (error, results6, fields) {

					if (results1[0].job == 'ceo' && results6[0].bussiness == results1[0].bussiness) {
					
							connection.query('update profiles set bussiness = ? where name = ?', ['none', user.username], function (error, results, fields) {
							});
							
							connection.query('update profiles set job = ? where name = ?', ['freelancer', user.username], function (error, results, fields) {
							});
							msg.channel.send('This user has been fired!');
						

					

					}
					else {
						msg.reply('You are not ceo of your company or this person isnt in your business!');
					}
				})
				});
	},
};