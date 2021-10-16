/* eslint-disable no-unused-vars */
module.exports = {
	name: 'mute',
	description: 'Mute a person',
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
	},
};