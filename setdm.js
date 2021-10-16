/* eslint-disable no-unused-vars */
module.exports = {
	name: 'setdm',
	description: 'Turn off dming or turn it on!',
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
						connection.query('update settings set dm=0 where servername = ?', [msg.guild.name], function (error, results, fields) {
							const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Direct Message Disabled!')
							.addFields(
								{ name: 'Direct Message Status!', value:'Rank has been successfully `turned off`', inline: true },
							);
					msg.channel.send(settingsembed);
							// msg.reply('Successfully set dm to false');
						});
					}
					else if (msg.content.endsWith('true')) {
						connection.query('update settings set dm=1 where servername = ?', [msg.guild.name], function (error, results, fields) {
							const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Direct Message Enabled!')
							.addFields(
								{ name: 'Direct Message Status!', value:'Rank has been successfully `turned on`', inline: true },
							);
					msg.channel.send(settingsembed);
							// msg.reply('Successfully set dm to true');
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