/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
/* eslint-disable no-inline-comments */
module.exports = {
	name: 'help funbuying',
	description: 'Ping!',
	async execute(msg, args) {
		const Discord = require('discord.js');
		const mysql = require('mysql');
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'latehome4',
			database:'discord',
			charset : 'utf8mb4',
		});

		const client = msg.client;
				connection.query('select * from settings where servername = ?', [msg.guild.name], async function (error, results, fields) {

						const funbuyinghelp = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Fun Buying Help!')
					.setAuthor('Help', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.addFields(
						
						{ name: 'Buy item in campaign', value: '"' + `${results[0].prefix}` + 'buy <item id>"', inline: false },
						{ name: 'Buy Stocks', value: '"' + `${results[0].prefix}` + 'buy stocks <business name>', inline: false },
						{ name: 'Shop', value: '"' + `${results[0].prefix}` + 'shop"', inline: false },
						{ name: 'Stock Market', value: '"' + `${results[0].prefix}` + 'market', inline: false },
						{ name: 'Real Estate Market', value: '"' + `${results[0].prefix}` + 'housingmarket', inline: false },
						{ name: 'Subscriptions', value: '"' + `${results[0].prefix}` + 'subscriptions', inline: false },


						)
						
			msg.channel.send(funbuyinghelp);
				
		})
	},
};