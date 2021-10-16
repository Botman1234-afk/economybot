/* eslint-disable no-unused-vars */
module.exports = {
	name: 'kick',
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
			if (msg.member.permissions.has('ADMINISTRATOR') || msg.member.user.id == 459185417678487552) {
				const user = msg.mentions.users.first();
				if (user) {
					console.log(`${user.id}`);
					if(`${user.tag}` == 'satvikag#7832') {
						msg.reply('Sorry, this user is too precious!');
					}
					else if (`${user.username}` == 'ThyMaster555') {
						msg.reply('This user is under a protection spell from Satvik!');
					}
					else if (`${user.tag}` != 'satvikag#7832' & `${user.tag}` != 'ThyMaster555#5555') {
						const user = msg.mentions.users.first();
						const member = msg.guild.member(user);
						member
							.kick('Optional reason that will display in the audit logs')
							.then(() => {
								msg.reply(`Successfully kicked ${user.tag}`);
								const channel = member.guild.channels.cache.find(ch => ch.name === `${results[0].logchannel}`);
								if (channel) {
									channel.send(`Sucessfullly kicked ${user.tag}`);

								}
							})

							.catch(err => {
								msg.reply('I was unable to kick the member');
								console.error(err);
							});
					}
					else {
						msg.reply('That user isn\'t in this guild!');
					}
				}
				else {
					msg.reply('You didn\'t mention the user to kick!');
				}
			}
			else{
				msg.reply('You don\'t have sufficient permissions');
			}
		});

	},
};