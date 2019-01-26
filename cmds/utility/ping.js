const embedMaker = require("../../modules/embed.js")
module.exports.run = async (bot, message, args) => {
    embedMaker.message(message, `***:timer: Pong! ${Math.round(bot.ping)} ms*** ** **`)
}

module.exports.help = {
    name: "ping",
    cat: "Utility",
    description: "Pings the bot",
    usage: `ping`,
    examples: [`ping`]
}

module.exports.conf = {
    enabled: true,
    aliases: [],
  };