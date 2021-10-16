const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const client = new Client({ ws: { intents: Intents.ALL } });const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'latehome4',
	database:'discord',
	charset : 'utf8mb4',
});
let guild1;
client.on('ready', () => {
	guild1 = client.guilds.cache.get('790453660579659817');

	console.log(`Logged in as ${client.user.tag}!`);

});
client.on('guildMemberRemove', async person => {
	const username = person.user.username;
	let messages1;
	await guild1.channels.cache.forEach(async channel => {
		await channel.messages.fetch({ limit: 100 }).then(messages => {
			messages.forEach(message => {
				if(message.member == null) {
					message.delete();
				}
				const user = message.member.user.username;
				console.log(user == username);
				if(user == username) {
					message.delete();
				}
			}); // Fetches the messages
		});

	});
});
client.on('message', msg => {
	if(msg.channel.parentID == '790453661394403352' || msg.channel.parentID == '790453661603594248' || msg.channel.parentID == '792116496436428842' && msg.member.user.username != 'Cloud Manager' && msg.content.length != 0) {
		
		const embed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Cloud Advertising')
			.setAuthor('Cloud Manager', 'https://media.discordapp.net/attachments/790453661242622003/791170734251966494/cloud.png')
			.addFields(
				{ name: '__REMINDER__', value: ':white_check_mark: You may only advertise in a Total of 4 Different Channels, In a 20 minute Period.\n :white_check_mark: All your posts will be automatically deleted if you leave this server\n:white_check_mark: You can repost every 20 minutes\n:white_check_mark: Make sure to read the <#790453661054271536> before posting\n:white_check_mark: Dont CHAT in advertising channels\n', inline: false },


			);
			if(msg.content.length != 0 && msg.content.length > 25){
		msg.channel.send(embed);
			}
		if(msg.content.length <= 25 && msg.content.length != 0) {
			msg.delete();
			const embed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle('❌ Advertisement Deletion')
				.setDescription('Your advertisement has been deleted.')
				.addFields(
					{ name: '**Reason:** ', value: '`Advertisement is too short or posted an invite`', inline: false },

					{ name: 'Message:', value: '\n `' + msg.content + '`', inline: false },
					{ name: 'Channel:', value: '\n `' + msg.channel.name + '`', inline: false },


				);
			embed.setTimestamp();
	 		embed.setFooter('If this is wrong please DM an owner ', 'https://media.discordapp.net/attachments/790453661242622003/791170734251966494/cloud.png');
			  
			const guild1 = client.guilds.cache.get('790453660579659817');
			let channel = guild1.channels.cache.find(t => t.name == '🤖│bot-moderation')
			channel.send(`${msg.member}`)
			channel.send(embed);



		}
		connection.query('select * from cloudmanager where name = ?', [msg.member.user.username], async function(error, results, fields) {
			const nz_date_string = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
			const date_nz = new Date(nz_date_string);
			const hours = ('0' + date_nz.getHours()).slice(-2);
			const minutes = ('0' + date_nz.getMinutes()).slice(-2);


			 if(results == undefined || `${results[0]}` == '[]' || `${results[0]}` == 'undefined' || `${results[0]}` == undefined || `${results[0]}` === [] || `${results[0]}` == '[]') {
				// eslint-disable-next-line no-unused-vars
				const nz_date_string = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
				const date_nz = new Date(nz_date_string);

				// hours as (HH) format
				const hours = ('0' + date_nz.getHours()).slice(-2);
				// minutes as (mm) format
				const minutes = ('0' + date_nz.getMinutes()).slice(-2);

				// seconds as (ss) format
				const seconds = ('0' + date_nz.getSeconds()).slice(-2);

				const time_hh_mm_ss = hours + ':' + minutes + ':' + seconds;

				connection.query('insert into cloudmanager(name,lastposted,numberposted) values(?,?,?)', [msg.member.user.username, hours.toString(), 1], function(error, results, fields) {
				});
			}


			// hours as (HH) format
			// minutes as (mm) format
			else if(results[0].lastpostedminutes + 20 <= minutes || results[0].lastpostedminutes - 20 >= minutes) {
				connection.query('update cloudmanager set numberposted=? where name=?', [1, msg.member.user.username], function(error, results, fields) {
				});
				connection.query('update cloudmanager set lastposted=? where name=?', [hours.toString(), msg.member.user.username], function(error, results, fields) {
				});
				connection.query('update cloudmanager set lastpostedminutes=? where name=?', [minutes, msg.member.user.username], function(error, results, fields) {
				});
			}
			else{
				const nz_date_string = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
				const date_nz = new Date(nz_date_string);

				// hours as (HH) format
				const hours = ('0' + date_nz.getHours()).slice(-2);
				// minutes as (mm) format
				const minutes = ('0' + date_nz.getMinutes()).slice(-2);

				// seconds as (ss) format
				const seconds = ('0' + date_nz.getSeconds()).slice(-2);

				const time_hh_mm_ss = hours + ':' + minutes + ':' + seconds;
				connection.query('update cloudmanager set numberposted=? where name=?', [results[0].numberposted + 1, msg.member.user.username], function(error, results, fields) {
				});
				connection.query('update cloudmanager set lastposted=? where name=?', [hours.toString(), msg.member.user.username], function(error, results, fields) {
				});
				connection.query('update cloudmanager set lastpostedminutes=? where name=?', [minutes, msg.member.user.username], function(error, results, fields) {
				});
				connection.query('select * from cloudmanager where name = ?', [msg.member.user.username], async function(error, results, fields) {
					if(results[0].numberposted > 4 && (minutes + 20 >= results[0].lastpostedminutes || minutes - 20 <= results[0].lastpostedminutes) && msg.member.user.username != 'Cloud Manager') {
						msg.delete();
						const embed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('❌ Advertisement Deletion')
							.setDescription('Your advertisement has been deleted.')
							.addFields(
								{ name: '**Reason:** ', value: '`Advertised more than 4 times in 20 minutes`', inline: false },

								{ name: 'Message:', value: '\n `' + msg.content + '`', inline: false },
								{ name: 'Channel:', value: '\n `' + msg.channel.name + '`', inline: false },


							);
						embed.setTimestamp();
						 embed.setFooter('If this is wrong please DM an owner', 'https://media.discordapp.net/attachments/790453661242622003/791170734251966494/cloud.png');

						const guild1 = client.guilds.cache.get('790453660579659817');
						let channel = guild1.channels.cache.find(t => t.name == '🤖│bot-moderation')
						channel.send(`${msg.member}`)
						channel.send(embed);						 
						msg.channel.messages.fetch({ limit: 1 }).then(messages => {
							messages.forEach(element => {
								element.delete();
							});
						});

					}

				});
			}
		});

		if (msg.content === 'ping') {
			msg.reply('pong');
		}

	}
	if (msg.content == 'server database') {
		connection.query('select * from cloudmanager', [msg.member.user.username], async function(error, results, fields) {

			const embed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Server Database');
			results.forEach(result => {
				embed.addFields(
					{ name:result.name, value: 'Number of Times Posted in 20 Minutes: ' + result.numberposted + '\nLast Posted: ' + result.lastpostedminutes, inline: false },


				);
			});
			msg.reply(embed);

		});
	}

});

client.login('NzkwNDQ5MzcyNDE5ODUwMjYy.X-AxWA.jbcEYoLTSJPpYAZE_1Qctehmrmw');