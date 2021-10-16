/* eslint-disable no-unused-vars */
module.exports = {
	name: 'check',
	description: 'Check the server settings',
	execute(msg, args) {
		const client = msg.client;
		const mysql = require('mysql');
		const connection = mysql.createConnection({
			adapter: 'sails-mysql',
			host: 'localhost',
			user: 'root',
			password: 'latehome4',
			database: 'discord',
			charset: 'utf8mb4',
			socketPath: '/var/run/mysqld/mysqld.sock',
		});
		connection.connect()
		const Discord = require('discord.js')
	connection.query('select * from profiles where name = ?', [msg.member.user.username], async function (error, results1, fields) {
                const Canvas = require('canvas')
				const canvas = Canvas.createCanvas(700, 250);
				const ctx = canvas.getContext('2d');

				const background = await Canvas.loadImage('./emptycheck.png');
				ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

				ctx.strokeStyle = '#74037b';
				ctx.strokeRect(0, 0, canvas.width, canvas.height);

				// Slightly smaller text placed above the member's display name
				ctx.font = 'bold 30px sans-serif';
				ctx.fillStyle = '#000000';
				ctx.fillText(msg.member.user.username, 140, canvas.height / 2.15);

				// Add an exclamation point here and below
				// ctx.font = applyText(canvas, `${member.displayName}!`);
				ctx.font = '12px sans-serif';

				ctx.fillStyle = '#f';
				ctx.fillText('$'+((9000 * results1[0].smallhouse) + (16000 * results1[0].mediumhouse) + (30000 * results1[0].largehouse) + (45000 * results1[0].smallmansion) + (10 * results1[0].bonds) + 2500).toString(), 575, canvas.height / 2.15);

				ctx.beginPath();
				ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
				ctx.closePath();
				ctx.clip();
				// const avatar = await Canvas.loadImage('./finalimage.png');

				// ctx.drawImage(avatar, 50, 25, 50, 50);

				const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'emptycheck1.jpg');
				// msg.reply(attachment);
				const settingsembed1 = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Bank Statement')
					.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.addFields(
						{ name: '🏠 Real Estate Gain', value: '$'+((9000 * results1[0].smallhouse) + (16000 * results1[0].mediumhouse) + (30000 * results1[0].largehouse) + (45000 * results1[0].smallmansion)).toString(), inline: true },
						{ name: '💵 Bonds Interest', value: '$'+((10 * results1[0].bonds)).toString(), inline: true },
						{ name: '📉 Loan Payment', value: '-$'+(Math.floor(results1[0].loan*0.05)).toString(), inline: true },
						{ name: '🤑 Capital Gains Tax', value: '-$'+(Math.floor(((9000 * results1[0].smallhouse) + (16000 * results1[0].mediumhouse) + (30000 * results1[0].largehouse) + (45000 * results1[0].smallmansion) + (10 * results1[0].bonds))-(parseInt(results1[0].loan*0.05)))*0.15).toString(), inline: true },
						{ name: '🌟 Net Profit', value: '$'+(Math.floor((9000 * results1[0].smallhouse) + (16000 * results1[0].mediumhouse) + (30000 * results1[0].largehouse) + (45000 * results1[0].smallmansion) + (10 * results1[0].bonds) + 2500)-((results1[0].loan*0.05)+(((9000 * results1[0].smallhouse) + (16000 * results1[0].mediumhouse) + (30000 * results1[0].largehouse) + (45000 * results1[0].smallmansion) + (10 * results1[0].bonds))-(parseInt(results1[0].loan*0.05)))*0.15).toString()), inline: true },
						{ name: ':moneybag: Net Worth', value: '$'+(Math.floor((200000 * results1[0].smallhouse) + (400000 * results1[0].mediumhouse) + (800000 * results1[0].largehouse) + (1200000 * results1[0].smallmansion) + (200 * results1[0].bonds)+results1[0].coins+results1[0].deposit)-((results1[0].loan)).toString()), inline: true },

					);
					msg.channel.send(settingsembed1)

				})
	},
};
