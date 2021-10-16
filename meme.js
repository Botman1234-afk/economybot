/* eslint-disable no-unused-vars */
module.exports = {
	name: 'meme',
	description: 'Get a meme from reddit!',
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
        const location1 = await ksoft.images.meme();
        const settingsembed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .addFields(
                { name: location1.post.title, value: location1.post.subreddit, inline: false },
            )
        .setImage(location1.url)
        .setFooter('KSoft.Si')
        msg.channel.send(settingsembed)
	},
};