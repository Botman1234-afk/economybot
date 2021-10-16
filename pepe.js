/* eslint-disable no-unused-vars */
module.exports = {
	name: 'pepe',
	description: 'Catch some pepes!',
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
				var sadpepe = Math.floor((Math.random() * 50) + 1);
				var boredpepe = Math.floor((Math.random() * 10) + 1);
				var moneypepe = Math.floor((Math.random() * 10) + 1);
				var gamerpepe = Math.floor((Math.random() * 10) + 1);
				if (sadpepe < 51 && sadpepe > 0) {
					const firstembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle(':frog: Pepe Catching!')
						.addFields({ name: 'Pepes Found', value: '<:sadge:796159306361864193> ' + sadpepe + ' sad pepes\n<:pepeEyeRoll:834463046432718889> ' + boredpepe + ' bored pepes\n<a:money_pepe:811616570396508200> ' + moneypepe + ' money pepes\n<a:pepeJamming:844217589592358912> ' + gamerpepe + ' gamer pepes', inline: false }, { name: '<a:moneybag:818498411962695721> Sold For', value: `${sadpepe * 1 + boredpepe * 5 + moneypepe * 5 + gamerpepe * 5} coins!`, inline: false }, );
					msg.channel.send(firstembed);
					// msg.reply('You have caught ' + number + ' fish and sold it for $' + number * 150 + '!');
					connection.query('update profiles set coins = ? where name = ?', [results[0].coins + sadpepe * 1 + boredpepe * 5 + moneypepe * 5 + gamerpepe * 5, msg.member.user.username], function(error, results3, fields) {});
					connection.query('select * from profiles where name = ?', ['bank'], function(error, results1, fields) {

						connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - sadpepe * 1 - boredpepe * 5 - moneypepe * 5 - gamerpepe * 5, 'bank'], function(error, results, fields) {});

					});
				
				}


			

		});

},
};
