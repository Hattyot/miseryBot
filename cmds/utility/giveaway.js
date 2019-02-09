const _giveaway = require("../../modules/classes.js").giveaway
const Discord = require("discord.js");
const ms = require("../../modules/ms.js")
module.exports.run = async (bot, message, args) => {
    let giveaway = new _giveaway()
    message.channel.send(":tada: Alright let's set up a giveaway! First, what channel do you want the giveaway in?\nBtw you can type \`cancel\` at any time to cancel the giveaway creation.")
    chooseChannel()
    function chooseChannel() {
        let channelFilter = m => m.author.id === message.author.id && m.channel.id === message.channel.id
        message.channel.awaitMessages(channelFilter, { max: 1, time: 120000, errors: ['time'] }).then(collected => {
            let _message = collected.first()
            let channelIDRegex = /<#(\d{18})>/
            let allChannels = message.guild.channels.filter(c => c.type === "text").map(c => c.name)
            let channel
            if(_message.content.match(channelIDRegex)) {
                console.log(_message.content.match(channelIDRegex))
                channel = message.guild.channels.get(_message.content.match(channelIDRegex)[1])
                giveaway.setChannel(channel.id)
            }else if(allChannels.indexOf(_message.content) > -1) {
                channel = message.guild.channels.find(c => c.name === _message.content)
                giveaway.setChannel(channel.id)
            }else {
                message.channel.send("I couldn't find that channel, please try again.")
                return chooseChannel()
            }
            message.channel.send(`Ok, the giveaway will be in <#${giveaway.channel}>. Second how long should the giveaway last?\n\n\`Enter the duration in this format: 1d 2h 3m 4s\`\n\`e.g. 24h\``)
            giveaway.setChannel(channel.id)
            giveawayTime()

            
        })
    }
    function giveawayTime() {
        let timeFilter = m => m.author.id === message.author.id && m.channel.id === message.channel.id
        message.channel.awaitMessages(timeFilter, { max: 1, time: 120000, errors: ['time'] }).then(collected => {
            let _message = collected.first()
            if(ms(_message.content)) {
                giveaway.setTime(ms(_message.content))
                message.channel.send(`Neato! This giveaway will end id ${ms(ms(_message.content))}! Thirdly, how many winners should there be?\n\n\`Please enter a number of winners between 1 and 10.\``)
                return winnerAmount()
            }else {
                message.channel.send("I couldn't get the time from that\n\n\`Enter the duration in this format: 1d 2h 3m 4s\`\n\`e.g. 24h\`")
                return giveawayTime()
            }

        })
    }
    function winnerAmount() {
        let amountFilter = m => m.author.id === message.author.id && m.channel.id === message.channel.id && Math.round(m.content) < 10 && Math.round(m.content) > 0
        message.channel.awaitMessages(amountFilter, { max: 1, time: 120000, errors: ['time'] }).then(collected => {
            let _message = collected.first()
            giveaway.setWinnerAmount(_message.content)
            message.channel.send(`Noice! ${_message.content} winner(s) it is! Finally, what do you want to give away?`)
            return prize()
        })
    }
    function prize() {
        let prizeFilter = m => m.author.id === message.author.id && m.channel.id === message.channel.id
        message.channel.awaitMessages(prizeFilter, { max: 1, time: 120000, errors: ['time'] }).then(collected => {
            let _message = collected.first()
            giveaway.setPrize(_message.content)
            return sendGiveawayMessage()
        })
    }

    function sendGiveawayMessage() {
        let channel = message.guild.channels.get(giveaway.channel)
        let time = Math.round(giveaway.time)
        let winnerAmount = giveaway.winnerAmount
        let prize = `${giveaway.prize}`
        let endDate = new Date(Date.now() + time)
        let footerMessage
        if(Math.floor(winnerAmount > 1)) { footerMessage = `${winnerAmount} Winners | Ends at` }

        let embed = new Discord.RichEmbed()
            .setAuthor(`Giving away: ${prize}`)
            .setDescription(`React with :tada: to enter!\nTime Left: ${ms(time, { long: true })}`)
            .setFooter(footerMessage || "Ends At")
            .setTimestamp(endDate)
            .setColor(bot.config[message.guild.id].embedColor)
        channel.send(":tada: **GIVEAWAY** :tada:", {embed: embed}).then(m => {
            m.react("🎉")
            giveaway.setMessage(m)
            return giveaway.startGiveaway()
        })
    }

}

module.exports.help = {
    name: "giveaway",
    cat: "Utility",
    description: "Starts giveaway creation process",
    usage: `giveaway`,
    examples: [`giveaway`]
}

module.exports.conf = {
    enabled: true,
    aliases: []
};