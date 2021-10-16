/* eslint-disable no-unused-vars */
module.exports = {
	name: 'serverinfo',
	description: 'See the server-stats and information!',
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
            	let inline = true
				let icon = msg.guild.iconURL
				let members = msg.guild.members.cache.filter(member => !member.user.bot).size
				let bots = msg.guild.memberCount - members
				const serverembed = new Discord.MessageEmbed()
					.setColor("RANDOM")
					.setTitle(`${msg.guild.name} - ${msg.guild.id}`)
					.addField("Owner:", msg.guild.owner, inline)
					.addField("Members:", msg.guild.memberCount)
					.addField("Humans:", members)
					.addField("Bots:", bots)
					.addField("You Joined:", msg.member.joinedAt, inline)
					.addField("Server Created:", msg.guild.createdAt, inline)
					.addField("Roles:", msg.guild.roles.cache.size)
				msg.channel.send(serverembed)
	},
};