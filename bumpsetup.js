/* eslint-disable no-unused-vars */
module.exports = {
	name: 'bumpsetup',
	description: 'Ping!',
	async execute(msg, args) {
		const client = msg.client;
		const mysql = require('mysql');
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'latehome4',
			database:'discord',
			charset : 'utf8mb4',
		});
		connection.query('select * from bumps where server=?', [msg.guild.name], function(error, results, fields) {
			if(results[0] == undefined) {
				connection.query('insert into bumps(server) values(?)', [msg.guild.name], function(error, results, fields) {
				});
			}
		});
		const { MessageCollector } = require('discord.js-collector');
		const botMessage = await msg.channel.send('What do you want your description to be?');
		const question = MessageCollector.question({
			botMessage,
			user: msg.author.id,
			onMessage: async (botMessage, message) => { // Every message sent by user will trigger this function.
				connection.query('update bumps set description=? where server=?', [`${message.content}`, msg.guild.name], async function(error, results, fields) {
					await botMessage.channel.send('Successfully set description! Please create a channel called bump!');
					question.stop();


				});
			},
		});
			// setTimeout(
			// 	async function image() {
			// 		botMessage = await msg.channel.send('What do you want your image to be (link format)?');
			// 		MessageCollector.question({
			// 			botMessage,
			// 			user: msg.author.id,
			// 			onMessage: async (botMessage, message) => { // Every message sent by user will trigger this function.
			 connection.query('update bumps set picture=? where server=?', ['https://images-ext-1.discordapp.net/external/BV-ERvxrzNjNYynFTGyrW7KCclRsS79QEpg3c0UxxwE/https/media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', msg.guild.name], async function(error, results, fields) {

		});
							 connection.query('update bumps set picture=? where server=?', [msg.guild.iconURL(), msg.guild.name], async function(error, results, fields) {

		});
		const channel1 = msg.channel;
						channel1.createInvite({
							maxAge: 0, // 0 = infinite expiration
							maxUses: 0, // 0 = infinite uses
							  }).then(invite => {
								 connection.query('update bumps set link=? where server=?', [invite.code, msg.guild.name], async function(error, results, fields) {
								 });
								 let code = invite.code;
						});
		// 			},
		// 		});
		// 	}
		// 	, 30000);


	},
};