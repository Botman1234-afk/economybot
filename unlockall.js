/* eslint-disable no-unused-vars */
module.exports = {
	name: 'unlockall',
	description: 'Unlock all the channels in a server!',
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
            	if (msg.member.permissions.has('ADMINISTRATOR')) {
					msg.guild.channels.cache.forEach(channel => {
						channel.overwritePermissions([
							{
								id: msg.guild.roles.everyone.id,
							allow: ['SEND_MESSAGES'],
							}]);
					});
					
					msg.channel.send('🔓 Server Unlocked');
				}
				else {
					msg.reply('You do not have permissions!');
				}
	},
};