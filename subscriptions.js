/* eslint-disable no-unused-vars */
module.exports = {
	name: 'subscriptions',
	description: 'here are all the subscriptions we have to offer!',
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
           const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('🥇 Premium Subscriptions')
								.addFields(
									{ name: ':bank: Bank Membership (NEW)', value: '$500k Per Month (no interest on loans) id: bank membership' , inline: false },
									{ name: ':detective: Robbing Insurance (NEW)', value: '$1M per month(you cannot get robbed), id: robbing insurance', inline: false },
									{ name: ':supervillain: Thieves Insurance (NEW)', value: '$500k per month(you lose 1/2 as much when getting caught), id: thieves insurance', inline: false },
									{ name: ':levitate: Business Insurance (COMING SOON)', value: '$500k per month(if your business goes bankrupt, the bank will give you $500k), id: workspace', inline: false },


								);
							msg.channel.send(firstembed);
	},
};