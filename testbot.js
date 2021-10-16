const Discord = require('discord.js');
const prefix = '.';
let channel;
const moment = require('moment');
const { KSoftClient } = require('@ksoft/api');
const fetch = require('node-fetch');
const ksoft = new KSoftClient('5b30001a5f870239da1ae841ecc541eabfc038c7');
var serverName;
let embed;
let amount;
const fs = require('fs')
const Canvas = require('canvas');
const cusswords = [];
// const AntiSpam = require('discord-anti-spam');

// const antiSpam = new AntiSpam({
// 	warnThreshold: 5,
// 	kickThreshold: 10,
// 	muteThreshold: 8,
// 	maxInterval: 1000,
// 	warnMessage: '{@user}, Please stop spamming.',
// 	kickMessage: '**{user_tag}** has been kicked for spamming.',
// 	muteMessage: '**{user_tag}** has been muted for spamming.',
// 	maxDuplicatesWarning: 8,
// 	maxDuplicatesKick: 10,
// 	maxDuplicatesMute: 5,
// 	exemptPermissions: ['ADMINISTRATOR'],
// 	ignoreBots: true,
// 	verbose: true,
// 	ignoredUsers: [],
// });
// const reactionRole = {
// 	guild = "", //Guild ID
// 	channel = "", //Role ID 
// 	message = "", //Channel ID
// 	reaction = "✅", //Emoji
// 	role = "", //Role ID
// // }
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
const { Client, Intents } = require('discord.js');
const client = new Client({ ws: { intents: Intents.NON_PRIVILEGED['GUILD_MEMBERS'] } });
const { ReactionRoleManager } = require('discord.js-collector'); //We import the discord.js-collector package that'll make reaction roles possible
const reactionRoleManager = new ReactionRoleManager(client, {
    storage: true, // Enable reaction role store in a Json file
    mongoDbLink: 'mongodb+srv://satvikag:latehome4@cluster0.v19pd.mongodb.net/' // See here to see how setup mongoose: https://github.com/IDjinn/Discord.js-Collector/blob/master/examples/reaction-role-manager/Note.md

});
// const myIntents = new Intents();
// myIntents.add(Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS);

reactionRoleManager.on('ready', () => {
    console.log('Reaction Role Manager is ready!');
});
reactionRoleManager.on('missingPermissions', (action, member, roles, reactionRole) => {
    console.log(`Some roles cannot be ${action === 1 ? 'given' : 'taken'} to member \`${member.displayName}\`, because i don't have permissions to manage these roles: ${roles.map(role => `\`${role.name}\``).join(',')}`);
});

// When user react and win role, will trigger this event
reactionRoleManager.on('reactionRoleAdd', (member, role) => {
	console.log('2')
    console.log(member.displayName + ' won the role' + role.name)
    	let dmembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Role Added')
							.setDescription('You have gotten the '+role.name + ' role by reacting in '+member.guild.name)
		member.send(dmembed)
});

// When user remove reaction and lose role, will trigger this event
reactionRoleManager.on('reactionRoleRemove', (member, role) => {
    console.log(member.displayName + ' lose the role' + role.name)
    	let dmembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Role Removed')
							.setDescription('You have lost the '+role.name + ' role by unreacting in '+member.guild.name)
		member.send(dmembed)
});

// When someone removed all reactions from message
reactionRoleManager.on('allReactionsRemove', (message) => {
    console.log(`All reactions from message ${message.id} was removed, all roles was taken and reactions roles deleted.`)
});

// If member doesn't have all requirements, this event is triggered.
reactionRoleManager.on('missingRequirements', (type, member, reactionRole) => {
    console.log(`Member '${member.id}' will not win role '${reactionRole.role}', because him hasn't requirement ${type}`);
});

