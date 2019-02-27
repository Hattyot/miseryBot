const embedMaker = require("../../modules/embed.js")
module.exports.run = async (bot, message, args) => {
    let eventsRole = message.guild.roles.get("550250818364899330")
    if(message.member.roles.has(eventsRole)) return embedMaker.message(message, `You already have the role`)
    message.member.addRole(eventsRole)
    embedMaker.message(message, `You've been given <@&${eventsRole.id}> role`)
}

module.exports.help = {
    name: "events",
    cat: "Events",
    description: "Gives you the events role",
    usage: `events`,
    examples: [`events`]
}

module.exports.conf = {
    enabled: true,
    aliases: []
};
