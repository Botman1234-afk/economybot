/* eslint-disable no-unused-vars */
module.exports = {
	name: 'buy stocks',
	description: 'Buy stocks!',
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
		var text = msg.content.split(' ').slice(2).join(' ');

				if (text == [] || text == '[]') {
					msg.reply('What business were you going to invest in');
				}
				else {
					connection.query('select * from stocks where business = ?', [text], function (error, results2, fields) {
						connection.query('select * from stocks where name = ? and business = ?', [msg.member.user.username, text], function (error, results6, fields) {
							console.log(results6);
							connection.query('select * from bussiness where name = ?', [text], function (error, results3, fields) {
								connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results5, fields) {
									if (results3[0] != undefined && results3[0] != null) {

										let number = 0;
										results2.forEach(result => {
											number = number + result.number;
										});
										connection.query('update profiles set coins = ? where name = ?', [Math.floor(results5[0].coins - results3[0].stockvalue / number), msg.member.user.username], function (error, results, fields) {
										});
										if (results6[0] != undefined && results6[0] != null) {
											connection.query('update stocks set number = ? where name = ? and business = ?', [results6[0].number + 1, msg.member.user.username, text], function (error, results, fields) {
											});
											connection.query('update bussiness set balance = ? where name = ?', [results3[0].balance + Math.floor(results3[0].stockvalue / number), text], function (error, results, fields) {
											});
											connection.query('update bussiness set stockvalue = ? where name = ?', [results3[0].stockvalue + Math.floor(results3[0].stockvalue / number), text], function (error, results, fields) {
											});
										}
										else {
											console.log(2);
											connection.query('insert into stocks(name, business, number) values(?,?,?)', [msg.member.user.username, text, 1], function (error, results, fields) {
											});
											connection.query('update bussiness set balance = ? where name = ?', [results3[0].balance + Math.floor(results3[0].stockvalue / number), text], function (error, results, fields) {
											});
											connection.query('update bussiness set stockvalue = ? where name = ?', [results3[0].stockvalue + Math.floor(results3[0].stockvalue / number), text], function (error, results, fields) {
											});
										}


										connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

										});
										msg.reply('Successfully purchased stocks!');

									}
									else {
										msg.reply('The specified business does not exist!')
									}
								});
							});
						});
					});
				}
	},
};