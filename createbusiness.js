/* eslint-disable no-unused-vars */
module.exports = {
	name: 'create business',
	description: 'Create a business!',
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
		var text = msg.content.slice(16).trim().split(' ');
				connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {
					if (results[0].coins >= 50000 && text.length == 3) {
						connection.query('insert into bussiness(name,owner) values(?,?)', [text[0]+' '+text[1]+' '+text[2], msg.member.user.username], function (error, results, fields) {
						});
						connection.query('insert into stocks(name,business,number) values(?,?,?)', [msg.member.user.username, text[0]+' '+text[1]+' '+text[2], 100], function (error, results, fields) {
						});
						connection.query('update profiles set coins=? where name = ?', [results[0].coins - 50000, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set bussiness=? where name = ?', [text[0]+' '+text[1]+' '+text[2].toString(), msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set job=? where name = ?', ['ceo', msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update bussiness set stockvalue=? where name = ?', [50000, text[0]+' '+text[1]+' '+text[2]], function (error, results, fields) {
						});
						msg.reply('Created business');

					}
					else {
						msg.reply('You do not have 50000 in funds for setting up a bussiness or your business name isn\'t 3 words long!');
					}
				});

	},
};