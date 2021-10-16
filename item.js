/* eslint-disable no-unused-vars */
module.exports = {
	name: 'item',
	description: 'Check a luxury item!',
	execute(msg, args) {
		const client = msg.client;
		const mysql = require('mysql');
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'latehome4',
			database:'discord',
			charset : 'utf8mb4',
		});
		const Discord = require('discord.js')
		connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {

					
					if (msg.content.endsWith('icon')) {
						const exampleEmbed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setAuthor('Icon (' + results[0].icon.toString() + ')', 'https://cdn.discordapp.com/emojis/786624255861325845.png?v=1')
							.setDescription('Buy the Softwaresat logo for a cheap price. The more, the better!')
							.setThumbnail('https://cdn.discordapp.com/emojis/786624255861325845.png?v=1')
							.addFields(
								{ name: 'Shop Price', value: '100' },
								{ name: 'Trading Price', value: '40-50' }
							);
							

						msg.channel.send(exampleEmbed);

					}
					else if (msg.content.endsWith('cgem')) {
						const exampleEmbed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setAuthor('Common Gem (' + results[0].cgem.toString() + ')', 'https://cdn.discordapp.com/emojis/846424175362834464.png?v=1')
							.setDescription('This gem is a step up from the icon, but can still be found everywhere!')
							.setThumbnail('https://cdn.discordapp.com/emojis/846424175362834464.png?v=1')
							.addFields(
								{ name: 'Shop Price', value: '100,000' },
								{ name: 'Trading Price', value: '30,000-40,000' }
							);
							

						msg.channel.send(exampleEmbed);

					}
					else if (msg.content.endsWith('rgem')) {
						const exampleEmbed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setAuthor('Rare Gem (' + results[0].rgem.toString() + ')', 'https://cdn.discordapp.com/emojis/846424049147707402.png?v=1')
							.setDescription('This gem is for the highest in the corporate ladder, and for small business owners!')
							.setThumbnail('https://cdn.discordapp.com/emojis/846424049147707402.png?v=1')
							.addFields(
								{ name: 'Shop Price', value: '500,000' },
								{ name: 'Trading Price', value: '100,000-200,000' }
							);
							

						msg.channel.send(exampleEmbed);

					}
					else if (msg.content.endsWith('sword')) {
						const exampleEmbed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setAuthor('Softwaresat Sword (' + results[0].ssword.toString() + ')', 'https://cdn.discordapp.com/emojis/834473180168060968.png?v=1')
							.setDescription('This sword is more of a showpiece, not many people have it, so show it off while you can!')
							.setThumbnail('https://cdn.discordapp.com/emojis/834473180168060968.png?v=1')
							.addFields(
								{ name: 'Shop Price', value: '5,000,000' },
								{ name: 'Trading Price', value: '2 mil-3 mil' }
							);
							

						msg.channel.send(exampleEmbed);

					}
					else if (msg.content.endsWith('medal')) {
						const exampleEmbed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setAuthor('Softwaresat Medal (' + results[0].medal.toString() + ')', 'https://discord.com/assets/c9b563417a1ff01700edc358b5fc309f.svg')
							.setDescription('Flex your pro abilities with this medal. It showcases your financial literacy and your ability to go from rags to riches!')
							.setThumbnail('https://discord.com/assets/c9b563417a1ff01700edc358b5fc309f.svg')
							.addFields(
								{ name: 'Shop Price', value: '10,000,000' },
								{ name: 'Trading Price', value: '5 mil-7 mil' }
							);
							

						msg.channel.send(exampleEmbed);

					}
					else if (msg.content.endsWith('crown')) {
						const exampleEmbed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setAuthor('Softwaresat Crown (' + results[0].crown.toString() + ')', 'https://cdn.discordapp.com/emojis/846423750727696445.png?v=1')
							.setDescription('This crown is the best of the best. Being the major flex item in the game, it brings you great value and you will be noticed by everyone. Trade this item wisely, as it is hard to obtain...')
							.setThumbnail('https://cdn.discordapp.com/emojis/846423750727696445.png?v=1')
							.addFields(
								{ name: 'Shop Price', value: '50,000,000' },
								{ name: 'Trading Price', value: '30 mil-40 mil' }
							);
							

						msg.channel.send(exampleEmbed);

					}
					else{
						const embed = new Discord.MessageEmbed()
		    .setTitle(`Item - Error!`)
		    .addFields(
				{ name: 'Error', value: 'Possible Issues: Item doesn\'t exist, id wrong, or item not supported with this command yet Ex. `.item crown`', inline: false },
					);
		  msg.channel.send(embed);
					}
				});
	},
};