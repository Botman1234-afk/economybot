/* eslint-disable no-unused-vars */
module.exports = {
	name: 'grade',
	description: 'check your grade!',
	execute(msg, args) {
		const client = msg.client;
		const Discord = require('discord.js');
		const mysql = require('mysql');
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'latehome4',
			database: 'discord',
			charset: 'utf8mb4',
		});

                var user = msg.author;
				var member = msg.mentions.users.first();
				var grade = Math.floor((Math.random() * 100) + 1);
				var grade2 = Math.floor((Math.random() * 100) + 1);
				var random = Math.floor((Math.random() * 4));
				var x = grade + 10;

				const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.addFields(
								{ name: '🎓 Grade', value: `***${msg.member.user.username}*** got a ` + x + '%!', inline: true },
								


							);
						msg.channel.send(settingsembed);

					
				
				}


			

		


};
