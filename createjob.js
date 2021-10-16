/* eslint-disable no-unused-vars */
module.exports = {
	name: 'create job',
	description: 'Create a job!',
	args: true,
	usage: '<name> <pay> <requiredhours>',
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
        var text = msg.content.slice(12).trim().split(' ');
        connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {
            if (results[0].job == 'ceo') {
                if(text[1] <= 15000){
                connection.query('insert into jobs(name,pay,requiredhours,business) values(?,?,?,?)', [text[0], text[1], text[2], results[0].bussiness], function (error, results, fields) {
                });
                msg.reply('Created job!');
            }
            else{
                msg.reply('You cannot create a job with higher than 15000, if you want to pay your employees more, give money directly or items!')
            }
            }
            else {
                msg.reply('You are not ceo of your business!');
            }
        });

	},
};