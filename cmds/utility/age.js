const embedMaker = require('../../modules/embed.js')
module.exports.run = async (bot, message, args) => {
    let member = message.member
    let potatoRole = message.guild.roles.get("530717627690123267")
    if(member.roles.has(potatoRole.id)) return

    let memberAge = Math.floor(args[0])
    if(!memberAge) return embedMaker.command(message)

    if(memberAge < 13) {
        return member.send(`Sorry, but discord is 13+ and we are required to ban you`).then(() => {
            member.ban()
        })
    }else if(memberAge >= 18) {
        let adultRole = message.guild.roles.get(`530678409706209291`)
        member.addRole(adultRole)
    }
    member.addRole(potatoRole)
}

module.exports.help = {
    name: "age",
    cat: "Join",
    description: "State your age before you can join",
    usage: `age [your age]`,
    examples: [`age 18`]
}

module.exports.conf = {
    enabled: true,
    aliases: [],
    test: true
  };