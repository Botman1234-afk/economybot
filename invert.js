/* eslint-disable no-unused-vars */
module.exports = {
	name: 'invert',
	description: 'Make yourself or someone else inverted!',
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
		const user = msg.mentions.users.first();
		if (user != undefined){
		const { MessageAttachment } = require('discord.js')
		//define the link however u want
		let link = `https://some-random-api.ml/canvas/invert/?avatar=${user.displayAvatarURL({format: "png"})}`
		//Make sure the link ends with either .png or .jpg
		
		// -------- Sending the image inside an embed --------
		const attachment = new MessageAttachment(link, 'invert.png');
		  const embed = new Discord.MessageEmbed()
		    .setTitle(`Invert`)
		    .attachFiles(attachment)
		    .setImage('attachment://invert.png')
		  msg.channel.send(embed);
		}
		else{
			const { MessageAttachment } = require('discord.js')
		//define the link however u want
		let link = `https://some-random-api.ml/canvas/invert/?avatar=${msg.member.user.displayAvatarURL({format: "png"})}`
		//Make sure the link ends with either .png or .jpg
		
		// -------- Sending the image inside an embed --------
		const attachment = new MessageAttachment(link, 'invert.png');
		  const embed = new Discord.MessageEmbed()
		    .setTitle(`Invert`)
		    .attachFiles(attachment)
		    .setImage('attachment://invert.png')
		  msg.channel.send(embed);
		}
		  
		  
	},
};