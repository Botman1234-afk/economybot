/* eslint-disable no-unused-vars */
module.exports = {
	name: 'roleall',
	description: 'Give everyone in your server a role!',
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
           	const list = client.guilds.cache.get(msg.guild.id);
				var args = msg.content.split(' ').slice(1).join(' ');


				// Iterate through the collection of GuildMembers from the Guild getting the username property of each member
				const role2 = msg.member.guild.roles.cache.find(({ name }) => name === `${args}`);
				console.log(role2);
				list.members.cache.forEach(member => {
					if (!member.permissions.has('ADMINISTRATOR')) {

						member.roles.add(role2);
					}
					// console.log(member)
				});

				msg.reply('Starting Process, will take 5-10 minutes to complete!');
	},
};