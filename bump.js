module.exports = {
	name: 'bump',
	description: 'Ping!',
	execute(msg, args) {
		const Discord = require('discord.js')
		const client = msg.client;
		const mysql = require('mysql');
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'latehome4',
			database:'discord',
			charset : 'utf8mb4',
		});
					if (msg.member.permissions.has('ADMINISTRATOR') || msg.member.user.id == 459185417678487552) {

		const nz_date_string = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
		const date_nz = new Date(nz_date_string);

		// hours as (HH) format
		const hours = ('0' + date_nz.getHours()).slice(-2);

		// minutes as (mm) format
		const minutes = ('0' + date_nz.getMinutes()).slice(-2);

		// seconds as (ss) format
		const seconds = ('0' + date_nz.getSeconds()).slice(-2);

		const time_hh_mm_ss = hours + ':' + minutes + ':' + seconds;
		let code;
		connection.query('select * from bumps', [msg.guild.name], function(error, results1, fields) {
			connection.query('select * from bumps where server = ?', [msg.guild.name], function(error, results, fields) {

				if(results == undefined) {
					// msg.reply('Please do setup with "bumpsetup"!');
					connection.query('select * from settings where servername = ?', [msg.guild.name], async function (error, results, fields) {
						const settingsembed = new Discord.MessageEmbed()
									.setColor('#0099ff')
									.setTitle(':warning: Error! :warning:')
									.addFields(
										{ name: 'Error', value:'Please do setup with `bumpsetup`!', inline: true },
									);
								msg.channel.send(settingsembed);
					})
				}
				else if(parseInt(time_hh_mm_ss.substr(0, 2) - 2) < parseInt(results[0].lastbumped.substr(0, 2)) && results[0].lastbumpeddate == nz_date_string.substr(0, 10)) {
					// msg.reply('You have bumped in the last 2 hours!');
					const settingsembed = new Discord.MessageEmbed()
									.setColor('#0099ff')
									.setTitle(':warning: Error! :warning:')
									.addFields(
										{ name: 'Error', value:'You have bumped in the last 2 hours!', inline: true },
									);
								msg.channel.send(settingsembed);
					console.log(parseInt(time_hh_mm_ss.substr(0, 2) - 2));
					console.log(parseInt(results[0].lastbumped.substr(0, 2)));
				}

				else{
					if(`${results[0].link}` == 'none') {
						const channel1 = msg.channel;
						channel1.createInvite({
							maxAge: 0, // 0 = infinite expiration
							maxUses: 0, // 0 = infinite uses
							  }).then(invite => {
								 connection.query('update bumps set link=? where server=?', [invite.code, msg.guild.name], async function(error, results, fields) {
								 });
								 code = invite.code;
						});
					}
					const nz_date_string = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
					const date_nz = new Date(nz_date_string);

					// hours as (HH) format
					const hours = ('0' + date_nz.getHours()).slice(-2);

					// minutes as (mm) format
					const minutes = ('0' + date_nz.getMinutes()).slice(-2);

					// seconds as (ss) format
					const seconds = ('0' + date_nz.getSeconds()).slice(-2);

					const time_hh_mm_ss = hours + ':' + minutes + ':' + seconds;
					console.log(parseInt(time_hh_mm_ss.substring(1, 3) - 2));
					console.log(parseInt(results[0].lastbumped.substring(1, 3)));
					console.log(`${results[0].link}`);

					let channel = msg.guild.channels.cache.find(ch => ch.name === 'bump');

					if(channel == undefined) {
						// msg.reply('You must make a channel named bump before you proceed!');
						connection.query('select * from settings where servername = ?', [msg.guild.name], async function (error, results, fields) {
							const settingsembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle(':warning: Error! :warning:')
								.addFields(
									{ name: 'Error', value:'You must make a channel named bump before you proceed!', inline: true },
								);
							msg.channel.send(settingsembed);
					})
					}
					else{
						connection.query('update bumps set lastbumped=? where server=?', [time_hh_mm_ss, msg.guild.name], async function(error, results, fields) {


						});
						console.log(nz_date_string);
						connection.query('update bumps set lastbumpeddate=? where server=?', [nz_date_string.substr(0, 10), msg.guild.name], async function(error, results, fields) {


						});
						results1.forEach(result => {
							connection.query('select * from bumps where server=?', [msg.guild.name], function(error, results2, fields) {

								const server = client.guilds.cache.find(guild => guild.name === `${result.server}`);
								if(server != undefined) {
									channel = server.channels.cache.find(ch => ch.name === 'bump');

								}
								if(channel != undefined && server != undefined) {
									if(results2[0].link == 'none') {
										 let embed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle(`${results[0].server}`)
											.setImage(`${results[0].picture}`)
											.addFields(
												{ name: 'Description', value: results2[0].description, inline: false },
												{ name: 'Invite', value: 'https://discord.gg/' + code, inline: false },


											);
										channel.send(embed);

									}
									else{
										let embed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle(`${results[0].server}`)
											.setImage(`${results[0].picture}`)
											.addFields(
												{ name: 'Description', value: results2[0].description, inline: false },
												{ name: 'Invite', value: 'https://discord.gg/' + results2[0].link, inline: false },


											);
										channel.send(embed);

									}

								}


							});

						});
						// msg.reply('Successfully bumped!');
						connection.query('select * from settings where servername = ?', [msg.guild.name], async function (error, results, fields) {
							const settingsembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Bump Success!')
								.addFields(
									{ name: 'Bump', value:`Your server has been successfully bumped! Do \`${results[0].prefix}bump\` every two hours to bump! `, inline: true },
								);
							msg.channel.send(settingsembed);
					})
					}

				}
			});
		});

}
	},
};