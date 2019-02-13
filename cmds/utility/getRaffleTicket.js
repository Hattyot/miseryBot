const raffle = require("../../modules/data.js").raffle;
const embedMaker = require("../../modules/embed.js")
module.exports.run = async (bot, message, args) => {
    // if(message.member.roles.has("530728428975161344")) {
    //     return embedMaker.message(message, `Sorry staff can't enter the raffle`)
    // }
    raffle.findOne({user_ID: message.author.id}, (err, data) => {
        if(!data) {
            let raffleID = (Math.round(Math.random() * 100000) * Date.now())/20
            let newRaffleTicket = new raffle({
                user_ID: `${message.author.id}`,
                raffle_ID: raffleID
            });
            newRaffleTicket.save()
                .then(r => console.log(r))
                .catch(e => console.log(e));
            embedMaker.message(message, `:tickets: Your raffle ticket number is: **${raffleID}**`)
        }else {
            let raffleID = data.raffle_ID
            embedMaker.message(message, `:tickets: Your raffle ticket number is: **${raffleID}**`)
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