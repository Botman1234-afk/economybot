/* eslint-disable no-unused-vars */
module.exports = {
	name: 'pokemon',
	description: 'View statistics about a specific pokemon!',
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
		    fetch(`https://some-random-api.ml/pokedex?pokemon=${args}`)
		      .then(response => response.json())
		      .then(data => {
		       var id = data['id']
		       var ptype = data['type']
		       var species = data['species']
		       var abilities = data['abilities']
		       var height = data['height']
		       var weight = data['weight']
		       var varbase_xp = data['base_experience']
		       var gender = data['gender']
		       var egg_groups = data['egg_groups']
		       var s_hp = data['stats']["hp"]
		       var s_attack = data['stats']["attack"]
		       var s_defense = data['stats']["defense"]
		       var s_atk = data['stats']["sp_atk"]
		       var s_def = data['stats']["sp_def"]
		       var s_speed = data['stats']["speed"]
		       var s_total = data['stats']["total"]
		       var evo_stage = data['family']["evolutionStage"]
		       var evo_line = data['family']["evolutionLine"]
		       var ani_picture = data['sprites']["animated"]
		       var description = data['description']
		       var generation = data['generation']
		       var base_xp = data['base_experience']
		       
		       const embed = new Discord.MessageEmbed()
			    .setTitle(args)
			    .setImage(ani_picture)
			    .addFields(
			    	{ name: 'ID', value: id, inline: true} ,
		  	        { name: 'Description', value: description, inline: true} ,
 	    			{ name: 'Generation', value: generation, inline: true} ,
			    	{ name: 'Type', value: ptype, inline: true} ,
			    	{ name: 'Species', value: species, inline: true} ,
			    	{ name: 'Abilities', value: abilities, inline: true} ,
				    { name: 'Size', value: `Height: ${height}\nWeight: ${weight}`, inline: true} ,
				    { name: 'Base Xp', value: base_xp, inline: true} ,
			    	{ name: 'Gender', value: gender, inline: true} ,
					{ name: 'Egg Groups', value: egg_groups, inline: true} ,
				    { name: 'Statistics', value: `HP: ${s_hp}\nAttack: ${s_attack}\nDefense: ${s_defense}\nSpecial Attack: ${s_atk}\nSpecial Defense: ${s_def}\nSpeed: ${s_speed}\nTotal: ${s_total} `, inline: true} ,
				    { name: 'Evolution', value: `Stage: ${evo_stage}\n Evolution Line: ${evo_line}`, inline: true} ,
					);
			  msg.channel.send(embed); 
		      })
		      .catch(err => {
		        const embed = new Discord.MessageEmbed()
		    .setTitle(`Pokemon - Error!`)
		    .addFields(
				{ name: 'Error', value: 'Possible Issues: Pokemon wasn\'t found. Please ensure your spelling is correct! Ex. `.pokemon pikachu`', inline: false },
					);
		  msg.channel.send(embed);
		
		      })
      
		}
		else{
		  const embed = new Discord.MessageEmbed()
		    .setTitle(`Pokemon - Error!`)
		    .addFields(
				{ name: 'Error', value: 'Possible Issues: Pokemon wasn\'t found. Please ensure your spelling is correct! Ex. `.pokemon pikachu`', inline: false },
					);
		  msg.channel.send(embed);
		}
		  
		  
	},
};