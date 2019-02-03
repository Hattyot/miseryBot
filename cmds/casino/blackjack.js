const Discord = require("discord.js");
const embedMaker = require("../../modules/embed.js");
const ms = require("../../modules/ms.js");
const money = require("../../modules/data.js").money;
const blackjack = new Set();
const blackjackCooldown = new Set();
const blackjackMachine = require("../../modules/games.js").blackjack;
module.exports.run = async (bot, message, args) => {
    if (blackjack.has(message.author.id)) return embedMaker.message(message, "Why are you trying to start multible games?");
    if (!args[0]) return embedMaker.command(message);

    let bet = Math.floor(args[0]);
    let currency = bot.config[message.guild.id].currency;

    if (!bet) return embedMaker.command(message, "[bet]");
    if (bet < 50) return embedMaker.message(message, `:x: Bet can't be smaller that ${currency}50`);

    money.findOne({user_ID: message.author.id}, (err, data) => {
        if (bet > Math.round(data.onHand)) return embedMaker.message(message, `:x: You don't have enough money on hand for this bet. You have **${currency}${data.onHand}** on hand`);

        if (blackjackCooldown.has(message.author.id)) {
            let time = Math.floor(bot.games.cooldownTimes.blackjack[message.author.id]);
            let timeLeft = time - Date.now();
            if (time > Date.now()) return embedMaker.message(message, `:x: You can play blackjack again in **${ms(timeLeft, {long: true})}**`)
        }

        bot.games.blackjackLimiter[message.author.id] = bot.games.blackjackLimiter[message.author.id] + 1 || 1;

        if (bot.games.blackjackLimiter[message.author.id] === 5) {
            blackjackCooldown.add(message.author.id);
            bot.games.cooldownTimes.blackjack[message.author.id] = Date.now() + 300000;
            setTimeout(() => {
                blackjackCooldown.delete(message.author.id)
            }, 300000)

        }

        blackjack.add(message.author.id);

        let blackjackGame = new blackjackMachine(bet);

        let embed = new Discord.RichEmbed()
            .setTimestamp()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL)
            .setDescription("type `hit` or `stand`")
            .addField("Your Hand", "** **", true)
            .addField("Dealer's Hand", "** **", true)
            .setColor(bot.config[message.guild.id].embedColor);
        message.channel.send(embed).then(embedMessage => {
            blackjackGame.setEmbedMessage(embedMessage);
            game()
        });

        function game() {
            blackjackGame.deal();
            if (blackjackGame.playerTotal === "Blackjack") {
                payout(1.5);
                result("Blackjack!", `${currency}${Math.round(bet) * 1.5}`);
                return displayHands()
            }
            displayHands();
            hitStand()
        }

        function displayHands() {
            let oldEmbed = blackjackGame.embedMessage.embeds[0];
            let playerHandString = [];
            let dealerHandString = [];

            for (let i = 0; i < blackjackGame.playerHand.length; i++) {
                playerHandString.push(`${blackjackGame.playerHand[i].rank.shortName}${unicodeString(blackjackGame.playerHand[i].suit.name)}`);
            }
            for (let j = 0; j < blackjackGame.dealerHand.length; j++) {
                dealerHandString.push(`${blackjackGame.dealerHand[j].rank.shortName}${unicodeString(blackjackGame.dealerHand[j].suit.name)}`);
            }

            oldEmbed.fields[0].value = `${playerHandString.join(" ")}\n\nValue: ${blackjackGame.playerTotal}`;
            oldEmbed.fields[1].value = `${dealerHandString.join(" ")}\n\nValue: ${blackjackGame.dealerTotal}`;
            let newEmbed = new Discord.RichEmbed(oldEmbed);
            blackjackGame.embedMessage.edit(newEmbed)
        }

        function hitStand() {
            let filter = msg => msg.author.id === message.author.id && msg.channel.id === message.channel.id;
            message.channel.awaitMessages(filter, {max: 1, time: 120000, errors: ['time']})
                .then(messages => {
                    let _message = messages.first();
                    return decisionFunction(_message.content.toLowerCase())
                })
                .catch(() => decisionFunction("stand"))
        }

        function decisionFunction(decision) {
            if (decision === "hit") {
                blackjackGame.hit("player");
                let total = blackjackGame.playerTotal;
                if (total === "Bust") {
                    displayHands();
                    lose();
                    return result(`Bust.`, `-${currency}${bet}`)
                } else {
                    displayHands();
                    return hitStand()
                }

            } else if (decision === "stand") {
                return dealerMachine()
            }
        }
        function dealerMachine() {
            let dealerTotal = blackjackGame.dealerTotal;
            let playerTotal = blackjackGame.playerTotal;
            displayHands()
            if(dealerTotal === "Bust") {
                payout(1);
                return result("Dealer Bust!", `+${currency}${bet}`)
            }
            if(dealerTotal > 16 || dealerTotal === 0) {
                if(dealerTotal === playerTotal) {
                    draw();
                    return result("Draw, try again!", "Push");
                }else if(dealerTotal > playerTotal || dealerTotal === "Blackjack") {
                    lose();
                    return result("Dealer Wins, Better luck next time!", `-${currency}${bet}`);
                }else if(dealerTotal < playerTotal) {
                    payout(1);
                    return result("You Win!", `+${currency}${bet}`)
                }
            }else {
                blackjackGame.hit("dealer");
                dealerMachine();
            }
        }
        function result(result, money) {
            let oldEmbed = blackjackGame.embedMessage.embeds[0];

            oldEmbed.description = `${result} ${money}`;
            let newEmbed = new Discord.RichEmbed(oldEmbed);
            blackjackGame.embedMessage.edit(newEmbed)
        }

        function payout(multiplier) {
            blackjack.delete(message.author.id);
            let addMoney = (bet * multiplier);
            money.findOneAndUpdate({user_ID: message.author.id}, {$inc: {onHand: addMoney}}, (err, data) => {
                if (err) return console.log(err)
            })
        }

        function lose() {
            blackjack.delete(message.author.id);
            money.findOneAndUpdate({user_ID: message.author.id}, {$inc: {onHand: -bet}}, (err, data) => {
                if (err) return console.log(err)
            })
        }

        function draw() {
            blackjack.delete(message.author.id)
        }

        function unicodeString(suit) {
            switch (suit) {
                case "diamonds":
                    return "♦";
                case "clubs":
                    return "♣";
                case "hearts":
                    return "♥";
                case "spades":
                    return "♠";
            }
        }
    })

};

module.exports.help = {
    name: "blackjack",
    cat: "Casino",
    description: "Play blackjack",
    usage: `blackjack [bet]`,
    examples: [`blackjack 100`]
};

module.exports.conf = {
    enabled: true,
    aliases: ["bj"]
};