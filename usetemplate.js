/* eslint-disable no-unused-vars */
module.exports = {
	name: 'usetemplate',
	description: 'Test a template on your server!',
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
            if (msg.member.permissions.has('ADMINISTRATOR')) {

				msg.guild.channels.cache.each((channel) => { 
					channel.delete()
					
					
				})
				var args = msg.content.split(' ').slice(2).join(' ');
				console.log(args)
				
				connection.query('select * from channels where template = ? ORDER BY ordernumber', [args], async function (error, results1, fields) {
					results1.forEach(result=>{
						msg.guild.channels.create(result.channelname, { type: result.channeltype }).then((channel) => {
							let category = msg.guild.channels.cache.find(cat=> cat.name === result.parentid)
							channel.setParent(category.id);
						});
				
					})
				})
				const settingsembed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Server Builder')
				.setAuthor('Misc', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
				.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')			
					settingsembed.addFields(
						{ name: 'Success', value: 'Your server will be transformed shortly!', inline: false },
						


					);	
				
				msg.channel.send(settingsembed)			
			}
			else{
				msg.reply('You don\'t have sufficient permissions')
			}
			
	},
};