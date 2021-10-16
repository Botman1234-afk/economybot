/* eslint-disable no-unused-vars */
module.exports = {
	name: 'info',
	description: 'Get a quick look at the business\'s info!',
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
           	var args = msg.content.split(' ').slice(1).join(' ');

				connection.query('select * from bussiness where name = ?', [args], function (error, results, fields) {
					connection.query('select * from stocks where business = ?', [args], function (error, results2, fields) {
						let number = 0;
						results2.forEach(result => {
							number = number + result.number;
						});
						const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Stock Market')
							.addFields(
								{ name: results[0].name, value: '$' + (parseInt(results[0].stockvalue / number).toString()), inline: true },
								{ name: 'Market Cap', value: '$' + (parseInt(results[0].stockvalue).toString()), inline: true },


							);
						msg.channel.send(settingsembed);
					});
				});
	},
};