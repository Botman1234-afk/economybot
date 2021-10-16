const express = require('express')
const router = express.Router()
const authClient = require('../auth-client.js')

router.get('/login', (req,res)=>{
    res.redirect('https://discord.com/api/oauth2/authorize?client_id=760654790522568735&redirect_uri=http%3A%2F%2Fsoftwaresat.onthewifi.com%3A80%2Fauth&response_type=code&scope=identify%20guilds')
})
router.get('/auth', async (req, res)=>{
    try{
        const code = req.query.code

        const key = await authClient.getAccess(code);
        res.cookies.set('key', key)
        res.redirect('/dashboard')
    }
    catch{
        res.end()
    }
})
router.get('/logout', (req, res)=>{
    res.cookies.set('key', '')
    res.redirect('/')
})
module.exports = router;
