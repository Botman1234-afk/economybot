/* eslint-disable no-unused-vars */
module.exports = {
	name: 'dm',
	description: 'Ping!',
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
		let serverName = msg.guild.name;
		connection.query('Select dm from settings where servername = ?', [serverName], function(error, results, fields) {
			const dmSetting = `${results[0].dm}`;
			if (msg.member.permissions.has('ADMINISTRATOR') && dmSetting == '1') {
				const member = msg.mentions.users.first();
				const text = msg.content.split(' ').slice(2).join(' ');
				if(member == undefined) {
					msg.reply('Check your syntax!');
				}
				else{
					member.send(text + ' -' + msg.member.user.username);
					msg.channel.send('Message successfully sent!');
				}
			}
			else{
				msg.reply('You don\'t have sufficient permissions or dm is disabled in your server\'s settings!');
			}
		});

	},
};