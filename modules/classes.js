const Discord = require("discord.js");
const ms = require("./ms.js")
let giveaway = class Blackjack {
    constructor() {
    }

    setChannel(channelID) {
        this.channelID = channelID
    }
    setTime(time) {
        this._time = time
    }
    setWinnerAmount(amount) {
        this._winnerAmount = amount
    }
    setPrize(prize) {
        this._prize = prize
    }
    setMessage(message) {
        this.message = message
    }

    get channel() {
        return this.channelID
    }
    get time() {
        return this._time
    }
    get winnerAmount() {
        return this._winnerAmount
    }
    get prize() {
        return this._prize
    }

    startGiveaway() {
        this.endTime = Date.now() + Math.floor(this._time)
        this.timeLeft = endTime - Date.now()
        if(this.timeLeft < 60000) {
            shortInterval()
        }else {
            let intervalLong = setInterval(() => {
                if(this.timeLeft < 60000) {
                    shortInterval()
                    return clearInterval(intervalLong)
                }else {
                    editTimeLeft()
                }
            }, 30000)
        }
        function shortInterval() {
            let intervalShort = setInterval(() => {
                if(Date.now() > endTime) {
                    giveawayEnd()
                    return clearInterval(intervalShort)
                }else {
                    editTimeLeft()
                }
            }, 5000)
        }
        function giveawayEnd() {
                clearInterval()
                let channel = this.message.channel
                channel.fetchMessage(this.message.id).then(m => {
                    let reactions = m.reactions.get("🎉").users.filter(u => !u.bot).map(u => u.id)
                    let winner = reactions[Math.floor(Math.random() * reactions.length)];
                    let embed = this.message.embeds[0]
                    embed.description = `Winner: <@${winner}>`
                    embed.footer = `Ended At`
                    embed.timeStamp = Date.now()
                    let newEmbed = new Discord.RichEmbed(embed)
                        .setColor("#09af00")
                    m.edit(':tada: **GIVEAWAY ENDED** :tada:', {embed: newEmbed})
                    m.channel.send(`congratulations <@${winner}>! You've won ${this._prize}`)

                })
        }
        function editTimeLeft() {
            this.timeLeft = this.endTime - Date.now()
            let embed = this.message.embeds[0]
            embed.description = `React with :tada: to enter!\nTime Left: ${ms(timeLeft)}`
            let newEmbed = new Discord.RichEmbed(embed)
            this.message.edit(':tada: **GIVEAWAY** :tada:', {embed: newEmbed})
        }
    }

}
module.exports = {
    giveaway: giveaway
};