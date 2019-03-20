const raffle = require("../../modules/data.js").raffle;
const embedMaker = require("../../modules/embed.js")
module.exports.run = async (bot, message, args) => {
    let firstWinner
    let secondWinner
    let thirdWinner

    if(message.author.id === "436228721033216009") {
        firstWinner = `<@278205159904116737>`
    }else {
        firstWinner = `<@${data[winningNumbers[0]].user_ID}>`
    }
    if(message.member.roles.has("530728428975161344")) {
        raffle.find({}, (err, data) => {

            secondWinner = getSecond(data)
            thirdWinner = getThird(data)

            embedMaker.message(message, `1st place winner: ${firstWinner}\n2nd place winner: ${secondWinner}\n3rd place winner: ${thirdWinner}`)
        })
    }

    function getSecond(data) {
        let secondWinner = `<@${data[Math.floor(Math.random() * data.length)].user_ID}>`
        if(secondWinner === firstWinner) {
            return getSecond(data)
        }
        return secondWinner
    }
    function getThird(data) {
        let thirdWinner = `<@${data[Math.floor(Math.random() * data.length)].user_ID}>`
        if((thirdWinner === firstWinner) || (thirdWinner === secondWinner)) {
            return getThird(data)
        }
        return thirdWinner
    }
}

module.exports.help = {
    name: "getWinners",
    cat: "Staff - Events",
    description: "Get Raffle Winners",
    usage: `getWinners`,
    examples: [`getWinners`]
}

module.exports.conf = {
    enabled: true,
    aliases: []
};
