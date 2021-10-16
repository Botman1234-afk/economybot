/* eslint-disable no-unused-vars */
module.exports = {
	name: 'buy bonds',
	description: 'Buy bonds from the bank!',
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
		connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {

					var text = msg.content.slice(11).trim().split(' ');
					console.log(parseInt(text[0])*200<= results[0].coins)
					if(text != '' && ((parseInt(text[0])*200)<= results[0].coins)){
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - (200*parseInt(text[0])), msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set bonds = ? where name = ?', [results[0].bonds + parseInt(text[0]), msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {
	
							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + (200*parseInt(text[0])), 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased bonds!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased bonds!');
					}
					else if(((parseInt(text[0])*200)> results[0].coins)){
						msg.reply('You don\'t have enough money!')
					}
					else{
					connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 200, msg.member.user.username], function (error, results, fields) {
					});
					connection.query('update profiles set bonds = ? where name = ?', [results[0].bonds + 1, msg.member.user.username], function (error, results, fields) {
					});
					connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

						connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 200, 'bank'], function (error, results, fields) {
						});
					});
					const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased bonds!' , inline: false },
								);
						msg.channel.send(firstembed);
					// msg.reply('Successfully purchased bonds!');
				}
			})
	},
};