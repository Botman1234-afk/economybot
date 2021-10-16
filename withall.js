/* eslint-disable no-unused-vars */
module.exports = {
	name: 'withall',
	description: 'Withdraw all your coins!',
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
            	connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {
					connection.query('update profiles set coins = ? where name = ?', [results[0].coins + results[0].deposit, msg.member.user.username], function (error, results, fields) {
					});
					connection.query('update profiles set deposit = ? where name = ?', [0, msg.member.user.username], function (error, results, fields) {
					});
					connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

						connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - results[0].deposit, 'bank'], function (error, results, fields) {
						});
					});
				})
				connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {

					const settingsembed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Withdrew All')
					.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')			
						settingsembed.addFields(
							{ name: '<:softwaresat:786624255861325845> Balance', value: (results[0].coins+results[0].deposit).toString(), inline: false },
							
	
	
						);	
						msg.channel.send(settingsembed)			
	
					
					})		
	},
};