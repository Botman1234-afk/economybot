/* eslint-disable no-unused-vars */
module.exports = {
	name: 'business',
	description: 'Check your business stats!',
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
		var employees = 0;
				var number = 0;
				connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {
					connection.query('select * from profiles where bussiness = ?', [results[0].bussiness], function (error, results1, fields) {
						connection.query('select * from bussiness where name = ?', [results[0].bussiness], function (error, results2, fields) {
							connection.query('select * from stocks where business = ?', [results[0].bussiness], function (error, results3, fields) {

								results1.forEach(result => {
									employees++;
								});
								results3.forEach(result => {
									number = number + result.number;
								});
								const settingsembed = new Discord.MessageEmbed()
									.setColor('#0099ff')
									.setTitle(results[0].bussiness)
									.addFields(
										{ name: ':office_worker: Number of Employees', value: employees, inline: true },
										{ name: '<:softwaresat:786624255861325845> Balance', value: results2[0].balance, inline: true },
										{ name: ':coin: Book Value', value: results2[0].stockvalue, inline: true },

										{ name: ':chart_with_upwards_trend: Total Shares', value: number, inline: true },
										{ name: ':bar_chart: Daily Free Shares for Employees', value: results2[0].dailystocks, inline: true },


									);
								msg.channel.send(settingsembed);
							});
						});
					});
				});
	},
};