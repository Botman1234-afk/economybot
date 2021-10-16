/* eslint-disable no-unused-vars */
module.exports = {
	name: 'templates',
	description: 'See all the avaiable templates!',
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
           connection.query('select template from channels group by template', async function (error, results1, fields) {
					const settingsembed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Templates')
					.setDescription('Choose a template then use the "use template <template name>" command to turn your server into that server')
					.setAuthor('Misc', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')			
					results1.forEach(result=>{
						settingsembed.addFields(
							{ name: result.template, value: '\u200b', inline: false },
							
	
	
						);	
					})
					msg.channel.send(settingsembed)
				
				})
	},
};