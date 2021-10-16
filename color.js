/* eslint-disable no-unused-vars */
module.exports = {
	name: 'color',
	description: 'View a hex code color!',
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
		
		var hex = msg.content.slice(5).trim().split(' ');
		const { MessageAttachment } = require('discord.js')
		//define the link however u want
		let link = `https://some-random-api.ml/canvas/colorviewer?hex=${args}`
		//Make sure the link ends with either .png or .jpg
		
		// -------- Sending the image as an image attachment --------
		//create a message attachment with the name of the file with discord.js built in attachment class.
		// let attachment = new MessageAttachment(link, 'color.png');
		// message.channel.send(attachment); //send the attachment
		
		// -------- Sending the image inside an embed --------
		console.log(args)

		const attachment = new MessageAttachment(link, 'color.png');
		  const embed = new Discord.MessageEmbed()
		    .setTitle(`#${args}`)
		    .attachFiles(attachment)
		    .setImage('attachment://color.png')
		  msg.channel.send(embed);
		  
		// msg.channel.send("||pop||||pop||||pop||||pop||||pop||\n||pop||||pop||||pop||||pop||||pop||\n||pop||||pop||||pop||||pop||||pop||\n||pop||||pop||||pop||||pop||||pop||\n||pop||||pop||||pop||||pop||||pop||")
	},
};