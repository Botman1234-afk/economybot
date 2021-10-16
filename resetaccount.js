/* eslint-disable no-unused-vars */
module.exports = {
	name: 'resetaccount',
	description: 'Reset your account!',
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
		connection.query('delete from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {
		});
		connection.query('delete from stocks where name = ?', [msg.member.user.username], function (error, results, fields) {
		});
		connection.query('delete from bussiness where owner = ?', [msg.member.user.username], function (error, results, fields) {
		});
		connection.query('insert into profiles(name, missionnumber, coins) values(?,?,?)', [msg.member.user.username, 1, 100], function (error, results, fields) {
		})
		
		msg.reply('Successfully reset your account!');
	},
};