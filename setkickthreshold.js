/* eslint-disable no-unused-vars */
module.exports = {
	name: 'setkickthreshold',
	description: 'Change the amount of warns that equal to a kick',
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
					const threshold = msg.content.split(' ').slice(1).join(' ');
					connection.query('update settings set kickthreshold = ? where servername = ?', [threshold, msg.guild.name], function (error, results, fields) {
						const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Kick Threshold Changed!')
							.addFields(
								{ name: 'New Kick Threshold', value:'Threshold has been successfully changed to `' + threshold +'`', inline: true },
							);
						msg.channel.send(settingsembed);
						// msg.reply('Successfully set your kick threshold');
					});
				}
				else {
					msg.reply(':warning: You don\'t have sufficient permissions! :warning:');
				}
	},
};