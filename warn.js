/* eslint-disable no-unused-vars */
module.exports = {
	name: 'warn',
	description: 'Warn users!',
	async execute(msg, args) {
		const client = msg.client;
		const mysql = require('mysql');
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'latehome4',
			database:'discord',
			charset : 'utf8mb4',
		});
        let member = msg.mentions.users.first();

        connection.query('Select * from settings where servername = ?', [msg.guild.name], async function (error, results, fields) {
            channel = msg.member.guild.channels.cache.find(ch => ch.name === `${results[0].logchannel}`);
            if (msg.member.permissions.has('KICK_MEMBERS') || msg.member.user.username == 'satvikag') {
                text = msg.content.split(' ').slice(2).join(' ');
                member = msg.mentions.users.first();
                if ((member == undefined && args[0] == undefined)|| text == undefined) {
                    msg.reply('Check your syntax!');
                }
                else {
                    if(member == undefined && args[0] != undefined){
		        	member = await client.users.fetch(args[0]);
		}
                    member.send('Hey you, my boss has warned you for ' + text + '!');
                    msg.channel.send(' Warning Successfully Sent!');
                    if (channel != undefined) {
                        channel.send('Warning sent to ' + `${member.username}` + ' for ' + text + '!');
                    }
                    var text = msg.content.split(' ').slice(2).join(' ');
                    member = `${member.id}`;
                    connection.query('insert into warnings(name,reason) values(?,?)', [member, text], function (error, results, fields) {
                    });
                    console.log(member);
                    connection.query('select count(*) as num from warnings where name =?', [member], function (error, results, fields) {
                        amount = parseInt(`${results[0].num}`);
                        if (amount >= 6) {
                            member = msg.mentions.users.first();
                            connection.query('select link from settings where servername = ?', [msg.guild.name], function (error, results2, fields) {
                                member.send('Do you want to join back to the server? (don\'t do your mistake again) ' + `${results2[0].link}`);
                            });
                            const user = msg.mentions.users.first();
                            var member = msg.guild.member(user);
                            member
                                .kick('Optional reason that will display in the audit logs')
                                .then(() => {
                                    // We let the message author know we were able to kick the person
                                    msg.reply(`Successfully kicked ${user.username}`);
                                    channel = member.guild.channels.cache.find(ch => ch.name === `${results[0].settings}`);
                                    member = `${msg.mentions.users.first().id}`;
                                    connection.query('delete from warnings where name = ?', [member], function (error, results, fields) {
                                        console.log('Deleted all records!');
                                    });
                                    if (channel) {
                                        channel.send(`Sucessfullly kicked ${user.username}`);
                                    }
                                    else {
                                        msg.reply('Please set a logging channel in the settings!');
                                    }
                                })
                                .catch(err => {
                                    msg.reply('I was unable to kick the member');
                                    // Log the error
                                    console.error(err);
                                });
                        }
                    });
                }
            }
            else {
                msg.reply('You don\'t have sufficient permissions');
            }
        })
	},
};