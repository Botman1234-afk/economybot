/* eslint-disable no-unused-vars */
module.exports = {
	name: 'link',
	description: 'Get a invite link for your server!',
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
        connection.query('select * from settings where servername = ?', [msg.guild.name], async function(error, results, fields) {

        if (results[0].link == 'null' || results[0].link == null) {
            msg.reply('Set the link by using .setlink!');
        }
        else {
            const settingsembed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .addFields(
                    { name: 'Link', value: 'The link to join this server is ' + results[0].link, inline: true },
                );
            msg.channel.send(settingsembed);
        }
    })
	},
};