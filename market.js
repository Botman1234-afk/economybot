/* eslint-disable no-unused-vars */
module.exports = {
	name: 'market',
	description: 'Get the business market!',
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
		connection.query('select * from bussiness', [msg.member.user.username], function (error, results, fields) {

			const settingsembed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Stock Market');

			results.forEach(result => {


				settingsembed.addFields(
					{ name: result.name, value: '------------------------', inline: false },

				);


			});
			msg.channel.send(settingsembed);


		});

			
	},
};