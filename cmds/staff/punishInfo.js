const Discord = require("discord.js");
const embedMaker = require("../../modules/embed.js")
const RC = require('reaction-core')
const handler = new RC.Handler()
const { punishments } = require("../../modules/data.js")
module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return

    let member = getMember()
    punishments.find({user_ID: member.user.id, type: "Warning"}, (err, data) => {
        let warnings = data.length
        punishments.find({user_ID: member.user.id, type: "Mute"}, (err, data) => {
            let mutes = data.length
            punishments.find({user_ID: member.user.id, type: "Kick"}, (err, data) => {
                let kicks = data.length
                punishments.find({user_ID: member.user.id}, (err, data) => {
                    let perPage = 10
                    let userPageNum = Math.floor(args[0]) || 1
                    let pageNum = 1
                    let punishmentList = {}
                    punishmentList[pageNum] = []
                    for(let i = 0; i < data.length; i++) {
                        if(i === perPage * pageNum) {
                            pageNum++
                            punishmentList[pageNum] = []
                        }
                        punishmentList[pageNum].push(`**#${i + 1}** - \`Case #${data[i].caseNumber}\` - **${data[i].type}**: ${data[i].message}`)
                    }
                    if(punishmentList[1].length < 1) punishmentList[1].push(`This user has no punishments`)
                    let menu = embedMaker.embed(message, punishmentList[userPageNum].join("\n"), {author: "punishment list", aIcon: bot.icons[message.guild.id], footer: `Page ${userPageNum}/${pageNum} | Warned: ${warnings} | Muted: ${mutes} | Kicked: ${kicks}`})
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
                                    .setDescription(punishmentList[newPageNum])
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
                                    .setDescription(punishmentList[newPageNum])
                                return _m.edit(newEmbed)
                            }
                        }
                    ]
                    let punishmentListMenu = new RC.Menu(menu, menuButtons)
                    handler.addMenus(punishmentListMenu)
                    message.channel.sendMenu(punishmentListMenu)
                }).sort({caseNumber: -1})
            })
        })
    })
    bot.on('messageReactionAdd', (messageReaction, user) => handler.handle(messageReaction, user))

    function getMember() {
        let muteMember = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!muteMember && args[0]) {
            let regex = new RegExp(`(${args[0]})`, `i`)
            let members = message.guild.members.filter(m => m.user.tag.match(regex))
            if(members.size === 1) return members.first()
        }
        return muteMember
    }
};

module.exports.help = {
    name: "punishInfo",
    cat: "Staff - Info",
    description: "Get all punishments of a user",
    usage: "punishInfo [User]",
    examples: ["punishInfo Hattyot"]
};

module.exports.conf = {
    enabled: true,
    aliases: []
};
