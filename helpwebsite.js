/* eslint-disable no-unused-vars */
module.exports = {
	name: 'helpwebsite',
	description: 'Get the URL for our website for support!',
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
		msg.reply('Our website has a lot of useful information. Here is the link to it:\n\n https://softwaresatbot.weebly.com/');
	},
};