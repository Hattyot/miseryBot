const embedMaker = require("../../modules/embed.js");
const ms = require("../../modules/ms.js");
const money = require("../../modules/data.js").money;
const workCooldown = new Set();
module.exports.run = async (bot, message, args) => {
    let currency = bot.config[message.guild.id].currency;

    if(workCooldown.has(message.author.id)) {
        let time = Math.floor(bot.cooldownTimes.work[message.author.id]);
        let timeLeft = time - Date.now();
        if(time > Date.now()) return embedMaker.message(message, `You can work again in **${ms(timeLeft, {long: true})}**`)
    }

    money.findOne({user_ID: message.author.id}, (err, data) =>{
        if(!data) {
            let data = { onHand: 0, inBank: 200, user_ID: message.author.id }
            let newMoney = new money(data)
            newMoney.save()

            let addMoneyAmount = moneyAmount(0);
            workSucessOrFail(addMoneyAmount)
        }else {
            let totalMoney = data.inBank + data.onHand;
            let addMoneyAmount = moneyAmount(totalMoney);
            workSucessOrFail(addMoneyAmount)

        }
        function moneyAmount(totalMoney) {
            if(totalMoney < 1000) {
                let max = 200;
                let min = 100;
                return Math.floor(Math.random()*(max-min+1)+min)
            }else if (totalMoney < 15000) {
                let max = 0.4 * totalMoney;
                let min = 0.25 * totalMoney;
                return Math.floor(Math.random()*(max-min+1)+min)
            }else {
                let max = 0.2 * totalMoney;
                let min = 0.1 * totalMoney;
                return Math.floor(Math.random()*(max-min+1)+min)
            }
        }

        function workSucessOrFail(addMoneyAmount) {
            let min = 3;
            let max = 10; 
            let chance = Math.floor(Math.random()*(max-min+1)+min);
            let workCoolDownTime = 21600000; //6 hours

            workCooldown.add(message.author.id);
            bot.cooldownTimes.work[message.author.id] = Date.now() + workCoolDownTime;
            setTimeout(() => {
                workCooldown.delete(message.author.id)
            }, workCoolDownTime);

            // 30% chance of fail
            if(chance <= 3) {
                money.findOneAndUpdate({user_ID: message.author.id}, {$inc: {inBank: -addMoneyAmount}}, {new: true}, (err, data) => {
                    if(err) return console.log(err)
                    return embedMaker.message(message, `Your company is having a rough time and you lost **${currency}${addMoneyAmount}**`)
                });
            }else {
                money.findOneAndUpdate({user_ID: message.author.id}, {$inc: {inBank: addMoneyAmount}}, {new: true}, (err, data) => {
                    if(err) return console.log(err)
                    return embedMaker.message(message, `You had a good day at work and earned **${currency}${addMoneyAmount}**`)
                });
            }
        }
    })
};
module.exports.help = {
    name: "work",
    cat: "Casino",
    description: "Work for money",
    usage: `work`,
    examples: [`work`]
};

module.exports.conf = {
    enabled: true,
    aliases: [],
    cooldown: "3 Seconds",
};