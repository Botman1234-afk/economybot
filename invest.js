/* eslint-disable no-unused-vars */
module.exports = {
	name: 'invest',
	description: 'Invest the easy way!',
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
           	connection.query('select * from profiles where name = ?', [msg.member.user.username], async function (error, results, fields) {
				
				var value = 0
				

				const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
				const { MessageCollector } = require('discord.js-collector');
				
				let settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Investing')
							.addFields(
								{ name: 'Long Term Profit', value: 'Type l', inline: false },
								{ name: 'Short Term Value', value: 'Type s', inline: false },

		
							)
							.setFooter('Disclaimer: Automatic investing costs a 5% tax per order')
const botMessage = await msg.channel.send(settingsembed);
				const userMessage = await MessageCollector.asyncQuestion({
					botMessage,
					user: msg.author.id,
				});           	
           	    if(userMessage.content == 's'){
	const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
				const { MessageCollector } = require('discord.js-collector');
				
				let settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Short Term Investing')
							.setDescription('You have chosen short term investments!')
							.addFields(
								{ name: 'Value', value: 'Enter how much you want to earn:', inline: false },
								


							)
							
const botMessage = await msg.channel.send(settingsembed);
				const userMessage = await MessageCollector.asyncQuestion({
					botMessage,
					user: msg.author.id,
				});     	
				value = userMessage.content
				if(value%10 ==1){
					msg.reply('The number has to be divisible by 10')
				}
				else{
           	        if(((parseInt(value/10))*250)*1.05 <= results[0].coins){
	let settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Short Term Investing')
							.setDescription('Finalize Investment!')
							.addFields(
								{ name: 'Daily Gain', value:((parseInt(value))), inline: false },
								{ name: 'Items Buying', value: (((parseInt(value/10))))+' Bonds' , inline: false },
								{ name: 'Final Price', value: ((parseInt(value/10)*200))*1.05, inline: false },
							


							)
							 .setFooter('Type y or n')
const botMessage = await msg.channel.send(settingsembed);
				const userMessage = await MessageCollector.asyncQuestion({
					botMessage,
					user: msg.author.id,
				});         
           	        	if(userMessage.content == 'y'){
           	        		msg.reply('Transaction Complete')
           	        		connection.query('update profiles set coins = ? where name = ?', [results[0].coins-((parseInt(value/10))*200)*1.05,msg.member.user.username], async function (error, results, fields) {
							})
								
								connection.query('update profiles set bonds = ? where name = ?', [results[0].bonds+(((parseInt(value/10)))),msg.member.user.username], async function (error, results, fields) {
							})
						
							           	connection.query('select * from profiles where name = ?', ['bank'], async function (error, results1, fields) {

								connection.query('update profiles set coins = ? where name = ?', [results1[0].coins+(((parseInt(value/10)*200)))*1.05, 'bank'], async function (error, results, fields) {
							})
							           	})
           	        	}
           	        	else{
           	        		msg.reply('Transaction Cancelled')
           	        	}
           	        }
           	        else{
           	            msg.reply('You need '+(Math.abs(results[0].coins-(parseInt(value/10)*200)*1.05)).toString()+' more coins for that purchase!')
           	        }
				}
           	    }
           	    else if(userMessage.content == 'l'){
	const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
				const { MessageCollector } = require('discord.js-collector');
				
				let settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Long Term Investing')
							.setDescription('You have chosen long term investments!')
							.addFields(
								{ name: 'Value', value: 'Enter how much you want to earn:', inline: false },
								


							)
							
const botMessage = await msg.channel.send(settingsembed);
				const userMessage = await MessageCollector.asyncQuestion({
					botMessage,
					user: msg.author.id,
				});     	
				value = userMessage.content
				if(parseInt(value) < 9000){
					msg.reply('Minimum order amount is 9000')
				}
				else{
           	        if((((parseInt(value/9000))*25000)+((value -(parseInt(value/9000)*9000))))*1.05 <= results[0].coins){
	let settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Long Term Investing')
							.setDescription('Finalize Investment!')
							.addFields(
								{ name: 'Daily Gain Before 20 Days', value:(((value -(parseInt(value/9000)*9000))/200)*10)+ ((parseInt(value/9000))*250), inline: false },
								{ name: 'Daily Gain After 20 days', value: (parseInt(value)), inline: false },
								{ name: 'Items Buying', value: (parseInt(value/9000)).toString()+' Small Houses\n'+ ((value -(parseInt(value/9000)*9000))/200)+' Bonds' , inline: false },
								{ name: 'Final Price', value: (((parseInt(value/9000))*25000)+((value -(parseInt(value/9000)*9000))))*1.05, inline: false },
							


							)
							 .setFooter('Type y or n')
const botMessage = await msg.channel.send(settingsembed);
				const userMessage = await MessageCollector.asyncQuestion({
					botMessage,
					user: msg.author.id,
				});         
           	        	if(userMessage.content == 'y'){
           	        		msg.reply('Transaction Complete')
           	        		connection.query('update profiles set coins = ? where name = ?', [results[0].coins-(((parseInt(value/9000))*25000)+((value -(parseInt(value/9000)*9000))))*1.05,msg.member.user.username], async function (error, results, fields) {
							})
								connection.query('update profiles set smallhouse = ? where name = ?', [results[0].smallhouse+(((parseInt(value/9000)))),msg.member.user.username], async function (error, results, fields) {
							})
								connection.query('update profiles set bonds = ? where name = ?', [results[0].bonds+((value -(parseInt(value/9000)*9000))/200),msg.member.user.username], async function (error, results, fields) {
							})
								connection.query('update profiles set loan = ? where name = ?', [results[0].loan+(((parseInt(value/9000)))*175000),msg.member.user.username], async function (error, results, fields) {
							})
							           	connection.query('select * from profiles where name = ?', ['bank'], async function (error, results1, fields) {

								connection.query('update profiles set coins = ? where name = ?', [results1[0].coins+(((parseInt(value/9000))*25000)+((value -(parseInt(value/9000)*9000))))*1.05, 'bank'], async function (error, results, fields) {
							})
							           	})
           	        	}
           	        	else{
           	        		msg.reply('Transaction Cancelled')
           	        	}
           	        }
           	        else{
           	            msg.reply('You need '+(Math.abs(results[0].coins-(((parseInt(value/9000))*25000)+((value -(parseInt(value/9000)*9000))))*1.05)).toString()+' more coins for that purchase!')
           	        }
           	    }
           	    }
           	    else{
           	    	msg.reply('Please try again with the correct syntax!')
           	    }
           	    
           	})
           	
	},
};