/* eslint-disable no-unused-vars */
module.exports = {
	name: 'image',
	description: 'get the image of your choice with search',
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
        fetch('https://source.unsplash.com/800x600/?' + msg.content.split(' ').slice(1).join(' '))
        .then((response) => {
            msg.channel.send((response.url));
        })
        .then((myContent) => {
        });
	},
};