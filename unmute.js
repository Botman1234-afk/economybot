/* eslint-disable no-unused-vars */
module.exports = {
	name: 'unmute',
	description: 'Unmute a person',
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
        connection.query('select * from settings where servername = ?', [msg.guild.name], async (error, results, fields) => {

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
    })
	},
};