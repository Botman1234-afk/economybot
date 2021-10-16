/* eslint-disable no-unused-vars */
module.exports = {
	name: 'server',
	description: 'Get the support server',
	async execute(msg, args) {
		const client = msg.client;
		const mysql = require('mysql');
        const Discord = require('discord.js')
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'latehome4',
			database:'discord',
			charset : 'utf8mb4',
		});
        const settingsembed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .addFields(
            { name: 'Join the Softwaresat Bot Official Discord Server', value: 'Join this server and get all of the updates for the bot, suggest new features, chat with others, and much more!!! \n https://discord.gg/ZA5MQKy2kH', inline: true },
        );
    msg.channel.send(settingsembed);
	},
};