/* eslint-disable no-unused-vars */
module.exports = {
	name: 'userinfo',
	description: 'Check a person\'s stats!',
	execute(msg, args, moment) {
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
           const user = msg.mentions.users.first() || msg.author;

				if (user.presence.status === 'dnd') user.presence.status = 'Do Not Disturb';
				if (user.presence.status === 'idle') user.presence.status = 'Idle';
				if (user.presence.status === 'offline') user.presence.status = 'Offline';
				if (user.presence.status === 'online') user.presence.status = 'Online';

				function game() {
					let game;
					if (user.presence.activities.length >= 1) game = `${user.presence.activities[0].type} ${user.presence.activities[0].name}`;
					else if (user.presence.activities.length < 1) game = 'None'; // This will check if the user doesn't playing anything.
					return game; // Return the result.
				}

				const x = Date.now() - user.createdAt; // Since the user created their account.
				const y = Date.now() - msg.guild.members.cache.get(user.id).joinedAt; // Since the user joined the server.
				const created = Math.floor(x / 86400000); // 5 digits-zero.
				const joined = Math.floor(y / 86400000);

				const member = msg.guild.member(user);
				const nickname = member.nickname !== undefined && member.nickname !== null ? member.nickname : 'None';
				const createdate = moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss'); // User Created Date
				const joindate = moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss'); // User Joined the Server Date
				const status = user.presence.status;
				const avatar = user.avatarURL({ size: 2048 }); // Use 2048 for high quality avatar.

				const embed = new Discord.MessageEmbed()

					.setAuthor(user.tag, 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.setThumbnail(avatar)
					.setTimestamp()
					.setColor(0x7289DA)
					.addField('ID', user.id, true)
					.addField('Nickname', nickname, true)
					.addField('Created Account Date', `${createdate} \nsince ${created} day(s) ago`, true)
					.addField('Joined Guild Date', `${joindate} \nsince ${joined} day(s) ago`, true)
					.addField('Status', status, true)
					.addField('Game', game(), true);

				msg.channel.send(embed);
	},
};