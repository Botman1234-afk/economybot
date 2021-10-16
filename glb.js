/* eslint-disable no-unused-vars */
module.exports = {
	name: 'glb',
	description: 'Check the economy\'s global leaderboard!',
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
		embed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Global Leaderboard');
					var place = 0;
					
								embed.addFields(
									{ name: 'Online Site', value: 'http://softwaresat.onthewifi.com/glb', inline: false },


								);
							
						
							
						
					msg.channel.send(embed);

	},
};