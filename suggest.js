/* eslint-disable no-unused-vars */
module.exports = {
	name: 'suggest',
	description: 'Ping!',
	execute(msg, args) {
		const client = msg.client;
		const mysql = require('mysql');
		const Discord = require('discord.js');
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'latehome4',
			database:'discord',
			charset : 'utf8mb4',
		});
		connection.query('insert into suggestions(name,text) values(?,?)', [msg.author.username, msg.content.split(' ').slice(1).join(' ')], function(error, results, fields) {
			connection.query('select id,text from suggestions where text = ?', [msg.content.split(' ').slice(1).join(' ')], function(error, results, fields) {
				console.log(results[0].id);
				const settingsembed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Thanks For Your Suggestion!')
					.setDescription('Here you can see the ID for your suggestion, use this to verify when your issue is solved in the patch-notes announcements!')
					.addFields(
						{ name: 'Suggestion', value: results[0].text, inline: true },
						{ name: 'ID', value: results[0].id, inline: true },
					);
				msg.channel.send(settingsembed);
			});
		});

	},
};