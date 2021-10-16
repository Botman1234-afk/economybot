/* eslint-disable no-unused-vars */
module.exports = {
	name: 'setautorole',
	description: 'Adds a role to new users who join the server!',
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
					connection.query('update settings set autorole=? where servername = ?', [text, msg.guild.name], function (error, results, fields) {
						const settingsembed = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle('Auto Role Changed!')
                            .addFields(
                                { name: 'New Auto Role', value:'Auto Role has been successfully changed to `' + text +'`', inline: true },
                            );
                        msg.channel.send(settingsembed);
						// msg.reply('Successfully set autorole to ' + text);
					});
				}
				else {
					msg.reply(':warning: You don\'t have sufficient permissions! :warning:');
				}
	},
};