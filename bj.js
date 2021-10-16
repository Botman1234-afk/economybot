/* eslint-disable no-unused-vars */
module.exports = {
	name: 'bj',
	description: 'Blackjack!',
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
           	connection.query('select * from profiles where name = ?', [msg.member.user.username], async function (error, results, fields) {
				
				var args = msg.content.split(' ').slice(1).join(' ');
				if((args == 'max' || args == 'all') && results[0].coins >= 250000){
					args = '250000'
				}
				else if((args == 'max' || args == 'all') && results[0].coins < 250000){
					args = results[0].coins.toString()
				}
				if(parseInt(args) <= results[0].coins && results[0].coins != 0 && parseInt(args) <= 250000){
				let number = Math.floor(Math.floor(Math.random() * 20));
				let usernumber = number

				if(usernumber < 6){
					number = Math.floor(Math.floor(Math.random() * 20));
					usernumber = number
				}
				number = Math.floor(Math.floor(Math.random() * 20));
				let botnumber = number

				if(botnumber < 6){
					number = Math.floor(Math.floor(Math.random() * 20));
					botnumber = number
				}
				

				var tries = 2;
				const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
				const { MessageCollector } = require('discord.js-collector');
				let settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Blackjack')
							.addFields(
								{ name: msg.member.user.username, value: usernumber.toString(), inline: false },
								{ name: 'Softwaresat Bot', value: '?', inline: false },

							)
							.setFooter('Type `h` to hit, `s` to stand, and `e` to end the game');
				const botMessage = await msg.channel.send(settingsembed);
				const message1 = MessageCollector.question({
					botMessage,
					user: msg.author.id,
					onMessage: async (botMessage, message) => { // Every message sent by user will trigger this function.
						if(`${message.content}` == 'h'){
							tries++
							number = Math.floor(Math.floor(Math.random() * 15));
							usernumber = usernumber +number
							number = Math.floor(Math.floor(Math.random() * 10));

							botnumber = botnumber+number
							if(usernumber > 21){
								settingsembed = new Discord.MessageEmbed()
							.setColor('#f54248')
							.setTitle('Ended')
							.addFields(
								{ name: 'You exceeded 21!', value: "-$"+args, inline: false },

							)
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins - parseInt(args),msg.member.user.username], async function (error, results, fields) {
							})
							msg.channel.send(settingsembed)
							message1.stop()

							}
							// else if(botnumber >21){
							// 	console.log(results[0].coins)
							// 	settingsembed = new Discord.MessageEmbed()
							// .setColor('#2ECC71')
							// .setTitle('Your Opponent exceeded 21')
							// .addFields(
							// 	{ name: 'You have won '+(parseInt((args)*(botnumber*0.01))+Math.floor(parseInt(args)/3)).toString()+' coins!', value: "$"+(parseInt((args)*(botnumber*0.01))+Math.floor(parseInt(args)/3)).toString(), inline: false },

							// )
							// connection.query('update profiles set coins = ? where name = ?', [results[0].coins +(parseInt((args)*(botnumber*0.01))+Math.floor(parseInt(args)/3)),msg.member.user.username], async function (error, results, fields) {
							// })
							// msg.channel.send(settingsembed)
							// message1.stop()

							// }
								else if(usernumber == 21){
									settingsembed = new Discord.MessageEmbed()
								.setColor('#2ECC71')
								.setTitle('You have reached 21!')
								.addFields(
									{ name: 'You have won '+(parseInt((args)*(botnumber*0.01))+Math.floor(parseInt(args)/3)).toString()+' coins!', value: "$"+(parseInt((args)*(botnumber*0.01))+Math.floor(parseInt(args)/3)).toString(), inline: false },

								)
								connection.query('update profiles set coins = ? where name = ?', [results[0].coins +(parseInt((args)*(botnumber*0.01))+Math.floor(parseInt(args)/3)),msg.member.user.username], async function (error, results, fields) {
								})
								msg.channel.send(settingsembed)
								message1.stop()
							}
							else if(botnumber == 21){
								settingsembed = new Discord.MessageEmbed()
							.setColor('#f54248')
							.setTitle('Ended')
							.addFields(
								{ name: 'Your opponent reached 21 before you!', value: "-$"+args, inline: false },

							)
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins - parseInt(args),msg.member.user.username], async function (error, results, fields) {
							})
							msg.channel.send(settingsembed)
							message1.stop()

							}
							// else if(botnumber == usernumber){
							// 	settingsembed = new Discord.MessageEmbed()
							// .setColor('#F1C40F')
							// .setTitle('Tied')
							// .addFields(
							// 	{ name: 'Both of you had '+usernumber.toString()+'!', value: "No Change", inline: false },

							// )
							// msg.channel.send(settingsembed)
							// message1.stop()
							// }
							else if(tries ==5 && botnumber >=15){
								settingsembed = new Discord.MessageEmbed()
							.setColor('#2ECC71')
							.setTitle('You have drawn 5 cards!')
							.addFields(
								{ name: 'You have won '+(parseInt((args)*(botnumber*0.01))+Math.floor(parseInt(args)/3)).toString()+' coins!', value: "$"+(parseInt((args)*(botnumber*0.01))+Math.floor(parseInt(args)/3)).toString(), inline: false },

							)
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins +(parseInt((args)*(botnumber*0.01))+Math.floor(parseInt(args)/3)),msg.member.user.username], async function (error, results, fields) {
							})
							msg.channel.send(settingsembed)
							message1.stop()
							}
							else{
							settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Blackjack')
							.addFields(
								{ name: msg.member.user.username, value: usernumber.toString(), inline: false },
								{ name: 'Softwaresat Bot', value: '?', inline: false },

							)
							.setFooter('Type `h` to hit, `s` to stand, and `e` to end the game')
							botMessage.channel.send(settingsembed);
							}

						}

						else if(`${message.content}` == 's'){
							number = Math.floor(Math.floor(Math.random() * 10));

							botnumber = botnumber+number
							console.log(botnumber)
							if(botnumber >21){
								settingsembed = new Discord.MessageEmbed()
							.setColor('#2ECC71')
							.setTitle('Your Opponent Exceeded 21')
							.addFields(
								{ name: 'You have won '+(parseInt((args)*(botnumber*0.01))+Math.floor(parseInt(args)/3)).toString()+' coins!', value: "$"+(parseInt((args)*(botnumber*0.01))+Math.floor(parseInt(args)/3)).toString(), inline: false },

							)
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins +(parseInt((args)*(botnumber*0.01))+Math.floor(parseInt(args)/3)),msg.member.user.username], async function (error, results, fields) {
							})
							msg.channel.send(settingsembed)
							message1.stop()

							}
							else if(botnumber == 21){
								ssettingsembed = new Discord.MessageEmbed()
								.setColor('#f54248')
								.setTitle('Ended')
								.addFields(
									{ name: 'Your opponent got 21!', value: "-$"+args, inline: false },
	
								)
								connection.query('update profiles set coins = ? where name = ?', [results[0].coins - parseInt(args),msg.member.user.username], async function (error, results, fields) {
								})
								msg.channel.send(settingsembed)
								message1.stop()

							}
							else if(botnumber > usernumber){
								settingsembed = new Discord.MessageEmbed()
							.setColor('#f54248')
							.setTitle('Ended')
							.addFields(
								{ name: 'Opponent has higher number than you!', value: "-$"+args, inline: false },

							)
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins - parseInt(args),msg.member.user.username], async function (error, results, fields) {
							})
							msg.channel.send(settingsembed)
							message1.stop()

							}
							else if(usernumber > botnumber && usernumber < 21){
								settingsembed = new Discord.MessageEmbed()
							.setColor('#2ECC71')
							.setTitle('You have a higher number than your opponent!')
							.addFields(
								{ name: 'You have won '+(parseInt((args)*(botnumber*0.01))+Math.floor(parseInt(args)/3)).toString()+' coins!', value: "$"+(parseInt((args)*(botnumber*0.01))+Math.floor(parseInt(args)/3)).toString(), inline: false },

							)
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins +(parseInt((args)*(botnumber*0.01))+Math.floor(parseInt(args)/3)),msg.member.user.username], async function (error, results, fields) {
							})
							msg.channel.send(settingsembed)
							message1.stop()

							}
							else{
								let settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Blackjack')
							.addFields(
								{ name: msg.member.user.username, value: usernumber.toString(), inline: false },
								{ name: 'Softwaresat Bot', value: '?', inline: false },

							)
							.setFooter('Type `h` to hit, `s` to stand, and `e` to end the game');
							msg.channel.send(settingsembed)
							}
						}
						else if(`${message.content}` == 'e'){
							settingsembed = new Discord.MessageEmbed()
							.setColor('#F1C40F')
							.setTitle('Ended')
							.addFields(
								{ name: 'You decided to quit!', value: "No Change", inline: false },

							)
							msg.channel.send(settingsembed)
							message1.stop()

						}
					},
				});
			}
			else{
				msg.reply('You don\'t have that many coins!')
			}
           	})
	},
};