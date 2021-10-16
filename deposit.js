/* eslint-disable no-unused-vars */
module.exports = {
	name: 'deposit',
	description: 'deposit your coins!',
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
		const text = msg.content.split(' ').slice(1).join(' ');
		connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {
			if (parseInt(text) <= results[0].coins) {
				connection.query('update profiles set coins = ? where name = ?', [results[0].coins - parseInt(text), msg.member.user.username], function (error, results, fields) {
				});
				connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

					connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + parseInt(text), 'bank'], function (error, results, fields) {
					});
				});
				connection.query('update profiles set deposit=? where name=?', [results[0].deposit + parseInt(text), msg.member.user.username], async function (error, results, fields) {


				});

				const settingsembed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Deposited Coins')
				.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
				.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')			
					settingsembed.addFields(
						{ name: '🏛 Deposit', value: (results[0].deposit+parseInt(text)).toString(), inline: false },
						{ name: '<:softwaresat:786624255861325845> Balance', value: (results[0].coins-parseInt(text)).toString(), inline: false },



					);	
					msg.channel.send(settingsembed)					}
			else {
				const errorembed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Error')
				.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					errorembed.addFields(
						{ name: '🏛', value: 'You don\'t have that many coins in your balance!', inline: false },
						


					);	
					msg.channel.send(errorembed)				
			}
		});
			
				

	},
};