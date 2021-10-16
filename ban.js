/* eslint-disable no-unused-vars */
module.exports = {
	name: 'ban',
	description: 'ban users!',
	execute(msg, args) {
        const Discord = require('discord.js')
		const client = msg.client;
		if (msg.member.permissions.has('BAN_MEMBERS')) {
            const user = msg.mentions.users.first();
            if (user) {
                const member = msg.guild.member(user);
                if (`${user.tag}` == 'satvikag#7832') {
                    msg.reply('Sorry, this user is too precious!');
                }
                else if (`${user.username}` == 'ThyMaster555') {
                    msg.reply('This user is under a protection spell from Satvik');
                }

                else if (`${user.tag}` != 'satvikag#7832') {
                    member
                        .ban({
                            reason: 'Not specified!',
                        })
                        .then(() => {
                            msg.reply(`Successfully banned ${user.tag}`);
                            channel = member.guild.channels.cache.find(ch => ch.name === `${results[0].logchannel}`);
                            if (channel) {
                                const exampleEmbed = new Discord.MessageEmbed().setTitle(`Successfully banned ${user.tag}`);
                                channel.send(exampleEmbed);
                            }
                        })
                        .catch(err => {
                            msg.reply('I was unable to ban the member');
                            console.error(err);
                        });
                }
                else {
                    msg.reply('That user isn\'t in this guild!');
                }
            }
            else {
                msg.reply('You didn\'t mention the user to ban!');
            }
        }
        else {
            msg.reply('You don\'t have sufficient permissions');
        }
    

	},
};