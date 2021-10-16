/* eslint-disable no-unused-vars */
module.exports = {
	name: 'invitebusiness',
	description: 'Invite someone into your softwaresat business!',
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
            var user = msg.mentions.users.first();
            connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results1, fields) {
                if (results1[0].job == 'ceo') {
                    msg.channel.send(`${user}` + ' has been invited to the business, say accept to accept this offer!');
                    const filter = m => m.author.id === user.id && m.content == 'accept';
                    const collector = msg.channel.createMessageCollector(filter, { max: 5, time: 60000 });

                    collector.on('collect', m => {
                        connection.query('update profiles set bussiness = ? where name = ?', [results1[0].bussiness, user.username], function (error, results, fields) {
                        });
                        msg.channel.send('You have been accepted into the business!');
                    });

                    collector.on('end', collected => {
                        console.log(`Collected ${collected.size} items`);
                    });

                }
                else {
                    msg.reply('You are not ceo of your company!');
                }
            });
	},
};