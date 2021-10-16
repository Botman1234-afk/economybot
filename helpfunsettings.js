/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
/* eslint-disable no-inline-comments */
module.exports = {
	name: 'help funsettings',
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

						const funsettingshelp = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Fun Settings Help!')
					.setAuthor('Help', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.addFields(
						
							{ name: 'Dm Notifications (false = yes and true = no)', value: '"' + `${results[0].prefix}` + 'blockdm <true or false>', inline: false },
							{ name: 'Reset Account (use it if you have a large loan and can\'t pay it)', value: '"' + `${results[0].prefix}` + 'resetaccount', inline: false },


						)
					

			msg.channel.send(funsettingshelp);
			
		})
	},
};