/* eslint-disable no-unused-vars */
module.exports = {
	name: 'buy',
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
		const Discord = require('discord.js')
		connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {

					if (msg.content.endsWith('shotgun') && results[0].coins - 100 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 100, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set shotgun = 1 where name = ?', [msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 100, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a shotgun!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased shotgun!');
					}
					else if (msg.content.endsWith('huntingrifle') && results[0].coins - 100 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 100, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set huntingrifle = 1 where name = ?', [msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 100, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a hunting rifle!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased hunting rifle!');

					}
					else if (msg.content.endsWith('bank membership') && results[0].coins - 500000 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 500000, msg.member.user.username], function (error, results, fields) {
						});
						const nz_date_string = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
						connection.query('update profiles set bankmembership = ? where name = ?', [nz_date_string, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 500000, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a bank membership!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased bank membership!');

					}
      else if (msg.content.endsWith('robbing insurance') && results[0].coins - 1000000 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 1000000, msg.member.user.username], function (error, results, fields) {
						});
						const nz_date_string = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
						connection.query('update profiles set robbinginsurance = ? where name = ?', [nz_date_string, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 1000000, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased robbing insurance!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased bank membership!');

					}
       else if (msg.content.endsWith('thieves insurance') && results[0].coins - 500000 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 500000, msg.member.user.username], function (error, results, fields) {
						});
						const nz_date_string = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
						connection.query('update profiles set thievesinsurance = ? where name = ?', [nz_date_string, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 500000, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased thieves insurance!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased bank membership!');

					}
					else if (msg.content.endsWith('smallhouse') && results[0].coins - 25000 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 25000, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set smallhouse = ? where name = ?', [results[0].smallhouse + 1, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set loan = ? where name = ?', [results[0].loan + 175000, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 25000, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a small house!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased small house!');

					}
					else if (msg.content.endsWith('mediumhouse') && results[0].coins - 100000 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 100000, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set mediumhouse = ? where name = ?', [results[0].mediumhouse + 1, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set loan = ? where name = ?', [results[0].loan + 300000, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 100000, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a medium house!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased medium house!');

					}
					else if (msg.content.endsWith('largehouse') && results[0].coins - 300000 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 300000, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set largehouse = ? where name = ?', [results[0].largehouse + 1, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set loan = ? where name = ?', [results[0].loan + 500000, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 300000, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a large house!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased large house!');

					}
					else if (msg.content.endsWith('smallmansion') && results[0].coins - 500000 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 500000, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set smallmansion = ? where name = ?', [results[0].smallmansion + 1, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set loan = ? where name = ?', [results[0].loan + 700000, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 500000, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a small mansion!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased small mansion!');

					}
					else if (msg.content.endsWith('fishingpole') && results[0].coins - 5000 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 5000, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set fishingpole = 1 where name = ?', [msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 5000, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a fishing pole!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased fishing pole!');

					}
					else if (msg.content.endsWith('computer') && results[0].coins - results[0].computer * 1000 + 1000 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - (results[0].computer * 1000 + 1000), msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set computer = ? where name = ?', [results[0].computer + 1, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + (results[0].computer * 1000 + 1000), 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a computer!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased computer!');

					}
					else if (msg.content.endsWith('workspace') && results[0].coins - (results[0].workspace * 2000 + 2000) >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - (results[0].workspace * 2000 + 2000), msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set workspace  = ? where name = ?', [results[0].workspace + 1, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + (results[0].workspace * 2000 + 2000), 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a workspace!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully upgraded workspace!');

					}
					// else if (msg.content.endsWith('bonds') && results[0].coins - 100 >= 0) {
					// 	var text = msg.content.slice(12).trim().split(' ');
					// 	console.log(text)
					// 	connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 100, msg.member.user.username], function (error, results, fields) {
					// 	});
					// 	connection.query('update profiles set bonds = ? where name = ?', [results[0].bonds + 1, msg.member.user.username], function (error, results, fields) {
					// 	});
					// 	connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

					// 		connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 100, 'bank'], function (error, results, fields) {
					// 		});
					// 	});
					// 	msg.reply('Successfully purchased bonds!');

					// }

					else if (msg.content.endsWith('woodensword') && results[0].coins - 100 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 100, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set woodensword = 1 where name = ?', [msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 100, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a wooden sword!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased wooden sword!');

					}
					else if (msg.content.endsWith('ironsword') && results[0].coins - 100 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 100, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set ironsword = 1 where name = ?', [msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 100, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased an iron sword!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased iron sword!');

					}
					else if (msg.content.endsWith('diamondsword') && results[0].coins - 1000 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 1000, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set diamondsword = 1 where name = ?', [msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 1000, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a diamond sword!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased diamond sword!');

					}
					else if (msg.content.endsWith('car') && results[0].coins - 20000 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 20000, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set car = 1 where name = ?', [msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 20000, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a car!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased car!');

					}
					else if (msg.content.endsWith('gasoline') && results[0].coins - 500 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 500, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set gasoline = 1 where name = ?', [msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 500, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a container full of gasoline!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased gasoline!');

					}
					else if (msg.content.endsWith('shield') && results[0].coins - 500 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 500, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set shield = 1 where name = ?', [msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 500, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a shield!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased shield!');

					}
					else if (msg.content.endsWith('arrow') && results[0].coins - 200 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 200, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set arrow = 1 where name = ?', [msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 200, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased an arrow!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased arrow!');

					}
					else if (msg.content.endsWith('crossbow') && results[0].coins - 500 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 500, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set crossbow = 1 where name = ?', [msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 500, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a crossbow!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased crossbow!');

					}
					else if (msg.content.endsWith('icon') && results[0].coins - 100 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - (results[0].icon - 100), msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set icon  = ? where name = ?', [results[0].icon + 1, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + (results[0].icon + 100), 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a Softwaresat Icon!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased arrow!');

					}
					else if (msg.content.endsWith('cgem') && results[0].coins - 100000 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - (results[0].cgem - 100000), msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set cgem  = ? where name = ?', [results[0].cgem + 1, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + (results[0].cgem + 100000), 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a Common Gem!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased arrow!');

					}
					else if (msg.content.endsWith('rgem') && results[0].coins - 500000 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 500000, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set rgem = ? where name = ?', [results[0].rgem + 1, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 500000, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a Rare Gem!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased arrow!');

					}
					else if (msg.content.endsWith('ssword') && results[0].coins - 5000000 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 5000000, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set ssword = ? where name = ?', [results[0].ssword + 1, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 5000000, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a Softwaresat Sword!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased arrow!');

					}
					else if (msg.content.endsWith('medal') && results[0].coins - 10000000 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 10000000, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set medal = ? where name = ?', [results[0].medal + 1, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 10000000, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a Softwaresat Medal!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased arrow!');

					}
					else if (msg.content.endsWith('crown') && results[0].coins - 50000000 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 50000000, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set crown = ? where name = ?', [results[0].crown + 1, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 50000000, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a Softwaresat Crown!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased arrow!');

					}
					
					else {
						msg.reply('Uhh, you don\'t have enough money for your purchase');
					}
				});
	},
};