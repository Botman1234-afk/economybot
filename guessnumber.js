module.exports = {
	name: 'guessnumber',
	description: 'Ping!',
	async execute(msg, args) {
		const client = msg.client;

		const number = Math.floor(Math.floor(Math.random() * 100));
		let tries = 0;
		const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
		const { MessageCollector } = require('discord.js-collector');
		const botMessage = await msg.channel.send('What do you think the number is?');
		const message1 = MessageCollector.question({
			botMessage,
			user: msg.author.id,
			onMessage: async (botMessage, message) => { // Every message sent by user will trigger this function.
				if(parseInt(`${message.content}`) > number && message.author.id == msg.author.id) {
						 botMessage.channel.send('You are too high!');
						 tries++;

				}
				else if(parseInt(`${message.content}`) < number && message.author.id == msg.author.id) {
					botMessage.channel.send('You are too low!');
					tries++;
				}
				else if(parseInt(`${message.content}`) == number && msg.author.id != botMessage.author.id) {
						 botMessage.channel.send('You are correct, you took ' + tries + ' tries!');
					message1.stop();
				}
			},
		});


	},
};