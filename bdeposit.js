/* eslint-disable no-unused-vars */
module.exports = {
	name: 'bdeposit',
	description: 'Deposit coins to your business!',
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
        connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {
                        connection.query('select * from bussiness where name = ?', [results[0].bussiness], function (error, results1, fields) {
                                if(results[0].coins >= parseInt(args) || results[0].bussiness == 'undefined' || results[0].bussiness == undefined){

                connection.query('update bussiness set balance = ? where name = ?', [results1[0].balance+parseInt(args), results[0].bussiness], function (error, results, fields) {
                });
                
                connection.query('update profiles set coins=? where name=?', [results[0].coins - parseInt(args), msg.member.user.username], async function (error, results, fields) {


                });
                msg.reply('Successfully deposited!');
    
                                }
                                else{
                                    msg.reply('You don\'t have that many coins or you\'re not in a business')
                                }
                        })
                        
                        
           
        });

	},
};