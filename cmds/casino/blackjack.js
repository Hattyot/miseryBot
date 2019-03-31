const Discord = require("discord.js");
const embedMaker = require("../../modules/embed.js");
const ms = require("../../modules/ms.js");
const { money } = require("../../modules/data.js");
const blackjack = new Set();
const blackjackMachine = require("../../modules/games.js").blackjack;
const RC = require('reaction-core')
const handler = new RC.Handler()
module.exports.run = async (bot, message, args) => {
    if (blackjack.has(message.author.id)) return embedMaker.message(message, "Why are you trying to start multible games?");
    if (!args[0]) return embedMaker.command(message);

    let bet = Math.round(args[0]);
    let currency = bot.config[message.guild.id].currency;
    let userID = message.author.id

    if (!bet) return embedMaker.command(message, "[bet]");
    if (bet < 50) return embedMaker.message(message, `Bet can't be smaller that ${currency}50`);

    money.findOne({user_ID: userID}, async (err, data) => {
        if(!data) {
            let data = { onHand: 0, inBank: 200, user_ID: userID }
            let newMoney = new money(data)
            newMoney.save()
        }
        if (bet > data.onHand) return embedMaker.message(message, `You don't have enough money on hand for this bet.\nYou have **${currency}${data.onHand}** on hand`);

        if (bot.cooldownTimes.blackjack[userID] > Date.now()) {
            let time = bot.cooldownTimes.blackjack[userID];
            let timeLeft = time - Date.now();
            if (time > Date.now()) return embedMaker.message(message, `You can play blackjack again in **${ms(timeLeft, {long: true})}**`)
        }

        bot.games.blackjackLimiter[userID] = bot.games.blackjackLimiter[userID] + 1 || 1;

        if (bot.games.blackjackLimiter[userID] === 5) {
            bot.cooldownTimes.blackjack[userID] = Date.now() + 300000;
            setTimeout(() => {
                bot.cooldownTimes.blackjack[userID] = 0
            }, 300000)

        }

        blackjack.add(userID);

        let blackjackGame = new blackjackMachine();

        let embed = new Discord.RichEmbed()
            .setTimestamp()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL)
            .setDescription("click on H to `hit` or S to `stand`")
            .addField("Your Hand", "** **", true)
            .addField("Dealer's Hand", "** **", true)
            .setColor(bot.config[message.guild.id].colors.default);
            
        let menuButtons = [
            {
                emoji: '🇭',
                run: (user, _m) => {
                    if(user.id !== message.author.id) return
                    decisionFunction("hit")
                }
            },
            {
                emoji: '🔷',
                run: (user, _m) => {
                    if(user.id !== message.author.id) return
                    return
                }
            },
            {
                emoji: '🇸',
                run: (user, _m) => {
                    if(user.id !== message.author.id) return
                    decisionFunction("stand")
                }
            }
        ]
        let blackjackMenu = new RC.Menu(embed, menuButtons)
        handler.addMenus(blackjackMenu)
        message.channel.send(embed).then(async _msg => {
            for(let i = 0; i < menuButtons.length; i++) {
                await _msg.react(menuButtons[i].emoji).catch(console.error)
            }
            blackjackMenu.register(_msg)
            blackjackGame.setEmbedMessage(_msg);
            startGame()
        });

        async function startGame() {
            blackjackGame.deal();
            if (blackjackGame.playerTotal === "Blackjack" || bet === 1537) {
                payout(1.5);
                await displayHands()
                return result("Blackjack!", `${currency}${Math.round(bet * 1.5)}`, "win");
                
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
            let filter = msg => msg.author.id === userID && msg.channel.id === message.channel.id;
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
                    return result(`Bust.`, `-${currency}${bet}`, "lose")
                }else if(total === 21) {
                    return dealerMachine()
                }else {
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
                return result("Dealer Bust!", `+${currency}${bet}`, "win")
            }
            if(dealerTotal > 16 || dealerTotal === 0) {
                if(dealerTotal === playerTotal) {
                    draw();
                    return result("Draw, try again!", "Push", "draw");
                }else if(dealerTotal > playerTotal || dealerTotal === "Blackjack") {
                    lose();
                    return result("Dealer Wins, Better luck next time!", `-${currency}${bet}`, "lose");
                }else if(dealerTotal < playerTotal) {
                    payout(1);
                    return result("You Win!", `+${currency}${bet}`, "win")
                }
            }else {
                blackjackGame.hit("dealer");
                dealerMachine();
            }
        }
        async function result(result, money, endType) {
            let oldEmbed = blackjackGame.embedMessage.embeds[0];
            oldEmbed.description = `${result} ${money}`;

            let newEmbed = new Discord.RichEmbed(oldEmbed);
            switch (endType) {
                case "win":
                    newEmbed.setColor(bot.config[message.guild.id].colors.green)
                    break;
                case "lose":
                    newEmbed.setColor(bot.config[message.guild.id].colors.red)
                    break;
                case "draw":
                    newEmbed.setColor(bot.config[message.guild.id].colors.orange)
                    break;
                default:
                    newEmbed.setColor(bot.config[message.guild.id].colors.green)
                    break;
            }
            blackjackGame.embedMessage.edit(newEmbed)
            handler.removeMenu(blackjackGame.embedMessage.id)
            blackjackGame.embedMessage.reactions.forEach(r => {
                r.remove()
            })
        }

        function payout(multiplier) {
            blackjack.delete(userID);
            let addMoney = Math.round(bet * multiplier);
            money.findOneAndUpdate({user_ID: userID}, {$inc: {onHand: addMoney}}, (err, data) => {
                if (err) return console.log(err)
            })
        }

        function lose() {
            blackjack.delete(userID);
            money.findOneAndUpdate({user_ID: userID}, {$inc: {onHand: -bet}}, (err, data) => {
                if (err) return console.log(err)
            })
        }

        function draw() {
            blackjack.delete(userID)
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
    bot.on('messageReactionAdd', (messageReaction, user) => handler.handle(messageReaction, user))
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