/* eslint-disable no-unused-vars */
module.exports = {
	name: 'ip',
	description: 'Get the location for an ip address',
	args: true,
	usage: '<ipaddress>',
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
        const { KSoftClient } = require('@ksoft/api');
        const fetch = require('node-fetch');
        const ksoft = new KSoftClient('5b30001a5f870239da1ae841ecc541eabfc038c7');
        const location1 = await ksoft.kumo.geoip(msg.content.split(' ').slice(1).join(' '));
	
				const settingsembed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.addFields(
						{ name: 'Latitude: '+location1.location.lat.toString()+', Longitude: '+location1.location.lon.toString(), value: location1.map, inline: false },
					)
				.setFooter('KSoft.Si')
					msg.channel.send(settingsembed)
	},
};