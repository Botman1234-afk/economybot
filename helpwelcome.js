/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
/* eslint-disable no-inline-comments */
module.exports = {
	name: 'help welcome',
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
		const { ReactionCollector } = require('discord.js-collector');
			
				const welcomehelp = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Help for welcome!')
					.setAuthor('Help', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.addFields(
						{ name: 'Set Welcome Channel', value: '"' + `${results[0].prefix}` + 'setwelcomechannel <channel without #>"', inline: false },
						{ name: 'Custom Welcome Message', value: '"' + `${results[0].prefix}` + 'setwelcomemessage <message>"', inline: false },
						{ name: 'Custom Welcome Image', value: '"' + `${results[0].prefix}` + 'setwelcomeimage <message>"', inline: false },

					);
	
						await msg.channel.send(welcomehelp)
		})
	},
};