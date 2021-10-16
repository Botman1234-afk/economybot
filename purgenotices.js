/* eslint-disable no-unused-vars */
module.exports = {
	name: 'purgenotices',
	description: 'Delete warnings for a user',
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
        const person = msg.mentions.users.first();
        serverName = msg.guild.name;
        if (msg.member.permissions.has('ADMINISTRATOR')) {
            connection.query('delete from warnings where name = ?', [parseInt(`${person.id}`)], function (error, results, fields) {
                msg.channel.send('Successfully deleted warnings!');
            });
        }
        else {
            msg.reply('Sorry, you don\'t have sufficient permissions');
        }
	},
};