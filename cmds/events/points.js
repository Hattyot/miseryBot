const { points } = require("../../modules/data.js")
const embedMaker = require("../../modules/embed.js")
module.exports.run = async (bot, message, args) => {
    let pointsAmount
    let member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member
    if(member.roles.has("530728428975161344")) {
        return embedMaker.message(message, `Sorry staff can't have points`)
    }
    points.findOne({user_ID: member.user.id}, (err, data) => {
        if(!data) {
            let newPoints = new points({
                user_ID: `${member.user.id}`,
                amount: 0
            });
            newPoints.save()
                .then(r => console.log(r))
                .catch(e => console.log(e));
            pointsAmount = 0
        }else {
           pointsAmount = data.amount 
        }
        embedMaker.message(message, `<@${member.user.id}> currently has **${pointsAmount}** points.`)    
    })

}

module.exports.help = {
    name: "points",
    cat: "Events",
    description: "See how many points you have",
    usage: `points`,
    examples: [`points`]
}

module.exports.conf = {
    enabled: true,
    aliases: []
};
