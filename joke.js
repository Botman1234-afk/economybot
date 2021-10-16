/* eslint-disable no-unused-vars */
module.exports = {
	name: 'joke',
	description: 'Tell me a joke!',
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
		if (args != undefined){
		    fetch(`https://some-random-api.ml/joke`)
		      .then(response => response.json())
		      .then(data => {
		       const embed = new Discord.MessageEmbed()
			    .setTitle(`Joke`)
			    .addFields(
				{ name: 'Joke', value: data['joke'], inline: false },
					);
			  msg.channel.send(embed); 
		      })
		      .catch(err => {
		        const embed = new Discord.MessageEmbed()
		    .setTitle(`Joke - Error!`)
		    .addFields(
				{ name: 'Error', value: 'Unknown Error! Please report this to the Softwaresat Discord Server!', inline: false },
					);
		  msg.channel.send(embed);
		
		      })
      
		}
		else{
		  const embed = new Discord.MessageEmbed()
		    .setTitle(`Joke - Error!`)
		    .addFields(
				{ name: 'Error', value: 'Unknown Error! Please report this to the Softwaresat Discord Server!', inline: false },
					);
		  msg.channel.send(embed);
		}
		  
		  
	},
};