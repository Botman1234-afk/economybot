/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
/* eslint-disable no-inline-comments */
module.exports = {
	name: 'help funbal',
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
	
						const funbalhelp = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Fun Bal Help!')
					.setAuthor('Help', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.addFields(
						{ name: 'Profile', value: '"' + `${results[0].prefix}` + 'bal"', inline: false },
						{ name: 'Check your Business', value: '"' + `${results[0].prefix}` + 'business', inline: false },
						{ name: 'Info', value: '"' + `${results[0].prefix}` + 'info <business name>', inline: false },
						{ name: 'Global money leaderboard', value: '"' + `${results[0].prefix}` + 'glb', inline: false },
						{ name: 'Check your net profit and bank statement', value: '"' + `${results[0].prefix}` + 'check', inline: false },


						)

				msg.channel.send(funbalhelp);
			
		})
	},
};