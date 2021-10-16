/* eslint-disable no-unused-vars */
module.exports = {
	name: 'employees',
	description: 'Check yor employees!',
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
		connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results3, fields) {

            connection.query('select * from profiles where bussiness = ?', [results3[0].bussiness], function (error, results2, fields) {
                    embed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('Business Employees');
                    var place = 0;
                    results2.forEach(result => {
                        place++;
                        if (place <26) {
                            embed.addFields(
                                { name: result.name, value: result.job, inline: false },


                            );
                        }
                    

                    });
                    msg.channel.send(embed);
                
            });
        })
	},
};