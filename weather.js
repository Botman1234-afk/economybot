/* eslint-disable no-unused-vars */
module.exports = {
	name: 'weather',
	description: 'Check the weather for a specific place',
	execute(msg, args) {
		const client = msg.client;
		const mysql = require('mysql');
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'latehome4',
			database:'discord',
			charset : 'utf8mb4',
		});
        const fetch = require('node-fetch')
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + msg.content.split(' ').slice(1).join(' ') + '&APPID=2bd6e1bc46d11bc218976a9eb3c1ab61')
        .then(response => response.json())
        .then(data => {
            const settingsembed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Weather')
                .addFields(
                    { name: 'Description ☁', value: data['weather'][0]['description'], inline: true },
                    { name: 'Temperature 🌡', value: parseInt((9 / 5 * data['main']['temp'] - 459.67)).toString() + '°', inline: true },
                    { name: 'Min 📈', value: parseInt((9 / 5 * data['main']['temp_min'] - 459.67) + '°').toString() + '°', inline: true },
                    { name: 'Max 📉', value: parseInt((9 / 5 * data['main']['temp_max'] - 459.67) + '°').toString() + '°', inline: true },
                    { name: 'Feels like 😰', value: parseInt((9 / 5 * data['main']['feels_like'] - 459.67) + '°').toString() + '°', inline: true },
                    { name: 'Humidity 💧', value: parseInt(data['main']['humidity']).toString(), inline: true },
                    { name: 'Wind Speed 💨', value: parseFloat(data['wind']['speed']).toString(), inline: true },
                    


                );
            msg.channel.send(settingsembed);
        })

        .catch(err => {
            msg.channel.send('An error has occured!');

        });
	},
};