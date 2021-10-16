/* eslint-disable no-unused-vars */
module.exports = {
	name: 'randomimage',
	description: 'Get a random image!',
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
        const fetch = require('node-fetch');
        fetch('https://source.unsplash.com/random/800x600')
        .then((response) => {
            msg.channel.send((response.url));
        })
        .then((myContent) => {
        });
	},
};