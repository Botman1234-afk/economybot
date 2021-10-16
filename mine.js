/* eslint-disable no-unused-vars */
module.exports = {
	name: 'mine',
	description: 'Mine to earn money!',
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
		
		
		connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {
					if (results[0].fishingpole == 1) {
						var dirt = Math.floor((Math.random() * 50) + 1);
						var netherite = Math.floor((Math.random() * 20) + 1);
						var diamond = Math.floor((Math.random() * 10) + 1);
						var num = Math.floor((Math.random() * 1000) + 1);
						if (dirt < 51 && dirt > 0) {
							const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle(':pick: Mining!')	
								.addFields(
									{ name: 'Items Mined', value: '<a:minecraftdirt:843910118546079765> ' + dirt + ' dirt\n<:netherite:843912099003498506> ' + netherite + ' netherite\n<a:Minecraft_diamond:843919592363655239> ' + diamond + ' diamond' , inline: false },
									{ name: '<a:moneybag:818498411962695721> Sold For', value: `${dirt * 1 + netherite * 5 + diamond * 5} coins!` , inline: false },
								);
							msg.channel.send(firstembed);
							// msg.reply('You have caught ' + number + ' fish and sold it for $' + number * 150 + '!');
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins + dirt * 1 + netherite * 5 + diamond * 5, msg.member.user.username], function (error, results3, fields) {
							});
							connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

								connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - dirt * 1 - netherite * 5 + 5 * diamond, 'bank'], function (error, results, fields) {
								});

							});
						}
						if (num == 1) {
							const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('👑 TREASURE')	
								.addFields(
									{ name: 'You are a victor!', value: 'You found 1 <:pepeASmile:843961926685425674>' , inline: false },
									{ name: '<a:moneybag:818498411962695721> Sold For', value: `${10000000} coins!` , inline: false },

								);
							msg.channel.send(firstembed);
							// msg.reply('You have caught ' + number + ' fish and sold it for $' + number * 150 + '!');
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins + 10000000, msg.member.user.username], function (error, results3, fields) {
							});
							connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

								connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - 10000000, 'bank'], function (error, results, fields) {
								});

							});
						}
					
					
					}
					
				});
	},
};
