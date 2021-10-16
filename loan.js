/* eslint-disable no-unused-vars */
module.exports = {
	name: 'loan',
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
					connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {
						if (parseInt(text)+results[0].loan<=20000000) {
							connection.query('update profiles set deposit = ? where name = ?', [results[0].deposit + parseInt(text), msg.member.user.username], function (error, results, fields) {
							});
							if(results[0].bankmemership !='00-00-0000'){
								connection.query('update profiles set loan=? where name=?', [results[0].loan + (parseInt(text)*0.95), msg.member.user.username], async function (error, results, fields) {
								})
							}
							else{
								connection.query('update profiles set loan=? where name=?', [results[0].loan + parseInt(text), msg.member.user.username], async function (error, results, fields) {
								});
							}


							const settingsembed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle('🏛 New Loan')
				.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
				.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')			
					settingsembed.addFields(
						{ name: 'New Loan', value: text, inline: false },
						{ name: 'Total Loan', value: (results[0].loan+parseInt(text)).toString(), inline: false },
						{ name: 'Daily Payment', value: ((results[0].loan+parseInt(text))*0.05).toString(), inline: false },



					);	
					msg.channel.send(settingsembed)		

						}
						else {
							msg.reply('You cannot have a total loan amount of greater than 20M');
						}
					})
	},
};