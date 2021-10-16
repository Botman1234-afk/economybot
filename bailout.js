/* eslint-disable no-unused-vars */
module.exports = {
	name: 'bailout',
	description: 'If your business is bankrupt, do this to reset!',
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
		connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {
            connection.query('update bussiness set balance = ? where name = ?', [50000, results[0].bussiness], function (error, results, fields) {
            });
            connection.query('update bussiness set stockvalue = ? where name = ?', [50000, results[0].bussiness], function (error, results, fields) {
            });
            connection.query('update profiles set loan = ? where name = ?', [results[0].loan + 50000, msg.member.user.username], function (error, results, fields) {
            });
            connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {
                connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - 50000, results[0].bussiness], function (error, results, fields) {
                });
            });
        });
        msg.reply('Successfully bailed out business, thank the bank!');
	},
};