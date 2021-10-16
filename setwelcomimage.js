/* eslint-disable no-unused-vars */
module.exports = {
	name: 'setwelcomeimage',
	description: 'set an image thats displayed when people join the server!',
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
        var text = msg.content.split(' ').slice(1).join(' ');
				if (msg.member.permissions.has('ADMINISTRATOR')) {
					if (text == undefined) {
						msg.reply(':warning: What do I set it to? :warning:');
					}
					else {
						connection.query('update settings set welcomepicture=? where servername = ?', [text, msg.guild.name], function (error, results, fields) {
							const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Welcome Image Changed!')
							.addFields(
								{ name: 'New Welcome Image', value:'Welcome Image has been successfully changed to `' + text +'`', inline: true },
							);
						msg.channel.send(settingsembed);
							// msg.reply('Successfully set the AutoWelcome picture to ' + text);
						});
					}
				}
				else {
					msg.reply(':warning: Error! You don\'t have sufficient permissions! :warning:');
				}
	},
};