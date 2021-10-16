module.exports = {
	name: 'stats',
	description: 'Ping!',
	execute(msg, args) {
			var os = require('os');

			var usedMemory = os.totalmem() - os.freemem(), totalMemory = os.totalmem();

			var getpercentage =
			  ((usedMemory / totalMemory) * 100).toFixed(2) + '%';
			const fs = require('fs');
			var stats = fs.statSync('testbot.js');
            var mtime = stats.mtime;
            const Discord = require('discord.js');
            const client = msg.client;

			
				const settingsembed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Stats for Softwaresat Bot | Milestone 11.x')
					.setAuthor('Misc', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setDescription('Here you can view the different statistics for the bot\'s hosting!')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.addFields(
						{ name: 'Library', value: 'discord.js', inline: true },
						{ name: 'Servers', value: `${client.guilds.cache.size}`, inline: true },
						{ name: 'Ping', value: ` ${client.ws.ping}ms`, inline: true },
						{ name: 'Ram Usage', value: (usedMemory / Math.pow(1024, 3)).toFixed(2) + 'GB/3GB', inline: true },
						{ name: 'Ram Usage Percentage', value: getpercentage, inline: true },
						{ name: 'Last Updated', value: mtime, inline: true },
						{ name: 'Operating System', value: 'Ubuntu Server 20.04 LTS', inline: true },


					);
				settingsembed.setTimestamp();

				msg.channel.send(settingsembed);
			
	},
};