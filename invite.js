/* eslint-disable no-unused-vars */
module.exports = {
	name: 'invite',
	description: 'Link to invite the bot',
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
        const Discord = require('discord.js')
        const settingsembed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .addFields(
            { name: 'Link', value: 'The link to add this bot to your server is https://bit.ly/33ZqAS5', inline: true },
        );
    msg.channel.send(settingsembed);
	},
};