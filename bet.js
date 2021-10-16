/* eslint-disable no-unused-vars */
module.exports = {
	name: 'bet',
	description: 'Gamble some coins and either win or lose!',
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
				let number = Math.floor(Math.floor(Math.random() * 100)+1);
				var args = msg.content.split(' ').slice(1).join(' ');
				
				if((args == 'max' || args == 'all') && results[0].coins >= 250000){
					args = '250000'
				}
				else if((args == 'max' || args == 'all') && results[0].coins < 250000){
					args = results[0].coins.toString()
				}
				if(parseInt(args) <= results[0].coins && results[0].coins > 0 && parseInt(args) <= 250000){
					if(number >= 50){
						let settingsembed = new Discord.MessageEmbed()
							.setColor('#2ECC71')
							.setTitle(':money_mouth: SUCCESS :money_mouth:')
							.addFields(
								{ name: msg.member.user.username, value: "You won "+(Math.floor(parseInt(args)+((number*0.01)*args))/4).toString()+' coins', inline: false },
								// { name: 'Percent Won', value: (Math.floor(parseInt(args)+((number*0.01)*args))).toString()+'%', inline: false },
								{ name: '<:softwaresat:786624255861325845> New Balance', value: Math.floor(results[0].coins +(Math.floor(parseInt(args)+((number*0.01)*args))/4)), inline: false },
								{ name: 'You Rolled:', value: Math.floor(number/16.666666666666668), inline: false },

							)
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins +(Math.floor(parseInt(args)+((number*0.01)*args))/4),msg.member.user.username], async function (error, results, fields) {
							})
							msg.channel.send(settingsembed)
					}
					else{
						let settingsembed = new Discord.MessageEmbed()
							.setColor('#f54248')
							.setTitle(':no_entry: FAILURE :no_entry:')
							.addFields(
								{ name: msg.member.user.username, value: `You lost $${args}`, inline: false },
								{ name: '<:softwaresat:786624255861325845> New Balance', value: Math.floor(results[0].coins - parseInt(args)), inline: false },
								{ name: 'You Rolled:', value: Math.floor(number/16.666666666666668), inline: false },

							)
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins - parseInt(args),msg.member.user.username], async function (error, results, fields) {
							})
							msg.channel.send(settingsembed)
					}

				}
				else{
					msg.reply('You don\'t have that many coins!')
				}
			})
	},
};