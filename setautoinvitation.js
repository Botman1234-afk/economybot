/* eslint-disable no-unused-vars */
module.exports = {
	name: 'setautoinvitation',
	description: 'Turn on inviting people after they get automodded!',
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

       if (msg.member.permissions.has('ADMINISTRATOR')) {
					if (msg.content.endsWith('false')) {
						connection.query('update settings set invitationback=0 where servername = ?', [msg.guild.name], function (error, results, fields) {
							msg.reply('Successfully set AutoInvitation to false');
						});
					}
					else if (msg.content.endsWith('true')) {
						connection.query('update settings set invitationback=1 where servername = ?', [msg.guild.name], function (error, results, fields) {
							msg.reply('Successfully set AutoInvitation to true');
						});
					}
					else {
						msg.reply('Check your syntax!');
					}
				}
				else {
					msg.reply('You don\'t have sufficient permissions!');
				}
	},
};