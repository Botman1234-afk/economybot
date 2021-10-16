/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
/* eslint-disable no-inline-comments */
module.exports = {
	name: 'help moderation',
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
			
				const moderationhelp = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Help for moderation!')
					.setAuthor('Help', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.addFields(
						{ name: 'Warn', value: '"' + `${results[0].prefix}` + 'warn <@mention user>"', inline: false },
						{ name: 'Delete Warnings', value: '"' + `${results[0].prefix}` + 'purgenotices <mention user>"', inline: false },
						{ name: 'Check Warnings', value: '"' + `${results[0].prefix}` + 'notices <mention person>"', inline: false },
						{ name: 'Kick a User', value: '"' + `${results[0].prefix}` + 'kick <@mention user>"', inline: false },
						{ name: 'Ban a User', value: '"' + `${results[0].prefix}` + 'ban <@mention user>"', inline: false },
						{ name: 'Mute a User', value: '"' + `${results[0].prefix}` + 'mute <@mention user>"', inline: false },
						{ name: 'Unmute a User', value: '"' + `${results[0].prefix}` + 'unmute <@mention user>"', inline: false },
						{ name: 'Delete Messages', value: '"' + `${results[0].prefix}` + 'delete <number of messages>" (99 at a time not including sdelete message)', inline: false },
						{ name: 'Direct Messaging', value: '"' + `${results[0].prefix}` + 'dm <@mention user> <message>"', inline: false },
						{ name: 'Add certain role to everybody in server', value: '"' + `${results[0].prefix}` + 'roleall <role name without mention> (may take upto 10 mins)"', inline: false },
						{ name: 'Lock Channel', value: '"' + `${results[0].prefix}` + 'lockdown"', inline: false },
						{ name: 'Unlock Channel', value: '"' + `${results[0].prefix}` + 'unlock"', inline: false },
						{ name: 'Lock Server', value: '"' + `${results[0].prefix}` + 'lockdownall"', inline: false },
						{ name: 'Unlock Server', value: '"' + `${results[0].prefix}` + 'unlockall"', inline: false },



					);
		
						await msg.channel.send(moderationhelp)
				



			
		
				
		})
	},
};