// Triggered when the bot doesn't have permissions to manage this role.
reactionRoleManager.on('missingPermissions', (action, member, roles, reactionRole) => {
    console.log(`Some roles cannot be ${action === 1 ? 'given' : 'taken'} to member \`${member.displayName}\`, because i don't have permissions to manage these roles: ${roles.map(role => `\`${role.name}\``).join(',')}`);
});
client.on('ready', async() => {
	const servers = await client.guilds.cache.size
	// statcord.autopost();

	connection.query('select * from cusswords', async function(error, results) {
		results.forEach(result => {
			cusswords.push(`${result.word}`);
		});
		const activities_list = [
			'softwaresat.onthewifi.com',
			'dsc.gg/software',

		];

		setInterval(() => {
			var actID = Math.floor(Math.random() * Math.floor(activities_list.length));
			client.user.setActivity(activities_list[actID]); // sets bot's activities to one of the phrases in the arraylist.
		}, 10000); // Runs this every 10 seconds.
	});

	console.log(`Logged in as ${client.user.tag}!`);
	// client.user.setActivity(`${client.users.cache.size} users | shelp`, { type: 'WATCHING' });
	// client.user.setActivity('RECURRING POWER OUTAGE | shelp');


	const express = require('express')
	// const { Webhook } = require(`@top-gg/sdk`)

	const app = express()
	// const wh = new Webhook('webhookauth123')
	client.on('guildMemberAdd', async member => {
		// Send the message to a designated channel on a server:
		// eslint-disable-next-line no-unused-vars
		connection.query('select * from settings where servername = ?', [member.guild.name], async(error, results, fields) => {
			let channel;
			if (results[0] != undefined && results[0] != 'undefined') {
				channel = member.guild.channels.cache.find(ch => ch.name === `${results[0].welcomechannel}`);
			}
			// Do nothing if the channel wasn't found on this server
			if (channel) {
				// Send the message, mentioning the member
				// // channel.send(`Welcome to the server, ${person}` + '!!!');
				// const canvas = Canvas.createCanvas(700, 250);
				// const ctx = canvas.getContext('2d');
				// if(results[0].welcomepicture != 'null' && results[0].welcomepicture != null){
				// const background = await Canvas.loadImage(results[0].welcomepicture);
				// }
				// else{
				// 	const background = await Canvas.loadImage('./image.png');

				// }
				// ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

				// ctx.strokeStyle = '#74037b';
				// ctx.strokeRect(0, 0, canvas.width, canvas.height);

				// // Slightly smaller text placed above the member's display name
				// ctx.font = 'bold 30px sans-serif';
				// ctx.fillStyle = '#ffffff';
				// ctx.fillText('Welcome To The Server,', canvas.width / 2.5, canvas.height / 3.5);

				// // Add an exclamation point here and below
				// // ctx.font = applyText(canvas, `${member.displayName}!`);
				// ctx.fillStyle = '#f';
				// ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

				// ctx.beginPath();
				// ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
				// ctx.closePath();
				// ctx.clip();

				// const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
				// ctx.drawImage(avatar, 25, 25, 200, 200);

				// const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
				// connection.query('select welcomemessage from settings where servername = ?', [member.guild.name], function (error, results) {
				// 	channel.send(`${results[0].welcomemessage}, ${member}!`, attachment);
				// });
				embed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Welcome to ' + member.guild.name + '!')

					.addFields({ name: member.user.username, value: results[0].welcomemessage, inline: false }, )
					.setTimestamp()
					.setFooter(member.guild.memberCount.toString() + ' Members')
				if (results[0].welcomepicture != null && results[0].welcomepicture != 'null') {
					embed.setImage(results[0].welcomepicture)
				}
				else {
					embed.setImage(member.guild.iconURL())
				}
				channel = member.guild.channels.cache.find(ch => ch.name === `${results[0].welcomechannel}`);

				if (channel) {
					channel.send(embed)
				}
				// eslint-disable-next-line no-shadow
				connection.query('select autorole from settings where servername = ?', [member.guild.name], function(error, results) {
					if (`${results[0].autorole}` != 'None') {
						const role = member.guild.roles.cache.find(({ name }) => name === `${results[0].autorole}`);
						if (role != undefined || role != 'undefined') {
							member.roles.add(role);
						}
					}
				});
			}
		});
	});
	// post('/dblwebhook', wh.middleware(), async (req, res) => {
	//   // req.vote is your vote object e.gapp.
	// console.log(500)
	//   const guild1 = client.guilds.cache.get('763913144653316126');

	// 	  connection.query('select * from profiles where userid = ?', [req.vote.user], async function (error, results1, fields) {


	// 		connection.query('update profiles set coins = ? where name = ?', [results1[0].coins+10000, results1[0].name], function (error, results, fields) {
	// 		});
	// 		embed = new Discord.MessageEmbed()
	// 	  .setColor('#0099ff')
	// 	  .setTitle('Someone just voted!')

	// 	  .addFields(
	// 		  { name: 'Name', value: results1[0].name, inline: false },
	// 		  { name: 'Credits', value: 'YOU HAVE RECEIVED $10000', inline: false },


	// 	  );
	// 	   guild1.channels.cache.find(t => t.name == '🔎│topgg-votes').send(embed);

	// 	});


	// })

	//Fetch Message
	// client.guilds.cache.get(reactionRole.guild).channels.get(reactionRole.channel).fetchMessage(reactionRole.message);

	// setInterval(async () => {
	// 	connection.query('select count(*) as number from bussiness', ['bank'], function (error, results21, fields) {

	// 		connection.query('select sum(deposit) as total from profiles', ['bank'], function (error, results11, fields) {

	// 			connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {
	// 				if (results1[0].coins > (results11[0].total * 0.5)) {
	// 					let number = 0;
	// 					const number1 = Math.floor(Math.floor(Math.random() * results21[0].number)) + 1;
	// 					connection.query('select * from bussiness where id = ?', [number1], function (error, results2, fields) {
	// 						connection.query('select * from stocks where business = ?', [results2[0].name], function (error, results3, fields) {
	// 							results3.forEach(result => {
	// 								number = number + result.number;
	// 							});
	// 							connection.query('select * from stocks where name = ? && business = ?', ['bank', results2[0].name], function (error, results5, fields) {
	// 								if (results5[0] == undefined || results5[0] == null || results5[0] == 'undefined' || results5[0] == 'null') {
	// 									connection.query('insert into stocks(name, number, business) values(?,?,?)', ['bank', 1, results2[0].name], function (error, results, fields) {
	// 									});
	// 									connection.query('update bussiness set balance = ? where name = ?', [results2[0].balance + Math.floor(results2[0].stockvalue / number), results2[0].name], function (error, results, fields) {
	// 									});
	// 									connection.query('update bussiness set stockvalue = ? where name = ?', [results2[0].stockvalue + Math.floor(results2[0].stockvalue / number), results2[0].name], function (error, results, fields) {
	// 									});
	// 									connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - Math.floor(results2[0].stockvalue / number), 'bank'], function (error, results, fields) {
	// 									});
	// 									console.log(10);

	// 								}
	// 								else {
	// 									connection.query('update stocks set number = ? where name = ? && business = ?', [results5[0].number + 1, 'bank', results2[0].name], function (error, results, fields) {
	// 									});
	// 									connection.query('update bussiness set balance = ? where name = ?', [results2[0].balance + Math.floor(results2[0].stockvalue / number), results2[0].name], function (error, results, fields) {
	// 									});
	// 									connection.query('update bussiness set stockvalue = ? where name = ?', [results2[0].stockvalue + Math.floor(results2[0].stockvalue / number), results2[0].name], function (error, results, fields) {
	// 									});
	// 									connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - Math.floor(results2[0].stockvalue / number), 'bank'], function (error, results, fields) {
	// 									});
	// 									console.log(10);
	// 								}

	// 							});
	// 						});
	// 					});
	// 				}
	// 			});
	// 		});
	// 	});
	// }, 1000);

	// setInterval(async () => {
	// 	const nz_date_string = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
	// 	const date_nz = new Date(nz_date_string);

	// 	// hours as (HH) format
	// 	const hours = ('0' + date_nz.getHours()).slice(-2);

	// 	// minutes as (mm) format
	// 	const minutes = ('0' + date_nz.getMinutes()).slice(-2);

	// 	// seconds as (ss) format
	// 	const seconds = ('0' + date_nz.getSeconds()).slice(-2);

	// 	const time_hh_mm_ss = hours + ':' + minutes + ':' + seconds;
	// 	connection.query('select * from profiles', async function (error, results, fields) {

	// 		results.forEach(async result => {
	// 			// console.log(result.bankmembership.substr(2,2))

	// 			if (result.userid != undefined && result.userid != null && result.lastdaily != nz_date_string.substr(0, 10)) {
	// 				let user = client.users.cache.get(result.userid);

	// 				connection.query('update profiles set lastdaily=? where name=?', [nz_date_string.substr(0, 10), result.name], async function (error, results, fields) {


	// 				});
	// 				const canvas = Canvas.createCanvas(700, 250);
	// 				const ctx = canvas.getContext('2d');

	// 				const background = await Canvas.loadImage('./emptycheck.png');
	// 				ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	// 				ctx.strokeStyle = '#74037b';
	// 				ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// 				// Slightly smaller text placed above the member's display name
	// 				ctx.font = 'bold 37px sans-serif';
	// 				ctx.fillStyle = '#000000';
	// 				ctx.fillText(result.name.toString(), 175, canvas.height / 2.15);

	// 				// Add an exclamation point here and below
	// 				// ctx.font = applyText(canvas, `${member.displayName}!`);
	// 				ctx.font = '12px sans-serif';

	// 				ctx.fillStyle = '#f';
	// 				ctx.fillText(((9000 * result.smallhouse) + (16000 * result.mediumhouse) + (30000 * result.largehouse) + (45000 * result.smallmansion) + (10 * result.bonds) + 5000).toString(), 575, canvas.height / 2.15);

	// 				ctx.beginPath();
	// 				ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	// 				ctx.closePath();
	// 				ctx.clip();
	// 				// const avatar = await Canvas.loadImage('./finalimage.png');

	// 				// ctx.drawImage(avatar, 50, 25, 50, 50);

	// 				const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'emptycheck1.jpg');
	// 				connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {


	// 					connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - ((9000 * result.smallhouse) + (16000 * result.mediumhouse) + (30000 * result.largehouse) + (45000 * result.smallmansion) + 5000), 'bank'], function (error, results, fields) {
	// 					});

	// 				});
	// 				connection.query('update profiles set coins = ? where name = ?', [result.coins + ((9000 * result.smallhouse) + (16000 * result.mediumhouse) + (30000 * result.largehouse) + (45000 * result.smallmansion) + 5000), result.name.toString()], function (error, results, fields) {
	// 				});

	// 				user = client.users.cache.get(result.userid);
	// 				if (user != undefined && user != null) {
	// 					if(result.dmblock == 0){

	// 					user.send(attachment);
	// 					user.send('This is your daily salary for today, it has been transferred into your account!');
	// 					user.send('To disable DM notifications: run the setblockdm true command preceded with your server\'s prefix')

	// 					}
	// 				}


	// 				console.log(5);
	// 				if (result.job == 'ceo') {
	// 					connection.query('select * from stocks where name = ? and business = ?', [result.name, result.bussiness], function (error, results10, fields) {
	// 						connection.query('select * from stocks where business = ?', [result.bussiness], function (error, results6, fields) {

	// 							connection.query('select * from bussiness where name = ?', [result.bussiness], function (error, results1, fields) {

	// 								connection.query('update stocks set number = ? where name = ? and business = ?', [results10[0].number + 30, result.name.toString(), result.bussiness], function (error, results, fields) {
	// 								});
	// 								let number = 0;
	// 								results6.forEach(result1 => {
	// 									number = number + result1.number;
	// 								});
	// 								connection.query('update bussiness set stockvalue = ? where name = ?', [results1[0].stockvalue + ((results1[0].stockvalue / number) * parseInt('30')), result.bussiness], function (error, results3, fields) {
	// 								});
	// 								connection.query('select * from profiles where name = ?', ['bank'], function (error, results10, fields) {


	// 									connection.query('update profiles set coins = ? where name = ?', [results10[0].coins - ((results1[0].stockvalue / number) * parseInt('30')), 'bank'], function (error, results, fields) {
	// 									});

	// 								});
	// 								connection.query('update bussiness set balance = ? where name = ?', [results1[0].balance + ((results1[0].stockvalue / number) * parseInt('30')), result.bussiness], function (error, results3, fields) {
	// 								});
	// 								if(result.dmblock == 0){
	// 								user.send('You have received your daily shares!');
	// 								}
	// 							});
	// 						});
	// 					});

	// 				}
	// 				// if(result.businessmembership.substring()){

	// 				// }
	// 				if (result.bussiness != 'null' && result.bussiness != 'undefined' && result.bussiness != undefined && result.bussiness != null && result.job != 'ceo') {
	// 					console.log(10);
	// 					connection.query('select * from bussiness where name = ?', [result.bussiness], function (error, results1, fields) {
	// 						if (results1[0].dailystocks > 0) {
	// 							console.log(5);
	// 							connection.query('select * from stocks where business = ?', [result.bussiness], function (error, results6, fields) {
	// 								connection.query('select * from stocks where name = ? and business = ?', [result.name, result.bussiness], function (error, results10, fields) {

	// 									let number = 0;
	// 									results6.forEach(result1 => {
	// 										number = number + result1.number;
	// 									});
	// 									if (results10[0] != undefined && results10[0] != null && results10[0] != 'null' && results[0] != 'undefined') {
	// 										connection.query('update stocks set number = ? where name = ? and business = ?', [results10[0].number + results1[0].dailystocks, result.name.toString(), result.bussiness], function (error, results, fields) {
	// 										});
	// 									}
	// 									else {
	// 										connection.query('insert into stocks(name, number, business) values(?,?,?)', [result.name.toString(), results1[0].dailystocks, result.bussiness], function (error, results, fields) {
	// 										});
	// 									}
	// 									connection.query('update bussiness set stockvalue = ? where name = ?', [results1[0].stockvalue + ((results1[0].stockvalue / number) * results1[0].dailystocks), result.bussiness], function (error, results3, fields) {
	// 									});

	// 								});
	// 							});
	// 							const user = client.users.cache.get(result.userid);
	// 							if(result.dmblock == 0){

	// 							user.send('You have received your daily shares!');
	// 							}
	// 						}
	// 					});
	// 				}
	// 			}

	// 			else if (result.loan + result.loan * 0.05 <= result.paidback && result.loan != 0 && result.userid != undefined && result.userid != null) {
	// 				const user = client.users.cache.get(result.userid);

	// 				connection.query('update profiles set loan = ? where name = ?', [0, result.name.toString()], function (error, results, fields) {
	// 				});
	// 				connection.query('update profiles set paidback = ? where name = ?', [0, result.name.toString()], function (error, results, fields) {
	// 				});
	// 				if(result.dmblock == 0){

	// 				user.send('Your loan has been paid back!');
	// 				}
	// 				console.log(2);

	// 			}

	// 			else if (result.loan != 0 && result.paidback < result.loan + result.loan * 0.05 && result.userid != undefined && result.userid != null && result.lastloanpayment != nz_date_string.substr(0, 10)) {
	// 				const user = client.users.cache.get(result.userid);

	// 				connection.query('update profiles set lastloanpayment=? where name=?', [nz_date_string.substr(0, 10), result.name], async function (error, results, fields) {


	// 				});
	// 				connection.query('update profiles set coins = ? where name = ?', [result.coins - result.loan * 0.05, result.name.toString()], function (error, results, fields) {
	// 				});
	// 				connection.query('update profiles set paidback = ? where name = ?', [result.paidback + result.loan * 0.05, result.name.toString()], function (error, results, fields) {
	// 				});
	// 				connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

	// 					connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + result.loan * 0.05, 'bank'], function (error, results, fields) {
	// 					});

	// 				});
	// 			}

	// 			 if(result.bankmembership.substr(3,2) != '00' && result.bankmembership.substr(1,2) != nz_date_string.substr(0,2)){
	// 				connection.query('update profiles set bankmembership = ? where name = ?', ['00-00-0000', result.name], function (error, results, fields) {
	// 				});
	// 			}
	// 		});
	// 	});
	// }, 10000); // setting the time to 24 hours in ms

	client.on('guildCreate', (guild) => {
		const guild1 = client.guilds.cache.get('763913144653316126');
		embed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle(guild.name + ' just added the bot!')
			.setImage(guild.iconURL())
			.addFields({ name: 'Member Count', value: guild.memberCount, inline: false },


			);
		guild1.channels.cache.find(t => t.name == '📓┃server-log').send(embed);
		connection.query('select * from settings where servername = ?', [guild.name], async function(error, results, fields) {
			console.log('Joined a new guild: ' + guild.name);

		});
	});
	client.on('guildDelete', (guild) => {
	const guild1 = client.guilds.cache.get('763913144653316126');
	embed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle(guild.name + ' just deleted the bot!')
		.setImage(guild.iconURL())
		.addFields(
			{ name: 'Member Count', value: guild.memberCount, inline: false },


		);
guild1.channels.cache.find(t => t.id == '862773321347498004').send(embed);

});	
});

// client.on('messageReactionAdd', async (reaction, user) => {
// 	if (reaction.message.id !== reactionRole.message) return;

// 	if (emoji.name == reactionRole.reaction){
// 		message.guild
// 			.fetchMember(user.id)
// 			.then(member => {
// 				try{
// 					await member.addRole(reactionRole.role)
// 					client.users.cache.get(member.id).send("Role Added");
// 				} catch (error){
// 					console.log(error)
// 				}	
// 			})
// 	}
// })

// client.on('messageReactionRemove', async (reaction, user) => {
// 	if (reaction.message.id !== reactionRole.message) return;

// 	if (emoji.name == reactionRole.reaction){
// 		message.guild
// 			.fetchMember(user.id)
// 			.then(member => {
// 				try{
// 					await member.removeRole(reactionRole.role)
// 					client.users.cache.get(member.id).send("Role Added");
// 				} catch (error){
// 					console.log(error)
// 				}	
// 			})
// 	}
// })
function daily(msg) {
	const nz_date_string = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
	const date_nz = new Date(nz_date_string);

	// hours as (HH) format
	const hours = ('0' + date_nz.getHours()).slice(-2);

	// minutes as (mm) format
	const minutes = ('0' + date_nz.getMinutes()).slice(-2);

	// seconds as (ss) format
	const seconds = ('0' + date_nz.getSeconds()).slice(-2);

	const time_hh_mm_ss = hours + ':' + minutes + ':' + seconds;
	connection.query('select * from profiles where name = ?', [msg.member.user.username], async function(error, results2, fields) {

		// console.log(result.bankmembership.substr(2,2))

		if (results2[0].userid != undefined && results2[0].userid != null && results2[0].lastdaily != nz_date_string.substr(0, 10)) {
			let user = client.users.cache.get(results2[0].userid);

			connection.query('update profiles set lastdaily=? where name=?', [nz_date_string.substr(0, 10), results2[0].name], async function(error, results, fields) {


			});
			const canvas = Canvas.createCanvas(700, 250);
			const ctx = canvas.getContext('2d');

			const background = await Canvas.loadImage('./emptycheck.png');
			ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

			ctx.strokeStyle = '#74037b';
			ctx.strokeRect(0, 0, canvas.width, canvas.height);

			// Slightly smaller text placed above the member's display name
			ctx.font = 'bold 37px arial';
			ctx.fillStyle = '#000000';
			ctx.fillText(results2[0].name.toString(), 175, canvas.height / 2.15);

			// Add an exclamation point here and below
			// ctx.font = applyText(canvas, `${member.displayName}!`);
			ctx.font = '12px sans-serif';

			ctx.fillStyle = '#f';
			ctx.fillText(((9000 * results2[0].smallhouse) + (16000 * results2[0].mediumhouse) + (30000 * results2[0].largehouse) + (45000 * results2[0].smallmansion) + (10 * results2[0].bonds) + 2500).toString(), 575, canvas.height / 2.15);

			ctx.beginPath();
			ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.clip();
			// const avatar = await Canvas.loadImage('./finalimage.png');

			// ctx.drawImage(avatar, 50, 25, 50, 50);

			const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'emptycheck1.jpg');
			connection.query('select * from profiles where name = ?', ['bank'], function(error, results1, fields) {


				connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - (((9000 * results2[0].smallhouse) + (16000 * results2[0].mediumhouse) + (30000 * results2[0].largehouse) + (45000 * results2[0].smallmansion) + (10 * results2[0].bonds) + 2500) - ((((9000 * results2[0].smallhouse) + (16000 * results2[0].mediumhouse) + (30000 * results2[0].largehouse) + (45000 * results2[0].smallmansion) + (10 * results2[0].bonds) + 2500) - (results2[0].loan * 0.05)) * 0.15)), 'bank'], function(error, results, fields) {});

			});
			connection.query('update profiles set coins = ? where name = ?', [results2[0].coins + (((9000 * results2[0].smallhouse) + (16000 * results2[0].mediumhouse) + (30000 * results2[0].largehouse) + (45000 * results2[0].smallmansion) + (10 * results2[0].bonds) - ((((9000 * results2[0].smallhouse) + (16000 * results2[0].mediumhouse) + (30000 * results2[0].largehouse) + (45000 * results2[0].smallmansion) + (10 * results2[0].bonds) + 2500) - (results2[0].loan * 0.05)) * 0.15)) + 2500), results2[0].name.toString()], function(error, results, fields) {

			});


			user = client.users.cache.get(results2[0].userid);
			if (user != undefined && user != null) {
				if (results2[0].dmblock == 0) {

					user.send(attachment);
					user.send('This is your daily salary for today, it has been transferred into your account!');
					user.send('To disable DM notifications: run the setblockdm true command preceded with your server\'s prefix')

				}
			}


			console.log(5);
			if (results2[0].job == 'ceo') {
				connection.query('select * from stocks where name = ? and business = ?', [results2[0].name, results2[0].bussiness], function(error, results10, fields) {
					connection.query('select * from stocks where business = ?', [results2[0].bussiness], function(error, results6, fields) {

						connection.query('select * from bussiness where name = ?', [results2[0].bussiness], function(error, results1, fields) {

							connection.query('update stocks set number = ? where name = ? and business = ?', [results10[0].number + 30, results2[0].name.toString(), results2[0].bussiness], function(error, results, fields) {});
							let number = 0;
							results6.forEach(result1 => {
								number = number + result1.number;
							});
							connection.query('update bussiness set stockvalue = ? where name = ?', [results1[0].stockvalue + ((results1[0].stockvalue / number) * parseInt('30')), results2[0].bussiness], function(error, results3, fields) {});
							connection.query('select * from profiles where name = ?', ['bank'], function(error, results10, fields) {


								connection.query('update profiles set coins = ? where name = ?', [results10[0].coins - ((results1[0].stockvalue / number) * parseInt('30')), 'bank'], function(error, results, fields) {});

							});
							connection.query('update bussiness set balance = ? where name = ?', [results1[0].balance + ((results1[0].stockvalue / number) * parseInt('30')), results2[0].bussiness], function(error, results3, fields) {});
							if (results2[0].dmblock == 0) {
								user.send('You have received your daily shares!');
							}
						});
					});
				});

			}
			// if(result.businessmembership.substring()){

			// }
			if (results2[0].bussiness != 'null' && results2[0].bussiness != 'undefined' && results2[0].bussiness != undefined && results2[0].bussiness != null && results2[0].job != 'ceo') {
				console.log(10);
				connection.query('select * from bussiness where name = ?', [results2[0].bussiness], function(error, results1, fields) {
					if (results1[0].dailystocks > 0) {
						console.log(5);
						connection.query('select * from stocks where business = ?', [results2[0].bussiness], function(error, results6, fields) {
							connection.query('select * from stocks where name = ? and business = ?', [results2[0].name, results2[0].bussiness], function(error, results10, fields) {

								let number = 0;
								results6.forEach(result1 => {
									number = number + result1.number;
								});
								if (results10[0] != undefined && results10[0] != null && results10[0] != 'null' && results[0] != 'undefined') {
									connection.query('update stocks set number = ? where name = ? and business = ?', [results10[0].number + results1[0].dailystocks, results2[0].name.toString(), results2[0].bussiness], function(error, results, fields) {});
								}
								else {
									connection.query('insert into stocks(name, number, business) values(?,?,?)', [results2[0].name.toString(), results1[0].dailystocks, results2[0].bussiness], function(error, results, fields) {});
								}
								connection.query('update bussiness set stockvalue = ? where name = ?', [results1[0].stockvalue + ((results1[0].stockvalue / number) * results1[0].dailystocks), results2[0].bussiness], function(error, results3, fields) {});

							});
						});
						const user = client.users.cache.get(results2[0].userid);
						if (results2[0].dmblock == 0) {

							user.send('You have received your daily shares!');
						}
					}
				});
			}
		}

		else if (results2[0].loan + results2[0].loan * 0.05 <= results2[0].paidback && results2[0].loan != 0 && results2[0].userid != undefined && results2[0].userid != null) {
			const user = client.users.cache.get(results2[0].userid);

			connection.query('update profiles set loan = ? where name = ?', [0, results2[0].name.toString()], function(error, results, fields) {});
			connection.query('update profiles set paidback = ? where name = ?', [0, results2[0].name.toString()], function(error, results, fields) {});
			if (results2[0].dmblock == 0) {

				user.send('Your loan has been paid back!');
			}
			console.log(2);

		}

		else if (results2[0].loan != 0 && results2[0].paidback < results2[0].loan + results2[0].loan * 0.05 && results2[0].userid != undefined && results2[0].userid != null && results2[0].lastloanpayment != nz_date_string.substr(0, 10)) {
			const user = client.users.cache.get(results2[0].userid);

			connection.query('update profiles set lastloanpayment=? where name=?', [nz_date_string.substr(0, 10), results2[0].name], async function(error, results, fields) {


			});
			connection.query('update profiles set coins = ? where name = ?', [results2[0].coins - results2[0].loan * 0.05, results2[0].name.toString()], function(error, results, fields) {});
			connection.query('update profiles set paidback = ? where name = ?', [results2[0].paidback + results2[0].loan * 0.05, results2[0].name.toString()], function(error, results, fields) {});
			connection.query('select * from profiles where name = ?', ['bank'], function(error, results1, fields) {

				connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + results2[0].loan * 0.05, 'bank'], function(error, results, fields) {});

			});
		}

		if (results2[0].bankmembership.substr(3, 2) != '00' && results2[0].bankmembership.substr(1, 2) != nz_date_string.substr(0, 2)) {
			connection.query('update profiles set bankmembership = ? where name = ?', ['00-00-0000', results2[0].name], function(error, results, fields) {});
		}
	});

}

// statcord.on("autopost-start", () => {
//     // Emitted when statcord autopost starts
//     console.log("Started autopost");
// });

// statcord.on("post", status => {
//     // status = false if the post was successful
//     // status = "Error message" or status = Error if there was an error
//     if (!status) console.log("Successful post");
//     else console.error(status);
// });



client.on('guildMemberRemove', person => {
	// Send the message to a designated channel on a server:
	// eslint-disable-next-line no-unused-vars
	connection.query('select welcomechannel from settings where servername = ?', [person.guild.name], function(error, results, fields) {
		channel = person.guild.channels.cache.find(ch => ch.name === `${results[0].welcomechannel}`);
		// Do nothing if the channel wasn't found on this server
		if (channel) {
			// Send the message, mentioning the member
			channel.send(`${person.user.username}` + ' just left the server');
		}
	});
});

let message = ''
// Send the message to a designated channel on a server:
// client.on('message', async message1 => {
// 	if (!message1.channel.name.includes('spam')) {
// 		antiSpam.message(message1)
// 	}
// })
// client.on('message', (message) => antiSpam.message(message));
// Send the message to a designated channel on a server:
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


client.on('message', async msg => {
	if(msg.member.user.id == '756909881793183826' || msg.member.user.username == 'Falling'|| msg.member.user.username == 'Zhongli' || msg.member.user.username == '█▀█ █▄█ ▀█▀' || msg.member.user.username == 'Infinity39292' || msg.member.user.username == 'suraj.'){
		msg.member.ban()
		console.log(2)
		return
	}
	if(msg.member.user.id == '756909881793183826' || msg.member.user.username == 'Falling'|| msg.member.user.username == 'Zhongli' || msg.member.user.username == '█▀█ █▄█ ▀█▀' || msg.member.user.username == 'Infinity39292' || msg.member.user.username == 'suraj.'){
		return
	}
	if(msg.author.bot && msg.member.user.username != 'Softwaresat Coins Miner' && msg.member.user.username != 'Foul Legacy'&& msg.member.user.username != 'DeezGunz'&& msg.member.user.username != 'Trevor\'s Taxi Co Employee'){
		return
	}
	const nz_date = new Date().toUTCString().substring(17, 25);
	const nz_date_string = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
	const date_nz = new Date(nz_date_string);
	const convertedseconds = (parseInt(nz_date.substring(0, 2)) * 3600) + (parseInt(nz_date.substring(3, 5)) * 60) + parseInt(nz_date.substring(6, 10))
	// hours as (HH) format
	const hours = ('0' + date_nz.getHours()).slice(-2);

	// minutes as (mm) format
	const minutes = ('0' + date_nz.getMinutes()).slice(-2);

	// seconds as (ss) format
	const seconds = ('0' + date_nz.getSeconds()).slice(-2);

	const time_hh_mm_ss = hours + ':' + minutes + ':' + seconds;
	connection.query('select * from profiles where name = ?', [msg.member.user.username], function(error, results, fields) {
		if (results[0] != undefined && results[0] != null && results[0].coins < 0) {
			connection.query('update profiles set loan = ? where name = ?', [results[0].loan + Math.abs(results[0].coins), msg.member.user.username], function(error, results, fields) {});
			connection.query('update profiles set coins = ? where name = ?', [0, msg.member.user.username], function(error, results, fields) {});
		}
	});
	let channel;
	connection.query('select * from settings where servername = ?', [msg.guild.name], async function(error, results, fields) {
		
		if (results == undefined || `${results[0]}` == '[]' || `${results[0]}` == 'undefined' || `${results[0]}` == undefined || `${results[0]}` === [] || `${results[0]}` == '[]') {
			// eslint-disable-next-line no-unused-vars
			connection.query('insert into settings(servername) values(?)', [msg.guild.name], function(error, results, fields) {
				console.log(msg.guild.name);
			});
		}
		connection.query('select link from settings where servername = ?', [msg.guild.name], async function(error, results, fields) {
			if (`${results[0].link}` == null || `${results[0].link}` == 'null' || `${results[0].link}` == [] || `${results[0].link}` == '[]' || `${results[0].link}` == ' ' || `${results[0].link}` == null) {
				let code;
				const channel1 = msg.channel;
				channel1.createInvite({
					maxAge: 0, // 0 = infinite expiration
					maxUses: 0, // 0 = infinite uses
				}).then(invite => {
					connection.query('update settings set link = ? where servername = ?', ['https://discord.gg/' + invite.code, msg.guild.name], async function(error, results, fields) {});
					code = invite.code;
				})


			}
		});
		channel = msg.guild.channels.cache.find(ch => ch.name === 'counting');

		if ((msg.channel.name.includes('counting')) && msg.guild.name != 'CloudAir' && msg.member.user.username != 'Softwaresat Bot' && results[0].countingtype == 'traditional') {
			
			if (msg.member.user.username != results[0].lastcounted && msg.content == results[0].counter) {
				connection.query('update settings set lastcounted = ? where servername = ?', [msg.member.user.username, msg.guild.name], function(error, results1, fields) {});
				connection.query('update settings set counter = ? where servername = ?', [results[0].counter + 1, msg.guild.name], function(error, results1, fields) {});
			}
			else {
				msg.channel.messages.fetch({ limit: 1 }).then(messages => { // Fetches the messages
					msg.channel.bulkDelete(messages, // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
					);
				});
			}
		}
		if (msg.author.name != 'Softwaresat Bot' && results[0].ranks == 1) {
			connection.query('select * from ranks where name = ? and server = ?', [msg.member.user.username, msg.guild.name], function(error, results, fields) {
				if (results == undefined || `${results[0]}` == '[]' || `${results[0]}` == 'undefined' || `${results[0]}` == undefined || results === [] || `${results[0]}` == '[]') {
					// eslint-disable-next-line no-unused-vars
					connection.query('insert into ranks(name,server) values(?,?)', [msg.member.user.username, msg.guild.name], function(error, results, fields) {});
				}
				else if (results[0].level * 10 == results[0].messages) {

					connection.query('update ranks set level = ? where name = ? && server = ?', [results[0].level + 1, msg.member.user.username, msg.guild.name], function(error, results, fields) {});
					connection.query('update ranks set messages = ? where name = ? && server = ?', [0, msg.member.user.username, msg.guild.name], function(error, results, fields) {});
					connection.query('select messages, level from ranks where name = ? && server = ?', [msg.member.user.username, server], function(error, results1, fields) {
						embed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle(`<a:HappyDance:839532480036995082> Level Up! <a:HappyDance:839532480036995082>`)
							.setDescription(`For: ${msg.author}`)
							.addFields({ name: '<:go_up:785436860037201941> Old Level! <:go_up:785436860037201941>', value: `${(results1[0].level) - 1}!`, inline: false }, { name: '<:go_up:785436860037201941> New Level! <:go_up:785436860037201941>', value: `${results1[0].level}!`, inline: false },


							);
						msg.channel.send(embed);
							
							
						// msg.reply('You have reached level ' + results1[0].level);
					});

				}
				else {
					connection.query('update ranks set messages = ? where name = ? && server = ?', [results[0].messages + 1, msg.member.user.username, msg.guild.name], function(error, results, fields) {});
				}
			});
		}
		if ((msg.channel.name.includes('counting')) && msg.member.user.username != 'Softwaresat Bot' && results[0].countingtype == 'chain') {
			if (msg.member.user.username != results[0].lastcounted && msg.content == results[0].counter) {
				connection.query('update settings set lastcounted = ? where servername = ?', [msg.member.user.username, msg.guild.name], function(error, results1, fields) {});
				connection.query('update settings set counter = ? where servername = ?', [results[0].counter + 1, msg.guild.name], function(error, results1, fields) {});
				msg.react('✅');
			}
			else if (isNaN(msg.content) == false && msg.content != results[0].counter - 1) {
				msg.react('❌');
				msg.reply('You broke the number chain! Next number is 0!');
				connection.query('update settings set lastcounted = ? where servername = ?', ['none', msg.guild.name], function(error, results1, fields) {});
				connection.query('update settings set counter = ? where servername = ?', [0, msg.guild.name], function(error, results1, fields) {});

			}
		}

		const server = msg.guild.name;
		var content = msg.content.trim().split(' ');
		connection.query('select autodelete,cussing from settings where servername = ?', [server], function(error, results1, fields) {
			content.forEach(message => {
				cusswords.forEach(word => {
					if (message.toLowerCase() == word.toLowerCase() && results1[0].cussing == 1) {
						console.log(999)
						if ((results1[0].autodelete == undefined || results1[0].autodelete == 'undefined' || results1[0].autodelete == '[]' || results1[0].autodelete == []) && (results1[0].autodelete != '0')) {
							msg.reply('Do ssettings to create a setting profile for your server!');
						}
						else if (`${results1[0].autodelete}` == '1') {
							msg.channel.messages.fetch({ limit: 1 }).then(messages => { // Fetches the messages
								msg.channel.bulkDelete(messages, // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
								);
							});
						}
						msg.reply('STOP CURSING!');
						let member = msg.member;
						channel = member.guild.channels.cache.find(ch => ch.name === `${results[0].logchannel}`);
						if (channel) { channel.send('Warning sent to ' + `${member.user}` + ' for Cursing!'); }
						else {
							msg.reply('Please set the AutoLog channel in settings!');
						}
						msg.member.send('Hey you, you have been warned for Cursing!');
						member = `${msg.member.id}`;
						connection.query('insert into warnings(name,reason) values(?,?)', [member, 'cussing'], function(error, results, fields) {});
						console.log(member);
						connection.query('select count(*) as num from warnings where name =?', [member], function(error, results, fields) {
							const count = `${results[0].num}`;
							connection.query('select kickthreshold,autokick from settings where servername = ?', [server], function(error, results1, fields) {
								console.log(count);
								console.log(`${results1[0].kickthreshold}`);
								if (parseInt(count) >= parseInt(`${results1[0].kickthreshold}`) && results1[0].autokick == '1') {
									member = msg.member;
									connection.query('select link from settings where servername = ?', [server], function(error, results2, fields) {
										connection.query('select invitationback from settings where servername = ?', [server], function(error, results3, fields) {
											if (`${results3[0].invitationback}` == '1') {
												member.send('Do you want to join back to the server? (don\'t do your mistake again) ' + `${results2[0].link}`);
											}
										});
									});
									const user = msg.member;
									member = msg.member;
									member
										.kick('cussing')
										.then(() => {
											// We let the message author know we were able to kick the person
											channel = member.guild.channels.cache.find(ch => ch.name === `${results[0].logchannel}`);
											msg.channel.send(`Successfully kicked ${member.user.username}`);
											connection.query('delete from warnings where name = ?', [`${member.id}`], function(error, results, fields) {
												console.log('Deleted all records!');
											});
											// Do nothing if the channel wasn't found on this server
											if (channel) {
												channel.send(`Sucessfullly kicked ${member.username}`);
											}
											else {
												msg.reply('Please set a logging channel in the settings!');
											}
											// Send the message, mentioning the member
										});
								}
							});
						});
					}
				})
			});
		});
		if (msg.mentions.everyone == true && `${results[0].pingblock}` == '1' && !msg.member.permissions.has('ADMINISTRATOR')) {
			if (`${results[0].autodelete}` == '1') {
				msg.channel.messages.fetch({ limit: 1 }).then(messages => { // Fetches the messages
					msg.channel.bulkDelete(messages, // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
					);
				});
			}
			msg.reply('STOP PINGING');
			let member = msg.member;
			channel = member.guild.channels.cache.find(ch => ch.name === `${results[0].logchannel}`);
			if (channel) { channel.send('Warning sent to ' + `${member.user}` + ' for Pinging!'); }
			else {
				msg.reply('Please set the AutoLog channel in settings!');
			}
			msg.member.send('Hey you, you have been warned for Pinging!');
			member = `${msg.member.id}`;
			connection.query('insert into warnings(name,reason) values(?,?)', [member, 'pinging'], function(error, results, fields) {});
			console.log(member);
			connection.query('select count(*) as num from warnings where name =?', [member], function(error, results, fields) {
				const count = `${results[0].num}`;
				connection.query('select kickthreshold,autokick from settings where servername = ?', [server], function(error, results1, fields) {
					console.log(count);
					console.log(`${results1[0].kickthreshold}`);
					if (parseInt(count) >= parseInt(`${results1[0].kickthreshold}`) && results1[0].autokick == '1') {
						member = msg.member;
						connection.query('select link from settings where servername = ?', [server], function(error, results2, fields) {
							connection.query('select invitationback from settings where servername = ?', [server], function(error, results3, fields) {
								if (`${results3[0].invitationback}` == '1') {
									member.send('Do you want to join back to the server? (don\'t do your mistake again) ' + `${results2[0].link}`);
								}
							});
						});
						const user = msg.member;
						member = msg.member;
						member
							.kick('cussing')
							.then(() => {
								// We let the message author know we were able to kick the person
								channel = member.guild.channels.cache.find(ch => ch.name === `${results[0].logchannel}`);
								msg.channel.send(`Successfully kicked ${member.user.username}`);
								connection.query('delete from warnings where name = ?', [`${member.id}`], function(error, results, fields) {
									console.log('Deleted all records!');
								});
								// Do nothing if the channel wasn't found on this server
								if (channel) {
									channel.send(`Sucessfullly kicked ${member.username}`);
								}
								else {
									msg.reply('Please set a logging channel in the settings!');
								}
								// Send the message, mentioning the member
							});
					}

				});

			});
		}
			connection.query('select * from profiles where userid = ?', [msg.member.user.id], function(error, results1, fields) {
				if (results1[0] != undefined || results1[0] != null) {
					if (results1[0].name != results1[0].userid) {
						connection.query('update profiles set name = ? where userid = ?', [msg.member.user.username, msg.member.user.id], function(error, results, fields) {})
				     connection.query('update stocks set name = ? where name = ?', [msg.member.user.username, results1[0].name], function(error, results, fields) {})
					connection.query('update bussiness set owner = ? where owner = ?', [msg.member.user.username, results1[0].name], function(error, results, fields) {})

					}
					
				
				}
				else {
					connection.query('select * from profiles where name = ?', [msg.member.user.username], function(error, results3, fields) {
						if (results3[0] == undefined || results3[0] == null) {
							connection.query('insert into profiles(name, missionnumber, coins) values(?,?,?)', [msg.member.user.username, 1, 100], function(error, results, fields) {})
						}
					})
				}
			})
		
		// else if(results[0].notify == 0 && msg.member.user.username != 'Softwaresat Bot') {

		// 	msg.channel.send('Recurring power outage in my hosting, please don\'t delete bot during this time (sorry for message, but power outage happens too often)');
		// 	connection.query('update settings set notify=1 where servername=?', [msg.guild.name], async function(error, results, fields) {
		// 	});
		// }
		connection.query('select * from profiles where name = ?', [msg.author.name], function(error, results, fields) {
			if (results[0] != undefined && results[0] != null) {
				connection.query('update profiles set userid = ? where name = ?', [msg.author.id, msg.member.user.username], function(error, results, fields) {});
			}
		});
		if (results[0].autobump == 1 && msg.member.user.username != 'Softwaresat Bot') {
			let code;
			const channel1 = msg.channel;
			connection.query('select * from bumps where server=?', [msg.guild.name], function(error, results2, fields) {
				if (results2[0].link == 'none') {
					channel1.createInvite({
							maxAge: 0, // 0 = infinite expiration
							maxUses: 0, // 0 = infinite uses
						}).then(invite => {
							connection.query('update bumps set link=? where server=?', [invite.code, msg.guild.name], async function(error, results, fields) {});
							code = invite.code;

						})
						.catch(err => {
							msg.channel.send('I lack the permissions to create invite links in this server with autobump!');

						});
				}
			});

			connection.query('select * from bumps where server = ?', [msg.guild.name], function(error, results, fields) {
				if (!(parseInt(time_hh_mm_ss.substr(0, 2) - 2) < parseInt(results[0].lastbumped.substr(0, 2)) && results[0].lastbumpeddate == nz_date_string.substr(0, 10))) {
					connection.query('update bumps set lastbumped=? where server=?', [time_hh_mm_ss, msg.guild.name], async function(error, results, fields) {


					});
					console.log(nz_date_string);
					connection.query('update bumps set lastbumpeddate=? where server=?', [nz_date_string.substr(0, 10), msg.guild.name], async function(error, results, fields) {


					});
					connection.query('select * from bumps', [msg.guild.name], function(error, results3, fields) {

						results3.forEach(result => {
							connection.query('select * from bumps where server=?', [msg.guild.name], function(error, results2, fields) {

								var server = client.guilds.cache.find(guild => guild.name === `${result.server}`);
								let channel1;
								if (server != undefined) {
									channel = server.channels.cache.find(ch => ch.name === 'bump') || server.channels.cache.find(ch => ch.id === '854548641883750405') || server.channels.cache.find(ch => ch.id === '869046228795678760') || server.channels.cache.find(ch => ch.id === '848811221880012800') || server.channels.cache.find(ch => ch.id === '861448273259921409');


								}
								if (channel != undefined && server != undefined) {
									embed = new Discord.MessageEmbed()
										.setColor('#0099ff')
										.setTitle(`${results[0].server}`)
										.setImage(`${results[0].picture}`)
										.addFields({ name: 'Description', value: results2[0].description, inline: false }, { name: 'Invite', value: 'https://discord.gg/' + results2[0].link, inline: false },


										);
									channel.send(embed);


								}


							});

						});
					});
				}
			});
		}


		// if (!msg.content.startsWith(results[0].prefix) && !msg.channel.name.includes('spam') && !msg.channel.name.includes('counting') || (msg.author.bot && msg.author.username != 'DGZ ETF' && msg.author.username != 'Softwaresat Helper' && msg.author.username != 'Softwaresat Coins Miner')) {
		// 	return
		// }
		let args = msg.content.slice(`${results[0].prefix}`.length).trim().split(/ +/);
		const command = args.shift().toLowerCase();
		const { cooldowns } = client;

if (!cooldowns.has(command) && msg.content.startsWith(results[0].prefix)) {
	cooldowns.set(command, new Discord.Collection());
}

const now = Date.now();
const timestamps = cooldowns.get(command);
const cooldownAmount = (command.cooldown || 3) * 1000;

if(msg.content.startsWith(results[0].prefix)){
	if (msg.content.startsWith(results[0].prefix) && client.commands.has(command) && timestamps.has(msg.author.id)) {

	const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

	if (now < expirationTime) {
		const timeLeft = (expirationTime - now) / 1000;
		const settingsembed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('<a:cool_blob:746471859247382681> Cooldown <a:cool_blob:746471859247382681>')
					.addFields(
						{ name: 'Time Left', value:`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command}\` command.`, inline: false },
						);

		return msg.channel.send(settingsembed);
	}
	
}
timestamps.set(msg.author.id, now);

setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);
		if (command === 'ping') {
			client.commands.get('ping').execute(msg, args);
		}
		if (command === 'server') {
			args = msg.content.split(' ').slice(1).join(' ');
			let clientguilds = await client.guilds.cache
			let servers = await clientguilds.map(g => g.name)
			console.log(args)
			if(servers.includes(args)){
				msg.reply('Bot is in server')
			}
			else{
				msg.reply('Bot isn\'t in server')
			}
		}
		else if (command === 'stats') {
			client.commands.get('stats').execute(msg, args);
		}
		else if (msg.content == `${results[0].prefix}with all` || msg.content == `${results[0].prefix}withdraw all`) {
			client.commands.get('withall').execute(msg, args);
		}
		else if (msg.content == `${results[0].prefix}dep all` || msg.content == `${results[0].prefix}deposit all`) {
			client.commands.get('depall').execute(msg, args);
		
		}
		else if (command === 'bump') {
			client.commands.get('bump').execute(msg, args);
		}
		else if (command === 'reactionrole') {
			client.commands.get('reactionrole').execute(msg, args, reactionRoleManager);
		}
		else if (command === 'mine') {
			client.commands.get('mine').execute(msg, args);
		}
			else if (msg.content === `${results[0].prefix}help funmisc`) {
			client.commands.get('help funmisc').execute(msg, args);
		}
			else if (msg.content === `${results[0].prefix}help funbal`) {
			client.commands.get('help funbal').execute(msg, args);
		}
			else if (msg.content === `${results[0].prefix}help funbuying`) {
			client.commands.get('help funbuying').execute(msg, args);
		}
			else if (msg.content === `${results[0].prefix}help funsettings`) {
			client.commands.get('help funsettings').execute(msg, args);
		}
			else if (msg.content === `${results[0].prefix}help funinvesting`) {
			client.commands.get('help funinvesting').execute(msg, args);
		}
			else if (msg.content === `${results[0].prefix}help funotherincome`) {
			client.commands.get('help funotherincome').execute(msg, args);
		}
			else if (msg.content === `${results[0].prefix}help funtransfers`) {
			client.commands.get('help funtransfers').execute(msg, args);
		}
			else if (msg.content === `${results[0].prefix}help funbusiness`) {
			client.commands.get('help funbusiness').execute(msg, args);
		}
			else if (msg.content === `${results[0].prefix}help fungambling`) {
			client.commands.get('help fungambling').execute(msg, args);
		}
		else if (msg.content === `${results[0].prefix}help bump`) {
			client.commands.get('help bump').execute(msg, args);
		}
		else if (msg.content === `${results[0].prefix}help fun`) {
			client.commands.get('help fun').execute(msg, args);
		}
		else if (msg.content === `${results[0].prefix}help moderation`) {
			client.commands.get('help moderation').execute(msg, args);
		}
		else if (msg.content === `${results[0].prefix}help ranks`) {
			client.commands.get('help ranks').execute(msg, args);
		}
		else if (msg.content === `${results[0].prefix}help settings`) {
			client.commands.get('help settings').execute(msg, args);
		}
		else if (msg.content === `${results[0].prefix}help welcome`) {
			client.commands.get('help welcome').execute(msg, args);
		}
		else if (msg.content === `${results[0].prefix}help misc`) {
			client.commands.get('help misc').execute(msg, args);
		}
		else if (command === 'delete') {
			client.commands.get('delete').execute(msg, args);
		}
		else if (command === 'guessnumber') {
			client.commands.get('guessnumber').execute(msg, args);
		}
		else if (command === 'story') {
			client.commands.get('story').execute(msg, args);
		}
		else if (command === 'chop') {
			client.commands.get('chop').execute(msg, args);
		}
		else if (command === 'notices') {
			client.commands.get('notices').execute(msg, args);
		}
		else if (command === 'help') {
			client.commands.get('help').execute(msg, args);
		}
		else if (command === 'dm') {
			client.commands.get('dm').execute(msg, args);
		}
		else if (command === 'inventory' || command=='p' || command=='inv') {
			client.commands.get('inventory').execute(msg, args);
		}
		else if (command === 'item' || command=='thing' || command=='object') {
			client.commands.get('item').execute(msg, args);
		}
		else if (command === 'joblist') {
			client.commands.get('joblist').execute(msg, args);
		}
		else if (msg.content.startsWith(`${results[0].prefix}buy stocks`)) {
			client.commands.get('buy stocks').execute(msg, args);
		}
		else if (msg.content.startsWith(`${results[0].prefix}buy bonds`)) {
			client.commands.get('buy bonds').execute(msg, args);
		}
		else if (command === 'buy') {
			client.commands.get('buy').execute(msg, args);
		}
		else if (command === 'pepe') {
			client.commands.get('pepe').execute(msg, args);
		}
		else if (command === 'aryan') {
			client.commands.get('aryan').execute(msg, args);
		}
		else if (command === 'satviksmartrating') {
			client.commands.get('satviksmartrating').execute(msg, args);
		}
		else if (command === 'grade') {
			client.commands.get('grade').execute(msg, args);
		}
		else if (command === 'dogimage') {
			client.commands.get('dogimage').execute(msg, args);
		}
		else if (command === 'bumpsetup') {
			client.commands.get('bumpsetup').execute(msg, args);
		}
		else if (command === 'catimage') {
			client.commands.get('catimage').execute(msg, args);
		}
		else if (command === 'hunt') {
			client.commands.get('hunt').execute(msg, args);
		}
		else if (command === 'kick') {
			client.commands.get('kick').execute(msg, args);
		}
		else if (command === 'bal') {
			client.commands.get('bal').execute(msg, args);
		}
		else if (command === 'rob') {
			client.commands.get('rob').execute(msg, args);
		}
		else if (command === 'suggest') {
			client.commands.get('suggest').execute(msg, args);
		}
			else if (command === 'work' || command === 'w') {
				client.commands.get('work').execute(msg, args);
			}
		else if (command === 'deposit' || command === 'dep') {
			client.commands.get('deposit').execute(msg, args);
		}
		else if (command === 'withdraw' || command === 'with') {
			client.commands.get('withdraw').execute(msg, args);
		}
		else if (msg.content === `${results[0].prefix}` + 'level') {
		const Discord = require('discord.js')
	connection.query('select * from ranks where name = ? && server = ?', [msg.member.user.username, msg.guild.name], function (error, results, fields) {
					// const settingsembed = new Discord.MessageEmbed()
					// .setColor('#0099ff')
					// .setTitle('<a:HR_yellowcrown:835555141309431818> Level! <a:HR_yellowcrown:835555141309431818>')
					// .setDescription('Requested by: ' + msg.author.username)
					// .addFields(
					// 	{ name: '<a:ani_fire:811616503434575872> Level', value:(results[0].level), inline: false },
					// 	{ name: '<a:rainbowfillblob:773625973211529216> More Messages', value:(results[0].level * 10 - results[0].messages) + " messages left!", inline: false },
					// 	);
					// 	settingsembed.setTimestamp();
						
					// 	msg.channel.send(settingsembed);
					// 	// msg.reply('You are level ' + results[0].level + ' and you need ' + (results[0].level * 10 - results[0].messages) + ' more messages to reach the next level!');
					connection.query('select * from settings where servername = ?', [msg.guild.name], function (error, results1, fields) {

						if (results1[0].ranks == '0') {
							msg.reply('Enable ranks first');
						}
						else{
							if(results[0] == undefined){
								const canvacord = require("canvacord");
							const img = "https://cdn.discordapp.com/attachments/857653961800679475/862935582187847720/rank_card.png"; 
							var count = 0
							
							const rank = new canvacord.Rank()
		
							.setAvatar(msg.member.user.displayAvatarURL({ dynamic: false, format: 'png' }))
		
								.setCurrentXP(0)
								.setLevel(0)
								.setBackground("IMAGE", img)
								.setStatus(msg.member.user.presence.status)
								.setRequiredXP(10)
								.setProgressBar("#FFFFFF", "COLOR")
								.setUsername(msg.member.user.username)
								.setDiscriminator(msg.member.user.discriminator);
								rank.setRank(count, 'RANK', false)
		
							rank.build()
								.then(buffer => {
									canvacord.write(buffer, "RankCard.png");
									const attachment = new Discord.MessageAttachment(buffer, 'RankCard.png')
								msg.channel.send(attachment)
								})
							}
							else{
							const canvacord = require("canvacord");
							const img = "https://cdn.discordapp.com/attachments/857653961800679475/862935582187847720/rank_card.png"; 
							var count = 0
							
							const rank = new canvacord.Rank()
		
							.setAvatar(msg.member.user.displayAvatarURL({ dynamic: false, format: 'png' }))
		
								.setCurrentXP(results[0].messages)
								.setLevel(results[0].level)
								.setBackground("IMAGE", img)
								.setStatus(msg.member.user.presence.status)
								.setRequiredXP(results[0].level * 10)
								.setProgressBar("#FFFFFF", "COLOR")
								.setUsername(msg.member.user.username)
								.setDiscriminator(msg.member.user.discriminator);
								connection.query('select * from ranks where server = ? order by level desc', [msg.guild.name], function (error, results, fields) {
									results.forEach(result => {
										count++
										if(result.name == msg.member.user.username){
											console.log(count)
											rank.setRank(count, 'RANK', true)
		
											return
										}
									});
								})
							rank.build()
								.then(buffer => {
									canvacord.write(buffer, "RankCard.png");
									const attachment = new Discord.MessageAttachment(buffer, 'RankCard.png')
								msg.channel.send(attachment)
								})
							}
						
						}
					})
					})
					
		}
		else if (command === 'ban' && command != 'bank') {
			client.commands.get('ban').execute(msg, args);
		}
		else if (command === 'give') {
			client.commands.get('give').execute(msg, args);
		}
		else if (command === 'warn') {
			client.commands.get('warn').execute(msg, args);
		}
		else if (command === 'setrank') {
			client.commands.get('setrank').execute(msg, args);
		}
		else if (command === 'setautodelete') {
			client.commands.get('setautodelete').execute(msg, args);
		}
		else if (command === 'setautoinvitation') {
			client.commands.get('setautoinvitation').execute(msg, args);
		}
		else if (command === 'setautokick') {
			client.commands.get('setautokick').execute(msg, args);
		}
		else if (command === 'setautorespond') {
			client.commands.get('setautorespond').execute(msg, args);
		}
		else if (command === 'setautorole') {
			client.commands.get('setautorole').execute(msg, args);
		}
		else if (command === 'setcountingtype') {
			client.commands.get('setcountingtype').execute(msg, args);
		}
		else if (command === 'setcussing') {
			client.commands.get('setcussing').execute(msg, args);
		}
		else if (command === 'setdm') {
			client.commands.get('setdm').execute(msg, args);
		}
		else if (command === 'check') {
			client.commands.get('check').execute(msg, args);
		}
		else if (command === 'setkickthreshold') {
			client.commands.get('setkickthreshold').execute(msg, args);
		}
		else if (command === 'setlogchannel') {
			client.commands.get('setlogchannel').execute(msg, args);
		}
		else if (command === 'setprefix') {
			client.commands.get('setprefix').execute(msg, args);
		}
		else if (command === 'setpingblock') {
			client.commands.get('setpingblock').execute(msg, args);
		}
		else if (command === 'settings') {
			client.commands.get('settings').execute(msg, args);
		}
		else if (command === 'ip') {
			client.commands.get('ip').execute(msg, args);
		}
		else if (command === 'become') {
			client.commands.get('become').execute(msg, args);
		}
		else if (command === 'invite') {
			client.commands.get('invite').execute(msg, args);
		}
		else if (command === 'image') {
			client.commands.get('image').execute(msg, args);
		}
		else if (command === 'weather') {
			client.commands.get('weather').execute(msg, args);
		}
		else if (command === 'vote' || command === 'top.gg') {
			client.commands.get('vote').execute(msg, args);
		}
		else if (command === 'meme') {
			client.commands.get('meme').execute(msg, args);
		}
		else if (command === 'link') {
			client.commands.get('link').execute(msg, args);
		}
		else if (command === 'servers') {
			client.commands.get('servers').execute(msg, args);
		}
		else if (command === 'server') {
			client.commands.get('server').execute(msg, args);
		}
		else if (command === 'purgenotices') {
			client.commands.get('purgenotices').execute(msg, args);
		}
		else if (msg.content === '.prefix') {
			client.commands.get('.prefix').execute(msg, args);
		}
		else if (command === 'randomimage') {
			client.commands.get('randomimage').execute(msg, args);
		}
		else if (command === 'setwelcomechannel') {
			client.commands.get('setwelcomechannel').execute(msg, args);
		}
		else if (command === 'shop') {
			client.commands.get('shop').execute(msg, args);
		}
		else if (command === 'store') {
			client.commands.get('shop').execute(msg, args);
		}
		else if (command === 'mute') {
			client.commands.get('mute').execute(msg, args);
		}
		else if (command === 'unmute') {
			client.commands.get('unmute').execute(msg, args);
		}
			else if (command === 'invest') {
			client.commands.get('invest').execute(msg, args);
		}
		else if (command === 'bank') {
			client.commands.get('bank').execute(msg, args);
		}
		else if (command === 'blb') {
			client.commands.get('blb').execute(msg, args);
		}
		else if (command === 'rap') {
			client.commands.get('rap').execute(msg, args);
		}
		else if (command === 'raps') {
			client.commands.get('raps').execute(msg, args);
		}
		else if (command === 'joke') {
			client.commands.get('joke').execute(msg, args);
		}
		else if (command === 'color') {
			client.commands.get('color').execute(msg, args);
		}
		else if (command === 'triggered') {
			client.commands.get('triggered').execute(msg, args);
		}
		else if (command === 'wasted') {
			client.commands.get('wasted').execute(msg, args);
		}
		else if (command === 'encrypt') {
			client.commands.get('encrypt').execute(msg, args);
		}
		else if (command === 'decrypt') {
			client.commands.get('decrypt').execute(msg, args);
		}
		else if (command === 'lyrics') {
			client.commands.get('lyrics').execute(msg, args);
		}
		else if (command === 'pokemon') {
			client.commands.get('pokemon').execute(msg, args);
		}
		else if (command === 'pixelate') {
			client.commands.get('pixelate').execute(msg, args);
		}
		else if (command === 'comment') {
			client.commands.get('comment').execute(msg, args);
		}
		else if (command === 'invert') {
			client.commands.get('invert').execute(msg, args);
		}
			else if (command === 'bwithdraw') {
			client.commands.get('bwithdraw').execute(msg, args);
		}
		else if (command === 'bdeposit') {
			client.commands.get('bdeposit').execute(msg, args);
		}
		else if (command === 'setblockdm') {
			client.commands.get('setblockdm').execute(msg, args);
		}
		else if (command === 'business') {
			client.commands.get('business').execute(msg, args);
		}
		else if (msg.content.startsWith(`${results[0].prefix}create business`)) {
			client.commands.get('create business').execute(msg, args);
		}
		else if (msg.content.startsWith(`${results[0].prefix}use template`)) {
			client.commands.get('usetemplate').execute(msg, args);
		}
		else if (msg.content.startsWith(`${results[0].prefix}create job`)) {
			client.commands.get('create job').execute(msg, args);
		}
		else if (msg.content.startsWith(`${results[0].prefix}edit job`)) {
			client.commands.get('edit job').execute(msg, args);
		}
		else if (command === 'bailout') {
			client.commands.get('bailout').execute(msg, args);
		}
		else if (command === 'emoji') {
			client.commands.get('emoji').execute(msg, args);
		}
		else if (command === 'employees') {
			client.commands.get('employees').execute(msg, args);
		}
		else if (command === 'echo') {
			client.commands.get('echo').execute(msg, args);
		}
		else if (command === 'echo') {
			client.commands.get('echo').execute(msg, args);
		}
		else if (command === 'fish') {
			client.commands.get('fish').execute(msg, args);
		}
		else if (command === 'gift') {
			client.commands.get('gift').execute(msg, args);
		}
		else if (command === 'glb') {
			client.commands.get('glb').execute(msg, args);
		}
		else if (command === 'housingmarket') {
			client.commands.get('housingmarket').execute(msg, args);
		}
		else if (command === 'invitebusiness') {
			client.commands.get('invitebusiness').execute(msg, args);
		}
		else if (command === 'lockdown' && command != 'lockdownall') {
			client.commands.get('lockdown').execute(msg, args);
		}
		else if (command === 'lockdownall') {
			client.commands.get('lockdownall').execute(msg, args);
		}
		else if (command === 'roleall') {
			client.commands.get('roleall').execute(msg, args);
		}
		else if (command === 'setwelcomeimage') {
			client.commands.get('setwelcomeimage').execute(msg, args);
		}
		else if (command === 'subscriptions') {
			client.commands.get('subscriptions').execute(msg, args);
		}
		else if (command === 'say') {
			client.commands.get('say').execute(msg, args);
		}
		else if (command === 'lb' || command === 'leaderboard') {
			client.commands.get('lb').execute(msg, args);
		}
		else if (command === 'unlockall') {
			client.commands.get('unlockall').execute(msg, args);
		}
		else if (command === 'info') {
			client.commands.get('info').execute(msg, args);
		}
		else if (command === 'serverinfo') {
			client.commands.get('serverinfo').execute(msg, args);
		}
		else if (command === 'sell') {
			client.commands.get('sell').execute(msg, args);
		}
		else if (command === 'whoistarun') {
			client.commands.get('whoistarun').execute(msg, args);
		}
		else if (command === 'whoisaryav') {
			client.commands.get('whoisaryav').execute(msg, args);
		}
		else if (command === 'kavin') {
			client.commands.get('kavin').execute(msg, args);
		}
		else if (command === 'kill') {
			client.commands.get('kill').execute(msg, args);
		}
		else if (command === 'userinfo') {
			client.commands.get('userinfo').execute(msg, args, moment);
		}
		else if (command === 'fire') {
			client.commands.get('fire').execute(msg, args);
		}
		else if (command === 'helpwebsite') {
			client.commands.get('helpwebsite').execute(msg, args);
		}
		else if (msg.content === `${results[0].prefix}import template`){
			client.commands.get('importtemplate').execute(msg, args);
		}
		else if (command === 'market') {
			client.commands.get('market').execute(msg, args);
		}
		else if (command === 'pay') {
			client.commands.get('pay').execute(msg, args);
		}
		else if (command === 'prefix') {
			client.commands.get('prefix').execute(msg, args);
		}
		else if (msg.content.startsWith(`${results[0].prefix}purge job`)) {
			client.commands.get('purge job').execute(msg, args);
		}
		else if (command == 'unlock') {
			client.commands.get('unlock').execute(msg, args);
		}
		else if (command === 'resetaccount') {
			client.commands.get('resetaccount').execute(msg, args);
		}
		else if (command === 'setwelcomemessage') {
			client.commands.get('setwelcomemessage').execute(msg, args);
		}
		else if (command === 'templates') {
			client.commands.get('templates').execute(msg, args);
		}
		else if (command === 'bet') {
			client.commands.get('bet').execute(msg, args);
		}
		else if (command === 'bj') {
			client.commands.get('bj').execute(msg, args);
			// await msg.guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => {
			// 	audit.entries.forEach(log => {
			// 		msg.channel.send(log.target.username)
			// 	});
			// })
			// const fetchedLogs = await msg.guild.fetchAuditLogs({
			// 	limit: 100,
			// 	type: 'MEMBER_BAN_ADD',
			// });
			// fetchedLogs.entries.forEach(entry => {
			// 	msg.channel.send(entry.target.username)
			// });
			// Since there's only 1 audit log entry in this collection, grab the first one
			
			// Perform a coherence check to make sure that there's *something*
		
			// Now grab the user object of the person who banned the member
			// Also grab the target of this action to double-check things
		
			// Update the output with a bit more information
			// Also run a check to make sure that the log returned was for the same banned member
			
			

			
		}
		else if (command === 'whoissatvik') {
			client.commands.get('whoissatvik').execute(msg, args);
		}
		else if (command === 'invites') {
			client.commands.get('invites').execute(msg, args);
		}
	
			
		else if (command === 'trade') {
			client.commands.get('trade').execute(msg, args);
		}
		else if (command === 'bubblewrap') {
			client.commands.get('bubblewrap').execute(msg, args);
		}
		// 	else if (command === 'eval') {
		// 	client.commands.get('eval').execute(msg, args);
		// }
			else if (command === 'loan') {
			client.commands.get('loan').execute(msg, args);
		}
}
		// else if (`${results[0].autorespond}` == '1' && msg.channel.name.includes('spam')) {
		//  			console.log(msg.content)

		// 	// let shouldSkip = false;
		// 	let msglist = []
		// 	connection.query('select * from autorespond', [msg.content.toLowerCase()], function(error, results1, fields) {
		// 		results1.forEach(result => {

		// 			if (msg.content.toLowerCase().includes(result.message.toLowerCase())) {
		// 				msglist.push(result.response)

		// 			}


		// 		});
		// 		let number = Math.random() * Math.floor(msglist.length)
					
		// 		msg.channel.send(msglist[Math.floor(number)])
		// 		if (msg.content.startsWith('.add')) {
		// 			var args = msg.content.split(' ').slice(1).join(' ');

		// 			connection.query('insert into autorespond(message, response) values(?,?)', [args, 'pending'], function(error, results1, fields) {

		// 			})
		// 			msg.reply('added to database')
		// 		}
		// 		if (msg.content.startsWith('.response')) {
		// 			var args = msg.content.split(' ').slice(1).join(' ');

		// 			connection.query('update autorespond set response = ? where response = ?', [args, 'pending'], function(error, results1, fields) {

		// 			})
		// 			msg.reply('added to database')
		// 		}
		// 	})
		// }
	else{
		
			if (`${results[0].autorespond}` == '1' && msg.channel.name.includes('spam') && msg.member.user.username != 'Softwaresat Bot') {
			let content = await JSON.parse(await JSON.stringify(await msg.channel.messages.fetch({limit: 3})))[0].content
			let content1 = await JSON.parse(await JSON.stringify(await msg.channel.messages.fetch({limit: 3})))[1].content
			let content2 = await JSON.parse(await JSON.stringify(await msg.channel.messages.fetch({limit: 3})))[2].content
			console.log(content,content1,content2)
			        let headers = {
            'Authorization': "Bearer api_XiHydGWrCegdUpnaaGOgTMlHckFysKLBXb"
        }


      
await fetch("https://api-inference.huggingface.co/models/satvikag/chatbot2", {
  method: "POST",
  body: await JSON.stringify({
  	"inputs": {
            "past_user_inputs": [content2],
            "generated_responses": [content1],
            "text": content,
  	}
        }),
  headers: headers
})
.then(async response => await response.json())
.then(async json => await msg.channel.send(json.generated_text))
.catch(err => console.log(err));
			

			}	
			
		else if (msg.mentions.users.has(client.user.id) && !msg.author.bot) {
			msg.reply(`my prefix here is ${results[0].prefix}`)
			
		}
		
	}

	});
});

client.login('NzYwNjU0NzkwNTIyNTY4NzM1.X3PM-g.Dl9IFiXkSbQRudWm2zaSgrTnHYc');
