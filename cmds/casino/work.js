const embedMaker = require("../../modules/embed.js");
const ms = require("../../modules/ms.js");
const money = require("../../modules/data.js").money;
const workCooldown = new Set();
module.exports.run = async (bot, message, args) => {
    let currency = bot.config[message.guild.id].currency;

    if(workCooldown.has(message.author.id)) {
        let time = Math.floor(bot.cooldownTimes.work[message.author.id]);
        let timeLeft = time - Date.now();
        if(time > Date.now()) return embedMaker.message(message, `:x: You can work again in **${ms(timeLeft, {long: true})}**`)
    }

    money.findOne({user_ID: message.author.id}, (err, data) =>{
        if(!data) {
            let newMoney = new money({
                user_ID: `${message.author.id}`,
                onHand: 0,
                inBank: 0
            });
            newMoney.save()
                .then(r => console.log(r))
                .catch(e => console.log(e));
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
                let max = 0.2 * totalMoney;
                let min = 0.1 * totalMoney;
                return Math.floor(Math.random()*(max-min+1)+min)
            }
        }

        function workSucessOrFail(addMoneyAmount) {
            let min = 3;
            let max = 10; // 30% chance of fail
            let chance = Math.floor(Math.random()*(max-min+1)+min);

            if(chance <= 3) {
                money.findOneAndUpdate({user_ID: message.author.id}, {$inc: {inBank: -addMoneyAmount}}, {new: true}, (err, data) => {
                    if(err) return console.log(err)
                });
                workCooldown.add(message.author.id);
                let workCoolDownTime = 57600000; //16 hours
                bot.cooldownTimes.work[message.author.id] = Date.now() + workCoolDownTime;
                setTimeout(() => {
                    workCooldown.delete(message.author.id)
                }, workCoolDownTime);
                return embedMaker.message(message, `Your company is having a rough time and you lost **${currency}${addMoneyAmount}**`)
            }else {
                money.findOneAndUpdate({user_ID: message.author.id}, {$inc: {inBank: addMoneyAmount}}, {new: true}, (err, data) => {
                    if(err) return console.log(err)
                });
                workCooldown.add(message.author.id);
                let workCoolDownTime = 57600000; //16 hours
                bot.cooldownTimes.work[message.author.id] = Date.now() + workCoolDownTime;
                setTimeout(() => {
                    workCooldown.delete(message.author.id)
                }, workCoolDownTime);
                return embedMaker.message(message, `You had a good day at work and earned **${currency}${addMoneyAmount}**`)
            }
        }
    })
};
module.exports.help = {
    name: "work",
    description: "Work for money",
    usage: `work`,
    examples: [`work`]
};

module.exports.conf = {
    enabled: true,
    aliases: [],
    cooldown: "3 Seconds",
    cat: "Money"
};