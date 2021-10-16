/* eslint-disable no-unused-vars */
module.exports = {
	name: 'become',
	description: 'Get a job',
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
        connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {

            
            if (msg.content.endsWith('youtuber')) {
                connection.query('update profiles set job = ? where name = ?', ['youtuber', msg.member.user.username], function (error, results, fields) {
                });
                msg.reply('Successfully became youtuber!');
            }
            else if (msg.content.endsWith('freelancer')) {
                connection.query('update profiles set job = ? where name = ?', ['freelancer', msg.member.user.username], function (error, results, fields) {
                });
                msg.reply('Successfully became freelancer!');

            }
            else if (msg.content.endsWith('developer')) {
                connection.query('update profiles set job = ? where name = ?', ['developer', msg.member.user.username], function (error, results, fields) {
                });

                msg.reply('Successfully became developer!');

            }
            else if (msg.content.endsWith('police')) {
                connection.query('update profiles set job = ? where name = ?', ['police', msg.member.user.username], function (error, results, fields) {
                });
                connection.query('update profiles set coins = ? where name = ?', [results[0].coins + 500, msg.member.user.username], function (error, results, fields) {
                });
                msg.reply('Successfully became police!');

            }
            else if (msg.content.endsWith('waiter')) {
                connection.query('update profiles set job = ? where name = ?', ['waiter', msg.member.user.username], function (error, results, fields) {
                });

                msg.reply('Successfully became waiter!');

            }
            else if (msg.content.endsWith('driver') && results[0].car == 1) {
                connection.query('update profiles set job = ? where name = ?', ['driver', msg.member.user.username], function (error, results, fields) {
                });
                msg.reply('Successfully became taxi driver!');

            }
            else if (msg.content.endsWith('businessman') && results[0].coins - 100 >= 0) {
                connection.query('update profiles set job = ? where name = ?', ['bussinessman', msg.member.user.username], function (error, results, fields) {
                });
                connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 100, msg.member.user.username], function (error, results, fields) {
                });
                msg.reply('Successfully became businessman and paid 100 startup cost!');

            }
            else if(!msg.content.endsWith('waiter') && !msg.content.endsWith('driver') && !msg.content.endsWith('police') && !msg.content.endsWith('developer') && !msg.content.endsWith('freelancer')){
                connection.query('select * from jobs where business = ?', [results[0].bussiness], function (error, results1, fields) {
                results1.forEach(result => {

                    if (msg.content.endsWith(result.name)) {
                        connection.query('update profiles set job = ? where name = ?', [result.name, msg.member.user.username], function (error, results, fields) {
                        });
                        msg.reply('Successfully got job!');

                    }
                });
            });
            }
            else {
                msg.reply('Either you had the wrong syntax or you don\'t own a necessary element!');
            }
        });
	},
};