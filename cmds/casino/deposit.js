const money = require("../../modules/data.js").money;
const embedMaker = require("../../modules/embed.js");
module.exports.run = async (bot, message, args) => {
    if(!args[0]) return embedMaker.command(message);

    let amount = args[0];
    let currency = bot.config[message.guild.id].currency;

    if(amount.toLowerCase() === "all") {
        money.findOne({user_ID: message.author.id}, (err, data) => {
            if(!data) {
                let data = { onHand: 0, inBank: 200, user_ID: message.author.id }
                let newMoney = new money(data)
                newMoney.save()
            }
            let hand = data.onHand;
            money.findOneAndUpdate({user_ID: message.author.id}, {$inc: {inBank: hand}, $set: {onHand: 0}}, (err, data) => {
                if(err) return console.log(err)
            });
            return embedMaker.message(message, `Deposited **${currency}${hand}**`)
        })
    }else if(Math.round(amount)) {
        let handToBank = Math.round(amount);

        money.findOne({user_ID: message.author.id}, (err, data) => {
            if(!data) {
                let data = { onHand: 0, inBank: 200, user_ID: message.author.id }
                let newMoney = new money(data)
                newMoney.save()
            }
            let hand = data.onHand
            if(hand < handToBank) {
                money.findOneAndUpdate({user_ID: message.author.id}, {$inc: {inBank: hand}, $set: {onHand: 0}}, (err, data) => {
                    if(err) return console.log(err)
                })
            }else if(handToBank < 0) {
                return embedMaker.message(message, `You can't deposit negative money...`)
            }else {
                money.findOneAndUpdate({user_ID: message.author.id}, {$inc: {onHand: -handToBank, inBank: handToBank}}, (err, data) => {
                    if(err) return console.log(err)
                });

                return embedMaker.message(message, `Deposited **${currency}${handToBank}**`)
            }
        })
    }else {
        if(!bet) return embedMaker.command(message, "[amount]");
    }

};
module.exports.help = {
    name: "deposit",
    cat: "Casino",
    description: "Deposit money to your bank",
    usage: `Deposit [amount]`,
    examples: [`Deposit 500`,`Deposit all`]
};

module.exports.conf = {
    enabled: true,
    aliases: ["dep"],
};