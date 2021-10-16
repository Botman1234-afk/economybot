/* eslint-disable no-unused-vars */
module.exports = {
	name: 'pay',
	description: 'Pay your loan!',
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
				if (parseInt(text) > 0) {
					connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {

						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - parseInt(text), msg.member.user.username], function (error, results, fields) {
						});

						connection.query('update profiles set paidback=? where name=?', [results[0].paidback + parseInt(text), msg.member.user.username], async function (error, results, fields) {


						});
					});
					connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {

						const settingsembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Loan Payment')
						.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
						.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')			
							settingsembed.addFields(
								{ name: '💰 Paid', value: text, inline: false },
								{ name: '📉 Outstanding Loan', value: parseInt((results[0].loan-results[0].paidback+(results[0].loan*0.05)-parseInt(text))).toString(), inline: false },

		
		
							);	
					
						msg.channel.send(settingsembed)					})
				}
				else {
					msg.reply('You cannot get money from your loan');
				}
	},
};