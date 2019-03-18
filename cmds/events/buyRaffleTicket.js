const { points, raffle } = require("../../modules/data.js")
const embedMaker = require("../../modules/embed.js")
module.exports.run = async (bot, message, args) => {
    let pointsAmount
    let ticketAmount = Math.floor(args[0])
    if(!ticketAmount) return embedMaker.command(messagem, "[amount]")
    if(message.member.roles.has("530728428975161344")) return embedMaker.message(message, `Sorry staff can't enter the raffle`)
    points.findOne({user_ID: message.author.id}, (err, data) => {
        if(!data) {
            let newPoints = new points({
                user_ID: `${message.author.id}`,
                amount: 0
            });
            newPoints.save()
                .then(r => console.log(r))
                .catch(e => console.log(e));
            pointsAmount = 0
        }else {
            pointsAmount = data.amount 
        }
        
        raffle.find({user_ID: message.author.id}, (err, data) => {
            if(pointsAmount < ticketAmount * 5) {
                embedMaker.message(message, `You don't have enough points to buy **${ticketAmount}** raffle ticket(s), you need **${ticketAmount * 5}** points to buy ${ticketAmount} tickets.`)
            }else {
                for(let i = 0; i < ticketAmount; i++) {
                    let raffleID = Math.round(Math.round((Math.random() * 100000) * Date.now())/20)
                    let newRaffleTicket = new raffle({
                        user_ID: `${message.author.id}`,
                        raffle_ID: raffleID
                    });
                    newRaffleTicket.save()
                        .then(r => console.log(r))
                        .catch(e => console.log(e));
                    
                    points.findOneAndUpdate({user_ID: message.author.id}, {$inc: {amount: -5}}, (err, data) => {
                        if(err) return console.log(err)
                    });
                }
                embedMaker.message(message, `:tickets: You've bought **${ticketAmount}** new tickets\n\nYou now have **${data.length + ticketAmount}** ticket(s)`)
            }
        })
    })

}

module.exports.help = {
    name: "buyRaffleTicket",
    cat: "Events",
    description: "Buy a new raffle ticket",
    usage: `buyRaffleTicket [amount]`,
    examples: [`buyRaffleTicket 2`]
}

module.exports.conf = {
    enabled: true,
    aliases: []
};
