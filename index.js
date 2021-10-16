/* eslint-disable no-redeclare */
/* eslint-disable no-var */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable max-nested-callbacks */
/* eslint-disable no-inline-comments */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable no-shadow */
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
const Canvas = require('canvas');
const cusswords = [];
const AntiSpam = require('discord-anti-spam');

const antiSpam = new AntiSpam({
	warnThreshold: 5,
	kickThreshold: 10,
	muteThreshold: 8,
	maxInterval: 1000,
	warnMessage: '{@user}, Please stop spamming.',
	kickMessage: '**{user_tag}** has been kicked for spamming.',
	muteMessage: '**{user_tag}** has been muted for spamming.',
	maxDuplicatesWarning: 8,
	maxDuplicatesKick: 10,
	maxDuplicatesMute: 5,
	exemptPermissions: ['ADMINISTRATOR'],
	ignoreBots: true,
	verbose: true,
	ignoredUsers: [],
});
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


client.on('ready', async () => {
	const servers = await client.guilds.cache.size
    // statcord.autopost();

	connection.query('select * from cusswords', async function (error, results) {
		results.forEach(result => {
			cusswords.push(`${result.word}`);
		});
		const activities_list = [
			servers.toString()+' servers | shelp',

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
	connection.query('select * from settings where servername = ?', [member.guild.name], async (error, results, fields) => {
		let channel; 
		if(results[0] != undefined && results[0] != 'undefined'){
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
	  .setTitle('Welcome to '+member.guild.name+'!')
	  
	  .addFields(
		  { name: member.user.username, value: results[0].welcomemessage, inline: false },
	  )
	  .setTimestamp()
	  .setFooter(member.guild.memberCount.toString()+' Members')
	  if(results[0].welcomepicture != null && results[0].welcomepicture != 'null'){
		  embed.setImage(results[0].welcomepicture)
	  }
	  else{
		  embed.setImage(member.guild.iconURL())
	  }
	  channel = member.guild.channels.cache.find(ch => ch.name === `${results[0].welcomechannel}`);

	  if(channel){
		  channel.send(embed)
	  }
			// eslint-disable-next-line no-shadow
			connection.query('select autorole from settings where servername = ?', [member.guild.name], function (error, results) {
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
			.addFields(
				{ name: 'Member Count', value: guild.memberCount, inline: false },


			);
		guild1.channels.cache.find(t => t.name == 'server-log').send(embed);
		connection.query('select * from settings where servername = ?', [guild.name], async function (error, results, fields) {
			console.log('Joined a new guild: ' + guild.name);
			
		});
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
function daily(msg){
	const nz_date_string = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
		const date_nz = new Date(nz_date_string);

		// hours as (HH) format
		const hours = ('0' + date_nz.getHours()).slice(-2);

		// minutes as (mm) format
		const minutes = ('0' + date_nz.getMinutes()).slice(-2);

		// seconds as (ss) format
		const seconds = ('0' + date_nz.getSeconds()).slice(-2);

		const time_hh_mm_ss = hours + ':' + minutes + ':' + seconds;
		connection.query('select * from profiles where name = ?',[msg.member.user.username], async function (error, results2, fields) {

				// console.log(result.bankmembership.substr(2,2))

				if (results2[0].userid != undefined && results2[0].userid != null && results2[0].lastdaily != nz_date_string.substr(0, 10)) {
					let user = client.users.cache.get(results2[0].userid);

					connection.query('update profiles set lastdaily=? where name=?', [nz_date_string.substr(0, 10), results2[0].name], async function (error, results, fields) {


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
					connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {


						connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - (((9000 * results2[0].smallhouse) + (16000 * results2[0].mediumhouse) + (30000 * results2[0].largehouse) + (45000 * results2[0].smallmansion) + (10 * results2[0].bonds) + 2500)-((((9000 * results2[0].smallhouse) + (16000 * results2[0].mediumhouse) + (30000 * results2[0].largehouse) + (45000 * results2[0].smallmansion) + (10 * results2[0].bonds) + 2500)-(results2[0].loan*0.05))*0.15)), 'bank'], function (error, results, fields) {
						});

					});
					connection.query('update profiles set coins = ? where name = ?', [results2[0].coins + (((9000 * results2[0].smallhouse) + (16000 * results2[0].mediumhouse) + (30000 * results2[0].largehouse) + (45000 * results2[0].smallmansion) + (10 * results2[0].bonds)-((((9000 * results2[0].smallhouse) + (16000 * results2[0].mediumhouse) + (30000 * results2[0].largehouse) + (45000 * results2[0].smallmansion) + (10 * results2[0].bonds) + 2500)-(results2[0].loan*0.05))*0.15)) + 2500), results2[0].name.toString()], function (error, results, fields) {
						
					});
					
					
					user = client.users.cache.get(results2[0].userid);
					if (user != undefined && user != null) {
						if(results2[0].dmblock == 0){

						user.send(attachment);
						user.send('This is your daily salary for today, it has been transferred into your account!');
						user.send('To disable DM notifications: run the setblockdm true command preceded with your server\'s prefix')

						}
					}

					
					console.log(5);
					if (results2[0].job == 'ceo') {
						connection.query('select * from stocks where name = ? and business = ?', [results2[0].name, results2[0].bussiness], function (error, results10, fields) {
							connection.query('select * from stocks where business = ?', [results2[0].bussiness], function (error, results6, fields) {

								connection.query('select * from bussiness where name = ?', [results2[0].bussiness], function (error, results1, fields) {

									connection.query('update stocks set number = ? where name = ? and business = ?', [results10[0].number + 30, results2[0].name.toString(), results2[0].bussiness], function (error, results, fields) {
									});
									let number = 0;
									results6.forEach(result1 => {
										number = number + result1.number;
									});
									connection.query('update bussiness set stockvalue = ? where name = ?', [results1[0].stockvalue + ((results1[0].stockvalue / number) * parseInt('30')), results2[0].bussiness], function (error, results3, fields) {
									});
									connection.query('select * from profiles where name = ?', ['bank'], function (error, results10, fields) {


										connection.query('update profiles set coins = ? where name = ?', [results10[0].coins - ((results1[0].stockvalue / number) * parseInt('30')), 'bank'], function (error, results, fields) {
										});

									});
									connection.query('update bussiness set balance = ? where name = ?', [results1[0].balance + ((results1[0].stockvalue / number) * parseInt('30')), results2[0].bussiness], function (error, results3, fields) {
									});
									if(results2[0].dmblock == 0){
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
						connection.query('select * from bussiness where name = ?', [results2[0].bussiness], function (error, results1, fields) {
							if (results1[0].dailystocks > 0) {
								console.log(5);
								connection.query('select * from stocks where business = ?', [results2[0].bussiness], function (error, results6, fields) {
									connection.query('select * from stocks where name = ? and business = ?', [results2[0].name, results2[0].bussiness], function (error, results10, fields) {

										let number = 0;
										results6.forEach(result1 => {
											number = number + result1.number;
										});
										if (results10[0] != undefined && results10[0] != null && results10[0] != 'null' && results[0] != 'undefined') {
											connection.query('update stocks set number = ? where name = ? and business = ?', [results10[0].number + results1[0].dailystocks, results2[0].name.toString(), results2[0].bussiness], function (error, results, fields) {
											});
										}
										else {
											connection.query('insert into stocks(name, number, business) values(?,?,?)', [results2[0].name.toString(), results1[0].dailystocks, results2[0].bussiness], function (error, results, fields) {
											});
										}
										connection.query('update bussiness set stockvalue = ? where name = ?', [results1[0].stockvalue + ((results1[0].stockvalue / number) * results1[0].dailystocks), results2[0].bussiness], function (error, results3, fields) {
										});

									});
								});
								const user = client.users.cache.get(results2[0].userid);
								if(results2[0].dmblock == 0){

								user.send('You have received your daily shares!');
								}
							}
						});
					}
				}

				else if (results2[0].loan + results2[0].loan * 0.05 <= results2[0].paidback && results2[0].loan != 0 && results2[0].userid != undefined && results2[0].userid != null) {
					const user = client.users.cache.get(results2[0].userid);

					connection.query('update profiles set loan = ? where name = ?', [0, results2[0].name.toString()], function (error, results, fields) {
					});
					connection.query('update profiles set paidback = ? where name = ?', [0, results2[0].name.toString()], function (error, results, fields) {
					});
					if(results2[0].dmblock == 0){

					user.send('Your loan has been paid back!');
					}
					console.log(2);

				}
				
				else if (results2[0].loan != 0 && results2[0].paidback < results2[0].loan + results2[0].loan * 0.05 && results2[0].userid != undefined && results2[0].userid != null && results2[0].lastloanpayment != nz_date_string.substr(0, 10)) {
					const user = client.users.cache.get(results2[0].userid);

					connection.query('update profiles set lastloanpayment=? where name=?', [nz_date_string.substr(0, 10), results2[0].name], async function (error, results, fields) {


					});
					connection.query('update profiles set coins = ? where name = ?', [results2[0].coins - results2[0].loan * 0.05, results2[0].name.toString()], function (error, results, fields) {
					});
					connection.query('update profiles set paidback = ? where name = ?', [results2[0].paidback + results2[0].loan * 0.05, results2[0].name.toString()], function (error, results, fields) {
					});
					connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

						connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + results2[0].loan * 0.05, 'bank'], function (error, results, fields) {
						});

					});
				}
			
				 if(results2[0].bankmembership.substr(3,2) != '00' && results2[0].bankmembership.substr(1,2) != nz_date_string.substr(0,2)){
					connection.query('update profiles set bankmembership = ? where name = ?', ['00-00-0000', results2[0].name], function (error, results, fields) {
					});
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
 
// client.on('guildDelete', (guild) => {
// 	const guild1 = client.guilds.cache.get('763913144653316126');
// 	embed = new Discord.MessageEmbed()
// 		.setColor('#0099ff')
// 		.setTitle(guild.name + ' just deleted the bot!')
// 		.setImage(guild.iconURL())
// 		.addFields(
// 			{ name: 'Member Count', value: guild.memberCount, inline: false },


// 		);
// guild1.channels.cache.find(t => t.id == '785324285601644576').send(embed);
// connection.query('insert into left(name) values(?)', [guild.name], function (error, results, fields) {
// 	});
// });

client.on('guildMemberRemove', person => {
	// Send the message to a designated channel on a server:
	// eslint-disable-next-line no-unused-vars
	connection.query('select welcomechannel from settings where servername = ?', [person.guild.name], function (error, results, fields) {
		channel = person.guild.channels.cache.find(ch => ch.name === `${results[0].welcomechannel}`);
		// Do nothing if the channel wasn't found on this server
		if (channel) {
			// Send the message, mentioning the member
			channel.send(`${person.user.username}` + ' just left the server');
		}
	});
});

message = ''
// Send the message to a designated channel on a server:
client.on('message', async message1 => {
	if(!message1.channel.name.includes('spam')){
	antiSpam.message(message1)
	}
})
client.on('message', async msg => {
	if ((!msg.author.bot || msg.author.username == 'DGZ ETF' || msg.author.username == 'Softwaresat Helper'|| msg.author.username == 'Softwaresat Coins Miner') && msg.member.user.username != 'Someone Weird') {
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
		serverName = msg.guild.name;

		let channel;
		connection.query('select * from settings where servername = ?', [msg.guild.name], async function (error, results, fields) {

			if (results == undefined || `${results[0]}` == '[]' || `${results[0]}` == 'undefined' || `${results[0]}` == undefined || `${results[0]}` === [] || `${results[0]}` == '[]') {
				// eslint-disable-next-line no-unused-vars
				connection.query('insert into settings(servername) values(?)', [msg.guild.name], function (error, results, fields) {
					console.log(msg.guild.name);
				});
			}
			connection.query('select link from settings where servername = ?', [msg.guild.name], async function (error, results, fields) {
				if (`${results[0].link}` == null || `${results[0].link}` == 'null' || `${results[0].link}` == [] || `${results[0].link}` == '[]' || `${results[0].link}` == ' ' || `${results[0].link}` == null) {
					let code;
					const channel1 = msg.channel;
					channel1.createInvite({
						maxAge: 0, // 0 = infinite expiration
						maxUses: 0, // 0 = infinite uses
					}).then(invite => {
						connection.query('update settings set link = ? where servername = ?', ['https://discord.gg/' + invite.code, msg.guild.name], async function (error, results, fields) {
						});
						code = invite.code;
					})
					

				}
			});
			channel = msg.guild.channels.cache.find(ch => ch.name === 'counting');
			
			if ((msg.channel.name.includes('counting')) && msg.member.user.username != 'Softwaresat Bot' && results[0].countingtype == 'traditional') {
				if (msg.member.user.username != results[0].lastcounted && msg.content == results[0].counter) {
					connection.query('update settings set lastcounted = ? where servername = ?', [msg.member.user.username, msg.guild.name], function (error, results1, fields) {
					});
					connection.query('update settings set counter = ? where servername = ?', [results[0].counter + 1, msg.guild.name], function (error, results1, fields) {
					});
				}
				else {
					msg.channel.messages.fetch({ limit: 1 }).then(messages => { // Fetches the messages
						msg.channel.bulkDelete(messages, // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
						);
					});
				}
			}
			if (msg.member.user.username != 'Softwaresat Bot' && results[0].ranks == 1) {
				connection.query('select messages,level from ranks where name = ? && server = ?', [msg.member.user.username, msg.guild.name], function (error, results, fields) {
					if (results == undefined || `${results[0]}` == '[]' || `${results[0]}` == 'undefined' || `${results[0]}` == undefined || results === [] || `${results[0]}` == '[]') {
						// eslint-disable-next-line no-unused-vars
						connection.query('insert into ranks(name,server) values(?,?)', [msg.member.user.username, msg.guild.name], function (error, results, fields) {
						});
					}
					else if (results[0].level * 10 == results[0].messages) {

						connection.query('update ranks set level = ? where name = ? && server = ?', [results[0].level + 1, msg.member.user.username, msg.guild.name], function (error, results, fields) {
						});
						connection.query('update ranks set messages = ? where name = ? && server = ?', [0, msg.member.user.username, msg.guild.name], function (error, results, fields) {
						});
						connection.query('select messages, level from ranks where name = ? && server = ?', [msg.member.user.username, server], function (error, results1, fields) {
							embed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle(`<a:HappyDance:839532480036995082> Level Up! <a:HappyDance:839532480036995082>`)
											.setDescription(`For: ${msg.author}`)
											.addFields(
												{ name: '<a:Up_arrow:837505765451104376> Old Level! <a:Up_arrow:837505765451104376>', value: `${(results1[0].level) - 1}!`, inline: false },
												{ name: '<:newbadge:839606753817526323> New Level! <:newbadge:839606753817526323>', value: `${results1[0].level}!`, inline: false },


											);
							msg.channel.send(embed);
							// msg.reply('You have reached level ' + results1[0].level);
						});

					}
					else {
						connection.query('update ranks set messages = ? where name = ? && server = ?', [results[0].messages + 1, msg.member.user.username, msg.guild.name], function (error, results, fields) {
						});
					}
				});
			}
			if ((msg.channel.name.includes('counting')) && msg.member.user.username != 'Softwaresat Bot' && results[0].countingtype == 'chain') {
				if (msg.member.user.username != results[0].lastcounted && msg.content == results[0].counter) {
					connection.query('update settings set lastcounted = ? where servername = ?', [msg.member.user.username, msg.guild.name], function (error, results1, fields) {
					});
					connection.query('update settings set counter = ? where servername = ?', [results[0].counter + 1, msg.guild.name], function (error, results1, fields) {
					});
					msg.react('✅');
				}
				else if (isNaN(msg.content) == false && msg.content != results[0].counter - 1) {
					msg.react('❌');
					msg.reply('You broke the number chain! Next number is 0!');
					connection.query('update settings set lastcounted = ? where servername = ?', ['none', msg.guild.name], function (error, results1, fields) {
					});
					connection.query('update settings set counter = ? where servername = ?', [0, msg.guild.name], function (error, results1, fields) {
					});

				}
			}

			const server = msg.guild.name;
			var content = msg.content.trim().split(' ');
			connection.query('select autodelete,cussing from settings where servername = ?', [server], function (error, results1, fields) {
				content.forEach(message => {
					cusswords.forEach(word => {

					if (message.toLowerCase() == word.toLowerCase() && results1.cussing == 1) {
						console.log(999)
						if ((results1[0].autodelete == undefined || results1[0].autodelete == 'undefined' || results1[0].autodelete == '[]' || results1[0].autodelete == []) && (results1[0].autodelete != '0'
						)) {
							msg.reply('Do ssettings to create a setting profile for your server!');
						}
						else if (`${results1[0].autodelete}` == '1') {
							msg.channel.messages.fetch({ limit: 1 }).then(messages => { // Fetches the messages
								msg.channel.bulkDelete(messages, // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
								);
							});
						}
						msg.reply('STOP CURSING!');
						member = msg.member;
						channel = member.guild.channels.cache.find(ch => ch.name === `${results[0].logchannel}`);
						if (channel) { channel.send('Warning sent to ' + `${member.user}` + ' for Cursing!'); }
						else {
							msg.reply('Please set the AutoLog channel in settings!');
						}
						msg.member.send('Hey you, you have been warned for Cursing!');
						member = `${msg.member.id}`;
						connection.query('insert into warnings(name,reason) values(?,?)', [member, 'cussing'], function (error, results, fields) {
						});
						console.log(member);
						connection.query('select count(*) as num from warnings where name =?', [member], function (error, results, fields) {
							const count = `${results[0].num}`;
							connection.query('select kickthreshold,autokick from settings where servername = ?', [server], function (error, results1, fields) {
								console.log(count);
								console.log(`${results1[0].kickthreshold}`);
								if (parseInt(count) >= parseInt(`${results1[0].kickthreshold}`) && results1[0].autokick == '1') {
									member = msg.member;
									connection.query('select link from settings where servername = ?', [server], function (error, results2, fields) {
										connection.query('select invitationback from settings where servername = ?', [server], function (error, results3, fields) {
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
											connection.query('delete from warnings where name = ?', [`${member.id}`], function (error, results, fields) {
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
				member = msg.member;
				channel = member.guild.channels.cache.find(ch => ch.name === `${results[0].logchannel}`);
				if (channel) { channel.send('Warning sent to ' + `${member.user}` + ' for Pinging!'); }
				else {
					msg.reply('Please set the AutoLog channel in settings!');
				}
				msg.member.send('Hey you, you have been warned for Pinging!');
				member = `${msg.member.id}`;
				connection.query('insert into warnings(name,reason) values(?,?)', [member, 'pinging'], function (error, results, fields) {
				});
				console.log(member);
				connection.query('select count(*) as num from warnings where name =?', [member], function (error, results, fields) {
					const count = `${results[0].num}`;
					connection.query('select kickthreshold,autokick from settings where servername = ?', [server], function (error, results1, fields) {
						console.log(count);
						console.log(`${results1[0].kickthreshold}`);
						if (parseInt(count) >= parseInt(`${results1[0].kickthreshold}`) && results1[0].autokick == '1') {
							member = msg.member;
							connection.query('select link from settings where servername = ?', [server], function (error, results2, fields) {
								connection.query('select invitationback from settings where servername = ?', [server], function (error, results3, fields) {
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
									connection.query('delete from warnings where name = ?', [`${member.id}`], function (error, results, fields) {
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
			const ms = require('ms'); // npm install ms
			args = msg.content.slice(results[0].prefix.length).trim().split(/ +/g);
			const command = args.shift().toLowerCase();
		
			if (command === 'gstart') {
				// g!start-giveaway 2d 1 Awesome prize!
				// will create a giveaway with a duration of two days, with one winner and the prize will be "Awesome prize!"
		
				await client.giveawaysManager.start(msg.channel, {
					time: ms(args[0]),
					prize: args.slice(2).join(' '),
					winnerCount: parseInt(args[1])
				}).then((gData) => {
					 console.log(gData); // {...} (messageid, end date and more)
				});
				// And the giveaway has started!
			}
			if(msg.content.startsWith(results[0].prefix)){
				connection.query('select * from profiles where userid = ?', [msg.member.user.id], function (error, results1, fields) {
					if (results1[0] != undefined || results1[0] != null) {
						if (results1[0].name != results1[0].userid) {
							connection.query('update profiles set name = ? where userid = ?', [msg.member.user.username, msg.member.user.id], function (error, results, fields) {
							})
						}
					}
					else {
						connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results3, fields) {
							if (results3[0] == undefined || results3[0] == null) {
								connection.query('insert into profiles(name, missionnumber, coins) values(?,?,?)', [msg.member.user.username, 1, 100], function (error, results, fields) {
								})
							}
						})
					}
				})
			}
			// else if(results[0].notify == 0 && msg.member.user.username != 'Softwaresat Bot') {

			// 	msg.channel.send('Recurring power outage in my hosting, please don\'t delete bot during this time (sorry for message, but power outage happens too often)');
			// 	connection.query('update settings set notify=1 where servername=?', [msg.guild.name], async function(error, results, fields) {
			// 	});
			// }
			connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {
				if (results[0] != undefined && results[0] != null) {
					connection.query('update profiles set userid = ? where name = ?', [msg.author.id, msg.member.user.username], function (error, results, fields) {
					});
				}
			});
			if (results[0].autobump == 1 && msg.member.user.username != 'Softwaresat Bot') {
				let code;
				const channel1 = msg.channel;
				connection.query('select * from bumps where server=?', [msg.guild.name], function (error, results2, fields) {
					if(results2[0].link == 'none'){
				channel1.createInvite({
					maxAge: 0, // 0 = infinite expiration
					maxUses: 0, // 0 = infinite uses
				}).then(invite => {
					connection.query('update bumps set link=? where server=?', [invite.code, msg.guild.name], async function (error, results, fields) {
					});
					code = invite.code;
				
				})
				.catch(err => {
					msg.channel.send('I lack the permissions to create invite links in this server with autobump!');

				});
			}
				});

				connection.query('select * from bumps where server = ?', [msg.guild.name], function (error, results, fields) {
					if (!(parseInt(time_hh_mm_ss.substr(0, 2) - 2) < parseInt(results[0].lastbumped.substr(0, 2)) && results[0].lastbumpeddate == nz_date_string.substr(0, 10))) {
						connection.query('update bumps set lastbumped=? where server=?', [time_hh_mm_ss, msg.guild.name], async function (error, results, fields) {


						});
						console.log(nz_date_string);
						connection.query('update bumps set lastbumpeddate=? where server=?', [nz_date_string.substr(0, 10), msg.guild.name], async function (error, results, fields) {


						});
						connection.query('select * from bumps', [msg.guild.name], function (error, results3, fields) {

							results3.forEach(result => {
								connection.query('select * from bumps where server=?', [msg.guild.name], function (error, results2, fields) {

									var server = client.guilds.cache.find(guild => guild.name === `${result.server}`);
									let channel1;
									if (server != undefined) {
										channel = server.channels.cache.find(ch => ch.name === 'bump');


									} if (channel != undefined && server != undefined) {
										embed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle(`${results[0].server}`)
											.setImage(`${results[0].picture}`)
											.addFields(
												{ name: 'Description', value: results2[0].description, inline: false },
												{ name: 'Invite', value: 'https://discord.gg/' + results2[0].link, inline: false },


											);
										channel.send(embed);


									}


								});

							});
						});
					}
				});
			}


			if (msg.content === `${results[0].prefix}` + 'stats') {
				var os = require('os');

				var usedMemory = os.totalmem() - os.freemem(), totalMemory = os.totalmem();

				var getpercentage =
					((usedMemory / totalMemory) * 100).toFixed(2) + '%';
				const fs = require('fs');
				var stats = fs.statSync('index.js');
				var mtime = stats.mtime;
				const settingsembed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Stats for Softwaresat Bot | Command Handling 10.x')
					.setAuthor('Misc', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setDescription('Here you can view the different statistics for the bot\'s hosting!')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.addFields(
						{ name: 'Library', value: 'discord.js', inline: true },
						{ name: 'Servers', value: `${client.guilds.cache.size}`, inline: true },
						{ name: 'Ping', value: ` ${client.ws.ping}ms`, inline: true },
						{ name: 'Ram Usage', value: (usedMemory / Math.pow(1024, 3)).toFixed(2) + 'GB/4GB', inline: true },
						{ name: 'Ram Usage Percentage', value: getpercentage, inline: true },
						{ name: 'Last Updated', value: mtime, inline: true },
						{ name: 'Type', value: 'Amazon T2-Medium', inline: true },
						{ name: 'Operating System', value: 'Ubuntu Server 20.04 LTS', inline: true },
						// { name: 'More Detailed Stats', value: 'https://statcord.com/bot/760654790522568735', inline: true },


					);
				settingsembed.setTimestamp();

				msg.channel.send(settingsembed);
			}
			else if (msg.content === `${results[0].prefix}` + 'level' || msg.content === `${results[0].prefix}` + 'lvl' || msg.content === `${results[0].prefix}` + 'rank') {
				connection.query('select * from ranks where name = ? && server = ?', [msg.member.user.username, msg.guild.name], function (error, results, fields) {
					const settingsembed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('<a:HR_yellowcrown:835555141309431818> Level! <a:HR_yellowcrown:835555141309431818>')
					.setDescription('Requested by: ' + msg.author.username)
					.addFields(
						{ name: '<a:ani_fire:811616503434575872> Level', value:(results[0].level), inline: false },
						{ name: '<a:rainbowfillblob:773625973211529216> More Messages', value:(results[0].level * 10 - results[0].messages) + " messages left!", inline: false },
						);
						settingsembed.setTimestamp();
						
						msg.channel.send(settingsembed);
						// msg.reply('You are level ' + results[0].level + ' and you need ' + (results[0].level * 10 - results[0].messages) + ' more messages to reach the next level!');
				});
			}
			
			else if (msg.content === `${results[0].prefix}` + 'lb' || msg.content === `${results[0].prefix}` + 'leaderboard') {
				connection.query('select * from ranks where server = ? order by level desc', [msg.guild.name], function (error, results, fields) {
					console.log(results);
					if (results == undefined || results == [] || results == '[]') {
						msg.reply('Enable ranks first');
					}
					else {
						embed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Ranks for ' + `${results[0].server}`);
						var place = 0;
						results.forEach(result => {
							place++;
							if (place > 3 && place < 25) {
								embed.addFields(
									{ name: place + '. ' + result.name, value: 'Level: ' + result.level, inline: false },


								);
							}
							else if (place == 1) {
								embed.addFields(
									{ name: '🥇 ' + result.name, value: 'Level: ' + result.level, inline: false },


								);
							}
							else if (place == 2) {
								embed.addFields(
									{ name: '🥈 ' + result.name, value: 'Level: ' + result.level, inline: false },


								);
							}
							else if (place == 3) {
								embed.addFields(
									{ name: '🥉 ' + result.name, value: 'Level: ' + result.level, inline: false },


								);
							}
						});
						msg.channel.send(embed);
					}
				});

			}
			else if ((msg.content.startsWith(`${results[0].prefix}` + 'userinfo'))) {
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


			}
			else if (msg.content === `${results[0].prefix}` + 'glb') {
					embed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Global Leaderboard');
					var place = 0;
					
								embed.addFields(
									{ name: 'Online Site', value: 'http://softwaresat.onthewifi.com/glb', inline: false },


								);
							
						
							
						
					msg.channel.send(embed);


			}
			// else if (msg.content === `${results[0].prefix}` + 'passive lb') {
			// 	connection.query('select * from profiles', [msg.guild.name], function (error, results, fields) {
			// 		embed = new Discord.MessageEmbed()
			// 			.setColor('#0099ff')
			// 			.setTitle('Global Leaderboard');
			// 		var place = 0;
			// 		var passivelist = []
			// 		results.forEach(result => {
			// 			passivelist.append((9000 * result.smallhouse) + (16000 * result.mediumhouse) + (30000 * result.largehouse) + (45000 * result.smallmansion) + (10 * result.bonds) + 5000)

			// 			if (result.name != 'bank') {
			// 				place++;
			// 				if (place > 3 && place <25) {
			// 					embed.addFields(
			// 						{ name: place + '. ' + result.name, value: 'Coins: ' + result.coins + '\nBank Deposit: ' + result.deposit, inline: false },


			// 					);
			// 				}
			// 				else if (place == 1) {
			// 					embed.addFields(
			// 						{ name: '🥇 ' + result.name, value: 'Coins: ' + result.coins + '\nBank Deposit: ' + result.deposit, inline: false },


			// 					);
			// 				}
			// 				else if (place == 2) {
			// 					embed.addFields(
			// 						{ name: '🥈 ' + result.name, value: 'Coins: ' + result.coins + '\nBank Deposit: ' + result.deposit, inline: false },


			// 					);
			// 				}
			// 				else if (place == 3) {
			// 					embed.addFields(
			// 						{ name: '🥉 ' + result.name, value: 'Coins: ' + result.coins + '\nBank Deposit: ' + result.deposit, inline: false },


			// 					);
			// 				}
			// 			}
			// 		});
			// 		msg.channel.send(embed);

			// 	});

			// }
			else if (msg.content.startsWith(`${results[0].prefix}` + 'blb')) {
				var text = msg.content.slice(5).trim().split(' ');

				connection.query('select * from stocks where business = ? order by number desc', [text[0] + ' ' + text[1] + ' ' + text[2]], function (error, results2, fields) {
					if (results2[0] != undefined && results2[0] != null) {
						embed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Leaderboard for Business Shares');
						var place = 0;
						results2.forEach(result => {
							place++;
							if (place > 3) {
								embed.addFields(
									{ name: place + '. ' + result.name, value: 'Shares: ' + result.number, inline: false },


								);
							}
							else if (place == 1) {
								embed.addFields(
									{ name: '🥇 ' + result.name, value: 'Shares: ' + result.number, inline: false },


								);
							}
							else if (place == 2) {
								embed.addFields(
									{ name: '🥈 ' + result.name, value: 'Shares: ' + result.number, inline: false },


								);
							}
							else if (place == 3) {
								embed.addFields(
									{ name: '🥉 ' + result.name, value: 'Shares: ' + result.number, inline: false },


								);
							}

						});
						msg.channel.send(embed);
					}
					else {
						msg.reply('The specified business does not exist!')
					}
				});

			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'employees')) {
				connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results3, fields) {

				connection.query('select * from profiles where bussiness = ?', [results3[0].bussiness], function (error, results2, fields) {
						embed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Business Employees');
						var place = 0;
						results2.forEach(result => {
							place++;
							if (place <26) {
								embed.addFields(
									{ name: result.name, value: result.job, inline: false },


								);
							}
						

						});
						msg.channel.send(embed);
					
				});
			})
			}
			else if (msg.content == `${results[0].prefix}` + 'bump') {
				let code;
				connection.query('select * from bumps', [msg.guild.name], function (error, results1, fields) {
					connection.query('select * from bumps where server = ?', [msg.guild.name], function (error, results, fields) {

						if (results == undefined) {
							msg.reply('Please do setup with "bumpsetup"!');
						}
						else if (parseInt(time_hh_mm_ss.substr(0, 2) - 2) < parseInt(results[0].lastbumped.substr(0, 2)) && results[0].lastbumpeddate == nz_date_string.substr(0, 10)) {
							msg.reply('You have bumped in the last 2 hours!');
							console.log(parseInt(time_hh_mm_ss.substr(0, 2) - 2));
							console.log(parseInt(results[0].lastbumped.substr(0, 2)));
						}

						else {
							if (`${results[0].link}` == 'none') {
								const channel1 = msg.channel;
								channel1.createInvite({
									maxAge: 0, // 0 = infinite expiration
									maxUses: 0, // 0 = infinite uses
								}).then(invite => {
									connection.query('update bumps set link=? where server=?', [invite.code, msg.guild.name], async function (error, results, fields) {
									});
									code = invite.code;
								});
							}
							const nz_date_string = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
							const date_nz = new Date(nz_date_string);

							// hours as (HH) format
							const hours = ('0' + date_nz.getHours()).slice(-2);

							// minutes as (mm) format
							const minutes = ('0' + date_nz.getMinutes()).slice(-2);

							// seconds as (ss) format
							const seconds = ('0' + date_nz.getSeconds()).slice(-2);

							const time_hh_mm_ss = hours + ':' + minutes + ':' + seconds;
							console.log(parseInt(time_hh_mm_ss.substring(1, 3) - 2));
							console.log(parseInt(results[0].lastbumped.substring(1, 3)));
							console.log(`${results[0].link}`);

							channel = msg.guild.channels.cache.find(ch => ch.name === 'bump');

							if (channel == undefined) {
								msg.reply('You must make a channel named bump before you proceed!');
							}
							else {
								connection.query('update bumps set lastbumped=? where server=?', [time_hh_mm_ss, msg.guild.name], async function (error, results, fields) {


								});
								console.log(nz_date_string);
								connection.query('update bumps set lastbumpeddate=? where server=?', [nz_date_string.substr(0, 10), msg.guild.name], async function (error, results, fields) {


								});
								results1.forEach(result => {
									connection.query('select * from bumps where server=?', [msg.guild.name], function (error, results2, fields) {

										var server = client.guilds.cache.find(guild => guild.name === `${result.server}`);
										if (server != undefined) {
											channel = server.channels.cache.find(ch => ch.name === 'bump');

										}
										if (channel != undefined && server != undefined) {
											if (results2[0].link == 'none') {
												embed = new Discord.MessageEmbed()
													.setColor('#0099ff')
													.setTitle(`${results[0].server}`)
													.setImage(`${results[0].picture}`)
													.addFields(
														{ name: 'Description', value: results2[0].description, inline: false },
														{ name: 'Invite', value: 'https://discord.gg/' + code, inline: false },


													);
												channel.send(embed);

											}
											else {
												embed = new Discord.MessageEmbed()
													.setColor('#0099ff')
													.setTitle(`${results[0].server}`)
													.setImage(`${results[0].picture}`)
													.addFields(
														{ name: 'Description', value: results2[0].description, inline: false },
														{ name: 'Invite', value: 'https://discord.gg/' + results2[0].link, inline: false },


													);
												channel.send(embed);

											}

										}


									});

								});
								msg.reply('Successfully bumped!');

							}

						}
					});
				});


			}
			else if (msg.content == `${results[0].prefix}` + 'christmas') {
				let code;


				const nz_date_string = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
				const date_nz = new Date(nz_date_string);

				// hours as (HH) format
				const hours = ('0' + date_nz.getHours()).slice(-2);

				// minutes as (mm) format
				const minutes = ('0' + date_nz.getMinutes()).slice(-2);

				// seconds as (ss) format
				const seconds = ('0' + date_nz.getSeconds()).slice(-2);

				const time_hh_mm_ss = hours + ':' + minutes + ':' + seconds;
				console.log(parseInt(time_hh_mm_ss.substring(1, 3) - 2));


				embed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Christmas Countdown!🎁')
					.addFields(
						{ name: 'Days', value: (25 - parseInt(nz_date_string.substring(3, 5))).toString(), inline: false },
						{ name: 'Hours', value: (23 - hours).toString(), inline: false },
						{ name: 'Minutes', value: 60 - minutes.toString(), inline: false },

					);
				msg.channel.send(embed);


			}
			else if (msg.content == `${results[0].prefix}` + 'bumpsetup') {
				connection.query('select * from bumps where server=?', [msg.guild.name], function (error, results, fields) {
					if (results[0] == undefined) {
						connection.query('insert into bumps(server) values(?)', [msg.guild.name], function (error, results, fields) {
						});
					}
				});
				const { MessageCollector } = require('discord.js-collector');
				const botMessage = await msg.channel.send('What do you want your description to be?');
				const question = MessageCollector.question({
					botMessage,
					user: msg.author.id,
					onMessage: async (botMessage, message) => { // Every message sent by user will trigger this function.
						connection.query('update bumps set description=? where server=?', [`${message.content}`, msg.guild.name], async function (error, results, fields) {
							botMessage.channel.send('Successfully set description! Please create a channel called bump!');
							question.stop();


						});
					},
				});
				// setTimeout(
				// 	async function image() {
				// 		botMessage = await msg.channel.send('What do you want your image to be (link format)?');
				// 		MessageCollector.question({
				// 			botMessage,
				// 			user: msg.author.id,
				// 			onMessage: async (botMessage, message) => { // Every message sent by user will trigger this function.
				connection.query('update bumps set picture=? where server=?', [msg.guild.iconURL(), msg.guild.name], async function (error, results, fields) {

				});
				// 			},
				// 		});
				// 	}
				// 	, 30000);

			}

			else if (msg.content.startsWith(`${results[0].prefix}` + 'delete')) {
				console.log(`${results[0].prefix}`);
				if (msg.member.permissions.has('MANAGE_MESSAGES') || msg.member.permissions.has('ADMINISTRATOR')) {
					if (msg.content[8] == 'NaN') {
						msg.reply('Uhh, how many do I delete?');
					}
					else if (msg.content[9] != undefined) {
						console.log(msg.content[10]);
						if (msg.content[undefined != 10]) {
							let limitation = 0;
							messages = (parseInt(msg.content[8]) * 100) + (parseInt(msg.content[9]) * 10) + parseInt(msg.content[10]);
							member = msg.member;
							channel = member.guild.channels.cache.find(ch => ch.name === `${results[0].settings}`);
							if (channel) {
								channel.send(`${member.user}` + ' used sdelete for ' + messages + ' item(s) in ' + msg.channel.name + '!');
							}
							else {
								msg.reply('Please set a logging channel in the settings!');
							}
							while (messages != 0) {
								if (messages < 99) {
									limitation = messages;
								}
								else {
									limitation = 99;
								}
								msg.channel.messages.fetch({ limit: limitation }).then(messages => { // Fetches the messages
									msg.channel.bulkDelete(messages, // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
									);
								});
							}
						}
						else {
							const messages = parseInt(msg.content[8]) * 10 + parseInt(msg.content[9]);
							msg.channel.messages.fetch({ limit: messages + 1 }).then(messages => { // Fetches the messages
								msg.channel.bulkDelete(messages, // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
								);
							});
							member = msg.member;
							channel = member.guild.channels.cache.find(ch => ch.name === `${results[0].logchannel}`);
							if (channel) {
								channel.send(`${member.user}` + ' used sdelete for ' + messages + ' item(s) in ' + msg.channel.name + '!');
							}
							else {
								msg.reply('Please set a logging channel in the settings!');
							}
						}
					}
					else {
						var messages = parseInt(msg.content[8]);
						msg.channel.messages.fetch({ limit: messages + 1 }).then(messages => { // Fetches the messages
							msg.channel.bulkDelete(messages, // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
							);
						});
						member = msg.member;
						channel = member.guild.channels.cache.find(ch => ch.name === `${results[0].logchannel}`);
						if (channel) {
							channel.send(`${member.user}` + ' used sdelete for ' + messages + ' item(s) in ' + msg.channel.name + '!');
						}
						else {
							msg.reply('Please set a logging channel in the settings!');
						}
					}
				}
			}

			else if (msg.content.startsWith(`${results[0].prefix}` + 'notify')) {
				var args = msg.content.split(' ').slice(1).join(' ');
				client.guilds.cache.forEach(guild => {

					let superguild = guild.channels.cache.find(channel => channel.name === 'general');
					if (superguild == undefined) {
						superguild = guild.channels.cache.find(channel => channel.name === 'lounge');
						if (superguild == undefined) {
							console.log(guild);
						}
						else {
							superguild.send(args);
						}


					}

					else {
						superguild = guild.channels.cache.find(channel => channel.name === 'general');

						superguild.send(args);

					}
				});
			}

			else if (msg.content.startsWith(`${results[0].prefix}` + 'ping')) {

				msg.reply(`Pong! Bot's Ping is ${client.ws.ping}ms`);
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'reactionrole')) {
				var args = msg.content.split(' ').slice(1).join(' ');
				embed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Reaction Role');
				let number = 0;
				args = args.trim().split(' ');
				args.forEach(arg => {
					number++;
					if (number == 1) {
						embed.addFields(
							{ name: arg, value: '1️⃣', inline: false },

						);
						msg.react('1️⃣');

					}
					else if (number == 2) {
						embed.addFields(
							{ name: arg, value: '2️⃣', inline: false },

						);
						msg.react('2️⃣');

					}
					else if (number == 3) {
						embed.addFields(
							{ name: arg, value: '3️⃣', inline: false },

						);
						msg.react('3️⃣');

					}
					else if (number == 4) {
						embed.addFields(
							{ name: arg, value: '4️⃣', inline: false },

						);
						msg.react('4️⃣');

					}
					else if (number == 5) {
						embed.addFields(
							{ name: arg, value: '5️⃣', inline: false },

						);
						msg.react('5️⃣');

					}

				});
				msg.channel.send(embed);
				const filter = (reaction, user) => {
					return ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'].includes(reaction.emoji.name) && user.id != '760654790522568735';
				};

				const collector = msg.createReactionCollector(filter, { time: 10000 });
				collector.on('collect', (reaction, reactionCollector) => {

					if (reaction.emoji.name === '1️⃣') {
						msg.channel.send('you reacted with a 1');
						const role = msg.guild.roles.cache.find(r => r.name === args[0]);

						const member = reaction.message.member;
						member.roles.add(role);


					}
					if (reaction.emoji.name === '2️⃣') {
						msg.channel.send('you reacted with a 2');
						const role = msg.guild.roles.cache.find(r => r.name === args[1]);

						const member = reaction.message.member;
						member.roles.add(role);
					}
					if (reaction.emoji.name === '3️⃣') {
						msg.channel.send('you reacted with a 3');
						const role = msg.guild.roles.cache.find(r => r.name === args[2]);

						const member = reaction.message.member;
						member.roles.add(role);
					}
					if (reaction.emoji.name === '4️⃣') {
						msg.channel.send('you reacted with a 4');
						const role = msg.guild.roles.cache.find(r => r.name === args[3]);

						const member = reaction.message.member;
						member.roles.add(role);

					}
					if (reaction.emoji.name === '5️⃣') {
						msg.channel.send('you reacted with a 5');
						const role = msg.guild.roles.cache.find(r => r.name === args[4]);

						const member = reaction.message.member;
						member.roles.add(role);
					}
				});

				// args.forEach(arg => {
				// 	const role = guild.roles.cache.find(({ name }) => name === 'SupportNeeded');

				// });
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'mute')) {
				if (msg.member.permissions.has('ADMINISTRATOR')) {
					var guild = msg.guild;
					const member1 = msg.mentions.members.first();
					member1.roles.set([]);
					if (!guild.roles.cache.some(role => role.name === 'Muted')) {
						guild.roles.create({
							data: {
								name: 'Muted',
								color: 'gray',
							},
						});
					}
					const role = guild.roles.cache.find(({ name }) => name === 'Muted');
					member1.roles.add(role);
					msg.reply('Successfullly muted!');
				}
				else {
					msg.reply('You do not have sufficient permissions!');
				}
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'roleall')) {
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
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'unmute')) {
				if (msg.member.permissions.has('ADMINISTRATOR')) {
					guild = msg.guild;
					const member1 = msg.mentions.members.first();
					if (`${results[0].autorole}` == 'None') {
						msg.reply('Set your autorole before you unmute!');
					}
					else {
						let role = guild.roles.cache.find(({ name }) => name === 'Muted');
						member1.roles.remove(role);
						role = guild.roles.cache.find(({ name }) => name === `${results[0].autorole}`);
						member1.roles.add(role);
						msg.reply('Successfully Unmuted!');
					}
				}
				else {
					msg.reply('You do not have sufficient permissions!');
				}
			}

			else if (msg.content.startsWith(`${results[0].prefix}` + 'ticket')) {
				msg.channel.send('Check the channel support-needed for further-support!');
				var member = msg.member;
				channel = msg.member.guild.channels.cache.find(ch => ch.name === 'support-needed');
				guild = msg.guild;
				if (!guild.roles.cache.some(role => role.name === 'SupportNeeded')) {
					guild.roles.create({ data: { name: 'SupportNeeded', permissions: ['SEND_MESSAGES'] } });
				}
				const role = guild.roles.cache.find(({ name }) => name === 'SupportNeeded');
				msg.member.roles.add(role);
				msg.reply('Please state your reason, you have 15 seconds!');
				var filter = m => m.author.id === msg.author.id;
				const collector = msg.channel.createMessageCollector(filter, { time: 15000 });
				let ticket;
				collector.on('collect', async m => {
					connection.query('insert into tickets(user, info) values(?,?)', [msg.member.user.username, `${m.content}`], function (error, results, fields) {
					});
					connection.query('select * from tickets where user = ?', [msg.member.user.username], async function (error, results, fields) {
						embed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('We will help you shortly!')
							.addFields(
								{ name: 'ID', value: results[0].id, inline: true },
								{ name: 'Name', value: results[0].user, inline: true },
								{ name: 'Ticket', value: results[0].info, inline: true },
							);
						const { ReactionCollector } = require('discord.js-collector');

						const botMessage = await channel.send(embed);
						if (await ReactionCollector.yesNoQuestion({ botMessage, user: msg.author })) {
							channel.send('We are happy that your problem got solved');
							const role = guild.roles.cache.find(({ name }) => name === 'SupportNeeded');
							msg.member.roles.remove(role);
							channel.messages.fetch({ limit: 99 }).then(messages => { // Fetches the messages
								channel.bulkDelete(99, // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
								);
							});
							connection.query('delete from tickets where user = ?', [msg.member.user.username], function (error, results, fields) {
							});
							embed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Feedback')
								.setDescription('Thanks for choosing Softwaresat Bot! Our records indicate that you have recently closed a ticket, please fill out the form below to help improve our customer service!')
								.addFields(
									{ name: 'Form', value: 'https://bit.ly/31jH3yZ', inline: true },
								);
							msg.member.send(embed);
						}

						else {
							channel.send('Sorry, hopefully we can help you next time!');
							const role = guild.roles.cache.find(({ name }) => name === 'SupportNeeded');
							msg.member.roles.remove(role);

							channel.messages.fetch({ limit: 99 }).then(messages => { // Fetches the messages
								channel.bulkDelete(99, // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
								);
							});
							connection.query('delete from tickets where user = ?', [msg.member.user.username], function (error, results, fields) {
							});
							embed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Feedback')
								.setDescription('Thanks for choosing Softwaresat Bot! Our records indicate that you have recently closed a ticket, please fill out the form below to help improve our customer service!')
								.addFields(
									{ name: 'Form', value: 'https://bit.ly/31jH3yZ', inline: true },
								);
							msg.member.send(embed);
						}
						channel.send('<@764276001919205386>');

					});
					collector.on('end', collected => {
					});
				});
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'purgenotices')) {
				const person = msg.mentions.users.first();
				serverName = msg.guild.name;
				if (msg.member.permissions.has('ADMINISTRATOR')) {
					connection.query('delete from warnings where name = ?', [parseInt(`${person.id}`)], function (error, results, fields) {
						msg.channel.send('Successfully deleted warnings!');
					});
				}
				else {
					msg.reply('Sorry, you don\'t have sufficient permissions');
				}
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'setautokick')) {
				if (msg.member.permissions.has('ADMINISTRATOR')) {
					if (msg.content.endsWith('false')) {
						connection.query('update settings set autokick=0 where servername = ?', [server], function (error, results, fields) {
							const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Auto Kick Disabled!')
							.addFields(
								{ name: 'New Auto Kick Status!', value:'Auto Kick has been successfully `turned off`', inline: true },
							);
					msg.channel.send(settingsembed);
						});
					}
					else if (msg.content.endsWith('true')) {
						connection.query('update settings set autokick=1 where servername = ?', [server], function (error, results, fields) {
							const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Auto Kick Enabled!')
							.addFields(
								{ name: 'New Auto Kick Status!', value:'Auto Kick has been successfully `turned on`', inline: true },
							);
					msg.channel.send(settingsembed);
						});
					}
					else {
						msg.reply(':warning: Check your syntax! :warning:');
					}
				}
				else {
					msg.reply(':warning: You don\'t have sufficient permissions! :warning:');
				}
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'setautodelete')) {
				if (msg.member.permissions.has('ADMINISTRATOR')) {
					if (msg.content.endsWith('false')) {
						connection.query('update settings set autodelete=0 where servername = ?', [server], function (error, results, fields) {
							const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Auto Censor Disabled!')
							.addFields(
								{ name: 'New Auto Censor Status!', value:'Auto Censor has been successfully `turned off`', inline: true },
							);
					msg.channel.send(settingsembed);
						});
					}
					else if (msg.content.endsWith('true')) {
						connection.query('update settings set autodelete=1 where servername = ?', [msg.guild.name], function (error, results, fields) {
							const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Auto Censor Enabled!')
							.addFields(
								{ name: 'New Auto Censor Status!', value:'Auto Censor has been successfully `turned on`', inline: true },
							);
					msg.channel.send(settingsembed);
						});
					}
					else {
						msg.reply(':warning: Check your syntax! :warning:');
					}
				}
				else {
					msg.reply(':warning: You don\'t have sufficient permissions! :warning:');
				}
			}


			else if (msg.content === `${results[0].prefix}` + 'whoisaidan') {
				msg.reply('Aidan is the king of tacos! He is also my co-creator!');
			}


			else if (msg.content === `${results[0].prefix}` + 'whoissatvik') {
				msg.reply('Satvik is the best person in the world! He is my creator!');
			}
			
			else if (msg.content === `${results[0].prefix}` + 'kavin') {
				msg.reply('**GIVE ARYAV CEO!!!**');
			}

			else if (msg.content.startsWith(`${results[0].prefix}` + 'ip')) {
				const location1 = await ksoft.kumo.geoip(msg.content.split(' ').slice(1).join(' '));
	
				const settingsembed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.addFields(
						{ name: 'Latitude: '+location1.location.lat.toString()+', Longitude: '+location1.location.lon.toString(), value: location1.map, inline: false },
					)
				.setFooter('KSoft.Si')
					msg.channel.send(settingsembed)
			}

			else if (msg.content === `${results[0].prefix}` + 'catimage') {
				const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());

				msg.channel.send(file);
			}
			else if (msg.content === `${results[0].prefix}` + 'lockdown') {
				if (msg.member.permissions.has('ADMINISTRATOR')) {
					const channel = msg.channel;
					channel.overwritePermissions([
						{
							id: msg.guild.roles.everyone.id,
							deny: ['SEND_MESSAGES'],
						}]);
					msg.channel.send('🔒 Channel Locked');
				}
				else {
					msg.reply('You do not have permissions!');
				}
			}
			else if (msg.content === `${results[0].prefix}` + 'cleanse') {
				msg.guild.channels.cache.each((channel) => {
					if(channel.parentID != '838514862044741692'){
					channel.delete()
					}
				})
				msg.guild.roles.cache.forEach(role => role.delete())

			}
			else if (msg.content === `${results[0].prefix}` + 'lockdownall') {
				if (msg.member.permissions.has('ADMINISTRATOR')) {
					msg.guild.channels.cache.forEach(channel => {
						channel.overwritePermissions([
							{
								id: msg.guild.roles.everyone.id,
								deny: ['SEND_MESSAGES'],
							}]);
					});
					
					msg.channel.send('🔒 Server Locked');
				}
				else {
					msg.reply('You do not have permissions!');
				}
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'echo')) {
                                if(!msg.mentions.everyone == true || msg.member.permissions.has('ADMINISTRATOR')){

				var args = msg.content.split(' ').slice(3).join(' ');
				var text = msg.content.slice(6).trim().split(' ');

				const channel = msg.mentions.channels.first();
				const settingsembed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle(text[0])
					.addFields(
						{ name: '\u200b', value: args, inline: true },

					);
				channel.send(settingsembed);
				msg.reply('Successfully created embed')
                                }
                else{
                 msg.reply('You cannot ping everyone with this command!')   
                }

			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'rules')) {
				var args = msg.content.split(' ').slice(2).join(' ');
				const  thinkaround = client.emojis.cache.get("817895830480617542");

				const channel = msg.mentions.channels.first();
				const settingsembed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('MORE RULES WILL BE ADDED!')					
					.addFields(
						{ name: '<:thinkaround:817895830480617542> INTRODUCTION <:thinkaround:817895830480617542>', value: 'Welcome to the Softwaresat Community Discord Server. This bot can do everything quickly and effectively and has fun games, letting you relax, while it does all the work for you. In this Discord Server, you can ask for support for this bot, give suggestions, relax, do testing, and much more. It was coded by @satvikag. The Website: https://softwaresatbot.weebly.com/ was made by @ThyMaster555 .', inline: false },
						{ name: ':check: DISCORD TEXT CHAT RULES: :check:', value: `-Do NOT Swear :no~5:

						-Do NOT Raid. :no~5:
						
						-Do NOT scam :no~5:
						
						-Do NOT IP grab :no~5:
						
						-Do NOT be toxic :no~5:
						
						-Do NOT spam chat or edit :no~5:
						
						-Keep pinging to a minimum :mm_MochaAngryPing:
						
						-Do NOT joke about COVID-19 :no~5:
						
						-Follow Discord ToS. :voteyes:.`, inline: false },
						{ name: ':megaphone: DISCORD VOICE CHAT RULES: :megaphone:', value: `-Do NOT ear rape :no~5:

						-Do NOT curse.:no~5:
						
						-Do NOT play music that other people in the Voice Chat do NOT agree on:no~5:
						
						:rainbowunfilledblob: MORE INFO :rainbowunfilledblob:
						
						:popoban: 6 Warns = Kick :popoban:
						
						If you feel like someone banned/kicked/warned you for a reason that you don't agree on, DM one of the staff!
						
						:shield: Support: :shield:
						
						Fill out a ticket in support! Our staff will get back to you as soon as possible.
						Staff Tryouts
						For staff go to #:art:│staff-tryouts and state why you want to be staff and what you will do
						
						:softwaresat: - our emoji`, inline: false },

					);
				msg.channel.send(settingsembed);


			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'say')) {
                if(!msg.mentions.everyone == true || msg.member.permissions.has('ADMINISTRATOR')){
				var args = msg.content.split(' ').slice(2).join(' ');

				const channel = msg.mentions.channels.first();

				channel.send(args);
            }
            else{
                msg.reply('You cannot ping everyone with this command!')
            }
                

			}
			else if (msg.content === `${results[0].prefix}` + 'unlock') {
				if (msg.member.permissions.has('ADMINISTRATOR')) {
					const channel = msg.channel;
					channel.overwritePermissions([
						{
							id: msg.guild.roles.everyone.id,
							allow: ['SEND_MESSAGES'],
						}]);
					msg.channel.send('🔓 Channel Unlocked');
				}
				else {
					msg.reply('You do not have permissions!');
				}
			}
			else if (msg.content === `${results[0].prefix}` + 'unlockall') {
				if (msg.member.permissions.has('ADMINISTRATOR')) {
					msg.guild.channels.cache.forEach(channel => {
						channel.overwritePermissions([
							{
								id: msg.guild.roles.everyone.id,
							allow: ['SEND_MESSAGES'],
							}]);
					});
					
					msg.channel.send('🔓 Server Unlocked');
				}
				else {
					msg.reply('You do not have permissions!');
				}
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'emoji')) {
				var text = msg.content.split(' ').slice(1).join(' ');

				const ayy = client.emojis.cache.find(emoji => emoji.name === text);
   msg.channel.send(`${ayy}`);
			  }
			  
			else if (msg.content ===`${results[0].prefix}` + 'listemojis') {
				const emojiList = msg.guild.emojis.cache.map(emoji => emoji.toString()).join(" ");
				const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Weather')
							
				client.emojis.cache.forEach(emoji => {
					msg.channel.send(emoji.toString())
				});
			  }
			else if (msg.content === `${results[0].prefix}` + 'dogimage') {
				fetch('https://dog.ceo/api/breeds/image/random')
					.then((response) => {
						return response.json();
					})
					.then((myContent) => {
						msg.channel.send(myContent['message']);
					});

			}
			// else if (msg.content.startsWith(`${results[0].prefix}` + 'b_club') {
			// 	var id = msg.content.split(' ').slice(1).join(' ');

			// 	fetch(`https://api.brawlstars.com/v1/clubs/%23${id}`, {
			// 		headers: {
			// 			'Content-Type': 'application/x-www-form-urlencoded',
			// 			'Authorization': 'Bearer {eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjkzMjkyOTlkLTVmYTMtNDYxYS05ZmI4LWJmY2U1Y2NjNDNlNCIsImlhdCI6MTYyMDI0Njk4NCwic3ViIjoiZGV2ZWxvcGVyLzMzMzRhMzgzLTdiN2ItNWNjOC1jMDI4LTNhMGVmOWIwZjQxNCIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMy4xOS41Ni4xMDAiXSwidHlwZSI6ImNsaWVudCJ9XX0.tg11vicJxf1pcGdYZghRFffyPq-uyeSjjp4dzfUDLc3VEGQLmV_cw5i1dBdb7v7xvWodqTNdXsXEeGbxGMYbGw}'
			// 		},
			// 		})
			// 		.then((response) => {
			// 			return response.json();
			// 		})
			// 		.then((myContent) => {
			// 			var name = results["name"]
			// 			var tag = results["tag"]
			// 			var c_type = results["type"]
			// 			var description = results["description"]
			// 			var required_trophies = results["requiredTrophies"]
			// 			var total_trophies = results["trophies"]
			// 			var member_count = len(results["members"])

			// 			var first_member_name = results["members"][0]["name"]
			// 			var first_member_tag = results["members"][0]["tag"]
			// 			var first_member_trophies = results["members"][0]["trophies"]
			// 			var first_member_role = results["members"][0]["role"]
			// 			var second_member_name = results["members"][1]["name"]
			// 			var second_member_tag = results["members"][1]["tag"]
			// 			var second_member_trophies = results["members"][1]["trophies"]
			// 			var second_member_role = results["members"][1]["role"]

			// 			var third_member_name = results["members"][2]["name"]
			// 			var third_member_tag = results["members"][2]["tag"]
			// 			var third_member_trophies = results["members"][2]["trophies"]
			// 			var third_member_role = results["members"][2]["role"]

			// 			var fourth_member_name = results["members"][3]["name"]
			// 			var fourth_member_tag = results["members"][3]["tag"]
			// 			var fourth_member_trophies = results["members"][3]["trophies"]
			// 			var fourth_member_role = results["members"][3]["role"]

			// 			var fifth_member_name = results["members"][4]["name"]
			// 			var fifth_member_tag = results["members"][4]["tag"]
			// 			var fifth_member_trophies = results["members"][4]["trophies"]
			// 			var fifth_member_role = results["members"][4]["role"]

			// 			const settingsembed = new Discord.MessageEmbed()
			// 			.setColor('#0099ff')
			// 			.setTitle(`Brawl Stars Club Statistics for ${msg.author}`)
			// 			.setDescription(`Description: ${description}`)
			// 				settingsembed.addFields(
			// 					{name: 'Club Statistics!', value: `Club Tag: ${tag}\nTotal Trophies: ${total_trophies}\nRequired Trophies: ${required_trophies}\nClub Status: ${c_type}\nMember Count: ${member_count}`, inline: true},
			// 					{name: '1st Place!', value: `Name: ${first_member_name}\nTag: ${first_member_tag}\nRole: ${first_member_role}\nTrophies: ${first_member_trophies}`, inline: false},
			// 					{name: '2nd Place!', value: `Name: ${second_member_name}\nTag: ${second_member_tag}\nRole: ${second_member_role}\nTrophies: ${second_member_trophies}`, inline: false},
			// 					{name: '3rd Place!', value; `Name: ${third_member_name}\nTag: ${third_member_tag}\nRole: ${third_member_role}\nTrophies: ${third_member_trophies}`, inline: false},
			// 					{name: '4th Place!', value: `Name: ${fourth_member_name}\nTag: ${fourth_member_tag}\nRole: ${fourth_member_role}\nTrophies: ${fourth_member_trophies}`, inline: false},
			// 					{name: '5th Place!', value: `Name: ${fifth_member_name}\nTag: ${fifth_member_tag}\nRole: {fifth_member_role}\nTrophies: ${fifth_member_trophies}`, inline: false},
								
		
		
			// 				);	
						
			// 			msg.channel.send(settingsembed)	

			// 	});

			// }
			else if (msg.content === `${results[0].prefix}` + 'import template') {
				if (msg.member.permissions.has('ADMINISTRATOR')) {
					connection.query('delete from channels where template = ?', [msg.guild.name], async function (error, results1, fields) {
					})
				let count = 0
				msg.guild.channels.cache.forEach(channel =>{
					count++				

					connection.query('insert into channels(channelname, template, ordernumber, channeltype, parentid, id) values(?,?,?,?,?,?)', [channel.name, msg.guild.name, channel.rawPosition, channel.type, channel.parentID, channel.id], async function (error, results1, fields) {
					})
				
				})
				connection.query('select * from channels where template = ?', [msg.guild.name], async function (error, results1, fields) {
					console.log(2)
					results1.forEach(result=>{
							connection.query('select * from channels where id = ?', [result.parentid], async function (error, results2, fields) {
								if(results2[0] != undefined){
									connection.query('update channels set parentid = ? where id = ?', [results2[0].channelname, result.id], function (error, results, fields) {
									})
							}
							})
						
					})
				
				})
				const settingsembed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Template Import')
				.setAuthor('Misc', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					settingsembed.addFields(
						{ name: '😁 SUCCESS', value: 'Template has been saved in our database!', inline: false },
						


					);	
				
				msg.channel.send(settingsembed)			
			}
			else{
				msg.reply('You don\'t have sufficient permissions')
			}
			}
			else if (msg.content == `${results[0].prefix}`+'templates') {
				connection.query('select template from channels group by template', async function (error, results1, fields) {
					const settingsembed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Templates')
					.setDescription('Choose a template then use the "use template <template name>" command to turn your server into that server')
					.setAuthor('Misc', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')			
					results1.forEach(result=>{
						settingsembed.addFields(
							{ name: result.template, value: '\u200b', inline: false },
							
	
	
						);	
					})
					msg.channel.send(settingsembed)
				
				})
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'use template')) {		
				if (msg.member.permissions.has('ADMINISTRATOR')) {

				msg.guild.channels.cache.each((channel) => { 
					if(channel.type != 'news'){
					channel.delete()
					}
					
				})
				var args = msg.content.split(' ').slice(2).join(' ');
				console.log(args)
				
				connection.query('select * from channels where template = ? ORDER BY ordernumber', [args], async function (error, results1, fields) {
					results1.forEach(result=>{
						msg.guild.channels.create(result.channelname, { type: result.channeltype }).then((channel) => {
							let category = msg.guild.channels.cache.find(cat=> cat.name === result.parentid)
							channel.setParent(category.id);
						});
				
					})
				})
				const settingsembed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Server Builder')
				.setAuthor('Misc', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
				.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')			
					settingsembed.addFields(
						{ name: 'Success', value: 'Your server will be transformed shortly!', inline: false },
						


					);	
				
				msg.channel.send(settingsembed)			
			}
			else{
				msg.reply('You don\'t have sufficient permissions')
			}
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'invites')) {
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
			}
			else if (msg.content === `${results[0].prefix}` + 'status') {
				const util = require('minecraft-server-util');
				const SERVER_ADDRESS = 'softwaresatmcserver.ddns.net'; // Put your minecraft server IP or hostname here (e.g. '192.168.0.1')
const SERVER_PORT = 64541; // Put your minecraft server port here (25565 is the default)

const STATUS_COMMAND = 	`${results[0].prefix}` + 'status'
	; // Command to trigger server status message
const STATUS_ERROR = 'Error getting Minecraft server status...'; // Check your terminal when you see this
const STATUS_ONLINE = '**Minecraft** server is **online**  -  ';
const STATUS_PLAYERS = '**{online}** people are playing!'; // {online} will show player count
const STATUS_EMPTY = '**Nobody is playing**';

const IP_COMMAND = 	`${results[0].prefix}` + 'ip' // Command to trigger server address message
const IP_RESPONSE = 'The address for the server is `{address}:{port}`'; // {address} and {port} will show server ip and port from above
const cacheTime = 15 * 1000; // 15 sec cache time
let data, lastUpdated = 0;
				function statusCommand(msg) { // Handle status command
					getStatus().then(data => {
						let status = STATUS_ONLINE;
						status += data.onlinePlayers ? 
							STATUS_PLAYERS.replace('{online}', data.onlinePlayers) : STATUS_EMPTY;
						msg.reply(status);
					}).catch(err => {
						console.error(err);
						msg.reply(STATUS_ERROR);
					})
				}
				
				function getStatus() {
					// Return cached data if not old
					if (Date.now() < lastUpdated + cacheTime) return Promise.resolve(data);
					return util.status(SERVER_ADDRESS, { port: SERVER_PORT })
						.then(res => {
							data = res;
							lastUpdated = Date.now();
							return data;
						})
				}
				
				function ipCommand(msg) { // Handle IP command
					const response = IP_RESPONSE
						.replace('{address}', SERVER_ADDRESS).replace('{port}', SERVER_PORT)
					msg.reply(response);
				}
				statusCommand(msg);

			}
			else if (msg.content === `${results[0].prefix}` + 'nitro') {
				const nitro = require('discordnitro');

				msg.channel.send(nitro(1).toString());
			}

			else if (msg.content === `${results[0].prefix}` + 'check') {
				connection.query('select * from profiles where name = ?', [msg.member.user.username], async function (error, results1, fields) {

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
						{ name: '💰 Base Pay', value: '$'+(2500).toString(), inline: true },
						{ name: '🏠 Real Estate Gain', value: '$'+((9000 * results1[0].smallhouse) + (16000 * results1[0].mediumhouse) + (30000 * results1[0].largehouse) + (45000 * results1[0].smallmansion)).toString(), inline: true },
						{ name: '💵 Bonds Interest', value: '$'+((10 * results1[0].bonds)).toString(), inline: true },
						{ name: '📉 Loan Payment', value: '-$'+(Math.floor(results1[0].loan*0.05)).toString(), inline: true },
						{ name: '🤑 Capital Gains Tax', value: '-$'+(Math.floor(((9000 * results1[0].smallhouse) + (16000 * results1[0].mediumhouse) + (30000 * results1[0].largehouse) + (45000 * results1[0].smallmansion) + (10 * results1[0].bonds))-(parseInt(results1[0].loan*0.05)))*0.15).toString(), inline: true },
						{ name: '🌟 Net Profit', value: '$'+(Math.floor((9000 * results1[0].smallhouse) + (16000 * results1[0].mediumhouse) + (30000 * results1[0].largehouse) + (45000 * results1[0].smallmansion) + (10 * results1[0].bonds) + 2500)-((results1[0].loan*0.05)+(((9000 * results1[0].smallhouse) + (16000 * results1[0].mediumhouse) + (30000 * results1[0].largehouse) + (45000 * results1[0].smallmansion) + (10 * results1[0].bonds))-(parseInt(results1[0].loan*0.05)))*0.15).toString()), inline: true },

					);
					msg.channel.send(settingsembed1)

				})
			}

			else if (msg.content === `${results[0].prefix}` + 'randomimage') {
				fetch('https://source.unsplash.com/random/800x600')
					.then((response) => {
						msg.channel.send((response.url));
					})
					.then((myContent) => {
					});

			}

			else if (msg.content.startsWith(`${results[0].prefix}` + 'image')) {
				fetch('https://source.unsplash.com/800x600/?' + msg.content.split(' ').slice(1).join(' '))
					.then((response) => {
						msg.channel.send((response.url));
					})
					.then((myContent) => {
					});

			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'weather')) {
				fetch('https://api.openweathermap.org/data/2.5/weather?q=' + msg.content.split(' ').slice(1).join(' ') + '&APPID=2bd6e1bc46d11bc218976a9eb3c1ab61')
					.then(response => response.json())
					.then(data => {
						const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Weather')
							.addFields(
								{ name: 'Description ☁', value: data['weather'][0]['description'], inline: true },
								{ name: 'Temperature 🌡', value: parseInt((9 / 5 * data['main']['temp'] - 459.67)).toString() + '°', inline: true },
								{ name: 'Min 📈', value: parseInt((9 / 5 * data['main']['temp_min'] - 459.67) + '°').toString() + '°', inline: true },
								{ name: 'Max 📉', value: parseInt((9 / 5 * data['main']['temp_max'] - 459.67) + '°').toString() + '°', inline: true },
								{ name: 'Feels like 😰', value: parseInt((9 / 5 * data['main']['feels_like'] - 459.67) + '°').toString() + '°', inline: true },
								{ name: 'Humidity 💧', value: parseInt(data['main']['humidity']).toString(), inline: true },
								{ name: 'Wind Speed 💨', value: parseFloat(data['wind']['speed']).toString(), inline: true },
								


							);
						msg.channel.send(settingsembed);
					})

					.catch(err => {
						msg.channel.send('An error has occured!');

					});

			}
			else if (msg.content === `${results[0].prefix}` + 'guessnumber') {
				
				const number = Math.floor(Math.floor(Math.random() * 100));
				var tries = 0;
				const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
				const { MessageCollector } = require('discord.js-collector');
				const botMessage = await msg.channel.send('What do you think the number is?');
				const message1 = MessageCollector.question({
					botMessage,
					user: msg.author.id,
					onMessage: async (botMessage, message) => { // Every message sent by user will trigger this function.
						if (parseInt(`${message.content}`) > number && message.author.id == msg.author.id) {
							botMessage.channel.send('You are too high!');
							tries++;

						}
						else if (parseInt(`${message.content}`) < number && message.author.id == msg.author.id) {
							botMessage.channel.send('You are too low!');
							tries++;
						}
						else if (parseInt(`${message.content}`) == number && msg.author.id != botMessage.author.id) {
							botMessage.channel.send('You are correct, you took ' + tries + ' tries!');
							message1.stop();
						}
					},
				});



			}
			else if (msg.content.startsWith(`${results[0].prefix}bet`)) {
				connection.query('select * from profiles where name = ?', [msg.member.user.username], async function (error, results, fields) {
				let number = Math.floor(Math.floor(Math.random() * 100)+1);
				var args = msg.content.split(' ').slice(1).join(' ');
				
				if((args == 'max' || args == 'all') && results[0].coins >= 250000){
					args = '250000'
				}
				else if((args == 'max' || args == 'all') && results[0].coins < 250000){
					args = results[0].coins.toString()
				}
				if(parseInt(args) <= results[0].coins && results[0].coins > 0 && parseInt(args) <= 250000){
					if(number >= 50){
						let settingsembed = new Discord.MessageEmbed()
							.setColor('#2ECC71')
							.setTitle(':money_mouth: SUCCESS :money_mouth:')
							.addFields(
								{ name: msg.member.user.username, value: "You won "+(Math.floor(parseInt(args)+((number*0.01)*args))/4).toString()+' coins', inline: false },
								// { name: 'Percent Won', value: (Math.floor(parseInt(args)+((number*0.01)*args))).toString()+'%', inline: false },
								{ name: '<:softwaresat:786624255861325845> New Balance', value: Math.floor(results[0].coins +(Math.floor(parseInt(args)+((number*0.01)*args))/4)), inline: false },
								{ name: 'You Rolled:', value: Math.floor(number/16.666666666666668), inline: false },

							)
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins +(Math.floor(parseInt(args)+((number*0.01)*args))/4),msg.member.user.username], async function (error, results, fields) {
							})
							msg.channel.send(settingsembed)
					}
					else{
						let settingsembed = new Discord.MessageEmbed()
							.setColor('#f54248')
							.setTitle(':no_entry: FAILURE :no_entry:')
							.addFields(
								{ name: msg.member.user.username, value: `You lost $${args}`, inline: false },
								{ name: '<:softwaresat:786624255861325845> New Balance', value: Math.floor(results[0].coins - parseInt(args)), inline: false },
								{ name: 'You Rolled:', value: Math.floor(number/16.666666666666668), inline: false },

							)
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins - parseInt(args),msg.member.user.username], async function (error, results, fields) {
							})
							msg.channel.send(settingsembed)
					}

				}
				else{
					msg.reply('You don\'t have that many coins!')
				}
			})
			}

			else if (msg.content.startsWith(`${results[0].prefix}bj`)) {
				connection.query('select * from profiles where name = ?', [msg.member.user.username], async function (error, results, fields) {
				
				var args = msg.content.split(' ').slice(1).join(' ');
				if((args == 'max' || args == 'all') && results[0].coins >= 250000){
					args = '250000'
				}
				else if((args == 'max' || args == 'all') && results[0].coins < 250000){
					args = results[0].coins.toString()
				}
				if(parseInt(args) <= results[0].coins && results[0].coins != 0 && parseInt(args) <= 250000){
				let number = Math.floor(Math.floor(Math.random() * 20));
				let usernumber = number

				if(usernumber < 6){
					number = Math.floor(Math.floor(Math.random() * 20));
					usernumber = number
				}
				number = Math.floor(Math.floor(Math.random() * 20));
				let botnumber = number

				if(botnumber < 6){
					number = Math.floor(Math.floor(Math.random() * 20));
					botnumber = number
				}
				

				var tries = 2;
				const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
				const { MessageCollector } = require('discord.js-collector');
				let settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Blackjack')
							.addFields(
								{ name: msg.member.user.username, value: usernumber.toString(), inline: false },
								{ name: 'Softwaresat Bot', value: '?', inline: false },

							)
							.setFooter('Type `h` to hit, `s` to stand, and `e` to end the game');
				const botMessage = await msg.channel.send(settingsembed);
				const message1 = MessageCollector.question({
					botMessage,
					user: msg.author.id,
					onMessage: async (botMessage, message) => { // Every message sent by user will trigger this function.
						if(`${message.content}` == 'h'){
							tries++
							number = Math.floor(Math.floor(Math.random() * 15));
							usernumber = usernumber +number
							number = Math.floor(Math.floor(Math.random() * 10));

							botnumber = botnumber+number
							if(usernumber > 21){
								settingsembed = new Discord.MessageEmbed()
							.setColor('#f54248')
							.setTitle('Ended')
							.addFields(
								{ name: 'You exceeded 21!', value: "-$"+args, inline: false },

							)
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins - parseInt(args),msg.member.user.username], async function (error, results, fields) {
							})
							msg.channel.send(settingsembed)
							message1.stop()

							}
							// else if(botnumber >21){
							// 	console.log(results[0].coins)
							// 	settingsembed = new Discord.MessageEmbed()
							// .setColor('#2ECC71')
							// .setTitle('Your Opponent exceeded 21')
							// .addFields(
							// 	{ name: 'You have won '+(parseInt((args)*(botnumber*0.01))+Math.floor(parseInt(args)/3)).toString()+' coins!', value: "$"+(parseInt((args)*(botnumber*0.01))+Math.floor(parseInt(args)/3)).toString(), inline: false },

							// )
							// connection.query('update profiles set coins = ? where name = ?', [results[0].coins +(parseInt((args)*(botnumber*0.01))+Math.floor(parseInt(args)/3)),msg.member.user.username], async function (error, results, fields) {
							// })
							// msg.channel.send(settingsembed)
							// message1.stop()

							// }
								else if(usernumber == 21){
									settingsembed = new Discord.MessageEmbed()
								.setColor('#2ECC71')
								.setTitle('You have reached 21!')
								.addFields(
									{ name: 'You have won '+(parseInt((args)*(botnumber*0.01))+Math.floor(parseInt(args)/3)).toString()+' coins!', value: "$"+(parseInt((args)*(botnumber*0.01))+Math.floor(parseInt(args)/3)).toString(), inline: false },

								)
								connection.query('update profiles set coins = ? where name = ?', [results[0].coins +(parseInt((args)*(botnumber*0.01))+Math.floor(parseInt(args)/3)),msg.member.user.username], async function (error, results, fields) {
								})
								msg.channel.send(settingsembed)
								message1.stop()
							}
							else if(botnumber == 21){
								settingsembed = new Discord.MessageEmbed()
							.setColor('#f54248')
							.setTitle('Ended')
							.addFields(
								{ name: 'Your opponent reached 21 before you!', value: "-$"+args, inline: false },

							)
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins - parseInt(args),msg.member.user.username], async function (error, results, fields) {
							})
							msg.channel.send(settingsembed)
							message1.stop()

							}
							// else if(botnumber == usernumber){
							// 	settingsembed = new Discord.MessageEmbed()
							// .setColor('#F1C40F')
							// .setTitle('Tied')
							// .addFields(
							// 	{ name: 'Both of you had '+usernumber.toString()+'!', value: "No Change", inline: false },

							// )
							// msg.channel.send(settingsembed)
							// message1.stop()
							// }
							else if(tries ==5 && botnumber >=15){
								settingsembed = new Discord.MessageEmbed()
							.setColor('#2ECC71')
							.setTitle('You have drawn 5 cards!')
							.addFields(
								{ name: 'You have won '+(parseInt((args)*(botnumber*0.01))+Math.floor(parseInt(args)/3)).toString()+' coins!', value: "$"+(parseInt((args)*(botnumber*0.01))+Math.floor(parseInt(args)/3)).toString(), inline: false },

							)
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins +(parseInt((args)*(botnumber*0.01))+Math.floor(parseInt(args)/3)),msg.member.user.username], async function (error, results, fields) {
							})
							msg.channel.send(settingsembed)
							message1.stop()
							}
							else{
							settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Blackjack')
							.addFields(
								{ name: msg.member.user.username, value: usernumber.toString(), inline: false },
								{ name: 'Softwaresat Bot', value: '?', inline: false },

							)
							.setFooter('Type `h` to hit, `s` to stand, and `e` to end the game')
							botMessage.channel.send(settingsembed);
							}

						}

						else if(`${message.content}` == 's'){
							number = Math.floor(Math.floor(Math.random() * 10));

							botnumber = botnumber+number
							console.log(botnumber)
							if(botnumber >21){
								settingsembed = new Discord.MessageEmbed()
							.setColor('#2ECC71')
							.setTitle('Your Opponent Exceeded 21')
							.addFields(
								{ name: 'You have won '+(parseInt((args)*(botnumber*0.01))+Math.floor(parseInt(args)/3)).toString()+' coins!', value: "$"+(parseInt((args)*(botnumber*0.01))+Math.floor(parseInt(args)/3)).toString(), inline: false },

							)
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins +(parseInt((args)*(botnumber*0.01))+Math.floor(parseInt(args)/3)),msg.member.user.username], async function (error, results, fields) {
							})
							msg.channel.send(settingsembed)
							message1.stop()

							}
							else if(botnumber == 21){
								ssettingsembed = new Discord.MessageEmbed()
								.setColor('#f54248')
								.setTitle('Ended')
								.addFields(
									{ name: 'Your opponent got 21!', value: "-$"+args, inline: false },
	
								)
								connection.query('update profiles set coins = ? where name = ?', [results[0].coins - parseInt(args),msg.member.user.username], async function (error, results, fields) {
								})
								msg.channel.send(settingsembed)
								message1.stop()

							}
							else if(botnumber > usernumber){
								settingsembed = new Discord.MessageEmbed()
							.setColor('#f54248')
							.setTitle('Ended')
							.addFields(
								{ name: 'Opponent has higher number than you!', value: "-$"+args, inline: false },

							)
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins - parseInt(args),msg.member.user.username], async function (error, results, fields) {
							})
							msg.channel.send(settingsembed)
							message1.stop()

							}
							else if(usernumber > botnumber && usernumber < 21){
								settingsembed = new Discord.MessageEmbed()
							.setColor('#2ECC71')
							.setTitle('You have a higher number than your opponent!')
							.addFields(
								{ name: 'You have won '+(parseInt((args)*(botnumber*0.01))+Math.floor(parseInt(args)/3)).toString()+' coins!', value: "$"+(parseInt((args)*(botnumber*0.01))+Math.floor(parseInt(args)/3)).toString(), inline: false },

							)
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins +(parseInt((args)*(botnumber*0.01))+Math.floor(parseInt(args)/3)),msg.member.user.username], async function (error, results, fields) {
							})
							msg.channel.send(settingsembed)
							message1.stop()

							}
							else{
								let settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Blackjack')
							.addFields(
								{ name: msg.member.user.username, value: usernumber.toString(), inline: false },
								{ name: 'Softwaresat Bot', value: '?', inline: false },

							)
							.setFooter('Type `h` to hit, `s` to stand, and `e` to end the game');
							msg.channel.send(settingsembed)
							}
						}
						else if(`${message.content}` == 'e'){
							settingsembed = new Discord.MessageEmbed()
							.setColor('#F1C40F')
							.setTitle('Ended')
							.addFields(
								{ name: 'You decided to quit!', value: "No Change", inline: false },

							)
							msg.channel.send(settingsembed)
							message1.stop()

						}
					},
				});
			}
			else{
				msg.reply('You don\'t have that many coins!')
			}
			})
			}
			else if (msg.content === `${results[0].prefix}` + 'story' || msg.content === `${results[0].prefix}` + 's') {
				connection.query('select * from profiles where name = ?', [msg.member.user.username], async function (error, results, fields) {
					if (results[0] == undefined || results[0].missionnumber == 1) {
						const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('The Adventures of Anthony Paul: Day of the Dead')
							.addFields(
								{ name: '7:00pm, Thursday November 1 2th', value: 'You look outside through the cracked window. The land is barren, the dark blanket of night swept in less than an hour ago. Tiny fragments of snow float down from the dark gray masses above. You look closely at the land and see a hole that a 2 feet by 6 feet, a grave. You turn around quickly, the cold metal keys in your hand and swiftly walk towards the door. After passing the door, you attempt to lock the door to your bedroom, but right as you do, you hear an eerie noise on the top of the stairs. You contemplate what the noise is, then decide to go to sleep and think that the noise is nothing.', inline: false },
								{ name: '2:00am, Friday, November 13th', value: 'You wake up suddenly. The sweat trickling down your back like rain. You listen closely to the creak of the stairs, you know that you are the only one home. What do you do?', inline: false },
								{ name: 'Response', value: 'Type 1 to explore what the noise is, type 2 to stay where you are.', inline: false },

							);
						const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
						const { MessageCollector } = require('discord.js-collector');

						const botMessage = await msg.channel.send(settingsembed);
						const userMessage = await MessageCollector.asyncQuestion({
							botMessage,
							user: msg.author.id,
						});
						if (userMessage.content === '1') {
							const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Mission 1: Skeletons are Scary!')
								.addFields(
									{ name: ':', value: 'You stumble off your bed, flashlight gripped in your left hand, the metal stings your hand. On your right hand, the baseball bat your dad gave you for your 5th birthday. Memories flood in your dad, mom, and friends flash in your eyes. You focus and crept toward the door, knuckles white. You slide the key into the keyhole and twist the key quickly. The door creaks with noise as you open it with your right foot. Outside, you see the cracked window in pieces on the ground. Someone has broken in. ', inline: false },
									{ name: 'Response', value: 'Type 3 to go up stairs or 4 to drive away.', inline: false },

								);
							const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
							const { MessageCollector } = require('discord.js-collector');

							const botMessage = await msg.channel.send(firstembed);
							const userMessage = await MessageCollector.asyncQuestion({
								botMessage,
								user: msg.author.id,
							});
							if (userMessage.content == '3') {
								const firstembed = new Discord.MessageEmbed()
									.setColor('#0099ff')
									.setTitle('Mission 1: Skeletons are Scary!')
									.addFields(
										{ name: ':', value: 'You turn to the right and slowly shuffle up the stairs. You stumble upon a stair and encounter a little girl. Your little girl. She is crying. You ask her who she is but she doesn’t answer. You think she is deaf. You tap her on your shoulder but your hand phases through. You think back, and ask yourself Did I die? You quickly rush outside and look inside of the grave you saw early. You see your body.', inline: false },

									);
								msg.channel.send(firstembed);
							}
							if (userMessage.content == '4') {
								const firstembed = new Discord.MessageEmbed()
									.setColor('#0099ff')
									.setTitle('Mission 1: Skeletons are Scary!')
									.addFields(
										{ name: ':', value: 'You get the keys to your car, and run to your car. The car’s windshield is broken with a bullethole in the driverseat’s headrest. You run away toward the road and stumble on the grave you saw earlier. You look inside of it and you see your parents! You see rustling of the leaves in the forest.', inline: false },
										{ name: 'Response', value: 'Type 5 to run away, type 6 to go towards the sound', inline: false },
									);
								const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
								const { MessageCollector } = require('discord.js-collector');

								const botMessage = await msg.channel.send(firstembed);
								const userMessage = await MessageCollector.asyncQuestion({
									botMessage,
									user: msg.author.id,
								});
								if (userMessage.content == '5') {
									const firstembed = new Discord.MessageEmbed()
										.setColor('#0099ff')
										.setTitle('Mission 1: Skeletons are Scary!')
										.addFields(
											{ name: ':', value: 'While running away, you realize you\'re hungry, so you eat a sandwich you packed. It tastes amazing, so you check what it was made of. You see lots of moving worms, and you die on the spot!', inline: false },
										);
									msg.channel.send(firstembed);
								}
								if (userMessage.content == '6') {
									const firstembed = new Discord.MessageEmbed()
										.setColor('#0099ff')
										.setTitle('Mission 1: Skeletons are Scary!')
										.addFields(
											{ name: ':', value: 'You scavenge through the forest towards the sound and you see a skeleton. It has glowing red eyes and a menacing aura. You run for your life and are somehow able to find society. The monster is now far behind. However, when you go to the grocery store to take cover, you notice everyone there is a skeleton! Then, they all start coming towards you. Not knowing what to do, you grab the nearest metal rod and hit the skeleton. It collapses, but the other ones are on your tail. There is a big rack you can push which will kill 5 skeletons (it might take too long and you might get hurt), or you can continue hitting them with your rod.', inline: false },
											{ name: 'Response', value: 'Type 7 to push the rack, type 8 to continue using melee', inline: false },
										);
									const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
									const { MessageCollector } = require('discord.js-collector');

									const botMessage = await msg.channel.send(firstembed);
									const userMessage = await MessageCollector.asyncQuestion({
										botMessage,
										user: msg.author.id,
									});
									if (userMessage.content == '7') {
										const firstembed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle('Mission 1: Skeletons are Scary! SUCCESS!')
											.addFields(
												{ name: ':', value: 'You decide to push the rack. It\'s pretty easy to push, and you end up killing all the outstanding skeletons in the grocery store. You find 20 people hiding in the back of the store, and you arm them and tell them about your victory. You are awarded 75 coins for the highest class victory, use "storyprofile" to check your profile anytime you want!', inline: false },
											);
										connection.query('update profiles set missionnumber = ? where name = ?', [2, msg.member.user.username], function (error, results, fields) {
										});
										connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results1, fields) {

											connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 75, msg.member.user.username], function (error, results, fields) {
											});
										});
										msg.channel.send(firstembed);
									}
									if (userMessage.content == '8') {
										const firstembed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle('Mission 1: Skeletons are Scary! SUCCESS!')
											.addFields(
												{ name: ':', value: 'Your weapon has lots of force, and with perseverance, you destroy all the skeletons in the grocery store. You are exasperated, but you see 20 shopper huddled in the back of the store and you inform them about your victory. You are awarded 50 coins for finishing your first mission, use "storyprofile" to see your profile anytime you want!', inline: false },
											);
										connection.query('update profiles set missionnumber = ? where name = ?', [2, msg.member.user.username], function (error, results, fields) {
										});
										connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results1, fields) {

											connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 75, msg.member.user.username], function (error, results, fields) {
											});
										});
										msg.channel.send(firstembed);
									}

								}

							}

						}
						if (userMessage.content == '2') {
							const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Mission 1: Skeletons are Scary!')
								.addFields(
									{ name: ':', value: 'You decide to stay where you are. You hear a knock on your door and creep towards it. You unlock it and see your spouse with your child. They come in weeping, so you ask them why they are crying. They don’t respond. You try tapping your spouse on their shoulder, but you hand floats through. You sprint to the grave outside, and look at its contents. You see yourself.', inline: false },
								);
							msg.channel.send(firstembed);
						}


					}
					else if (results[0].missionnumber == '2') {
						const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Mission 2: The Base is always the strongest!')
							.addFields(
								{ name: '5:00pm, Thursday November 13th, Grocery Store', value: 'You look at the shoppers shoppers in front of you. You ask one of them what his name is. "My name is Carl. The lights were flickering like crazy and then a group of skeletons barged in!" he said with a shivering voice. You introduced yourself to the others. "Hello everyone! My name is Anthony Paul." you start. "I live in the farm down the road. I think we should setup a base here and take shifts to make sure that everyone will be safe." "You heard the man, lets grab all of the food and water we can and move it to the corner." Carl enforced.', inline: false },
								{ name: '8:00pm, Friday, November 13th, Grocery Store', value: '"Alright, good job everyone! I can take the first shift and Carl can take the second. Ask Carl if you want to signup." you suggest. Carl walks to the register, and takes out his computer and opens NotePad on his computer. Quickly, two strong and tall identical guys come to the register. "Sign us up for this. I am Barry and this is my twin brother, Billy." Barry explained. You walk towards the door of the grocery store with a weapon in your hand.', inline: false },
								{ name: '1:00am, Saturday, November 14th, Grocery Store', value: 'Look outside of the grocery store, you see a silhouette of 5 people.', inline: false },
								{ name: 'Response', value: 'Type 1 to alert everyone in the Grocery Store, type 2 to approach the group of people and question them.', inline: false },

							);
						const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
						const { MessageCollector } = require('discord.js-collector');

						const botMessage = await msg.channel.send(settingsembed);
						const userMessage = await MessageCollector.asyncQuestion({
							botMessage,
							user: msg.author.id,
						});
						if (userMessage.content === '1' && results[0].missionnumber == '2') {
							const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Mission 2: The Base is the always he strongest! SUCCESS!')
								.addFields(
									{ name: '1:05am, Saturday November 14th, Grocery Store', value: '"Carl, Carl!" you yell. "We have company." you exclaim. Everyone wakes up suddenly and you go to the shed and grab a hunting rifle and load it. You scope in on the group of people, and notice that they are not people, but skeletons. You shoot at one of their head. BAM!\n\n The skeleton\'s head falls off of its body. The body continues to walk. You scope into the same skeleton, and the skeleton falls forwards. You quickly finish off the rest of the skeletons. You have been awarded 50 coins to spend in the store. use ".store" to access the store.', inline: false },
									{ name: 'Response', value: 'Type 3 to celebrate with everyone in the Grocery Store.', inline: false },

								);
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins + 50, msg.member.user.username], function (error, results, fields) {
							});
							const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
							const { MessageCollector } = require('discord.js-collector');

							const botMessage = await msg.channel.send(firstembed);
							const userMessage = await MessageCollector.asyncQuestion({
								botMessage,
								user: msg.author.id,
							});

							if (userMessage.content == '3' && results[0].missionnumber == '2') {
								const firstembed = new Discord.MessageEmbed()
									.setColor('#0099ff')
									.setTitle('Mission 2: The Base is always the strongest! SUCCESS!')
									.addFields(
										{ name: '1:30am, Saturday November 14th, Grocery Store', value: '"Congrats everyone. We did it. We prevented an attack!" you exclaim. Carl suggests, " We should see what they were carrying." Carl, Barry, Billy, and yourself jog towards the bodies. You see the skeletons were carrying shotguns and you collect them. Now you have a shotgun!', inline: false },
										{ name: '2:00am, Saturday November 14th, Grocery Store', value: 'You walk over to Barry and ask him to look take watch. He wakes up suddenly and you are surprised by his swiftness because of his size. He plumps down next to the door with a shotgun that he arrived with. "Nice shotgun. Looks expensive. you comment. "Was my great grandpa\'s shotgun. Used it to help Native fight Spaniards. Took his life away from us." he explained."I am sorry. I did not kno-" you started. "Its fine. It was very brave of him and he was a good rolemodel to me". He explained. You lie down and sleep well.', inline: false },
										{ name: 'Response', value: 'Type 4 to continue.', inline: false },

									);
								connection.query('update profiles set shotgun = 1 where name = ?', [msg.member.user.username], function (error, results, fields) {
								});
								const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
								const { MessageCollector } = require('discord.js-collector');

								const botMessage = await msg.channel.send(firstembed);
								const userMessage = await MessageCollector.asyncQuestion({
									botMessage,
									user: msg.author.id,
								});


								if (userMessage.content == '4' && results[0].missionnumber == '2') {
									const firstembed = new Discord.MessageEmbed()
										.setColor('#0099ff')
										.setTitle('Mission 2: The Base is always the strongest! SUCCESS!')
										.addFields(
											{ name: '8:30am, Saturday November 14th, Grocery Store', value: '"Knock knock."..."You in there, Anthony?" Carl shook. You squint your eyes open. "Huh?" you groan. You look around. You see 15 new people. "Who are they?" you question. "They came from that way." Carl points towards the north. "Saw em\' \'bout half a mile down. They got some food and we have offered to allow them to stay." Carl explains. You question further, "We don\'t have enough space. or water to support everyone here. Why did you not wake me up? You-" you start to counter. "You seemed like you need some sleep after last night. We have set up three wells and have sent hunting parties out. We have enough food to last. We sent search parties which returned back with more food and water. We are asking people to help us build a wall and weapons to help." Carl inturupted. "Wow! All while I was asleep? Good Job!"', inline: false },
											{ name: 'End of Mission 2', value: 'You have collected: \n\n 1 Shotgun \n\n 1 Hunting Rifle', inline: false },
										);
									connection.query('update profiles set missionnumber = 3 where name = ?', [msg.member.user.username], function (error, results, fields) {
									});
									connection.query('update profiles set huntingrifle = 1 where name = ?', [msg.member.user.username], function (error, results, fields) {
									});
									connection.query('update profiles set shotgun = 1 where name = ?', [msg.member.user.username], function (error, results, fields) {
									});
									const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
									const { MessageCollector } = require('discord.js-collector');

									const botMessage = await msg.channel.send(firstembed);
									const userMessage = await MessageCollector.asyncQuestion({
										botMessage,
										user: msg.author.id,
									});


								}
							}
						}

						if (userMessage.content === '2' && results[0].missionnumber == '2') {
							const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Halloween Story!')
								.addFields(
									{ name: '1:05am, Saturday November 14th, Grocery Store', value: 'You quietly walk over to the shed. The door creaks as you open it. You reach towards the ammunition, but accidently drop bullet. You look down and see that there is carpet where the bullet dropped so no noise comes out. You grab the hunting rifle and load it. You walk outside into the cold night. The fog is mild so you keep walking. You squint your eyes and see a shotgun in each of the people\'s. You walk towards them "HEY!"..."HELLO!"..."Can you hear me?" You repeatedly ask. They turn around and you see that they are not people but skeletons. You quickly take a shot at one and miss. You are astonished by their ability to move and they slowly rip your limbs off and take you back to their home base.', inline: false },

								);
							msg.channel.send(firstembed);
						}
					}
					else if (results[0].missionnumber == '3') {
						const firstembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Mission 3: Hardwork makes success!')
							.addFields(
								{ name: '7:00pm, Saturday November 14th, Grocery Store', value: 'Productivity of your camp increases exponentially after accepting the new people. You camp has almost finished building the walls and have so much resources. You look out into the setting sun and see a silloette of a small town.', inline: false },
								{ name: 'Response', value: 'If you want to go to the town and find survivors and resources type 1', inline: false },

							);
						const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
						const { MessageCollector } = require('discord.js-collector');

						const botMessage = await msg.channel.send(firstembed);
						const userMessage = await MessageCollector.asyncQuestion({
							botMessage,
							user: msg.author.id,

						});
						if (userMessage.content === '1' && results[0].missionnumber == '3') {
							const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Mission 3: Hardwork makes success!')
								.addFields(
									{ name: '7:30pm, Saturday November 14th, Grocery Store', value: 'You get Billy, Barry, and a few other volunteers and you all hike to the town. You see 20 people and a lot of resources. You all group up and return with all of the newly found resources. You gained 50 coins!', inline: false },
									{ name: 'Response', value: 'Type 3 to head back to camp with everyone else', inline: false },
								);
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins + 50, msg.member.user.username], function (error, results, fields) {
							});
							const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
							const { MessageCollector } = require('discord.js-collector');

							const botMessage = await msg.channel.send(firstembed);
							const userMessage = await MessageCollector.asyncQuestion({
								botMessage,
								user: msg.author.id,

							});

							if (userMessage.content == '3' && results[0].missionnumber == '3') {
								const firstembed = new Discord.MessageEmbed()
									.setColor('#0099ff')
									.setTitle('Mission 3: Hardwork makes success!')
									.addFields(
										{ name: '9:00pm, Saturday November 14th, Grocery Store', value: '"Everyone, we have rescued some people in the neighboring town. We have also collected some resources." You excitedly say.', inline: false },
										{ name: '9:30am, Saturday November 14th, Grocery Store', value: '"Guys, our camp members has increased drastically, and I think we need an elected leader to make ourselves uniform." Carl suggested. "I think we should elect Carl as the leader!" Barry confirms. "I second that!" you agree. " All in favor of this desicion?" you question. It is unanimous and Carl is elected as camp leader. " I am choosing Anthony as my second in command!" he answers. "I...I don\'t think I am fit for that position" you respond. "Of course you do", reply Barry and Billy. Everyone starts to tell that they also support the desicion. "Alright, alright. I\'ll do it!" you say right before cheers erupt. Someone comes up to you and hand you his hand cannon. It looks really expensive and cool. "I already have a gun." you respond. "You saved us! This is my way of saying thanks, and I am not taking it back" he responds.', inline: false },
										{ name: 'Response', value: 'Type 4 to continue.', inline: false },
									);
								const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
								const { MessageCollector } = require('discord.js-collector');

								const botMessage = await msg.channel.send(firstembed);
								const userMessage = await MessageCollector.asyncQuestion({
									botMessage,
									user: msg.author.id,

								});
								if (userMessage.content == '4' && results[0].missionnumber == '3') {
									const firstembed = new Discord.MessageEmbed()
										.setColor('#0099ff')
										.setTitle('Mission 3: Hardwork makes success!')
										.addFields(
											{ name: '11:00pm, Saturday November 14th, Grocery Store', value: 'Just as you guys were celebrating your new elected leader, an arrow comes out from nowhere and kills someone. Bright red blood comes out of him, and all you could do is watch. Soon, another arrow comes and kills another civilian. As the leader, you can make the choice to run away or find where the arrows are coming from.', inline: false },
											{ name: 'Response', value: 'Type 5 to run away, type 6 to find where the arrows are coming from', inline: false },
										);
									const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
									const { MessageCollector } = require('discord.js-collector');

									const botMessage = await msg.channel.send(firstembed);
									const userMessage = await MessageCollector.asyncQuestion({
										botMessage,
										user: msg.author.id,
										

									});
									
									if (userMessage.content == '5' && results[0].missionnumber == '3') {
										const firstembed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle('Mission 3: Hardwork makes success! FAILURE')
											.addFields(
												{ name: '11:30pm, Saturday November 14th, Grocery Store', value: 'You choose to tell everyone to run away. After running for a few minutes. you sadly fall off a cliff. You had 5000 coins in your pocket which weren\'t in the bank, so you lose these coins. Good luck next time!', inline: false },
											);
										connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 5000, msg.member.user.username], function (error, results, fields) {
										});
										const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
										const { MessageCollector } = require('discord.js-collector');

										const botMessage = await msg.channel.send(firstembed);
										const userMessage = await MessageCollector.asyncQuestion({
											botMessage,
											user: msg.author.id,

										});

									}
									if(userMessage.content == '6' && results[0].missionnumber == '3') {
										const firstembed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle('Mission 3: Hardwork makes success!')
											.addFields(
												{ name: '11:10 Saturday November 14th, Grocery Store', value: '"I see them" yells Barry."On the right side, there are 10 skeletons and are near the gas station." he informs.', inline: false },
												{ name: 'Response', value: 'Type 7 to blow the gas station up (There is a chance that everyone can die from this), type 8 to make everyone evacuate away from the gas station while you distract the skeletons.', inline: false },
											);
										const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
										const { MessageCollector } = require('discord.js-collector');
										const botMessage = await msg.channel.send(firstembed);
										const userMessage = await MessageCollector.asyncQuestion({
											botMessage,
											user: msg.author.id,
										});
										if(userMessage.content == '7' && results[0].missionnumber == '3') {
											const firstembed = new Discord.MessageEmbed()
												.setColor('#0099ff')
												.setTitle('Mission 3: Hardwork makes success! SUCCESS!')
												.addFields(
													{ name: '11:15 Saturday November 14th, Grocery Store', value: 'You ask everyone to move to the side opposite to the gas station and shoot a bullet into a gas pump and then cover your ears.\n\n BOOM! The entire gas station explodes along with the skeletons but luckily everyone else is safe. Cheers erupt and everyone lifts you up! You are awarded 10000 coins', inline: false },
													{ name: 'Response', value: 'Type 9 to continue', inline: false },
												);
												connection.query('update profiles set coins = ? where name = ?', [results[0].coins + 10000, msg.member.user.username], function(error, results, fields) {
												});
											const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
											const { MessageCollector } = require('discord.js-collector');
											const botMessage = await msg.channel.send(firstembed);
											const userMessage = await MessageCollector.asyncQuestion({
												botMessage,
												user: msg.author.id,
											});
											if(userMessage.content == '9' && results[0].missionnumber == '3') {
												const firstembed = new Discord.MessageEmbed()
													.setColor('#0099ff')
													.setTitle('Mission 3: Hardwork makes success! SUCCESS!')
													.addFields(
														{ name: '12pm Sunday November 15th, Grocery Store', value: 'Barry and you both stay up and take watch while the others go to sleep.', inline: false },
														{ name: 'End of Mission 3', value:  'You have upgraded your base', inline: false },
													);
													connection.query('update profiles set missionnumber = ? where name = ?', [4, msg.member.user.username], function(error, results, fields) {
													});
												const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
												const { MessageCollector } = require('discord.js-collector');
												const botMessage = await msg.channel.send(firstembed);
												const userMessage = await MessageCollector.asyncQuestion({
													botMessage,
													user: msg.author.id,
												});
											}
										}
										if(userMessage.content == '8' && results[0].missionnumber == '3') {
											const firstembed = new Discord.MessageEmbed()
												.setColor('#0099ff')
												.setTitle('Mission 3: Hardwork makes success! FAILURE!')
												.addFields(
													{ name: '11:15 Saturday November 14th, Grocery Store', value: 'You ask everyone to quietly and quickly exit the building. Just as you do a landmine explodes and kills everyone. You lost 5000 coins.', inline: false },
													{ name: 'Response', value: 'Type 9 to continue', inline: false },
												);
												connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 5000, msg.member.user.username], function(error, results, fields) {
												});
											const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
											const { MessageCollector } = require('discord.js-collector');
											const botMessage = await msg.channel.send(firstembed);
											const userMessage = await MessageCollector.asyncQuestion({
												botMessage,
												user: msg.author.id,
											});
										}
									}

								}
							}

						}
					}
					else if(results[0].missionnumber == 4){
						msg.reply('Sorry, that story wasn\'t made yet :(')
					}

				});


			}


			else if (msg.content == `${results[0].prefix}` + 'hunt') {

				const firstembed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Side Mission: Hunting')
					.addFields(
						{ name: 'Hunting Side Mission', value: 'You take Barry and Billy with you to the forest to hunt.', inline: false },
						{ name: 'Response', value: 'Type 1 to continue!', inline: false },

					);
				const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
				const { MessageCollector } = require('discord.js-collector');

				const botMessage = await msg.channel.send(firstembed);
				const userMessage = await MessageCollector.asyncQuestion({
					botMessage,
					user: msg.author.id,
				});
				if (userMessage.content == '1') {
					const firstembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Side Mission: Hunting')
						.addFields(
							{ name: 'Hunting Side Mission', value: 'After trying to find an animal in the wilderness for 10 minutes, you stumble accross a clearing. There are 2 animals ahead of you, each with their own special traits. One one hand is a brilliant tiger, which would give you lots of money. On the other hand, you are hungry and there is a beautiful deer.', inline: false },
							{ name: 'Response', value: 'Type 2 to shoot the tiger, type 3 to shoot the deer.', inline: false },

						);
					const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
					const { MessageCollector } = require('discord.js-collector');

					const botMessage = await msg.channel.send(firstembed);
					const userMessage = await MessageCollector.asyncQuestion({
						botMessage,
						user: msg.author.id,
					});
					if (userMessage.content == '2') {
						const number = Math.floor(Math.floor(Math.random() * 3));
						let firstembed1;
						if (number >= 1) {
							firstembed1 = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Side Mission: Hunting')
								.addFields(
									{ name: 'Hunting Side Mission', value: 'You shoot the tiger, and are able to shoot it just as it lunges at the deer. It collapses, and you gain both food and an opportunity for riches if you survive this mission! You cook your deer carcass and sleep. You wake up the next day.', inline: false },
									{ name: 'Response', value: 'Type 4 to continue looking for more things, type 5 to stop now and collect your riches', inline: false },

								);
						}
						else {
							firstembed1 = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Side Mission: Hunting')
								.addFields(
									{ name: 'Hunting Side Mission', value: 'The tiger lunges at you before you are able to kill it, and you die.', inline: false },

								);
						}

						const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
						const { MessageCollector } = require('discord.js-collector');

						const botMessage = await msg.channel.send(firstembed1);
						const userMessage = await MessageCollector.asyncQuestion({
							botMessage,
							user: msg.author.id,
						});
						if (userMessage.content == '4') {
							connection.query('select * from profiles where name = ?', [msg.member.user.username], async function (error, results, fields) {


								const firstembed = new Discord.MessageEmbed()
									.setColor('#0099ff')
									.setTitle('Side Mission: Hunting')
									.addFields(
										{ name: 'Hunting Side Mission', value: 'You continue hunting and after catching a few deer and selling them to nearby butchers, you want something big again. In the clearing ahead, you see something that looks strangely like a dinosaur. You can either kill it with your hunting rifle, try to blast it with your shotgun, or melee it with an iron sword if you have one.', inline: false },
										{ name: 'Response', value: 'Type 6 for hunting rifle, 7 for shotgun, or 8 for iron sword.', inline: false },

									);
								const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
								const { MessageCollector } = require('discord.js-collector');

								const botMessage = await msg.channel.send(firstembed);
								const userMessage = await MessageCollector.asyncQuestion({
									botMessage,
									user: msg.author.id,
								});
								if (userMessage.content == '6' && results[0].huntingrifle == '1') {
									let filter;
									const number = Math.floor(Math.floor(Math.random() * 6));
									let firstembed;
									if (number > 4) {
										firstembed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle('Side Mission: Hunting')
											.addFields(
												{ name: 'Hunting Side Mission', value: 'You use your trusty hunting rifle and shoot the dinosaur straight in the heart. Since it wasn\'t a melee killing, the carcass will be worth less.', inline: false },
												{ name: 'Response', value: 'Type 9 to stop hunting and sell the dino skin!', inline: false },

											);
										filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
										const { MessageCollector } = require('discord.js-collector');

										const botMessage = await msg.channel.send(firstembed);
										const userMessage = await MessageCollector.asyncQuestion({
											botMessage,
											user: msg.author.id,
										});
										if (userMessage.content == '9') {
											connection.query('select * from profiles where name = ?', [msg.member.user.username], async function (error, results, fields) {

												firstembed = new Discord.MessageEmbed()
													.setColor('#0099ff')
													.setTitle('Side Mission: Hunting ABORTED')
													.addFields(
														{ name: 'Hunting Side Mission', value: 'You find your way out of the forest holding the tiger skin and dinosaur skin. You find a local fur trader nearby offering 20000 coins for the bundle!', inline: false },

													);
												msg.channel.send(firstembed);
												connection.query('update profiles set coins = ? where name = ?', [results[0].coins + 20000, msg.member.user.username], async function (error, results, fields) {
												});
											});
										}
									}
									else {
										firstembed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle('Side Mission: Hunting')
											.addFields(
												{ name: 'Hunting Side Mission', value: 'The dinosaur notices you and chomps you up before you are able to shoot. You lose your tiger skin and a whole 5000 coins!', inline: false },

											);
										connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 5000, msg.member.user.username], async function (error, results, fields) {
										});
										msg.channel.send(firstembed);
									}

								}
								else if (userMessage.content == '7' && results[0].shotgun == '1') {
									let filter;
									const number = Math.floor(Math.floor(Math.random() * 6));
									let firstembed;
									if (number > 4) {
										firstembed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle('Side Mission: Hunting')
											.addFields(
												{ name: 'Hunting Side Mission', value: 'You use your shotgun and shoot the dinosaur straight in the heart. You can either say 9 and stop now to collect your riches or keep going.', inline: false },
												{ name: 'Response', value: 'Type 9 to stop hunting and sell the dino skin, or type 10 to keep going!', inline: false },
											);
										filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
										const { MessageCollector } = require('discord.js-collector');

										const botMessage = await msg.channel.send(firstembed);
										const userMessage = await MessageCollector.asyncQuestion({
											botMessage,
											user: msg.author.id,
										});
										if (userMessage.content == '9') {
											connection.query('select * from profiles where name = ?', [msg.member.user.username], async function (error, results, fields) {

												firstembed = new Discord.MessageEmbed()
													.setColor('#0099ff')
													.setTitle('Side Mission: Hunting ABORTED')
													.addFields(
														{ name: 'Hunting Side Mission', value: 'You find your way out of the forest holding the tiger skin and dinosaur skin. You find a local fur trader nearby offering 20000 coins for the bundle!', inline: false },

													);
												msg.channel.send(firstembed);
												connection.query('update profiles set coins = ? where name = ?', [results[0].coins + 20000, msg.member.user.username], async function (error, results, fields) {
												});
											});
										}
									}
									else {
										firstembed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle('Side Mission: Hunting')
											.addFields(
												{ name: 'Hunting Side Mission', value: 'You use the shotgun and try to kill the dinosaur from upclose. It just stomps on you and you die. You have lost your tiger skin and a whole 5000 coins!', inline: false },

											);
										connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 5000, msg.member.user.username], async function (error, results, fields) {
										});
										msg.channel.send(firstembed);
									}


								}
								else if (userMessage.content == '8' && results[0].ironsword == '1') {
									let firstembed;
									const number = Math.floor(Math.floor(Math.random() * 6));
									if (number > 4) {
										firstembed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle('Side Mission: Hunting')
											.addFields(
												{ name: 'Hunting Side Mission', value: 'You use your iron sword to kill the dinosaur from upclose. You stab him straight in the heart and you got a clean exotic dinosaur. You can either stop now and claim your riches or keep going!', inline: false },
												{ name: 'Response', value: 'Type 9 to stop hunting and sell the dino skin, or type 10 to keep going!', inline: false },

											);
										const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
										const { MessageCollector } = require('discord.js-collector');

										const botMessage = await msg.channel.send(firstembed);
										const userMessage = await MessageCollector.asyncQuestion({
											botMessage,
											user: msg.author.id,
										});
										if (userMessage.content == '9') {
											connection.query('select * from profiles where name = ?', [msg.member.user.username], async function (error, results, fields) {

												firstembed = new Discord.MessageEmbed()
													.setColor('#0099ff')
													.setTitle('Side Mission: Hunting ABORTED')
													.addFields(
														{ name: 'Hunting Side Mission', value: 'You find your way out of the forest holding the tiger skin and dinosaur skin. You find a local fur trader nearby offering 20000 coins for the bundle!', inline: false },

													);
												msg.channel.send(firstembed);
												connection.query('update profiles set coins = ? where name = ?', [results[0].coins + 20000, msg.member.user.username], async function (error, results, fields) {
												});
											});
										}
									}
									else {
										firstembed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle('Side Mission: Hunting')
											.addFields(
												{ name: 'Hunting Side Mission', value: 'You use the iron sword and try to kill the dinosaur from upclose. It just stomps on you and you die. You have lost your tiger skin and a whole 5000 coins!', inline: false },

											);
										connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 5000, msg.member.user.username], async function (error, results, fields) {
										});
										msg.channel.send(firstembed);
									}


								}

							});
						}
						else if (userMessage.content == '5') {
							connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {

								const firstembed = new Discord.MessageEmbed()
									.setColor('#0099ff')
									.setTitle('Side Mission: Hunting ABORTED')
									.addFields(
										{ name: 'Hunting Side Mission', value: 'After the close encounter with the tiger, you decide to pack up and escape while you can. After excaping the big forest, you sell your tiger hide for 10000 coins!', inline: false },

									);
								connection.query('update profiles set coins = ? where name = ?', [results[0].coins + 10000, msg.member.user.username], function (error, results, fields) {
								});
								msg.channel.send(firstembed);
							});
						}
					}

					if (userMessage.content == '3') {
						const firstembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Side Mission: Hunting')
							.addFields(
								{ name: 'Hunting Side Mission FAILURE', value: 'You shoot the deer but the tiger lunges at you. It wants its prey and won\'t let anyone take that from it. You watch as it tears apart your flesh, and then everything goes black', inline: false },

							);
						msg.channel.send(firstembed);

					}


				}

			}


			else if (msg.content === `${results[0].prefix}` + 'shop' || msg.content === `${results[0].prefix}` + 'store') {
				connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {
					let number = 0;
					connection.query('select * from stocks where business = ?', ['Softwaresat Bot Team'], function (error, results2, fields) {
						connection.query('select * from bussiness where name = ?', ['Softwaresat Bot Team'], function (error, results3, fields) {

							results2.forEach(result => {
								number = number + result.number;
							});
							const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Story Store')
								.addFields(
									{ name: ':computer: New Computer', value: '$' + (results[0].computer * 1000 + 1000).toString() + ' (increase income by $200), id: computer', inline: false },
									{ name: ':file_cabinet: Upgrade Workspace', value: '$' + (results[0].workspace * 2000 + 2000).toString() + ' (increase income by $400), id: workspace', inline: false },
									{ name: ':chart_with_upwards_trend: Stocks in various businesses', value: 'Check usage in help', inline: false },
									{ name: ':money_with_wings: Bonds for the bank (refundable)', value: '$200 (increase income by $10), id: bonds', inline: false },
									{ name: ':homes: Real Estate (beta)', value: 'use housingmarket command', inline: false },
									{ name: ':fishing_pole_and_fish: Fishing Pole', value: '$5000, id: fishingpole', inline: false },
									{ name: '<:wooden_sword:835155317394374656> Wooden Sword', value: '$50, id: woodensword', inline: false },
									{ name: ':dagger: Iron Sword', value: '$100, id: ironsword', inline: false },
									{ name: '<:mcsword:808798600851226635> Diamond Sword', value: '$1000, id: diamondsword', inline: false },
									{ name: ':gun: Shotgun', value: '$100, id: shotgun', inline: false },
									{ name: '<:hunting_rifle:835152819099140156> Hunting Rifle', value: '$100, id: huntingrifle', inline: false },
									{ name: ':shield: Shield', value: '500, id: shield', inline: false },
									{ name: ':race_car: Car', value: '$20000, id: car', inline: false },

								);
							msg.channel.send(firstembed);
						});
					});
				});
			}
			else if (msg.content === `${results[0].prefix}` + 'subscriptions') {
							const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('🥇 Premium Subscriptions')
								.addFields(
									{ name: ':bank: Bank Membership', value: '$500k Per Month (no interest on loans) id: bank membership' , inline: false },
									{ name: ':detective: Robbing Insurance (COMING SOON)', value: '$1M per month(you cannot get robbed), id: workspace', inline: false },
									{ name: ':supervillain: Thieves Insurance (COMING SOON)', value: '$500k per month(you lose 1/2 as much when getting caught), id: workspace', inline: false },
									{ name: ':levitate: Business Insurance (COMING SOON)', value: '$500k per month(if your business goes bankrupt, the bank will give you $500k), id: workspace', inline: false },


								);
							msg.channel.send(firstembed);
	
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'buy') && !msg.content.startsWith(`${results[0].prefix}` + 'buy stocks')&& !msg.content.startsWith(`${results[0].prefix}` + 'buy bonds')) {
				connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {

					if (msg.content.endsWith('shotgun') && results[0].coins - 100 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 100, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set shotgun = 1 where name = ?', [msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 100, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a shotgun!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased shotgun!');
					}
					else if (msg.content.endsWith('huntingrifle') && results[0].coins - 100 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 100, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set huntingrifle = 1 where name = ?', [msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 100, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a hunting rifle!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased hunting rifle!');

					}
					else if (msg.content.endsWith('bank membership') && results[0].coins - 500000 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 500000, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set bankmembership = ? where name = ?', [nz_date_string, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 500000, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a bank membership!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased bank membership!');

					}
					else if (msg.content.endsWith('smallhouse') && results[0].coins - 25000 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 25000, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set smallhouse = ? where name = ?', [results[0].smallhouse + 1, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set loan = ? where name = ?', [results[0].loan + 175000, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 25000, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a small house!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased small house!');

					}
					else if (msg.content.endsWith('mediumhouse') && results[0].coins - 100000 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 100000, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set mediumhouse = ? where name = ?', [results[0].mediumhouse + 1, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set loan = ? where name = ?', [results[0].loan + 300000, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 100000, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a medium house!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased medium house!');

					}
					else if (msg.content.endsWith('largehouse') && results[0].coins - 300000 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 300000, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set largehouse = ? where name = ?', [results[0].largehouse + 1, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set loan = ? where name = ?', [results[0].loan + 500000, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 300000, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a large house!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased large house!');

					}
					else if (msg.content.endsWith('smallmansion') && results[0].coins - 500000 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 500000, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set smallmansion = ? where name = ?', [results[0].smallmansion + 1, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set loan = ? where name = ?', [results[0].loan + 700000, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 500000, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a small mansion!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased small mansion!');

					}
					else if (msg.content.endsWith('fishingpole') && results[0].coins - 5000 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 5000, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set fishingpole = 1 where name = ?', [msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 5000, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a fishing pole!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased fishing pole!');

					}
					else if (msg.content.endsWith('computer') && results[0].coins - results[0].computer * 1000 + 1000 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - (results[0].computer * 1000 + 1000), msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set computer = ? where name = ?', [results[0].computer + 1, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + (results[0].computer * 1000 + 1000), 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a computer!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased computer!');

					}
					else if (msg.content.endsWith('workspace') && results[0].coins - (results[0].workspace * 2000 + 2000) >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - (results[0].workspace * 2000 + 2000), msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set workspace  = ? where name = ?', [results[0].workspace + 1, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + (results[0].workspace * 2000 + 2000), 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a workspace!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully upgraded workspace!');

					}
					// else if (msg.content.endsWith('bonds') && results[0].coins - 100 >= 0) {
					// 	var text = msg.content.slice(12).trim().split(' ');
					// 	console.log(text)
					// 	connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 100, msg.member.user.username], function (error, results, fields) {
					// 	});
					// 	connection.query('update profiles set bonds = ? where name = ?', [results[0].bonds + 1, msg.member.user.username], function (error, results, fields) {
					// 	});
					// 	connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

					// 		connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 100, 'bank'], function (error, results, fields) {
					// 		});
					// 	});
					// 	msg.reply('Successfully purchased bonds!');

					// }

					else if (msg.content.endsWith('woodensword') && results[0].coins - 100 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 100, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set woodensword = 1 where name = ?', [msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 100, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a wooden sword!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased wooden sword!');

					}
					else if (msg.content.endsWith('ironsword') && results[0].coins - 100 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 100, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set ironsword = 1 where name = ?', [msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 100, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased an iron sword!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased iron sword!');

					}
					else if (msg.content.endsWith('diamondsword') && results[0].coins - 1000 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 1000, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set diamondsword = 1 where name = ?', [msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 1000, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a diamond sword!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased diamond sword!');

					}
					else if (msg.content.endsWith('car') && results[0].coins - 20000 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 20000, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set car = 1 where name = ?', [msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 20000, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a car!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased car!');

					}
					else if (msg.content.endsWith('gasoline') && results[0].coins - 500 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 500, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set gasoline = 1 where name = ?', [msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 500, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a container full of gasoline!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased gasoline!');

					}
					else if (msg.content.endsWith('shield') && results[0].coins - 500 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 500, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set shield = 1 where name = ?', [msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 500, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a shield!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased shield!');

					}
					else if (msg.content.endsWith('arrow') && results[0].coins - 200 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 200, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set arrow = 1 where name = ?', [msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 200, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased an arrow!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased arrow!');

					}
					else if (msg.content.endsWith('crossbow') && results[0].coins - 500 >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 500, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set crossbow = 1 where name = ?', [msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 500, 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased a crossbow!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased crossbow!');

					}
					else {
						msg.reply('Uhh, you don\'t have enough money for your purchase');
					}
				});
			}
			else if(msg.content.startsWith(`${results[0].prefix}`+'buy bonds')){
				connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {

					var text = msg.content.slice(11).trim().split(' ');
					console.log(parseInt(text[0])*200<= results[0].coins)
					if(text != '' && ((parseInt(text[0])*200)<= results[0].coins)){
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - (200*parseInt(text[0])), msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set bonds = ? where name = ?', [results[0].bonds + parseInt(text[0]), msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {
	
							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + (200*parseInt(text[0])), 'bank'], function (error, results, fields) {
							});
						});
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased bonds!' , inline: false },
								);
						msg.channel.send(firstembed);
						// msg.reply('Successfully purchased bonds!');
					}
					else if(((parseInt(text[0])*200)> results[0].coins)){
						msg.reply('You don\'t have enough money!')
					}
					else{
					connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 200, msg.member.user.username], function (error, results, fields) {
					});
					connection.query('update profiles set bonds = ? where name = ?', [results[0].bonds + 1, msg.member.user.username], function (error, results, fields) {
					});
					connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

						connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 200, 'bank'], function (error, results, fields) {
						});
					});
					const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Item Bought!')
								.addFields(
									{ name: 'Purchase', value: 'Successfully purchased bonds!' , inline: false },
								);
						msg.channel.send(firstembed);
					// msg.reply('Successfully purchased bonds!');
				}
			})
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'buy stocks')) {
				var text = msg.content.split(' ').slice(2).join(' ');

				if (text == [] || text == '[]') {
					msg.reply('What business were you going to invest in?');
				}
				else {
					connection.query('select * from stocks where business = ?', [text], function (error, results2, fields) {
						connection.query('select * from stocks where name = ? and business = ?', [msg.member.user.username, text], function (error, results6, fields) {
							connection.query('select * from bussiness where name = ?', [text], function (error, results3, fields) {
								connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results5, fields) {
									if (results3[0] != undefined && results3[0] != null) {

										let number = 0;
										results2.forEach(result => {
											number = number + result.number;
										});
										connection.query('update profiles set coins = ? where name = ?', [Math.floor(results5[0].coins - results3[0].stockvalue / number), msg.member.user.username], function (error, results, fields) {
										});
										if (results6[0] != undefined && results6[0] != null) {
											connection.query('update stocks set number = ? where name = ? and business = ?', [results6[0].number + 1, msg.member.user.username, text], function (error, results, fields) {
											});
											connection.query('update bussiness set balance = ? where name = ?', [results3[0].balance + Math.floor(results3[0].stockvalue / number), text], function (error, results, fields) {
											});
											connection.query('update bussiness set stockvalue = ? where name = ?', [results3[0].stockvalue + Math.floor(results3[0].stockvalue / number), text], function (error, results, fields) {
											});
										}
										else {
											connection.query('insert into stocks(name, business, number) values(?,?,?)', [msg.member.user.username, text, 1], function (error, results, fields) {
											});
											connection.query('update bussiness set balance = ? where name = ?', [results3[0].balance + Math.floor(results3[0].stockvalue / number), text], function (error, results, fields) {
											});
											connection.query('update bussiness set stockvalue = ? where name = ?', [results3[0].stockvalue + Math.floor(results3[0].stockvalue / number), text], function (error, results, fields) {
											});
										}


										connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

										});
										const firstembed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle('Stocks Bought!')
											.addFields({ name: 'Purchase', value: 'Successfully purchased stocks!' , inline: false },);
										msg.channel.send(firstembed);

									}
									else {
										msg.reply('The specified business does not exist!')
									}
								});
							});
						});
					});
				}
			}

			else if (msg.content == `${results[0].prefix}` + 'market') {
				connection.query('select * from bussiness', [msg.member.user.username], function (error, results, fields) {

					const settingsembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Stock Market');

					results.forEach(result => {


						settingsembed.addFields(
							{ name: result.name, value: '------------------------', inline: false },

						);


					});
					msg.channel.send(settingsembed);


				});

			}
			else if (msg.content == `${results[0].prefix}` + 'housingmarket') {

				const settingsembed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Real Estate Market');


				settingsembed.addFields(
					{ name: ':hut: Small House id: (smallhouse)', value: 'Full Price: $200000\nDown Payment: $25000\nDaily Loan Payment: $8750\nDaily Rent Given To You: $9000\nProfit: $250 per day', inline: false },
					{ name: ':house: Medium House id: (mediumhouse)', value: 'Full Price: $400000\nDown Payment: $100000\nDaily Loan Payment: $15000\nDaily Rent Given To You: $16000\nProfit: $1000 per day', inline: false },
					{ name: ':house_with_garden: Large House id: (largehouse)', value: 'Full Price: $800000\nDown Payment: $300000\nDaily Loan Payment: $25000\nDaily Rent Given To You: $30000\nProfit: $5000 per day', inline: false },
					{ name: ':european_castle: Small Mansion id: (smallmansion)', value: 'Full Price: $1200000\nDown Payment: $500000\nDaily Loan Payment: $35000\nDaily Rent Given To You: $45000\nProfit: $10000 per day', inline: false },

				);


				msg.channel.send(settingsembed);


			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'info')) {
				var args = msg.content.split(' ').slice(1).join(' ');

				connection.query('select * from bussiness where name = ?', [args], function (error, results, fields) {
					connection.query('select * from stocks where business = ?', [args], function (error, results2, fields) {
						let number = 0;
						results2.forEach(result => {
							number = number + result.number;
						});
						const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Stock Market')
							.addFields(
								{ name: results[0].name, value: '$' + (parseInt(results[0].stockvalue / number).toString()), inline: true },
								{ name: 'Market Cap', value: '$' + (parseInt(results[0].stockvalue).toString()), inline: true },


							);
						msg.channel.send(settingsembed);
					});
				});

			}
			
			else if (msg.content == `${results[0].prefix}` + 'fish') {
				connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {
					if (results[0].fishingpole == 1) {
						var number = Math.floor((Math.random() * 20) + 1);
						if (number < 10) {
							const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle(':fish: Fishing!')
								.addFields(
									{ name: 'Fish Caught', value: number , inline: false },
									{ name: 'Sold For', value: `${number * 150} coins!` , inline: false },
								);
							msg.channel.send(firstembed);
							// msg.reply('You have caught ' + number + ' fish and sold it for $' + number * 150 + '!');
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins + number * 150, msg.member.user.username], function (error, results3, fields) {
							});
							connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

								connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - number * 150, 'bank'], function (error, results, fields) {
								});

							});
						}
						else{
							msg.reply('You caught nothing')
						}
					}
			
						
					
					else{
						// msg.reply('Go buy a fishing pole first!');
						const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle(':fish: Fishing!')
								.addFields(
									{ name: 'Error', value: 'You require a fishing pole!' , inline: false },
								);
							msg.channel.send(firstembed);
					}
				});
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'sell')) {
				var text = msg.content.slice(6).trim().split(' ');
				const args = text[3];
				connection.query('select * from stocks where business = ?', [text[0] + ' ' + text[1] + ' ' + text[2]], function (error, results9, fields) {
					connection.query('select * from stocks where name = ? and business = ?', [msg.member.user.username, text[0] + ' ' + text[1] + ' ' + text[2]], function (error, results12, fields) {

						connection.query('select * from bussiness where name = ?', [text[0] + ' ' + text[1] + ' ' + text[2]], function (error, results1, fields) {
							connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results7, fields) {

								let number = 0;
								if (text == 'mediumhouse' && results7[0].mediumhouse > 0) {
									connection.query('update profiles set coins = ? where name = ?', [results7[0].coins + 400000, msg.member.user.username], function (error, results3, fields) {
									});
									connection.query('update profiles set mediumhouse = ? where name = ?', [results7[0].mediumhouse - 1, msg.member.user.username], function (error, results3, fields) {
									});
									const firstembed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle('Item Sold!')
											.addFields({ name: 'Sold', value: 'Successfully sold a medium house!' , inline: false },);
									msg.channel.send(firstembed);
									// msg.reply('Successfully sold medium house!');
								}
								
								if (text[0] == 'smallhouse' && results7[0].smallhouse >= parseInt(text[1])) {
									connection.query('update profiles set coins = ? where name = ?', [results7[0].coins + parseInt(text[1])*200000, msg.member.user.username], function (error, results3, fields) {
									});
									connection.query('select * from profiles where name = ?', ['bank'], function (error, results9, fields) {

									connection.query('update profiles set coins = ? where name = ?', [results9[0].coins - parseInt(text[1])*200000, 'bank'], function (error, results3, fields) {
									});
								})
									connection.query('update profiles set smallhouse = ? where name = ?', [results7[0].smallhouse - parseInt(text[1]), msg.member.user.username], function (error, results3, fields) {
									});
									const firstembed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle('Item Sold!')
											.addFields({ name: 'Sold', value: 'Successfully sold smallhouses!' , inline: false },);
									msg.channel.send(firstembed);
									// msg.reply('Successfully sold bonds!');
								}
								else if (text == 'largehouse' && results7[0].largehouse > 0) {
									connection.query('update profiles set coins = ? where name = ?', [results7[0].coins + 800000, msg.member.user.username], function (error, results3, fields) {
									});
									connection.query('update profiles set largehouse = ? where name = ?', [results7[0].largehouse - 1, msg.member.user.username], function (error, results3, fields) {
									});
									const firstembed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle('Item Sold!')
											.addFields({ name: 'Sold', value: 'Successfully sold a large house!' , inline: false },);
									msg.channel.send(firstembed);
									// msg.reply('Successfully sold large house!');
								}
								if (text == 'smallmansion' && results7[0].smallmansion > 0) {
									connection.query('update profiles set coins = ? where name = ?', [results7[0].coins + 1200000, msg.member.user.username], function (error, results3, fields) {
									});
									connection.query('update profiles set smallmansion = ? where name = ?', [results7[0].smallmansion - 1, msg.member.user.username], function (error, results3, fields) {
									});
									const firstembed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle('Item Sold!')
											.addFields({ name: 'Sold', value: 'Successfully sold a small mansion!' , inline: false },);
									msg.channel.send(firstembed);
									// msg.reply('Successfully sold small mansion!');
								}
								console.log(text)
								if (text[0] == 'bonds' && results7[0].bonds >= parseInt(text[1])) {
									connection.query('update profiles set coins = ? where name = ?', [results7[0].coins + parseInt(text[1])*200, msg.member.user.username], function (error, results3, fields) {
									});
									connection.query('select * from profiles where name = ?', ['bank'], function (error, results9, fields) {

									connection.query('update profiles set coins = ? where name = ?', [results9[0].coins - parseInt(text[1])*200, 'bank'], function (error, results3, fields) {
									});
								})
									connection.query('update profiles set bonds = ? where name = ?', [results7[0].bonds - parseInt(text[1]), msg.member.user.username], function (error, results3, fields) {
									});
									const firstembed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle('Item Sold!')
											.addFields({ name: 'Sold', value: 'Successfully sold bonds!' , inline: false },);
									msg.channel.send(firstembed);
									// msg.reply('Successfully sold bonds!');
								}
								else if (text != 'mediumhouse' && text[0] != 'smallhouse' && text != 'smallmansion' && text != 'largehouse' && parseInt(args) <= results12[0].number) {
									console.log(parseInt(args));
									results9.forEach(result => {

										number = number + result.number;
									});
									console.log(number);
									connection.query('update profiles set coins = ? where name = ?', [results7[0].coins + ((results1[0].stockvalue / number) * parseInt(args)), msg.member.user.username], function (error, results3, fields) {
									});
									connection.query('update stocks set number = ? where name = ? and business = ?', [results12[0].number - parseInt(args), msg.member.user.username, text[0] + ' ' + text[1] + ' ' + text[2]], function (error, results3, fields) {
									});
									connection.query('update bussiness set balance = ? where name = ?', [results1[0].balance - ((results1[0].stockvalue / number) * parseInt(args)), text[0] + ' ' + text[1] + ' ' + text[2]], function (error, results3, fields) {
									});
									connection.query('update bussiness set stockvalue = ? where name = ?', [results1[0].stockvalue -  ((results1[0].stockvalue / number + (1.05*number)) * parseInt(args)), text[0] + ' ' + text[1] + ' ' + text[2]], function (error, results3, fields) {
									});
									const firstembed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle('Stocks Sold!')
											.addFields({ name: 'Sold', value: 'Successfully sold stocks!' , inline: false },);
									msg.channel.send(firstembed);
									// msg.reply('Successfully sold stocks');
								}
								// else {
								// 	const firstembed = new Discord.MessageEmbed()
								// 			.setColor('#0099ff')
								// 			.setTitle('Stocks Error!')
								// 			.addFields({ name: 'Error', value: 'You don\'t have that many shares!' , inline: false },);
								// 		msg.channel.send(firstembed);
								// 	// msg.reply('You do not have that many shares!');
								// }
							});
						});
					});
				});
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'rob')) {
				const user = msg.mentions.users.first();
				var number = Math.floor((Math.random() * 100) + 1);
				if (user.username == 'bank') {
					msg.reply('You can\'t rob this person, in fact, he is the one who pays you!');
				}
				else if (number >= 60) {
					if (number >= 80) {
						connection.query('select * from profiles where name = ?', [user.username], function (error, results, fields) {
								const firstembed = new Discord.MessageEmbed()
										firstembed.setColor('#0099ff')
										firstembed.setTitle('Robbing!')
										firstembed.addFields({ name: 'Person Stolen From', value: `${user}` , inline: false },);
										firstembed.addFields({ name: 'Amount Stolen', value: `${parseInt(results[0].coins * 0.15).toString()}` + ' coins!' , inline: false },);
							msg.channel.send(firstembed);
							// msg.reply('You have stolen ' + parseInt(results[0].coins * 0.15).toString() + ' coins');
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins - parseInt(results[0].coins * 0.85), user.username], function (error, results3, fields) {
								connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results1, fields) {
									connection.query('update profiles set coins = ? where name = ?', [parseInt(results1[0].coins + results[0].coins * 0.15), msg.member.user.username], function (error, results, fields) {
									});
								});
							});
						});

					}
					else {

						connection.query('select * from profiles where name = ?', [user.username], function (error, results, fields) {
							const firstembed = new Discord.MessageEmbed()
											firstembed.setColor('#0099ff')
											firstembed.setTitle('Robbing!')
											firstembed.addFields({ name: 'Person Stolen From', value: `${user}` , inline: false },);
											firstembed.addFields({ name: 'Amount Stolen', value: `${parseInt(results[0].coins * 0.15).toString()}` + ' coins!' , inline: false },);
							msg.channel.send(firstembed);
							// msg.reply('You have stolen ' + parseInt(results[0].coins * 0.35).toString() + ' coins');

							connection.query('update profiles set coins = ? where name = ?', [results[0].coins - parseInt(results[0].coins * 0.65), user.username], function (error, results, fields) {
							});
							connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results1, fields) {
								connection.query('update profiles set coins = ? where name = ?', [parseInt(results1[0].coins + results[0].coins * 0.35), msg.member.user.username], function (error, results, fields) {
								});
							});

						});

					}
				}
				else {

					const member = msg.mentions.users.first();
					connection.query('select * from profiles where name = ?', [user.username], function (error, results1, fields) {
						connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results5, fields) {
							const firstembed = new Discord.MessageEmbed()
								firstembed.setColor('#0099ff')
								firstembed.setTitle('Robbing!')
								firstembed.addFields({ name: 'Person Stolen From', value: `${user}` , inline: false },);
								firstembed.addFields({ name: 'Amount Fined', value: `${parseInt(results1[0].coins * 0.15).toString()}` + ' coins!' , inline: false },);
							msg.channel.send(firstembed);
							// msg.reply('You have been caught and fined ' + parseInt(results1[0].coins * 0.15).toString() + ' coins');

							connection.query('update profiles set coins = ? where name = ?', [results5[0].coins - parseInt(results1[0].coins * 0.15), msg.member.user.username], function (error, results, fields) {
							});
							connection.query('select * from profiles where name = ?', ['bank'], function (error, results2, fields) {

								connection.query('update profiles set coins = ? where name = ?', [results2[0].coins + parseInt(results1[0].coins * 0.15), 'bank'], function (error, results, fields) {
								});
							});
						});
					});

				}
				connection.query('select * from profiles where name = ?', [user.username], function (error, results, fields) {

				if(results[0].dmblock == 0){
					const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Robbed!')
								.addFields({ name: 'Amount Robbed', value: 'You have been robbed!' , inline: false },);
					user.send(firstembed);
					// user.send('You have been robbed!')
				}
			})
			}
			else if (msg.content == `${results[0].prefix}` + 'work' || msg.content === `${results[0].prefix}` + 'w') {
				const nz_date_string = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
				const date_nz = new Date(nz_date_string);

				// hours as (HH) format
				const hours = ('0' + date_nz.getHours()).slice(-2);

				// minutes as (mm) format
				const minutes = ('0' + date_nz.getMinutes()).slice(-2);

				// seconds as (ss) format
				const seconds = ('0' + date_nz.getSeconds()).slice(-2);

				const time_hh_mm_ss = hours + ':' + minutes + ':' + seconds;
				connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {
					if (results[0] == undefined || results[0] == null) {
						connection.query('insert into profiles(name, missionnumber, coins) values(?,?,?)', [msg.member.user.username, 1, 100], function (error, results, fields) {
							msg.reply('Please choose a job first, a list can be found in the joblist!');

						});
					}
					else if (results[0].job == 'freelancer') {
						msg.reply('Please choose a job first, a list can be found in the joblist!');
					}

					if (parseInt(time_hh_mm_ss.substr(0, 2) - 1) < parseInt(results[0].lastworked.substr(0, 2)) && results[0].lastworkeddate == nz_date_string.substr(0, 10)) {
						msg.reply('You can work again in ' + (60 - minutes).toString() + ' minutes!');

					}
					else if (`${results[0].job}` == 'developer') {
						if ((results[0].lastworkeddate != nz_date_string.substr(0, 10)) && results[0].hours < 5 && results[0].lastworkeddate.toString() != '00-00-0000') {
							connection.query('update profiles set job=? where name=?', ['freelancer', msg.member.user.username], async function (error, results, fields) {


							});
							msg.reply('You have not worked the required hours yesterday, you have been fired!');

						}
						if (results[0].lastworkeddate != nz_date_string.substr(0, 10)) {
							connection.query('update profiles set hours=? where name=?', [0, msg.member.user.username], async function (error, results, fields) {


							});
							const errorembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Work')
						.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
							errorembed.addFields(
								{ name: 'Salary', value: 'You have earned $' + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 500).toString() + ' coins!', inline: false },
								
		
		
							);	
							msg.channel.send(errorembed)
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 500), msg.member.user.username], function (error, results, fields) {
							});
							if (results[0].bussiness != null && results[0].bussiness != undefined && results[0].bussiness != 'undefined') {
								connection.query('select * from bussiness where name = ?', [results[0].bussiness], function (error, results1, fields) {

									connection.query('update bussiness set balance = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 500), results[0].bussiness], function (error, results, fields) {
									});
								});
							}
							else {
								connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

									connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 500), 'bank'], function (error, results, fields) {
									});
								});
							}
							connection.query('update profiles set lastworked=? where name=?', [time_hh_mm_ss, msg.member.user.username], async function (error, results, fields) {


							});
							connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {

								connection.query('update profiles set hours=? where name=?', [results[0].hours + 1, msg.member.user.username], async function (error, results, fields) {


								});
							});
							connection.query('update profiles set lastworkeddate=? where name=?', [nz_date_string.substr(0, 10), msg.member.user.username], async function (error, results, fields) {


							});
						}

						else {
							const errorembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Work')
						.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
							errorembed.addFields(
								{ name: 'Salary', value: 'You have earned $' + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 500).toString() + ' coins!', inline: false },
								
		
		
							);	
							msg.channel.send(errorembed)
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 500), msg.member.user.username], function (error, results, fields) {
							});
							if (results[0].bussiness != null && results[0].bussiness != undefined && results[0].bussiness != 'undefined') {
								connection.query('select * from bussiness where name = ?', [results[0].bussiness], function (error, results1, fields) {

									connection.query('update bussiness set balance = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 500), results[0].bussiness], function (error, results, fields) {
									});
								});
							}
							else {
								connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

									connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 500), 'bank'], function (error, results, fields) {
									});
								});
							}
							connection.query('update profiles set lastworked=? where name=?', [time_hh_mm_ss, msg.member.user.username], async function (error, results, fields) {


							});
							connection.query('update profiles set hours=? where name=?', [results[0].hours + 1, msg.member.user.username], async function (error, results, fields) {


							});
							connection.query('update profiles set lastworkeddate=? where name=?', [nz_date_string.substr(0, 10), msg.member.user.username], async function (error, results, fields) {


							});
						}

					}
					else if (`${results[0].job}` == 'police') {

						if (results[0].lastworkeddate != nz_date_string.substr(0, 10)) {
							connection.query('update profiles set hours=? where name=?', [0, msg.member.user.username], async function (error, results, fields) {


							});
							const errorembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Work')
						.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
							errorembed.addFields(
								{ name: 'Salary', value: 'You have earned $' + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 300).toString() + ' coins!', inline: false },
								
		
		
							);	
							msg.channel.send(errorembed)
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 300), msg.member.user.username], function (error, results, fields) {
							});
							if (results[0].bussiness != null && results[0].bussiness != undefined && results[0].bussiness != 'undefined') {
								connection.query('select * from bussiness where name = ?', [results[0].bussiness], function (error, results1, fields) {

									connection.query('update bussiness set balance = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 300), results[0].bussiness], function (error, results, fields) {
									});
								});
							}
							else {
								connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

									connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 300), 'bank'], function (error, results, fields) {
									});
								});
							}
							connection.query('update profiles set lastworked=? where name=?', [time_hh_mm_ss, msg.member.user.username], async function (error, results, fields) {


							});
							connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {

								connection.query('update profiles set hours=? where name=?', [results[0].hours + 1, msg.member.user.username], async function (error, results, fields) {


								});
							});
							connection.query('update profiles set lastworkeddate=? where name=?', [nz_date_string.substr(0, 10), msg.member.user.username], async function (error, results, fields) {


							});
						}

						else {
							const errorembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Work')
						.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
							errorembed.addFields(
								{ name: 'Salary', value: 'You have earned $' + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 300).toString() + ' coins!', inline: false },
								
		
		
							);	
							msg.channel.send(errorembed)
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 300), msg.member.user.username], function (error, results, fields) {
							});
							if (results[0].bussiness != null && results[0].bussiness != undefined && results[0].bussiness != 'undefined') {
								connection.query('select * from bussiness where name = ?', [results[0].bussiness], function (error, results1, fields) {

									connection.query('update bussiness set balance = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 300), results[0].bussiness], function (error, results, fields) {
									});
								});
							}
							else {
								connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

									connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 300), 'bank'], function (error, results, fields) {
									});
								});
							}
							connection.query('update profiles set lastworked=? where name=?', [time_hh_mm_ss, msg.member.user.username], async function (error, results, fields) {


							});
							connection.query('update profiles set hours=? where name=?', [results[0].hours + 1, msg.member.user.username], async function (error, results, fields) {


							});
							connection.query('update profiles set lastworkeddate=? where name=?', [nz_date_string.substr(0, 10), msg.member.user.username], async function (error, results, fields) {


							});
						}

					}
					else if (`${results[0].job}` == 'driver') {

						if (results[0].lastworkeddate != nz_date_string.substr(0, 10)) {
							connection.query('update profiles set hours=? where name=?', [0, msg.member.user.username], async function (error, results, fields) {


							});
							const errorembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Work')
						.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
							errorembed.addFields(
								{ name: 'Salary', value: 'You have earned $' + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 1000).toString() + ' coins!', inline: false },
								
		
		
							);	
							msg.channel.send(errorembed)
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 1000), msg.member.user.username], function (error, results, fields) {
							});
							if (results[0].bussiness != null && results[0].bussiness != undefined && results[0].bussiness != 'undefined') {
								console.log(2);
								connection.query('select * from bussiness where name = ?', [results[0].bussiness], function (error, results1, fields) {

									connection.query('update bussiness set balance = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 1000), results[0].bussiness], function (error, results, fields) {
									});
								});
							}
							else {
								connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

									connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 1000), 'bank'], function (error, results, fields) {
									});
								});
							}
							connection.query('update profiles set lastworked=? where name=?', [time_hh_mm_ss, msg.member.user.username], async function (error, results, fields) {


							});
							connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {

								connection.query('update profiles set hours=? where name=?', [results[0].hours + 1, msg.member.user.username], async function (error, results, fields) {


								});
							});
							connection.query('update profiles set lastworkeddate=? where name=?', [nz_date_string.substr(0, 10), msg.member.user.username], async function (error, results, fields) {


							});
						}

						else {
							const errorembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Work')
						.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
							errorembed.addFields(
								{ name: 'Salary', value: 'You have earned $' + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 1000).toString() + ' coins!', inline: false },
								
		
		
							);	
							msg.channel.send(errorembed)
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 1000), msg.member.user.username], function (error, results, fields) {
							});
							if (results[0].bussiness != null && results[0].bussiness != undefined && results[0].bussiness != 'undefined') {
								connection.query('select * from bussiness where name = ?', [results[0].bussiness], function (error, results1, fields) {

									connection.query('update bussiness set balance = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 1000), results[0].bussiness], function (error, results, fields) {
									});
								});
							}
							else {
								connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

									connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 1000), 'bank'], function (error, results, fields) {
									});
								});
							}
							connection.query('update profiles set lastworked=? where name=?', [time_hh_mm_ss, msg.member.user.username], async function (error, results, fields) {


							});
							connection.query('update profiles set hours=? where name=?', [results[0].hours + 1, msg.member.user.username], async function (error, results, fields) {


							});
							connection.query('update profiles set lastworkeddate=? where name=?', [nz_date_string.substr(0, 10), msg.member.user.username], async function (error, results, fields) {


							});
						}

					}
					else if (`${results[0].job}` == 'waiter') {
						if ((results[0].lastworkeddate != nz_date_string.substr(0, 10)) && results[0].hours < 2 && results[0].lastworkeddate.toString() != '00-00-0000') {
							connection.query('update profiles set job=? where name=?', ['freelancer', msg.member.user.username], async function (error, results, fields) {


							});
							msg.reply('You have not worked the required hours yesterday, you have been fired!');

						}
						if (results[0].lastworkeddate != nz_date_string.substr(0, 10)) {
							connection.query('update profiles set hours=? where name=?', [0, msg.member.user.username], async function (error, results, fields) {


							});
							var number = Math.floor(Math.random() * 100) + 1;
							if (number <= 30) {
								console.log(2);
								const errorembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Work')
						.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
							errorembed.addFields(
								{ name: 'Salary', value: 'You have earned $' + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 100 + 1000).toString() + ' coins!', inline: false },
								
		
		
							);	
							msg.channel.send(errorembed)
								connection.query('update profiles set coins = ? where name = ?', [results[0].coins + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 100 + 1000), msg.member.user.username], function (error, results, fields) {
								});
								if (results[0].bussiness != null && results[0].bussiness != undefined && results[0].bussiness != 'undefined') {
									connection.query('select * from bussiness where name = ?', [results[0].bussiness], function (error, results1, fields) {

										connection.query('update bussiness set balance = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 100 + 1000), results[0].bussiness], function (error, results, fields) {
										});
									});
								}
								else {
									connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

										connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 100 + 1000), 'bank'], function (error, results, fields) {
										});
									});
								}

							}
							else {
								const errorembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Work')
						.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
							errorembed.addFields(
								{ name: 'Salary', value: 'You have earned $' + ((results[0].stocks * 50) + (results[0].computer * 200) + 100).toString() + ' coins!', inline: false },
								
		
		
							);	
							msg.channel.send(errorembed)
								connection.query('update profiles set coins = ? where name = ?', [results[0].coins + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 100), msg.member.user.username], function (error, results, fields) {
								});
								if (results[0].bussiness != null && results[0].bussiness != undefined && results[0].bussiness != 'undefined') {
									connection.query('select * from bussiness where name = ?', [results[0].bussiness], function (error, results1, fields) {

										connection.query('update bussiness set balance = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 100 + 1000), results[0].bussiness], function (error, results, fields) {
										});
									});
								}
								else {
									connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

										connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 100 + 1000), 'bank'], function (error, results, fields) {
										});
									});
								}
							}
							connection.query('update profiles set lastworked=? where name=?', [time_hh_mm_ss, msg.member.user.username], async function (error, results, fields) {


							});

							connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {

								connection.query('update profiles set hours=? where name=?', [results[0].hours + 1, msg.member.user.username], async function (error, results, fields) {


								});
							});
							connection.query('update profiles set lastworkeddate=? where name=?', [nz_date_string.substr(0, 10), msg.member.user.username], async function (error, results, fields) {


							});
						}

						else {
							const errorembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Work')
						.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
							errorembed.addFields(
								{ name: 'Salary', value: 'You have earned $' + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 100).toString() + ' coins!', inline: false },
								
		
		
							);	
							msg.channel.send(errorembed)
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 100), msg.member.user.username], function (error, results, fields) {
							});
							if (results[0].bussiness != null && results[0].bussiness != undefined && results[0].bussiness != 'undefined') {
								connection.query('select * from bussiness where name = ?', [results[0].bussiness], function (error, results1, fields) {

									connection.query('update bussiness set balance = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 100), results[0].bussiness], function (error, results, fields) {
									});
									connection.query('update bussiness set stockvalue = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 100), results[0].bussiness], function (error, results, fields) {
									});
								});
							}
							else {
								connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

									connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + 100), 'bank'], function (error, results, fields) {
									});
								});
							}
							connection.query('update profiles set lastworked=? where name=?', [time_hh_mm_ss, msg.member.user.username], async function (error, results, fields) {


							});
							connection.query('update profiles set hours=? where name=?', [results[0].hours + 1, msg.member.user.username], async function (error, results, fields) {


							});
							connection.query('update profiles set lastworkeddate=? where name=?', [nz_date_string.substr(0, 10), msg.member.user.username], async function (error, results, fields) {


							});
						}
					}
					else {
						connection.query('select * from jobs where business = ? and name = ?', [results[0].bussiness, `${results[0].job}`], function (error, results1, fields) {
							if ((results[0].lastworkeddate != nz_date_string.substr(0, 10)) && results[0].hours < results1[0].requiredhours && results[0].lastworkeddate.toString() != '00-00-0000') {
								connection.query('update profiles set job=? where name=?', ['freelancer', msg.member.user.username], async function (error, results, fields) {


								});
								connection.query('update profiles set bussiness=? where name=?', ['none', msg.member.user.username], async function (error, results, fields) {


								});
								msg.reply('You have not worked the required hours yesterday, you have been fired!');

							}
							if (results[0].lastworkeddate != nz_date_string.substr(0, 10)) {
								connection.query('update profiles set hours=? where name=?', [0, msg.member.user.username], async function (error, results, fields) {


								});
								const errorembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Work')
						.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
							errorembed.addFields(
								{ name: 'Salary', value: 'You have earned $' + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + results1[0].pay).toString() + ' coins!', inline: false },
								
		
		
							);	
							msg.channel.send(errorembed)
								connection.query('update profiles set coins = ? where name = ?', [results[0].coins + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + results1[0].pay), msg.member.user.username], function (error, results, fields) {
								});
								connection.query('select * from bussiness where name = ?', [results[0].bussiness], function (error, results2, fields) {

									connection.query('update bussiness set balance = ? where name = ?', [results2[0].balance + (results1[0].pay*0.25), results[0].bussiness], function (error, results, fields) {
									});
									connection.query('update bussiness set stockvalue = ? where name = ?', [results2[0].stockvalue + (results1[0].pay*0.25), results[0].bussiness], function (error, results, fields) {
									});
								});
								connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

									connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200)), 'bank'], function (error, results, fields) {
									});
								});


								connection.query('update profiles set lastworked=? where name=?', [time_hh_mm_ss, msg.member.user.username], async function (error, results, fields) {


								});
								connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {

									connection.query('update profiles set hours=? where name=?', [results[0].hours + 1, msg.member.user.username], async function (error, results, fields) {


									});
								});
								connection.query('update profiles set lastworkeddate=? where name=?', [nz_date_string.substr(0, 10), msg.member.user.username], async function (error, results, fields) {


								});
							}

							else {
								const errorembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Work')
						.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
							errorembed.addFields(
								{ name: 'Salary', value: 'You have earned $' + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + results1[0].pay).toString() + ' coins!', inline: false },
								
		
		
							);	
							msg.channel.send(errorembed)
								connection.query('update profiles set coins = ? where name = ?', [results[0].coins + ((results[0].stocks * 50) + (results[0].computer * 200) + (results[0].workspace * 400) + results1[0].pay), msg.member.user.username], function (error, results, fields) {
								});
								connection.query('select * from bussiness where name = ?', [results[0].bussiness], function (error, results2, fields) {

									connection.query('update bussiness set balance = ? where name = ?', [results2[0].balance + ((results1[0].pay*0.25-(results[0].workspace * 400))), results[0].bussiness], function (error, results, fields) {
									});
									connection.query('update bussiness set stockvalue = ? where name = ?', [results2[0].stockvalue + (results1[0].pay*0.25), results[0].bussiness], function (error, results, fields) {
									});
								});
								connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

									connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - ((results[0].stocks * 50) + (results[0].computer * 200)), 'bank'], function (error, results, fields) {
									});
								});

								connection.query('update profiles set lastworked=? where name=?', [time_hh_mm_ss, msg.member.user.username], async function (error, results, fields) {


								});
								connection.query('update profiles set hours=? where name=?', [results[0].hours + 1, msg.member.user.username], async function (error, results, fields) {


								});
								connection.query('update profiles set lastworkeddate=? where name=?', [nz_date_string.substr(0, 10), msg.member.user.username], async function (error, results, fields) {


								});
							}


						});
					}

				});
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'become')) {
				connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {

					connection.query('select * from jobs where business = ?', [results[0].bussiness], function (error, results1, fields) {
						results1.forEach(result => {

							if (msg.content.endsWith(result.name)) {
								connection.query('update profiles set job = ? where name = ?', [result.name, msg.member.user.username], function (error, results, fields) {
								});
								msg.reply('Successfully got job!');

							}
						});
					});
					if (msg.content.endsWith('youtuber')) {
						connection.query('update profiles set job = ? where name = ?', ['youtuber', msg.member.user.username], function (error, results, fields) {
						});
						msg.reply('Successfully became youtuber!');
					}
					else if (msg.content.endsWith('freelancer')) {
						connection.query('update profiles set job = ? where name = ?', ['freelancer', msg.member.user.username], function (error, results, fields) {
						});
						msg.reply('Successfully became freenlancer!');

					}
					else if (msg.content.endsWith('developer')) {
						connection.query('update profiles set job = ? where name = ?', ['developer', msg.member.user.username], function (error, results, fields) {
						});

						msg.reply('Successfully became developer!');

					}
					else if (msg.content.endsWith('police')) {
						connection.query('update profiles set job = ? where name = ?', ['police', msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins + 500, msg.member.user.username], function (error, results, fields) {
						});
						msg.reply('Successfully became police!');

					}
					else if (msg.content.endsWith('waiter')) {
						connection.query('update profiles set job = ? where name = ?', ['waiter', msg.member.user.username], function (error, results, fields) {
						});

						msg.reply('Successfully became waiter!');

					}
					else if (msg.content.endsWith('driver') && results[0].car == 1) {
						connection.query('update profiles set job = ? where name = ?', ['driver', msg.member.user.username], function (error, results, fields) {
						});
						msg.reply('Successfully became taxi driver!');

					}
					else if (msg.content.endsWith('businessman') && results[0].coins - 100 >= 0) {
						connection.query('update profiles set job = ? where name = ?', ['bussinessman', msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 100, msg.member.user.username], function (error, results, fields) {
						});
						msg.reply('Successfully became businessman and paid 100 startup cost!');

					}

					else {
						msg.reply('Either you had the wrong syntax or you don\'t own a necessary element!');
					}
				});
			}
			else if (msg.content === `${results[0].prefix}` + 'whoisthymaster555' || msg.content === `${results[0].prefix}` + 'whoistarun') {
				msg.reply('ThyMaster555 is a wizard. He brews cool potions and spells in his free time. He is friends with Satvik. He has dueled against Gandalf and won mutiple times! He was also the real person who killed Voldemort. He has even won duels against Dumbledore!');
			}
			else if (msg.content === `${results[0].prefix}` + 'servers') {
				msg.reply('I am currently serving ' + `${client.guilds.cache.size}` + ' servers!');
			}
			else if (msg.content === `${results[0].prefix}` + 'whoisaryav') {
				msg.reply('Aryav is a owner of Softwaresat Community and created a miniscule part of the bot!');
			}
			else if (msg.content === `${results[0].prefix}` + 'whoismrskull') {
				msg.reply('Very active guy');
			}
			else if (msg.content === `${results[0].prefix}` + 'whoisfrostbite') {
				msg.reply('Guy who likes drawing softwaresat stuff and sometimes does pfps for people');
			}
	

			else if (msg.content.startsWith(`${results[0].prefix}` + 'setkickthreshold')) {
				if (msg.member.permissions.has('ADMINISTRATOR')) {
					const threshold = msg.content.split(' ').slice(1).join(' ');
					connection.query('update settings set kickthreshold = ? where servername = ?', [threshold, msg.guild.name], function (error, results, fields) {
						const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Kick Threshold Changed!')
							.addFields(
								{ name: 'New Kick Threshold', value:'Threshold has been successfully changed to `' + threshold +'`', inline: true },
							);
						msg.channel.send(settingsembed);
						// msg.reply('Successfully set your kick threshold');
					});
				}
				else {
					msg.reply(':warning: You don\'t have sufficient permissions! :warning:');
				}
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'setautoinvitation')) {
				if (msg.member.permissions.has('ADMINISTRATOR')) {
					if (msg.content.endsWith('false')) {
						connection.query('update settings set invitationback=0 where servername = ?', [msg.guild.name], function (error, results, fields) {
							msg.reply('Successfully set AutoInvitation to false');
						});
					}
					else if (msg.content.endsWith('true')) {
						connection.query('update settings set invitationback=1 where servername = ?', [msg.guild.name], function (error, results, fields) {
							msg.reply('Successfully set AutoInvitation to true');
						});
					}
					else {
						msg.reply('Check your syntax!');
					}
				}
				else {
					msg.reply('You don\'t have sufficient permissions!');
				}
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'setautorespond')) {
				if (msg.member.permissions.has('ADMINISTRATOR')) {
					if (msg.content.endsWith('false')) {
						connection.query('update settings set autorespond=0 where servername = ?', [msg.guild.name], function (error, results, fields) {
							const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Auto Respond Disabled!')
							.addFields(
								{ name: 'New Auto Respond Status!', value:'Auto Respond has been successfully `turned off`', inline: true },
							);
					msg.channel.send(settingsembed);
						});
					}
					else if (msg.content.endsWith('true')) {
						connection.query('update settings set autorespond=1 where servername = ?', [msg.guild.name], function (error, results, fields) {
							msg.reply('Successfully set Auto Respond to true');
							const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Auto Respond Enabled!')
							.addFields(
								{ name: 'New Auto Respond Status!', value:'Auto Respond has been successfully `turned on`', inline: true },
							);
					msg.channel.send(settingsembed);
						});
					}
					else {
						msg.reply(':warning: Check your syntax! :warning:');
					}
				}
				else {
					msg.reply(':warning: You don\'t have sufficient permissions! :warning:');
				}
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'setdm')) {
				if (msg.member.permissions.has('ADMINISTRATOR')) {
					if (msg.content.endsWith('false')) {
						connection.query('update settings set dm=0 where servername = ?', [msg.guild.name], function (error, results, fields) {
							const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Direct Message Disabled!')
							.addFields(
								{ name: 'Direct Message Status!', value:'Rank has been successfully `turned off`', inline: true },
							);
					msg.channel.send(settingsembed);
							// msg.reply('Successfully set dm to false');
						});
					}
					else if (msg.content.endsWith('true')) {
						connection.query('update settings set dm=1 where servername = ?', [msg.guild.name], function (error, results, fields) {
							const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Direct Message Enabled!')
							.addFields(
								{ name: 'Direct Message Status!', value:'Rank has been successfully `turned on`', inline: true },
							);
					msg.channel.send(settingsembed);
							// msg.reply('Successfully set dm to true');
						});
					}
					else {
						msg.reply(':warning: Check your syntax! :warning:');
					}
				}
				else {
					msg.reply(':warning: You don\'t have sufficient permissions! :warning:');
				}
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'setblockdm')) {
					if (msg.content.endsWith('false')) {
						connection.query('update profiles set dmblock=0 where name = ?', [msg.member.user.username], function (error, results, fields) {
							msg.reply('Successfully set dmblock to false');
						});
					}
					else if (msg.content.endsWith('true')) {
						connection.query('update profiles set dmblock=1 where name = ?', [msg.member.user.username], function (error, results, fields) {
							msg.reply('Successfully set dmblock to true');
						});
					}
					else {
						msg.reply('Check your syntax!');
					}
				
				
				
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'setfreeshares')) {
				var text = msg.content.split(' ').slice(1).join(' ');
				connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results10, fields) {
					connection.query('select * from bussiness where name = ?', [results10[0].bussiness], function (error, results11, fields) {
						if (results10[0].job == 'ceo') {

							connection.query('update bussiness set dailystocks=? where name = ?', [parseInt(text), results10[0].bussiness], function (error, results, fields) {
								msg.reply('Successfully set free shares');
							});

						}
						else {
							msg.reply('You are not CEO of your company!');
						}

					});

				});

			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'create business')) {
				var text = msg.content.slice(16).trim().split(' ');
				connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {
					if (results[0].coins >= 50000 && text.length == 3) {
						connection.query('insert into bussiness(name,owner) values(?,?)', [text[0]+' '+text[1]+' '+text[2], msg.member.user.username], function (error, results, fields) {
						});
						connection.query('insert into stocks(name,business,number) values(?,?,?)', [msg.member.user.username, text[0]+' '+text[1]+' '+text[2], 100], function (error, results, fields) {
						});
						connection.query('update profiles set coins=? where name = ?', [results[0].coins - 50000, msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set bussiness=? where name = ?', [text[0]+' '+text[1]+' '+text[2].toString(), msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update profiles set job=? where name = ?', ['ceo', msg.member.user.username], function (error, results, fields) {
						});
						connection.query('update bussiness set stockvalue=? where name = ?', [50000, text[0]+' '+text[1]+' '+text[2]], function (error, results, fields) {
						});
						msg.reply('Created business');

					}
					else {
						msg.reply('You do not have 50000 in funds for setting up a bussiness or your business name isn\'t 3 words long!');
					}
				});

			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'invitebusiness')) {
				var text = msg.content.split(' ').slice(2).join(' ');
				var user = msg.mentions.users.first();
				connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results1, fields) {
					if (results1[0].job == 'ceo') {
						msg.channel.send(`${user}` + ' has been invited to the business, say accept to accept this offer!');
						const filter = m => m.author.id === user.id && m.content == 'accept';
						const collector = msg.channel.createMessageCollector(filter, { max: 2, time: 10000 });

						collector.on('collect', m => {
							connection.query('update profiles set bussiness = ? where name = ?', [results1[0].bussiness, user.username], function (error, results, fields) {
							});
							msg.channel.send('You have been accepted into the business!');
						});

						collector.on('end', collected => {
							console.log(`Collected ${collected.size} items`);
						});

					}
					else {
						msg.reply('You are not ceo of your company!');
					}
				});

			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'fire')) {
				var text = msg.content.split(' ').slice(2).join(' ');
				var user = msg.mentions.users.first();
				connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results1, fields) {
					connection.query('select * from profiles where name = ?', [user.username], function (error, results6, fields) {

					if (results1[0].job == 'ceo' && results6[0].bussiness == results1[0].bussiness) {
					
							connection.query('update profiles set bussiness = ? where name = ?', ['none', user.username], function (error, results, fields) {
							});
							
							connection.query('update profiles set job = ? where name = ?', ['freelancer', user.username], function (error, results, fields) {
							});
							msg.channel.send('This user has been fired!');
						

					

					}
					else {
						msg.reply('You are not ceo of your company or this person isnt in your business!');
					}
				})
				});

			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'create job')) {
				var text = msg.content.slice(12).trim().split(' ');
				connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {
					if (results[0].job == 'ceo') {
						if(text[1] <= 15000){
						connection.query('insert into jobs(name,pay,requiredhours,business) values(?,?,?,?)', [text[0], text[1], text[2], results[0].bussiness], function (error, results, fields) {
						});
						msg.reply('Created job!');
					}
					else{
						msg.reply('You cannot create a job with higher than 15000, if you want to pay your employees more, give money directly or items!')
					}
					}
					else {
						msg.reply('You are not ceo of your business!');
					}
				});

			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'edit job')) {
				var text = msg.content.slice(10).trim().split(' ');
				connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {
					if (results[0].job == 'ceo') {
						if(text[1] <= 15000){
						connection.query('delete from jobs where name = ? and business = ?', [text[0], results[0].bussiness], function (error, results, fields) {
						});
						connection.query('insert into jobs(name,pay,requiredhours,business) values(?,?,?,?)', [text[0], text[1], text[2], results[0].bussiness], function (error, results, fields) {
						});
						msg.reply('Edited job!');
					}
					else{
						msg.reply('You cannot pay more than 15000 to employees!')
					}

					}
					else {
						msg.reply('You are not ceo of your business!');
					}
				});

			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'purge job')) {
				var text = msg.content.split(' ').slice(2).join(' ');
				console.log(text)
				connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {
					if (results[0].job == 'ceo') {
						connection.query('delete from jobs where name = ? and business = ?', [text, results[0].bussiness], function (error, results, fields) {
						});
						msg.reply('Deleted job!');

					}
					else {
						msg.reply('You are not ceo of your business!');
					}
				});

			}
			else if (msg.content == `${results[0].prefix}` + 'business') {
				var employees = 0;
				var number = 0;
				connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {
					connection.query('select * from profiles where bussiness = ?', [results[0].bussiness], function (error, results1, fields) {
						connection.query('select * from bussiness where name = ?', [results[0].bussiness], function (error, results2, fields) {
							connection.query('select * from stocks where business = ?', [results[0].bussiness], function (error, results3, fields) {

								results1.forEach(result => {
									employees++;
								});
								results3.forEach(result => {
									number = number + result.number;
								});
								const settingsembed = new Discord.MessageEmbed()
									.setColor('#0099ff')
									.setTitle(results[0].bussiness)
									.addFields(
										{ name: ':office_worker: Number of Employees', value: employees, inline: true },
										{ name: '<:softwaresat:786624255861325845> Balance', value: results2[0].balance, inline: true },
										{ name: ':coin: Book Value', value: results2[0].stockvalue, inline: true },

										{ name: ':chart_with_upwards_trend: Total Shares', value: number, inline: true },
										{ name: ':bar_chart: Daily Free Shares for Employees', value: results2[0].dailystocks, inline: true },


									);
								msg.channel.send(settingsembed);
							});
						});
					});
				});
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'setrank')) {
				if (msg.member.permissions.has('ADMINISTRATOR')) {
					if (msg.content.endsWith('false')) {
						connection.query('update settings set ranks=0 where servername = ?', [msg.guild.name], function (error, results, fields) {
							const settingsembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Rank Disabled!')
								.addFields(
									{ name: 'New Rank Status!', value:'Rank has been successfully `turned off`', inline: true },
								);
						msg.channel.send(settingsembed);
							// msg.reply('Successfully set rank to false');
						});
					}
					else if (msg.content.endsWith('true')) {
						connection.query('update settings set ranks=1 where servername = ?', [msg.guild.name], function (error, results, fields) {
							const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Rank Enabled!')
							.addFields(
								{ name: 'New Rank Status!', value:'Rank has been successfully `turned on`', inline: true },
							);
					msg.channel.send(settingsembed);
							// msg.reply('Successfully set rank to true');
						});
					}
					else {
						msg.reply(':warning: Check your syntax! :warning:');
					}
				}
				else {
					msg.reply(':warning: You don\'t have sufficient permissions! :warning:');
				}
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'setcountingtype')) {
				if (msg.member.permissions.has('ADMINISTRATOR')) {
					if (msg.content.endsWith('chain')) {
						connection.query('update settings set countingtype=? where servername = ?', ['chain', msg.guild.name], function (error, results, fields) {
							msg.reply('Successfully set CountingType to chain!');
						});
					}
					else if (msg.content.endsWith('traditional')) {
						connection.query('update settings set countingtype=? where servername = ?', ['traditional', msg.guild.name], function (error, results, fields) {
							msg.reply('Successfully set CountingType to traditional!');
						});
					}
					else {
						msg.reply('Check your syntax!');
					}
				}
				else {
					msg.reply('You don\'t have sufficient permissions!');
				}
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'setpingblock')) {
				if (msg.member.permissions.has('ADMINISTRATOR')) {
					if (msg.content.endsWith('false')) {
						connection.query('update settings set pingblock=0 where servername = ?', [msg.guild.name], function (error, results, fields) {
							const settingsembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Ping Block Changed!')
								.addFields(
									{ name: 'New Ping Block', value:'Ping Block has been successfully `turned off`', inline: true },
								);
						msg.channel.send(settingsembed);
						});
					}
					else if (msg.content.endsWith('true')) {
						connection.query('update settings set pingblock=1 where servername = ?', [msg.guild.name], function (error, results, fields) {
							const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Ping Block Changed!')
							.addFields(
								{ name: 'New Ping Block', value:'Ping Block has been successfully `turned on`', inline: true },
							);
						msg.channel.send(settingsembed);
						});
					}
					else {
						msg.reply(':warning: Check your syntax! :warning:');
					}
				}
				else {
					msg.reply(':warning: You don\'t have sufficient permissions! :warning:');
				}
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'setautorole')) {
				var text = msg.content.split(' ').slice(1).join(' ');
				if (msg.member.permissions.has('ADMINISTRATOR')) {
					connection.query('update settings set autorole=? where servername = ?', [text, msg.guild.name], function (error, results, fields) {
						const settingsembed = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle('Auto Role Changed!')
                            .addFields(
                                { name: 'New Auto Role', value:'Auto Role has been successfully changed to `' + text +'`', inline: true },
                            );
                        msg.channel.send(settingsembed);
						// msg.reply('Successfully set autorole to ' + text);
					});
				}
				else {
					msg.reply(':warning: You don\'t have sufficient permissions! :warning:');
				}
			}
			else if (msg.content === `${results[0].prefix}` + 'inventory' || msg.content === `${results[0].prefix}` + 'p' || msg.content === `${results[0].prefix}` + 'inv' || msg.content === `${results[0].prefix}` + 'i') {
				connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {

					const firstembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Inventory!');
					if (`${results[0].woodensword}` == '1') {
						firstembed.addFields(
							{ name: '<:wooden_sword:835155317394374656> Wooden Sword', value: 'Can destroy enemies after lots of hits!', inline: false },
						);
					}
					if (`${results[0].huntingrifle}` == '1') {
						firstembed.addFields(
							{ name: '<:hunting_rifle:835152819099140156> Hunting Rifle', value: 'Used to kill enemies from afar!', inline: false },
						);
					}
					if (`${results[0].shotgun}` == '1') {
						firstembed.addFields(
							{ name: ':gun: Shotgun', value: 'Used to kill enemies from up close!', inline: false },
						);
					}
					if (`${results[0].arrow}` >= '1') {
						firstembed.addFields(
							{ name: '🎯 Arrow', value: 'Used in crossbows to kill enemies from afar!', inline: false },
						);
					}
					if (`${results[0].car}` == '1') {
						firstembed.addFields(
							{ name: ':race_car: Car', value: 'Used to navigate through the big world!', inline: false },
						);
					}
					if (`${results[0].crossbow}` == '1') {
						firstembed.addFields(
							{ name: '🏹 Crossbow', value: 'Used to shoot from afar!', inline: false },
						);
					}
					if (`${results[0].shield}` == '1') {
						firstembed.addFields(
							{ name: ':shield: Shield', value: 'Used to protect one from attacks!', inline: false },
						);
					}
					if (`${results[0].gasoline}` == '1') {
						firstembed.addFields(
							{ name: 'Gasoline', value: 'Used to fuel a car!', inline: false },
						);
					}
					if (`${results[0].ironsword}` == '1') {
						firstembed.addFields(
							{ name: ':dagger: Iron Sword', value: 'Used to hit from close!', inline: false },
						);
					}
					if (`${results[0].diamondsword}` == '1') {
						firstembed.addFields(
							{ name: '<:mcsword:808798600851226635> Diamond Sword', value: 'Used to hit from close!', inline: false },
						);
					}
					if (`${results[0].smallhouse}` >= '1') {
						firstembed.addFields(
							{ name: '🏘 Small House', value: results[0].smallhouse.toString(), inline: false },
						);
					}
					if (`${results[0].mediumhouse}` >= '1') {
						firstembed.addFields(
							{ name: '🏚 Medium House', value: results[0].mediumhouse.toString(), inline: false },
						);
					}
					if (`${results[0].largehouse}` >= '1') {
						firstembed.addFields(
							{ name: '🏡 Large House', value: results[0].largehouse.toString(), inline: false },
						);
					}
					if (`${results[0].smallmansion}` >= '1') {
						firstembed.addFields(
							{ name: '🏢 Small Mansion', value: results[0].smallmansion.toString(), inline: false },
						);
					}
					if (`${results[0].bonds}` >= '1') {
						firstembed.addFields(
							{ name: ':money_with_wings: Bonds', value: results[0].bonds.toString(), inline: false },
						);
					}
					if (`${results[0].computers}` >= '1') {
						firstembed.addFields(
							{ name: ':computer: Computers', value: results[0].computer.toString(), inline: false },
						);
					}
					if (`${results[0].workspace}` >= '1') {
						firstembed.addFields(
							{ name: ':file_cabinet: Workspace', value: results[0].workspace.toString(), inline: false },
						);
					}
					if (`${results[0].bankmembership}` != '00-00-0000') {
						firstembed.addFields(
							{ name: '🏛 Bank Membership', value: 'Purchased '+results[0].bankmembership, inline: false },
						);
					}
					msg.reply(firstembed);
				});
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'setprefix')) {
				var text = msg.content.split(' ').slice(1).join(' ');
				if (msg.member.permissions.has('ADMINISTRATOR')) {
					if (text == undefined) {
						msg.reply(':warning: What do I set it to? :warning:');
					}
					else {
						connection.query('update settings set prefix=? where servername = ?', [text, msg.guild.name], function (error, results, fields) {
							const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Prefix Changed!')
							.addFields(
								{ name: 'New Prefix', value:'Prefix has been successfully changed to `' + text +'`', inline: true },
							);
						msg.channel.send(settingsembed);
						});
					}
				}
				else {
					msg.reply(':warning: Error! You don\'t have sufficient permissions! :warning:');
				}
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'setwelcomechannel')) {
				var text = msg.content.split(' ').slice(1).join(' ');
				if (msg.member.permissions.has('ADMINISTRATOR')) {
					if (text == undefined) {
						msg.reply(':warning: What do I set it to? :warning:');
					}
					else {
						connection.query('update settings set welcomechannel=? where servername = ?', [text, msg.guild.name], function (error, results, fields) {
							// msg.reply('Successfully set the AutoWelcome channel to ' + text);
							const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Welcome Channel Changed!')
							.addFields(
								{ name: 'New Welcome Channel', value:'Welcome Channel has been successfully changed to `' + text +'`', inline: true },
							);
						msg.channel.send(settingsembed);
						});
					}
				}
				else {
					msg.reply(':warning: Error! You don\'t have sufficient permissions! :warning:');
				}
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'setwelcomemessage')) {
				var text = msg.content.split(' ').slice(1).join(' ');
				if (msg.member.permissions.has('ADMINISTRATOR')) {
					if (text == undefined) {
						msg.reply(':warning: What do I set it to? :warning:');
					}
					else {
						connection.query('update settings set welcomemessage=? where servername = ?', [text, msg.guild.name], function (error, results, fields) {
							const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Welcome Message Changed!')
							.addFields(
								{ name: 'New Welcome Message', value:'Welcome Message has been successfully changed to `' + text +'`', inline: true },
							);
						msg.channel.send(settingsembed);
							// msg.reply('Successfully set the AutoWelcome message to ' + text);
						});
					}
				}
				else {
					msg.reply(':warning: Error! You don\'t have sufficient permissions! :warning:');
				}
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'setwelcomeimage')) {
				var text = msg.content.split(' ').slice(1).join(' ');
				if (msg.member.permissions.has('ADMINISTRATOR')) {
					if (text == undefined) {
						msg.reply(':warning: What do I set it to? :warning:');
					}
					else {
						connection.query('update settings set welcomepicture=? where servername = ?', [text, msg.guild.name], function (error, results, fields) {
							const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Welcome Image Changed!')
							.addFields(
								{ name: 'New Welcome Image', value:'Welcome Image has been successfully changed to `' + text +'`', inline: true },
							);
						msg.channel.send(settingsembed);
							// msg.reply('Successfully set the AutoWelcome picture to ' + text);
						});
					}
				}
				else {
					msg.reply(':warning: Error! You don\'t have sufficient permissions! :warning:');
				}
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'eval')) {
				function clean(text) {
					if (typeof (text) === 'string') { return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203)); }
					else { return text; }
				}

				var code = msg.content.split(' ').slice(1).join(' ');
				if (msg.member.permissions.has('ADMINISTRATOR')) {
					try {
						let evaled = eval(code);

						if (typeof evaled !== 'string') { evaled = require('util').inspect(evaled); }

						msg.channel.send(clean(evaled), { code: 'xl' });
					}
					catch (err) {
						msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
					}
				}
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'setlogchannel')) {
				var text = msg.content.split(' ').slice(1).join(' ');
				if (msg.member.permissions.has('ADMINISTRATOR')) {
					if (text == undefined) {
						msg.reply(':warning: What do I set it to? :warning:');
					}
					else {
						connection.query('update settings set logchannel=? where servername = ?', [text, msg.guild.name], function (error, results, fields) {
							const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Logging Channel Changed!')
							.addFields(
								{ name: 'New Logging Channel', value:'Logging Channel has been successfully changed to `' + text +'`', inline: true },
							);
						msg.channel.send(settingsembed);
							// msg.reply('Successfully set the AutoLog channel to ' + text);
						});
					}
				}
				else {
					msg.reply(':warning: Error! You don\'t have sufficient permissions! :warning:');
				}
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'setcussing' || msg.content.startsWith(`${results[0].prefix}` + 'setcursing'))) {
				if (msg.member.permissions.has('ADMINISTRATOR')) {
					if (msg.content.endsWith('false')) {
						connection.query('update settings set cussing=0 where servername = ?', [msg.guild.name], function (error, results, fields) {
							const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Cursing Prevention Disabled!')
							.addFields(
								{ name: 'Cursing Prevention Status!', value:'Cursing Prevention has been successfully `turned off`', inline: true },
							);
					msg.channel.send(settingsembed);
							// msg.reply('Successfully set cussing to false!');
						});
					}
					else if (msg.content.endsWith('true')) {
						connection.query('update settings set cussing=1 where servername = ?', [msg.guild.name], function (error, results, fields) {
							const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Cursing Prevention Enabled!')
							.addFields(
								{ name: 'Cursing Prevention Status!', value:'Cursing Prevention has been successfully `turned on`', inline: true },
							);
					msg.channel.send(settingsembed);
							// msg.reply('Successfully set cussing to true');
						});
					}
					else {
						msg.reply(':warning: Check your syntax! :warning:');
					}
				}
				else {
					msg.reply(':warning: Error! You don\'t have sufficient permissions! :warning:');
				}
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'suggest')) {
				connection.query('insert into suggestions(name,text) values(?,?)', [msg.author.username, msg.content.split(' ').slice(1).join(' ')], function (error, results, fields) {
					connection.query('select id,text from suggestions where text = ?', [msg.content.split(' ').slice(1).join(' ')], function (error, results, fields) {
						console.log(results[0].id);
						const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Thanks For Your Suggestion!')
							.setDescription('Here you can see the ID for your suggestion, use this to verify when your issue is solved in the patch-notes announcements!')
							.addFields(
								{ name: 'Suggestion', value: results[0].text, inline: true },
								{ name: 'ID', value: results[0].id, inline: true },
							);
						msg.channel.send(settingsembed);
					});
				});
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'give')) {
				const member = msg.mentions.users.first();

				connection.query('Select * from profiles where name = ?', [member.username], function (error, results5, fields) {
					if (results5[0] != undefined && results5[0] != null) {
						const text = msg.content.split(' ').slice(2).join(' ');
						connection.query('Select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {
							if (results[0].coins - parseInt(text) >= 0 && parseInt(text) > 0) {
								connection.query('update profiles set coins = ? where name = ?', [results[0].coins - parseInt(text), msg.member.user.username], function (error, results, fields) {
								});


								connection.query('update profiles set coins = ? where name = ?', [results5[0].coins + parseInt(text), member.username], function (error, results, fields) {
								});

								msg.reply('Successfully wired to the person\'s account!');
							}
							else {
								msg.reply('You don\'t have sufficient funds!')
							}
						})
					}
					else {
						msg.reply('The specified person does not have an account, tell them to view their balance to make it!')
					}
				})
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'gift')) {
				const member = msg.mentions.users.first();
				var text = msg.content.slice(6).trim().split(' ');
				console.log(text)
			
				connection.query('Select * from profiles where name = ?', [member.username], function (error, results5, fields) {
					connection.query('Select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {

					if(text[1] == 'computer' && results[0].computer >=text[0]){
						connection.query('update profiles set computer = ? where name = ?', [results[0].computer - parseInt(text[0]), msg.member.user.username], function (error, results, fields) {
						});


						connection.query('update profiles set computer = ? where name = ?', [results5[0].computer + parseInt(text[0]), member.username], function (error, results, fields) {
						});
						msg.reply('Successfully gifted!')

					}
					else if(text[1] == 'workspace' && results[0].workspace >=text[0]){
						connection.query('update profiles set workspace = ? where name = ?', [results[0].workspace - parseInt(text[0]), msg.member.user.username], function (error, results, fields) {
						});


						connection.query('update profiles set workspace = ? where name = ?', [results5[0].workspace + parseInt(text[0]), member.username], function (error, results, fields) {
						});
						msg.reply('Successfully gifted!')

					}
					else if(text[1] == 'smallhouse' && results[0].smallhouse >=text[0]){
						connection.query('update profiles set smallhouse = ? where name = ?', [results[0].smallhouse - parseInt(text[0]), msg.member.user.username], function (error, results, fields) {
						});


						connection.query('update profiles set smallhouse = ? where name = ?', [results5[0].smallhouse + parseInt(text[0]), member.username], function (error, results, fields) {
						});
						msg.reply('Successfully gifted!')

					}
					else if(text[1] == 'mediumhouse' && results[0].mediumhouse >=text[0]){
						connection.query('update profiles set mediumhouse = ? where name = ?', [results[0].mediumhouse - parseInt(text[0]), msg.member.user.username], function (error, results, fields) {
						});


						connection.query('update profiles set mediumhouse = ? where name = ?', [results5[0].mediumhouse + parseInt(text[0]), member.username], function (error, results, fields) {
						});
						msg.reply('Successfully gifted!')

					}
					else if(text[1] == 'largehouse' && results[0].largehouse >=text[0]){
						connection.query('update profiles set largehouse = ? where name = ?', [results[0].largehouse - parseInt(text[0]), msg.member.user.username], function (error, results, fields) {
						});


						connection.query('update profiles set largehouse = ? where name = ?', [results5[0].largehouse + parseInt(text[0]), member.username], function (error, results, fields) {
						});
						msg.reply('Successfully gifted!')

					}
					else if(text[1] == 'bonds' && results[0].bonds >=text[0]){
						connection.query('update profiles set bonds = ? where name = ?', [results[0].bonds - parseInt(text[0]), msg.member.user.username], function (error, results, fields) {
						});


						connection.query('update profiles set bonds = ? where name = ?', [results5[0].bonds + parseInt(text[0]), member.username], function (error, results, fields) {
						});
						msg.reply('Successfully gifted!')

					}
					else if(text[1] == 'fishingpole' && results[0].fishingpole >=text[0]){
						connection.query('update profiles set fishingpole = ? where name = ?', [results[0].fishingpole - parseInt(text[0]), msg.member.user.username], function (error, results, fields) {
						});


						connection.query('update profiles set fishingpole = ? where name = ?', [results5[0].fishingpole + parseInt(text[0]), member.username], function (error, results, fields) {
						});
						msg.reply('Successfully gifted!')

					}
					else if(text.length == 5){
						connection.query('select * from stocks where business = ? and name = ?', [text[1]+' '+text[2]+' '+text[3], msg.member.user.username], function (error, results2, fields) {
							if(results2[0] != 'undefined' && results2[0] != undefined){
							if(results2[0].number >= parseInt(text[0])){
								connection.query('select * from stocks where name = ? and business = ?', [member.username, text[1]+' '+text[2]+' '+text[3]], function (error, results6, fields) {
									if(results6[0] != undefined && results6[0] != 'undefined'){
										connection.query('update stocks set number = ? where name = ? and business = ?', [results2[0].number - parseInt(text[0]), msg.member.user.username,text[1]+' '+text[2]+' '+text[3]], function (error, results, fields) {
										});
										connection.query('update stocks set number = ? where name = ? and business = ?', [results6[0].number + parseInt(text[0]), member.username, text[1]+' '+text[2]+' '+text[3]], function (error, results, fields) {
										});
										msg.reply('Successfully gifted stocks!')
									}
									else{
										connection.query('insert into stocks(name, business, number) values(?,?,?)', [member.username, text[1]+' '+text[2]+' '+text[3], text[0]], function (error, results, fields) {
										});
										connection.query('update stocks set number = ? where name = ? and business = ?', [results2[0].number - parseInt(text[0]), msg.member.user.username, text[1]+' '+text[2]+' '+text[3]], function (error, results, fields) {
										});
										msg.reply('Successfully gifted stocks!')

									}
								})
							}
							else{
								msg.reply('You don\'t own that many shares!')
							}
						}
						else{
							msg.reply('You don\'t own that stock!')
						}
						})
					}
					else{
						msg.reply('Either that item isn\'t supported yet, or you don\'t own enough of that item!')
					}
				})
				})
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'trade')) {
				const text = msg.content.split(' ').slice(2).join(' ');
				const member = msg.mentions.users.first();
				connection.query('Select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {
					if (results[0].forex == 1) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins + (parseInt(text) * 0.10), msg.member.user.username], function (error, results, fields) {
						});
						connection.query('insert into trades(trader, amount, customer) values(?,?,?)', [msg.member.user.username, parseInt(text), member.username], function (error, results, fields) {
						});
						connection.query('Select * from profiles where name = ?', [member.username], function (error, results, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results[0].coins + parseInt(text), member.username], function (error, results, fields) {
							});

						});
						connection.query('Select * from profiles where name = ?', ['bank'], function (error, results, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results[0].coins - parseInt(text), 'bank'], function (error, results, fields) {
							});

						});
						msg.reply('Successfully finalized trade!');
					}
					else {
						msg.reply('You are not a certified trader!');
					}
				});
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'dm')) {
				serverName = msg.guild.name;
				connection.query('Select dm from settings where servername = ?', [serverName], function (error, results, fields) {
					const dmSetting = `${results[0].dm}`;
					if (msg.member.permissions.has('ADMINISTRATOR') && dmSetting == '1') {
						member = msg.mentions.users.first();
						const text = msg.content.split(' ').slice(2).join(' ');
						if (member == undefined) {
							msg.reply('Check your syntax!');
						}
						else {
							member.send(text + ' -' + msg.member.user.username);
							msg.channel.send('Message successfully sent!');
						}
					}
					else {
						msg.reply('You don\'t have sufficient permissions or dm is disabled in your server\'s settings!');
					}
				});
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'setcustomcommand1')) {
				serverName = msg.guild.name;
				connection.query('Select customcommands from settings where servername = ?', [serverName], function (error, results, fields) {
					const customcommands = `${results[0].customcommands}`;
					if (msg.member.permissions.has('ADMINISTRATOR') && customcommands == '1') {
						const starting = msg.content.split(' ').slice(1).join(' ');
						msg.reply(starting.substring(0, 2));
						const ending = msg.content.split(' ').slice(2).join(' ');
						connection.query('update settings set customcommand1parameter = ? where servername = ?', [starting.substring(0, 2), serverName], function (error, results, fields) {
						});
						connection.query('update settings set customcommand1reply = ? where servername = ?', [ending, serverName], function (error, results, fields) {
						});
						msg.channel.send('Command Successfully set!');
					}
					else {
						msg.reply('You don\'t have sufficient permissions or customcommands is disabled in your server\'s settings!');
					}
				});
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'warn')) {
				channel = msg.member.guild.channels.cache.find(ch => ch.name === `${results[0].logchannel}`);
				if (msg.member.permissions.has('KICK_MEMBERS') || msg.member.user.username == 'satvikag') {
					text = msg.content.split(' ').slice(2).join(' ');
					member = msg.mentions.users.first();
					console.log(text);
					if (member == undefined || text == member.id || text == undefined) {
						msg.reply(':warning: Error! Check your syntax! :warning:');
					}
					else {
						console.log(member);
						const membersembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('<a:alertsign:834460437214003230> New Warning! <a:alertsign:834460437214003230>')
								.addFields(
									{ name: 'Warning Sent from', value: `${msg.author}`, inline: false },
									{ name: 'Reason', value: `${text}`, inline: false },
								)
								.setTimestamp();
						member.send(membersembed);
						const settingsembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('<a:alertsign:834460437214003230> New Warning! <a:alertsign:834460437214003230>')
								.addFields(
									{ name: 'Warning Sent to', value: `${member}`, inline: false },
									{ name: 'Reason', value: `${text}`, inline: false },
								)
								.setTimestamp();
						// member.send(settingsembed);
							msg.channel.send(settingsembed);
						if (channel != undefined) {
							channel.send('<:verifiedbadge:834458752538771488> Warning sent to ' + `${member.username}` + ' for ' + text + '!');
						}
						var text = msg.content.split(' ').slice(2).join(' ');
						member = `${member.id}`;
						connection.query('insert into warnings(name,reason) values(?,?)', [member, text], function (error, results, fields) {
						});
						console.log(member);
						connection.query('select count(*) as num from warnings where name =?', [member], function (error, results, fields) {
							amount = parseInt(`${results[0].num}`);
							if (amount >= 6) {
								member = msg.mentions.users.first();
								if (msg.member.permissions.has('ADMINISTRATOR') || msg.member.user.username == 'satvikag')
									connection.query('select link from settings where servername = ?', [msg.guild.name], function (error, results2, fields) {
										member.send('Do you want to join back to the server? (don\'t do your mistake again) ' + `${results2[0].link}`);
										
								});
								const user = msg.mentions.users.first();
								var member = msg.guild.member(user);
								member
									.kick('Optional reason that will display in the audit logs')
									.then(() => {
										// We let the message author know we were able to kick the person
										msg.reply(`Successfully kicked ${user.username}`);
										channel = member.guild.channels.cache.find(ch => ch.name === `${results[0].settings}`);
										member = `${msg.mentions.users.first().id}`;
										connection.query('delete from warnings where name = ?', [member], function (error, results, fields) {
											console.log('Deleted all records!');
										});
										if (channel) {
											channel.send(`Sucessfullly kicked ${user.username}`);
										}
										else {
											msg.reply('Please set a logging channel in the settings!');
										}
									
									});
							}
						});
					}
				}
				else {
					msg.channel.send('<a:Mad:773625972510425109> You don\'t have sufficient permissions');
				}
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'notices')) {
				member = msg.mentions.users.first();
				if (member == undefined) {
					msg.reply('Is this member in the server?');
				}
				else {
					console.log(member);
					connection.query('select count(*) as num from warnings where name =?', [`${member.id}`], function (error, results, fields) {
						connection.query('select reason from warnings where name =?', [`${member.id}`], function (error, results1, fields) {
							if (results == undefined) {
								msg.reply('This person has 0 warnings!');
							}
							else {
								msg.channel.send(`${member.username}` + ' has ' + results[0].num + ' warnings!');
								const settingsembed = new Discord.MessageEmbed()
									.setColor('#0099ff');

								results1.forEach(result => {
									console.log(result.reason);
									if (`${result.reason}` == undefined || `${result.reason}` == 'undefined' || `${result.reason}` == [] || `${result.reason}` == '[]' || `${result.reason}` == ' ' || `${result.reason}` == null) {
										settingsembed.addFields(
											{ name: 'Reason', value: 'None Given', inline: false },
										);
									}
									else {
										settingsembed.addFields(
											{ name: 'Reason', value: `${result.reason}`, inline: false },
										);
									}
								});

								msg.channel.send(settingsembed);

							}
						});
					});
				}
			}
			
			else if (msg.content === `${results[0].prefix}` + 'whatisthis') {
				msg.reply('I am the Softwaresat bot, created for other servers by Satvik. I can do whatever you want, you\'ll just have to wait until I get better');
			}
			else if (msg.content === '.prefix') {
				msg.reply('Your Prefix is ' + `${results[0].prefix}`);
			}
			else if (msg.content === `${results[0].prefix}` + 'settings') {
				const channel = msg.channel;
				channel.createInvite({
					maxAge: 0, // 0 = infinite expiration
					maxUses: 0, // 0 = infinite uses
				}).then(invite => {
					const code = invite.code;
					connection.query('update settings set link=? where servername =?', ['https://discord.gg/' + invite.code, server], function (error, results, fields) {
					});
				});
				if (`${results[0]}` == '[]' || `${results[0]}` == 'undefined' || `${results[0]}` == undefined || `${results[0]}` === [] || `${results[0]}` == '[]') {
					connection.query('insert into settings(servername) values(?)', [msg.guild.name], function (error, results, fields) {
						connection.query('select * from settings where servername = ?', [msg.guild.name], function (error, results, fields) {
							var autokick = "";
							if (results[0].autokick == 1){
								autokick = "<a:check:773624930582396928> Turned On!";
							}
							if (results[0].autokick == 0){
								autokick = ":x: Turned Off!";
							}
							var autodelete = "";
							if (results[0].autodelete == 1){
								autodelete = "<a:check:773624930582396928> Turned On!";
							}
							if (results[0].autodelete == 0){
								autodelete = ":x: Turned Off!";
							}
							var pingblock = "";
							if (results[0].pingblock == 1){
								pingblock = "<a:check:773624930582396928> Turned On!";
							}
							if (results[0].pingblock == 0){
								pingblock = ":x: Turned Off!";
							}
							var ranks = "";
							if (results[0].ranks == 1){
								ranks = "<a:check:773624930582396928> Turned On!";
							}
							if (results[0].ranks == 0){
								ranks = ":x: Turned Off!";
							}
							var invitationback = "";
							if (results[0].invitationback == 1){
								invitationback = "<a:check:773624930582396928> Turned On!";
							}
							if (results[0].invitationback == 0){
								invitationback = ":x: Turned Off!";
							}
							var dm = "";
							if (results[0].dm == 1){
								dm = "<a:check:773624930582396928> Turned On!";
							}
							if (results[0].dm == 0){
								dm = ":x: Turned Off!";
							}
							var cussing = "";
							if (results[0].cussing == 1){
								cussing = "<a:check:773624930582396928> Turned On!";
							}
							if (results[0].cussing == 0){
								cussing = ":x: Turned Off!";
							}
							var autorespond = "";
							if (results[0].autorespond == 1){
								autorespond = "<a:check:773624930582396928> Turned On!";
							}
							if (results[0].cussing == 0){
								autorespond = ":x: Turned Off!";
							}
							const settingsembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Settings for ' + results[0].servername + '!')
								.setAuthor('Management', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
								.setDescription('Here you can view the different settings for your server')
								.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
								.addFields(
									{ name: ':people_wrestling: AutoKick', value: `${autokick}`, inline: false },
									{ name: ':person_gesturing_no: AutoDelete', value: `${autodelete}`, inline: false },
									{ name: '<a:PingSockAnimation:790304842924949515> AutoPingBlock', value: `${pingblock}`, inline: false },
									{ name: ':person_running: Ranks', value: `${ranks}`, inline: false },
									{ name: '<a:fbi:773623248314433556> KickThreshold', value: `${results[0].kickthreshold}`, inline: false },
									{ name: ':envelope_with_arrow: AutoInvitation', value: `${invitationback}`, inline: false },
									{ name: ':link: AutoLink', value: `${results[0].link}`, inline: false },
									{ name: ':speech_balloon: Direct Message', value: `${dm}`, inline: false },
									{ name: ':speech_left: AutoCensor', value: `${cussing}`, inline: false },
									{ name: ':person_biking: AutoRole', value: `${results[0].autorole}`, inline: false },
									{ name: ':star: Prefix`', value: `${results[0].prefix}`, inline: false },
									{ name: ':rocket: AutoWelcomeChannel', value: `${results[0].welcomechannel}`, inline: false },
									{ name: ':person_doing_cartwheel: AutoWelcomeMessage', value: `${results[0].welcomemessage}`, inline: false },
									{ name: ':wave: AutoWelcomePicture', value: `${results[0].welcomepicture}`, inline: false },
									{ name: ':notepad_spiral: AutoLogChannel', value: `${results[0].logchannel}`, inline: false },
									{ name: ':1234: CountingType', value: `${results[0].countingtype}`, inline: false },
									{ name: ':stopwatch: Counter', value: `${results[0].counter}`, inline: false },
									{ name: ':robot: Auto Respond', value: `${autorespond}`, inline: false },
								)
								.setImage('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
								.setTimestamp();

							msg.channel.send(settingsembed);
						});
					});
				}
				else {
					var autokick = "";
							if (results[0].autokick == 1){
								autokick = "<a:check:773624930582396928> Turned On!";
							}
							if (results[0].autokick == 0){
								autokick = ":x: Turned Off!";
							}
							var autodelete = "";
							if (results[0].autodelete == 1){
								autodelete = "<a:check:773624930582396928> Turned On!";
							}
							if (results[0].autodelete == 0){
								autodelete = ":x: Turned Off!";
							}
							var pingblock = "";
							if (results[0].pingblock == 1){
								pingblock = "<a:check:773624930582396928> Turned On!";
							}
							if (results[0].pingblock == 0){
								pingblock = ":x: Turned Off!";
							}
							var ranks = "";
							if (results[0].ranks == 1){
								ranks = "<a:check:773624930582396928> Turned On!";
							}
							if (results[0].ranks == 0){
								ranks = ":x: Turned Off!";
							}
							var invitationback = "";
							if (results[0].invitationback == 1){
								invitationback = "<a:check:773624930582396928> Turned On!";
							}
							if (results[0].invitationback == 0){
								invitationback = ":x: Turned Off!";
							}
							var dm = "";
							if (results[0].dm == 1){
								dm = "<a:check:773624930582396928> Turned On!";
							}
							if (results[0].dm == 0){
								dm = ":x: Turned Off!";
							}
							var cussing = "";
							if (results[0].cussing == 1){
								cussing = "<a:check:773624930582396928> Turned On!";
							}
							if (results[0].cussing == 0){
								cussing = ":x: Turned Off!";
							}
							var autorespond = "";
							if (results[0].autorespond == 1){
								autorespond = "<a:check:773624930582396928> Turned On!";
							}
							if (results[0].cussing == 0){
								autorespond = ":x: Turned Off!";
							}
					const settingsembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Settings for ' + results[0].servername + '!')
						.setAuthor('Management', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
						.setDescription('Here you can view the different settings for your server')
						.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
						.addFields(
							{ name: ':people_wrestling: AutoKick', value: `${autokick}`, inline: false },
							{ name: ':person_gesturing_no: AutoDelete', value: `${autodelete}`, inline: false },
							{ name: '<a:PingSockAnimation:790304842924949515> AutoPingBlock', value: `${pingblock}`, inline: false },
							{ name: ':person_running: Ranks', value: `${ranks}`, inline: false },
							{ name: '<a:fbi:773623248314433556> KickThreshold', value: `${results[0].kickthreshold}`, inline: false },
							{ name: ':envelope_with_arrow: AutoInvitation', value: `${invitationback}`, inline: false },
							{ name: ':link: AutoLink', value: `${results[0].link}`, inline: false },
							{ name: ':speech_balloon: Direct Message', value: `${dm}`, inline: false },
							{ name: ':speech_left: AutoCensor', value: `${cussing}`, inline: false },
							{ name: ':person_biking: AutoRole', value: `${results[0].autorole}`, inline: false },
							{ name: ':star: Prefix`', value: `${results[0].prefix}`, inline: false },
							{ name: ':rocket: AutoWelcomeChannel', value: `${results[0].welcomechannel}`, inline: false },
							{ name: ':person_doing_cartwheel: AutoWelcomeMessage', value: `${results[0].welcomemessage}`, inline: false },
							{ name: ':wave: AutoWelcomePicture', value: `${results[0].welcomepicture}`, inline: false },
							{ name: ':notepad_spiral: AutoLogChannel', value: `${results[0].logchannel}`, inline: false },
							{ name: ':1234: CountingType', value: `${results[0].countingtype}`, inline: false },
							{ name: ':stopwatch: Counter', value: `${results[0].counter}`, inline: false },
							{ name: ':robot: Auto Respond', value: `${autorespond}`, inline: false },

						)
						.setImage('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
						.setTimestamp();
					msg.channel.send(settingsembed);
				}
			}
			else if (msg.content === `${results[0].prefix}` + 'help moderation') {
				const { ReactionCollector } = require('discord.js-collector');
			
				const moderationhelp = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Help for moderation!')
					.setAuthor('Help', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.addFields(
						{ name: 'Warn', value: '"' + `${results[0].prefix}` + 'warn <@mention user>"', inline: false },
						{ name: 'Kick a User', value: '"' + `${results[0].prefix}` + 'kick <@mention user>"', inline: false },
						{ name: 'Ban a User', value: '"' + `${results[0].prefix}` + 'ban <@mention user>"', inline: false },
						{ name: 'Mute a User', value: '"' + `${results[0].prefix}` + 'mute <@mention user>"', inline: false },
						{ name: 'Unmute a User', value: '"' + `${results[0].prefix}` + 'unmute <@mention user>"', inline: false },
						{ name: 'Delete Messages', value: '"' + `${results[0].prefix}` + 'delete <number of messages>" (99 at a time not including sdelete message)', inline: false },
						{ name: 'Direct Messaging', value: '"' + `${results[0].prefix}` + 'dm <@mention user> <message>"', inline: false },
						{ name: 'Add certain role to everybody in server', value: '"' + `${results[0].prefix}` + 'roleall <role name without mention> (may take upto 10 mins)"', inline: false },
						{ name: 'Lock Channel', value: '"' + `${results[0].prefix}` + 'lockdown"', inline: false },
						{ name: 'Unlock Channel', value: '"' + `${results[0].prefix}` + 'unlock"', inline: false },
						{ name: 'Lock Server', value: '"' + `${results[0].prefix}` + 'lockdownall"', inline: false },
						{ name: 'Unlock Server', value: '"' + `${results[0].prefix}` + 'unlockall"', inline: false },


					);
		
						await msg.channel.send(moderationhelp)
				



			}
			else if (msg.content === `${results[0].prefix}` + 'help settings') {
				const { ReactionCollector } = require('discord.js-collector');
			
				const settingshelp = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Help for settings!')
					.setAuthor('Help', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.addFields(
						{ name: 'Check Settings', value: '"' + `${results[0].prefix}` + 'settings"', inline: false },
						{ name: 'Change Prefix', value: '"' + `${results[0].prefix}` + 'setprefix <prefix>"', inline: false },
						{ name: 'Change AutoKick Threshold', value: '"' + `${results[0].prefix}` + 'setkickthreshold <number>"', inline: false },
						{ name: 'Block everyone and here pings', value: '"' + `${results[0].prefix}` + 'setpingblock <true or false>"', inline: false },
						{ name: 'Change AutoRole for welcome', value: '"' + `${results[0].prefix}` + 'setautorole <role>"', inline: false },
						{ name: 'Turn Ranks on or off', value: '"' + `${results[0].prefix}` + 'setrank <true or false>"', inline: false },
						{ name: 'Allow Direct Messaging', value: '"' + `${results[0].prefix}` + 'setdm <true | false>"', inline: false },
						{ name: 'Set Welcome Channel', value: '"' + `${results[0].prefix}` + 'setwelcomechannel <channel without #>"', inline: false },
						{ name: 'Set Logging Channel', value: '"' + `${results[0].prefix}` + 'setlogchannel <channel without #>"', inline: false },
						{ name: 'Auto Delete for Cursing', value: '"' + `${results[0].prefix}` + 'setautodelete <true | false>"', inline: false },
						{ name: 'Auto Respond (fun-ish)', value: '"' + `${results[0].prefix}` + 'setautorespond <true | false>"', inline: false },
						{ name: 'Custom Welcome Message', value: '"' + `${results[0].prefix}` + 'setwelcomemessage <message>"', inline: false },
						{ name: 'Allow autokick', value: '"' + `${results[0].prefix}` + 'setautokick <true|false>" (Set this if you want autokick to work)', inline: false },
						{ name: 'Allows person to join back to a server if kicked from warn', value: '"' + `${results[0].prefix}` + 'setautoinvitation<true | false>" (Do this before using warning system)', inline: false },
						{ name: 'Turn Cursing Prevention On/Off', value: '"' + `${results[0].prefix}` + 'setcussing <true | false>"', inline: false },
					);
				
						await msg.channel.send(settingshelp)
				



			}
			else if (msg.content === `${results[0].prefix}` + 'help welcome') {
				const { ReactionCollector } = require('discord.js-collector');
			
				const welcomehelp = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Help for welcome!')
					.setAuthor('Help', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.addFields(
						{ name: 'Set Welcome Channel', value: '"' + `${results[0].prefix}` + 'setwelcomechannel <channel without #>"', inline: false },
						{ name: 'Custom Welcome Message', value: '"' + `${results[0].prefix}` + 'setwelcomemessage <message>"', inline: false },
						{ name: 'Custom Welcome Image', value: '"' + `${results[0].prefix}` + 'setwelcomeimage <message>"', inline: false },

					);
	
						await msg.channel.send(welcomehelp)
	
			}
			else if (msg.content === `${results[0].prefix}` + 'help misc') {
				const { ReactionCollector } = require('discord.js-collector');
		
			
				const mischelp = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Misc Help Page 1!')
					.setAuthor('Help', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.addFields(
						{ name: 'Support Server', value: '"' + `${results[0].prefix}` + 'server"', inline: false },
						{ name: 'Upvote', value: '"' + `${results[0].prefix}` + 'vote"', inline: false },
						{ name: 'Top.gg', value: '"' + `${results[0].prefix}` + 'top.gg"', inline: false },
						{ name: 'stats', value: '"' + `${results[0].prefix}` + 'stats"', inline: false },
						{ name: 'Link to our Website', value: '"' + `${results[0].prefix}` + 'helpwebsite"', inline: false },
						{ name: 'Information About Satvik', value: '"' + `${results[0].prefix}` + 'whoissatvik"', inline: false },
						{ name: 'Information About Aryav', value: '"' + `${results[0].prefix}` + 'whoisaryav"', inline: false },
						{ name: 'Information About Our Bot', value: '"' + `${results[0].prefix}` + 'whatisthis"', inline: false },
						{ name: 'View Your Server\'s Settings', value: '"' + `${results[0].prefix}` + 'settings (This also create a profile for you server so do this first)"', inline: false },
						{ name: 'Check Warnings For a Person', value: '"' + `${results[0].prefix}` + 'notices <@mention user>"', inline: false },
						{ name: 'Suggest something for the bot', value: '"' + `${results[0].prefix}` + 'suggest <Suggestion>" (Please do not spam)', inline: false },
						{ name: 'Get a link to invite the Softwaresat Bot to your server', value: '"' + `${results[0].prefix}` + 'invite"', inline: false },
						{ name: 'Get a link to your server', value: '"' + `${results[0].prefix}` + 'link" (You can use this link to invite others to your server)', inline: false },
						{ name: 'Add a ticket', value: '"' + `${results[0].prefix}` + 'ticket" (Go to Softwaresat Bot Official Server and to #support. Then use this function. After that state you problem.)', inline: false },
						{ name: 'Ping', value: '"' + `${results[0].prefix}` + 'ping" (Checks how long it takes for the bot to respond to you)', inline: false },
						{ name: 'Prefix', value: '".prefix" (Tells you what your prefix is)', inline: false },
						{ name: 'Ping', value: '"' + `${results[0].prefix}` + 'userinfo" <mention person>', inline: false },
						{ name: 'Weather', value: '"' + `${results[0].prefix}` + 'weather" <city name>', inline: false },
						{ name: 'Echo Embed', value: '"' + `${results[0].prefix}` + 'echo <title> <mention channel> <message>"', inline: false },
						{ name: 'Say', value: '"' + `${results[0].prefix}` + 'say" <mention channel name> <message>', inline: false },
						{ name: 'Server Info (created by Mooncake#6969)', value: '"' + `${results[0].prefix}` + 'serverinfo"', inline: false },
						{ name: 'Emojis from our servers', value: '"' + `${results[0].prefix}` + 'emoji <emojiname>"', inline: false },
						{ name: 'Check invites', value: '"' + `${results[0].prefix}` + 'invites"', inline: false },
						{ name: 'Check invites for someone else', value: '"' + `${results[0].prefix}` + 'invites <mention person>"', inline: false },

					);
					const mischelp2 = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Misc Help Page 2!')
					.setAuthor('Help', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.addFields(
						{ name: 'Save your Server\'s Layout', value: '"' + `${results[0].prefix}` + 'import template"', inline: false },
						{ name: 'See a list of server templates', value: '"' + `${results[0].prefix}` + 'templates"', inline: false },
						{ name: 'Use a server template on your pre-existing server', value: '"' + `${results[0].prefix}` + 'use template <template name found in templates comand>"', inline: false },
				
					);

					const botMessage = await msg.channel.send('Need help? Here list with all my commands!');
				ReactionCollector.paginator({
					botMessage,
					user: msg.author,
					pages: [
						mischelp,
						mischelp2,
				
					],
					collectorOptions: {
						time: 60000
					}
				});
				



			}
			
			
			else if (msg.content === `${results[0].prefix}` + 'help ranks') {
				const { ReactionCollector } = require('discord.js-collector');
				
				const rankhelp = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Help for rank!')
					.setAuthor('Help', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.addFields(
						{ name: 'Set Ranking to True', value: '"' + `${results[0].prefix}` + 'setrank <true or false>"', inline: false },
						{ name: 'Check your level', value: '"' + `${results[0].prefix}` + 'level"', inline: false },
						{ name: 'Check server leaderboard', value: '"' + `${results[0].prefix}` + 'lb"', inline: false },

					);
			
						await msg.channel.send(rankhelp)
			
			}
			
			else if (msg.content === `${results[0].prefix}` + 'help bump') {
				const { ReactionCollector } = require('discord.js-collector');
				const bumphelp = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Help for bump!')
					.setAuthor('Help', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.addFields(
						{ name: 'Setup Bumping (please create channel called bump)', value: '"' + `${results[0].prefix}` + 'bumpsetup"', inline: false },
						{ name: 'Bump your ad (ever 2 hours)', value: '"' + `${results[0].prefix}` + 'bump"', inline: false },

					);
			
						await msg.channel.send(bumphelp)

			}
		
			else if (msg.content === `${results[0].prefix}` + 'help') {
				const { ReactionCollector } = require('discord.js-collector');
				const settingsembed1 = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Help for ' + results[0].servername + '!')
					.setAuthor('Help', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setDescription('Here you can view the different commands I can do')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.addFields(
						{ name: 'Settings', value: 'Click ⚙ or use ' + `${results[0].prefix}` + 'help settings', inline: false },
						{ name: 'Moderation', value: 'Click ⚒ or use ' + `${results[0].prefix}` + 'help moderation', inline: false },
						{ name: 'Welcome', value: 'Click 👋 or use ' + `${results[0].prefix}` + 'help welcome', inline: false },
						{ name: 'Fun', value: 'use ' + `${results[0].prefix}` + 'help fun', inline: false },
						{ name: 'Ranks', value: 'Click ⬆ or use ' + `${results[0].prefix}` + 'help ranks', inline: false },
						{ name: 'Bump', value: 'Click 🤜 or use ' + `${results[0].prefix}` + 'help bump', inline: false },
						{ name: 'Misc', value: 'use ' + `${results[0].prefix}` + 'help misc', inline: false },

					);
				const settingshelp = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Help for settings!')
					.setAuthor('Help', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.addFields(
						{ name: 'Check Settings', value: '"' + `${results[0].prefix}` + 'settings"', inline: false },
						{ name: 'Change Prefix', value: '"' + `${results[0].prefix}` + 'setprefix <prefix>"', inline: false },
						{ name: 'Change AutoKick Threshold', value: '"' + `${results[0].prefix}` + 'setkickthreshold <number>"', inline: false },
						{ name: 'Block everyone and here pings', value: '"' + `${results[0].prefix}` + 'setpingblock <true or false>"', inline: false },
						{ name: 'Change AutoRole for welcome', value: '"' + `${results[0].prefix}` + 'setautorole <role>"', inline: false },
						{ name: 'Turn Ranks on or off', value: '"' + `${results[0].prefix}` + 'setrank <true or false>"', inline: false },
						{ name: 'Allow Direct Messaging', value: '"' + `${results[0].prefix}` + 'setdm <true | false>"', inline: false },
						{ name: 'Set Welcome Channel', value: '"' + `${results[0].prefix}` + 'setwelcomechannel <channel without #>"', inline: false },
						{ name: 'Set Logging Channel', value: '"' + `${results[0].prefix}` + 'setlogchannel <channel without #>"', inline: false },
						{ name: 'Auto Delete for Cursing', value: '"' + `${results[0].prefix}` + 'setautodelete <true | false>"', inline: false },
						{ name: 'Auto Respond (fun-ish)', value: '"' + `${results[0].prefix}` + 'setautorespond <true | false>"', inline: false },
						{ name: 'Custom Welcome Message', value: '"' + `${results[0].prefix}` + 'setwelcomemessage <message>"', inline: false },
						{ name: 'Allow autokick', value: '"' + `${results[0].prefix}` + 'setautokick <true|false>" (Set this if you want autokick to work)', inline: false },
						{ name: 'Allows person to join back to a server if kicked from warn', value: '"' + `${results[0].prefix}` + 'setautoinvitation<true | false>" (Do this before using warning system)', inline: false },
						{ name: 'Turn Cursing Prevention On/Off', value: '"' + `${results[0].prefix}` + 'setcussing <true | false>"', inline: false },
					);
				const moderationhelp = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Help for moderation!')
					.setAuthor('Help', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.addFields(
						{ name: 'Warn', value: '"' + `${results[0].prefix}` + 'warn <@mention user>"', inline: false },
						{ name: 'Kick a User', value: '"' + `${results[0].prefix}` + 'kick <@mention user>"', inline: false },
						{ name: 'Ban a User', value: '"' + `${results[0].prefix}` + 'ban <@mention user>"', inline: false },
						{ name: 'Mute a User', value: '"' + `${results[0].prefix}` + 'mute <@mention user>"', inline: false },
						{ name: 'Unmute a User', value: '"' + `${results[0].prefix}` + 'unmute <@mention user>"', inline: false },
						{ name: 'Delete Messages', value: '"' + `${results[0].prefix}` + 'delete <number of messages>" (99 at a time not including sdelete message)', inline: false },
						{ name: 'Direct Messaging', value: '"' + `${results[0].prefix}` + 'dm <@mention user> <message>"', inline: false },
						{ name: 'Add certain role to everybody in server', value: '"' + `${results[0].prefix}` + 'roleall <role name without mention> (may take upto 10 mins)"', inline: false },
						{ name: 'Lock Channel', value: '"' + `${results[0].prefix}` + 'lockdown"', inline: false },
						{ name: 'Unlock Channel', value: '"' + `${results[0].prefix}` + 'unlock"', inline: false },
						{ name: 'Lock Server', value: '"' + `${results[0].prefix}` + 'lockdownall"', inline: false },
						{ name: 'Unlock Server', value: '"' + `${results[0].prefix}` + 'unlockall"', inline: false },


					);
				const welcomehelp = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Help for welcome!')
					.setAuthor('Help', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.addFields(
						{ name: 'Set Welcome Channel', value: '"' + `${results[0].prefix}` + 'setwelcomechannel <channel without #>"', inline: false },
						{ name: 'Custom Welcome Message', value: '"' + `${results[0].prefix}` + 'setwelcomemessage <message>"', inline: false },
						{ name: 'Custom Welcome Image', value: '"' + `${results[0].prefix}` + 'setwelcomeimage <message>"', inline: false },

					);
				const rankhelp = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Help for rank!')
					.setAuthor('Help', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.addFields(
						{ name: 'Set Ranking to True', value: '"' + `${results[0].prefix}` + 'setrank <true or false>"', inline: false },
						{ name: 'Check your level', value: '"' + `${results[0].prefix}` + 'level"', inline: false },
						{ name: 'Check server leaderboard', value: '"' + `${results[0].prefix}` + 'lb"', inline: false },

					);
				const bumphelp = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Help for bump!')
					.setAuthor('Help', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.addFields(
						{ name: 'Setup Bumping (please create channel called bump)', value: '"' + `${results[0].prefix}` + 'bumpsetup"', inline: false },
						{ name: 'Bump your ad (ever 2 hours)', value: '"' + `${results[0].prefix}` + 'bump"', inline: false },

					);
		
				

				const pages = {
					'⚙': {
						id: 'first-page', // Page id is used to navigate cross pages.
						embed: settingshelp,
						// Reactions to acess next sub-page


					},
					'⚒': {
						id: 'second-page',


						embed: moderationhelp,


					},
					'👋': {
						id: 'second-page',
						embed: welcomehelp,

					},

					'⬆': {
						id: 'second-page',
						embed: rankhelp,

					},
					'🤜': {
						id: 'second-page',
						embed: bumphelp,

					},
					

				};
				const botMessage = await msg.reply(settingsembed1);
				ReactionCollector.menu({ botMessage, user: msg.author, pages });
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'meme')) {
				const location1 = await ksoft.images.meme();
				const settingsembed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.addFields(
						{ name: location1.post.title, value: location1.post.subreddit, inline: false },
					)
				.setImage(location1.url)
				.setFooter('KSoft.Si')
				msg.channel.send(settingsembed)
				
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'help fun')) {
				
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
						{ name: 'Play Campaign', value: '"' + `${results[0].prefix}` + 'story"', inline: false },
						{ name: 'Hunting', value: '"' + `${results[0].prefix}` + 'hunt"', inline: false },
						{ name: 'Check your level', value: '"' + `${results[0].prefix}` + 'level"', inline: false },
						{ name: 'Profile', value: '"' + `${results[0].prefix}` + 'storyprofile"', inline: false },
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
						{ name: 'Create custom job in business (must be ceo)', value: '"' + `${results[0].prefix}` + 'create job <name> <money> <requiredhours>', inline: false },
						{ name: 'Check bank balance', value: '"' + `${results[0].prefix}` + 'bank	', inline: false },


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
						{ name: 'Fish', value: '"' + `${results[0].prefix}` + 'fish', inline: false },
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
				
					);
					const { ReactionCollector } = require('discord.js-collector')

					const botMessage = await msg.channel.send('Need help? Here list with all my commands!');
				ReactionCollector.paginator({
					botMessage,
					user: msg.author,
					pages: [
						funhelp,
						funhelp2,
						funhelp3,
				
					],
					collectorOptions: {
						time: 60000
					}
				});
		
			}
			if (msg.content === `${results[0].prefix}` + 'link') {
				if (results[0].link == 'null' || results[0].link == null) {
					msg.reply('Set the link by using .setlink!');
				}
				else {
					const settingsembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.addFields(
							{ name: 'Link', value: 'The link to join this server is ' + results[0].link, inline: true },
						);
					msg.channel.send(settingsembed);
				}
			}
			else if (msg.content === `${results[0].prefix}` + 'invite') {
				const settingsembed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.addFields(
						{ name: 'Link', value: 'The link to add this bot to your server is https://bit.ly/33ZqAS5', inline: true },
					);
				msg.channel.send(settingsembed);
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'profile1')) {
				var member = msg.mentions.users.first();
				member = msg.guild.member(member);
				const settingsembed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Profile for ' + `${member.user.username}` + '!')
					.setAuthor('Management', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
					.setColor('#0099ff')
					.addFields(
						{ name: 'Name', value: `${member.user.username}`, inline: true },
						{ name: 'Date of Creation', value: member.user.createdAt, inline: true },
					);
				const { Permissions } = require('discord.js');
				const permissions = new Permissions(msg.channel.permissionsFor(member));
				if (member.hasPermission('SEND_MESSAGES')) {
					settingsembed.addFields(
						{ name: '--------', value: 'Send Messages', inline: false },
					);
				}
				if (member.hasPermission('READ_MESSAGES')) {
					settingsembed.addFields(
						{ name: '--------', value: 'Read Messages', inline: false },
					);
				}
				if (member.hasPermission('DELETE_MESSAGES')) {
					settingsembed.addFields(
						{ name: '--------', value: 'Delete Messages', inline: false },
					);
				}
				if (member.hasPermission('CREATE_INVITE')) {
					settingsembed.addFields(
						{ name: '--------', value: 'Create Invites', inline: false },
					);
				}
				if (member.hasPermission('ADMINISTRATOR')) {
					settingsembed.addFields(
						{ name: '--------', value: 'Manage Messages', inline: false },
					);
				}
				if (member.permissions.has('MANAGE_MESSAGES')) {
					settingsembed.addFields(
						{ name: '--------', value: 'Manage Messages', inline: false },
					);
				}

				// 	);
				// for(var role in msg.guild.permissions) {
				// 	console.log(role);
				// 	if(msg.member.permissions.cache.has(role.id)) {
				// 		settingsembed.addFields(
				// 			{ name: 'Role', value: role, inline: false },

				// 		);
				// 	}
				// }
				settingsembed.setImage('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png');
				settingsembed.setTimestamp();

				msg.channel.send(settingsembed);
			}
			connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {
				if (results[0] != undefined && results[0] != null && results[0].coins < 0) {
					connection.query('update profiles set loan = ? where name = ?', [results[0].loan + Math.abs(results[0].coins), msg.member.user.username], function (error, results, fields) {
					});
					connection.query('update profiles set coins = ? where name = ?', [0, msg.member.user.username], function (error, results, fields) {
					});
				}
			});
			if (msg.content === `${results[0].prefix}` + 'bailout') {
				connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {
					connection.query('update bussiness set balance = ? where name = ?', [50000, results[0].bussiness], function (error, results, fields) {
					});
					connection.query('update bussiness set stockvalue = ? where name = ?', [50000, results[0].bussiness], function (error, results, fields) {
					});
					connection.query('update profiles set loan = ? where name = ?', [results[0].loan + 50000, msg.member.user.username], function (error, results, fields) {
					});
					connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {
						connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - 50000, results[0].bussiness], function (error, results, fields) {
						});
					});
				});
				msg.reply('Successfully bailed out business, thank the bank!');
			}
			if (msg.content === `${results[0].prefix}` + 'resetaccount') {
				
					connection.query('delete from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {
					});
					connection.query('delete from stocks where name = ?', [msg.member.user.username], function (error, results, fields) {
					});
					connection.query('delete from bussiness where owner = ?', [msg.member.user.username], function (error, results, fields) {
					});
					connection.query('insert into profiles(name, missionnumber, coins) values(?,?,?)', [msg.member.user.username, 1, 100], function (error, results, fields) {
					})
				
				
				
				msg.reply('Successfully reset your account!');
			}
			if (msg.content.startsWith(`${results[0].prefix}` + 'storyprofile') || msg.content.startsWith(`${results[0].prefix}` + 'bal')) {
				daily(msg)
				connection.query('select * from profiles where userid = ?', [msg.member.user.id], function (error, results1, fields) {
					if (results1[0] != undefined || results1[0] != null) {
						if (results1[0].name != results1[0].userid) {
							connection.query('update profiles set name = ? where userid = ?', [msg.member.user.username, msg.member.user.id], function (error, results, fields) {
							})
							connection.query('update bussiness set owner = ? where owner = ?', [msg.member.user.username, results1[0].name], function (error, results, fields) {
							})
								connection.query('update stocks set name = ? where name = ?', [msg.member.user.username, results1[0].name], function (error, results, fields) {
							})
						}
					}
					else {
						connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results3, fields) {
							if (results3[0] == undefined || results3[0] == null) {
								connection.query('insert into profiles(name, missionnumber, coins) values(?,?,?)', [msg.member.user.username, 1, 100], function (error, results, fields) {
								})
							}
						})
					}
				})
				var args = msg.content.split(' ').slice(1).join(' ');

				const user = msg.mentions.users.first();
				console.log(user);
				if (args == []) {
					connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {
						if (results[0] == undefined || results[0] == null) {
							connection.query('insert into profiles(name, missionnumber, coins) values(?,?,?)', [msg.member.user.username, 1, 100], function (error, results, fields) {
								connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {

									const settingsembed = new Discord.MessageEmbed()
										.setColor('#0099ff')
										.setTitle('Profile for ' + `${msg.member.user.username}` + '!')
										.setAuthor('Fun', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
										.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
										.setColor('#0099ff')
										.addFields(
											{ name: '<:name_tag:835170559406243861> Name', value: `${msg.member.user.username}`, inline: true },
											{ name: ':briefcase: Job', value: `${results[0].job}`, inline: true },

											{ name: ':clock4: Hours Worked', value: `${results[0].hours}`, inline: true },

										);


									settingsembed.addFields(
										{ name: '<:softwaresat:786624255861325845> Coins', value: `${results[0].coins}`, inline: true },
										{ name: ':bank: Bank Deposit', value: `${results[0].deposit}`, inline: true },
										{ name: '<a:moneyboi:839680207676899328> Outstanding Bank Loan', value: parseInt((results[0].loan - results[0].paidback)+results[0].loan*0.05).toString(), inline: true },


										{ name: ':books: Which Story is next?', value: `${results[0].missionnumber}`, inline: true },
									);

									msg.channel.send(settingsembed);
								});
							});
						}
						else {
							const settingsembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Profile for ' + `${msg.member.user.username}` + '!')
								.setAuthor('Fun', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
								.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
								.setColor('#0099ff')
								.addFields(
									{ name: '<:name_tag:835170559406243861> Name', value: `${msg.member.user.username}`, inline: true },
									{ name: ':briefcase: Job', value: `${results[0].job}`, inline: true },
									{ name: ':clock4: Hours Worked', value: `${results[0].hours}`, inline: true },

								);


							settingsembed.addFields(
								{ name: '<:softwaresat:786624255861325845> Coins', value: `${results[0].coins}`, inline: true },
								{ name: ':bank: Bank Deposit', value: `${results[0].deposit}`, inline: true },
								{ name: ':moneybag: Outstanding Bank Loan', value: parseInt((results[0].loan - results[0].paidback)+results[0].loan*0.05).toString(), inline: true },

								{ name: ':books: Which Story is next?', value: `${results[0].missionnumber}`, inline: true },
							);

							msg.channel.send(settingsembed);
						}
					});
				}
				else {
					connection.query('select * from profiles where name = ?', [user.username], function (error, results, fields) {
						if (results[0] == undefined || results[0] == null) {
							connection.query('insert into profiles(name, missionnumber, coins) values(?,?,?)', [user.username, 1, 100], function (error, results, fields) {
								connection.query('select * from profiles where name = ?', [user.username], function (error, results, fields) {

									const settingsembed = new Discord.MessageEmbed()
										.setColor('#0099ff')
										.setTitle('Profile for ' + `${user.username}` + '!')
										.setAuthor('Fun', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
										.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
										.setColor('#0099ff')
										.addFields(
											{ name: '<:name_tag:835170559406243861> Name', value: `${user.username}`, inline: true },
											{ name: ':briefcase: Job', value: `${results[0].job}`, inline: true },

											{ name: ':clock4: Hours Worked', value: `${results[0].hours}`, inline: true },

										);


									settingsembed.addFields(
										{ name: '<:softwaresat:786624255861325845> Coins', value: `${results[0].coins}`, inline: true },
										{ name: ':bank: Bank Deposit', value: `${results[0].deposit}`, inline: true },
										{ name: ':moneybag: Outstanding Bank Loan', value: parseInt((results[0].loan - results[0].paidback)+results[0].loan*0.05).toString(), inline: true },


										{ name: ':books: Which Story is next?', value: `${results[0].missionnumber}`, inline: true },
									);

									msg.channel.send(settingsembed);
								});
							});
						}
						else if (args != []) {
							const settingsembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Profile for ' + `${user.username}` + '!')
								.setAuthor('Fun', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
								.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
								.setColor('#0099ff')
								.addFields(
									{ name: 'Name', value: `${user.username}`, inline: true },
									{ name: 'Job', value: `${results[0].job}`, inline: true },
									{ name: 'Hours Worked', value: `${results[0].hours}`, inline: true },

								);


							settingsembed.addFields(
								{ name: 'Coins', value: `${results[0].coins}`, inline: true },
								{ name: 'Bank Deposit', value: `${results[0].deposit}`, inline: true },
								{ name: 'Outstanding Bank Loan', value: parseInt((results[0].loan - results[0].paidback)+results[0].loan*0.05).toString(), inline: true },

								{ name: 'Which Story is next?', value: `${results[0].missionnumber}`, inline: true },
							);

							msg.channel.send(settingsembed);
						}
					});
				}
			}
			else if (msg.content === `${results[0].prefix}` + 'mint' || msg.content === `${results[0].prefix}` + 'm' || msg.content === `${results[0].prefix}` + 'bank') {
				connection.query('select * from profiles where name = ?', ['bank'], function (error, results, fields) {


					connection.query('select * from profiles', ['bank'], function (error, results1, fields) {
						const cashflow = 0;
						// results1.forEach(result => {
						// 	cashflow = cashflow + 10000;
						// 	if(result.job == 'driver') {
						// 		cashflow = cashflow + ((result.stocks * 50) + (result.computer * 200) + 1000);
						// 	}
						// 	else if (result.job == 'developer') {
						// 		cashflow = cashflow + ((result.stocks * 50) + (result.computer * 200) + 500);

						// 	}
						// 	else if (result.job == 'police') {
						// 		cashflow = cashflow + ((result.stocks * 50) + (result.computer * 200) + 300);

						// 	}
						// 	else if (result.job == 'waiter') {
						// 		cashflow = cashflow + ((result.stocks * 50) + (result.computer * 200) + 100);

						// 	}

						// });
						const settingsembed1 = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle(':bank: The Bank!')
							.setAuthor('Fun', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
							.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
							.setColor('#0099ff')
							.addFields(
								{ name: 'Balance', value: '<:softwaresat:786624255861325845> ' + results[0].coins.toString(), inline: false },


							);
						msg.channel.send(settingsembed1);

					});


				});


			}
			else if (msg.content === `${results[0].prefix}` + 'etf') {
				connection.query('select * from profiles where name = ?', ['DGZ ETF'], function (error, results, fields) {


					connection.query('select * from profiles', ['bank'], function (error, results1, fields) {
						const cashflow = 0;
						// results1.forEach(result => {
						// 	cashflow = cashflow + 10000;
						// 	if(result.job == 'driver') {
						// 		cashflow = cashflow + ((result.stocks * 50) + (result.computer * 200) + 1000);
						// 	}
						// 	else if (result.job == 'developer') {
						// 		cashflow = cashflow + ((result.stocks * 50) + (result.computer * 200) + 500);

						// 	}
						// 	else if (result.job == 'police') {
						// 		cashflow = cashflow + ((result.stocks * 50) + (result.computer * 200) + 300);

						// 	}
						// 	else if (result.job == 'waiter') {
						// 		cashflow = cashflow + ((result.stocks * 50) + (result.computer * 200) + 100);

						// 	}

						// });
						const settingsembed1 = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('DGZ Stock Broker!')
							.setAuthor('Fun', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
							.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
							.setColor('#0099ff')
							.addFields(
								{ name: 'Balance', value: (results[0].coins+results[0].deposit).toString(), inline: false },


							);
						msg.channel.send(settingsembed1);

					});


				});


			}
			else if (msg.content == `${results[0].prefix}` + 'dep all' || msg.content == `${results[0].prefix}` + 'deposit all') {
				connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {
					connection.query('update profiles set deposit = ? where name = ?', [results[0].deposit + results[0].coins, msg.member.user.username], function (error, results, fields) {
					});
					connection.query('update profiles set coins = ? where name = ?', [0, msg.member.user.username], function (error, results, fields) {
					});
					connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

						connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + results[0].coins, 'bank'], function (error, results, fields) {
						});
					});
				})
				connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {

				const settingsembed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Deposited All')
				.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
				.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')			
					settingsembed.addFields(
						{ name: '🏛 Deposit', value:  (results[0].coins+results[0].deposit).toString(), inline: false },
						


					);	
					msg.channel.send(settingsembed)			

				
				})
			}
			else if (msg.content == `${results[0].prefix}` + 'with all' || msg.content == `${results[0].prefix}` + 'withdraw all') {
				connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {
					connection.query('update profiles set coins = ? where name = ?', [results[0].coins + results[0].deposit, msg.member.user.username], function (error, results, fields) {
					});
					connection.query('update profiles set deposit = ? where name = ?', [0, msg.member.user.username], function (error, results, fields) {
					});
					connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

						connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - results[0].deposit, 'bank'], function (error, results, fields) {
						});
					});
				})
				connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {

					const settingsembed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Withdrew All')
					.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
					.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')			
						settingsembed.addFields(
							{ name: '<:softwaresat:786624255861325845> Balance', value: (results[0].coins+results[0].deposit).toString(), inline: false },
							
	
	
						);	
						msg.channel.send(settingsembed)			
	
					
					})			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'deposit') || msg.content.startsWith(`${results[0].prefix}` + 'dep') && !msg.content.endsWith('all')) {
				const text = msg.content.split(' ').slice(1).join(' ');
				connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {
					if (parseInt(text) <= results[0].coins) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - parseInt(text), msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + parseInt(text), 'bank'], function (error, results, fields) {
							});
						});
						connection.query('update profiles set deposit=? where name=?', [results[0].deposit + parseInt(text), msg.member.user.username], async function (error, results, fields) {


						});

						const settingsembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Deposited Coins')
						.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
						.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')			
							settingsembed.addFields(
								{ name: '🏛 Deposit', value: (results[0].deposit+parseInt(text)).toString(), inline: false },
								{ name: '<:softwaresat:786624255861325845> Balance', value: (results[0].coins-parseInt(text)).toString(), inline: false },

		
		
							);	
							msg.channel.send(settingsembed)					}
					else {
						const errorembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Error')
						.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
							errorembed.addFields(
								{ name: '🏛', value: 'You don\'t have that many coins in your balance!', inline: false },
								
		
		
							);	
							msg.channel.send(errorembed)				
					}
				});
			}

			else if (msg.content.startsWith(`${results[0].prefix}` + 'loan')) {
				const text = msg.content.split(' ').slice(1).join(' ');
					connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {
						if (parseInt(text)+results[0].loan<=20000000) {
							connection.query('update profiles set deposit = ? where name = ?', [results[0].deposit + parseInt(text), msg.member.user.username], function (error, results, fields) {
							});
							if(results[0].bankmemership !='00-00-0000'){
								connection.query('update profiles set loan=? where name=?', [results[0].loan + (parseInt(text)*0.95), msg.member.user.username], async function (error, results, fields) {
								})
							}
							else{
								connection.query('update profiles set loan=? where name=?', [results[0].loan + parseInt(text), msg.member.user.username], async function (error, results, fields) {
								});
							}


							const settingsembed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle('🏛 New Loan')
				.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
				.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')			
					settingsembed.addFields(
						{ name: 'New Loan', value: text, inline: false },
						{ name: 'Total Loan', value: (results[0].loan+parseInt(text)).toString(), inline: false },
						{ name: 'Daily Payment', value: ((results[0].loan+parseInt(text))*0.05).toString(), inline: false },



					);	
					msg.channel.send(settingsembed)		

						}
						else {
							msg.reply('You cannot have a total loan amount of greater than 20M');
						}
					});
				
				
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'pay')) {
				const text = msg.content.split(' ').slice(1).join(' ');
				if (parseInt(text) > 0) {
					connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {

						connection.query('update profiles set coins = ? where name = ?', [results[0].coins - parseInt(text), msg.member.user.username], function (error, results, fields) {
						});

						connection.query('update profiles set paidback=? where name=?', [results[0].paidback + parseInt(text), msg.member.user.username], async function (error, results, fields) {


						});
					});
					connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {

						const settingsembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Loan Payment')
						.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
						.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')			
							settingsembed.addFields(
								{ name: '💰 Paid', value: text, inline: false },
								{ name: '📉 Outstanding Loan', value: parseInt((results[0].loan-results[0].paidback+(results[0].loan*0.05)-parseInt(text))).toString(), inline: false },

		
		
							);	
					
						msg.channel.send(settingsembed)					})
				}
				else {
					msg.reply('You cannot get money from your loan');
				}
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'withdraw') || msg.content.startsWith(`${results[0].prefix}` + 'with')) {
				const text = msg.content.split(' ').slice(1).join(' ');
				connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {
					if (results[0].deposit - parseInt(text) >= 0) {
						connection.query('update profiles set coins = ? where name = ?', [results[0].coins + parseInt(text), msg.member.user.username], function (error, results, fields) {
						});
						connection.query('select * from profiles where name = ?', ['bank'], function (error, results1, fields) {

							connection.query('update profiles set coins = ? where name = ?', [results1[0].coins - parseInt(text), 'bank'], function (error, results, fields) {
							});
						});
						connection.query('update profiles set deposit=? where name=?', [results[0].deposit - parseInt(text), msg.member.user.username], async function (error, results, fields) {


						});
						const settingsembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Withdrew Coins')
						.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
						.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')			
							settingsembed.addFields(
								{ name: '<:softwaresat:786624255861325845> Balance', value: (results[0].coins+parseInt(text)).toString(), inline: false },
								{ name: '🏛 Deposit', value: (results[0].deposit-parseInt(text)).toString(), inline: false },

		
		
							);	
							msg.channel.send(settingsembed)							}
					else {
						const errorembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Error')
						.setAuthor('Economy', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
							errorembed.addFields(
								{ name: '🏛', value: 'You don\'t have that many coins in the bank!', inline: false },
								
		
		
							);	
							msg.channel.send(errorembed)					}
				});
			}
			else if (msg.content === `${results[0].prefix}` + 'joblist') {
				connection.query('select * from settings where servername = ?', [msg.guild.name], function (error, results2, fields) {

					connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {

						const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Joblist (USE ' + results2[0].prefix + 'become <job>)')
							.setAuthor('Fun', 'https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png', 'https://www.softwaresatbot.weebly.com')
							.setThumbnail('https://media.discordapp.net/attachments/767413182708449310/775466980412620810/n9ZOe9YXUupaAAAAABJRU5ErkJggg.png')
							.setColor('#0099ff');

						connection.query('select * from jobs where business = ?', [results[0].bussiness], function (error, results1, fields) {
							settingsembed.addFields(
								{ name: 'Freelancer (id: freelancer)', value: 'Default Job: No pay, pay comes with stories and sudden jobs!', inline: false },
								// { name: 'Youtuber', value:'Starts out with no pay, over time with completed challenges you can grow (less risk)', inline: false },
								{ name: 'Developer (id: developer)', value: 'Has a set pay which rarely ever changes, very steady income of 500 coins per hour you work (5 required work hours)', inline: false },
								{ name: 'Waiter (id: waiter)', value: 'income of 100 coins per hour you work (2 required work hours) (30% chance of getting 1000 extra)', inline: false },
								{ name: 'Police Officer (id: police)', value: '300 coins per hour you work (no required work hours)', inline: false },
								{ name: 'Taxi Driver (id: driver)', value: '1000 coins per hour you work (no required work hours) (must have a car, found in shop)', inline: false },

								// { name: 'Businessman', value:'Starts out with -100 pay per day, with risk and challenges can grow to highest pay (most risk)', inline: false },

							);
							results1.forEach(result => {
								settingsembed.addFields(
									{ name: result.name, value: 'Pay: ' + result.pay + '\nRequired Hours: ' + result.requiredhours, inline: false },

								);

							});
							msg.channel.send(settingsembed);

						});


						// 	settingsembed.addFields(
						// 		{ name: 'Coins', value: `${results[0].coins}`, inline: false },
						// 		{ name: 'Which Story is next?', value: `${results[0].missionnumber}`, inline: false },
						// 	);

						// });
					});
				});
			}
			else if (msg.content === `${results[0].prefix}` + 'reminderforcopboy') {
				let guild = client.guilds.cache.get('732985419200856147');
				let channel = guild.channels.cache.find(ch => ch.name === '〚📣〛announcements');
				const settingsembed = new Discord.MessageEmbed()
				.setTitle('Softwaresat Bot')
				.setColor('#0099ff')
				.addFields(
					{ name: 'Features', value: 'Softwaresat Bot includes modern features such as moderation, utility, bumping, economy, choose your own adventure stories, and more!', inline: false },
					{ name: 'Server', value: 'To join our server use this link: https://discord.gg/7FhtS5e ', inline: false },
					{ name: 'Add Bot', value: 'To add our bot use this link: https://dsc.gg/software', inline: false },

				);	
				channel.send(settingsembed)	
				msg.reply('Sent')	
			}
			else if (msg.content === 'screateprofile') {
				serverName = msg.guild.name;
				msg.reply(serverName);
				connection.query('insert into settings(servername) values(?)', [serverName], function (error, results, fields) {
					msg.reply('I created the profile!');
				});
			}
			else if (msg.content === `${results[0].prefix}` + 'invitelink') {
				const channel = msg.channel;
				channel.createInvite({ unique: true })
					.then(invite => {
						msg.reply('Hey! I\'ve created you an invite: https://discord.gg/' + invite.code);
					});
			}
			if (msg.content === `${results[0].prefix}` + 'vote') {
				const settingsembed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.addFields(
						{ name: 'Upvote Our Bot', value: 'To upvote our bot, use this link:\n\n https://top.gg/bot/760654790522568735/vote', inline: true },
					);
				msg.channel.send(settingsembed);
			}
			if (msg.content === `${results[0].prefix}` + 'top.gg') {
				const settingsembed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.addFields(
						{ name: 'Top.gg', value: 'You can use this link to check out our bot at Top.gg:\n\n https://top.gg/bot/760654790522568735', inline: true },
					);
				msg.channel.send(settingsembed);
			}
			if (msg.content == `${results[0].prefix}` + 'server') {
				const settingsembed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.addFields(
						{ name: 'Join the Softwaresat Bot Official Discord Server', value: 'Join this server and get all of the updates for the bot, suggest new features, chat with others, and much more!!! \n https://discord.gg/T53pcs3', inline: true },
					);
				msg.channel.send(settingsembed);
			}
			// if (msg.content === `${results[0].prefix}` + 'setup') {
			// 	const setupembed = new Discord.MessageEmbed()
			// 		.setColor('#0099ff')
			// 		.addFields(
			// 			{ name: 'Setup', value: 'While there are many cool commands with our bot, these are the most important ones. Let\'s get started!\n\n To get started with our bot on your server, use "' + `${results[0].prefix}` + 'invite" to invite the bot.\n\n In your server, use "' + `${results[0].prefix}` + 'setprefix <prefix>"', inline: true },
			// 		);
			// 	msg.channel.send(setupembed);
			// 	 let settingsembed = new Discord.MessageEmbed()
			// 		.setColor('#0099ff')
			// 		.addFields(
			// 			{ name: 'Setup Continued', value: 'Now, use the "' + `${results[0].prefix}` + 'settings command to view all of the settings for your server.\n\n Now we can look at the new autorole command. If you would like for the bot to automatically add a role to people who join your server, use "' + `${results[0].prefix}` + 'setautorole <Name of the role (Do not mention the role)>. Or if you do not want this feature, skip.\n\n', inline: true },
			// 		);
			// 	msg.channel.send(settingsembed);
			// 	 settingsembed = new Discord.MessageEmbed()
			// 		.setColor('#0099ff')
			// 		.addFields(
			// 			{ name: 'Setup Continued', value: 'Now lets look at the cursing prevention command. To turn it on use "' + `${results[0].prefix}` + 'setcussing true" if you don\'t want it, use "' + `${results[0].prefix}` + 'setcussing false".  There is also a function which automatically deletes cursewords(Only if AutoCensor is enabled) To enable AutoDelete, use "' + `${results[0].prefix}` + 'setautodelete" true if you don\'t want it, use' + `${results[0].prefix}` + 'setautodelete false". \n\n Now let\'s head over to the automatic kicking function. This kicks a person if they get a certain amount of warnings. To use this function, use"' + `${results[0].prefix}` + 'setautokick true". If you don\'t want to use this function use "' + `${results[0].prefix}` + 'setautokick false". To set how many warnings till that person gets kicked, use "' + `${results[0].prefix}` + 'setkickthreshold <Any Number>"\n\n', inline: true },
			// 		);
			// 	msg.channel.send(settingsembed);
			// 	 settingsembed = new Discord.MessageEmbed()
			// 		.setColor('#0099ff')
			// 		.addFields(
			// 			{ name: 'Setup Continued', value: 'Alright, just a few more settings to configure and you are going to be well on your way!!!\n\n If you would like for people who are kicked to be able to return to your server, use "' + `${results[0].prefix}` + 'setautoinvitation true, if you don\'t want it, use "' + `${results[0].prefix}` + 'setautoinvitation false.\n\n That ends our session, so if you have any questions or suggests please contact our staff by joining our official server by using the' + `${results[0].prefix}` + 'server command. For more commands, use .help or go to our website at https://softwaresatbot.weebly.com/', inline: true },
			// 		);
			// 	msg.channel.send(settingsembed);
			// }
			else if (msg.content == `${results[0].prefix}` + 'debatetopic') {
				msg.reply('The Debate Topic Is: Nvidia 30 Series vs. Next-Gen Consoles!');
			}
			else if (msg.content == `${results[0].prefix}` + 'techdudes') {
				msg.reply('TechDudes is an amazing media company focusing on tech, made by Satvik Agarwal, Kapilesh Pennichetty, and Shashank Palukuri. Check out techdudes.netlify.app for details!');
			}
			else if (msg.content == `${results[0].prefix}` + 'website') {
				msg.reply('Satvik\'s website is located at softwaresat.onthewifi.com, sadly, you need to be his friend to get access! However, you can always try to hack your way in!');
			}
			else if (msg.content == `${results[0].prefix}` + 'helpwebsite') {
				msg.reply('Our website has a lot of useful information. Here is the link to it:\n\n https://softwaresatbot.weebly.com/');
			}
			else if (msg.content.startsWith(`${results[0].prefix}` + 'kick')) {
				if (msg.member.permissions.has('KICK_MEMBERS') || msg.member.user.id == 459185417678487552) {
					member = msg.mentions.users.first();
					text = msg.content.split(' ').slice(2).join(' ');
					const user = msg.mentions.users.first();
					if (user) {
						console.log(`${user.id}`);
						if (`${user.tag}` == 'satvikag#7832') {
							msg.reply('Sorry, this user is too precious!');
						}
						else if (`${user.username}` == 'ThyMaster555') {
							msg.reply('This user is under a protection spell from Satvik!');
						}
						else if (`${user.tag}` != 'satvikag#7832' & `${user.tag}` != 'ThyMaster555#5555') {
							const user = msg.mentions.users.first();
							const member = msg.guild.member(user);
							member
								.kick('Optional reason that will display in the audit logs')
								.then(() => {
									channel = member.guild.channels.cache.find(ch => ch.name === `${results[0].logchannel}`);
									if (channel) {
										const settingsembed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle(`<a:yes:834458079557845012> Successfully kicked ${user.tag}`)
											.addFields(
												{ name: 'Kicked', value: `${member} for ${text}`, inline: false },
											)
											.setTimestamp();
										// member.send(settingsembed);
										msg.channel.send(settingsembed);
										member.send('You have been kicked from ' + msg.guild.name + ` for ${text}!`)


									}
								})

								.catch(err => {
									msg.reply('I was unable to kick the member');
									console.error(err);
								});
						}
						else {
							msg.reply('That user isn\'t in this guild!');
						}
					}
					else {
						msg.reply('You didn\'t mention the user to kick!');
					}
				}
				else {
					msg.reply('You don\'t have sufficient permissions');
				}
			}
			
			else if (msg.content.startsWith(`${results[0].prefix}` + 'ban') && !msg.content.startsWith(`${results[0].prefix}` + 'bank')) {
				if (msg.member.permissions.has('BAN_MEMBERS')) {
					text = msg.content.split(' ').slice(2).join(' ');
					const user = msg.mentions.users.first();
					if (user) {
						const member = msg.guild.member(user);
						if (`${user.tag}` == 'satvikag#7832') {
							msg.reply('Sorry, this user is too precious!');
						}
						else if (`${user.username}` == 'ThyMaster555') {
							msg.reply('This user is under a protection spell from Satvik');
						}

						else if (`${user.tag}` != 'satvikag#7832') {
							member
								.ban({
									reason: 'Not specified!',
								})
								.then(() => {
									msg.reply(`Successfully banned ${user.tag}`);
									channel = member.guild.channels.cache.find(ch => ch.name === `${results[0].logchannel}`);
									if (channel) {
										const settingsembed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle(`<a:yes:834458079557845012> Successfully banned ${user.tag}`)
											.addFields(
												{ name: 'Banned', value: `${member} for ${text}`, inline: false },
											)
											.setTimestamp();
										// member.send(settingsembed);
										msg.channel.send(settingsembed);
										member.send('You have been banned from ' + msg.guild.name + ` for ${text}!`)
									}
								})
								.catch(err => {
									msg.reply('I was unable to ban the member');
									console.error(err);
								});
						}
						else {
							msg.reply('That user isn\'t in this guild!');
						}
					}
					else {
						msg.reply('You didn\'t mention the user to ban!');
					}
				}
				else {
					msg.reply('You don\'t have sufficient permissions');
				}
			} else if (msg.content.startsWith(`${results[0].prefix}` + `serverinfo`)) {
				let inline = true
				let icon = msg.guild.iconURL
				let members = await msg.guild.members.cache.filter(member => !member.user.bot).size
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
			}

			else if (`${results[0].autorespond}` == '1' && msg.channel.name.includes('spam')) {
				// let shouldSkip = false;
        let msglist = []
				connection.query('select * from autorespond', [msg.content.toLowerCase()], function (error, results1, fields) {
					results1.forEach(result => {
				
						if(msg.content.toLowerCase().includes(result.message.toLowerCase())){
              msglist.push(result.response)

						}
     

					});
          let number = Math.random() * Math.floor(msglist.length)
         
          msg.channel.send(msglist[Math.floor(number)])
				if(msg.content.startsWith('.add')){
					var args = msg.content.split(' ').slice(1).join(' ');

					connection.query('insert into autorespond(message, response) values(?,?)', [args, 'pending'], function (error, results1, fields) {

					})
					msg.reply('added to database')
				}
				if(msg.content.startsWith('.response')){
					var args = msg.content.split(' ').slice(1).join(' ');

					connection.query('update autorespond set response = ? where response = ?', [args, 'pending'], function (error, results1, fields) {

					})
					msg.reply('added to database')
				}
				})
			}
			if (msg.mentions.users.has(client.user.id) && !msg.author.bot) {
				msg.reply(`my prefix here is ${results[0].prefix}`)
				return
			  };
		});
	}
});

client.login('NzYwNjU0NzkwNTIyNTY4NzM1.X3PM-g.LhJMAdv4fA9P0s5ofhfz49znuyI');
