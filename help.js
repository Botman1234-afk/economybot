/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
/* eslint-disable no-inline-comments */
module.exports = {
	name: 'help',
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
				const settingsembed1 = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Help for ' + results[0].servername + '!')
					.setAuthor('Help', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setDescription('Here you can view the different commands I can do')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.addFields(
						{ name: 'Settings', value: 'Click ⚙ or use ' + `${results[0].prefix}` + 'help settings', inline: false },
						{ name: 'Moderation', value: 'Click ⚒ or use ' + `${results[0].prefix}` + 'help moderation', inline: false },
						{ name: 'Welcome', value: 'Click 👋 or use ' + `${results[0].prefix}` + 'help welcome', inline: false },
						{ name: 'Fun', value: 'use ' + `${results[0].prefix}` + 'help fun', inline: false },
						{ name: 'Ranks', value: 'Click ⬆ or use ' + `${results[0].prefix}` + 'help ranks', inline: false },
						{ name: 'Bump', value: 'Click 🤜 or use ' + `${results[0].prefix}` + 'help bump', inline: false },
						{ name: 'Misc', value: 'use ' + `${results[0].prefix}` + 'help misc', inline: false },

					);
				const settingshelp = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Help for settings!')
					.setDescription('PLEASE GO TO http://softwaresat.onthewifi.com FOR OUR DASHBOARD')
					.setAuthor('Help', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.addFields(
						{ name: 'Check Settings', value: '"' + `${results[0].prefix}` + 'settings"', inline: false },
						{ name: 'Change Prefix', value: '"' + `${results[0].prefix}` + 'setprefix <prefix>"', inline: false },
						{ name: 'Change AutoKick Threshold', value: '"' + `${results[0].prefix}` + 'setkickthreshold <number>"', inline: false },
						{ name: 'Block everyone and here pings', value: '"' + `${results[0].prefix}` + 'setpingblock <true or false>"', inline: false },
						{ name: 'Change AutoRole for welcome', value: '"' + `${results[0].prefix}` + 'setautorole <role>"', inline: false },
						{ name: 'Turn Ranks on or off', value: '"' + `${results[0].prefix}` + 'setrank <true or false>"', inline: false },
						{ name: 'Allow Direct Messaging', value: '"' + `${results[0].prefix}` + 'setdm <true | false>"', inline: false },
						{ name: 'Set Welcome Channel', value: '"' + `${results[0].prefix}` + 'setwelcomechannel <channel without #>"', inline: false },
						{ name: 'Set Logging Channel', value: '"' + `${results[0].prefix}` + 'setlogchannel <channel without #>"', inline: false },
						{ name: 'Auto Delete for Cursing', value: '"' + `${results[0].prefix}` + 'setautodelete <true | false>"', inline: false },
						{ name: 'Auto Respond (fun-ish)', value: '"' + `${results[0].prefix}` + 'setautorespond <true | false>"', inline: false },
						{ name: 'Custom Welcome Message', value: '"' + `${results[0].prefix}` + 'setwelcomemessage <message>"', inline: false },
						{ name: 'Allow autokick', value: '"' + `${results[0].prefix}` + 'setautokick <true|false>" (Set this if you want autokick to work)', inline: false },
						{ name: 'Allows person to join back to a server if kicked from warn', value: '"' + `${results[0].prefix}` + 'setautoinvitation<true | false>" (Do this before using warning system)', inline: false },
						{ name: 'Turn Cursing Prevention On/Off', value: '"' + `${results[0].prefix}` + 'setcussing <true | false>"', inline: false },
					);
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
				const rankhelp = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Help for rank!')
					.setAuthor('Help', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.addFields(
						{ name: 'Set Ranking to True', value: '"' + `${results[0].prefix}` + 'setrank <true or false>"', inline: false },
						{ name: 'Check your level', value: '"' + `${results[0].prefix}` + 'level"', inline: false },
						{ name: 'Check server leaderboard', value: '"' + `${results[0].prefix}` + 'lb"', inline: false },

					);
				const bumphelp = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Help for bump!')
					.setAuthor('Help', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.addFields(
						{ name: 'Setup Bumping (please create channel called bump)', value: '"' + `${results[0].prefix}` + 'bumpsetup"', inline: false },
						{ name: 'Bump your ad (ever 2 hours)', value: '"' + `${results[0].prefix}` + 'bump"', inline: false },

					);
		
				

				const pages = {
					'⚙': {
						id: 'first-page', // Page id is used to navigate cross pages.
						embed: settingshelp,
						// Reactions to acess next sub-page


					},
					'⚒': {
						id: 'second-page',


						embed: moderationhelp,


					},
					'👋': {
						id: 'second-page',
						embed: welcomehelp,

					},

					'⬆': {
						id: 'second-page',
						embed: rankhelp,

					},
					'🤜': {
						id: 'second-page',
						embed: bumphelp,

					},
					

				};
				const raidedembed = new Discord.MessageEmbed()
									.setColor('#0099ff')
									.setTitle('Our support server just got raided')
									.addFields(
										{ name: 'Please join to support us', value: 'https://discord.gg/ZQCrATKhes', inline: true },
										

									);
				msg.channel.send(raidedembed)
				const botMessage =  await msg.reply(settingsembed1);
				ReactionCollector.menu({ botMessage, user: msg.author, pages });
		})
	},
};