/* eslint-disable no-unused-vars */
module.exports = {
	name: 'say',
	description: 'Tell the bot to say a word in another channel!',
	execute(msg, args) {
		const client = msg.client;
		const Discord = require('discord.js');
		const mysql = require('mysql');
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'latehome4',
			database:'discord',
			charset : 'utf8mb4',
		});
            if(msg.member.permissions.has('ADMINISTRATOR')){
				var args = msg.content.split(' ').slice(2).join(' ');

				const channel = msg.mentions.channels.first();

				channel.send(args);
            }
	},
};