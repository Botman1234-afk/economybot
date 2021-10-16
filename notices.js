/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
module.exports = {
	name: 'notices',
	description: 'Ping!',
	async execute(msg, args) {
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
		let member = msg.mentions.users.first();
		
		if(member == undefined && args[0] == undefined) {
			msg.reply('Is this member in the server?');
		}
		else{
			if(member == undefined && args[0] != undefined){
			member = await client.users.fetch(args[0]);
		}
			console.log(member);
			connection.query('select count(*) as num from warnings where name =?', [`${member.id}`], function(error, results, fields) {
				connection.query('select reason from warnings where name =?', [`${member.id}`], function(error, results1, fields) {
					if(results == undefined) {
						msg.reply('This person has 0 warnings!');
					}
					else{
						msg.channel.send(`${member.username}` + ' has ' + results[0].num + ' warnings!');
						const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff');

						results1.forEach(result => {
							console.log(result.reason);
							if(`${result.reason}` == undefined || `${result.reason}` == 'undefined' || `${result.reason}` == [] || `${result.reason}` == '[]' || `${result.reason}` == ' ' || `${result.reason}` == null) {
								settingsembed.addFields(
									{ name: 'Reason', value:'None Given', inline: false },
								);
							}
							else{
								settingsembed.addFields(
									{ name: 'Reason', value:`${result.reason}`, inline: false },
								);
							}
						});

						msg.channel.send(settingsembed);

					}
				});
			});
		}

	},
};