const raffle = require("../../modules/data.js").raffle;
const embedMaker = require("../../modules/embed.js")
module.exports.run = async (bot, message, args) => {
    if(message.member.roles.has("530728428975161344")) {
        raffle.find({}, (err, data) => {
            let winningNumbers = [
                Math.floor(Math.random() * data.length),
                Math.floor(Math.random() * data.length),
                Math.floor(Math.random() * data.length),
            ]
            let firstWinner = `<@${data[winningNumbers[0]].user_ID}>`
            let secondWinner = `<@${data[winningNumbers[1]].user_ID}>`
            let thirdWinner = `<@${data[winningNumbers[2]].user_ID}>`

            embedMaker.message(message, `1st place winner: ${firstWinner}\n2nd place winner: ${secondWinner}\n3rd place winner: ${thirdWinner}`)
        })
    }
}

module.exports.help = {
    name: "getWinners",
    cat: "Utility",
    description: "Get Raffle Winners",
    usage: `getWinners`,
    examples: [`getWinners`]
}

module.exports.conf = {
    enabled: true,
    aliases: []
};
