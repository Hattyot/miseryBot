const embedMaker = require('../../modules/embed.js')
module.exports.run = async (bot, message, args) => {
    let user = message.mentions.users.first() || message.guild.members.get(args[0]).user
    if(!user) user = message.author

    embedMaker.image(message, user.displayAvatarURL)
}

module.exports.help = {
    name: "avatar",
    cat: "Utility",
    description: "Get the avatar of a user",
    usage: `avatar (user)`,
    examples: [`avatar`, `avatar @Hattyot`]
}

module.exports.conf = {
    enabled: true,
    aliases: [],
  };