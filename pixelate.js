/* eslint-disable no-unused-vars */
module.exports = {
	name: 'pixelate',
	description: 'Make yourself or someone else pixelate!',
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
		let link = `https://some-random-api.ml/canvas/pixelate/?avatar=${user.displayAvatarURL({format: "png"})}`
		//Make sure the link ends with either .png or .jpg
		
		// -------- Sending the image inside an embed --------
		const attachment = new MessageAttachment(link, 'pixelate.png');
		  const embed = new Discord.MessageEmbed()
		    .setTitle(`Pixelate`)
		    .attachFiles(attachment)
		    .setImage('attachment://pixelate.png')
		  msg.channel.send(embed);
		}
		else{
			const { MessageAttachment } = require('discord.js')
		//define the link however u want
		let link = `https://some-random-api.ml/canvas/pixelate/?avatar=${msg.member.user.displayAvatarURL({format: "png"})}`
		//Make sure the link ends with either .png or .jpg
		
		// -------- Sending the image inside an embed --------
		const attachment = new MessageAttachment(link, 'pixelate.png');
		  const embed = new Discord.MessageEmbed()
		    .setTitle(`Pixelate`)
		    .attachFiles(attachment)
		    .setImage('attachment://pixelate.png')
		  msg.channel.send(embed);
		}
		  
		  
	},
};