/* eslint-disable no-unused-vars */
module.exports = {
	name: 'setlogchannel',
	description: 'Change the channel in which server logs go to',
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
	var text = msg.content.split(' ').slice(1).join(' ');
				if (msg.member.permissions.has('ADMINISTRATOR')) {
					if (text == undefined) {
						msg.reply(':warning: What do I set it to? :warning:');
					}
					else {
						connection.query('update settings set logchannel=? where servername = ?', [text, msg.guild.name], function (error, results, fields) {
							const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Logging Channel Changed!')
							.addFields(
								{ name: 'New Logging Channel', value:'Logging Channel has been successfully changed to `' + text +'`', inline: true },
							);
						msg.channel.send(settingsembed);
							// msg.reply('Successfully set the AutoLog channel to ' + text);
						});
					}
				}
				else {
					msg.reply(':warning: Error! You don\'t have sufficient permissions! :warning:');
				}
	},
};