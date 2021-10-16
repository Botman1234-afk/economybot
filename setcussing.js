/* eslint-disable no-unused-vars */
module.exports = {
	name: 'setcussing',
	description: 'Turn censoring on or off!',
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
						connection.query('update settings set cussing=0 where servername = ?', [msg.guild.name], function (error, results, fields) {
							const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Cursing Prevention Disabled!')
							.addFields(
								{ name: 'Cursing Prevention Status!', value:'Cursing Prevention has been successfully `turned off`', inline: true },
							);
					msg.channel.send(settingsembed);
							// msg.reply('Successfully set cussing to false!');
						});
					}
					else if (msg.content.endsWith('true')) {
						connection.query('update settings set cussing=1 where servername = ?', [msg.guild.name], function (error, results, fields) {
							const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Cursing Prevention Enabled!')
							.addFields(
								{ name: 'Cursing Prevention Status!', value:'Cursing Prevention has been successfully `turned on`', inline: true },
							);
					msg.channel.send(settingsembed);
							// msg.reply('Successfully set cussing to true');
						});
					}
					else {
						msg.reply(':warning: Check your syntax! :warning:');
					}
				}
				else {
					msg.reply(':warning: Error! You don\'t have sufficient permissions! :warning:');
				}
	},
};