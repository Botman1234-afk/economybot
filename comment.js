/* eslint-disable no-unused-vars */
module.exports = {
	name: 'comment',
	description: 'Make a comment!',
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
		var args = msg.content.split(' ').slice(1).join(' ');
		if (args != undefined){
		const { MessageAttachment } = require('discord.js')
		//define the link however u want
		let link = `https://some-random-api.ml/canvas/youtube-comment?username=${msg.member.user.username}&comment=${args}&avatar=${msg.member.user.displayAvatarURL({format: "png"})}`
		//Make sure the link ends with either .png or .jpg
		
		// -------- Sending the image inside an embed --------
		const attachment = new MessageAttachment(link, 'comment.png');
		  const embed = new Discord.MessageEmbed()
		    .setTitle(`Comment`)
		    .attachFiles(attachment)
		    .setImage('attachment://comment.png')
		  msg.channel.send(embed);
		}
		else{
		  const embed = new Discord.MessageEmbed()
		    .setTitle(`Comment - Error!`)
		    .addFields(
				{ name: 'Error', value: 'Possible Issues: Name is Too Long or Message included in comment wasn\'t specified. Ex. `.comment Hello!`', inline: false },
					);
		  msg.channel.send(embed);
		}
		  
		  
	},
};