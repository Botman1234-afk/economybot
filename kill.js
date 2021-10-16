module.exports = {
	name: 'kill',
	description: 'KILL SOMEONE!',
	execute(msg, args) {
		const client = msg.client;
		const Discord = require('discord.js');
		const mysql = require('mysql');
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'latehome4',
			database:'discord',
			charset : 'utf8mb4',
		});
            const Responses = [
                "DEAD",
                "MORE DEAD"
    
            ];

            const Response = Math.floor(Math.random() * Responses.length);

            console.log(Responses[Response])
	            },
            };