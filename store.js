/* eslint-disable no-unused-vars */
module.exports = {
	name: 'store',
	description: 'Check the economy store',
	async execute(msg, args) {
		const client = msg.client;
		const mysql = require('mysql');
        const Discord = require('discord.js')
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'latehome4',
			database:'discord',
			charset : 'utf8mb4',
		});
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
                            { name: ':money_with_wings: Bonds for the bank', value: '$200 (increase income by $10), id: bonds', inline: false },
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
	},
};