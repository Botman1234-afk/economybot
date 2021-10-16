/* eslint-disable no-unused-vars */
module.exports = {
	name: 'setwelcomechannel',
	description: 'Set the channel where welcome messages are sent',
	async execute(msg, args) {
		const client = msg.client;
		const mysql = require('mysql');
        const Discord = require('discord.js')
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
						connection.query('update settings set welcomechannel=? where servername = ?', [text, msg.guild.name], function (error, results, fields) {
							// msg.reply('Successfully set the AutoWelcome channel to ' + text);
							const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Welcome Channel Changed!')
							.addFields(
								{ name: 'New Welcome Channel', value:'Welcome Channel has been successfully changed to `' + text +'`', inline: true },
							);
						msg.channel.send(settingsembed);
						});
					}
				}
				else {
					msg.reply(':warning: Error! You don\'t have sufficient permissions! :warning:');
				}
	},
};