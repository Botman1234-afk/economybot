/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
/* eslint-disable no-inline-comments */
module.exports = {
	name: 'help settings',
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
				
						await msg.channel.send(settingshelp)
				

		})
	},
};