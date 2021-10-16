/* eslint-disable no-unused-vars */
module.exports = {
	name: 'housingmarket',
	description: 'See the list of houses you can buy!',
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

	},
};