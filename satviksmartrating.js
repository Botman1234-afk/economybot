/* eslint-disable no-unused-vars */
module.exports = {
	name: 'satviksmartrating',
	description: 'check how smart satvik is!',
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
				var x = grade - 10;

				const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.addFields(
								{ name: '<:satvik:829391256554962965> Satvik Smartness Rating', value: '**SATVIK IS **'  + x + '% smart!', inline: true },
								


							);
						msg.channel.send(settingsembed);

					
				
				}


			

		


};
