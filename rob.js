/* eslint-disable no-unused-vars */
module.exports = {
	name: 'rob',
	description: 'Pay your loan!',
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
	const user = msg.mentions.users.first();
    					connection.query('select * from profiles where name = ?', [user.username], function (error, results1, fields) {
                if(results1[0].robbinginsurance != '00-00-0000'){
                  msg.reply('Sorry, this person has Robbing Insurance')
                  return
                }
                else{
                  var number = Math.floor((Math.random() * 100) + 1);
				if (user.username == 'bank') {
					msg.reply('You can\'t rob this person, in fact, he is the one who pays you!');
				}
				else if (number >= 60) {
					if (number >= 80) {
						connection.query('select * from profiles where name = ?', [user.username], function (error, results, fields) {
								const firstembed = new Discord.MessageEmbed()
										firstembed.setColor('#0099ff')
										firstembed.setTitle('Robbing!')
										firstembed.addFields({ name: 'Person Stolen From', value: `${user}` , inline: false },);
										firstembed.addFields({ name: 'Amount Stolen', value: `${parseInt(results[0].coins * 0.15).toString()}` + ' coins!' , inline: false },);
							msg.channel.send(firstembed);
							// msg.reply('You have stolen ' + parseInt(results[0].coins * 0.15).toString() + ' coins');
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins - parseInt(results[0].coins * 0.85), user.username], function (error, results3, fields) {
								connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results1, fields) {
									connection.query('update profiles set coins = ? where name = ?', [parseInt(results1[0].coins + results[0].coins * 0.15), msg.member.user.username], function (error, results, fields) {
									});
								});
							});
						});

					}
					else {

						connection.query('select * from profiles where name = ?', [user.username], function (error, results, fields) {
							const firstembed = new Discord.MessageEmbed()
											firstembed.setColor('#0099ff')
											firstembed.setTitle('Robbing!')
											firstembed.addFields({ name: 'Person Stolen From', value: `${user}` , inline: false },);
											firstembed.addFields({ name: 'Amount Stolen', value: `${parseInt(results[0].coins * 0.15).toString()}` + ' coins!' , inline: false },);
							msg.channel.send(firstembed);
							// msg.reply('You have stolen ' + parseInt(results[0].coins * 0.35).toString() + ' coins');

							connection.query('update profiles set coins = ? where name = ?', [results[0].coins - parseInt(results[0].coins * 0.65), user.username], function (error, results, fields) {
							});
							connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results1, fields) {
								connection.query('update profiles set coins = ? where name = ?', [parseInt(results1[0].coins + results[0].coins * 0.35), msg.member.user.username], function (error, results, fields) {
								});
							});

						});

					}
				}
				else {
        
					const member = msg.mentions.users.first();
					connection.query('select * from profiles where name = ?', [user.username], function (error, results1, fields) {
						connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results5, fields) {
               if(results5[0].thievesinsurance != '00-00-0000'){
                 const firstembed = new Discord.MessageEmbed()
								firstembed.setColor('#0099ff')
								firstembed.setTitle('Robbing!')
								firstembed.addFields({ name: 'Person Stolen From', value: `${user}` , inline: false },);
								firstembed.addFields({ name: 'Amount Fined', value: `${(parseInt(results1[0].coins * 0.15)/2).toString()}` + ' coins!' , inline: false },);
							msg.channel.send(firstembed);
							// msg.reply('You have been caught and fined ' + parseInt(results1[0].coins * 0.15).toString() + ' coins');

							connection.query('update profiles set coins = ? where name = ?', [results5[0].coins - (parseInt(results1[0].coins * 0.15)/2), msg.member.user.username], function (error, results, fields) {
							});
							connection.query('select * from profiles where name = ?', ['bank'], function (error, results2, fields) {

								connection.query('update profiles set coins = ? where name = ?', [results2[0].coins + (parseInt(results1[0].coins * 0.15)/2), 'bank'], function (error, results, fields) {
								});
							});
					
                }
              else{
                
              
							const firstembed = new Discord.MessageEmbed()
								firstembed.setColor('#0099ff')
								firstembed.setTitle('Robbing!')
								firstembed.addFields({ name: 'Person Stolen From', value: `${user}` , inline: false },);
								firstembed.addFields({ name: 'Amount Fined', value: `${parseInt(results1[0].coins * 0.15).toString()}` + ' coins!' , inline: false },);
							msg.channel.send(firstembed);
							// msg.reply('You have been caught and fined ' + parseInt(results1[0].coins * 0.15).toString() + ' coins');

							connection.query('update profiles set coins = ? where name = ?', [results5[0].coins - parseInt(results1[0].coins * 0.15), msg.member.user.username], function (error, results, fields) {
							});
							connection.query('select * from profiles where name = ?', ['bank'], function (error, results2, fields) {

								connection.query('update profiles set coins = ? where name = ?', [results2[0].coins + parseInt(results1[0].coins * 0.15), 'bank'], function (error, results, fields) {
								});
							});
              }
						});
					});
          
				}
				connection.query('select * from profiles where name = ?', [user.username], function (error, results, fields) {

				if(results[0].dmblock == 0){
					const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Robbed!')
								.addFields({ name: 'Amount Robbed', value: 'You have been robbed!' , inline: false },);
					user.send(firstembed);
					// user.send('You have been robbed!')
				}
			})
                }
              })
				
	},
};