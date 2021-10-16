/* eslint-disable no-unused-vars */
module.exports = {
	name: 'hunt',
	description: 'Ping!',
	async execute(msg, args) {
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
			const firstembed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Side Mission: Hunting')
					.addFields(
						{ name: 'Hunting Side Mission', value: 'You take Barry and Billy with you to the forest to hunt.', inline: false },
						{ name: 'Response', value: 'Type 1 to continue!', inline: false },

					);
				const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
				const { MessageCollector } = require('discord.js-collector');

				const botMessage = await msg.channel.send(firstembed);
				const userMessage = await MessageCollector.asyncQuestion({
					botMessage,
					user: msg.author.id,
				});
				if (userMessage.content == '1') {
					const firstembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Side Mission: Hunting')
						.addFields(
							{ name: 'Hunting Side Mission', value: 'After trying to find an animal in the wilderness for 10 minutes, you stumble accross a clearing. There are 2 animals ahead of you, each with their own special traits. One one hand is a brilliant tiger, which would give you lots of money. On the other hand, you are hungry and there is a beautiful deer.', inline: false },
							{ name: 'Response', value: 'Type 2 to shoot the tiger, type 3 to shoot the deer.', inline: false },

						);
					const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
					const { MessageCollector } = require('discord.js-collector');

					const botMessage = await msg.channel.send(firstembed);
					const userMessage = await MessageCollector.asyncQuestion({
						botMessage,
						user: msg.author.id,
					});
					if (userMessage.content == '2') {
						const number = Math.floor(Math.floor(Math.random() * 3));
						let firstembed1;
						if (number >= 1) {
							firstembed1 = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Side Mission: Hunting')
								.addFields(
									{ name: 'Hunting Side Mission', value: 'You shoot the tiger, and are able to shoot it just as it lunges at the deer. It collapses, and you gain both food and an opportunity for riches if you survive this mission! You cook your deer carcass and sleep. You wake up the next day.', inline: false },
									{ name: 'Response', value: 'Type 4 to continue looking for more things, type 5 to stop now and collect your riches', inline: false },

								);
						}
						else {
							firstembed1 = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Side Mission: Hunting')
								.addFields(
									{ name: 'Hunting Side Mission', value: 'The tiger lunges at you before you are able to kill it, and you die.', inline: false },

								);
								msg.channel.send(firstembed1)
								return
						}

						const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
						const { MessageCollector } = require('discord.js-collector');

						const botMessage = await msg.channel.send(firstembed1);
						const userMessage = await MessageCollector.asyncQuestion({
							botMessage,
							user: msg.author.id,
						});
						if (userMessage.content == '4') {
							connection.query('select * from profiles where name = ?', [msg.member.user.username], async function (error, results, fields) {


								const firstembed = new Discord.MessageEmbed()
									.setColor('#0099ff')
									.setTitle('Side Mission: Hunting')
									.addFields(
										{ name: 'Hunting Side Mission', value: 'You continue hunting and after catching a few deer and selling them to nearby butchers, you want something big again. In the clearing ahead, you see something that looks strangely like a dinosaur. You can either kill it with your hunting rifle, try to blast it with your shotgun, or melee it with an iron sword if you have one.', inline: false },
										{ name: 'Response', value: 'Type 6 for hunting rifle, 7 for shotgun, or 8 for iron sword.', inline: false },

									);
								const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
								const { MessageCollector } = require('discord.js-collector');

								const botMessage = await msg.channel.send(firstembed);
								const userMessage = await MessageCollector.asyncQuestion({
									botMessage,
									user: msg.author.id,
								});
								if (userMessage.content == '6' && results[0].huntingrifle == '1') {
									let filter;
									const number = Math.floor(Math.floor(Math.random() * 6));
									let firstembed;
									if (number > 4) {
										firstembed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle('Side Mission: Hunting')
											.addFields(
												{ name: 'Hunting Side Mission', value: 'You use your trusty hunting rifle and shoot the dinosaur straight in the heart. Since it wasn\'t a melee killing, the carcass will be worth less.', inline: false },
												{ name: 'Response', value: 'Type 9 to stop hunting and sell the dino skin!', inline: false },

											);
										filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
										const { MessageCollector } = require('discord.js-collector');

										const botMessage = await msg.channel.send(firstembed);
										const userMessage = await MessageCollector.asyncQuestion({
											botMessage,
											user: msg.author.id,
										});
										if (userMessage.content == '9') {
											connection.query('select * from profiles where name = ?', [msg.member.user.username], async function (error, results, fields) {

												firstembed = new Discord.MessageEmbed()
													.setColor('#0099ff')
													.setTitle('Side Mission: Hunting ABORTED')
													.addFields(
														{ name: 'Hunting Side Mission', value: 'You find your way out of the forest holding the tiger skin and dinosaur skin. You find a local fur trader nearby offering 20000 coins for the bundle!', inline: false },

													);
												msg.channel.send(firstembed);
												connection.query('update profiles set coins = ? where name = ?', [results[0].coins + 20000, msg.member.user.username], async function (error, results, fields) {
												});
											});
										}
									}
									else {
										firstembed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle('Side Mission: Hunting')
											.addFields(
												{ name: 'Hunting Side Mission', value: 'The dinosaur notices you and chomps you up before you are able to shoot. You lose your tiger skin and a whole 5000 coins!', inline: false },

											);
										connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 5000, msg.member.user.username], async function (error, results, fields) {
										});
										msg.channel.send(firstembed);
										return
									}

								}
								else if (userMessage.content == '7' && results[0].shotgun == '1') {
									let filter;
									const number = Math.floor(Math.floor(Math.random() * 6));
									let firstembed;
									if (number > 4) {
										firstembed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle('Side Mission: Hunting')
											.addFields(
												{ name: 'Hunting Side Mission', value: 'You use your shotgun and shoot the dinosaur straight in the heart. You can either say 9 and stop now to collect your riches or keep going.', inline: false },
												{ name: 'Response', value: 'Type 9 to stop hunting and sell the dino skin, or type 10 to keep going!', inline: false },
											);
										filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
										const { MessageCollector } = require('discord.js-collector');

										const botMessage = await msg.channel.send(firstembed);
										const userMessage = await MessageCollector.asyncQuestion({
											botMessage,
											user: msg.author.id,
										});
										if (userMessage.content == '9') {
											connection.query('select * from profiles where name = ?', [msg.member.user.username], async function (error, results, fields) {

												firstembed = new Discord.MessageEmbed()
													.setColor('#0099ff')
													.setTitle('Side Mission: Hunting ABORTED')
													.addFields(
														{ name: 'Hunting Side Mission', value: 'You find your way out of the forest holding the tiger skin and dinosaur skin. You find a local fur trader nearby offering 20000 coins for the bundle!', inline: false },

													);
												msg.channel.send(firstembed);
												connection.query('update profiles set coins = ? where name = ?', [results[0].coins + 20000, msg.member.user.username], async function (error, results, fields) {
												});
											});
										}
									}
									else {
										firstembed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle('Side Mission: Hunting')
											.addFields(
												{ name: 'Hunting Side Mission', value: 'You use the shotgun and try to kill the dinosaur from upclose. It just stomps on you and you die. You have lost your tiger skin and a whole 5000 coins!', inline: false },

											);
										connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 5000, msg.member.user.username], async function (error, results, fields) {
										});
										msg.channel.send(firstembed);
										return
									}


								}
								else if (userMessage.content == '8' && results[0].ironsword == '1') {
									let firstembed;
									const number = Math.floor(Math.floor(Math.random() * 6));
									if (number > 4) {
										firstembed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle('Side Mission: Hunting')
											.addFields(
												{ name: 'Hunting Side Mission', value: 'You use your iron sword to kill the dinosaur from upclose. You stab him straight in the heart and you got a clean exotic dinosaur. You can either stop now and claim your riches or keep going!', inline: false },
												{ name: 'Response', value: 'Type 9 to stop hunting and sell the dino skin, or type 10 to keep going!', inline: false },

											);
										const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
										const { MessageCollector } = require('discord.js-collector');

										const botMessage = await msg.channel.send(firstembed);
										const userMessage = await MessageCollector.asyncQuestion({
											botMessage,
											user: msg.author.id,
										});
										if (userMessage.content == '9') {
											connection.query('select * from profiles where name = ?', [msg.member.user.username], async function (error, results, fields) {

												firstembed = new Discord.MessageEmbed()
													.setColor('#0099ff')
													.setTitle('Side Mission: Hunting ABORTED')
													.addFields(
														{ name: 'Hunting Side Mission', value: 'You find your way out of the forest holding the tiger skin and dinosaur skin. You find a local fur trader nearby offering 20000 coins for the bundle!', inline: false },

													);
												msg.channel.send(firstembed);
												connection.query('update profiles set coins = ? where name = ?', [results[0].coins + 20000, msg.member.user.username], async function (error, results, fields) {
												});
											});
										}
									}
									else {
										firstembed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle('Side Mission: Hunting')
											.addFields(
												{ name: 'Hunting Side Mission', value: 'You use the iron sword and try to kill the dinosaur from upclose. It just stomps on you and you die. You have lost your tiger skin and a whole 5000 coins!', inline: false },

											);
										connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 5000, msg.member.user.username], async function (error, results, fields) {
										});
										msg.channel.send(firstembed);
										return
									}


								}

							});
						}
						else if (userMessage.content == '5') {
							connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {

								const firstembed = new Discord.MessageEmbed()
									.setColor('#0099ff')
									.setTitle('Side Mission: Hunting ABORTED')
									.addFields(
										{ name: 'Hunting Side Mission', value: 'After the close encounter with the tiger, you decide to pack up and escape while you can. After excaping the big forest, you sell your tiger hide for 10000 coins!', inline: false },

									);
								connection.query('update profiles set coins = ? where name = ?', [results[0].coins + 10000, msg.member.user.username], function (error, results, fields) {
								});
								msg.channel.send(firstembed);
							});
						}
					}

					if (userMessage.content == '3') {
						const firstembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Side Mission: Hunting')
							.addFields(
								{ name: 'Hunting Side Mission FAILURE', value: 'You shoot the deer but the tiger lunges at you. It wants its prey and won\'t let anyone take that from it. You watch as it tears apart your flesh, and then everything goes black', inline: false },

							);
						msg.channel.send(firstembed);
						return

					}


				}

	},
};