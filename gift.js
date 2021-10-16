/* eslint-disable no-unused-vars */
module.exports = {
	name: 'gift',
	description: 'Gift people items!',
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
		const member = msg.mentions.users.first();
				var text = msg.content.slice(6).trim().split(' ');
				console.log(text)
			
				connection.query('Select * from profiles where name = ?', [member.username], function (error, results5, fields) {
					connection.query('Select * from profiles where name = ?', [msg.member.user.username], function (error, results, fields) {

					if(text[1] == 'computer' && results[0].computer >=text[0]){
						connection.query('update profiles set computer = ? where name = ?', [results[0].computer - parseInt(text[0]), msg.member.user.username], function (error, results, fields) {
						});


						connection.query('update profiles set computer = ? where name = ?', [results5[0].computer + parseInt(text[0]), member.username], function (error, results, fields) {
						});
						msg.reply('Successfully gifted!')

					}
					else if(text[1] == 'workspace' && results[0].workspace >=text[0]){
						connection.query('update profiles set workspace = ? where name = ?', [results[0].workspace - parseInt(text[0]), msg.member.user.username], function (error, results, fields) {
						});


						connection.query('update profiles set workspace = ? where name = ?', [results5[0].workspace + parseInt(text[0]), member.username], function (error, results, fields) {
						});
						msg.reply('Successfully gifted!')

					}
					else if(text[1] == 'smallhouse' && results[0].smallhouse >=text[0]){
						connection.query('update profiles set smallhouse = ? where name = ?', [results[0].smallhouse - parseInt(text[0]), msg.member.user.username], function (error, results, fields) {
						});


						connection.query('update profiles set smallhouse = ? where name = ?', [results5[0].smallhouse + parseInt(text[0]), member.username], function (error, results, fields) {
						});
						msg.reply('Successfully gifted!')

					}
					else if(text[1] == 'mediumhouse' && results[0].mediumhouse >=text[0]){
						connection.query('update profiles set mediumhouse = ? where name = ?', [results[0].mediumhouse - parseInt(text[0]), msg.member.user.username], function (error, results, fields) {
						});


						connection.query('update profiles set mediumhouse = ? where name = ?', [results5[0].mediumhouse + parseInt(text[0]), member.username], function (error, results, fields) {
						});
						msg.reply('Successfully gifted!')

					}
					else if(text[1] == 'largehouse' && results[0].largehouse >=text[0]){
						connection.query('update profiles set largehouse = ? where name = ?', [results[0].largehouse - parseInt(text[0]), msg.member.user.username], function (error, results, fields) {
						});


						connection.query('update profiles set largehouse = ? where name = ?', [results5[0].largehouse + parseInt(text[0]), member.username], function (error, results, fields) {
						});
						msg.reply('Successfully gifted!')

					}
					else if(text[1] == 'bonds' && results[0].bonds >=text[0]){
						connection.query('update profiles set bonds = ? where name = ?', [results[0].bonds - parseInt(text[0]), msg.member.user.username], function (error, results, fields) {
						});


						connection.query('update profiles set bonds = ? where name = ?', [results5[0].bonds + parseInt(text[0]), member.username], function (error, results, fields) {
						});
						msg.reply('Successfully gifted!')

					}
					else if(text[1] == 'fishingpole' && results[0].fishingpole >=text[0]){
						connection.query('update profiles set fishingpole = ? where name = ?', [results[0].fishingpole - parseInt(text[0]), msg.member.user.username], function (error, results, fields) {
						});


						connection.query('update profiles set fishingpole = ? where name = ?', [results5[0].fishingpole + parseInt(text[0]), member.username], function (error, results, fields) {
						});
						msg.reply('Successfully gifted!')

					}
					else if(text[1] == 'crown' && results[0].crown >=text[0]){
						connection.query('update profiles set crown = ? where name = ?', [results[0].crown - parseInt(text[0]), msg.member.user.username], function (error, results, fields) {
						});


						connection.query('update profiles set crown = ? where name = ?', [results5[0].crown + parseInt(text[0]), member.username], function (error, results, fields) {
						});
						msg.reply('Successfully gifted!')

					}
					else if(text[1] == 'medal' && results[0].medal >=text[0]){
						connection.query('update profiles set medal = ? where name = ?', [results[0].medal - parseInt(text[0]), msg.member.user.username], function (error, results, fields) {
						});


						connection.query('update profiles set medal = ? where name = ?', [results5[0].medal + parseInt(text[0]), member.username], function (error, results, fields) {
						});
						msg.reply('Successfully gifted!')

					}
					else if(text[1] == 'ssword' && results[0].ssword >=text[0]){
						connection.query('update profiles set ssword = ? where name = ?', [results[0].ssword - parseInt(text[0]), msg.member.user.username], function (error, results, fields) {
						});


						connection.query('update profiles set ssword = ? where name = ?', [results5[0].ssword + parseInt(text[0]), member.username], function (error, results, fields) {
						});
						msg.reply('Successfully gifted!')

					}
					else if(text[1] == 'rgem' && results[0].rgem >=text[0]){
						connection.query('update profiles set rgem = ? where name = ?', [results[0].rgem - parseInt(text[0]), msg.member.user.username], function (error, results, fields) {
						});


						connection.query('update profiles set rgem = ? where name = ?', [results5[0].rgem + parseInt(text[0]), member.username], function (error, results, fields) {
						});
						msg.reply('Successfully gifted!')

					}
					else if(text[1] == 'cgem' && results[0].cgem >=text[0]){
						connection.query('update profiles set cgem = ? where name = ?', [results[0].cgem - parseInt(text[0]), msg.member.user.username], function (error, results, fields) {
						});


						connection.query('update profiles set cgem = ? where name = ?', [results5[0].cgem + parseInt(text[0]), member.username], function (error, results, fields) {
						});
						msg.reply('Successfully gifted!')

					}
					else if(text[1] == 'icon' && results[0].icon >=text[0]){
						connection.query('update profiles set icon = ? where name = ?', [results[0].icon - parseInt(text[0]), msg.member.user.username], function (error, results, fields) {
						});


						connection.query('update profiles set icon = ? where name = ?', [results5[0].icon + parseInt(text[0]), member.username], function (error, results, fields) {
						});
						msg.reply('Successfully gifted!')

					}
					else if(text.length == 5){
						connection.query('select * from stocks where business = ? and name = ?', [text[1]+' '+text[2]+' '+text[3], msg.member.user.username], function (error, results2, fields) {
							if(results2[0] != 'undefined' && results2[0] != undefined){
							if(results2[0].number >= parseInt(text[0])){
								connection.query('select * from stocks where name = ? and business = ?', [member.username, text[1]+' '+text[2]+' '+text[3]], function (error, results6, fields) {
									if(results6[0] != undefined && results6[0] != 'undefined'){
										connection.query('update stocks set number = ? where name = ? and business = ?', [results2[0].number - parseInt(text[0]), msg.member.user.username,text[1]+' '+text[2]+' '+text[3]], function (error, results, fields) {
										});
										connection.query('update stocks set number = ? where name = ? and business = ?', [results6[0].number + parseInt(text[0]), member.username, text[1]+' '+text[2]+' '+text[3]], function (error, results, fields) {
										});
										msg.reply('Successfully gifted stocks!')
									}
									else{
										connection.query('insert into stocks(name, business, number) values(?,?,?)', [member.username, text[1]+' '+text[2]+' '+text[3], text[0]], function (error, results, fields) {
										});
										connection.query('update stocks set number = ? where name = ? and business = ?', [results2[0].number - parseInt(text[0]), msg.member.user.username, text[1]+' '+text[2]+' '+text[3]], function (error, results, fields) {
										});
										msg.reply('Successfully gifted stocks!')

									}
								})
							}
							else{
								msg.reply('You don\'t own that many shares!')
							}
						}
						else{
							msg.reply('You don\'t own that stock!')
						}
						})
					}
					else{
						msg.reply('Either that item isn\'t supported yet, or you don\'t own enough of that item!')
					}
				})
				})
	},
};