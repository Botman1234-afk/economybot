/* eslint-disable no-unused-vars */
module.exports = {
	name: 'settings',
	description: 'Check the server settings',
	execute(msg, args) {
		const client = msg.client;
		const mysql = require('mysql');
		const connection = mysql.createConnection({
			adapter: 'sails-mysql',
			host: 'localhost',
			user: 'root',
			password: 'latehome4',
			database: 'discord',
			charset: 'utf8mb4',
			socketPath: '/var/run/mysqld/mysqld.sock',
		});
		connection.connect()
		const Discord = require('discord.js')
		connection.query('select * from settings where servername = ?', [msg.guild.name], function(error, results, fields) {

			// const channel = msg.channel;
			// channel.createInvite({
			// 	maxAge: 0, // 0 = infinite expiration
			// 	maxUses: 0, // 0 = infinite uses
			// }).then(invite => {
			// 	const code = invite.code;
			// 	connection.query('update settings set link=? where servername =?', ['https://discord.gg/' + invite.code, msg.guild.name], function(error, results, fields) {});
			// });
			// if (`${results[0]}` == '[]' || `${results[0]}` == 'undefined' || `${results[0]}` == undefined || `${results[0]}` === [] || `${results[0]}` == '[]') {
			// 	connection.query('insert into settings(servername) values(?)', [msg.guild.name], function(error, results, fields) {
			// 		connection.query('select * from settings where servername = ?', [msg.guild.name], function(error, results, fields) {
			// 			var autokick = "";
			// 			if (results[0].autokick == 1) {
			// 				autokick = "<a:check:773624930582396928> Turned On!";
			// 			}
			// 			if (results[0].autokick == 0) {
			// 				autokick = ":x: Turned Off!";
			// 			}
			// 			var autodelete = "";
			// 			if (results[0].autodelete == 1) {
			// 				autodelete = "<a:check:773624930582396928> Turned On!";
			// 			}
			// 			if (results[0].autodelete == 0) {
			// 				autodelete = ":x: Turned Off!";
			// 			}
			// 			var pingblock = "";
			// 			if (results[0].pingblock == 1) {
			// 				pingblock = "<a:check:773624930582396928> Turned On!";
			// 			}
			// 			if (results[0].pingblock == 0) {
			// 				pingblock = ":x: Turned Off!";
			// 			}
			// 			var ranks = "";
			// 			if (results[0].ranks == 1) {
			// 				ranks = "<a:check:773624930582396928> Turned On!";
			// 			}
			// 			if (results[0].ranks == 0) {
			// 				ranks = ":x: Turned Off!";
			// 			}
			// 			var invitationback = "";
			// 			if (results[0].invitationback == 1) {
			// 				invitationback = "<a:check:773624930582396928> Turned On!";
			// 			}
			// 			if (results[0].invitationback == 0) {
			// 				invitationback = ":x: Turned Off!";
			// 			}
			// 			var dm = "";
			// 			if (results[0].dm == 1) {
			// 				dm = "<a:check:773624930582396928> Turned On!";
			// 			}
			// 			if (results[0].dm == 0) {
			// 				dm = ":x: Turned Off!";
			// 			}
			// 			var cussing = "";
			// 			if (results[0].cussing == 1) {
			// 				cussing = "<a:check:773624930582396928> Turned On!";
			// 			}
			// 			if (results[0].cussing == 0) {
			// 				cussing = ":x: Turned Off!";
			// 			}
			// 			var autorespond = "";
			// 			if (results[0].autorespond == 1) {
			// 				autorespond = "<a:check:773624930582396928> Turned On!";
			// 			}
			// 			if (results[0].cussing == 0) {
			// 				autorespond = ":x: Turned Off!";
			// 			}
			// 			const settingsembed = new Discord.MessageEmbed()
			// 				.setColor('#0099ff')
			// 				.setTitle('Settings for ' + results[0].servername + '!')
			// 				.setAuthor('Management', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
			// 				.setDescription('Here you can view the different settings for your server')
			// 				.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
			// 				.addFields({ name: ':people_wrestling: AutoKick', value: `${autokick}`, inline: false }, { name: ':person_gesturing_no: AutoDelete', value: `${autodelete}`, inline: false }, { name: '<a:PingSockAnimation:790304842924949515> AutoPingBlock', value: `${pingblock}`, inline: false }, { name: ':person_running: Ranks', value: `${ranks}`, inline: false }, { name: '<a:fbi:773623248314433556> KickThreshold', value: `${results[0].kickthreshold}`, inline: false }, { name: ':envelope_with_arrow: AutoInvitation', value: `${invitationback}`, inline: false }, { name: ':link: AutoLink', value: `${results[0].link}`, inline: false }, { name: ':speech_balloon: Direct Message', value: `${dm}`, inline: false }, { name: ':speech_left: AutoCensor', value: `${cussing}`, inline: false }, { name: ':person_biking: AutoRole', value: `${results[0].autorole}`, inline: false }, { name: ':star: Prefix`', value: `${results[0].prefix}`, inline: false }, { name: ':rocket: AutoWelcomeChannel', value: `${results[0].welcomechannel}`, inline: false }, { name: ':person_doing_cartwheel: AutoWelcomeMessage', value: `${results[0].welcomemessage}`, inline: false }, { name: ':wave: AutoWelcomePicture', value: `${results[0].welcomepicture}`, inline: false }, { name: ':notepad_spiral: AutoLogChannel', value: `${results[0].logchannel}`, inline: false }, { name: ':1234: CountingType', value: `${results[0].countingtype}`, inline: false }, { name: ':stopwatch: Counter', value: `${results[0].counter}`, inline: false }, { name: ':robot: Auto Respond', value: `${autorespond}`, inline: false }, )
			// 				.setImage('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
			// 				.setTimestamp();

			// 			msg.channel.send(settingsembed);
			// 		});
			// 	});
			// }
			// else {
			// 	var autokick = "";
			// 	if (results[0].autokick == 1) {
			// 		autokick = "<a:check:773624930582396928> Turned On!";
			// 	}
			// 	if (results[0].autokick == 0) {
			// 		autokick = ":x: Turned Off!";
			// 	}
			// 	var autodelete = "";
			// 	if (results[0].autodelete == 1) {
			// 		autodelete = "<a:check:773624930582396928> Turned On!";
			// 	}
			// 	if (results[0].autodelete == 0) {
			// 		autodelete = ":x: Turned Off!";
			// 	}
			// 	var pingblock = "";
			// 	if (results[0].pingblock == 1) {
			// 		pingblock = "<a:check:773624930582396928> Turned On!";
			// 	}
			// 	if (results[0].pingblock == 0) {
			// 		pingblock = ":x: Turned Off!";
			// 	}
			// 	var ranks = "";
			// 	if (results[0].ranks == 1) {
			// 		ranks = "<a:check:773624930582396928> Turned On!";
			// 	}
			// 	if (results[0].ranks == 0) {
			// 		ranks = ":x: Turned Off!";
			// 	}
			// 	var invitationback = "";
			// 	if (results[0].invitationback == 1) {
			// 		invitationback = "<a:check:773624930582396928> Turned On!";
			// 	}
			// 	if (results[0].invitationback == 0) {
			// 		invitationback = ":x: Turned Off!";
			// 	}
			// 	var dm = "";
			// 	if (results[0].dm == 1) {
			// 		dm = "<a:check:773624930582396928> Turned On!";
			// 	}
			// 	if (results[0].dm == 0) {
			// 		dm = ":x: Turned Off!";
			// 	}
			// 	var cussing = "";
			// 	if (results[0].cussing == 1) {
			// 		cussing = "<a:check:773624930582396928> Turned On!";
			// 	}
			// 	if (results[0].cussing == 0) {
			// 		cussing = ":x: Turned Off!";
			// 	}
			// 	var autorespond = "";
			// 	if (results[0].autorespond == 1) {
			// 		autorespond = "<a:check:773624930582396928> Turned On!";
			// 	}
			// 	if (results[0].cussing == 0) {
			// 		autorespond = ":x: Turned Off!";
			// 	}
			// 	const settingsembed = new Discord.MessageEmbed()
			// 		.setColor('#0099ff')
			// 		.setTitle('Settings for ' + results[0].servername + '!')
			// 		.setAuthor('Management', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
			// 		.setDescription('Here you can view the different settings for your server')
			// 		.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
			// 		.addFields({ name: ':people_wrestling: AutoKick', value: `${autokick}`, inline: false }, { name: ':person_gesturing_no: AutoDelete', value: `${autodelete}`, inline: false }, { name: '<a:PingSockAnimation:790304842924949515> AutoPingBlock', value: `${pingblock}`, inline: false }, { name: ':person_running: Ranks', value: `${ranks}`, inline: false }, { name: '<a:fbi:773623248314433556> KickThreshold', value: `${results[0].kickthreshold}`, inline: false }, { name: ':envelope_with_arrow: AutoInvitation', value: `${invitationback}`, inline: false }, { name: ':link: AutoLink', value: `${results[0].link}`, inline: false }, { name: ':speech_balloon: Direct Message', value: `${dm}`, inline: false }, { name: ':speech_left: AutoCensor', value: `${cussing}`, inline: false }, { name: ':person_biking: AutoRole', value: `${results[0].autorole}`, inline: false }, { name: ':star: Prefix`', value: `${results[0].prefix}`, inline: false }, { name: ':rocket: AutoWelcomeChannel', value: `${results[0].welcomechannel}`, inline: false }, { name: ':person_doing_cartwheel: AutoWelcomeMessage', value: `${results[0].welcomemessage}`, inline: false }, { name: ':wave: AutoWelcomePicture', value: `${results[0].welcomepicture}`, inline: false }, { name: ':notepad_spiral: AutoLogChannel', value: `${results[0].logchannel}`, inline: false }, { name: ':1234: CountingType', value: `${results[0].countingtype}`, inline: false }, { name: ':stopwatch: Counter', value: `${results[0].counter}`, inline: false }, { name: ':robot: Auto Respond', value: `${autorespond}`, inline: false },

			// 		)
			// 		.setImage('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
			// 		.setTimestamp();
			// 	msg.channel.send(settingsembed);
			// }
const channel = msg.channel;
				channel.createInvite({
					maxAge: 0, // 0 = infinite expiration
					maxUses: 0, // 0 = infinite uses
				}).then(invite => {
					const code = invite.code;
					connection.query('update settings set link=? where servername =?', ['https://discord.gg/' + invite.code, msg.guild.name], function (error, results, fields) {
					});
				});
				if (`${results[0]}` == '[]' || `${results[0]}` == 'undefined' || `${results[0]}` == undefined || `${results[0]}` === [] || `${results[0]}` == '[]') {
					connection.query('insert into settings(servername) values(?)', [msg.guild.name], function (error, results, fields) {
						connection.query('select * from settings where servername = ?', [msg.guild.name], function (error, results, fields) {
							var autokick = "";
							if (results[0].autokick == 1){
								autokick = "<a:check:773624930582396928> Turned On!";
							}
							if (results[0].autokick == 0){
								autokick = ":x: Turned Off!";
							}
							var autodelete = "";
							if (results[0].autodelete == 1){
								autodelete = "<a:check:773624930582396928> Turned On!";
							}
							if (results[0].autodelete == 0){
								autodelete = ":x: Turned Off!";
							}
							var pingblock = "";
							if (results[0].pingblock == 1){
								pingblock = "<a:check:773624930582396928> Turned On!";
							}
							if (results[0].pingblock == 0){
								pingblock = ":x: Turned Off!";
							}
							var ranks = "";
							if (results[0].ranks == 1){
								ranks = "<a:check:773624930582396928> Turned On!";
							}
							if (results[0].ranks == 0){
								ranks = ":x: Turned Off!";
							}
							var invitationback = "";
							if (results[0].invitationback == 1){
								invitationback = "<a:check:773624930582396928> Turned On!";
							}
							if (results[0].invitationback == 0){
								invitationback = ":x: Turned Off!";
							}
							var dm = "";
							if (results[0].dm == 1){
								dm = "<a:check:773624930582396928> Turned On!";
							}
							if (results[0].dm == 0){
								dm = ":x: Turned Off!";
							}
							var cussing = "";
							if (results[0].cussing == 1){
								cussing = "<a:check:773624930582396928> Turned On!";
							}
							if (results[0].cussing == 0){
								cussing = ":x: Turned Off!";
							}
							var autorespond = "";
							if (results[0].autorespond == 1){
								autorespond = "<a:check:773624930582396928> Turned On!";
							}
							if (results[0].cussing == 0){
								autorespond = ":x: Turned Off!";
							}
							const settingsembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Settings for ' + results[0].servername + '!')
								.setAuthor('Management', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
								.setDescription('THIS PAGE IS NOW DEPRECATED: USE http://softwaresat.onthewifi.com/ INSTEAD!')
								.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
								.addFields(
									{ name: ':people_wrestling: AutoKick', value: `${autokick}`, inline: false },
									{ name: ':person_gesturing_no: AutoDelete', value: `${autodelete}`, inline: false },
									{ name: '<:ping:862485352529657947> AutoPingBlock', value: `${pingblock}`, inline: false },
									{ name: ':person_running: Ranks', value: `${ranks}`, inline: false },
									{ name: '<a:fbi:773623248314433556> KickThreshold', value: `${results[0].kickthreshold}`, inline: false },
									{ name: ':envelope_with_arrow: AutoInvitation', value: `${invitationback}`, inline: false },
									{ name: ':link: AutoLink', value: `${results[0].link}`, inline: false },
									{ name: ':speech_balloon: Direct Message', value: `${dm}`, inline: false },
									{ name: ':speech_left: AutoCensor', value: `${cussing}`, inline: false },
									{ name: ':person_biking: AutoRole', value: `${results[0].autorole}`, inline: false },
									{ name: ':star: Prefix`', value: `${results[0].prefix}`, inline: false },
									{ name: ':rocket: AutoWelcomeChannel', value: `${results[0].welcomechannel}`, inline: false },
									{ name: ':person_doing_cartwheel: AutoWelcomeMessage', value: `${results[0].welcomemessage}`, inline: false },
									{ name: ':wave: AutoWelcomePicture', value: `${results[0].welcomepicture}`, inline: false },
									{ name: ':notepad_spiral: AutoLogChannel', value: `${results[0].logchannel}`, inline: false },
									{ name: ':1234: CountingType', value: `${results[0].countingtype}`, inline: false },
									{ name: ':stopwatch: Counter', value: `${results[0].counter}`, inline: false },
									{ name: ':robot: Auto Respond', value: `${autorespond}`, inline: false },
								)
								.setImage('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
								.setTimestamp();

							msg.channel.send(settingsembed);
						});
					});
				}
				else {
					var autokick = "";
							if (results[0].autokick == 1){
								autokick = "<a:check:773624930582396928> Turned On!";
							}
							if (results[0].autokick == 0){
								autokick = ":x: Turned Off!";
							}
							var autodelete = "";
							if (results[0].autodelete == 1){
								autodelete = "<a:check:773624930582396928> Turned On!";
							}
							if (results[0].autodelete == 0){
								autodelete = ":x: Turned Off!";
							}
							var pingblock = "";
							if (results[0].pingblock == 1){
								pingblock = "<a:check:773624930582396928> Turned On!";
							}
							if (results[0].pingblock == 0){
								pingblock = ":x: Turned Off!";
							}
							var ranks = "";
							if (results[0].ranks == 1){
								ranks = "<a:check:773624930582396928> Turned On!";
							}
							if (results[0].ranks == 0){
								ranks = ":x: Turned Off!";
							}
							var invitationback = "";
							if (results[0].invitationback == 1){
								invitationback = "<a:check:773624930582396928> Turned On!";
							}
							if (results[0].invitationback == 0){
								invitationback = ":x: Turned Off!";
							}
							var dm = "";
							if (results[0].dm == 1){
								dm = "<a:check:773624930582396928> Turned On!";
							}
							if (results[0].dm == 0){
								dm = ":x: Turned Off!";
							}
							var cussing = "";
							if (results[0].cussing == 1){
								cussing = "<a:check:773624930582396928> Turned On!";
							}
							if (results[0].cussing == 0){
								cussing = ":x: Turned Off!";
							}
							var autorespond = "";
							if (results[0].autorespond == 1){
								autorespond = "<a:check:773624930582396928> Turned On!";
							}
							if (results[0].cussing == 0){
								autorespond = ":x: Turned Off!";
							}
					const settingsembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Settings for ' + results[0].servername + '!')
						.setAuthor('Management', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
						.setDescription('THIS PAGE IS NOW DEPRECATED: USE http://softwaresat.onthewifi.com/ INSTEAD!')
						.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
						.addFields(
							{ name: ':people_wrestling: AutoKick', value: `${autokick}`, inline: false },
							{ name: ':person_gesturing_no: AutoDelete', value: `${autodelete}`, inline: false },
							{ name: '<:ping:862485352529657947> AutoPingBlock', value: `${pingblock}`, inline: false },
							{ name: ':person_running: Ranks', value: `${ranks}`, inline: false },
							{ name: '<a:fbi:773623248314433556> KickThreshold', value: `${results[0].kickthreshold}`, inline: false },
							{ name: ':envelope_with_arrow: AutoInvitation', value: `${invitationback}`, inline: false },
							{ name: ':link: AutoLink', value: `${results[0].link}`, inline: false },
							{ name: ':speech_balloon: Direct Message', value: `${dm}`, inline: false },
							{ name: ':speech_left: AutoCensor', value: `${cussing}`, inline: false },
							{ name: ':person_biking: AutoRole', value: `${results[0].autorole}`, inline: false },
							{ name: ':star: Prefix`', value: `${results[0].prefix}`, inline: false },
							{ name: ':rocket: AutoWelcomeChannel', value: `${results[0].welcomechannel}`, inline: false },
							{ name: ':person_doing_cartwheel: AutoWelcomeMessage', value: `${results[0].welcomemessage}`, inline: false },
							{ name: ':wave: AutoWelcomePicture', value: `${results[0].welcomepicture}`, inline: false },
							{ name: ':notepad_spiral: AutoLogChannel', value: `${results[0].logchannel}`, inline: false },
							{ name: ':1234: CountingType', value: `${results[0].countingtype}`, inline: false },
							{ name: ':stopwatch: Counter', value: `${results[0].counter}`, inline: false },
							{ name: ':robot: Auto Respond', value: `${autorespond}`, inline: false },

						)
						.setImage('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
						.setTimestamp();
					msg.channel.send(settingsembed);
				}
		})
	},
};
