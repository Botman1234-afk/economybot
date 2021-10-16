/* eslint-disable no-unused-vars */
module.exports = {
	name: 'setrank',
	description: 'Turn on ranking!',
	execute(msg, args) {
		const client = msg.client;
		const mysql = require('mysql');
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'latehome4',
			database:'discord',
			charset : 'utf8mb4',
		});
		const Discord = require('discord.js')
        	if (msg.member.permissions.has('ADMINISTRATOR')) {
					if (msg.content.endsWith('false')) {
						connection.query('update settings set ranks=0 where servername = ?', [msg.guild.name], function (error, results, fields) {
							const settingsembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Rank Disabled!')
								.addFields(
									{ name: 'New Rank Status!', value:'Rank has been successfully `turned off`', inline: true },
								);
						msg.channel.send(settingsembed);
							// msg.reply('Successfully set rank to false');
						});
					}
					else if (msg.content.endsWith('true')) {
						connection.query('update settings set ranks=1 where servername = ?', [msg.guild.name], function (error, results, fields) {
							const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Rank Enabled!')
							.addFields(
								{ name: 'New Rank Status!', value:'Rank has been successfully `turned on`', inline: true },
							);
					msg.channel.send(settingsembed);
							// msg.reply('Successfully set rank to true');
						});
					}
					else {
						msg.reply(':warning: Check your syntax! :warning:');
					}
				}
				else {
					msg.reply(':warning: You don\'t have sufficient permissions! :warning:');
				}
	},
};