module.exports = {
	name: 'delete',
	description: 'Ping!',
	execute(msg, args) {
		const client = msg.client;
		const mysql = require('mysql');
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'latehome4',
			database:'discord',
			charset : 'utf8mb4',
		});
		connection.query('select * from settings where servername = ?', [msg.guild.name], async function(error, results, fields) {

			console.log(`${results[0].prefix}`);
			if (msg.member.permissions.has('MANAGE_MESSAGES') || msg.member.permissions.has('ADMINISTRATOR')) {
				if(msg.content[8] == 'NaN') {
					msg.reply('Uhh, how many do I delete?');
				}
				else if(msg.content[9] != undefined) {
					console.log(msg.content[10]);
					if(msg.content[undefined != 10]) {
						let limitation = 0;
						messages = (parseInt(msg.content[8]) * 100) + (parseInt(msg.content[9]) * 10) + parseInt(msg.content[10]);
						const member = msg.member;
						const channel = member.guild.channels.cache.find(ch => ch.name === `${results[0].settings}`);
						if(channel) {
							channel.send(`${member.user}` + ' used sdelete for ' + messages + ' item(s) in ' + msg.channel.name + '!');
						}
						else{
							msg.reply('Please set a logging channel in the settings!');
						}
						while(messages != 0) {
							if(messages < 99) {
								 limitation = messages;
							}
							else{
								 limitation = 99;
							}
							msg.channel.messages.fetch({ limit: limitation }).then(messages => { // Fetches the messages
								msg.channel.bulkDelete(messages, // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
								);
							});
						}
					}
					else{
						const messages = parseInt(msg.content[8]) * 10 + parseInt(msg.content[9]);
						msg.channel.messages.fetch({ limit: messages + 1 }).then(messages => { // Fetches the messages
							msg.channel.bulkDelete(messages, // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
							);
						});
						let member = msg.member;
						let channel = member.guild.channels.cache.find(ch => ch.name === `${results[0].logchannel}`);
						if(channel) {
							channel.send(`${member.user}` + ' used sdelete for ' + messages + ' item(s) in ' + msg.channel.name + '!');
						}
						else{
							msg.reply('Please set a logging channel in the settings!');
						}
					}
				}
				else{
					var messages = parseInt(msg.content[8]);
					msg.channel.messages.fetch({ limit: messages + 1 }).then(messages => { // Fetches the messages
						msg.channel.bulkDelete(messages, // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
						);
					});
					let member = msg.member;
					let channel = member.guild.channels.cache.find(ch => ch.name === `${results[0].logchannel}`);
					if(channel) {
						channel.send(`${member.user}` + ' used sdelete for ' + messages + ' item(s) in ' + msg.channel.name + '!');
					}
					else{
						msg.reply('Please set a logging channel in the settings!');
					}
				}
			}
		});
	},

};