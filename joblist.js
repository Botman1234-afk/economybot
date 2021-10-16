/* eslint-disable no-unused-vars */
module.exports = {
	name: 'joblist',
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
		connection.query('select * from settings where servername = ?', [msg.guild.name], function (error, results2, fields) {

			connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {

				const settingsembed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Joblist (USE ' + results2[0].prefix + 'become <job>)')
					.setAuthor('Fun', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.setColor('#0099ff');

				connection.query('select * from jobs where business = ?', [results[0].bussiness], function (error, results1, fields) {
					settingsembed.addFields(
						{ name: 'Freelancer (id: freelancer)', value: 'Default Job: No pay, pay comes with stories and sudden jobs!', inline: false },
						// { name: 'Youtuber', value:'Starts out with no pay, over time with completed challenges you can grow (less risk)', inline: false },
						{ name: 'Developer (id: developer)', value: 'Has a set pay which rarely ever changes, very steady income of 500 coins per hour you work (5 required work hours)', inline: false },
						{ name: 'Waiter (id: waiter)', value: 'income of 100 coins per hour you work (2 required work hours) (30% chance of getting 1000 extra)', inline: false },
						{ name: 'Police Officer (id: police)', value: '300 coins per hour you work (no required work hours)', inline: false },
						{ name: 'Taxi Driver (id: driver)', value: '1000 coins per hour you work (no required work hours) (must have a car, found in shop)', inline: false },

						// { name: 'Businessman', value:'Starts out with -100 pay per day, with risk and challenges can grow to highest pay (most risk)', inline: false },

					);
					results1.forEach(result => {
						settingsembed.addFields(
							{ name: result.name, value: 'Pay: ' + result.pay + '\nRequired Hours: ' + result.requiredhours, inline: false },

						);

					});
					msg.channel.send(settingsembed);

				});


				// 	settingsembed.addFields(
				// 		{ name: 'Coins', value: `${results[0].coins}`, inline: false },
				// 		{ name: 'Which Story is next?', value: `${results[0].missionnumber}`, inline: false },
				// 	);

				// });
			});
		});
	},
};