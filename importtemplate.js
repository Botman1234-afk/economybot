/* eslint-disable no-unused-vars */
module.exports = {
	name: 'importtemplate',
	description: 'Imports the template of your choice!',
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
        
				if (msg.member.permissions.has('ADMINISTRATOR') || msg.member.user.username == 'satvikag') {
					connection.query('delete from channels where template = ?', [msg.guild.name], async function (error, results1, fields) {
					})
				let count = 0
				msg.guild.channels.cache.forEach(channel =>{
					count++				

					connection.query('insert into channels(channelname, template, ordernumber, channeltype, parentid, id) values(?,?,?,?,?,?)', [channel.name, msg.guild.name, channel.rawPosition, channel.type, channel.parentID, channel.id], async function (error, results1, fields) {
					})
				
				})
				connection.query('select * from channels where template = ?', [msg.guild.name], async function (error, results1, fields) {
					console.log(2)
					results1.forEach(result=>{
							connection.query('select * from channels where id = ?', [result.parentid], async function (error, results2, fields) {
								if(results2[0] != undefined){
									connection.query('update channels set parentid = ? where id = ?', [results2[0].channelname, result.id], function (error, results, fields) {
									})
							}
							})
						
					})
				
				})
				const settingsembed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Template Import')
				.setAuthor('Misc', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					settingsembed.addFields(
						{ name: '😁 SUCCESS', value: 'Template has been saved in our database!', inline: false },
						


					);	
				
				msg.channel.send(settingsembed)			
			}
			else{
				msg.reply('You don\'t have sufficient permissions')
			}
		    
	},
}