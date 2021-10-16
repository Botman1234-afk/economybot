/* eslint-disable no-unused-vars */
module.exports = {
	name: 'lb',
	description: 'Check the server ranking leaderboard!',
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
		
            connection.query('select * from ranks where server = ? order by level desc', [msg.guild.name], function (error, results, fields) {
            	            connection.query('select * from settings where servername = ?', [msg.guild.name], function (error, results1, fields) {

					if (results1[0].ranks == '0') {
						msg.reply('Enable ranks first');
					}
					else {
						let embed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Ranks for ' + `${results[0].server}`);
						var place = 0;
						results.forEach(result => {
							place++;
							if (place > 3 && place < 25) {
								embed.addFields(
									{ name: place + '. ' + result.name, value: 'Level: ' + result.level, inline: false },


								);
							}
							else if (place == 1) {
								embed.addFields(
									{ name: '🥇 ' + result.name, value: 'Level: ' + result.level, inline: false },


								);
							}
							else if (place == 2) {
								embed.addFields(
									{ name: '🥈 ' + result.name, value: 'Level: ' + result.level, inline: false },


								);
							}
							else if (place == 3) {
								embed.addFields(
									{ name: '🥉 ' + result.name, value: 'Level: ' + result.level, inline: false },


								);
							}
						
						});
					
						msg.channel.send(embed);
					}
            	            })
})
	},
};