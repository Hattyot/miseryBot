const Discord = require("discord.js");
const embedMaker = require("../../modules/embed.js");
const ms = require("../../modules/ms.js");
const { money } = require("../../modules/data.js");
const rouletteMachine = require("../../modules/games.js").roulette;
module.exports.run = async (bot, message, args) => {
    const redBlack = {
        red: [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36],
        black: [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]
    };
    
    const spaces = new Discord.Collection([
        ['numbers', { values: redBlack.red.concat(redBlack.black).concat([0]).map(item => item.toString()), multiplier: 36 }],
        ['dozens', { values: ['1-12', '13-24', '25-36'], multiplier: 3 }],
        ['columns', { values: ['1st', '2nd', '3rd'], multiplier: 3 }],
        ['halves', { values: ['1-18', '19-36'], multiplier: 2 }],
        ['parity', { values: ['even', 'odd'], multiplier: 2 }],
        ['colors', { values: ['red', 'black'], multiplier: 2 }]
    ]);

    if (!args[0]) return embedMaker.command(message);

    let bet = Math.round(args[0]);
    let space = args[1]
    let currency = bot.config[message.guild.id].currency;
    let userID = message.author.id

    if(!bet) return embedMaker.command(message, "[bet]");
    if(!space) return embedMaker.command(message, "[space]");
    if(bet < 50) return embedMaker.message(message, `Bet can't be smaller that ${currency}50`);
    if(!spaces.find(v => v.values.includes(space))) {
        return embedMaker.command(message, "[space]", m => {
            if(rouletteMachine.findGame(message.guild.id)) {
                m.delete(2000)
                return message.delete(2000)
            }
        })
    }

    money.findOne({user_ID: userID}, async (err, data) => {
        if(!data) {
            let data = { onHand: 0, inBank: 200, user_ID: userID }
            let newMoney = new money(data)
            newMoney.save()
        }
        if (bet > data.onHand) return embedMaker.message(message, `You don't have enough money on hand for this bet.\nYou have **${currency}${data.onHand}** on hand`);

        let rouletteGame = rouletteMachine.findGame(message.guild.id)
        if(!rouletteGame) {
            rouletteGame = new rouletteMachine(message.guild.id, redBlack, spaces)
            rouletteGame.addBet(message.author, bet, space)
        }else {
            rouletteGame.addBet(message.author, bet, space)
            let oldEmbed = rouletteGame.embedMessage.embeds[0]
            oldEmbed.fields[1].value += `\n<@${message.author.id}> - \`${space}\` - **${currency}${bet}**`
            let newEmbed = new Discord.RichEmbed(oldEmbed)
            return rouletteGame.embedMessage.edit({embed: newEmbed, files: ['https://user-images.githubusercontent.com/39061940/55289925-3abb3e80-53d5-11e9-8146-295fe7660e0c.png']})
        }

        let embed = new Discord.RichEmbed()
            .setTimestamp()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL)
            .setDescription("A game of roulette has been initiated.\n\n`Type %roulette [bet] [space]` in the next 45 seconds to place your bets!")
            .addField("Time Left", `45`, false)
            .addField("Bets", `<@${message.author.id}> - \`${space}\` - **${currency}${bet}**`, false)
            .setColor(bot.config[message.guild.id].colors.default)
            .setImage(``)
        message.channel.send({embed, files: ['https://user-images.githubusercontent.com/39061940/55289925-3abb3e80-53d5-11e9-8146-295fe7660e0c.png']}).then(async _msg => {
            rouletteGame.setEmbedMessage(_msg)
            await countdown.then(() => {
                setTimeout(async () => {
                    let players = rouletteGame.bets
                    let winners = []
                    let losers = []
                    for(let i = 0; i < players.length; i++) {
                        if(players[i].winnings > 0) {
                            winners.push(players[i])
                            await money.findOneAndUpdate({user_ID: players[i].user.id}, {$inc: {onHand: Math.floor(players[i].winnings - bet)}}, (err, data) => {
                                if (err) return console.log(err)
                            })
                        }else {
                            losers.push(players[i])
                            await money.findOneAndUpdate({user_ID: players[i].user.id}, {$inc: {onHand: Math.floor(bet)}}, (err, data) => {
                                if (err) return console.log(err)
                            })
                        }
                        
                    }
                    let oldEmbed = rouletteGame.embedMessage.embeds[0]
                    oldEmbed.fields[0].name = "Winners"
                    oldEmbed.fields[0].value = winners.sort((a, b) => parseFloat(a.winnings) - parseFloat(b.winnings)).map(w => `<@${w.user.id}> **+${currency}${w.winnings}**`).join("\n") || "None"
                    oldEmbed.fields[0].inline = true
    
                    oldEmbed.fields[1].name = "Losers"
                    oldEmbed.fields[1].value = losers.sort((a, b) => parseFloat(a.winnings) - parseFloat(b.winnings)).map(w => `<@${w.user.id}> **-${currency}${bet}**`).join("\n") || "None"
                    oldEmbed.fields[1].inline = true
    
                    oldEmbed.description = `Winning Number: **${rouletteGame.winSpaces[0]} ${rouletteGame.winSpaces[1]}**`
    
                    let newEmbed = new Discord.RichEmbed(oldEmbed)
                    rouletteGame.embedMessage.edit(newEmbed)
                    rouletteGame.endGame(message.guild.id)
                }, 2000)
            })
        })

        let countdown = new Promise((resolve, reject) => {
            let interval = setInterval(() => {
                let oldEmbed = rouletteGame.embedMessage.embeds[0]
                let newTime = Math.floor(oldEmbed.fields[0].value) - 5
                if(newTime === 0) {
                    clearInterval(interval)
                    oldEmbed.fields[0].value = `***The roulette starts spinning!***`
                    let newEmbed = new Discord.RichEmbed(oldEmbed)
                    rouletteGame.embedMessage.edit({embed: newEmbed, files: ['https://user-images.githubusercontent.com/39061940/55289925-3abb3e80-53d5-11e9-8146-295fe7660e0c.png']})
                    resolve("done")
                }else {
                    oldEmbed.fields[0].value = newTime.toString()
                    let newEmbed = new Discord.RichEmbed(oldEmbed)
                    rouletteGame.embedMessage.edit({embed: newEmbed, files: ['https://user-images.githubusercontent.com/39061940/55289925-3abb3e80-53d5-11e9-8146-295fe7660e0c.png']})
                }
            }, 5000)
        })
    })


};

module.exports.help = {
    name: "roulette",
    cat: "Casino - Games",
    description: "Play a game of roulette",
    usage: `roulette [bet] [space]`,
    examples: [`roulette 100 2nd`]
};

module.exports.conf = {
    enabled: true,
    aliases: []
};
