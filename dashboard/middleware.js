const authClient = require('./auth-client.js')
const mysql = require('mysql');
const connection = mysql.createConnection({
	adapter: 'sails-mysql',
	host: 'localhost',
	user: 'root',
	password: 'latehome4',
	database: 'discord',
	charset: 'utf8mb4',
	socketPath: '/var/run/mysqld/mysqld.sock',
});
const { Client, Intents } = require('discord.js');
const { ReactionRoleManager } = require('discord.js-collector'); //We import the discord.js-collector package that'll make reaction roles possible
const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS);

const client = new Client({ intents: myIntents} );

module.exports.client = client;

module.exports.updateUser = async (req,res,next)=>{
    try{
        const key = await res.cookies.get('key')
        res.locals.user  = await authClient.getUser(key)
        res.locals.guilds = await authClient.getGuilds(key)
        var count = 0
        var guilds = []
        await res.locals.guilds.forEach(async guild => {
            if(guild.permissions.includes('ADMINISTRATOR')){
                await guilds.push(guild.id)

            }

            

        });
        for (var i = guilds.length - 1; i >= 0; i--) {

        // guilds.forEach(async guild => {
            count++
                    let server = await client.guilds.fetch(guilds[i]).catch(async err =>{
                            guilds.splice(i, 1)

                        });
        };
        for (var i = guilds.length - 1; i >= 0; i--) {
            let server = await client.guilds.fetch(guilds[i])

            guilds[i] = server.name

        }
         res.locals.guilds = guilds
    } finally{

        next()

    }
}
client.login('NzYwNjU0NzkwNTIyNTY4NzM1.X3PM-g.Dl9IFiXkSbQRudWm2zaSgrTnHYc');
