/* eslint-disable no-unused-vars */
module.exports = {
	name: 'decrypt',
	description: 'Decrypt a message!',
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
		const fetch = require('node-fetch');
		var args = msg.content.split(' ').slice(1).join(' ');
		if (args != undefined){
		    fetch(`https://some-random-api.ml/base64?decode=${args}`)
		      .then(response => response.json())
		      .then(data => {
		       const embed = new Discord.MessageEmbed()
			    .setTitle(`Decrypted Message`)
			    .setAuthor(msg.author)
			    .addFields(
				{ name: 'Message', value: data['text'], inline: false },
					);
			  msg.channel.send(embed); 
		      })
		      .catch(err => {
		        const embed = new Discord.MessageEmbed()
		    .setTitle(`Decrypt - Error!`)
		    .addFields(
				{ name: 'Error', value: 'Possible Issues: Message is Too Long or wasn\'t included. Ex. `.decrypt Hello`', inline: false },
					);
		  msg.channel.send(embed);
		
		      })
      
		}
		else{
		  const embed = new Discord.MessageEmbed()
		    .setTitle(`Decrypt - Error!`)
		    .addFields(
				{ name: 'Error', value: 'Possible Issues: Message is Too Long or wasn\'t included. Ex. `.decrypt Hello`', inline: false },
					);
		  msg.channel.send(embed);
		}
		  
		  
	},
};