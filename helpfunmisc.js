/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
/* eslint-disable no-inline-comments */
module.exports = {
	name: 'help funmisc',
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

							const funmischelp = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Fun Misc Help!')
					.setAuthor('Help', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.addFields(
						{ name: 'Decrypt', value: '"' + `${results[0].prefix}` + 'decrypt <message>"', inline: false },
						{ name: 'Encrypt', value: '"' + `${results[0].prefix}` + 'encrypt <message>"', inline: false },
						{ name: 'Joke', value: '"' + `${results[0].prefix}` + 'joke"', inline: false },
						{ name: 'Lyrics', value: '"' + `${results[0].prefix}` + 'lyrics <title>."', inline: false },
						{ name: 'Pokemon', value: '"' + `${results[0].prefix}` + 'pokemon <name_of_pokemon>."', inline: false },
						{ name: 'Random Meme', value: '"' + `${results[0].prefix}` + 'meme"', inline: false },
						{ name: 'Find Relative Location of Specified IP Address', value: '"' + `${results[0].prefix}` + 'ip <ip address>"', inline: false },
						{ name: 'User Specified Image', value: '"' + `${results[0].prefix}` + 'image <term>"', inline: false },
						{ name: 'Random Image', value: '"' + `${results[0].prefix}` + 'randomimage"', inline: false },
						{ name: 'Random Dog Image', value: '"' + `${results[0].prefix}` + 'dogimage"', inline: false },
						{ name: 'Random Cat Image', value: '"' + `${results[0].prefix}` + 'catimage"', inline: false },
						{ name: 'Guess Number', value: '"' + `${results[0].prefix}` + 'guessnumber"', inline: false },
						{ name: 'Bubblewrap', value: '"' + `${results[0].prefix}` + 'bubblewrap"', inline: false },
						{ name: 'Hex Color Viewer', value: '"' + `${results[0].prefix}` + 'color"', inline: false },
						{ name: 'Pepe', value: '"' + `${results[0].prefix}` + 'pepe"', inline: false },
						{ name: 'Triggered', value: '"' + `${results[0].prefix}` + 'triggered <user>"', inline: false },
						{ name: 'Wasted', value: '"' + `${results[0].prefix}` + 'wasted <user>"', inline: false },
						{ name: 'Comment', value: '"' + `${results[0].prefix}` + 'comment <message>"', inline: false },
						{ name: 'Invert', value: '"' + `${results[0].prefix}` + 'invert <user>"', inline: false },
						{ name: 'Pixelate', value: '"' + `${results[0].prefix}` + 'pixelate <user>"', inline: false },
						{ name: 'Grade', value: '"' + `${results[0].prefix}` + 'grade"', inline: false },
					)
						
				msg.channel.send(funmischelp);
			
		})
	},
};