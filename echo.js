/* eslint-disable no-unused-vars */
module.exports = {
	name: 'echo',
	description: 'Create embeds on the fly!',
	execute(msg, args) {
		const client = msg.client;
		const Discord = require('discord.js');
		const mysql = require('mysql');
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'latehome4',
			database:'discord',
			charset : 'utf8mb4',
		});
        if(!msg.mentions.everyone == true || msg.member.permissions.has('ADMINISTRATOR')){

            var args = msg.content.split(' ').slice(3).join(' ');
            var text = msg.content.slice(6).trim().split(' ');

            const channel = msg.mentions.channels.first();
            const settingsembed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(text[0])
                .addFields(
                    { name: '\u200b', value: args, inline: true },

                );
            channel.send(settingsembed);
            msg.reply('Successfully created embed')
                            }
            else{
             msg.reply('You cannot ping everyone with this command!')   
            }
	},
};