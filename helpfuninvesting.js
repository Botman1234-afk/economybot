/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
/* eslint-disable no-inline-comments */
module.exports = {
	name: 'help funinvesting',
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
	
						const funinvestinghelp = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Fun Investing Help!')
					.setAuthor('Help', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.addFields(
						
							{ name: 'Sell stocks', value: '"' + `${results[0].prefix}` + 'sell <business name> <amount>', inline: false },
						{ name: 'Sell houses', value: '"' + `${results[0].prefix}` + 'sell <house name>', inline: false },
						{ name: 'Easy Investing Wizard', value: '"' + `${results[0].prefix}` + 'invest"', inline: false },
						{ name: 'Buy Stocks', value: '"' + `${results[0].prefix}` + 'buy stocks <business name>', inline: false },
						{ name: 'Real Estate Market', value: '"' + `${results[0].prefix}` + 'housingmarket', inline: false },
						{ name: 'Buy House', value: '"' + `${results[0].prefix}` + 'buy <house id>', inline: false },
						{ name: 'Stock Market', value: '"' + `${results[0].prefix}` + 'market', inline: false },
						{ name: 'Stock Info', value: '"' + `${results[0].prefix}` + 'info <business name>', inline: false },
						)
							

				msg.channel.send(funinvestinghelp);
				
		})
	},
};