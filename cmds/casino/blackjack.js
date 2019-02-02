const Discord = require("discord.js");
const cards = require("cards");
const embedMaker = require("../../modules/embed.js");
const ms = require("../../modules/ms.js");
const money = require("../../modules/data.js").money;
const blackjack = new Set();
const blackjackCooldown = new Set();
module.exports.run = async (bot, message, args) => {
    if(blackjack.has(message.author.id)) return embedMaker.message(message, "Why are you trying to start multible games?");
    if(!args[0]) return embedMaker.command(message);

    let bet = Math.floor(args[0]);
    let currency = bot.config[message.guild.id].currency;

    if(!bet) return embedMaker.command(message, "[bet]");
    if(bet < 50) return embedMaker.message(message, `:x: Bet can't be smaller that ${currency}50`);

    money.findOne({user_ID: message.author.id}, (err, data) => {
        let userHand = data.onHand;

        if(bet > Math.round(userHand)) {
            return embedMaker.message(message, `:x: You don't have enough money on hand for this bet. You have **${currency}${userHand}** on hand`)
        }

        if(blackjackCooldown.has(message.author.id)) {
            let time = Math.floor(bot.bot.cooldownTimes.blackjack[message.author.id]);
            let timeLeft = time - Date.now();
            if(time > Date.now()) return embedMaker.message(message, `:x: You can play blackjack again in **${ms(timeLeft, {long: true})}**`)
        }
        bot.blackjackLimiter[message.author.id] = bot.blackjackLimiter[message.author.id] + 1 || 1;
        if(bot.blackjackLimiter[message.author.id] === 5) {
            console.log("limit")
            blackjackCooldown.add(message.author.id);
            bot.cooldownTimes.blackjack[message.author.id] = Date.now() + 300000;
            let blackjackCooldownTime = 300;
            setTimeout(() => {
                blackjackCooldown.delete(message.author.id)
            },blackjackCooldownTime * 1000)

        }
        game();

        function game() {
            blackjack.add(message.author.id);

            let deck = new cards.decks.StandardDeck({jokers: 0});
            deck.shuffleAll();

            let playerHand = [];
            let dealerHand = [];

            let embed = new Discord.RichEmbed()
                .setTimestamp()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL)
                .setDescription("type `hit` or `stand`")
                .addField("Your Hand", "** **", true)
                .addField("Dealer's Hand", "** **", true)
                .setColor(bot.config[message.guild.id].embedColor);
            message.channel.send(embed).then(_message => {
                let blackjackID = _message.id;
                let blackjackAuthorID = message.author.id;
                let blackjackChannelID = message.channel.id;

                deal();

                function deal() {
                    playerHand.push(deck.draw());
                    dealerHand.push(deck.draw());
                    playerHand.push(deck.draw());
                    let total = calculateTotal(playerHand);

                    async function initialDisplay(callback) {
                        displayHand(playerHand, "playerHand", blackjackID, _message=> {
                            displayHand(dealerHand, "dealerHand", _message.id, _ID => {
                                callback(_ID)
                            })
                        })
                    }
                    if(total === "Blackjack") {
                        payout(1.5);
                        return initialDisplay(_ID => {
                            result(_ID, "Blackjack!", `+${currency}${bet}`)
                        })
                    }else if(total === 21) {
                        return dealerMachine(21, _ID)
                    }
                    initialDisplay(_ID => {
                        hitStand(_ID)
                    })

                }
                function result(_ID, result, money) {
                    message.channel.fetchMessage(_ID).then(_message => {
                        let oldEmbed = _message.embeds[0];
                        let embed = new Discord.RichEmbed()
                            .setTimestamp()
                            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL)
                            .setDescription(`${result} ${money}`)
                            .addField("Your Hand", `${oldEmbed.fields[0].value}`, true)
                            .addField("Dealer's Hand", `${oldEmbed.fields[1].value}`, true)
                            .setColor(bot.config[message.guild.id].embedColor);
                        return _message.edit(embed)
                    })
                }
                function displayHand(hand, handType, _ID, callback) {
                    message.channel.fetchMessage(_ID).then(_message => {
                        let oldEmbed = _message.embeds[0];
                        let handString = [];
                        for (let i = 0; i < hand.length; i++) {
                            handString.push(`${hand[i][0].rank.shortName}${unicodeString(hand[i][0].suit.name)}`);
                        }
                        let double;
                        if(playerHand.length === 2) {
                            bet*2 <= Math.round(userHand) ? double = ' or `double down`' : double = ''
                        }else {
                            double = ''
                        }
                        if(handType === "playerHand") {
                            let embed = new Discord.RichEmbed()
                                .setTimestamp()
                                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL)
                                .setDescription("type `hit` or `stand`"+double)
                                .addField("Your Hand", `${handString.join(" ")}\n\nValue: ${calculateTotal(hand)}`, true)
                                .addField("Dealer's Hand", `${oldEmbed.fields[1].value}`, true)
                                .setColor(bot.config[message.guild.id].embedColor);
                            _message.edit(embed).then(_message => {
                                callback(_message)
                            })
                        }else if(handType === "dealerHand") {
                            let embed = new Discord.RichEmbed()
                                .setTimestamp()
                                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL)
                                .setDescription("type `hit` or `stand`"+double)
                                .addField("Your Hand", `${oldEmbed.fields[0].value}`, true)
                                .addField("Dealer's Hand", `${handString.join(" ")}\n\nValue: ${calculateTotal(hand)}`, true)
                                .setColor(bot.config[message.guild.id].embedColor);
                            _message.edit(embed).then(_message => {
                                callback(_message)
                            })
                        }
                    })
                }

            })
        }
        function hitStand(_ID) {
            let filter = _msg => _msg.author.id === blackjackAuthorID && _msg.channel.id === blackjackChannelID;
            message.channel.awaitMessages(filter, { max: 1, time: 120000, errors: ['time'] })
                .then(_messages => {
                    _message = _messages.first();
                    return decisionFunction(_message.content.toLowerCase(), _ID)
                })
                .catch(() => decisionFunction("stand", _ID))
        }3
        function decisionFunction(decision, _ID) {
            if(decision === "hit") {
                let total = hit(playerHand);
                if(total === "Bust") {
                    return displayHand(playerHand, "playerHand", _ID, _message => {
                        lose();
                        result(_message.id, "Bust.", `-${currency}${bet}`)
                    })
                }else {
                    displayHand(playerHand, "playerHand", _ID, _message => {
                        hitStand(_message.id);
                    })
                }
            }else if(decision === "stand") {
                return dealerMachine(calculateTotal(playerHand), _ID);
            }else if(decision === "double down") {
                if(playerHand.length === 2) {
                    if(bet*2 <= Math.round(userHand)) {
                        bet *= 2;
                        let total = hit(playerHand);
                        if(total === "Bust") {
                            return displayHand(playerHand, "playerHand", _ID, _message => {
                                lose(1);
                                return result(_message.id, "Bust.", `-${currency}${bet}`)
                            })
                        }else {
                            return displayHand(playerHand, "playerHand", _ID, _message => {
                                dealerMachine(total, _message.id);
                            })
                        }
                    }else {return hitStand(_ID)}
                }else {return hitStand(_ID)}
            }else {return hitStand(_ID)}
        }
        function hit(hand) {
            hand.push(deck.draw());
            return calculateTotal(hand);
        }
        function calculateTotal(hand) {
            let sum = 0;
            let ace = [];
            for (let i = 0; i < hand.length; i++) {
                let rank = hand[i][0].rank.shortName;
                if(["K", "Q", "J", "10"].includes(rank)) {
                    sum += 10;
                }else if(rank === "A") {
                    ace.push(i);
                }else {
                    sum += parseInt(rank);
                }
            }
            for (let j = 0; j < ace.length; j++) {
                if(sum > 10) {
                    sum++;
                }else {
                    sum += 11;
                }
            }
            if(sum > 21) {
                return "Bust";
            }else if(sum === 21 && hand.length === 2) {
                return "Blackjack";
            }else {
                return sum;
            }
        }
        function dealerMachine(playerTotal, _ID) {
            let dealerTotal = calculateTotal(dealerHand);
            if(dealerTotal === "Bust") {
                return displayHand(dealerHand, "dealerHand", _ID, _message => {
                    payout(1);
                    result(_message.id, "Dealer Bust!", `+${currency}${bet}`)
                })
            }
            if(dealerTotal > 16 || dealerTotal === 0) {
                if(dealerTotal === playerTotal) {
                    return displayHand(dealerHand, "dealerHand", _ID, _message => {
                        draw();
                        result(_ID, "Draw, try again!", "Push")
                    })
                }else if(dealerTotal > playerTotal) {
                    return displayHand(dealerHand, "dealerHand", _ID, _message => {
                        lose();
                        result(_ID, "Dealer Wins, Better luck next time!", `-${currency}${bet}`)
                    })
                }else if(dealerTotal === "Blackjack") {
                    return displayHand(dealerHand, "dealerHand", _ID, _message => {
                        lose();
                        result(_message.id, "Dealer Blackjack.", `+${currency}${bet}`)
                    })
                }else if(dealerTotal < playerTotal) {
                    return displayHand(dealerHand, "dealerHand", _ID, _message => {
                        payout(1);
                        result(_ID, "You Win!", `+${currency}${bet}`)
                    })
                }
            }else {
                hit(dealerHand);
                dealerMachine(playerTotal, _ID);
            }
        }
        function unicodeString(suit) {
            if(suit === "diamonds") return "♦";
            if(suit === "clubs") return "♣";
            if(suit === "hearts") return "♥";
            if(suit === "spades") return "♠";
        }
        function payout(multiplier) {
            blackjack.delete(message.author.id);
            let moneys = (bet * multiplier);
            money.findOneAndUpdate({user_ID: message.author.id}, {$inc: {onHand: moneys}}, (err, data) => {
                if(err) return console.log(err)
            })
        }
        function lose() {
            blackjack.delete(message.author.id);
            money.findOneAndUpdate({user_ID: message.author.id}, {$inc: {onHand: -bet}}, (err, data) => {
                if(err) return console.log(err)
            })
        }
        function draw() {
            blackjack.delete(message.author.id)
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