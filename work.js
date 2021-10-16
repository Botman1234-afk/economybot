/* eslint-disable no-unused-vars */
module.exports = {
	name: 'work',
	description: 'lets users work!',
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
            const nz_date_string = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
            const date_nz = new Date(nz_date_string);

            // hours as (HH) format
            const hours = ('0' + date_nz.getHours()).slice(-2);

            // minutes as (mm) format
            const minutes = ('0' + date_nz.getMinutes()).slice(-2);

            // seconds as (ss) format
            const seconds = ('0' + date_nz.getSeconds()).slice(-2);

            const time_hh_mm_ss = hours + ':' + minutes + ':' + seconds;
	

				connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {
					if (results[0] == undefined || results[0] == null) {
						connection.query('insert into profiles(name, missionnumber, coins) values(?,?,?)', [msg.member.user.username, 1, 100], function (error, results, fields) {
							msg.reply('Please choose a job first, a list can be found in the joblist!');

						});
					}
					else if (results[0].job == 'freelancer') {
						msg.reply('Please choose a job first, a list can be found in the joblist!');
					}

					if (parseInt(time_hh_mm_ss.substr(0, 2) - 1) < parseInt(results[0].lastworked.substr(0, 2)) && results[0].lastworkeddate == nz_date_string.substr(0, 10)) {
						msg.reply('You can work again in ' + (60 - minutes).toString() + ' minutes!');

					}
					else if (`${results[0].job}` == 'developer') {
						if ((results[0].lastworkeddate != nz_date_string.substr(0, 10)) && results[0].hours < 5 && results[0].lastworkeddate.toString() != '00-00-0000') {
							connection.query('update profiles set job=? where name=?', ['freelancer', msg.member.user.username], async function (error, results, fields) {


							});
								connection.query('update profiles set lastworkeddate=? where name=?', ['00-00-0000', msg.member.user.username], async function (error, results, fields) {


							});
							msg.reply('You have not worked the required hours yesterday, you have been fired!');

						}
						if (results[0].lastworkeddate != nz_date_string.substr(0, 10)) {
							connection.query('update profiles set hours=? where name=?', [0, msg.member.user.username], async function (error, results, fields) {


							});
							const errorembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Work')
						.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
							errorembed.addFields(
								{ name: 'Salary', value: 'You have earned $' + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 500).toString() + ' coins!', inline: false },
								
		
		
							);	
							msg.channel.send(errorembed)
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 500), msg.member.user.username], function (error, results, fields) {
							});
							if (results[0].bussiness != null && results[0].bussiness != undefined && results[0].bussiness != 'undefined') {
								connection.query('select * from bussiness where name = ?', [results[0].bussiness], function (error, results1, fields) {

									connection.query('update bussiness set balance = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 500), results[0].bussiness], function (error, results, fields) {
									});
								});
							}
							else {
								connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

									connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 500), 'bank'], function (error, results, fields) {
									});
								});
							}
							connection.query('update profiles set lastworked=? where name=?', [time_hh_mm_ss, msg.member.user.username], async function (error, results, fields) {


							});
							connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {

								connection.query('update profiles set hours=? where name=?', [results[0].hours + 1, msg.member.user.username], async function (error, results, fields) {


								});
							});
							connection.query('update profiles set lastworkeddate=? where name=?', [nz_date_string.substr(0, 10), msg.member.user.username], async function (error, results, fields) {


							});
						}

						else {
							const errorembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Work')
						.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
							errorembed.addFields(
								{ name: 'Salary', value: 'You have earned $' + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 500).toString() + ' coins!', inline: false },
								
		
		
							);	
							msg.channel.send(errorembed)
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 500), msg.member.user.username], function (error, results, fields) {
							});
							if (results[0].bussiness != null && results[0].bussiness != undefined && results[0].bussiness != 'undefined') {
								connection.query('select * from bussiness where name = ?', [results[0].bussiness], function (error, results1, fields) {

									connection.query('update bussiness set balance = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 500), results[0].bussiness], function (error, results, fields) {
									});
								});
							}
							else {
								connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

									connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 500), 'bank'], function (error, results, fields) {
									});
								});
							}
							connection.query('update profiles set lastworked=? where name=?', [time_hh_mm_ss, msg.member.user.username], async function (error, results, fields) {


							});
							connection.query('update profiles set hours=? where name=?', [results[0].hours + 1, msg.member.user.username], async function (error, results, fields) {


							});
							connection.query('update profiles set lastworkeddate=? where name=?', [nz_date_string.substr(0, 10), msg.member.user.username], async function (error, results, fields) {


							});
						}

					}
					else if (`${results[0].job}` == 'police') {

						if (results[0].lastworkeddate != nz_date_string.substr(0, 10)) {
							connection.query('update profiles set hours=? where name=?', [0, msg.member.user.username], async function (error, results, fields) {


							});
							const errorembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Work')
						.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
							errorembed.addFields(
								{ name: 'Salary', value: 'You have earned $' + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 300).toString() + ' coins!', inline: false },
								
		
		
							);	
							msg.channel.send(errorembed)
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 300), msg.member.user.username], function (error, results, fields) {
							});
							if (results[0].bussiness != null && results[0].bussiness != undefined && results[0].bussiness != 'undefined') {
								connection.query('select * from bussiness where name = ?', [results[0].bussiness], function (error, results1, fields) {

									connection.query('update bussiness set balance = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 300), results[0].bussiness], function (error, results, fields) {
									});
								});
							}
							else {
								connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

									connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 300), 'bank'], function (error, results, fields) {
									});
								});
							}
							connection.query('update profiles set lastworked=? where name=?', [time_hh_mm_ss, msg.member.user.username], async function (error, results, fields) {


							});
							connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {

								connection.query('update profiles set hours=? where name=?', [results[0].hours + 1, msg.member.user.username], async function (error, results, fields) {


								});
							});
							connection.query('update profiles set lastworkeddate=? where name=?', [nz_date_string.substr(0, 10), msg.member.user.username], async function (error, results, fields) {


							});
						}

						else {
							const errorembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Work')
						.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
							errorembed.addFields(
								{ name: 'Salary', value: 'You have earned $' + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 300).toString() + ' coins!', inline: false },
								
		
		
							);	
							msg.channel.send(errorembed)
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 300), msg.member.user.username], function (error, results, fields) {
							});
							if (results[0].bussiness != null && results[0].bussiness != undefined && results[0].bussiness != 'undefined') {
								connection.query('select * from bussiness where name = ?', [results[0].bussiness], function (error, results1, fields) {

									connection.query('update bussiness set balance = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 300), results[0].bussiness], function (error, results, fields) {
									});
								});
							}
							else {
								connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

									connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 300), 'bank'], function (error, results, fields) {
									});
								});
							}
							connection.query('update profiles set lastworked=? where name=?', [time_hh_mm_ss, msg.member.user.username], async function (error, results, fields) {


							});
							connection.query('update profiles set hours=? where name=?', [results[0].hours + 1, msg.member.user.username], async function (error, results, fields) {


							});
							connection.query('update profiles set lastworkeddate=? where name=?', [nz_date_string.substr(0, 10), msg.member.user.username], async function (error, results, fields) {


							});
						}

					}
					else if (`${results[0].job}` == 'driver') {

						if (results[0].lastworkeddate != nz_date_string.substr(0, 10)) {
							connection.query('update profiles set hours=? where name=?', [0, msg.member.user.username], async function (error, results, fields) {


							});
							const errorembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Work')
						.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
							errorembed.addFields(
								{ name: 'Salary', value: 'You have earned $' + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 1000).toString() + ' coins!', inline: false },
								
		
		
							);	
							msg.channel.send(errorembed)
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 1000), msg.member.user.username], function (error, results, fields) {
							});
							if (results[0].bussiness != null && results[0].bussiness != undefined && results[0].bussiness != 'undefined') {
								console.log(2);
								connection.query('select * from bussiness where name = ?', [results[0].bussiness], function (error, results1, fields) {

									connection.query('update bussiness set balance = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 1000), results[0].bussiness], function (error, results, fields) {
									});
								});
							}
							else {
								connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

									connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 1000), 'bank'], function (error, results, fields) {
									});
								});
							}
							connection.query('update profiles set lastworked=? where name=?', [time_hh_mm_ss, msg.member.user.username], async function (error, results, fields) {


							});
							connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {

								connection.query('update profiles set hours=? where name=?', [results[0].hours + 1, msg.member.user.username], async function (error, results, fields) {


								});
							});
							connection.query('update profiles set lastworkeddate=? where name=?', [nz_date_string.substr(0, 10), msg.member.user.username], async function (error, results, fields) {


							});
						}

						else {
							const errorembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Work')
						.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
							errorembed.addFields(
								{ name: 'Salary', value: 'You have earned $' + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 1000).toString() + ' coins!', inline: false },
								
		
		
							);	
							msg.channel.send(errorembed)
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 1000), msg.member.user.username], function (error, results, fields) {
							});
							if (results[0].bussiness != null && results[0].bussiness != undefined && results[0].bussiness != 'undefined') {
								connection.query('select * from bussiness where name = ?', [results[0].bussiness], function (error, results1, fields) {

									connection.query('update bussiness set balance = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 1000), results[0].bussiness], function (error, results, fields) {
									});
								});
							}
							else {
								connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

									connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 1000), 'bank'], function (error, results, fields) {
									});
								});
							}
							connection.query('update profiles set lastworked=? where name=?', [time_hh_mm_ss, msg.member.user.username], async function (error, results, fields) {


							});
							connection.query('update profiles set hours=? where name=?', [results[0].hours + 1, msg.member.user.username], async function (error, results, fields) {


							});
							connection.query('update profiles set lastworkeddate=? where name=?', [nz_date_string.substr(0, 10), msg.member.user.username], async function (error, results, fields) {


							});
						}

					}
					else if (`${results[0].job}` == 'waiter') {
						if ((results[0].lastworkeddate != nz_date_string.substr(0, 10)) && results[0].hours < 2 && results[0].lastworkeddate.toString() != '00-00-0000') {
							connection.query('update profiles set job=? where name=?', ['freelancer', msg.member.user.username], async function (error, results, fields) {


							});
							msg.reply('You have not worked the required hours yesterday, you have been fired!');

						}
						if (results[0].lastworkeddate != nz_date_string.substr(0, 10)) {
							connection.query('update profiles set hours=? where name=?', [0, msg.member.user.username], async function (error, results, fields) {


							});
							var number = Math.floor(Math.random() * 100) + 1;
							if (number <= 30) {
								console.log(2);
								const errorembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Work')
						.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
							errorembed.addFields(
								{ name: 'Salary', value: 'You have earned $' + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 100 + 1000).toString() + ' coins!', inline: false },
								
		
		
							);	
							msg.channel.send(errorembed)
								connection.query('update profiles set coins = ? where name = ?', [results[0].coins + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 100 + 1000), msg.member.user.username], function (error, results, fields) {
								});
								if (results[0].bussiness != null && results[0].bussiness != undefined && results[0].bussiness != 'undefined') {
									connection.query('select * from bussiness where name = ?', [results[0].bussiness], function (error, results1, fields) {

										connection.query('update bussiness set balance = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 100 + 1000), results[0].bussiness], function (error, results, fields) {
										});
									});
								}
								else {
									connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

										connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 100 + 1000), 'bank'], function (error, results, fields) {
										});
									});
								}

							}
							else {
								const errorembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Work')
						.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
							errorembed.addFields(
								{ name: 'Salary', value: 'You have earned $' + ((results[0].stocks * 50) + (results[0].computer * 200) + 100).toString() + ' coins!', inline: false },
								
		
		
							);	
							msg.channel.send(errorembed)
								connection.query('update profiles set coins = ? where name = ?', [results[0].coins + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 100), msg.member.user.username], function (error, results, fields) {
								});
								if (results[0].bussiness != null && results[0].bussiness != undefined && results[0].bussiness != 'undefined') {
									connection.query('select * from bussiness where name = ?', [results[0].bussiness], function (error, results1, fields) {

										connection.query('update bussiness set balance = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 100 + 1000), results[0].bussiness], function (error, results, fields) {
										});
									});
								}
								else {
									connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

										connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 100 + 1000), 'bank'], function (error, results, fields) {
										});
									});
								}
							}
							connection.query('update profiles set lastworked=? where name=?', [time_hh_mm_ss, msg.member.user.username], async function (error, results, fields) {


							});

							connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {

								connection.query('update profiles set hours=? where name=?', [results[0].hours + 1, msg.member.user.username], async function (error, results, fields) {


								});
							});
							connection.query('update profiles set lastworkeddate=? where name=?', [nz_date_string.substr(0, 10), msg.member.user.username], async function (error, results, fields) {


							});
						}

						else {
							const errorembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Work')
						.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
							errorembed.addFields(
								{ name: 'Salary', value: 'You have earned $' + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 100).toString() + ' coins!', inline: false },
								
		
		
							);	
							msg.channel.send(errorembed)
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 100), msg.member.user.username], function (error, results, fields) {
							});
							if (results[0].bussiness != null && results[0].bussiness != undefined && results[0].bussiness != 'undefined') {
								connection.query('select * from bussiness where name = ?', [results[0].bussiness], function (error, results1, fields) {

									connection.query('update bussiness set balance = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 100), results[0].bussiness], function (error, results, fields) {
									});
									connection.query('update bussiness set stockvalue = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 100), results[0].bussiness], function (error, results, fields) {
									});
								});
							}
							else {
								connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

									connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 100), 'bank'], function (error, results, fields) {
									});
								});
							}
							connection.query('update profiles set lastworked=? where name=?', [time_hh_mm_ss, msg.member.user.username], async function (error, results, fields) {


							});
							connection.query('update profiles set hours=? where name=?', [results[0].hours + 1, msg.member.user.username], async function (error, results, fields) {


							});
							connection.query('update profiles set lastworkeddate=? where name=?', [nz_date_string.substr(0, 10), msg.member.user.username], async function (error, results, fields) {


							});
						}
					}
					else {
						connection.query('select * from jobs where business = ? and name = ?', [results[0].bussiness, `${results[0].job}`], function (error, results1, fields) {
							if ((results[0].lastworkeddate != nz_date_string.substr(0, 10)) && results[0].hours < results1[0].requiredhours && results[0].lastworkeddate.toString() != '00-00-0000') {
								connection.query('update profiles set job=? where name=?', ['freelancer', msg.member.user.username], async function (error, results, fields) {


								});
								connection.query('update profiles set bussiness=? where name=?', ['none', msg.member.user.username], async function (error, results, fields) {


								});
								msg.reply('You have not worked the required hours yesterday, you have been fired!');

							}
							if (results[0].lastworkeddate != nz_date_string.substr(0, 10)) {
								connection.query('update profiles set hours=? where name=?', [0, msg.member.user.username], async function (error, results, fields) {


								});
								const errorembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Work')
						.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
							errorembed.addFields(
								{ name: 'Salary', value: 'You have earned $' + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + results1[0].pay).toString() + ' coins!', inline: false },
								
		
		
							);	
							msg.channel.send(errorembed)
								connection.query('update profiles set coins = ? where name = ?', [results[0].coins + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + results1[0].pay), msg.member.user.username], function (error, results, fields) {
								});
								connection.query('select * from bussiness where name = ?', [results[0].bussiness], function (error, results2, fields) {

									connection.query('update bussiness set balance = ? where name = ?', [results2[0].balance + (results1[0].pay*0.25), results[0].bussiness], function (error, results, fields) {
									});
									connection.query('update bussiness set stockvalue = ? where name = ?', [results2[0].stockvalue + (results1[0].pay*0.25), results[0].bussiness], function (error, results, fields) {
									});
								});
								connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

									connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200)), 'bank'], function (error, results, fields) {
									});
								});


								connection.query('update profiles set lastworked=? where name=?', [time_hh_mm_ss, msg.member.user.username], async function (error, results, fields) {


								});
								connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {

									connection.query('update profiles set hours=? where name=?', [results[0].hours + 1, msg.member.user.username], async function (error, results, fields) {


									});
								});
								connection.query('update profiles set lastworkeddate=? where name=?', [nz_date_string.substr(0, 10), msg.member.user.username], async function (error, results, fields) {


								});
							}

							else {
								const errorembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Work')
						.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
							errorembed.addFields(
								{ name: 'Salary', value: 'You have earned $' + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + results1[0].pay).toString() + ' coins!', inline: false },
								
		
		
							);	
							msg.channel.send(errorembed)
								connection.query('update profiles set coins = ? where name = ?', [results[0].coins + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + results1[0].pay), msg.member.user.username], function (error, results, fields) {
								});
								connection.query('select * from bussiness where name = ?', [results[0].bussiness], function (error, results2, fields) {

									connection.query('update bussiness set balance = ? where name = ?', [results2[0].balance + ((results1[0].pay*0.25-(results[0].workspace * 400))), results[0].bussiness], function (error, results, fields) {
									});
									connection.query('update bussiness set stockvalue = ? where name = ?', [results2[0].stockvalue + (results1[0].pay*0.25), results[0].bussiness], function (error, results, fields) {
									});
								});
								connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

									connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200)), 'bank'], function (error, results, fields) {
									});
								});

								connection.query('update profiles set lastworked=? where name=?', [time_hh_mm_ss, msg.member.user.username], async function (error, results, fields) {


								});
								connection.query('update profiles set hours=? where name=?', [results[0].hours + 1, msg.member.user.username], async function (error, results, fields) {


								});
								connection.query('update profiles set lastworkeddate=? where name=?', [nz_date_string.substr(0, 10), msg.member.user.username], async function (error, results, fields) {


								});
							}


						});
					}

				});
        

	},
};