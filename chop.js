/* eslint-disable no-unused-vars */
module.exports = {
	name: 'chop',
	description: 'Chop stuff to earn money!',
	execute(msg, args) {
		const client = msg.client;
		const Discord = require('discord.js');
		const mysql = require('mysql');
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'latehome4',
			database: 'discord',
			charset: 'utf8mb4',
		});


		connection.query('select * from profiles where name = ?', [msg.member.user.username], function(error, results, fields) {
				var num = Math.floor((Math.random() * 300) + 1);
				var logs = Math.floor((Math.random() * 50) + 1);
				var trees = Math.floor((Math.random() * 20) + 1);
				var satvik = Math.floor((Math.random() * 10) + 1);
				var user = msg.author;
				if (num < 299 && num > 0) {
					const firstembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle(':axe: Chopping!')
						.addFields({ name: 'Items Chopped', value: ':wood: ' + logs + ' logs\n:evergreen_tree: ' + trees + ' trees\n<:satvik:829391256554962965> ' + satvik + ' satviks', inline: false }, { name: '<a:moneybag:818498411962695721> Sold For', value: `${logs * 1 + trees * 5 + satvik * 5} coins!`, inline: false }, );
					msg.channel.send(firstembed);
					// msg.reply('You have caught ' + number + ' fish and sold it for $' + number * 150 + '!');
					connection.query('update profiles set coins = ? where name = ?', [results[0].coins + logs * 1 + trees * 5 + satvik * 5, msg.member.user.username], function(error, results3, fields) {});
					connection.query('select * from profiles where name = ?', ['bank'], function(error, results1, fields) {

						connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - logs * 1 - trees * 5 + 5 * satvik, 'bank'], function(error, results, fields) {});

					});
				
				}
				if (num < 301 && num > 299) {
					
					msg.channel.send(`**${msg.member.user.username}, You got the legendary pepe!!!! DM a owner for your prize!**`);
					// msg.reply('You have caught ' + number + ' fish and sold it for $' + number * 150 + '!');
					connection.query('update profiles set coins = ? where name = ?', [results[0].coins + logs * 1 + trees * 5 + satvik * 5, msg.member.user.username], function(error, results3, fields) {});
					connection.query('select * from profiles where name = ?', ['bank'], function(error, results1, fields) {

						connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - logs * 1 - trees * 5 + 5 * satvik, 'bank'], function(error, results, fields) {});

					});
				
				}


			

		});

},
};
