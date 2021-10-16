/* eslint-disable no-unused-vars */
module.exports = {
	name: 'vote',
	description: 'vote for the bot',
	async execute(msg, args) {
		const client = msg.client;
		const mysql = require('mysql');
        const Discord = require('discord.js')
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'latehome4',
			database:'discord',
			charset : 'utf8mb4',
		});
        const settingsembed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.addFields(
						{ name: 'Upvote Our Bot', value: 'To upvote our bot, use this link:\n\n https://top.gg/bot/760654790522568735/vote', inline: true },
					);
				msg.channel.send(settingsembed);
	},
};