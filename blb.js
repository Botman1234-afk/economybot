/* eslint-disable no-unused-vars */
module.exports = {
	name: 'blb',
	description: 'Check the leaderboard for a specific stock!',
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
		var number = 0;

		var text = msg.content.slice(5).trim().split(' ');

				connection.query('select * from stocks where business = ? order by number desc', [text[0] + ' ' + text[1] + ' ' + text[2]], function (error, results2, fields) {
					if (results2[0] != undefined && results2[0] != null) {
						let embed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Leaderboard for Business Shares');
						var place = 0;
							results2.forEach(result => {
							number = number + result.number;
						});
						results2.forEach(result => {
							place++;
							function number_format(val, decimals){
							    //Parse the value as a float value
							    val = parseFloat(val);
							    //Format the value w/ the specified number
							    //of decimal places and return it.
							    return val.toFixed(decimals);
							}
							if(result.number > 0){
							if (place > 3) {
								embed.addFields(
									{ name: place + '. ' + result.name, value: 'Shares: ' + result.number+'\nPercentage of Company: '+number_format((result.number/number)*100,0)+'%', inline: false },


								);
							}
							else if (place == 1) {
								embed.addFields(
									{ name: '🥇 ' + result.name, value:'Shares: ' + result.number+'\nPercentage of Company: '+number_format((result.number/number)*100,0)+'%', inline: false },


								);
							}
							else if (place == 2) {
								embed.addFields(
									{ name: '🥈 ' + result.name, value: 'Shares: ' + result.number+'\nPercentage of Company: '+number_format((result.number/number)*100,0)+'%', inline: false },


								);
							}
							else if (place == 3) {
								embed.addFields(
									{ name: '🥉 ' + result.name, value: 'Shares: ' + result.number+'\nPercentage of Company: '+number_format((result.number/number)*100,0)+'%', inline: false },


								);
							}
}
						});
						msg.channel.send(embed);
					}
					else {
						msg.reply('The specified business does not exist!')
					}
				});


	},
};