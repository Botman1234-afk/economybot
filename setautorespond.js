/* eslint-disable no-unused-vars */
module.exports = {
	name: 'setautorespond',
	description: 'Turn on our chat bot features!',
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
        const member = msg.mentions.users.first();
		const Discord = require('discord.js')
      if (msg.member.permissions.has('ADMINISTRATOR')) {
					if (msg.content.endsWith('false')) {
						connection.query('update settings set autorespond=0 where servername = ?', [msg.guild.name], function (error, results, fields) {
							const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Auto Respond Disabled!')
							.addFields(
								{ name: 'New Auto Respond Status!', value:'Auto Respond has been successfully `turned off`', inline: true },
							);
					msg.channel.send(settingsembed);
						});
					}
					else if (msg.content.endsWith('true')) {
						connection.query('update settings set autorespond=1 where servername = ?', [msg.guild.name], function (error, results, fields) {
							const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Auto Respond Enabled!')
							.addFields(
								{ name: 'New Auto Respond Status!', value:'Auto Respond has been successfully `turned on`', inline: true },
							);
					msg.channel.send(settingsembed);
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