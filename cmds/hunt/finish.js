const { points, huntWinners } = require("../../modules/data.js")
module.exports.run = async (bot, message, args) => {
    let user = message.author
    message.delete()
    let key = args[0]
    if(!key) return
    if(key !== "149659964876678") return
    huntWinners.find({}, (err, data) => {
        let alreadyWon
        for(let i = 0; i < data.length; i++) {
            if(data[i].user_ID === message.author.id) {
                alreadyWon = true
                break;
            }
        }
        if(alreadyWon) return message.member.send(`You've already claimed it once, what you doing boi.`)
        if(data.size >= 5) {
            return message.member.send(`Sorry 5 winners have already claimed this, you're too late`)
        }else {
            message.member.send(`Congrats, you did it! :tada: You've won 15 points!`)
            points.findOneAndUpdate({user_ID: user.id}, {$inc: {amount: 15}}, (err, data) => {
                if(err) return console.log(err)
            });
            let newHuntWinner = new huntWinners({
                user_ID: `${message.author.id}`
            });
            newHuntWinner.save()
                .then(r => console.log(r))
                .catch(e => console.log(e));
        }
    })
};

module.exports.help = {
    name: "finish",
    cat: "Hunt",
    description: "End of the game bud, you just need the key",
    usage: "finish [key]",
    examples: ["finish secretkeyyouneedtofindout"]
};

module.exports.conf = {
    enabled: true,
    aliases: [],
};