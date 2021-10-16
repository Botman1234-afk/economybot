/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
/* eslint-disable no-inline-comments */
module.exports = {
	name: 'help fun',
	description: 'Ping!',
	async execute(msg, args) {
		const Discord = require('discord.js');
		const mysql = require('mysql');
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'latehome4',
			database:'discord',
			charset : 'utf8mb4',
		});

		const client = msg.client;
				connection.query('select * from settings where servername = ?', [msg.guild.name], async function (error, results, fields) {
	const funhelp = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Fun Help Page 1!')
					.setAuthor('Help', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.addFields(
						{ name: 'Random Meme', value: '"' + `${results[0].prefix}` + 'meme"', inline: false },
						{ name: 'Find Relative Location of Specified IP Address', value: '"' + `${results[0].prefix}` + 'ip <ip address>"', inline: false },
						{ name: 'User Specified Image', value: '"' + `${results[0].prefix}` + 'image <term>"', inline: false },
						{ name: 'Random Image', value: '"' + `${results[0].prefix}` + 'randomimage"', inline: false },
						{ name: 'Random Dog Image', value: '"' + `${results[0].prefix}` + 'dogimage"', inline: false },
						{ name: 'Random Cat Image', value: '"' + `${results[0].prefix}` + 'catimage"', inline: false },
						{ name: 'Guess Number', value: '"' + `${results[0].prefix}` + 'guessnumber"', inline: false },
						{ name: 'Bubblewrap', value: '"' + `${results[0].prefix}` + 'bubblewrap"', inline: false },
						{ name: 'Hex Color Viewer', value: '"' + `${results[0].prefix}` + 'color"', inline: false },
						{ name: 'Play Campaign', value: '"' + `${results[0].prefix}` + 'story"', inline: false },
						{ name: 'Hunting', value: '"' + `${results[0].prefix}` + 'hunt"', inline: false },
						{ name: 'Profile', value: '"' + `${results[0].prefix}` + 'bal"', inline: false },
						{ name: 'Campaign Inventory', value: '"' + `${results[0].prefix}` + 'inventory"', inline: false },
						{ name: 'Shop', value: '"' + `${results[0].prefix}` + 'shop"', inline: false },
						{ name: 'Buy item in campaign', value: '"' + `${results[0].prefix}` + 'buy <item id>"', inline: false },
						{ name: 'Counting', value: 'Add a channel called counting, and start counting from 0!', inline: false },
						{ name: 'Set Counting Type', value: '"' + `${results[0].prefix}` + 'setcountingtype <chain or traditional>" \n chain is where it tells you if you put the wrong number or counted twice \n traditional is where it just deletes the message. Default is traditional!', inline: false },
						{ name: 'Work (once per hour)', value: '"' + `${results[0].prefix}` + 'work', inline: false },
						{ name: 'Set Job', value: '"' + `${results[0].prefix}` + 'become <job>', inline: false },
						{ name: 'Job list', value: '"' + `${results[0].prefix}` + 'joblist', inline: false },
						{ name: 'Take a loan (auto-pays off every day for 10 days)', value: '"' + `${results[0].prefix}` + 'loan <amount less than 100k>', inline: false },
						{ name: 'Pay Loan', value: '"' + `${results[0].prefix}` + 'pay <amount>', inline: false },
						{ name: 'Check your Business', value: '"' + `${results[0].prefix}` + 'business', inline: false },
						{ name: 'Create Business', value: '"' + `${results[0].prefix}` + 'create business <name (3 words long)>', inline: false },
						

					);
				const funhelp2 = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Fun Help Page 2!')
					.setAuthor('Help', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.addFields(
						{ name: 'Invite to business', value: '"' + `${results[0].prefix}` + 'invitebusiness <mention person>', inline: false },
						{ name: 'Buy item from shop', value: '"' + `${results[0].prefix}` + 'buy <item>', inline: false },
						{ name: 'check global stock amount leaderboard', value: '"' + `${results[0].prefix}` + 'blb <business name>', inline: false },
						{ name: 'Sell stocks', value: '"' + `${results[0].prefix}` + 'sell <business name> <amount>', inline: false },
						{ name: 'Sell houses', value: '"' + `${results[0].prefix}` + 'sell <house name>', inline: false },
						{ name: 'Deposit', value: '"' + `${results[0].prefix}` + 'deposit <amount>', inline: false },
						{ name: 'Withdraw', value: '"' + `${results[0].prefix}` + 'withdraw <amount>', inline: false },
						{ name: 'Global money leaderboard', value: '"' + `${results[0].prefix}` + 'glb', inline: false },
						{ name: 'Market', value: '"' + `${results[0].prefix}` + 'market', inline: false },
						{ name: 'Info', value: '"' + `${results[0].prefix}` + 'info <business name>', inline: false },
						{ name: 'Buy Stocks', value: '"' + `${results[0].prefix}` + 'buy stocks <business name>', inline: false },
						{ name: 'Real Estate Market', value: '"' + `${results[0].prefix}` + 'housingmarket', inline: false },
						{ name: 'Buy House', value: '"' + `${results[0].prefix}` + 'buy <house id>', inline: false },
						{ name: 'Give Money', value: '"' + `${results[0].prefix}` + 'give <mention person> <amount in coins>', inline: false },
						{ name: 'Bailout Business', value: '"' + `${results[0].prefix}` + 'bailout', inline: false },
						{ name: 'Subscriptions', value: '"' + `${results[0].prefix}` + 'subscriptions', inline: false },
						{ name: 'Dm Notifications (false = yes and true = no)', value: '"' + `${results[0].prefix}` + 'blockdm <true or false>', inline: false },
						{ name: 'List of employees in your business', value: '"' + `${results[0].prefix}` + 'employees', inline: false },
						{ name: 'Delete Job', value: '"' + `${results[0].prefix}` + 'purge job <job name>', inline: false },
						{ name: 'Edit Job', value: '"' + `${results[0].prefix}` + 'edit job <job name> <job pay> <job required hours>', inline: false },
						{ name: 'Fire People From Business', value: '"' + `${results[0].prefix}` + 'fire <mention person>', inline: false },
						{ name: 'Gift Items', value: '"' + `${results[0].prefix}` + 'gift <amount> <item> <mention person gaining>', inline: false },
						{ name: 'Reset Account (use it if you have a large loan and can\'t pay it)', value: '"' + `${results[0].prefix}` + 'resetaccount', inline: false },
						{ name: 'Check your net profit and bank statement', value: '"' + `${results[0].prefix}` + 'check', inline: false },


					);
					const funhelp3 = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Fun Help Page 3!')
					.setAuthor('Help', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.addFields(
						{ name: 'Blackjack', value: '"' + `${results[0].prefix}` + 'bj <amount or max/all>"', inline: false },
						{ name: 'Bet', value: '"' + `${results[0].prefix}` + 'bet <amount or max/all>"', inline: false },
						{ name: 'Withdraw from your Business', value: '"' + `${results[0].prefix}` + 'bwithdraw <amount>"', inline: false },
						{ name: 'Deposit into your Business', value: '"' + `${results[0].prefix}` + 'bdeposit <amount>"', inline: false },
						{ name: 'Mine', value: '"' + `${results[0].prefix}` + 'mine"', inline: false },
						{ name: 'Chop', value: '"' + `${results[0].prefix}` + 'chop"', inline: false },
						{ name: 'Fish', value: '"' + `${results[0].prefix}` + 'fish"', inline: false },
						{ name: 'Pepe', value: '"' + `${results[0].prefix}` + 'pepe"', inline: false },
						{ name: 'Triggered', value: '"' + `${results[0].prefix}` + 'triggered <user>"', inline: false },
						{ name: 'Wasted', value: '"' + `${results[0].prefix}` + 'wasted <user>"', inline: false },
						{ name: 'Comment', value: '"' + `${results[0].prefix}` + 'comment <message>"', inline: false },
						{ name: 'Invert', value: '"' + `${results[0].prefix}` + 'invert <user>"', inline: false },
						{ name: 'Pixelate', value: '"' + `${results[0].prefix}` + 'pixelate <user>"', inline: false },
						{ name: 'Grade', value: '"' + `${results[0].prefix}` + 'grade"', inline: false },
						{ name: 'Easy Investing Wizard', value: '"' + `${results[0].prefix}` + 'invest"', inline: false },
						{ name: 'Check how much of an item you have', value: '"' + `${results[0].prefix}` + 'item <name>"', inline: false },
						{ name: 'Decrypt', value: '"' + `${results[0].prefix}` + 'decrypt <message>"', inline: false },
						{ name: 'Encrypt', value: '"' + `${results[0].prefix}` + 'encrypt <message>"', inline: false },
						{ name: 'Joke', value: '"' + `${results[0].prefix}` + 'joke"', inline: false },
						{ name: 'Lyrics', value: '"' + `${results[0].prefix}` + 'lyrics <title>."', inline: false },
						{ name: 'Pokemon', value: '"' + `${results[0].prefix}` + 'pokemon <name_of_pokemon>."', inline: false },
						{ name: 'Create custom job in business (must be ceo)', value: '"' + `${results[0].prefix}` + 'create job <name> <money> <requiredhours>', inline: false },
						{ name: 'Check bank balance', value: '"' + `${results[0].prefix}` + 'bank', inline: false },
						{ name: 'Subscriptions', value: '"' + `${results[0].prefix}` + 'subscriptions', inline: false },

					);
						const mainfunhelp = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Fun Help Index!')
					.setAuthor('Help', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.addFields(
						{ name: 'Misc', value: '"' + `${results[0].prefix}` + '`help funmisc`"', inline: false },
						{ name: 'Balances/Info', value: '"' + `${results[0].prefix}` + '`help funbal`"', inline: false },
						{ name: 'Settings', value: '"' + `${results[0].prefix}` + '`help funsettings`"', inline: false },
						{ name: 'Buying', value: '"' + `${results[0].prefix}` + '`help funbuying`"', inline: false },
						{ name: 'Investing', value: '"' + `${results[0].prefix}` + '`help funinvesting`"', inline: false },
						{ name: 'Other Income Generating', value: '"' + `${results[0].prefix}` + '`help funotherincome`"', inline: false },
						{ name: 'Transferring Money', value: '"' + `${results[0].prefix}` + '`help funtransfers`"', inline: false },
						{ name: 'Business', value: '"' + `${results[0].prefix}` + '`help funbusiness`"', inline: false },
						{ name: 'Gambling', value: '"' + `${results[0].prefix}` + '`help fungambling`"', inline: false },


						);
							
					// const { ReactionCollector } = require('discord.js-collector')

					// const botMessage = await 
					msg.channel.send(mainfunhelp);
				// ReactionCollector.paginator({
				// 	botMessage,
				// 	user: msg.author,
				// 	pages: [
				// 		funhelp,
				// 		funhelp2,
				// 		funhelp3,
				
				// 	],
				// 	collectorOptions: {
				// 		time: 60000
				// 	}
				// });
		})
	},
};