/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
/* eslint-disable no-inline-comments */
module.exports = {
	name: 'help funotherincome',
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

						const funotherincome = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Fun Other Income Help!')
					.setAuthor('Help', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.addFields(
						
						{ name: 'Mine', value: '"' + `${results[0].prefix}` + 'mine"', inline: false },
						{ name: 'Chop', value: '"' + `${results[0].prefix}` + 'chop"', inline: false },
						{ name: 'Fish', value: '"' + `${results[0].prefix}` + 'fish"', inline: false },
						{ name: 'Pepe', value: '"' + `${results[0].prefix}` + 'pepe"', inline: false },
						{ name: 'Bailout Business', value: '"' + `${results[0].prefix}` + 'bailout', inline: false },
						{ name: 'Invite to business', value: '"' + `${results[0].prefix}` + 'invitebusiness <mention person>', inline: false },
						{ name: 'Take a loan (auto-pays off every day for 10 days)', value: '"' + `${results[0].prefix}` + 'loan <amount less than 100k>', inline: false },
						{ name: 'Pay Loan', value: '"' + `${results[0].prefix}` + 'pay <amount>', inline: false },
						{ name: 'Check your Business', value: '"' + `${results[0].prefix}` + 'business', inline: false },
						{ name: 'Create Business', value: '"' + `${results[0].prefix}` + 'create business <name (3 words long)>', inline: false },
							{ name: 'List of employees in your business', value: '"' + `${results[0].prefix}` + 'employees', inline: false },
						{ name: 'Delete Job', value: '"' + `${results[0].prefix}` + 'purge job <job name>', inline: false },
						{ name: 'Edit Job', value: '"' + `${results[0].prefix}` + 'edit job <job name> <job pay> <job required hours>', inline: false },
						{ name: 'Fire People From Business', value: '"' + `${results[0].prefix}` + 'fire <mention person>', inline: false },
							{ name: 'Withdraw from your Business', value: '"' + `${results[0].prefix}` + 'bwithdraw <amount>"', inline: false },
						{ name: 'Deposit into your Business', value: '"' + `${results[0].prefix}` + 'bdeposit <amount>"', inline: false },
												{ name: 'Hunting', value: '"' + `${results[0].prefix}` + 'hunt"', inline: false },
	{ name: 'Work (once per hour)', value: '"' + `${results[0].prefix}` + 'work', inline: false },
						{ name: 'Set Job', value: '"' + `${results[0].prefix}` + 'become <job>', inline: false },
						{ name: 'Job list', value: '"' + `${results[0].prefix}` + 'joblist', inline: false },
						)
						
				msg.channel.send(funotherincome);
			
		})
	},
};