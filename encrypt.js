/* eslint-disable no-unused-vars */
module.exports = {
	name: 'encrypt',
	description: 'Encrypt a message!',
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
		    fetch(`https://some-random-api.ml/base64?encode=${args}`)
		      .then(response => response.json())
		      .then(data => {
		       const embed = new Discord.MessageEmbed()
			    .setTitle(`Encrypted Message`)
			    .setAuthor(msg.author)
			    .addFields(
				{ name: 'Message', value: data['base64'], inline: false },
					);
			  msg.channel.send(embed); 
		      })
		      .catch(err => {
		        const embed = new Discord.MessageEmbed()
		    .setTitle(`Encrypt - Error!`)
		    .addFields(
				{ name: 'Error', value: 'Possible Issues: Message is Too Long or wasn\'t included. Ex. `.encrypt Hello`', inline: false },
					);
		  msg.channel.send(embed);
		
		      })
      
		}
		else{
		  const embed = new Discord.MessageEmbed()
		    .setTitle(`Encrypt - Error!`)
		    .addFields(
				{ name: 'Error', value: 'Possible Issues: Message is Too Long or wasn\'t included. Ex. `.encrypt Hello`', inline: false },
					);
		  msg.channel.send(embed);
		}
		  
		  
	},
};