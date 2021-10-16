/* eslint-disable no-unused-vars */
module.exports = {
	name: 'raps',
	description: 'Check out some cool raps!',
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
		var number = 0;
		connection.query('select * from settings where servername = ?', [msg.guild.name], async function (error, results, fields) {
			const settingsembed = new Discord.MessageEmbed()
					.setTitle('Raps!')
					.setColor('#0099ff')
					.addFields(
						{ name: 'Rap #1', value:`Name: Friend\n\`${results[0].prefix}rap 1\``, inline: false },
						{ name: 'Rap #2', value:`Name: Frappe or Cappe\n\`${results[0].prefix}rap 2\``, inline: false },
						{ name: 'Rap #3', value:`Name: What did you do - Parody of Bands out the Roof by Lil Mosey\n\`\`${results[0].prefix}rap 3\``, inline: false },
						{ name: 'Rap #4', value:`Name: Love You\n\`${results[0].prefix}rap 4\``, inline: false },
						{ name: 'Rap #5', value:`Name: Viral\n\`${results[0].prefix}rap 5\``, inline: false },
						{ name: 'Rap #6', value:`Name: Together\n\`${results[0].prefix}rap 6\``, inline: false },
						{ name: 'Rap #7', value:`Name: Flex\n\`${results[0].prefix}rap 7\``, inline: false },
						{ name: 'Rap #8', value:`Name: Chillz\n\`${results[0].prefix}rap 8\``, inline: false },
						)
					.setFooter('All raps made by <@707250051918856222> (Chillz#3327)')
					msg.channel.send(settingsembed)
		})
	},
};