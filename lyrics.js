/* eslint-disable no-unused-vars */
module.exports = {
	name: 'lyrics',
	description: 'Get the lyrics to a song!',
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
		    fetch(`https://some-random-api.ml/lyrics?title=${args}`)
		      .then(response => response.json())
		      .then(data => {
		       const embed = new Discord.MessageEmbed()
			    .setTitle(`Lyrics`)
			    .addFields(
				{ name: 'Song Name', value: data['title'], inline: false },
				{ name: 'Song Author', value: data['author'], inline: false },
				{ name: 'Song Link', value: data['links']["genius"], inline: false },
					);
			  msg.channel.send(embed); 
		      })
		      .catch(err => {
		        const embed = new Discord.MessageEmbed()
		    .setTitle(`Lyrics - Error!`)
		    .addFields(
				{ name: 'Error', value: 'Possible Issues: Title was too long, not provided, or not found. Ex. `.lyrics Hello`', inline: false },
					);
		  msg.channel.send(embed);
		
		      })
      
		}
		else{
		  const embed = new Discord.MessageEmbed()
		    .setTitle(`Lyrics - Error!`)
		    .addFields(
				{ name: 'Error', value: 'Possible Issues: Title was too long, not provided, or not found. Ex. `.lyrics Hello`', inline: false },
					);
		  msg.channel.send(embed);
		}
		  
		  
	},
};