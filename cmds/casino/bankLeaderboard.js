const Discord = require("discord.js");
const { money } = require("../../modules/data.js");
const embedMaker = require("../../modules/embed.js")
const RC = require('reaction-core')
const handler = new RC.Handler()
module.exports.run = async (bot, message, args) => {
    money.find({}, (err, data) => {
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
            let member = bot.guilds.get(message.guild.id).members.get(data[i].user_ID)
            if(!member) continue
            leaderboard[pageNum].push(`**#${i + 1}** - ${member.user.tag} - **Money In Bank**: \`${data[i].inBank}\``)
        }
        let menu = embedMaker.embed(message, leaderboard[userPageNum].join("\n"), {author: "Leaderboard", aIcon: bot.icons[message.guild.id], footer: `Page ${userPageNum}/${pageNum}`})
        let menuButtons = [
            {
                emoji: '⬅',
                run: (user, _m) => {
                    if(user.id !== message.author.id) return
                    let embed = _m.embeds[0]
                    let newPageNum = Math.round(embed.footer.text.match(/ \d/)[0]) - 1
                    if(newPageNum >= pageNum) return
                    if(newPageNum <= 0) return
                    let newEmbed = new Discord.RichEmbed(embed)
                        .setFooter(`Page ${newPageNum}/${pageNum}`)
                        .setDescription(leaderboard[newPageNum])
                    return _m.edit(newEmbed)
                }
            },
            {
                emoji: '➡',
                run: (user, _m) => {
                    if(user.id !== message.author.id) return
                    let embed = _m.embeds[0]
                    let newPageNum = Math.round(embed.footer.text.match(/ \d/)[0]) + 1
                    if(newPageNum > pageNum) return
                    let newEmbed = new Discord.RichEmbed(embed)
                        .setFooter(`Page ${newPageNum}/${pageNum}`)
                        .setDescription(leaderboard[newPageNum])
                    return _m.edit(newEmbed)
                }
            }
        ]
        let leaderBoardMenu = new RC.Menu(menu, menuButtons)
        handler.addMenus(leaderBoardMenu)
        message.channel.sendMenu(leaderBoardMenu)
    }).sort({inBank: -1})
    bot.on('messageReactionAdd', (messageReaction, user) => handler.handle(messageReaction, user))
};
module.exports.help = {
    name: "bankLeaderboard",
    cat: "Casino",
    description: "See who has the most moneys",
    usage: `bankLeaderboard (page)`,
    examples: [`bankLeaderboard`, `bankLeaderboard 2`]
};

module.exports.conf = {
    enabled: true,
    aliases: ["banklb"]
};