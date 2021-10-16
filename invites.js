/* eslint-disable no-unused-vars */
module.exports = {
	name: 'invites',
	description: 'Get the amount of invites you have!',
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
      var user = msg.author;
				var member = msg.mentions.users.first()
				if(member == undefined){
				msg.guild.fetchInvites()
				.then
		
				(invites =>
					{
						const userInvites = invites.array().filter(o => o.inviter.id === user.id);
						var userInviteCount = 0;
						for(var i=0; i < userInvites.length; i++)
						{
							var invite = userInvites[i];
							userInviteCount += invite['uses'];
						}
						const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.addFields(
								{ name: '🤼 Invites', value: `***${msg.member.user.username}*** has ${userInviteCount} invites.`, inline: true },
								


							);
						msg.channel.send(settingsembed);
					}
				)
				}
				else{
					msg.guild.fetchInvites()
				.then
		
				(invites =>
					{
						const userInvites = invites.array().filter(o => o.inviter.id === member.id);
						var userInviteCount = 0;
						for(var i=0; i < userInvites.length; i++)
						{
							var invite = userInvites[i];
							userInviteCount += invite['uses'];
						}
						const settingsembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.addFields(
							{ name: '🤼 Invites', value: `***${member.username}*** has ${userInviteCount} invites.`, inline: true },
							


						);
					msg.channel.send(settingsembed);					}
				)
				}
	},
};