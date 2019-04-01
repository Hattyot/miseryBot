const { money } = require("../../modules/data.js")
const embedMaker = require("../../modules/embed.js")
const rando = require("../../modules/tools.js").random
const ms = require("../../modules/ms.js")
module.exports.run = async (bot, message, args) => {
    if(!args[0]) embedMaker.command(message)

    let member = getMember()
    let robber = message.member
    let currency = bot.config[message.guild.id].currency

    if(!member) return embedMaker.command(message, "[user]")
    if(member.user.id === robber.user.id) return embedMaker.message(message, "Why are you trying to rob yourself?")

    money.findOne({user_ID: robber.user.id}, (err, data) => {
        if(!data) {
            let data = { onHand: 0, inBank: 200, user_ID: robber.user.id }
            let newMoney = new money(data)
            newMoney.save()
        }

        let robtime = bot.cooldownTimes.rob[robber.user.id]

        if(robtime > Date.now()) return embedMaker.message(message, `You can rob people again in **${ms(robtime - Date.now(), {long: true})}**`)

        money.findOne({user_ID: member.user.id}, (err, data) => {
            function fineFunction(data) {
                if(!data) {
                    let data = { onHand: 0, inBank: 200, user_ID: member.user.id }
                    let newMoney = new money(data)
                    newMoney.save()
                }
                let fine = Math.floor(Math.random()*(250-100+1)+100)
                let hand = Math.floor(data.onHand)

                if(hand > 1000) fine = (hand * Math.floor(Math.random()*(25-15+1)+15)) / 100

                money.findOneAndUpdate({user_ID: robber.user.id}, {$inc: {inBank: -fine}}, (err, data) => {
                    if(err) return console.log(err)
                });

                return fine
            }

            let hand = Math.floor(data.onHand)
            let failurechance = Math.floor(Math.random()*(10-1+1)+1)
            let stealPercent = Math.floor(Math.random()*(85-65+1)+65)
            let stolen = Math.round((hand * stealPercent) / 100)

            if(hand <= 0) {
                let fine = fineFunction(data)
                bot.cooldownTimes.rob[robber.user.id] = Date.now() + 7200000
                return embedMaker.message(message, `You attempted to rob a poor person, you have been fined **${currency}${fine}**`)
            }
            if(failurechance <= 3) {
                let fine = fineFunction(data)
                bot.cooldownTimes.rob[robber.user.id] = Date.now() + 7200000
                return embedMaker.message(message, `You were caught robbing <@${member.user.id}>, you have been fined **${currency}${fine}**`)    
            }

            money.findOneAndUpdate({user_ID: robber.user.id}, {$inc: {onHand: stolen}}, (err, data) => {
                if(err) return console.log(err)
            });
            money.findOneAndUpdate({user_ID: member.user.id}, {$inc: {onHand: -stolen}}, (err, data) => {
                if(err) return console.log(err)
            });

            return embedMaker.message(message, `You stole **${currency}${stolen}** from <@${member.user.id}>`)
        })
    })

    function getMember() {
        let _member = message.mentions.members.first() || message.guild.members.get(args[0])
        
        return _member
    }
}
module.exports.help = {
    name: "rob",
    cat: "Casino",
    description: "Rob a user of their cash",
    usage: `rob [user]`,
    examples: [`rob @Hattyot`]
}

module.exports.conf = {
    enabled: true,
    aliases: [],
    cooldown: "3 Seconds",
};
