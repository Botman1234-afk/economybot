/* eslint-disable no-unused-vars */
module.exports = {
	name: 'whoistarun',
	description: 'Find out who tarun is!',
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
		})				
		msg.reply('ThyMaster555 is a wizard. He brews cool potions and spells in his free time. He is friends with Satvik. He has dueled against Gandalf and won mutiple times! He was also the real person who killed Voldemort. He has even won duels against Dumbledore!');

	},
};