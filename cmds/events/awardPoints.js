const { points, raffle } = require("../../modules/data.js")
const embedMaker = require("../../modules/embed.js")
module.exports.run = async (bot, message, args) => {
    console.log("vawardPoints")
    let awardMember = getAwardMember()
    let amount = args[1]

    if(!args[0]) return embedMaker.command(message)
    if(!awardMember) return embedMaker.command(message, `[user]`)
    if(!amount) return embedMaker.command(message, `[amount]`)
    if(awardMember.roles.has("530728428975161344")) {
        return embedMaker.message(message, `Sorry staff can't have points`)
    }
    points.findOne({user_ID: awardMember.user.id}, (err, data) => {
        if(!data) {
            let newPoints = new raffle({
                user_ID: `${message.author.id}`,
                amount: amount
            });
            newPoints.save()
                .then(r => console.log(r))
                .catch(e => console.log(e));
            embedMaker.message(message, `<@${awardMember.user.id}> has been awarded **${amount}** points`)
        }else {
            points.findOneAndUpdate({user_ID: awardMember.user.id}, {$inc: {amount: amount}}, (err, data) => {
                if(err) return console.log(err)
                embedMaker.message(message, `<@${awardMember.user.id}> has been awarded **${amount}** points`)
            });
        }
    })


    function getAwardMember() {
        let awardMember = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!awardMember && args[0]) {
            let regex = new RegExp(`(${args[0]})`, `i`)
            let members = message.guild.members.filter(m => m.user.tag.match(regex))
            if(members.size === 1) return members.first()
        }
        return awardMember
    }
}

module.exports.help = {
    name: "awardPoints",
    cat: "Staff - Events",
    description: "Award a member some points",
    usage: `awardPoints [user] [amount]`,
    examples: [`awardPoints @Hattyot 5`, `awardPoints Hattyot 5`, `awardPoints 436228721033216009 5`]
}

module.exports.conf = {
    enabled: true,
    aliases: []
};
