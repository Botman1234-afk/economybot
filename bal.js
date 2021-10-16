/* eslint-disable no-unused-vars */
module.exports = {
	name: 'bal',
	description: 'Ping!',
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
		const Canvas = require('canvas')
	function daily(msg){
	const nz_date_string = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
		const date_nz = new Date(nz_date_string);

		// hours as (HH) format
		const hours = ('0' + date_nz.getHours()).slice(-2);

		// minutes as (mm) format
		const minutes = ('0' + date_nz.getMinutes()).slice(-2);

		// seconds as (ss) format
		const seconds = ('0' + date_nz.getSeconds()).slice(-2);

		const time_hh_mm_ss = hours + ':' + minutes + ':' + seconds;
		connection.query('select * from profiles where name = ?',[msg.member.user.username], async function (error, results2, fields) {

				// console.log(result.bankmembership.substr(2,2))

				if (results2[0].userid != undefined && results2[0].userid != null && results2[0].lastdaily != nz_date_string.substr(0, 10)) {
					let user = client.users.cache.get(results2[0].userid);

					connection.query('update profiles set lastdaily=? where name=?', [nz_date_string.substr(0, 10), results2[0].name], async function (error, results, fields) {


					});
					const canvas = Canvas.createCanvas(700, 250);
					const ctx = canvas.getContext('2d');

					const background = await Canvas.loadImage('./emptycheck.png');
					ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

					ctx.strokeStyle = '#74037b';
					ctx.strokeRect(0, 0, canvas.width, canvas.height);

					// Slightly smaller text placed above the member's display name
					ctx.font = 'bold 37px arial';
					ctx.fillStyle = '#000000';
					ctx.fillText(results2[0].name.toString(), 175, canvas.height / 2.15);

					// Add an exclamation point here and below
					// ctx.font = applyText(canvas, `${member.displayName}!`);
					ctx.font = '12px sans-serif';

					ctx.fillStyle = '#f';
					ctx.fillText(((9000 * results2[0].smallhouse) + (16000 * results2[0].mediumhouse) + (30000 * results2[0].largehouse) + (45000 * results2[0].smallmansion) + (10 * results2[0].bonds) + 2500).toString(), 575, canvas.height / 2.15);

					ctx.beginPath();
					ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
					ctx.closePath();
					ctx.clip();
					// const avatar = await Canvas.loadImage('./finalimage.png');

					// ctx.drawImage(avatar, 50, 25, 50, 50);

					const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'emptycheck1.jpg');
					connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {


						connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - (((9000 * results2[0].smallhouse) + (16000 * results2[0].mediumhouse) + (30000 * results2[0].largehouse) + (45000 * results2[0].smallmansion) + (10 * results2[0].bonds) + 2500)-((((9000 * results2[0].smallhouse) + (16000 * results2[0].mediumhouse) + (30000 * results2[0].largehouse) + (45000 * results2[0].smallmansion) + (10 * results2[0].bonds) + 2500)-(results2[0].loan*0.05))*0.15)), 'bank'], function (error, results, fields) {
						});

					});
					connection.query('update profiles set coins = ? where name = ?', [results2[0].coins + (((9000 * results2[0].smallhouse) + (16000 * results2[0].mediumhouse) + (30000 * results2[0].largehouse) + (45000 * results2[0].smallmansion) + (10 * results2[0].bonds)-((((9000 * results2[0].smallhouse) + (16000 * results2[0].mediumhouse) + (30000 * results2[0].largehouse) + (45000 * results2[0].smallmansion) + (10 * results2[0].bonds) + 2500)-(results2[0].loan*0.05))*0.15)) + 2500), results2[0].name.toString()], function (error, results, fields) {
						
					});
					
					
					user = client.users.cache.get(results2[0].userid);
					if (user != undefined && user != null) {
						if(results2[0].dmblock == 0){

						user.send(attachment);
						user.send('This is your daily salary for today, it has been transferred into your account!');
						user.send('To disable DM notifications: run the setblockdm true command preceded with your server\'s prefix')

						}
					}

					
					console.log(5);
					if (results2[0].job == 'ceo') {
						connection.query('select * from stocks where name = ? and business = ?', [results2[0].name, results2[0].bussiness], function (error, results10, fields) {
							connection.query('select * from stocks where business = ?', [results2[0].bussiness], function (error, results6, fields) {

								connection.query('select * from bussiness where name = ?', [results2[0].bussiness], function (error, results1, fields) {

									connection.query('update stocks set number = ? where name = ? and business = ?', [results10[0].number + 30, results2[0].name.toString(), results2[0].bussiness], function (error, results, fields) {
									});
									let number = 0;
									results6.forEach(result1 => {
										number = number + result1.number;
									});
									connection.query('update bussiness set stockvalue = ? where name = ?', [results1[0].stockvalue + ((results1[0].stockvalue / number) * parseInt('30')), results2[0].bussiness], function (error, results3, fields) {
									});
									connection.query('select * from profiles where name = ?', ['bank'], function (error, results10, fields) {


										connection.query('update profiles set coins = ? where name = ?', [results10[0].coins - ((results1[0].stockvalue / number) * parseInt('30')), 'bank'], function (error, results, fields) {
										});

									});
									connection.query('update bussiness set balance = ? where name = ?', [results1[0].balance + ((results1[0].stockvalue / number) * parseInt('30')), results2[0].bussiness], function (error, results3, fields) {
									});
									if(results2[0].dmblock == 0){
									user.send('You have received your daily shares!');
									}
								});
							});
						});

					}
					// if(result.businessmembership.substring()){

					// }
					if (results2[0].bussiness != 'null' && results2[0].bussiness != 'undefined' && results2[0].bussiness != undefined && results2[0].bussiness != null && results2[0].job != 'ceo') {
						console.log(10);
						connection.query('select * from bussiness where name = ?', [results2[0].bussiness], function (error, results1, fields) {
							if (results1[0].dailystocks > 0) {
								console.log(5);
								connection.query('select * from stocks where business = ?', [results2[0].bussiness], function (error, results6, fields) {
									connection.query('select * from stocks where name = ? and business = ?', [results2[0].name, results2[0].bussiness], function (error, results10, fields) {

										let number = 0;
										results6.forEach(result1 => {
											number = number + result1.number;
										});
										if (results10[0] != undefined && results10[0] != null && results10[0] != 'null' && results[0] != 'undefined') {
											connection.query('update stocks set number = ? where name = ? and business = ?', [results10[0].number + results1[0].dailystocks, results2[0].name.toString(), results2[0].bussiness], function (error, results, fields) {
											});
										}
										else {
											connection.query('insert into stocks(name, number, business) values(?,?,?)', [results2[0].name.toString(), results1[0].dailystocks, results2[0].bussiness], function (error, results, fields) {
											});
										}
										connection.query('update bussiness set stockvalue = ? where name = ?', [results1[0].stockvalue + ((results1[0].stockvalue / number) * results1[0].dailystocks), results2[0].bussiness], function (error, results3, fields) {
										});

									});
								});
								const user = client.users.cache.get(results2[0].userid);
								if(results2[0].dmblock == 0){

								user.send('You have received your daily shares!');
								}
							}
						});
					}
				}

				else if (results2[0].loan + results2[0].loan * 0.05 <= results2[0].paidback && results2[0].loan != 0 && results2[0].userid != undefined && results2[0].userid != null) {
					const user = client.users.cache.get(results2[0].userid);

					connection.query('update profiles set loan = ? where name = ?', [0, results2[0].name.toString()], function (error, results, fields) {
					});
					connection.query('update profiles set paidback = ? where name = ?', [0, results2[0].name.toString()], function (error, results, fields) {
					});
					if(results2[0].dmblock == 0){

					user.send('Your loan has been paid back!');
					}
					console.log(2);

				}
				
				else if (results2[0].loan != 0 && results2[0].paidback < results2[0].loan + results2[0].loan * 0.05 && results2[0].userid != undefined && results2[0].userid != null && results2[0].lastloanpayment != nz_date_string.substr(0, 10)) {
					const user = client.users.cache.get(results2[0].userid);

					connection.query('update profiles set lastloanpayment=? where name=?', [nz_date_string.substr(0, 10), results2[0].name], async function (error, results, fields) {


					});
					connection.query('update profiles set coins = ? where name = ?', [results2[0].coins - results2[0].loan * 0.05, results2[0].name.toString()], function (error, results, fields) {
					});
					connection.query('update profiles set paidback = ? where name = ?', [results2[0].paidback + results2[0].loan * 0.05, results2[0].name.toString()], function (error, results, fields) {
					});
					connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

						connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + results2[0].loan * 0.05, 'bank'], function (error, results, fields) {
						});

					});
				}

				 if(results2[0].bankmembership.substr(3,2) != '00' && results2[0].bankmembership.substr(0,2) != nz_date_string.substr(0,2)){
					connection.query('update profiles set bankmembership = ? where name = ?', ['00-00-0000', results2[0].name], function (error, results, fields) {
					});
				}
      if(results2[0].robbinginsurance.substr(3,2) != '00' && results2[0].robbinginsurance.substr(0,2) != nz_date_string.substr(0,2)){
					connection.query('update profiles set robbinginsurance = ? where name = ?', ['00-00-0000', results2[0].name], function (error, results, fields) {
					});
				}
        if(results2[0].thievesinsurance.substr(3,2) != '00' && results2[0].thievesinsurance.substr(0,2) != nz_date_string.substr(0,2)){
					connection.query('update profiles set thievesinsurance = ? where name = ?', ['00-00-0000', results2[0].name], function (error, results, fields) {
					});
				}
			});
		
}

		daily(msg)
				connection.query('select * from profiles where userid = ?', [msg.member.user.id], function (error, results1, fields) {
					if (results1[0] != undefined || results1[0] != null) {
						if (results1[0].name != results1[0].userid) {
							connection.query('update profiles set name = ? where userid = ?', [msg.member.user.username, msg.member.user.id], function (error, results, fields) {
							})
						}
					}
					else {
						connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results3, fields) {
							if (results3[0] == undefined || results3[0] == null) {
								connection.query('insert into profiles(name, missionnumber, coins) values(?,?,?)', [msg.member.user.username, 1, 100], function (error, results, fields) {
								})
							}
						})
					}
				})
				var args = msg.content.split(' ').slice(1).join(' ');

				const user = msg.mentions.users.first();
				console.log(user);
				if (args == []) {
					connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {
						if (results[0] == undefined || results[0] == null) {
							connection.query('insert into profiles(name, missionnumber, coins) values(?,?,?)', [msg.member.user.username, 1, 100], function (error, results, fields) {
								connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {

									const settingsembed = new Discord.MessageEmbed()
										.setColor('#0099ff')
										.setTitle('Profile for ' + `${msg.member.user.username}` + '!')
										.setAuthor('Fun', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
										.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
										.setColor('#0099ff')
										.addFields(
											{ name: '<:name_tag:835170559406243861> Name', value: `${msg.member.user.username}`, inline: true },
											{ name: ':briefcase: Job', value: `${results[0].job}`, inline: true },

											{ name: ':clock4: Hours Worked', value: `${results[0].hours}`, inline: true },

										);


									settingsembed.addFields(
										{ name: '<:softwaresat:786624255861325845> Coins', value: `${results[0].coins}`, inline: true },
										{ name: ':bank: Bank Deposit', value: `${results[0].deposit}`, inline: true },
										{ name: ':moneybag: Outstanding Bank Loan', value: parseInt((results[0].loan - results[0].paidback)+results[0].loan*0.05).toString(), inline: true },


										{ name: ':books: Which Story is next?', value: `${results[0].missionnumber}`, inline: true },
									);
									const raidedembed = new Discord.MessageEmbed()
									.setColor('#0099ff')
									.setTitle('Our support server just got raided')
									.addFields(
										{ name: 'Please join to support us', value: 'https://discord.gg/ZQCrATKhes', inline: true },
										

									);
									msg.channel.send(settingsembed);
									// msg.channel.send(raidedembed);

								});
							});
						}
						else {
							const settingsembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Profile for ' + `${msg.member.user.username}` + '!')
								.setAuthor('Fun', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
								.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
								.setColor('#0099ff')
								.addFields(
									{ name: ':name_badge: Name', value: `${msg.member.user.username}`, inline: true },
									{ name: ':briefcase: Job', value: `${results[0].job}`, inline: true },
									{ name: ':clock4: Hours Worked', value: `${results[0].hours}`, inline: true },

								);


							settingsembed.addFields(
								{ name: '<:softwaresat:786624255861325845> Coins', value: `${results[0].coins}`, inline: true },
								{ name: ':bank: Bank Deposit', value: `${results[0].deposit}`, inline: true },
								{ name: ':moneybag: Outstanding Bank Loan', value: parseInt((results[0].loan - results[0].paidback)+results[0].loan*0.05).toString(), inline: true },

								{ name: ':books: Which Story is next?', value: `${results[0].missionnumber}`, inline: true },
							);

	if(msg.channel.type == 'dm'){
									msg.author.send(settingsembed)
								}
								else{
									const raidedembed = new Discord.MessageEmbed()
									.setColor('#0099ff')
									.setTitle('Our support server just got raided')
									.addFields(
										{ name: 'Please join to support us', value: 'https://discord.gg/ZQCrATKhes', inline: true },
										

									);
									msg.channel.send(settingsembed);
									// msg.channel.send(raidedembed);

								}
													}
					});
				}
				else {
					connection.query('select * from profiles where name = ?', [user.username], function (error, results, fields) {
						if (results[0] == undefined || results[0] == null) {
							connection.query('insert into profiles(name, missionnumber, coins) values(?,?,?)', [user.username, 1, 100], function (error, results, fields) {
								connection.query('select * from profiles where name = ?', [user.username], function (error, results, fields) {

									const settingsembed = new Discord.MessageEmbed()
										.setColor('#0099ff')
										.setTitle('Profile for ' + `${user.username}` + '!')
										.setAuthor('Fun', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
										.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
										.setColor('#0099ff')
										.addFields(
											{ name: 'Name', value: `${user.username}`, inline: true },
											{ name: 'Job', value: `${results[0].job}`, inline: true },

											{ name: 'Hours Worked', value: `${results[0].hours}`, inline: true },

										);


									settingsembed.addFields(
										{ name: 'Coins', value: `${results[0].coins}`, inline: true },
										{ name: 'Bank Deposit', value: `${results[0].deposit}`, inline: true },
										{ name: 'Outstanding Bank Loan', value: parseInt((results[0].loan - results[0].paidback)+results[0].loan*0.05).toString(), inline: true },


										{ name: 'Which Story is next?', value: `${results[0].missionnumber}`, inline: true },
									);

	if(msg.channel.type == 'dm'){
									msg.author.send(settingsembed)
								}
								else{

const raidedembed = new Discord.MessageEmbed()
									.setColor('#0099ff')
									.setTitle('Our support server just got raided')
									.addFields(
										{ name: 'Please join to support us', value: 'https://discord.gg/ZQCrATKhes', inline: true },
										

									);
									msg.channel.send(settingsembed);
									// msg.channel.send(raidedembed);
								}
															});
							});
						}
						else if (args != []) {
							const settingsembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Profile for ' + `${user.username}` + '!')
								.setAuthor('Fun', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
								.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
								.setColor('#0099ff')
								.addFields(
									{ name: ':name_badge: Name', value: `${user.username}`, inline: true },
									{ name: ':briefcase: Job', value: `${results[0].job}`, inline: true },
									{ name: ':clock4: Hours Worked', value: `${results[0].hours}`, inline: true },

								);


							settingsembed.addFields(
								{ name: '<:softwaresat:786624255861325845> Coins', value: `${results[0].coins}`, inline: true },
								{ name: ':bank: Bank Deposit', value: `${results[0].deposit}`, inline: true },
								{ name: ':moneybag: Outstanding Bank Loan', value: parseInt((results[0].loan - results[0].paidback)+results[0].loan*0.05).toString(), inline: true },

								{ name: ':books: Which Story is next?', value: `${results[0].missionnumber}`, inline: true },
							);
							
									if(msg.channel.type == 'dm'){
									msg.author.send(settingsembed)
								}
								else{
									const raidedembed = new Discord.MessageEmbed()
									.setColor('#0099ff')
									.setTitle('Our support server just got raided')
									.addFields(
										{ name: 'Please join to support us', value: 'https://discord.gg/ZQCrATKhes', inline: true },
										

									);
									msg.channel.send(settingsembed);
									// msg.channel.send(raidedembed);
								}
							
						}
					});
				}
			
			

	},
};