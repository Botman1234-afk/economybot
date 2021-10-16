/* eslint-disable no-unused-vars */
module.exports = {
	name: 'bank',
	description: 'See how much money the bank has!',
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
		connection.query('select * from profiles where name = ?', ['bank'], function (error, results, fields) {


            connection.query('select * from profiles', ['bank'], function (error, results1, fields) {
                const cashflow = 0;
              
                const settingsembed1 = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(':bank: The Bank!')
                    .setAuthor('Fun', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
                    .setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
                    .setColor('#0099ff')
                    .addFields(
                        { name: 'Balance', value: '<:softwaresat:786624255861325845> ' + results[0].coins.toString(), inline: false },


                    );
                msg.channel.send(settingsembed1);
        })
    })  
	},
};