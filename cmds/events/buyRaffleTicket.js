const { points, raffle } = require("../../modules/data.js")
const embedMaker = require("../../modules/embed.js")
module.exports.run = async (bot, message, args) => {
    let pointsAmount
    if(message.member.roles.has("530728428975161344")) {
        return embedMaker.message(message, `Sorry staff can't enter the raffle`)
    }
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
            if(pointsAmount < 5) {
                embedMaker.message(message, `You don't have enough points to buy a new raffle ticket, you need 5 to buy 1.`)
            }else {
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

                embedMaker.message(message, `:tickets: Your new raffle ticket's number is: **${raffleID}**\n\nYou now have **${data.length + 1}** ticket(s)`)
            }
        })
    })

}

module.exports.help = {
    name: "buyRaffleTicket",
    cat: "Events",
    description: "Buy a new raffle ticket",
    usage: `buyRaffleTicket`,
    examples: [`buyRaffleTicket`]
}

module.exports.conf = {
    enabled: true,
    aliases: [],
    test: true
};
