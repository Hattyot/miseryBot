const money = require("../../modules/data.js").money;
const embedMaker = require("../../modules/embed.js");
module.exports.run = async (bot, message, args) => {
    if(!args[0]) return embedMaker.command(message);

    let amount = args[0];
    let currency = bot.config[message.guild.id].currency;

    if(amount.toLowerCase() === "all") {
        money.findOne({user_ID: message.author.id}, (err, data) => {
            let bank = data.inBank;
            money.findOneAndUpdate({user_ID: message.author.id}, {$inc: {onHand: bank}, $set: {inBank: 0}}, (err, data) => {
                if(err) return console.log(err)
            });
            return embedMaker.message(message, `Withdrew **${currency}${hand}**`)
        })
    }else if(Math.round(amount)) {
        let bankToHand = Math.round(amount);

        money.findOne({user_ID: message.author.id}, (err, data) => {
            let bank = data.inBank
            if(bank < bankToHand) {
                money.findOneAndUpdate({user_ID: message.author.id}, {$inc: {onHand: bank}, $set: {inBank: 0}}, (err, data) => {
                    if(err) return console.log(err)
                })
            }else if(bankToHand < 0) {
                return embedMaker.message(message, `You can't withdraw negative money...`)
            }else {
                money.findOneAndUpdate({user_ID: message.author.id}, {$inc: {onHand: bankToHand, inBank: -bankToHand}}, (err, data) => {
                    if(err) return console.log(err)
                });

                return embedMaker.message(message, `Withdrew **${currency}${bankToHand}**`)
            }
        })
    }

};
module.exports.help = {
    name: "withdraw",
    cat: "Casino",
    description: "Withdraw money from your bank",
    usage: `withdraw [amount]`,
    examples: [`withdraw 500`,`withdraw all`]
};

module.exports.conf = {
    enabled: true,
    aliases: ["with"],
};