/* eslint-disable no-unused-vars */
module.exports = {
	name: 'fish',
	description: 'Fish to earn money!',
	cooldown: 2,
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
						var number = Math.floor((Math.random() * 28));
						var number2 = 35
						var number3 = Math.floor((Math.random() *4) + 1);
						var number4 = 100
						var number5 = Math.floor((Math.random() * 2) + 1);
						var number6 = Math.floor((Math.random() * 3) + 1);
						var number7 = Math.floor((Math.random() * 2) + 1);
						var fishType = Math.floor(Math.random()*4)
						const nz_date_string = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
        			
						
						if (number > 20 && number < 29) {
							const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle(':fishing_pole_and_fish: Fishing!')	
								.addFields(
									{ name: 'Fish Caught', value: ':fish: ' + number + ' Blue fish' , inline: false },
									{ name: '<a:moneybag:818498411962695721> Sold For', value: `${number * 5} coins!` , inline: false },
								);
							msg.channel.send(firstembed);
							// msg.reply('You have caught ' + number + ' fish and sold it for $' + number * 150 + '!');
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins + number * 5, msg.member.user.username], function (error, results3, fields) {
							});
							connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

								connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - number * 5, 'bank'], function (error, results, fields) {
								});

							});
						}
						else if (number > 17 && number < 22) {
							const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle(':fishing_pole_and_fish: Fishing!')
								.addFields(
									{ name: 'Fish Caught', value: ':crab: ' + number5 + ' Crab' , inline: false },
									{ name: '<a:moneybag:818498411962695721> Sold For', value: `${number5 * 50} coins!` , inline: false },
								);
							msg.channel.send(firstembed);
							// msg.reply('You have caught ' + number + ' fish and sold it for $' + number * 150 + '!');
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins + number5 * 50, msg.member.user.username], function (error, results3, fields) {
							});
							connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

								connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - number5 * 50, 'bank'], function (error, results, fields) {
								});

							});
						}
						

						else if (number > 14 && number < 19) {
							const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle(':fishing_pole_and_fish: Fishing!')
								.addFields(
									{ name: 'Fish Caught', value: ':lobster: ' + number7 + ' Lobster' , inline: false },
									{ name: '<a:moneybag:818498411962695721> Sold For', value: `${number7 * 30} coins!` , inline: false },
								);
							msg.channel.send(firstembed);
							// msg.reply('You have caught ' + number + ' fish and sold it for $' + number * 150 + '!');
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins + number7 * 30, msg.member.user.username], function (error, results3, fields) {
							});
							connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

								connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - number7 * 30, 'bank'], function (error, results, fields) {
								});

							});
						}
						else if (number > 10 && number < 15) {
							const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle(':fishing_pole_and_fish: Fishing!')
								.addFields(
									{ name: 'Fish Caught', value: ':octopus: ' + number6 + ' Octopus' , inline: false },
									{ name: '<a:moneybag:818498411962695721> Sold For', value: `${number6 * 30} coins!` , inline: false },
								);
							msg.channel.send(firstembed);
							// msg.reply('You have caught ' + number + ' fish and sold it for $' + number * 150 + '!');
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins + number6 * 30, msg.member.user.username], function (error, results3, fields) {
							});
							connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

								connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - number6 * 30, 'bank'], function (error, results, fields) {
								});

							});
						}
						
					
						else if (number > 6 && number < 10) {
							const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle(':fishing_pole_and_fish: Fishing!')
								.addFields(
									{ name: 'Fish Caught', value: ':tropical_fish: ' + number + ' Tropical fish' , inline: false },
									{ name: '<a:moneybag:818498411962695721> Sold For', value: `${number2 * 10} coins!` , inline: false },
								);
							msg.channel.send(firstembed);
							// msg.reply('You have caught ' + number + ' fish and sold it for $' + number * 150 + '!');
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins + number4 * 10, msg.member.user.username], function (error, results3, fields) {
							});
							connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

								connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - number4 * 10, 'bank'], function (error, results, fields) {
								});

							});
						}
						else if (number > 1 && number < 7) {
							const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle(':fishing_pole_and_fish: Fishing!')
								.addFields(
									{ name: 'Fish Caught', value: ':shark: ' + number3 + ' Shark' , inline: false },
									{ name: '<a:moneybag:818498411962695721> Sold For', value: `${number4 * 3} coins!` , inline: false },
								);
							msg.channel.send(firstembed);
							// msg.reply('You have caught ' + number + ' fish and sold it for $' + number * 150 + '!');
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins + number4 * 3, msg.member.user.username], function (error, results3, fields) {
							});
							connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

								connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - number4 * 3, 'bank'], function (error, results, fields) {
								});

							});
						}
						else if (number3 == 1) {
							const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle(':fishing_pole_and_fish: Fishing!')
								.addFields(
									{ name: 'Fish Caught', value: '<:fb_goldfish:843875648467501057>' + number + ' Gold fish' , inline: false },
									{ name: '<a:moneybag:818498411962695721> Sold For', value: `${number3 * 50} coins!` , inline: false },
								);
							msg.channel.send(firstembed);
							// msg.reply('You have caught ' + number + ' fish and sold it for $' + number * 150 + '!');
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins + number3 * 50, msg.member.user.username], function (error, results3, fields) {
							});
							connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

								connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - number3 * 50, 'bank'], function (error, results, fields) {
								});

							});
						}
					}
					else if (results[0].fishingpole == 0){
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle(':fishing_pole_and_fish: Error!')
								.addFields(
									{ name: 'Fishing Pole', value: 'You need a fishing rod to fish! Do `.shop` and purchase one!' , inline: false },
								);
							msg.channel.send(firstembed);
					}
					else {
					const firstembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle(':fishing_pole_and_fish: Error!')
							.addFields(
								{ name: 'Error', value: 'An unknown error has occured! Please join the support discord server and contact a developer to report this bug!' , inline: false },
								{ name: 'Link', value: 'discord.gg/softwaresat' , inline: false },
							);
						msg.channel.send(firstembed);
					}
						
					}
			
						
					
				
					
				);
	},
};