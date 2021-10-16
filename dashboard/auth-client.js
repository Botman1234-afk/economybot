const OAuthClient = require('disco-oauth')
const Client = new OAuthClient('760654790522568735', '3zfxuUan8keFBQSJ8BJGA8LtYA0T27cu')
Client.setRedirect('http://softwaresat.onthewifi.com:80/auth')
Client.setScopes('identify', 'guilds')
module.exports = Client;