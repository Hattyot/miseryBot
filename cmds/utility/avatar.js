const embedMaker = require('../../modules/embed.js')
module.exports.run = async (bot, message, args) => {
    let member = message.mentions.members.first() || message.guild.members.get(args[0])
    if(!member) {
        user = message.author
    }else {
        user = member.user
    }

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