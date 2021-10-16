/* eslint-disable no-unused-vars */
module.exports = {
	name: 'eval',
	description: 'Pay your loan!',
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
function clean(text) {
					if (typeof (text) === 'string') { return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203)); }
					else { return text; }
				}

				var code = msg.content.split(' ').slice(1).join(' ');
				if (msg.member.permissions.has('ADMINISTRATOR')) {
					try {
						let evaled = eval(code);

						if (typeof evaled !== 'string') { evaled = require('util').inspect(evaled); }

						msg.channel.send(clean(evaled), { code: 'xl' });
					}
					catch (err) {
						msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
					}
				}
	},
};