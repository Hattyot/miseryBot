const { money } = require("../../modules/data.js")
const embedMaker = require("../../modules/embed.js")
module.exports.run = async (bot, message, args) => {
    if(!args[0]) return embedMaker.command(message)

    let member = getMember()
    let amount = args[1]

    if(!member) return embedMaker.command(message, "[user]")
    if(!amount) return embedMaker.command(message, "[amount]")

    money.findOne({user_ID: member.user.id}, (err, data) => {
        if(!data) {
            let data = { onHand: 0, inBank: 200, user_ID: message.author.id }
            let newMoney = new money(data)
            newMoney.save()
        }
        if(amount.toLowerCase() === "all") {
            money.findOne({user_ID: message.author.id}, (err, data) => {
                if(!data) {
                    let data = { onHand: 0, inBank: 200, user_ID: message.author.id }
                    let newMoney = new money(data)
                    newMoney.save()
                }
                let give = Math.floor(data.onHand)
                if(give === 0) return embedMaker.message(messagem, "You don't have any money to give.")
                money.findOneAndUpdate({user_ID: message.author.id}, {$inc: {onHand: -give}}, (err, data) => {
                    if(err) return console.log(err)
                });
                money.findOneAndUpdate({user_ID: member.user.id}, {$inc: {onHand: give}}, (err, data) => {
                    if(err) return console.log(err)
                });
                return embedMaker.message(message, `Paid **${bot.config[message.guild.id].currency}${give}** to <@${member.user.id}>`)
            })
        }else if(Math.floor(amount)) {
            money.findOne({user_ID: message.author.id}, (err, data) => {
                if(!data) {
                    let data = { onHand: 0, inBank: 200, user_ID: message.author.id }
                    let newMoney = new money(data)
                    newMoney.save()
                }
                let give = Math.floor(amount)
                if(give > data.onHand) return embedMaker.message(message, `You don't have that much, you have **${bot.config[message.guild.id].currency}${data.onHand}** on hand`)
                if(give < 0) return embedMaker.message(message, `You can't give negative money...`)
                money.findOneAndUpdate({user_ID: message.author.id}, {$inc: {onHand: -give}}, (err, data) => {
                    if(err) return console.log(err)
                });
                money.findOneAndUpdate({user_ID: member.user.id}, {$inc: {onHand: give}}, (err, data) => {
                    if(err) return console.log(err)
                });
                return embedMaker.message(message, `Paid **${bot.config[message.guild.id].currency}${give}** to <@${member.user.id}>`)
            })
        }else {
            embedMaker.command(message, "[amount]")
        }
    })

    function getMember() {
        let _member = message.mentions.members.first() || message.guild.members.get(args[0])
        return _member
    }
}
module.exports.help = {
    name: "pay",
    cat: "Casino",
    description: "Give a user some money",
    usage: `pay [user] [amount]`,
    examples: [`pay @Hattyot 500`, `pay Hattyot all`]
}

module.exports.conf = {
    enabled: true,
    aliases: [],
    cooldown: "3 Seconds",
  };
