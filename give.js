/* eslint-disable no-unused-vars */
module.exports = {
	name: 'give',
	description: 'Give users money!',
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
    //     const member = msg.mentions.users.first();
    //             const text = msg.content.split(' ').slice(2).join(' ');
    //             console.log(text)
				// connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {

    //     connection.query('Select * from profiles where name = ?', [member.username], function (error, results5, fields) {
    //         msg.channel.send('Connecting to Encrypted Network <a:loading:841851298583150642>').then(msg => {
    //                       setTimeout(() => { msg.edit('Encrypted Connection Acquired <a:check:773624930582396928>'); }, 5000);
    //         if (results5[0] != undefined && results5[0] != null) {
                   
    //                 if (results[0].coins - parseInt(text) >= 0 && parseInt(text) > 0) {
                        

    //                     connection.query('update profiles set coins = ? where name = ?', [results5[0].coins + parseInt(text), member.username], function (error, results, fields) {
    //                     });
    //                     connection.query('update profiles set coins = ? where name = ?', [results[0].coins - parseInt(text), msg.member.user.username], function (error, results, fields) {
    //                     });

    //                     // var pMessage = msg.reply('Successfully wired to the person\'s account!');
    
    //                   setTimeout(() => { msg.edit(`Attempting Wire Transfer of **${text} coin(s)** to **${member.username}** <a:loading:841851298583150642>`); }, 5000);
    //                   setTimeout(() => { msg.edit(`Wire Transfer Success <a:check:773624930582396928>`); }, 5000);
    //                   setTimeout(() => { msg.edit(`Succesfully Wire Transferred **${text} coins** to ${member.username} <a:check:773624930582396928>`); }, 5000);
                           
    //                 }
    //                 else {
    //                     // msg.reply('You don\'t have sufficient funds!')
    //                     setTimeout(() => { msg.edit(`Wire Transfer Failed. Please ensure the right amount of money is in your bank account :x:`); }, 5000);
    //                 }
                
    //         }
    //         else {
    //             setTimeout(() => { msg.edit('Wire Transfer Failed. The specified person does not have an account, tell them to `bal` to make it! :x:'); }, 2000);
    //             // msg.reply('The specified person does not have an account, tell them to view their balance to make it!')
    //         }
    //     })
    //     })
    //     })
    const member = msg.mentions.users.first();
	console.log(member == msg.member)
			if(member != msg.member.user){
				connection.query('Select * from profiles where name = ?', [member.username], function (error, results5, fields) {
					if (results5[0] != undefined && results5[0] != null) {
						const text = msg.content.split(' ').slice(2).join(' ');
						connection.query('Select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {
							if (results[0].coins - parseInt(text) >= 0 && parseInt(text) > 0) {
								connection.query('update profiles set coins = ? where name = ?', [results[0].coins - parseInt(text), msg.member.user.username], function (error, results, fields) {
								});


								connection.query('update profiles set coins = ? where name = ?', [results5[0].coins + parseInt(text), member.username], function (error, results, fields) {
								});

								msg.reply('Successfully wired to the person\'s account!');
							}
							else {
								msg.reply('You don\'t have sufficient funds!')
							}
						})
					}
					else {
						msg.reply('The specified person does not have an account, tell them to view their balance to make it!')
					}
				})
			}
	},
};