/* eslint-disable no-unused-vars */
module.exports = {
	name: 'edit job',
	description: 'Edit a job!',
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
		var text = msg.content.slice(10).trim().split(' ');
				connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {
					if (results[0].job == 'ceo') {
						if(text[1] <= 15000){
						connection.query('delete from jobs where name = ? and business = ?', [text[0], results[0].bussiness], function (error, results, fields) {
						});
						connection.query('insert into jobs(name,pay,requiredhours,business) values(?,?,?,?)', [text[0], text[1], text[2], results[0].bussiness], function (error, results, fields) {
						});
						msg.reply('Edited job!');
					}
					else{
						msg.reply('You cannot pay more than 15000 to employees!')
					}

					}
					else {
						msg.reply('You are not ceo of your business!');
					}
				});
	},
};