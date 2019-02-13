const raffle = require("../../modules/data.js").raffle;
const embedMaker = require("../../modules/embed.js")
module.exports.run = async (bot, message, args) => {

    raffle.findOne({user_ID: message.author.id}, (err, data) => {
        if(!data) {
            let raffleID = (Math.round(Math.random() * 10000000) * Date.now())/5
            let newRaffleTicket = new raffle({
                user_ID: `${message.author.id}`,
                raffle_ID: raffleID
            });
            newRaffleTicket.save()
                .then(r => console.log(r))
                .catch(e => console.log(e));
            embedMaker.message(message, `You raffle ticket number is: **${raffleID}**`)
        }else {
            embedMaker.message(message, `You already got a raffle ticket: **${raffleID}**`)
        }
    })
}

module.exports.help = {
    name: "getRaffleTicket",
    cat: "Utility",
    description: "Get your ticket with the raffle",
    usage: `getRaffleTicket`,
    examples: [`getRaffleTicket`]
}

module.exports.conf = {
    enabled: true,
    aliases: []
};