/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
/* eslint-disable no-inline-comments */
module.exports = {
	name: 'help misc',
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
		
			
				const mischelp = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Misc Help Page 1!')
					.setAuthor('Help', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.addFields(
						{ name: 'Support Server', value: '"' + `${results[0].prefix}` + 'server"', inline: false },
						{ name: 'Upvote', value: '"' + `${results[0].prefix}` + 'vote"', inline: false },
						{ name: 'Top.gg', value: '"' + `${results[0].prefix}` + 'top.gg"', inline: false },
						{ name: 'stats', value: '"' + `${results[0].prefix}` + 'stats"', inline: false },
						{ name: 'Link to our Website', value: '"' + `${results[0].prefix}` + 'helpwebsite"', inline: false },
						{ name: 'Information About Satvik', value: '"' + `${results[0].prefix}` + 'whoissatvik"', inline: false },
						{ name: 'Information About Aryav', value: '"' + `${results[0].prefix}` + 'whoisaryav"', inline: false },
						{ name: 'Information About Our Bot', value: '"' + `${results[0].prefix}` + 'whatisthis"', inline: false },
						{ name: 'View Your Server\'s Settings', value: '"' + `${results[0].prefix}` + 'settings (This also create a profile for you server so do this first)"', inline: false },
						{ name: 'Check Warnings For a Person', value: '"' + `${results[0].prefix}` + 'notices <@mention user>"', inline: false },
						{ name: 'Suggest something for the bot', value: '"' + `${results[0].prefix}` + 'suggest <Suggestion>" (Please do not spam)', inline: false },
						{ name: 'Get a link to invite the Softwaresat Bot to your server', value: '"' + `${results[0].prefix}` + 'invite"', inline: false },
						{ name: 'Get a link to your server', value: '"' + `${results[0].prefix}` + 'link" (You can use this link to invite others to your server)', inline: false },
						{ name: 'Add a ticket', value: '"' + `${results[0].prefix}` + 'ticket" (Go to Softwaresat Bot Official Server and to #support. Then use this function. After that state you problem.)', inline: false },
						{ name: 'Ping', value: '"' + `${results[0].prefix}` + 'ping" (Checks how long it takes for the bot to respond to you)', inline: false },
						{ name: 'Prefix', value: '".prefix" (Tells you what your prefix is)', inline: false },
						{ name: 'Ping', value: '"' + `${results[0].prefix}` + 'userinfo" <mention person>', inline: false },
						{ name: 'Weather', value: '"' + `${results[0].prefix}` + 'weather" <city name>', inline: false },
						{ name: 'Echo Embed', value: '"' + `${results[0].prefix}` + 'echo <title> <mention channel> <message>"', inline: false },
						{ name: 'Say', value: '"' + `${results[0].prefix}` + 'say" <mention channel name> <message>', inline: false },
						{ name: 'Server Info (created by Mooncake#6969)', value: '"' + `${results[0].prefix}` + 'serverinfo"', inline: false },
						{ name: 'Emojis from our servers', value: '"' + `${results[0].prefix}` + 'emoji <emojiname>"', inline: false },
						{ name: 'Check invites', value: '"' + `${results[0].prefix}` + 'invites"', inline: false },
						{ name: 'Check invites for someone else', value: '"' + `${results[0].prefix}` + 'invites <mention person>"', inline: false },

					);
					const mischelp2 = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Misc Help Page 2!')
					.setAuthor('Help', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.addFields(
						{ name: 'Save your Server\'s Layout', value: '"' + `${results[0].prefix}` + 'import template"', inline: false },
						{ name: 'See a list of server templates', value: '"' + `${results[0].prefix}` + 'templates"', inline: false },
						{ name: 'Use a server template on your pre-existing server', value: '"' + `${results[0].prefix}` + 'use template <template name found in templates comand>"', inline: false },
						{ name: 'Reaction Roles Wizard', value: '"' + `${results[0].prefix}` + 'reactionrole"', inline: false },

					);

					const botMessage = await msg.channel.send('Need help? Here list with all my commands!');
				ReactionCollector.paginator({
					botMessage,
					user: msg.author,
					pages: [
						mischelp,
						mischelp2,
				
					],
					collectorOptions: {
						time: 60000
					}
				});
				

		})
	},
};