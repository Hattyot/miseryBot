let embedMaker = require("../../modules/embed.js")
module.exports.run = async (bot, message, args) => {
    let member = message.mentions.members.first()
    if(!member) return embedMaker.command(message)
    let content = `<@${member.user.id}>`.split("")
    let sum = 0
    for(let i = 0; i < content.length; i++) {
        sum += Math.floor(content[i].charCodeAt())
    }
    let rating = sum % 101;
    if(rating < 20) {
        rating += 60;
    }else if(rating < 40) {
        rating += 30;
    }
    return message.channel.send(`I rate ${member.user.username} with a **${rating}/100**`)
};

module.exports.help = {
    name: "ratewaifu",
    cat: "Fun",
    description: "See how good a waifu is",
    usage: "ratewaifu [mention]",
    examples: ["ratewaifu @HatMan"]
};

module.exports.conf = {
    enabled: true,
    aliases: [],
};