const raffle = require("../../modules/data.js").raffle;
const embedMaker = require("../../modules/embed.js")
module.exports.run = async (bot, message, args) => {
    raffle.find({user_ID: message.author.id}, (err, data) => {
        if(data.length <= 0) {
            embedMaker.message(message, `You don't have any raffle tickets`)
        }else {
            let list = []
            for(let i = 0; i < data.length; i++) {
                list.push(`**${i+1}**. *${data[i].raffle_ID}*`)
            }
            embedMaker.message(message, list.join("\n"))
        }
    })
}

module.exports.help = {
    name: "raffleTickets",
    cat: "Events",
    description: "See your raffle tickets",
    usage: `raffleTickets`,
    examples: [`raffleTickets`]
}

module.exports.conf = {
    enabled: true,
    aliases: [],
    test: true
};
