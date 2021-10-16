module.exports = {
  apps : [{
    name        : "bot",
    script      : "./testbot.js",
    watch       : true,
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
       "NODE_ENV": "production"
    }
  }]
}