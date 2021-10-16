/* eslint-disable no-unused-vars */
module.exports = {
	name: 'shop',
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
                            { name: '🛒 Subscriptions', value: 'use subscriptions command', inline: false },
                            { name: ':fishing_pole_and_fish: Fishing Pole', value: '$5000, id: fishingpole', inline: false },
                            { name: ':crossed_swords: Wooden Sword', value: '$50, id: woodensword', inline: false },
                            { name: ':dagger: Iron Sword', value: '$100, id: ironsword', inline: false },
                            { name: '<:mcsword:808798600851226635> Diamond Sword', value: '$1000, id: diamondsword', inline: false },
                            { name: ':gun: Shotgun', value: '$100, id: shotgun', inline: false },
                            { name: '<:rifle_1f946:851834804277084161> Hunting Rifle', value: '$100, id: huntingrifle', inline: false },
                            { name: ':shield: Shield', value: '$500, id: shield', inline: false },
                            { name: ':race_car: Car', value: '$20000, id: car', inline: false },
                            { name: '<:Softwaresat:786624255861325845> Softwaresat icon', value: '$100, id: icon', inline: false },
                            { name: '<:gemstonel3g:846424175362834464> Common Gem', value: '$100000, id: cgem', inline: false },
                            { name: '<:gemstonedxx:846424049147707402> Rare Gem', value: '$500000, id: rgem', inline: false },
                            { name: '<:PepeKnight:834473180168060968> Softwaresat Sword', value: '$5000000, id: ssword', inline: false },
                            { name: ':medal: Softwaresat Medal', value: '$10000000, id: medal', inline: false },
                            { name: ':crown: Softwaresat Crown', value: '$50000000, id: crown', inline: false },


                        );
                    msg.channel.send(firstembed);
                });
            });
        });
	},
};