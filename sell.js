/* eslint-disable no-unused-vars */
module.exports = {
	name: 'sell',
	description: 'Sell houses and stocks!',
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
           var text = msg.content.slice(6).trim().split(' ');
				 args = text[3];
				connection.query('select * from stocks where business = ?', [text[0] + ' ' + text[1] + ' ' + text[2]], function (error, results9, fields) {
					connection.query('select * from stocks where name = ? and business = ?', [msg.member.user.username, text[0] + ' ' + text[1] + ' ' + text[2]], function (error, results12, fields) {

						connection.query('select * from bussiness where name = ?', [text[0] + ' ' + text[1] + ' ' + text[2]], function (error, results1, fields) {
							connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results7, fields) {

								let number = 0;
								if (text == 'mediumhouse' && results7[0].mediumhouse > 0) {
									connection.query('update profiles set coins = ? where name = ?', [results7[0].coins + 400000, msg.member.user.username], function (error, results3, fields) {
									});
									connection.query('update profiles set mediumhouse = ? where name = ?', [results7[0].mediumhouse - 1, msg.member.user.username], function (error, results3, fields) {
									});
									const firstembed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle('Item Sold!')
											.addFields({ name: 'Sold', value: 'Successfully sold a medium house!' , inline: false },);
									msg.channel.send(firstembed);
									// msg.reply('Successfully sold medium house!');
								}
								
								if (text[0] == 'smallhouse' && results7[0].smallhouse >= parseInt(text[1])) {
									connection.query('update profiles set coins = ? where name = ?', [results7[0].coins + parseInt(text[1])*200000, msg.member.user.username], function (error, results3, fields) {
									});
									connection.query('select * from profiles where name = ?', ['bank'], function (error, results9, fields) {

									connection.query('update profiles set coins = ? where name = ?', [results9[0].coins - parseInt(text[1])*200000, 'bank'], function (error, results3, fields) {
									});
								})
									connection.query('update profiles set smallhouse = ? where name = ?', [results7[0].smallhouse - parseInt(text[1]), msg.member.user.username], function (error, results3, fields) {
									});
									const firstembed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle('Item Sold!')
											.addFields({ name: 'Sold', value: 'Successfully sold smallhouses!' , inline: false },);
									msg.channel.send(firstembed);
									// msg.reply('Successfully sold bonds!');
								}
								else if (text == 'largehouse' && results7[0].largehouse > 0) {
									connection.query('update profiles set coins = ? where name = ?', [results7[0].coins + 800000, msg.member.user.username], function (error, results3, fields) {
									});
									connection.query('update profiles set largehouse = ? where name = ?', [results7[0].largehouse - 1, msg.member.user.username], function (error, results3, fields) {
									});
									const firstembed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle('Item Sold!')
											.addFields({ name: 'Sold', value: 'Successfully sold a large house!' , inline: false },);
									msg.channel.send(firstembed);
									// msg.reply('Successfully sold large house!');
								}
								if (text == 'smallmansion' && results7[0].smallmansion > 0) {
									connection.query('update profiles set coins = ? where name = ?', [results7[0].coins + 1200000, msg.member.user.username], function (error, results3, fields) {
									});
									connection.query('update profiles set smallmansion = ? where name = ?', [results7[0].smallmansion - 1, msg.member.user.username], function (error, results3, fields) {
									});
									const firstembed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle('Item Sold!')
											.addFields({ name: 'Sold', value: 'Successfully sold a small mansion!' , inline: false },);
									msg.channel.send(firstembed);
									// msg.reply('Successfully sold small mansion!');
								}
								console.log(text)
								if (text[0] == 'bonds' && results7[0].bonds >= parseInt(text[1])) {
									connection.query('update profiles set coins = ? where name = ?', [results7[0].coins + parseInt(text[1])*200, msg.member.user.username], function (error, results3, fields) {
									});
									connection.query('select * from profiles where name = ?', ['bank'], function (error, results9, fields) {

									connection.query('update profiles set coins = ? where name = ?', [results9[0].coins - parseInt(text[1])*200, 'bank'], function (error, results3, fields) {
									});
								})
									connection.query('update profiles set bonds = ? where name = ?', [results7[0].bonds - parseInt(text[1]), msg.member.user.username], function (error, results3, fields) {
									});
									const firstembed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle('Item Sold!')
											.addFields({ name: 'Sold', value: 'Successfully sold bonds!' , inline: false },);
									msg.channel.send(firstembed);
									// msg.reply('Successfully sold bonds!');
								}
								else if (text != 'mediumhouse' && text[0] != 'smallhouse' && text != 'smallmansion' && text != 'largehouse' && parseInt(args) <= results12[0].number) {
									console.log(parseInt(args));
									results9.forEach(result => {

										number = number + result.number;
									});
									console.log(number);
									connection.query('update profiles set coins = ? where name = ?', [results7[0].coins + ((results1[0].stockvalue / number) * parseInt(args)), msg.member.user.username], function (error, results3, fields) {
									});
									connection.query('update stocks set number = ? where name = ? and business = ?', [results12[0].number - parseInt(args), msg.member.user.username, text[0] + ' ' + text[1] + ' ' + text[2]], function (error, results3, fields) {
									});
									connection.query('update bussiness set balance = ? where name = ?', [results1[0].balance - ((results1[0].stockvalue / number) * parseInt(args)), text[0] + ' ' + text[1] + ' ' + text[2]], function (error, results3, fields) {
									});
									connection.query('update bussiness set stockvalue = ? where name = ?', [results1[0].stockvalue -  ((results1[0].stockvalue / number) * parseInt(args)), text[0] + ' ' + text[1] + ' ' + text[2]], function (error, results3, fields) {
									});
									const firstembed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle('Stocks Sold!')
											.addFields({ name: 'Sold', value: 'Successfully sold stocks!' , inline: false },);
									msg.channel.send(firstembed);
								}
								// else {
								// 	const firstembed = new Discord.MessageEmbed()
								// 			.setColor('#0099ff')
								// 			.setTitle('Stocks Error!')
								// 			.addFields({ name: 'Error', value: 'You don\'t have that many shares!' , inline: false },);
								// 		msg.channel.send(firstembed);
								// 	// msg.reply('You do not have that many shares!');
								// }
							});
						});
					});
				});
	},
};