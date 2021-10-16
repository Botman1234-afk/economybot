
 let role;


        let emoji


         let message;
    

       
// /**
//  * Reaction Role Type
//  * NORMAL [1] - This role works like basic reaction role.
//  * TOGGLE [2] - You can win only one role of all toggle roles in this message (like colors system)
//  * JUST_WIN [3] - This role you'll only win, not lose.
//  * JUST_LOSE [4] - This role you'll only lose, not win.
//  * REVERSED [5] - This is reversed role. When react, you'll lose it, when you take off reaction you'll win it.
//  */
 


//         message.reply('Done').then(m => m.delete({ timeout: 500 }));
//     /* eslint-disable no-unused-vars */
module.exports = {
	name: 'reactionrole',
	description: 'Invest the easy way!',
	execute(msg, args,reactionRoleManager) {
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
		if(msg.member.permissions.has('MANAGE_MESSAGES')){
          	connection.query('select * from profiles where name = ?', [msg.member.user.username], async function (error, results, fields) {
				
				var value = 0
				

				const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
				const { MessageCollector } = require('discord.js-collector');
				
				let settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Reaction Roles')
							.addFields(
								{ name: 'Basic Reaction Role', value: 'Type 1', inline: false },
								{ name: 'Just-Win Reaction Role', value: 'Type 2', inline: false },
								{ name: 'Just-Lose Reaction Role', value: 'Type 3', inline: false },
								{ name: 'Reversed Reaction Role', value: 'Type 4', inline: false },
		
							)
							.setFooter('Please do process in the same channel as the message!')

const botMessage = await msg.channel.send(settingsembed);
				const userMessage = await MessageCollector.asyncQuestion({
					botMessage,
					user: msg.author.id,
				});           	
          	    if(userMessage.content == '1'){
          	        	msg.channel.messages.fetch({ limit: 2 }).then(messages => { // Fetches the messages
								msg.channel.bulkDelete(messages, // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
								);
							});
	const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
				const { MessageCollector } = require('discord.js-collector');
				
				let settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Basic Reaction Role')
							.setDescription('You have chosen basic reaction roles!')
							.addFields(
								{ name: 'Emoji', value: 'Enter what emoji you want to react with:', inline: false },
								


							)
							
const botMessage = await msg.channel.send(settingsembed);
				let userMessage = await MessageCollector.asyncQuestion({
					botMessage,
					user: msg.author.id,
				});     	
				emoji = userMessage.content
			if(emoji){
			    	msg.channel.messages.fetch({ limit: 2 }).then(messages => { // Fetches the messages
								msg.channel.bulkDelete(messages, // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
								);
							});

				let settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Basic Reaction Role')
							.addFields(
								{ name: 'Role', value: 'Mention the role you want people to get:', inline: false },
								


							)
							
const botMessage = await msg.channel.send(settingsembed);
				 userMessage = await MessageCollector.asyncQuestion({
					botMessage,
					user: msg.author.id,
				});     	
        role = userMessage.mentions.roles.first();		
        }
        else{
            msg.reply('Please try again and put an emoji this time!')
        }
				if(role){
				    msg.channel.messages.fetch({ limit: 2 }).then(messages => { // Fetches the messages
								msg.channel.bulkDelete(messages, // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
								);
							});
				    const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
				const { MessageCollector } = require('discord.js-collector');
				
				let settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Basic Reaction Role')
							.addFields(
								{ name: 'Message ID', value: 'Enter the message id of the message you want the bot to react with:', inline: false },
								


							)
							const botMessage = await msg.channel.send(settingsembed);
				const userMessage = await MessageCollector.asyncQuestion({
					botMessage,
					user: msg.author.id,
				});     	
         message = await msg.channel.messages.fetch(userMessage.content);
         if(message){
             msg.channel.messages.fetch({ limit: 2 }).then(messages => { // Fetches the messages
								msg.channel.bulkDelete(messages, // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
								);
							});
        	let settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Basic Reaction Role')
							.addFields(
								{ name: 'Success', value: 'Reaction Role has been created, wait a few seconds as it gets configured!', inline: false },
								


							)
							msg.channel.send(settingsembed)
							
							reactionRoleManager.createReactionRole({
            message: message,
            roles: [role],
            emoji,
            type:1
        });
         }
		else{
		    msg.reply('Please try again and put a message id this time!')
		}					
							

				}
				else{
				    msg.reply('Please try again and mention a role this time!')
				}
          	    }
             	    else if(userMessage.content == '2'){
             	        msg.channel.messages.fetch({ limit: 2 }).then(messages => { // Fetches the messages
								msg.channel.bulkDelete(messages, // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
								);
							});
	const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
				const { MessageCollector } = require('discord.js-collector');
				
				let settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Just-Win Reaction Role')
							.setDescription('You have chosen just-win reaction roles!')
							.addFields(
								{ name: 'Emoji', value: 'Enter what emoji you want to react with:', inline: false },
								


							)
							
const botMessage = await msg.channel.send(settingsembed);
				let userMessage = await MessageCollector.asyncQuestion({
					botMessage,
					user: msg.author.id,
				});     	
				emoji = userMessage.content
			if(emoji){
			    	msg.channel.messages.fetch({ limit: 2 }).then(messages => { // Fetches the messages
								msg.channel.bulkDelete(messages, // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
								);
							});

				let settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Just-Win Reaction Role')
							.addFields(
								{ name: 'Role', value: 'Mention the role you want people to get:', inline: false },
								


							)
							
const botMessage = await msg.channel.send(settingsembed);
				 userMessage = await MessageCollector.asyncQuestion({
					botMessage,
					user: msg.author.id,
				});     	
        role = userMessage.mentions.roles.first();		
        }
        else{
            msg.reply('Please try again and put an emoji this time!')
        }
				if(role){
				    msg.channel.messages.fetch({ limit: 2 }).then(messages => { // Fetches the messages
								msg.channel.bulkDelete(messages, // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
								);
							});
				    const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
				const { MessageCollector } = require('discord.js-collector');
				
				let settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Just-Win Reaction Role')
							.addFields(
								{ name: 'Message ID', value: 'Enter the message id of the message you want the bot to react with:', inline: false },
								


							)
							const botMessage = await msg.channel.send(settingsembed);
				const userMessage = await MessageCollector.asyncQuestion({
					botMessage,
					user: msg.author.id,
				});     	
         message = await msg.channel.messages.fetch(userMessage.content);
         if(message){
             msg.channel.messages.fetch({ limit: 2 }).then(messages => { // Fetches the messages
								msg.channel.bulkDelete(messages, // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
								);
							});
        	let settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Just-Win Reaction Role')
							.addFields(
								{ name: 'Success', value: 'Reaction Role has been created, wait a few seconds as it gets configured!', inline: false },
								


							)
							msg.channel.send(settingsembed)
							reactionRoleManager.createReactionRole({
            message: message,
            roles: [role],
            emoji,
            type:3
        });
         }
		else{
		    msg.reply('Please try again and put a message id this time!')
		}					
							

				}
				else{
				    msg.reply('Please try again and mention a role this time!')
				}
          	    }
          	    else if(userMessage.content == '3'){
          	        msg.channel.messages.fetch({ limit: 2 }).then(messages => { // Fetches the messages
								msg.channel.bulkDelete(messages, // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
								);
							});
	const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
				const { MessageCollector } = require('discord.js-collector');
				
				let settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Just-Lose Reaction Role')
							.setDescription('You have chosen just-lose reaction roles!')
							.addFields(
								{ name: 'Emoji', value: 'Enter what emoji you want to react with:', inline: false },
								


							)
							
const botMessage = await msg.channel.send(settingsembed);
				let userMessage = await MessageCollector.asyncQuestion({
					botMessage,
					user: msg.author.id,
				});     	
				emoji = userMessage.content
			if(emoji){
			    	
msg.channel.messages.fetch({ limit: 2 }).then(messages => { // Fetches the messages
								msg.channel.bulkDelete(messages, // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
								);
							});
				let settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Just-Lose Reaction Role')
							.addFields(
								{ name: 'Role', value: 'Mention the role you want people to lose:', inline: false },
								


							)
							
const botMessage = await msg.channel.send(settingsembed);
				 userMessage = await MessageCollector.asyncQuestion({
					botMessage,
					user: msg.author.id,
				});     	
        role = userMessage.mentions.roles.first();		
        }
        else{
            msg.reply('Please try again and put an emoji this time!')
        }
				if(role){
				    msg.channel.messages.fetch({ limit: 2 }).then(messages => { // Fetches the messages
								msg.channel.bulkDelete(messages, // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
								);
							});
				    const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
				const { MessageCollector } = require('discord.js-collector');
				
				let settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Just-Lose Reaction Role')
							.addFields(
								{ name: 'Message ID', value: 'Enter the message id of the message you want the bot to react with:', inline: false },
								


							)
							const botMessage = await msg.channel.send(settingsembed);
				const userMessage = await MessageCollector.asyncQuestion({
					botMessage,
					user: msg.author.id,
				});     	
         message = await msg.channel.messages.fetch(userMessage.content);
         if(message){
             msg.channel.messages.fetch({ limit: 2 }).then(messages => { // Fetches the messages
								msg.channel.bulkDelete(messages, // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
								);
							});
        	let settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Just-Lose Reaction Role')
							.addFields(
								{ name: 'Success', value: 'Reaction Role has been created, wait a few seconds as it gets configured!', inline: false },
								


							)
							msg.channel.send(settingsembed)
							reactionRoleManager.createReactionRole({
            message: message,
            roles: [role],
            emoji,
            type:4
        });
         }
		else{
		    msg.reply('Please try again and put a message id this time!')
		}					
							

				}
				else{
				    msg.reply('Please try again and mention a role this time!')
				}
          	    }
          	       else if(userMessage.content == '4'){
          	           msg.channel.messages.fetch({ limit: 2 }).then(messages => { // Fetches the messages
								msg.channel.bulkDelete(messages, // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
								);
							});
	const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
				const { MessageCollector } = require('discord.js-collector');
				
				let settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Reversed Reaction Role')
							.setDescription('You have chosen reversed reaction roles!')
							.addFields(
								{ name: 'Emoji', value: 'Enter what emoji you want to react with:', inline: false },
								


							)
							
const botMessage = await msg.channel.send(settingsembed);
				let userMessage = await MessageCollector.asyncQuestion({
					botMessage,
					user: msg.author.id,
				});     	
				emoji = userMessage.content
			if(emoji){
			    	msg.channel.messages.fetch({ limit: 2 }).then(messages => { // Fetches the messages
								msg.channel.bulkDelete(messages, // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
								);
							});

				let settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Reverse Reaction Role')
							.addFields(
								{ name: 'Role', value: 'Mention the role you want people to get/lose:', inline: false },
								


							)
							
const botMessage = await msg.channel.send(settingsembed);
				 userMessage = await MessageCollector.asyncQuestion({
					botMessage,
					user: msg.author.id,
				});     	
        role = userMessage.mentions.roles.first();		
        }
        else{
            msg.reply('Please try again and put an emoji this time!')
        }
				if(role){
				    msg.channel.messages.fetch({ limit: 2 }).then(messages => { // Fetches the messages
								msg.channel.bulkDelete(messages, // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
								);
							});
				    const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
				const { MessageCollector } = require('discord.js-collector');
				
				let settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Reverse Reaction Role')
							.addFields(
								{ name: 'Message ID', value: 'Enter the message id of the message you want the bot to react with:', inline: false },
								


							)
							const botMessage = await msg.channel.send(settingsembed);
				const userMessage = await MessageCollector.asyncQuestion({
					botMessage,
					user: msg.author.id,
				});     	
         message = await msg.channel.messages.fetch(userMessage.content);
         if(message){
             msg.channel.messages.fetch({ limit: 2 }).then(messages => { // Fetches the messages
								msg.channel.bulkDelete(messages, // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
								);
							});
        	let settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Reverse Reaction Role')
							.addFields(
								{ name: 'Success', value: 'Reaction Role has been created, wait a few seconds as it gets configured!', inline: false },
								


							)
							msg.channel.send(settingsembed)
							reactionRoleManager.createReactionRole({
            message: message,
            roles: [role],
            emoji,
            type:5
        });
         }
		else{
		    msg.reply('Please try again and put a message id this time!')
		}					
							

				}
				else{
				    msg.reply('Please try again and mention a role this time!')
				}
          	    }
          	    else{
          	    	msg.reply('Please try again with the correct syntax!')
          	    }
           	    
          	})
           	
		}
		else{
		    msg.reply('You need MANAGE_MESSAGES for this command!')
		}

	},
};