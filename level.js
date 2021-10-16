/* eslint-disable no-unused-vars */
module.exports = {
	name: 'level',
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
	connection.query('select * from ranks where name = ? && server = ?', [msg.member.user.username, msg.guild.name], function (error, results, fields) {
					// const settingsembed = new Discord.MessageEmbed()
					// .setColor('#0099ff')
					// .setTitle('<a:HR_yellowcrown:835555141309431818> Level! <a:HR_yellowcrown:835555141309431818>')
					// .setDescription('Requested by: ' + msg.author.username)
					// .addFields(
					// 	{ name: '<a:ani_fire:811616503434575872> Level', value:(results[0].level), inline: false },
					// 	{ name: '<a:rainbowfillblob:773625973211529216> More Messages', value:(results[0].level * 10 - results[0].messages) + " messages left!", inline: false },
					// 	);
					// 	settingsembed.setTimestamp();
						
					// 	msg.channel.send(settingsembed);
						const canvacord = require("canvacord");

const rank = new canvacord.Rank()
    .setCurrentXP(results[0].messages)
    .setRequiredXP(results[0].level * 10 - results[0].messages)
    .setProgressBar("#FFFFFF", "COLOR")
    .setUsername(msg.member.user.username)
    .setDiscriminator(msg.member.user.discriminator);

rank.build()
    .then(buffer => {
        canvacord.write(buffer, "RankCard.png");
		const attachment = new Discord.MessageAttachment(buffer, 'RankCard.png')
	msg.channel.send(attachment)
    });
	
						// msg.reply('You are level ' + results[0].level + ' and you need ' + (results[0].level * 10 - results[0].messages) + ' more messages to reach the next level!');
				});
	},
};
