const level = require("../../modules/data.js").level
const embedMaker = require("../../modules/embed.js")
const RC = require('reaction-core')
const handler = new RC.Handler()
module.exports.run = async (bot, message, args) => {
    level.find({}, (err, data) => {
        let perPage = 10
        let userPageNum = Math.floor(args[0]) || 1
        let pageNum = 1
        let leaderboard = {}
        leaderboard[pageNum] = []
        for(let i = 0; i < data.length; i++) {
            if(i === perPage * pageNum) {
                pageNum++
                leaderboard[pageNum] = []
            }
            let user = bot.guilds.get(message.guild.id).members.get(data[i].user_ID)
            leaderboard[pageNum].push(`**#${i + 1}** - ${user.tag} - **Level**: \`${data[i].level}\` **XP**: \`${data[i].xp}\``)
        }
        embedMaker.message(message, leaderboard[userPageNum].join("\n"), {author: "Leaderboard", aIcon: bot.icons[message.guild.id], footer: `Page ${userPageNum}/${pageNum}`}, (msg => {
            function leaderBoard(userPageNum) {
                let perPage = 10
                let pageNum = 1
                let leaderboard = {}
                leaderboard[pageNum] = []
                for(let i = 0; i < data.length; i++) {
                    if(i === perPage * pageNum) {
                        pageNum++
                        leaderboard[pageNum] = []
                    }
                    let user = bot.guilds.get(message.guild.id).members.get(data[i].user_ID)
                    leaderboard[pageNum].push(`**#${i + 1}** - ${user.tag} - **Level**: \`${data[i].level}\` **XP**: \`${data[i].xp}\``)
                }
                return {
                    leaderboard: leaderboard,
                    pageNum: pageNum
                }
            }
            let menu = msg.embeds[0]
            let menuButtons = [
                {
                    emoji: '➡',
                    run: (user, _m) => {
                        if(user.id !== message.author.id) return
                        let embed = _m.embeds[0]
                        let currentPageNum = Math.round(embed.footer.text.match(/ \d/)[0])
                        let lb = leaderBoard(currentPageNum + 1)
                        let newEmbed = new Discord.RichEmbed(embed)
                            .setFooter(`Page ${currentPageNum + 1}/${lb.pageNum}`)
                            .setDescription(lb.leaderboard)
                        return _m.edit(newEmbed)
                    }
                },
                {
                    emoji: '⬅',
                    run: (user, _m) => {
                        if(user.id !== message.author.id) return
                        let embed = _m.embeds[0]
                        let currentPageNum = Math.round(embed.footer.text.match(/ \d/)[0])
                        if(currentPageNum - 1 <= 0) return
                        let lb = leaderBoard(currentPageNum - 1)
                        let newEmbed = new Discord.RichEmbed(embed)
                            .setFooter(`Page ${currentPageNum - 1}/${lb.pageNum}`)
                            .setDescription(lb.leaderboard)
                        return _m.edit(newEmbed)
                    }
                },
            ]
            let leaderBoardMenu = new RC.Menu(menu, menuButtons)
            handler.addMenus(auctionHouseMenu)
        }))
    })
    bot.on('messageReactionAdd', (messageReaction, user) => handler.handle(messageReaction, user))
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