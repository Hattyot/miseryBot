const level = require("../../modules/data.js").level
const embedMaker = require("../../modules/embed.js")
module.exports.run = async (bot, message, args) => {
    level.find({}, (err, data) => {
        let perPage = 10
        let userPageNum = Math.floor(args[0]) || 1
        let pageNum = 1
        let leaderboard = {}
        leaderboard[pageNum] = []
        for(let i = 0; i < rows.length; i++) {
            if(i === perPage * pageNum) {
                pageNum++
                leaderboard[pageNum] = []
            }
            leaderboard[pageNum].push(`**#${i + 1}** - <@${data[i].user_ID}> - **Level**: \`${data[i].level}\` **XP**: \`${data[i].xp}\``)
        }
        embedMaker.message(message, leaderboard[userPageNum].join("\n"), {author: "Leaderboard", aIcon: bot.icons[message.guild.id], footer: `Page ${userPageNum}/${pageNum}`})
    })
}

module.exports.help = {
    name: "levels",
    cat: "Level",
    description: "Shows the level leaderboard",
    usage: `levels (page number)`,
    examples: [`levels`, `levels 2`]
}

module.exports.conf = {
    enabled: true,
    aliases: [],
};