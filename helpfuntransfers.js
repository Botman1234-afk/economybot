/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
/* eslint-disable no-inline-comments */
module.exports = {
	name: 'help funtransfers',
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

						const funtransfers = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Fun Transfers Help!')
					.setAuthor('Help', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.addFields(
						
					{ name: 'Give Money', value: '"' + `${results[0].prefix}` + 'give <mention person> <amount in coins>', inline: false },
					{ name: 'Gift Items', value: '"' + `${results[0].prefix}` + 'gift <amount> <item> <mention person gaining>', inline: false },
					{ name: 'Withdraw from your Business', value: '"' + `${results[0].prefix}` + 'bwithdraw <amount>"', inline: false },
					{ name: 'Deposit into your Business', value: '"' + `${results[0].prefix}` + 'bdeposit <amount>"', inline: false },
					{ name: 'Deposit', value: '"' + `${results[0].prefix}` + 'deposit <amount>', inline: false },
					{ name: 'Withdraw', value: '"' + `${results[0].prefix}` + 'withdraw <amount>', inline: false },
						)
						
				msg.channel.send(funtransfers);
			
		})
	},
};