/* eslint-disable no-unused-vars */
module.exports = {
	name: 'inventory',
	description: 'Ping!',
	execute(msg, args) {
        const Discord = require('discord.js')
		const client = msg.client;
		const mysql = require('mysql');
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'latehome4',
			database:'discord',
			charset : 'utf8mb4',
		});
		connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {


					const firstembed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Inventory!');
					if (`${results[0].woodensword}` == '1') {
						firstembed.addFields(
							{ name: ':crossed_swords: Wooden Sword', value: 'Can destroy enemies after lots of hits!', inline: false },
						);
					}
					if (`${results[0].huntingrifle}` == '1') {
						firstembed.addFields(
							{ name: '<:rifle_1f946:851834804277084161> Hunting Rifle', value: 'Used to kill enemies from afar!', inline: false },
						);
					}
					if (`${results[0].shotgun}` == '1') {
						firstembed.addFields(
							{ name: ':gun: Shotgun', value: 'Used to kill enemies from up close!', inline: false },
						);
					}
					if (`${results[0].arrow}` == '1') {
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
      if (`${results[0].robbinginsurance}` != '00-00-0000') {
						firstembed.addFields(
							{ name: '🕵️‍♂️ Robbing Insurance', value: 'Purchased '+results[0].robbinginsurance, inline: false },
						);
					}
       if (`${results[0].thievesinsurance}` != '00-00-0000') {
						firstembed.addFields(
							{ name: '🦹‍♂️ Thieves Insurance', value: 'Purchased '+results[0].thievesinsurance, inline: false },
						);
					}
					if (`${results[0].icon}` >= '1') {
						firstembed.addFields(
							{ name: '<:Softwaresat:786624255861325845> Softwaresat Icon', value: results[0].icon.toString(), inline: false },
						);
					}
					if (`${results[0].cgem}` >= '1') {
						firstembed.addFields(
							{ name: '<:gemstonel3g:846424175362834464> Common Gem', value: results[0].cgem.toString(), inline: false },
						);
					}
					if (`${results[0].rgem}` >= '1') {
						firstembed.addFields(
							{ name: '<:gemstonedxx:846424049147707402> Rare Gem', value: results[0].rgem.toString(), inline: false },
						);
					}
					if (`${results[0].ssword}` >= '1') {
						firstembed.addFields(
							{ name: '<:PepeKnight:834473180168060968> Softwaresat Sword', value: results[0].ssword.toString(), inline: false },
						);
					}
					if (`${results[0].medal}` >= '1') {
						firstembed.addFields(
							{ name: ':medal: Softwaresat Medal', value: results[0].medal.toString(), inline: false },
						);
					}
					if (`${results[0].crown}` >= '1') {
						firstembed.addFields(
							{ name: '<:b91b84189df193c557445b277fe82295:846423750727696445> Crown', value: results[0].crown.toString(), inline: false },
						);
					}
					msg.reply(firstembed);
		});

	},
};